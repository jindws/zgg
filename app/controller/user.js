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
    const { ctx } = this;

    // 校验参数
    ctx.validate(ctx.rule.createUserRequest);

    const res = { abc: 123 };
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
    // ctx.body = "user controller";
  }
}
module.exports = UserController;
