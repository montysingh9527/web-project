/*
 * @Description: 默认配置合并规则: https://www.eggjs.org/zh-CN/basics/config#%E5%A4%9A%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE
 * @Date: 2023-12-27 14:28:53
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\config\config.default.js
 */
/* eslint valid-jsdoc: "off" */
const mysql_config = require("../database/config.json");
const Op = require("sequelize").Op;
const path = require("path");
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  // console.log('--appInfo-logs---', path.join(appInfo.baseDir, "static"));
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1703658520164_5722";

  // add your middleware config here
  config.middleware = [
    "errorHandler", // 全局错误处理
  ];

  config.sequelize = {
    ...mysql_config[appInfo.env],
    // dialect: "mysql", // 表示使用mysql
    // host: "127.0.0.1", // 连接的数据库主机地址
    // port: 3306, // mysql服务端口
    // database: "egg_admin_dev", // 数据库名
    // username: "root", // 数据库用户名
    // password: "root", // 数据库密码
    // timezone: "+8:00", // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    // baseDir: "sequelizeModel",
    // delegate: "sqlModel",
    define: {
      // model的全局配置
      timestamps: false, // 添加create,update,delete时间戳
      freezeTableName: false, // 防止修改表名为复数
      underscored: false, // 防止驼峰式字段被默认转为下划线
    },
    dialectOptions: {
      // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      },
    },
    operatorsAliases: {
      $eq: Op.eq,
      $ne: Op.ne,
      $gte: Op.gte,
      $gt: Op.gt,
      $lte: Op.lte,
      $lt: Op.lt,
      $not: Op.not,
      $in: Op.in,
      $notIn: Op.notIn,
      $is: Op.is,
      $like: Op.like,
      $notLike: Op.notLike,
      $iLike: Op.iLike,
      $notILike: Op.notILike,
      $regexp: Op.regexp,
      $notRegexp: Op.notRegexp,
      $iRegexp: Op.iRegexp,
      $notIRegexp: Op.notIRegexp,
      $between: Op.between,
      $notBetween: Op.notBetween,
      $overlap: Op.overlap,
      $contains: Op.contains,
      $contained: Op.contained,
      $adjacent: Op.adjacent,
      $strictLeft: Op.strictLeft,
      $strictRight: Op.strictRight,
      $noExtendRight: Op.noExtendRight,
      $noExtendLeft: Op.noExtendLeft,
      $and: Op.and,
      $or: Op.or,
      $any: Op.any,
      $all: Op.all,
      $values: Op.values,
      $col: Op.col,
    },
  };

  // 接口前缀
  config.front_web = {
    web_prefix: "/web",
    admin_prefix: "/admin",
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
  // file模式上传文件 https://eggjs.github.io/zh/guide/upload.html#file-%E6%A8%A1%E5%BC%8F
  config.multipart = {
    mode: "file",
    whitelist: [
      ".png",
      ".jpg",
      ".gif",
      ".bmp",
      ".jpg",
      ".png",
      ".tif",
      ".gif",
      ".pcx",
      ".tga",
      ".exif",
      ".fpx",
      ".svg",
      ".psd",
      ".cdr",
      ".pcd",
      ".dxf",
      ".ufo",
      ".eps",
      ".ai",
      ".raw",
      ".WMF",
      ".webp",
      ".avif",
      ".apng",
      ".txt",
      ".doc",
      ".docx",
      ".xlsx",
      ".xls",
      ".csv",
      ".zip",
      ".pdf",
    ],
  };

  config.static = {
    prefix: "/", // 是静态资源URL的前缀, 如果值是/static,这意味着所有静态资源的URL都以/static开头。
    // img_prefix: path.join(__dirname, "../app/public/img"),
    dir: path.join(appInfo.baseDir, "static"), // 将其设置为新的 public 目录路径
    // 图片地址
    // dir: [path.join(__dirname, '../app/public'), path.join(__dirname, '../www')] // 多静态文件入口
  };
  config.ImgPath = {
    img_prefix: "static/public/img",
    file_prefix: "static/files",
  };

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
