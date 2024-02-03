/*
 * @Description: 全局错误处理
 * @Date: 2023-12-28 18:07:30
 * @FilePath: \web-project\node-egg-demo\egg-server\app\middleware\error_handler.js
 */
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit("error", err, ctx);

      const status = err.status || 500;
      ctx.body = {
        code: status,
        data: null,
        message: err.message,
      };
      ctx.status = status;
    }
  };
};
