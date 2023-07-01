import { createRouter, createWebHistory } from "vue-router";
import DayPage from "../views/Day.vue";

const routes = [
  {
    path: "/",
    name: "day",
    component: DayPage,
  },
  {
    path: "/month",
    name: "month",
    component: function () {
      return import(/* webpackChunkName: "Month" */ "../views/Month.vue");
    },
  },
  {
    path: "/year",
    name: "year",
    component: () => import("../views/Year.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
