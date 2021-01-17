//service/actionToken.js
const Service = require("egg").Service;
class ActionTokenService extends Service {
  async apply(_id) {
    //对id进行签名
    const { ctx } = this;
    return ctx.app.jwt.sign(
      {
        data: { _id },
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      },
      ctx.app.config.jwt.secret
    );
  }
}
module.exports = ActionTokenService;
