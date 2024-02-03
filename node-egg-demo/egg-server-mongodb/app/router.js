/*
 * @Description:
 * @Date: 2024-01-06 22:05:53
 * @FilePath: \web-project\node-egg-demo\egg-server-mongodb\app\router.js
 */
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, config } = app;
  // 获取版本
  router.get("/version", controller.home.index);
  // 登录
  require("./routers/login")(app);
  // 用户
  require("./routers/user")(app);
};
