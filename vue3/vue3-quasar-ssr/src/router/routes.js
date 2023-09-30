/*
 * @Description:
 * @Date: 2023-09-30 21:00:29
 * @FilePath: \web-project\vue3\vue3-quasar-ssr\src\router\routes.js
 */

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
