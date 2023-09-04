<template>
	<div class="project">
		<span style="color: red">test8</span>
		<div class="project-swiper" style="height: 400px; width: 300px">
			<swiper
				:slidesPerView="4"
				:spaceBetween="10"
				:grid="{
					fill: 'row',
					rows: 6
				}"
				:centeredSlides="false"
				:navigation="navigation"
				:modules="modules"
				:pagination="{ clickable: true, el: '.swiper-paginations' }"
				class="mySwiper"
			>
				<swiper-slide v-for="num in 8" :key="num" @click="onChange(num)">
					<div class="swiper-content">
						<img
							src="https://game.gtimg.cn/images/yxzj/cp/a20200321gmjy/v2/jiang-img2.jpg"
							style="width: 58px; height: 58px"
						/>
						<p class="swiper-content-text">{{ num }}</p>
					</div>
				</swiper-slide>
			</swiper>
			<!-- 左右两侧的方向按钮 -->
			<div class="button-prev1" @click.stop="prevEl">
				<span style="border: 1px solid">&lt;</span>
			</div>
			<div class="button-next2" @click.stop="nextEl">
				<span style="border: 1px solid">&gt;</span>
			</div>
			<div class="swiper-paginations"></div>
		</div>
	</div>
</template>
  
  <script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue' // swiper所需组件
import { Autoplay, Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/swiper-bundle.css'

// setup语法糖只需要这样创建一个变量就可以正常使用分页器和对应功能，如果没有这个数组则无法使用对应功能
const modules = [Autoplay, Pagination, Navigation, A11y]

const colom = [
	[
		{
			name: '111'
		},
		{
			name: '222'
		},
		{
			name: '333'
		},
		{
			name: '444'
		},
		{
			name: '555'
		},
		{
			name: '666'
		},
		{
			name: '777'
		}
	],
    [
		{
			name: '888'
		},
		{
			name: '999'
		},
		{
			name: '100'
		},
		{
			name: '11-1'
		},
		{
			name: '12-2'
		},
		{
			name: '13-3'
		},
		{
			name: '14-4'
		}
	]
]

const navigation = ref({
	nextEl: '.button-next1',
	prevEl: '.button-prev2'
})
const prevEl = () => {
	console.log('上一张')
}
const nextEl = () => {
	console.log('下一张')
}

const onChange = (num) => {
	console.log('--点击项---', num)
}
</script>
  
<style lang="scss" scoped>
.mySwiper {
	.swiper-slide {
		text-align: center;
		font-size: 18px;
		background: #fff;
		height: calc((100% - 30px) / 2);
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
	}
}
// .project-swiper {
// 	width: 100%;
// 	max-width: 600px; /* 设置容器的最大宽度 */
// }

// .swiper-slide {
// 	width: calc(33.33% - 20px); /* 计算每列的宽度，包括间距 */
// 	margin-right: 20px; /* 设置列之间的间距 */
// 	margin-bottom: 20px; /* 设置行之间的间距 */
// 	float: left; /* 浮动以实现列布局 */
// 	box-sizing: border-box; /* 确保盒子模型正确 */
// }

// /* 清除浮动，以防止父元素塌陷 */
// .swiper-wrapper::after {
// 	content: '';
// 	display: table;
// 	clear: both;
// }
// .project {
// 	width: 94%;
// 	border: 1px solid #000;
// 	&-swiper {
// 		position: relative;
// 		width: 84%;
// 		margin: auto;
// 		swiper {
// 			width: 100%;
// 			swiper-slide {
// 				height: 100%;
// 				box-shadow: 0 3px 6px 1px rgba(0, 0, 0, 0.16);
// 				border-radius: 4px 4px 4px 4px;
// 				opacity: 1;
// 				border: 1px solid #e4e5ea;
// 				background: #f9fafe;
// 			}
// 		}
// 		.button-prev {
// 			position: absolute;
// 			top: 50px;
// 			font-size: 50px;
// 			left: -45px;
// 			cursor: pointer;
// 		}
// 		.button-next {
// 			position: absolute;
// 			top: 50px;
// 			font-size: 50px;
// 			right: -40px;
// 			cursor: pointer;
// 		}
// 		.swiper-paginations {
// 			position: absolute;
// 			top: 100px;
// 			font-size: 50px;
// 			::v-deep(.swiper-pagination-bullet) {
// 				width: 30px;
// 				border-radius: 5px;
// 				background-color: #003261;
// 			}
// 			::v-deep(.swiper-pagination-bullet-active) {
// 				width: 30px;
// 				border-radius: 5px;
// 				background-color: orange;
// 			}
// 		}
// 	}
// }

// .swiper-content {
// 	text-align: center;
// 	border: 1px solid #23abf5;
// 	//width: 176px;
// 	height: 94px;
// 	margin: 40px 0;
// 	border-right: 1px solid #e4e5ea;

// 	&-text {
// 		// margin: 11px auto 0;
// 		// width: 127px;
// 		height: 25px;
// 		font-size: 16px;
// 		//font-family: Microsoft YaHei-Regular, Microsoft YaHei;
// 		font-weight: 400;
// 		color: #2f353b;
// 		line-height: 25px;
// 		-webkit-background-clip: text;
// 		//-webkit-text-fill-color: transparent;
// 	}
// }

// .write {
// 	width: 4px;
// 	background-color: #ffffff;
// 	height: 176px;
// 	position: absolute;
// 	top: 0;
// 	right: 0;
// 	z-index: 99;
// }

// .mySwiper {
// 	position: relative;
// 	::v-deep(.swiper-pagination) {
// 		position: absolute;
// 		top: -8px;
// 	}
// 	::v-deep(.swiper-pagination-bullet) {
// 		width: 30px;
// 		border-radius: 5px;
// 		background-color: #003261;
// 	}
// 	::v-deep(.swiper-pagination-bullet-active) {
// 		width: 30px;
// 		border-radius: 5px;
// 		background-color: orange;
// 	}
// }
</style>

