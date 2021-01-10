module.exports = {
    index: async ctx => {
        ctx.body = "controller⾸⻚";
    },
    detail: ctx => {
        ctx.body = "controller详情页";
    }
}