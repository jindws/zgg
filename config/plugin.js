"use strict";

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
  swaggerdoc: {
    enable: true,
    package: "egg-swagger-doc-feat",
  },

  validate: {
    enable: true,
    package: "egg-validate",
  },

  bcrypt: {
    enable: true,
    package: "egg-bcrypt",
  },

  //config/plugin.js
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
};
