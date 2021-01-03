module.exports = app =>({
    'get /':app.controller.index.index,
    'post /':ctx=>ctx.body='post index'
})

// module.exports = {
//     'get /':async ctx=>{
//         ctx.body = '⾸⻚'
//     },
//     'get /detail' : ctx=>{
//         ctx.body = '详情⻚⾯'
//     }
// }