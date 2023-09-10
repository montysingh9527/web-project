<!--
 * @Description: 
 * @Date: 2023-09-08 22:50:52
 * @FilePath: \web-project\vue3\vue3-test-vite\src\views\swiperRow\index.vue
-->
<template>
	<div class="swiper">
        <div>
			<swipertest0></swipertest0>
		</div>
		<div class="mt10">
			<swiperColumn></swiperColumn>
		</div>
	</div>
</template>

<script setup>
import swipertest0 from '@/views/swiperRow/components/swiper_row.vue'
import swiperColumn from '@/views/swiperRow/components/swiper_column.vue'
</script>

<style scoped lang="scss">
.mt10 {
	margin-top: 10px;
}
</style>