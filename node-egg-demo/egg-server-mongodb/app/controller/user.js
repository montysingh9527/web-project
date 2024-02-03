/*
 * @Description: 用户
 * @Date: 2024-01-11 00:43:41
 * @FilePath: \web-project\node-egg-demo\egg-server-mongodb\app\controller\user.js
 */
const { Controller } = require("egg");

class UserController extends Controller {
  async create() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const result = await ctx.model.User.create({
      username,
      password,
    });
    if (result) {
      ctx.api_success({ msg: "创建成功。" });
    } else {
      ctx.api_error({ msg: "创建失败 !", result });
    }
  }
  // 查询
  async findall() {
    const { ctx } = this;
    const { page, size } = ctx.request.query;
    const options = {
      page: ~~page || 1, // 从查询参数中获取页码，默认为第一页
      limit: ~~size || 10, // 从查询参数中获取每页显示的记录数，默认为 10
      sort: { createdAt: 1 },
    };
    const result = await ctx.model.User.paginate({}, options);
    if (result) {
      ctx.api_success({ result });
    } else {
      ctx.api_error({ result });
    }
  }

  // 更新
  async update() {
    const { ctx } = this;
    const { id, username, gender } = ctx.request.body;
    const result = ctx.model.User.findByIdAndUpdate(id, {
      username,
      gender,
    });
    if (result) {
      ctx.api_success({ msg: "更新成功。", result });
    } else {
      ctx.api_error({ msg: "更新失败 !", result });
    }
  }
  // 删除
  async delete() {
    const { ctx } = this;
    const id = ctx.request.body.id;
    const result = ctx.model.User.findOneAndRemove(id);
    if (result) {
      ctx.api_success({ msg: "删除成功。", result });
    } else {
      ctx.api_error({ msg: "删除失败 !", result });
    }
  }
}

module.exports = UserController;
