module.exports = (app) => {
  const { STRING, DATE, BIGINT } = app.Sequelize;

  if(process.env.test)  app.model.sync({ force: true });

  return app.model.define("user", {
    realName: STRING(30),
    mobile: BIGINT,
    createdAt: DATE,
    updatedAt: DATE,
    password: STRING(100),
  });
};
