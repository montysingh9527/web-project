/*
 * @Description: 路由测试
 * @Date: 2023-09-21 13:38:36
 * @FilePath: \web-project\node-egg-demo\app\routers\demo.js
 */
"use strict";

module.exports = (app) => {
  const { router, controller, config, middleware } = app;
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
