module.exports = app => ({//柯里化
    // 'get /':async ctx=>{
    //     ctx.body = '⾸⻚'
    // },
    // 'get /detail' : ctx=>{
    //     ctx.body = '详情⻚⾯'
    // }
    'get /': app.controller.home.index,
    'get /detail': app.controller.home.detail,
})