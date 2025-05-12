<!--
 * @Description: css测试首页
 * @Date: 2025-03-31 15:15:09
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\css_test\css_home\css_index.vue
-->
<template>
  <div class="css-home my-10">
    <chartWrap />
    <css-one class="my-10" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import chartWrap from "src/page/css_test/css_home/chart_wrap.vue";
import cssOne from "src/page/css_test/css_home/css_one.vue";
</script>

<style scoped lang="scss">
</style>
