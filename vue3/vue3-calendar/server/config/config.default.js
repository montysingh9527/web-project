"use strict";
module.exports = (appInfo) => {
  const config = (exports = {});

  config.keys = appInfo.name + "_1681742917658_5978";

  // 中间件配置   加载 auth 中间件 配置中间件auth为middleware目录下的文件名。 中间件会在每次路由变化时执行
  config.middleware = ['auth'];
  // 给auth中间件传入的options参数
  // config.auth = {
  //   aaa:"aaaa"
  // }
  config.mongoose = {
    url: "mongodb://127.0.0.1:27017/egg_demo",
    options: {},
  };

  // 配置跨域
  config.security = {
    // 关闭csrf
    csrf: {
      enable: false, // 这里不进行开启操作，可配置鉴权
    },
    // 跨域白名单
    domainWhiteList: ["http://localhost:8080"],
  };

  //配置允许跨域
  config.cors = {
    origin: "http://localhost:8080", //origin: '*',
    credentials: true, // 允许cookie跨越,不能写origin: '*'
    allowMethods: "GET,PUT,POST,DELETE",
  };
  return config;
};
