import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import { useActrouteStore } from '@/stores/act_router.js'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/admin',
			name: 'admin',
			component: () => import('@/views/components/admin.vue')
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('@/views/about.vue')
		},
		{
			path: '/swiper',
			name: 'swiper',
			component: () => import('@/views/swiper/index.vue')
		}
	]
})

router.beforeEach((to, from, next) => {
	const useActroute = useActrouteStore()
	// 保存路由名称
	useActroute.set_route(to.name)
	next()
})

export default router
