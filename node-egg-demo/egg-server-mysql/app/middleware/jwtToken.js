/*
 * @Description: jwt 校验
 * @Date: 2024-03-16 22:34:58
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\middleware\jwtToken.js
 */
module.exports = () => {
  return async function jwtToken(ctx, next) {
    try {
      let req_url = ctx.request.url;
      // 获取header里的authorization
      let auth_token = ctx.header.authorization;
      // 登录页面
      const is_login = req_url.includes("login");
      if (!is_login) {
        // 有token
        if (auth_token) {
          auth_token = auth_token.substring(7);
          const user_token = await ctx.service.jwt.verifyToken(auth_token);
          ctx.userName = user_token.user.username;
          await next();
        } else {
          ctx.api_error({ msg: "Token已失效, 请重新登录。" });
        }
      } else {
        // 是登录页面
        await next();
      }
    } catch (err) {
      const status = err.status || 500;
      ctx.body = {
        code: status,
        data: "Token 校验失败.",
        message: err.message,
      };
      ctx.status = status;
    }
  };
};
