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
      title: "登录",
    },
  },
  {
    path: "/",
    redirect: { name: "login" },
    component: () => import("src/layout/layout.vue"),
    meta: {
      title: "首页",
    },
    children: [
      // {
      //   path: "home",
      //   name: "home",
      //   component: () => import("src/page/home/index.vue"),
      //   meta: {
      //     title: "首页",
      //   },
      // },
      {
        path: "user",
        name: "user",
        meta: {
          title: "用户管理",
        },
        children: [
          {
            path: "user_account",
            name: "user_account",
            component: () => import("src/page/user/index.vue"),
            meta: {
              title: "用户账号",
            },
          },
          {
            path: "admin_account",
            name: "admin_account",
            component: () => import("src/page/admin/index.vue"),
            meta: {
              title: "管理员账号",
            },
          },
        ],
      },
      {
        path: "post",
        name: "post",
        meta: {
          title: "帖子管理",
        },
        children: [
          {
            path: "post_te",
            name: "post_te",
            component: () => import("src/page/post/index.vue"),
            meta: {
              title: "发帖",
            },
          },
        ],
      },
      {
        path: "about",
        name: "about",
        component: () => import("src/page/about/index.vue"),
        meta: {
          title: "关于我们",
        },
      },
    ],
  },
  {
    path: "/css",
    name: "css",
    component: () => import("src/page/css_test/index.vue"),
    meta: {
      title: "css测试",
    },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("src/page/Error404.vue"),
    meta: {
      title: "404",
    },
  },
];
export default routers;
