/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  {
    path: '/google',
    name: 'google',
    component: () => import('@/views/google/google'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/notice',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Notice',
    meta: { title: '公告中心', icon: 'users-cog', permissions: ['5001','50010','50011','50012','50013','50014','50015','50016'] },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () =>
          import('@/views/notice/index'),
        meta: { title: '平台公告', icon: 'users-cog', permissions: ['5001','50010','50011','50012','50013','50014','50015','50016']  },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    redirect: 'noRedirect',
    name: 'User',
    alwaysShow: true,
    meta: { title: '会员管理', icon: 'box-open',
    permissions: ['10010','10020','10030','10040','10050','10060','10070','1007','10071','10072','10073','10074','10075','1005','10051','10052','10053','10054','10055','10056','1004','10041','10042','10043','10044','10045','10046','1001','10011','10012','10013','10014','10015','10016','1002','10021','10022','10023','10024','10025','10026','1003','10031','10032','10033','10034','10035','10036'],
  },
    children: [
      {
        path: 'userList',
        component: () => import('@/views/user/index'),
        name: 'UserList',
        meta: {
          title: '会员列表',
          permissions: ['1001','10010','10011','10012','10013','10014','10015','10016'],
        },
      },
      {
        path: 'logInfo',
        component: () => import('@/views/user/logInfo'),
        name: 'logInfo',
        meta: {
          title: '登录日志',
          permissions: ['1002','10021','10022','10023','10024','10025','10026','10020'],
        },
      },
      {
        path: 'operationLog',
        component: () => import('@/views/user/operationLog'),
        name: 'operationLog',
        meta: {
          title: '操作日志',
          permissions: ['1003','10031','10032','10033','10034','10035','10036','10030'],
        },
      },
      {
        path: 'bankList',
        component: () => import('@/views/user/bankList'),
        name: 'bankList',
        meta: {
          title: '银行信息',
          permissions: ['1004','10041','10042','10043','10044','10045','10046','10040'],
        },
      },
      {
        path: 'commentList',
        component: () => import('@/views/user/commentList'),
        name: 'commentList',
        meta: {
          title: '评价列表',
          permissions: ['1005','10051','10052','10053','10054','10055','10056','10050'],
        },
      },
      {
        path: 'orderList',
        name: 'orderList',
        component: () =>
          import('@/views/merchant/orderList'),
        meta: { title: '支付订单列表', permissions: ['1007','10071','10072','10073','10074','10075','10070']  },
      },
    ],
  },
  {
    path: '/order',
    component: Layout,
    redirect: 'noRedirect',
    name: 'order',
    meta: {
      title: '订单管理',
      icon: 'shopping-cart',
      permissions: ['30010','30020','30030','30040','30050','30060','3001','30011','30012','30013','30014','30015','30016','3004','30041','30042','30043','30044','30045','30046','3006','30061','30062','30063','30064','30065','30066','3002','30021','30022','30023','30024','30025','30026','3005','30051','30052','30053','30054','30055','30056'],
    },

    children: [
      {
        path: 'buyList',
        name: 'BuyList',
        component: () => import('@/views/order/buy'),
        meta: {
          title: '买卖记录',
          noKeepAlive: true,
        permissions: ['3001','30011','30012','30013','30014','30015','30016','30010'],

        },
        children: null,
      },
      {
        path: 'orderList',
        name: 'OrderList',
        component: () => import('@/views/order/index'),
        meta: {
          title: '交易记录',
          noKeepAlive: true,
        permissions: ['3004','30041','30042','30043','30044','30045','30046','30040'],

        },
        children: null,
      },
      {
        path: 'dabiList',
        name: 'DabiList',
        component: () => import('@/views/order/dabi'),
        meta: {
          title: '打币记录',
          noKeepAlive: true,
        permissions: ['3006','30061','30062','30063','30064','30065','30066','30060'],

        },
        children: null,
      },
      {
        path: 'orderLog',
        name: 'OrderLog',
        component: () => import('@/views/order/orderLog'),
        meta: {
          title: '账变记录',
          noKeepAlive: true,
        permissions: ['3002','30021','30022','30023','30024','30025','30026','30020'],

        },
        children: null,
      },
      {
        path: 'reportList',
        name: 'ReportList',
        component: () => import('@/views/order/report'),
        meta: {
          title: '交易报表',
          noKeepAlive: true,
        permissions: ['3005','30051','30052','30053','30054','30055','30056','30050'],
        },
        children: null,
      },
    ],
  },
  
  {
    path: '/admin',
    component: Layout,
    redirect: 'noRedirect',
    name: 'admin',
    meta: { title: '管理人员', icon: 'users-cog',
    permissions: ['20010','20020','20030','2001','20011','20012','20013','20014','20015','20016','2002','20021','20022','20023','20024','20025','20026','2003','20031','20032','20033','20034','20035','20036']
  },
    children: [
      {
        path: 'adminList',
        name: 'AdminList',
        component: () =>
          import('@/views/admin/adminList/index'),
        meta: { permissions: ['2001','20011','20012','20013','20014','20015','20016','20010'],title: '管理员' },
      },
      {
        path: 'user',
        name: 'User',
        component: () =>
          import('@/views/admin/adminList/user'),
        meta: { permissions: ['2002','20021','20022','20023','20024','20025','20026','20020'],title: '角色列表' },
      },
      {
        path: 'adminLog',
        name: 'AdminLog',
        component: () =>
          import('@/views/admin/adminLog/index'),
        meta: { permissions: ['2003','20031','20032','20033','20034','20035','20036','20030'],title: '操作日志' },
      },
      {
        path: 'adminLogin',
        name: 'adminLogin',
        component: () =>
          import('@/views/admin/adminLog/login'),
        meta: { permissions: ['2004','20041','20042','20043','20044','20045','20046','20040'],title: '登录日志' },
        //meta: { permissions: ['2004','20041','20042','20043','20044','20045','20046','20040'],title: '登录日志' },
      },
    ],
  },
  {
    path: '/chatOnline',
    component: Layout,
    redirect: 'noRedirect',
    name: 'chat',
    meta: { title: '在线客服', icon: 'users-cog',
    permissions: ['70010','70020','70030','70040','7001','70011','70012','70013','70014','70015','70016','7002','70021','70022','70023','70024','70025','70026','7003','70031','70032','70033','70034','70035','70036','kefu']
  },
    children: [
      {
        path: 'log',
        name: 'log',
        component: () =>
          import('@/views/chat/log'),
        meta: { title: '聊天记录', permissions: ['7001','70011','70012','70013','70014','70015','70016','70010']  },
      },
      {
        path: 'kefuLog',
        name: 'kefuLog',
        component: () =>
          import('@/views/chat/kefuLog'),
        meta: { title: '咨询记录', permissions: ['7002','70021','70022','70023','70024','70025','70026','70020']},
      },
      {
        path: 'user',
        name: 'user',
        component: () =>
          import('@/views/chat/kefuList'),
        meta: { title: '客服列表', permissions: ['7003','70031','70032','70033','70034','70035','70036','70030']},
      },
      {
        path: 'chat',
        name: 'chat',
        component: () =>
          import('@/views/chat/chat'),
        meta: { title: '对话列表', permissions: ['kefu']},
      },
    ],
  },
  {
    path: '/chat',
    component: Layout,
    redirect: 'noRedirect',
    name: 'chat',
    meta: { title: '聊天设置', icon: 'users-cog',permissions: ['6001','60011','60012','60013','60014','60015','60016','60017','60010']},
    children: [
      /* {
        path: 'user',
        name: 'user',
        component: () =>
          import('@/views/chat/userList'),
        meta: { title: '聊天会员列表', permissions: ['6003','60031','60032','60033','60034','60035']  },
      }, */
      {
        path: 'index',
        name: 'Index',
        component: () =>
          import('@/views/chat/set'),
        meta: { title: '快捷聊天设置', permissions: ['6001','60011','60012','60013','60014','60015','60016','60017','60010'] },
      },
    ],
  },
  {
    path: '/system',
    component: Layout,
    redirect: 'noRedirect',
    name: 'system',
    meta: { title: '系统设置', icon: 'users-cog',permissions: ['4001','40011','40012','40013','40014','40015','40016'] },

    children: [
      {
        path: 'index',
        name: 'Index',
        component: () =>
          import('@/views/setting/index'),
        meta: { permissions: ['4001','40011','40012','40013','40014','40015','40016'],title: '配置列表' },
      },
      /* {
        path: 'other',
        name: 'other',
        component: () =>
          import('@/views/setting/index'),
        meta: { permissions: ['4002','40021','40022','40023','40024','40025','40026'],title: '操作日志', icon: 'users-cog' },

      }, */
    ],
  },
  
  /* {
    path: '/error',
    component: EmptyLayout,
    redirect: 'noRedirect',
    name: 'Error',
    meta: { title: '错误页', icon: 'bug' },
    children: [
      {
        path: '401',
        name: 'Error401',
        component: () => import('@/views/401'),
        meta: { title: '401' },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/404'),
        meta: { title: '404' },
      },
    ],
  }, */
  {
    path: '*',
    redirect: '/index',
    hidden: true,
  },
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router
