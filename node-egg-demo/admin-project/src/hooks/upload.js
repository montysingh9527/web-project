/*
 * @Description:
 * @Date: 2024-03-09 22:35:11
 * @FilePath: \web-project\node-egg-demo\admin-project\src\hooks\upload.js
 */
import { api_upload } from "src/api/index.js";

/**
 * 创建上传图片
 * @returns Promise
 */
export const get_file = () => {
  // const reader = new FileReader();
  // reader.readAsDataURL(el.target.files[0]); // readAsDataURL方法可以将上传的图片格式转为base64,然后在存入到图片路径,
  //   reader.onload = function (event) {
  //     //  reader.result返回文件的内容。
  //     //只有在读取操作完成后，此属性才有效，返回的数据的格式取决于是使用哪种读取方法来执行读取操作的。
  //     this.listimg = event.target.result;
  //   };
  // 创建input标签
  const inputDom = document.createElement("input");
  // 设置类型
  inputDom.setAttribute("type", "file");
  // 点击弹窗选择框
  inputDom.click();
  return new Promise((resolve, reject) => {
    inputDom.onchange = (event) => {
      // 返回结果
      return resolve(event.target.files[0]);
    };
  });
};

export const use_upload_img = async (e) => {
  const file_data = await get_file();
  console.log("---logs-file_data--", file_data);
  const formData = new FormData();
  formData.append("file", file_data);
  formData.set("img", 1);
  console.log("--777-logs-formData--", formData);
  const res = await api_upload.upload_img(formData);
  console.log("--000-logs--res-", res);
};
