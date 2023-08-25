
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/h5pcLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/h5_pc/index.vue') }
    ]
  },
  {
    path: "/table",
    name: "table",
    component:()=> import("src/pages/h5_pc/industry.vue")
  },
  {
    path: "/us",
    name: "us",
    component:()=> import("src/pages/h5_pc/contact.vue"),
    meta: {
      tips: "应用输入url显示网站信息，实际就是显示网站的title内容。SEO: https://www.mintimate.cn/categories/",
      title: "关于我们",
      description:"关于我们-description",
      keywords: "关于我们-keywords",
    }
  },
  {
    path: "/filtertable",
    name: "filtertable",
    component:()=> import("src/pages/h5_pc/filtertable.vue"),
    meta: {
      tips: "应用输入url显示网站信息，实际就是显示网站的title内容。SEO: https://www.mintimate.cn/categories/",
      title: "table过滤",
      description:"table过滤-description",
      keywords: "table过滤-keywords",
    }
  },
  {
    path: "/live",
    name: "live",
    component:()=> import("src/pages/h5_pc/live.vue"),
    meta: {
      tips: "应用输入url显示网站信息，实际就是显示网站的title内容。SEO: https://www.mintimate.cn/categories/",
      title: "视频直播",
      description:"在线视频直播",
      keywords: "最流畅的在线视频直播",
    }
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
