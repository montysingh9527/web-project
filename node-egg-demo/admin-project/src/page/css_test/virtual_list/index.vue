<!--
 * @Description: 虚拟列表
 * @Date: 2024-11-29 19:58:48
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\css_test\virtual_list\index.vue
-->
<template>
  <div class="virtual-list-box">
    <div class="virtual-test">
      <virtual_test />
    </div>
    <div class="virtual-test">
      <virtualTestTwo />
    </div>
  </div>
</template>

<script setup>
import virtual_test from "src/page/css_test/virtual_list/virtual_test.vue";
import virtualTestTwo from "src/page/css_test/virtual_list/virtual_test_two.vue";
</script>

<style scoped lang="scss"></style>
