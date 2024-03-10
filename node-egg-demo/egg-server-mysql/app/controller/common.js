/*
 * @Description: 公共
 * @Date: 2024-03-09 23:19:16
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\controller\common.js
 */
const { Controller } = require("egg");
const fs = require("fs");
const { deepMkdirsSync } = require("../utils/tools");
const moment = require("moment");
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
    // 图片存储目录
    const imgPrefix = ctx.app.config.static.img_prefix;
    if (!filesData.length) {
      return ctx.api_error({ msg: "上传错误, 请选择." });
    }
    console.log("---logs-filesData--", filesData);
    const file = ctx.request.files[0];
    const fileinfo = fs.readFileSync(file.filepath);
    // 时间路径
    const time_path = moment().format("YYYY-MM-DD");
    const name = `${new Date().getTime()}_${file.filename}`;
    // 图片存储文件路径
    const filePath = `${imgPrefix}/${time_path}/${name}`;
    deepMkdirsSync(`${imgPrefix}/${time_path}`); // 递归生成文件夹
    try {
      await fs.writeFileSync(filePath, fileinfo);
    } catch (error) {
      throw error;
    } finally {
      await fs.unlink(file.filepath, (err) => {
        if (err) {
          throw err;
        }
        console.log("删除缓存文件:" + file.filepath + "成功！");
      });
    }
    const path = filePath.replace(imgPrefix, "public/img");
    const rootPath = ctx.request.header.host + "/" + path;
    const type = file.mimeType;
    ctx.api_success({ data: { path, name, rootPath, type }, msg: "上传图片成功." });
  }
}

module.exports = HomeController;
