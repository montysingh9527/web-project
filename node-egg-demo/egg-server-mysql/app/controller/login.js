const { Controller } = require("egg");
const md5 = require("md5");

class LoginController extends Controller {
  async create() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    if (!username && !password) {
      throw new Error("账号与密码不能为空!");
    }
    let userToken = {
      username,
      password,
    };
    // 生成token
    const token = await this.service.jwt.setToken(userToken);
    const result = {
      username,
      token,
    };
    this.logger.warn("用户:", username, "token为:", token);
    if (result) {
      ctx.api_success({ msg: "登录成功。", result });
    } else {
      ctx.api_error({ msg: "登录失败 !", result });
    }
  }
}

module.exports = LoginController;
