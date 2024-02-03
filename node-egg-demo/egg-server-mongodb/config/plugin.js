/*
 * @Description: 
 * @Date: 2024-01-06 22:05:53
 * @FilePath: \web-project\node-egg-demo\egg-server-mongodb\config\plugin.js
 */
/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 安装跨域插件： npm i egg-cors --save
  cors: {
    enable: true,
    package: "egg-cors",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
  mongoose: {
    enable: true,
    package: "egg-mongoose",
  },
};
