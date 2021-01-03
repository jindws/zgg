const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

/**
 * @desc 读取指定⽬录下⽂件
 * @param dirPath 读取的文件夹
 * @param callback 要做什么
 */
function loadData(dirPath,callback){
    // 读取路径下的⽂件
    const list = fs.readdirSync(path.resolve(__dirname,dirPath))
    // 遍历路由⽂件，将路由配置解析到路由器中
    list.forEach(itm=>{
        const extname = path.extname(itm);//获取后缀名
        const filename = itm.replace(extname,'')
        const file = require(path.resolve(__dirname,dirPath) + '/' + itm)
        callback(filename,file)//处理逻辑
    })
}

function RouterInit(app){
    const router = new Router()

    loadData('./routes',(filename,routes)=>{
        const prefix = filename === 'index' ? '' : '/'+filename//// 若是index⽆前缀，别的⽂件前缀就是⽂件名

        // 遍历路由并添加到路由器
        Object.entries(routes(app)).map(([key,value])=>{
            let [method,_path] = key.split(' ')
            _path = _path.substr(0,_path.length-1)
            router[method](`${prefix}${_path}`,value)
        })
    });
    return router;
}

function ControllerInit(app){
    const controllers = {}
    loadData('./controller',(filename,controller)=>{
        let contr = controller
        if(typeof controller === 'function'){
            contr = controller(app)
        }
        controllers[filename] = contr
    });
    return controllers;
}

function ServiceInit(){
    const services = {}
    loadData('./service',(filename,controller)=>{
        services[filename] = controller
    });
    return services;
}

module.exports = {
    RouterInit,
    ControllerInit,
    ServiceInit,
}