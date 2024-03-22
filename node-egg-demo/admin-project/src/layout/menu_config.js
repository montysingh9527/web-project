/*
 * @Description: 菜单配置
 * @Date: 2024-03-19 01:03:44
 * @FilePath: \web-project\node-egg-demo\admin-project\src\layout\menu_config.js
 */
export const menu_data = [
  {
    title: "用户管理",
    key: "user",
    icon: "inbox", // 图标 feedback help star send drafts outbox trash spam settings
    children: [
      {
        title: "用户账号",
        path: "user_account",
        key: "user_account",
        father_key: "user",
      },
      {
        title: "管理员账号",
        path: "admin_account",
        key: "admin_account",
        father_key: "user",
      },
    ],
  },
  {
    title: "帖子管理",
    key: "post",
    icon: "send",
    children: [
      {
        title: "发帖",
        path: "post_te",
        key: "post_te",
        father_key: "post",
      },
    ],
  },
  {
    title: "关于我们",
    path: "about",
    key: "about",
    icon: "feedback",
  },
];

// 展开菜单
export const opened_father_key = {};
menu_data.forEach((item) => {
  if (item.children) {
    opened_father_key[item.key] = item.children.reduce((prev, cur) => {
      prev.push(cur.path);
      return prev;
    }, []);
  } else {
    opened_father_key[item.key] = [];
  }
});
