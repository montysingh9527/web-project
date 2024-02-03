/*
 * @Description:
 * @Date: 2024-01-06 23:09:59
 * @FilePath: \web-project\node-egg-demo\admin-project\src\router\routers.js
 */

const routers = [
  {
    path: "/login",
    name: "login",
    component: () => import("src/page/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/",
    redirect: { name: "login" },
    component: () => import("src/layout/layout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("src/page/home/index.vue"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import("src/page/user/index.vue"),
        meta: {
          title: "用户管理"
        }
      },
      {
        path: "/about",
        name: "about",
        component: () => import("src/page/about/index.vue"),
      },
    ],
  },
];
export default routers;
