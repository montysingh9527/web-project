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
    const query = {
      limit: ctx.toInt(ctx.query.pageSize) || 10, // 取多少条数据
      offset: ctx.toInt(ctx.query.pageSize) * (ctx.query.page - 1) || 0, // 跳过多少条数据(减1是因为从0开始查询)
      // order: [["id", "desc"], ["createdAt", "asc"]],  // desc降序   asc升序
      order: [["id", "asc"], "createdAt"],
    };
    
    const data = await ctx.sqlModel.User.findAll(query);
    console.log('---logs-data--',data);
    
    if (data) {
      ctx.returnBody({ data });
    } else {
      ctx.returnBody({ data });
    }
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.sqlModel.User.findByPk(ctx.toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { userName, age, nickName, sex, password, email } = ctx.request.body;
    const data = await ctx.sqlModel.User.create({
      userName,
      age,
      nickName,
      sex,
      password,
      email,
      createdAt: new Date(),
    });
    if (data) {
      ctx.returnBody({ data, msgcode: 100020 });
    } else {
      ctx.returnBody();
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

    const { userName, age } = ctx.request.body;
    await user.update({ userName, age });
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
