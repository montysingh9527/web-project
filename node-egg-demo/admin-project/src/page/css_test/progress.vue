<!--
 * @Description: css测试
 * @Date: 2024-08-13 00:59:54
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\css_test\progress.vue
-->
<template>
  <div class="progress-box">
    <cssHome />
    <scrollTop :isTop="is_scrollTop" />
    <div id="progressBar" :style="{ width: progressWidth + '%' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import cssHome from "src/page/css_test/css_home/css_index.vue";
import scrollTop from "src/page/css_test/scrollTop.vue";

// 顶部进度条宽度
const progressWidth = ref(0);
// 是否显示置顶按钮
const is_scrollTop = ref(false);

/**
 * 滚动顶部进度条
 */
function handleScroll() {
  const scrollPosition =
    document.documentElement.scrollTop || document.body.scrollTop;
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  progressWidth.value = (scrollPosition / windowHeight) * 100;
  // 屏幕高度
  const screen_height = screen.height;

  is_scrollTop.value = screen_height / 2 < scrollPosition;
  console.log(is_scrollTop.value, "-进度条宽度-", progressWidth.value);
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// 清理事件监听器
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
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
  background-color: #ffa500;
  z-index: 1000;
  transition: width 0.25s ease-out;
}
</style>
