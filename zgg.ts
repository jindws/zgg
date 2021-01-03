const Koa = require('koa')
const {RouterInit} = require('./loader.ts')

module.exports = class Zgg{
    app
    router
    constructor(props) {
        this.app = new Koa(props)
        this.router = RouterInit(this)
        this.app.use(this.router.routes())
    }

    start(port=3000){
        this.app.listen(port,()=>{
            console.log(`http://localhost:${port}`);
        })
    }
}