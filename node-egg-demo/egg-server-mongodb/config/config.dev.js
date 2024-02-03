/*
 * @Description: 
 * @Date: 2024-01-25 18:40:01
 * @FilePath: \web-project\node-egg-demo\egg-server-mongodb\config\config.dev.js
 */
const mongoosePaginate = require("mongoose-paginate");
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  console.log("--appInfo-dev-", appInfo);
  const config = (exports = {});
  config.keys = appInfo.name + "_1704549928120_9032";
  // 修改或添加监听端口的配置
  config.cluster = {
    listen: {
      port: 48090,
      hostname: "127.0.0.1",
    },
  };
  config.mongoose = {
    client: {
      url: "mongodb://127.0.0.1/egg_mongodb",
      options: {
        // useMongoClient: true,
        // autoReconnect: true,
        // reconnectTries: Number.MAX_VALUE,
        // bufferMaxEntries: 0,
      },
    },
    plugins: [mongoosePaginate],
  };
  config.jwt = {
    secret: "egg-api-jwt",
    expiresIn: 60 * 60 * 24, // 1天过期
  };

  // cors跨域问题 #安全威胁csrf的防范
  config.security = {
    csrf: {
      enable: false, // 这里不进行开启操作，可配置鉴权
      ignoreJSON: true,
    },
    domainWhiteList: ["*"],
  };
  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
  };

  // 自定义统一异常处理
  config.onerror = {
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.body = 'config error';
      ctx.status = 500;
    }
  }
  return {
    ...config,
  };
};