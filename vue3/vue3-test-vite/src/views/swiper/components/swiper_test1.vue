<template>
	<div class="swiper-test1">
		<div>swiper-test1</div>
		<swiper
			:modules="modules"
			:slides-per-view="3"
			:space-between="50"
			navigation
			:pagination="{ clickable: true }"
			:scrollbar="{ draggable: true }"
			@swiper="onSwiper"
			@slideChange="onSlideChange"
		>
			<swiper-slide>Slide 1</swiper-slide>
			<swiper-slide>Slide 2</swiper-slide>
			<swiper-slide>Slide 3</swiper-slide>
			<swiper-slide>Slide 4</swiper-slide>
			<swiper-slide>Slide 5</swiper-slide>
			<swiper-slide>Slide 6</swiper-slide>
			<swiper-slide>Slide 7</swiper-slide>
		</swiper>
	</div>
</template>

<script setup>
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

const modules = [Navigation, Pagination, Scrollbar, A11y]

const onSwiper = (swiper) => {
	console.log("swiper==>>",swiper)
}
const onSlideChange = (val) => {
	console.log('slide change==>>', val)
}
</script>

<style scoped lang="scss">
.swiper-test1 {
	border: 1px solid #000;
}
</style>
