const Service = require('egg').Service

class UserService extends Service {
    async getAll() {
        return this.ctx.model.User.findAll()
    }
}
module.exports = UserService