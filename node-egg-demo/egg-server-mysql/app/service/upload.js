/*
 * @Description:
 * @Date: 2024-03-12 00:29:22
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\service\upload.js
 */
"use strict";

const Service = require("egg").Service;
const fs = require("fs");
const { deepMkdirsSync } = require("../utils/tools");
const moment = require("moment");

class uploadService extends Service {
  /**
   * 上传图片/文件
   * @param {*} filesData 
   * @param {*} fixtype  图片img / 文件file
   * @returns 
   */
  async uploadImg(filesData, fixtype = "img") {
    const { ctx } = this;
    // 图片/文件 存储目录
    const Prefix = ctx.app.config.ImgPath[`${fixtype}_prefix`];
    // 时间路径
    const time_path = moment().format("YYYYMMDD");
    // 图片名称
    const name = filesData.filename;
    // 图片存储文件路径
    const filePath = `${Prefix}/${time_path}/${name}`;
    const fileinfo = fs.readFileSync(filesData.filepath);
    deepMkdirsSync(`${Prefix}/${time_path}`); // 递归生成文件夹
    try {
      await fs.writeFileSync(filePath, fileinfo);
    } catch (error) {
      throw error;
    } finally {
      await fs.unlink(filesData.filepath, (err) => {
        if (err) {
          throw err;
        }
        console.log("删除缓存文件:" + filesData.filepath + "成功！");
      });
    }
    // 路径 把static截取
    const path = filePath.substring(6);
    // 服务器路径
    const rootPath = ctx.request.header.host + path;
    // 图片类型
    const type = ctx.imgType(filesData.mimeType);
    return {
      path,
      name,
      rootPath,
      type,
    };
  }
}

module.exports = uploadService;
