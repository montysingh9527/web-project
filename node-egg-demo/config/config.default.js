/*
 * @Description: 
 * @Date: 2023-09-21 00:12:18
 * @FilePath: \web-project\node-egg-demo\config\config.default.js
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1695226331875_7667';

  // 中间件配置
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // mongoose 配置
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/egg_x',
    options: {
      useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  }

  // 安全相关的选项，例如 CSRF 防护、XSS 防护等
  config.security = {
    csrf: {
      enable: false,   // 关闭 CSRF 防护
    },
    domainWhiteList: [ 'http://localhost:8000' ],
  }

  // 配置路由的前缀
  config.router = {
    web: '/api/web/v1',
    admin: '/api/admin/v1',
  };

  // 日志配置 this.logger 访问到 Egg 内置的 logger 对象,  this.logger.debug('Debug message'); info, warn, error
  config.logger = {
    level: 'INFO', // 设置日志级别，可选值：DEBUG、INFO、WARN、ERROR，默认为 INFO
    consoleLevel: 'DEBUG', // 控制台日志级别
    dir: '/egg_logs', // 日志存放路径
  };
  config.logrotator = {
    maxFileSize: 2 * 1024 * 1024, // 日志文件大小超过 2 MB 时切割
    maxFiles: 6, // 最多保留 6 个日志文件
  };

  return {
    ...config,
    ...userConfig,
  };
};
