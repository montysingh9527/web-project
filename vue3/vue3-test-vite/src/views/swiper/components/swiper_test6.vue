    <!-- 
        modules -> 這個swiper能有什麼功能
        slides-pre-view -> 一個畫面有幾個slide
        navigation -> 允許左右切
        pagination -> 有下方的小點點、clickable -> 可以點那些小點點來切換slide
        loop -> 在第一張或最後一張slide是否可以反著切到最後一張或正著切回第一張
        @swiper -> 註冊swiper
    -->

<template>
	<swiper
		:modules="modules"
		:slides-per-view="4"
		navigation
		:pagination="{ clickable: true }"
		:loop="true"
		@swiper="setSwiperController"
		class="practiceSwiper"
	>
		<swiper-slide v-for="item in [1, 2, 3, 4, 5, 6]">
			<div class="slideContent"> Slide {{ item }} </div>
		</swiper-slide>
	</swiper>

	<div class="customBtns">
		<button id="prevBtn" class="customBtn" @click="swiperController.slidePrev()">Previous</button>
		<button id="nextBtn" class="customBtn" @click="swiperController.slideNext()">Next</button>
	</div>
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

// 使用swiper controller來透過其他html元素對swiper進行操控
let swiperController = ref(null)

const setSwiperController = (swiper) => {
	swiperController.value = swiper
}
</script>

<style scoped lang="scss">
.slideContent {
	height: 100px;
	width: 100px;

	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 14px;
	background-color: black;
	color: white;
}

.customBtns {
	text-align: center;
}

.customBtn {
	width: 80px;
	height: 50px;

	margin: 10px;

	background-color: rgb(48, 48, 255);
	color: white;
	box-shadow: 3px 5px black;

	font-size: 12px;

	border: 0px;
	border-radius: 100px;

	&:hover {
		background-color: rgb(102, 102, 255);
	}

	&:active {
		transform: translateY(5%);
		box-shadow: 0px 0px black;
	}
}
</style>