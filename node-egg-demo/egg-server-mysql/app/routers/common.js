/*
 * @Description: 上传相关
 * @Date: 2024-03-09 22:56:26
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\routers\upload.js
 */
"use strict";

module.exports = (app) => {
  const { router, controller, config, middleware } = app;
  const adminPrefix = config.front_web.admin_prefix;
  router.post(adminPrefix + "/upload/image", controller.common.upload);
};
