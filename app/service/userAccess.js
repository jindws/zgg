//service/userAccess.js
const Service = require("egg").Service;
class UserAccessService extends Service {
  async login(data) {
    const { ctx, service } = this;
    const user = await service.user.findByMobile(data.mobile);
    if (!user) {
      ctx.throw(404, "user not found");
    }
    //compare----egg-bcrypt
    let verifyPsw = await ctx.compare(data.password, user.password);
    if (!verifyPsw) {
      ctx.throw(404, "user password is error");
    }
    // ⽣成Token令牌
    return { token: await service.actionToken.apply(user._id) };
  }
  async logout() {}
  async current() {
    //获取登录的用户
    const { ctx, service } = this;
    // ctx.state.user 可以提取到JWT编码的data
    const _id = ctx.state.user.data._id;
    const user = await service.user.find(_id);
    if (!user) {
      ctx.throw(404, "user is not found");
    }
    Reflect.deleteProperty(user, "password");
    return user;
  }
}
module.exports = UserAccessService;
