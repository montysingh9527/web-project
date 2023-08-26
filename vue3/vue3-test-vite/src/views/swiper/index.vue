<template>
	<div class="swiper">
		<div>
			<swipertest1></swipertest1>
		</div>
		<div class="mt10">
			<swipertest2></swipertest2>
		</div>
		<div class="mt10">
			<swipertest3></swipertest3>
		</div>
		<div class="mt10">
			<swipertest4></swipertest4>
		</div>
		<div class="mt10">
			<swipertest5></swipertest5>
		</div>
        <div class="mt10">
			<swipertest6></swipertest6>
		</div>
	</div>
</template>

<script setup>
import swipertest1 from '@/views/swiper/components/swiper_test1.vue'
import swipertest2 from '@/views/swiper/components/swiper_test2.vue'
import swipertest3 from '@/views/swiper/components/swiper_test3.vue'
import swipertest4 from '@/views/swiper/components/swiper_test4.vue'
import swipertest5 from '@/views/swiper/components/swiper_test5.vue'
import swipertest6 from '@/views/swiper/components/swiper_test6.vue'
</script>

<style scoped lang="scss">
.mt10 {
	margin-top: 10px;
}
</style>
