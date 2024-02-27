/*
 * @Description:
 * @Date: 2023-12-27 14:28:53
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\router.js
 */
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  // 获取版本
  router.get("/version", controller.version.index);
  // 登录
  require("./routers/login")(app);
  // 导入roles下的路由
  // require("./routers/roles")(app);
  // 用户
  require("./routers/user")(app);
};
