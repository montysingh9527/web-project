/*
 * @Description:
 * @Date: 2023-12-28 20:23:11
 * @FilePath: \web-project\node-egg-demo\egg-server\app\controller\users.js
 */
// app/controller/users.js
const Controller = require("egg").Controller;

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.toInt(ctx.query.limit),
      offset: ctx.toInt(ctx.query.offset),
    };
    ctx.body = await ctx.model.User.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findByPk(ctx.toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { userName, age, nickName, sex, password  } = ctx.request.body;
    console.log("--创建用户-logs---", userName, age, nickName, sex);
    const user = await ctx.model.User.create({ userName, age, nickName, sex, password  });
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { userName, age } = ctx.request.body;
    await user.update({ userName, age });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = UserController;
