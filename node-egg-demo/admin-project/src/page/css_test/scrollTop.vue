<!--
 * @Description: 置顶
 * @Date: 2025-03-31 16:07:56
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\css_test\scrollTop.vue
-->
<template>
  <div class="scrollTop" v-show="isTop" @click="onTop"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const props = defineProps({
  isTop: {
    type: Boolean,
    default: false,
  },
});

// 滚动到顶部
function onTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
</script>

<style scoped lang="scss">
.scrollTop {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #b9b9b9;
  height: 30px;
  width: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    top: 35%;
    left: 25%;
    height: 15px;
    width: 15px;
    border-top: 2px solid red;
    border-left: 2px solid red;
    transform: rotate(45deg);
  }
}
</style>
