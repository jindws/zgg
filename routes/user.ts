module.exports = {
    "get /": async app => {
        const id = await app.service.user.getId()
        app.ctx.body = `userId:${id}`;
    },
    "get /info": async app => {
        const ids = await app.service.user.getIds()
        app.ctx.body = `userIds:${ids}`;
    }
};