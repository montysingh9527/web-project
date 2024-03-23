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
    try {
      const { username, password } = ctx.request.body;
      console.log("--loginIndex-logs---", username, password);
      if (!username || !password) {
        throw new Error("账号与密码不能为空!");
      }
      const user = await ctx.sqlModel.User.findOne({
        where: { username, password },
        attributes: {
          // 不返回的字段
          exclude: [
            "password",
            "createdAt",
            "createdBy",
            "updatedAt",
            "updatedBy",
            "status",
            "isDelete",
          ],
        },
      });
      if (!user) {
        ctx.api_error({ msg: "用户名或密码错误 !" });
      }
      console.log("---logs--user-", user.username);
      const userToken = {
        username,
        password,
      };
      // 生成token
      const token = await this.service.jwt.setToken(userToken);
      const data = {
        token,
        user,
      };
      this.logger.warn("用户:", username, "token为:", token);
      if (data) {
        console.log("--登录成功--", token, "----user---", user);
        ctx.api_success({ msg: "登录成功。", data });
      } else {
        ctx.api_error({ msg: "登录失败 !", data });
      }
    } catch (error) {
      console.log("---loginIndex-error--", error);
    }
  }
}

module.exports = LoginController;
