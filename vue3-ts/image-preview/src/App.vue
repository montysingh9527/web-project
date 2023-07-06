<template>
  <image-preview :data="data"></image-preview>
</template>

<script lang="ts" setup>

import ImagePreview from './components/ImagePreview/index.vue';

const data = [
  {
    id: 1,
    image: "src/assets/images/1.jpeg",
    rotate: 0,
    scale: 1
  },
  {
    id: 2,
    image: "src/assets/images/2.jpeg",
    rotate: 0,
    scale: 1
  },
  {
    id: 3,
    image: "src/assets/images/3.jpeg",
    rotate: 0,
    scale: 1
  },
  {
    id: 4,
    image: "src/assets/images/4.jpeg",
    rotate: 0,
    scale: 1
  },
  {
    id: 5,
    image: "src/assets/images/5.jpeg",
    rotate: 0,
    scale: 1
  },
  {
    id: 6,
    image: "src/assets/images/6.jpeg",
    rotate: 0,
    scale: 1
  }
]
</script>
