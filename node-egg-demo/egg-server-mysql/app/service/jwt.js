/*
 * @Description: jwt 验证
 * @Date: 2024-03-07 15:28:17
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\service\jwt.js
 */
"use strict";

const Service = require("egg").Service;

class JwtService extends Service {
  // 设置jwt token
  async setToken(user) {
    const { ctx } = this;
    return ctx.app.jwt.sign(
      {
        data: {
          _id: user,
        },
        exp: Math.floor(Date.now() / 1000 + 60 * 60 * 7),
      },
      ctx.app.config.jwt.secret
    );
  };
  async verifyToken (token) {
    const { ctx } = this;
    return ctx.app.jwt.verify(token, ctx.app.config.jwt.secret) 
  }
}

module.exports = JwtService;
