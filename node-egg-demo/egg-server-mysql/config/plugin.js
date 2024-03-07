/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 跨域问题 #安全威胁csrf的防范
  cors: {
    enable: true,
    package: "egg-cors",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
};
