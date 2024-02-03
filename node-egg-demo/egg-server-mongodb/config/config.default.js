/*
 * @Description:
 * @Date: 2024-01-06 22:05:53
 * @FilePath: \web-project\node-egg-demo\egg-server-mongodb\config\config.default.js
 */
/* eslint valid-jsdoc: "off" */

// https://eggjs.github.io/zh/guide/config.html#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6

const mongoosePaginate = require("mongoose-paginate");
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  console.log("--appInfo--", appInfo.local);
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});
  config.name = appInfo.name;
  config.baseDir = appInfo.baseDir;
  config.localEnv = appInfo.local;
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1704549928120_9032";
  // 中间件配置   加载 auth 中间件 配置中间件auth为middleware目录下的文件名。 中间件会在每次路由变化时执行
  config.middleware = ["auth"];
  // 给auth中间件传入的options参数
  // config.auth = {
  //   aaa:"aaaa"
  // }
  // 修改或添加监听端口的配置
  config.cluster = {
    listen: {
      port: 48090,
      hostname: "127.0.0.1",
    },
  };

  config.front_web = {
    web_prefix: "/web",
    admin_prefix: "/admin",
  }

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
      ctx.body = {
        code: "999999", 
        errs: err,
        msg: 'config error'
      };
      // ctx.status = 500;
    }
  }

  // 日志配置 this.logger 访问到 Egg 内置的 logger 对象,  this.logger.debug('Debug message'); info, warn, error
  config.logger = {
    // level: 'INFO', // 设置日志级别，可选值：DEBUG、INFO、WARN、ERROR，默认为 INFO
    // consoleLevel: 'DEBUG', // 控制台日志级别
    dir: "./egg_logs", // 日志存放路径
    appLogName: `${appInfo.name}-web.log`,
    coreLogName: "egg-web.log",
    agentLogName: "egg-agent.log",
    errorLogName: "common-error.log",
  };
  return {
    ...config,
  };
};
