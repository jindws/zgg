const Service = require("egg").Service;

class UserService extends Service {
  /**
   * 创建⽤用户
   * @param {*} data
   */
  async create(data) {
    const { ctx } = this;
    data.password = await this.ctx.genHash(data.password);
    return ctx.model.User.create(data);
  }
}
module.exports = UserService;
