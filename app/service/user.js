const Service = require('egg').Service

class UserService extends Service {
    async getAll() {
        const users = await this.ctx.model.User.findAll()
        return users.map(itm=>({
            id:itm.id,
            name:itm.name,
            age:itm.age,
        }))
    }
}
module.exports = UserService