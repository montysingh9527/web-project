// 设置路由名称

import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useActrouteStore = defineStore('actroute', () => {
	// 路由名称
	const act_route = ref('home')
	// 设置路由名称
	function set_route(val) {
		act_route.value = val
	}

	return { act_route, set_route }
})
