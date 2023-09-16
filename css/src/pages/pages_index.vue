<template>
  <div class="pages-index">
    <div class="chou-ti" @mousemove="chouti = true"  @mouseout="chouti = false">
      <span>联系</span>
      <div v-show="chouti" :class="['chou-ti-text', {'chout-ti-mouse': chouti}]">1989382939</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const chouti = ref(false);
</script>

<style scoped lang="scss">
.pages-index {
  .chou-ti {
    width: 50px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: #00d5ff;
    position: relative;
    cursor: pointer;
    &-text {
      position: absolute;
      top: 0;
      background-color: #ab399c;
      animation: choutianimt 1.5s forwards;
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
