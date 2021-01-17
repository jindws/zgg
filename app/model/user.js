module.exports = (app) => {
  const { STRING, DATE, BIGINT } = app.Sequelize;

  // if(process.env.test) await this.app.model.sync({ force: true });

  return app.model.define("user", {
    realName: STRING(30),
    mobile: BIGINT,
    password: STRING(100),
  });
};
