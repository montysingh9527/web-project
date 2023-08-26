import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'

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
			path: '/swiper',
			name: 'swiper',
			component: () => import('@/views/swiper/index.vue')
		}
	]
})

export default router
