module.exports = (app) => {
  const { STRING, DATE, BIGINT } = app.Sequelize;

  // if (process.env.test) await this.app.model.sync({ force: true });

  const User = app.model.define("user", {
    realName: STRING(30),
    mobile: BIGINT,
    password: STRING(100),
  });

  User.find = async function (data) {
    return this.findAll({
      where: data,
    });
  };
  return User;
};
