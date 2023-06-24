/**
 * 管理后台相关路由
 */
const routes = [
  {
    path: '/',
    component: () => import('layouts/htLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ht/index.vue') }
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
