"use strict";

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
};
