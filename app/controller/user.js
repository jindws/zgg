const Controller = require("egg").Controller;

/**
 * @required
 * @Controller 用户管理
 */
class UserController extends Controller {
  /**
   * @summary 创建用户
   * @description  创建用户，记录⽤户账户/密码/类型
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.createUserRequest); // 校验参数
    const payload = ctx.request.body || {}; // 组装参数
    const res = await service.user.create(payload); //调⽤ Service 进⾏行行业务处理理
    ctx.helper.success({ ctx, res }); // 设置响应内容和响应状态码
  }
}
module.exports = UserController;
