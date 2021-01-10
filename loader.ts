const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

// 读取指定⽬录下⽂件
function loadData(dirPath,callback){
    const list = fs.readdirSync(path.resolve(__dirname,dirPath))

    // 遍历路由⽂件，将路由配置解析到路由器中
    list.forEach(itm=>{
        const extname = path.extname(itm)//获取后缀名
        const filename = itm.replace(extname,'')// 去掉后缀名
        const file = require(path.resolve(__dirname,dirPath) + '/' + itm)
        callback(filename,file)// 处理逻辑
    })
}

function RouterInit(app){//传入的this
    const router = new Router()

    loadData('./routes',(filename,routes)=>{
        const prefix = filename === 'index' ? '' : '/'+filename

        // 判断路由类型，若为函数需传递app进去
        routes = typeof routes == "function" ? routes(app) : routes;

        Object.entries(routes).map(([key,value])=>{
            let [method,_path] = key.split(' ')
            _path.endsWith('/')&&(_path = _path.substr(0,_path.length-1))
            // router[method](`${prefix}${_path}`,value)
            router[method](`${prefix}${_path}`,async ctx=>{
                app.ctx = ctx;//挂在上下文到app
                // @ts-ignore
                await value(app)//路由处理接收app
            })
        })
    });
    return router;
}

function ControllerInit(app){//添加app
    const controllers = {}
    // 读取控制器⽬录
    loadData('./controller',(filename,controller)=>{
        // 添加路由
        controllers[filename] = controller(app)
    });
    return controllers;
}

function ServiceInit(){
    const services = {}
    loadData('./service',(filename,service)=>{
        services[filename] = service
    });
    return services;
}

const Sequelize = require("sequelize");
function ConfigInit(app) {
    loadData("config", (filename, conf) => {
        // 如果有middleware选项，则按其规定循序应⽤中间件
        if (conf.middleware) {
            conf.middleware.forEach(mid => {
                const midPath = path.resolve(__dirname, "middleware", mid + '.ts');
                app.$app.use(require(midPath));
            });
        }

        if (conf.db) {
            app.$db = new Sequelize(conf.db);

            // 加载模型
            app.$model = {};
            loadData("model", (filename, { schema, options }) => {
                app.$model[filename] = app.$db.define(filename, schema,options);
            });
            app.$db.sync();
        }
    });
}

module.exports = {
    RouterInit,
    ControllerInit,
    ServiceInit,
    ConfigInit
}