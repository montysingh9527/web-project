import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("#"),
  routes: [
    {
      path: "/",
      redirect: "home",
      component: () => import("../layout/layout.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("../page/home/index.vue"),
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../page/about/index.vue"),
        },
      ],
    },
  ],
});

export default router;
