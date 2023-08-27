<template>
	<teleport to="head title">-{{ routeIndex }}</teleport>
	<teleport to="head">
		<meta
			v-for="(meta, index) in metaData[routeIndex]"
			:key="index"
			:property="meta.property"
			:name="meta.name"
			:content="meta.content"
		/>
	</teleport>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useActrouteStore } from '@/stores/act_router.js'

const useActroute = useActrouteStore()
const routeIndex = ref('home')

const metaData = {
	home: [
		{ name: '管理后台-home', content: '管理后台—home-content' },
		{ name: 'description', content: '管理后台—home-description' },
		{ name: 'keywords', content: '管理后台—home-代码,前端,后端,' },
		{ property: 'og:title', content: '管理后台—home-og:title代码,前端,后端' },
		{ property: 'og:description', content: '管理后台—og:description' }
	],
	about: [
		{ name: '管理后台-about', content: '管理后台—about-content' },
		{ name: 'description', content: '管理后台—about-description' },
		{ name: 'keywords', content: '管理后台—about-代码,前端,后端,' },
		{ property: 'og:title', content: '管理后台—about-og:title代码,前端,后端' },
		{ property: 'og:description', content: '管理后台—about-og:description' }
	]
}

const router = useRouter()

watch(
	() => router,
	(val) => {
		console.log('---logs-seo_teleport--', val)
	},
	{
		immediate: true
	}
)

watch(
	() => useActroute.act_route,
	(value) => {
		routeIndex.value = value
		console.log('---logs-act_route--', routeIndex.value)
	}
)
</script>

