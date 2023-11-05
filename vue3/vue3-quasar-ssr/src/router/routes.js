/*
 * @Description:
 * @Date: 2023-09-30 21:00:29
 * @FilePath: \web-project\vue3\vue3-quasar-ssr\src\router\routes.js
 */

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    name: "pc",
    redirect: "home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("pages/home.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("pages/about.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    name: "h5",
    // redirect: "h5/home",
    redirect: { name: 'h5home' },
    children: [
      {
        path: "/h5/home",
        name: "h5home",
        component: () => import("pages/h5_home.vue"),
      },
      {
        path: "/h5/about",
        name: "h5about",
        component: () => import("pages/h5_about.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
