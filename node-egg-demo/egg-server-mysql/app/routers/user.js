/*
 * @Description: 用户
 * @Date: 2023-12-28 20:28:42
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\routers\user.js
 */
"use strict";

module.exports = (app) => {
  const { router, controller, config, middleware } = app;
  const adminPrefix = config.front_web.admin_prefix;
  // 创建
  router.post(adminPrefix + "/user/create", controller.user.create);
  // 查询
  router.get(adminPrefix + "/user/list", controller.user.findall);
  // 修改
  router.post(adminPrefix + "/user/update", controller.user.update);
  // 删除
  router.post(adminPrefix + "/user/delete", controller.user.delete);

  /** 一. 单路由插入jwt验证 */
  //   const jwt = app.middleware.jwt({ app });
  //   router.post("/home", jwt, controller.home.index);

  /** 二. 动态路由 find_one/321 */
  //   router.get("/find_one/:_id", controller.roles.findOne);

  /** 三. 设置路径 */
  // const adminPrefix = "/v1/admin";
  // const user = "/user"; // 用户模块
  // router.post(adminPrefix + user + "/create", controller.user.create);

  /** 四. 路由重定向 */
  // app.router.redirect('/', '/home/index', 302)
};
