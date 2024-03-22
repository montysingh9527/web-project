/*
 * @Description: 欢迎提示语
 * @Date: 2024-03-19 01:29:48
 * @FilePath: \web-project\node-egg-demo\admin-project\src\utils\welcome.js
 */
export const timeWelcome = () => {
  const time = new Date();
  const hour = time.getHours();
  return hour <= 11
    ? "早上好"
    : hour <= 13
    ? "中午好"
    : hour <= 17
    ? "下午好"
    : "晚上好";
};

export const randomWelcome = () => {
  const w = [
    "欢迎使用" + "管理后台",
    "要不要出去走走？",
    "也许你想要一些更多的功能.",
    "我想我需要喝点咖啡",
    "窗户该擦一擦了",
  ];
  return w[Math.floor(Math.random() * w.length)];
};
