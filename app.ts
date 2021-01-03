const Koa = require('koa')
const app = new Koa()
const {RouterInit} = require('./loader.ts')
app.use(RouterInit().routes())
app.listen(3000,()=>{
    console.log('run http://localhost:3000')
})