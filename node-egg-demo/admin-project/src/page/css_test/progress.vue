<!--
 * @Description: css测试
 * @Date: 2024-08-13 00:59:54
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\css_test\progress.vue
-->
<template>
    <div class="progress-box">
        <div id="progressBar" :style="{ width: progressWidth + '%' }"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";


const progressWidth = ref(0);

/**
 * 滚动顶部进度条
 */
function handleScroll() {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressWidth.value = (scrollPosition / windowHeight) * 100;
    console.log('---logs-progressWidth--', progressWidth.value);
};



onMounted(() => {
    window.addEventListener("scroll", handleScroll)
})


// 清理事件监听器
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

</script>

<style scoped lang="scss">
.progress-box {
    height: 4000px;
}

#progressBar {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 5px;
    background-color: #FFA500;
    z-index: 1000;
    transition: width 0.25s ease-out;
}
</style>
