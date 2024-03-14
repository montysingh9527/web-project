/*
 * @Description: 公共
 * @Date: 2024-03-09 23:19:16
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\controller\common.js
 */
const { Controller } = require("egg");

class HomeController extends Controller {
  // 获取当前版本
  async index() {
    const { ctx } = this;
    ctx.api_success({ data: "egg当前版本-" + new Date().toLocaleString() });
  }

  // 上传
  async upload() {
    const { ctx } = this;
    const filesData = ctx.request.files;
    if (!filesData.length) {
      return ctx.api_error({ msg: "上传错误, 请选择." });
    }
    let data = {};
    for (let item of filesData) {
      data = await this.service.upload.uploadImg(item);
    }
    ctx.api_success({ data, msg: "图片上传成功." });
  }
}

module.exports = HomeController;
