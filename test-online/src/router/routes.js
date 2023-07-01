const routes = [
  {
    path: "/",
    redirect: 'home', 
  },
  {
    path: "/home",
    name: "home",
    component: () => import("layouts/MainLayout.vue"),
    mate: {
      tabName: "首页",
    },
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/css",
    name: "css",
    component: () => import("src/pages/css/index.vue"),
    mate: {
      tabName: "CSS案例",
    },
    children: [
      {
        path: "ios",
        name: "css/ios",
        mate:{
          titlename:"CSS-仿开关按钮切换练习"
        },
        component: () => import("src/pages/css/component/ios.vue"),
      },
    ],
  },
  {
    path: "/card",
    name: "card",
    mate:{
      titlename:"CSS-过渡练习"
    },
    component: () => import("src/pages/css/component/card.vue"),
  },
  {
    path: "/btnindex",
    name: "btnindex",
    mate:{
      titlename:"按钮切换"
    },
    component: () => import("src/pages/vueTest/btnIndex/index.vue"),
  },
  {
    path: "/search",
    name: "search",
    mate:{
      titlename:"input搜索"
    },
    component: () => import("src/pages/vueTest/search/index.vue"),
  },
  {
    path: "/tabBar",
    name: "tabBar",
    mate:{
      titlename:"tab栏切换"
    },
    component: () => import("src/pages/vueTest/tabBar/index.vue"),
  },
  {
    path: "/mixin",
    name: "mixin",
    mate:{
      titlename:"mixins/slot"
    },
    component: () => import("src/pages/vueTest/mixinTest/index.vue"),
  },
  {
    path: "/filters",
    name: "filters",
    mate:{
      titlename:"过滤器filters"
    },
    component: () => import("src/pages/vueTest/filters/index.vue"),
  },
  {
    path: "/stars",
    name: "stars",
    mate:{
      titlename:"五角星评价"
    },
    component: () => import("src/pages/vueTest/stars/index.vue"),
  },
  {
    path: "/directive",
    name: "directive",
    mate:{
      titlename:"指令directives—tab栏切换"
    },
    component: () => import("src/pages/vueTest/directive/index.vue"),
  },
  {
    path: "/counter",
    name: "counter",
    mate:{
      titlename:"派发器示例"
    },
    component: () => import("src/pages/vueTest/counter/index.vue"),
  },
  {
    path: "/calculator",
    name: "calculator",
    mate:{
      titlename:"派发器案例—计算器"
    },
    component: () => import("src/pages/vueTest/calculator/index.vue"),
  },
  {
    path: "/todolist",
    name: "todolist",
    mate:{
      titlename:"派发器案例—TodoList"
    },
    component: () => import("src/pages/vueTest/todolist/index.vue"),
  },
  {
    path: "/watch",
    name: "watch",
    mate:{
      titlename:"watch监听"
    },
    component: () => import("src/pages/vueTest/watch/index.vue"),
  },
  {
    path: "/magnifier",
    name: "magnifier",
    mate:{
      titlename:"magnifier放大镜特效（自定义指令实现）"
    },
    component: () => import("src/pages/vueTest/magnifier/index.vue"),
  },
  {
    path: "/inputcheckbox",
    name: "inputcheckbox",
    mate:{
      titlename:"input和checkbox组件组合"
    },
    component: () => import("src/pages/vueTest/inputcheckbox/index.vue"),
  },
  {
    path: "/guide",
    name: "guide",
    mate:{
      titlename:"新手引导"
    },
    component: () => import("src/pages/vueTest/guide/index.vue"),
  },
  {
    path: "/tree",
    name: "tree",
    mate:{
      titlename:"树形结构查询"
    },
    component: () => import("src/pages/vueTest/tree/index.vue"),
  },
  {
    path: "/test",
    name: "test",
    mate:{
      titlename:"测试页面"
    },
    component: () => import("src/pages/vueTest/Test/index.vue"),
  },
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
