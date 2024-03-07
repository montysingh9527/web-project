/*
 * @Description: 用户登录
 * @Date: 2024-02-28 00:43:07
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\routers\login.js
 */
"use strict";

module.exports = (app) => {
  const { router, controller, config, middleware } = app;
  const adminPrefix = config.front_web.admin_prefix;
  router.post(adminPrefix + "/login", controller.login.loginIndex);
};