"use strict";

const Service = require("egg").Service;
class JwtService extends Service {
  async setToken(userToken) {
    const jwt_secret = this.app.config.secret;
    const token = this.app.jwt.sign(
      { userToken, exp: Math.floor(Date.now() / 1000 + 60 * 60 * 7) },
      jwt_secret,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    console.log('---logs-token--',token);
    return token;
  }
  async verifyToken(token) {
    const { ctx } = this;
    try {
      //let decode = app.jwt.verify(token, app.config.secret);
      let decode = this.app.jwt.verify(token, this.app.config.secret);
      let username = decode.userInfo.username;
      //console.log(username);
      let hasUser = await ctx.model.User.findOne({ username });
      if (!hasUser) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = JwtService;
