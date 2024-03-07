/*
 * @Description:
 * @Date: 2023-12-28 20:23:11
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\controller\user.js
 */
// app/controller/users.js
const Controller = require("egg").Controller;

class UserController extends Controller {
  // 查询所有
  async findall() {
    const ctx = this.ctx;
    const { size = 10, page = 1 } = ctx.query;
    const query = {
      limit: ctx.toInt(size), // 取多少条数据
      offset: ctx.toInt(size) * (page - 1) || 0, // 跳过多少条数据(减1是因为从0开始查询)
      // order: [["id", "desc"], ["createdAt", "asc"]],  // desc降序   asc升序
      order: [["id", "asc"], "createdAt"],
      attributes: {
        exclude: ["password"], // 排除password,不返回
      },
    };

    const data = await ctx.sqlModel.User.findAndCountAll(query);
    if (data) {
      ctx.api_success({ data: { list: data.rows, total: data.count, size: Number(size), page: Number(page) } });
    } else {
      ctx.api_error({ data });
    }
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.sqlModel.User.findByPk(ctx.toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { username, age, nickname, sex, password, email } = ctx.request.body;
    const data = await ctx.sqlModel.User.create({
      username,
      age,
      nickname,
      sex,
      password,
      email,
    });
    if (data) {
      ctx.api_success({ msg: "创建用户成功" });
    } else {
      ctx.api_error({ msg: "创建用户失败", data });
    }
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.toInt(ctx.params.id);
    const user = await ctx.sqlModel.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { username, age } = ctx.request.body;
    await user.update({ username, age });
    ctx.body = user;
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.toInt(ctx.params.id);
    const user = await ctx.sqlModel.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = UserController;
