/*
 * @Description: 设置css全局变量
 * @Date: 2024-06-29 11:28:10
 * @FilePath: \web-project\node-egg-demo\admin-project\src\css\index.js
 */
import day from "./day.js"; // 日间颜色
import night from "./night.js"; // 夜间颜色

/**
 * 日夜间切换
 * @param {*} theme
 */
export function set_theme(theme) {
  const theme_data = theme == "day" ? day : night;
  let theme_str = "";
  for (let key in theme_data) {
    theme_str += `--q-${key}: ${theme_data[key]};\n`;
  }
  const theme_doc = document.getElementById("theme-root");
  theme_doc.innerHTML = `:root {\n${theme_str}}`;
}
