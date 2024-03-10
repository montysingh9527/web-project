/*
 * @Description: 上传
 * @Date: 2024-03-09 22:32:05
 * @FilePath: \web-project\node-egg-demo\admin-project\src\api\common\upload.js
 */
import axios from "src/api/axios_http.js";
// 上传图片
export const upload_img = (params) => {
  return axios.post("/upload/image", params, { type: 1 });
};
