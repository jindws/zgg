module.exports = app => {
    const { STRING,INTEGER,DATE } = app.Sequelize;

    return app.model.define(
        "user",{
            name: STRING(30),
            age: INTEGER,
            createdAt: DATE,
            updatedAt: DATE,
        });
  };