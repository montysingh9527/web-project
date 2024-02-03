/*
 * @Description: 登录
 * @Date: 2024-01-07 00:32:15
 * @FilePath: node-egg-demo\egg-server-mongodb\app\routers\login.js
 */
"use strict";

module.exports = (app) => {
  const { router, controller, config, middleware } = app;
  const adminPrefix = config.front_web.admin_prefix;
  router.post(adminPrefix + "/login", controller.login.create);
};
