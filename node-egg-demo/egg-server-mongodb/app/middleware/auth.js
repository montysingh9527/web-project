/*
 * @Description: 鉴权
 * @Date: 2024-01-07 00:29:34
 * @FilePath: \web-project\node-egg-demo\egg-server-mongodb\app\middleware\auth.js
 */
module.exports = (options, app) => {
  return async function auth(ctx, next) {
    await next();
  };
};
