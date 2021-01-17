const Service = require("egg").Service;

class UserService extends Service {
  /**
   * 创建用户
   * @param {*} payload
   */
  async create(payload) {
    const { ctx, service } = this;
    payload.password = await this.ctx.genHash(payload.password);
    return ctx.model.User.create(payload);
  }

  /**
   * 删除用户
   * @param {*} _id
   */
  async destroy(_id) {
    const { ctx, service } = this;
    const user = await ctx.service.user.find(_id);
    if (!user) {
      ctx.throw(404, "user not found");
    }
    return ctx.model.User.findByIdAndRemove(_id);
  }

  /**
   * 修改用户
   * @param {*} _id
   * @param {*} payload
   */
  async update(_id, payload) {
    const { ctx, service } = this;
    const user = await ctx.service.user.find(_id);
    if (!user) {
      ctx.throw(404, "user not found");
    }
    return ctx.model.User.findByIdAndUpdate(_id, payload);
  }

  /**
   * 查看单个用户
   */
  async show(_id) {
    const user = await this.ctx.service.user.find(_id);
    if (!user) {
      this.ctx.throw(404, "user not found");
    }
    return this.ctx.model.User.findById(_id).populate("role");
  }

  /**
   * 删除多个用户
   * @param {*} payload
   */
  async removes(payload) {
    return this.ctx.model.User.remove({ _id: { $in: payload } });
  }

  /**
   * 根据手机号查找
   * @param {*} mobile
   */
  async findByMobile(mobile) {
    return this.ctx.model.User.findOne({ mobile: mobile });
  }

  /**
   * 查找用户
   * @param {*} id
   */
  async find(id) {
    return this.ctx.model.User.findById(id);
  }

  /**
   * 更新用户信息
   * @param {*} id
   * @param {*} values
   */
  async findByIdAndUpdate(id, values) {
    return this.ctx.model.User.findByIdAndUpdate(id, values);
  }
}

module.exports = UserService;
