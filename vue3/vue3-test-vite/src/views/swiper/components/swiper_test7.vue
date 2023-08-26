<template>
	<swiper class="swiper" :options="swiperOption">
		<swiper-slide>Slide 1</swiper-slide>
		<swiper-slide>Slide 2</swiper-slide>
		<swiper-slide>
			<img src="../../assets/img/logo.png" alt="" />
		</swiper-slide>
		<swiper-slide>Slide 4</swiper-slide>
		<swiper-slide>Slide 5</swiper-slide>
		<swiper-slide>Slide 6</swiper-slide>
		<swiper-slide>Slide 7</swiper-slide>
		<swiper-slide>Slide 8</swiper-slide>
		<swiper-slide>Slide 9</swiper-slide>
		<swiper-slide>Slide 10</swiper-slide>
		<div class="swiper-pagination" slot="pagination"></div>
		<div class="swiper-button-prev" slot="button-prev"></div>
		<div class="swiper-button-next" slot="button-next"></div>
	</swiper>
</template>

  
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Controller } from 'swiper'
// import { Autoplay, Pagination, Navigation } from 'swiper'; //Scrollbar
import { ref } from 'vue'

/*
    Navigation: 左右切
    Pagination: 下方的小點點
*/
const modules = [Navigation, Pagination]

const swiperOption = {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	pagination: {
		el: '.swiper-pagination',
		clickab: true
	}
}
</script>

<style scoped lang="scss">
</style>