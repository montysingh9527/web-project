/*
 * @Description: 
 * @Date: 2023-12-27 14:28:53
 * @FilePath: \web-project\node-egg-demo\egg-server\app\router.js
 */
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 导入roles下的路由
  // require("./routers/roles")(app);
  // 用户
  require("./routers/users")(app);
};
