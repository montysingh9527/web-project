import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { regUser, getUserInfo } from '../api/user'

// NProgress.configure({ showSpinner: false });  //不要转圈

// 白名单路由列表，无需登录
const whiteList = ['/login', '/register', '/forget']

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        // name: 'main',
        redirect: '/home',
        // component: () => import(/* webpackChunkName: "about" */ '@/views/home/index.vue')
    },
    {
        path: '/home',
        name: '/home',
        component: () => import(/* webpackChunkName: "about" */ '@/views/home/index.vue')
    },
    {
        path: '/play',
        name: '/play',
        component: () => import(/* webpackChunkName: "about" */ '@/views/play/index.vue')
    },
    {
        path: '/setting',
        name: '/setting',
        component: () => import(/* webpackChunkName: "about" */ '@/views/setting/index.vue')
    },
    {
        path: '/edit',
        name: '/edit',
        component: () => import(/* webpackChunkName: "about" */ '@/views/edit/index.vue')
    },
    {
        path: '/bindPhone',
        name: '/bindPhone',
        component: () => import(/* webpackChunkName: "about" */ '@/views/bindPhone/index.vue')
    },
    {
        path: '/my',
        name: '/my',
        component: () => import(/* webpackChunkName: "about" */ '@/views/my/index.vue')
    },
    {
        path: '/special',
        name: '/special',
        component: () => import(/* webpackChunkName: "about" */ '@/views/special/index.vue')
    },
    {
        path: '/actor',
        name: '/actor',
        component: () => import(/* webpackChunkName: "about" */ '@/views/actor/index.vue')
    },
    {
        path: '/actorDetail',
        name: '/actorDetail',
        component: () => import(/* webpackChunkName: "about" */ '@/views/actor/ActorDetail.vue')
    },
    {
        path: '/updatePwd',
        name: '/updatePwd',
        component: () => import(/* webpackChunkName: "about" */ '@/views/updatePwd/index.vue')
    },
    {
        path: '/search',
        name: '/search',
        component: () => import(/* webpackChunkName: "about" */ '@/views/search/index.vue')
    },
    {
        path: '/vault',
        name: '/vault',
        component: () => import(/* webpackChunkName: "about" */ '@/views/vault/index.vue')
    },
    {
        path: '/login',
        name: '/login',
        component: () => import(/* webpackChunkName: "about" */ '@/views/login/index.vue')
    },
    {
        path: '/coin',
        name: '/coin',
        component: () => import(/* webpackChunkName: "about" */ '@/views/coin/index.vue')
    },
    {
        path: '/vip',
        name: '/vip',
        component: () => import(/* webpackChunkName: "about" */ '@/views/vip/index.vue')
    },
    {
        path: '/register',
        name: '/register',
        component: () => import(/* webpackChunkName: "about" */ '@/views/register/index.vue')
    },
    {
        path: '/theme',
        name: '/theme',
        component: () => import(/* webpackChunkName: "about" */ '@/views/theme/index.vue')
    },
    {
        path: '/rr',
        name: '/rr',
        component: () => import(/* webpackChunkName: "about" */ '@/views/rr/index.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]
const router = createRouter({
    history: createWebHistory('/m/'),
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start()

    if (!localStorage.getItem('userDetail')) {
        regUser({ devType: '3' }).then((res) => {
            if (res.code !== 0) {
                Toast.fail(res.message)
            } else {
                localStorage.setItem('userDetail', JSON.stringify(res.result))
                next() 
            }
        })
    }else{
        next() 
    }
   
})

router.afterEach(() => {
    NProgress.done()
})

export default router
