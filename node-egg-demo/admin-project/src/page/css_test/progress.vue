<!--
 * @Description: css测试
 * @Date: 2024-08-13 00:59:54
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\css_test\progress.vue
-->
<template>
    <div ref="progressRef" class="progress-box">
        <div>css测试</div>
        <div id="progressBar"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";


const progressRef = ref(null);


/**
 * 滚动顶部进度条
 */
function handleScroll() {
    console.log('---logs-xxx--',);
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    var windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrollPercentage = (scrollPosition / windowHeight) * 100;
    var progressBar = document.getElementById('progressBar');
    progressBar.style.width = scrollPercentage + '%';
};



onMounted(() => {
    console.log('---logs-xxc--', progressRef?.value);
    progressRef?.value.addEventListener("scroll", handleScroll)
})


// 清理事件监听器
onUnmounted(() => {
    if (progressRef.value) {
        progressRef.value.removeEventListener('scroll', docScroll);
    }
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
