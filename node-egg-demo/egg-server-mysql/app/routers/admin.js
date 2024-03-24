/*
 * @Description: 管理员
 * @Date: 2024-03-24 23:09:17
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\routers\admin.js
 */
module.exports = (app) => {
  const { router, controller, config, middleware } = app;
  const adminPrefix = config.front_web.admin_prefix;
  // 创建
  router.post(adminPrefix + "/admin/create", controller.admin.create);
  // 查询
  router.get(adminPrefix + "/admin/list", controller.admin.findall);
  // 修改
  router.post(adminPrefix + "/admin/update", controller.admin.update);
  // 删除
  router.post(adminPrefix + "/admin/delete", controller.admin.delete);
};
