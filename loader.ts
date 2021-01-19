export {}
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

function RouterInit(){
    const router = new Router()

    loadData('./routes',(filename,routes)=>{
        const prefix = filename === 'index' ? '' : '/'+filename
        Object.entries(routes).map(([key,value])=>{
            let [method,_path] = key.split(' ')
            _path.endsWith('/')&&(_path = _path.substr(0,_path.length-1))
            router[method](`${prefix}${_path}`,value)
        })
    });
    return router;
}

module.exports = {
    RouterInit,
}