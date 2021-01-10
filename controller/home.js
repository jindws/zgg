module.exports = app => ({
    index: async ctx => {
        // ctx.body = "controller⾸⻚";
        // const id = await app.service.user.getId()
        // app.ctx.body = `controller userId:${id}`;
        app.ctx.body = app.ctx.body = await app.$model.user.findAll()
    },
    detail: async ctx => {
        // ctx.body = "controller详情页";
        const ids = await app.service.user.getIds()
        app.ctx.body = `controller userIds:${ids}`;
    }
})