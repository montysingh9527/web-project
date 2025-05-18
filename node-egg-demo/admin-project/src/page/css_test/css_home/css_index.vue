<!--
 * @Description: css测试首页
 * @Date: 2025-03-31 15:15:09
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\css_test\css_home\css_index.vue
-->
<template>
  <div class="css-home my-10">
    <div>
      <csstimer />
    </div>
    <chartWrap />
    <css-one class="my-10" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useTimerStore } from 'src/store/useTimerStore.js';
import chartWrap from "src/page/css_test/css_home/chart_wrap.vue";
import cssOne from "src/page/css_test/css_home/css_one.vue";
import csstimer from "src/page/css_test/css_timer.vue";


const timer = useTimerStore();
timer.start(300); // 例如 5 分钟倒计时
</script>

<style scoped lang="scss">
</style>
