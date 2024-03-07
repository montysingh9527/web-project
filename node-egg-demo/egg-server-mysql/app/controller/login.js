/*
 * @Description: 登录
 * @Date: 2024-02-28 00:43:42
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\controller\login.js
 */
const { Controller } = require("egg");
const md5 = require("md5");

class LoginController extends Controller {
  async loginIndex() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    console.log("--loginIndex-logs---", username, password);
    if (!username || !password) {
      throw new Error("账号与密码不能为空!");
    }
    console.log('---logs-sqlModel--',ctx.sqlModel);
    const user = await ctx.sqlModel.User.findOne({
      where: { username: username },
    });
    console.log("---logs--user-", user.username);
    const userToken = {
      username,
      password,
    };
    // 生成token
    const token = await this.service.jwt.setToken(userToken);
    const data = {
      username,
      token,
    };
    this.logger.warn("用户:", username, "token为:", token);
    if (data) {
      ctx.api_success({ msg: "登录成功", data });
    } else {
      ctx.api_error({ msg: "登录失败", data });
    }
  }
}

module.exports = LoginController;
