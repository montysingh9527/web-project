/*
 * @Description: 管理员相关路由
 * @Date: 2023-09-22 00:38:31
 * @FilePath: \web-project\node-egg-demo\app\routers\roles.js
 */
"use strict";

module.exports = (app) => {
  const { router, controller } = app;
  router.post("/create", controller.roles.create);
  router.post("/list", controller.roles.list);
};
