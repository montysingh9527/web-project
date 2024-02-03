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

  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
};
