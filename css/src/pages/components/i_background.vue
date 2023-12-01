<!--
 * @Description: 利用i标签设置虚线
 * @Date: 2023-09-20 21:57:12
 * @FilePath: \web-project\css\src\pages\components\i_background.vue
-->

<template>
  <div class="i-background">
    <i class="dashed-i"></i>
    <div class="round"></div>
    <div class="round"></div>
    <div class="round"></div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.i-background {
  // border: 1px dashed red;
  display: flex;
  position: relative;
  width: 215px;
  .dashed-i {
    position: absolute;
    background-image: repeating-linear-gradient(
      90deg,
      #0000,
      #0000 8px,
      #3699b5cc 0,
      #5157fbcc 15px,
      #0000 0
    );
    display: block;
    height: 2px;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }
  .round {
    height: 50px;
    width: 50px;
    margin: 10px;
    border-radius: 50%;
    background-color: var(--rr-color-red);
    z-index: 1;
  }
}
</style>
