/*
 * @Description: 上传相关
 * @Date: 2024-03-09 22:56:26
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\routers\upload.js
 */
"use strict";

module.exports = (app) => {
  const { router, controller, config, middleware } = app;
  const jwt = app.middleware.jwtToken();
  const adminPrefix = config.front_web.admin_prefix;
  // jwt 方式二: 在router中使用中间件, 方式一:在config中全局配置
  // router.post(adminPrefix + "/jwt_test", jwt, controller.common.upload);
  router.post(adminPrefix + "/upload/image", controller.common.upload);
};
