module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1704549928120_9032";

  // 中间件配置   加载 jwt 中间件 配置中间件auth为middleware目录下的文件名。 中间件会在每次路由变化时执行
  config.middleware = ["error_handler", "jwt"];
  // 给auth中间件传入的options参数
  // config.jwt = {
  //   aaa:"aaaa"
  // }

  config.mongoose = {
    url: "mongodb://127.0.0.1:69900/egg_mongodb",
    options: {
      // useMongoClient: true,
      // autoReconnect: true,
      // reconnectTries: Number.MAX_VALUE,
      // bufferMaxEntries: 0,
    },
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

  // 日志配置 this.logger 访问到 Egg 内置的 logger 对象,  this.logger.debug('Debug message'); info, warn, error
  config.logger = {
    // level: 'INFO', // 设置日志级别，可选值：DEBUG、INFO、WARN、ERROR，默认为 INFO
    // consoleLevel: 'DEBUG', // 控制台日志级别
    dir: "/egg_logs", // 日志存放路径
    appLogName: `${appInfo.name}-web.log`,
    coreLogName: "egg-web.log",
    agentLogName: "egg-agent.log",
    errorLogName: "common-error.log",
  };
  return {
    ...config,
  };
};
