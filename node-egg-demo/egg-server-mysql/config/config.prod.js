/*
 * @Description: 生产环境配置
 * @Date: 2024-03-07 17:00:48
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\config\config.prod.js
 */
const mysql_config = require("../database/config.json")
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  const config = (exports = {});

  config.sequelize = {
    ...mysql_config[appInfo.env],
  };
  config.jwt = {
    secret: "egg-api-jwt",
    expiresIn: 60 * 60 * 24, // 1天过期
  };

  // cors跨域问题 #安全威胁csrf的防范
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ["*"],
  };
  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  return {
    ...config,
  };
};