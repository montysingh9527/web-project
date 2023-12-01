<template>
  <div class="pages-index">
    <div class="chou-ti" @mousemove="chouti = true" @mouseout="chouti = false">
      <span>联系</span>
      <div
        v-show="chouti"
        :class="['chou-ti-text', { 'chout-ti-mouse': chouti }]"
      >
        1989382939
      </div>
    </div>
    <!-- 利用i标签设置虚线 -->
    <iBackground />
    <!-- 伪元素传值 :after content: attr()   样式局部变量--attrC -->
    <contentAttr />
    <!-- 动画 -->
    <animationText />
  </div>
</template>

<script setup>
import { ref } from "vue";
import iBackground from "./components/i_background.vue";
import contentAttr from "./components/content_attr.vue"; 
import animationText from "./components/animation.vue"; 

const chouti = ref(false);
</script>

<style scoped lang="scss">
$primary   : #1976D2;
@import "src/css/file_path.scss";
.pages-index {
  .chou-ti {
    width: fit-content;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: $primary;
    position: relative;
    cursor: pointer;
    background: url($BASE_SCSS + "/404.png");
    background-image: url($BASE_File + "/404.png");
    &-text {
      position: absolute;
      padding: 0 10px;
      top: 0;
      left: 50px;
      width: 0px;
      background-color: #ab399c;
      transition: all 3s;
      // animation: choutianimt 1.5s forwards;
      &.chout-ti-mouse {
        width: 100px;
      }
    }
  }
}

@keyframes choutianimt {
  from {
    left: -150px;
  }
  to {
    left: 50px;
  }
}
</style>
