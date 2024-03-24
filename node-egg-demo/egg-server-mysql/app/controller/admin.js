/*
 * @Description: admin管理员
 * @Date: 2023-12-28 20:23:11
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\controller\admin.js
 */
// app/controller/users.js
const Controller = require("egg").Controller;

class AdminController extends Controller {
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

    console.log('---logs--ctx.sqlModel-', ctx.sqlModel);

    const data = await ctx.sqlModel.Admin.findAndCountAll(query);
    if (data) {
      ctx.api_success({
        data: {
          list: data.rows,
          total: data.count,
          size: Number(size),
          page: Number(page),
        },
      });
    } else {
      ctx.api_error({ data });
    }
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.sqlModel.Admin.findByPk(ctx.toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { username, password, email, isSuper, roleId, remark, mobile, createdBy } =
      ctx.request.body;
    const data = await ctx.sqlModel.Admin.create({
      username,
      password,
      email,
      isSuper,
      roleId,
      remark,
      mobile,
      createdBy
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
    const user = await ctx.sqlModel.Admin.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { username, age } = ctx.request.body;
    await user.update({ username, age });
    ctx.body = user;
  }

  // 删除
  async delete() {
    const ctx = this.ctx;
    const { id } = ctx.request.body;
    const user = await ctx.sqlModel.Admin.findByPk(id);
    if (user) {
      ctx.api_success({ msg: "删除用户成功。" });
    } else {
      ctx.api_error({ msg: "删除用户失败 !" });
    }
  }
}

module.exports = AdminController;
