
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
    component:()=> import("src/pages/h5_pc/contact.vue")
  },
  {
    path: "/filtertable",
    name: "filtertable",
    component:()=> import("src/pages/h5_pc/filtertable.vue")
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
