<template>
  <div class="image-container">
    <img
      :src="item.image"
      :style="{
        transform: `rotate(${item.rotate}deg) scale(${item.scale})`,
      }"
      draggable="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { IImageData } from "./types";

const props = defineProps<{
  item: IImageData;
}>();

console.log("---logs---", props.item);
</script>

<style lang="scss">
.image-container {
  float: left;
  width: 440px;
  height: 248px;

  img {
    width: 100%;
    height: 100%;
    transition: all 0.3s;
  }
}
</style>