import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { useStore } from 'vuex'
import { regUser, getUserInfo } from '../api/user'

// NProgress.configure({ showSpinner: false });  //不要转圈

// 白名单路由列表，无需登录
const whiteList = ['/login', '/register', '/forget']

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'main',
        redirect: '/home',
        component: () => import(/* webpackChunkName: "main" */ '@/views/Main.vue'),
        children: [
            {
                path: '/home',
                name: '/home',
                component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
            },
            {
                path: '/notification',
                name: '/notification',
                component: () => import(/* webpackChunkName: "notification" */ '@/views/notification/index.vue')
            },
            {
                path: '/compose',
                name: '/compose',
                component: () => import(/* webpackChunkName: "compose" */ '@/views/compose/index.vue')
            },
            {
                path: '/messages',
                name: '/messages',
                component: () => import(/* webpackChunkName: "messages" */ '@/views/messages/index.vue')
            },

            {
                path: '/settings',
                name: '/settings',
                component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/index.vue')
            },
            {
                path: '/settings/password',
                name: '/settings/password',
                component: () => import(/* webpackChunkName: "settingspassword" */ '@/views/settings/password.vue')
            },
            {
                path: '/settings/mail',
                name: '/settings/mail',
                component: () => import(/* webpackChunkName: "settingsmail" */ '@/views/settings/mail.vue')
            },
            {
                path: '/settings/nickname',
                name: '/settings/nickname',
                component: () => import(/* webpackChunkName: "settingsnickname" */ '@/views/settings/nickname.vue')
            },
            {
                path: '/settings/introduction',
                name: '/settings/introduction',
                component: () => import(/* webpackChunkName: "settingsintroduction" */ '@/views/settings/introduction.vue')
            },
            {
                path: '/personal',
                name: '/personal',
                component: () => import(/* webpackChunkName: "personal" */ '@/views/personal/index.vue')
            },
        ],
        
    },

    {
        path: '/fav',
        name: '/fav',
        component: () => import(/* webpackChunkName: "fav" */ '@/views/fav/index.vue')
    },
    {
        path: '/contacts',
        name: '/contacts',
        component: () => import(/* webpackChunkName: "contacts" */ '@/views/contacts/index.vue')
    },
    {
        path: '/serach',
        name: '/serach',
        component: () => import(/* webpackChunkName: "serach" */ '@/views/serach/index.vue')
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
        next() 
})

router.afterEach(() => {
    NProgress.done()
})

export default router
