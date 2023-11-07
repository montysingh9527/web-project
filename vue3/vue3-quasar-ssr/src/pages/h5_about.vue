<!--
 * @Description: 
 * @Date: 2023-09-30 23:28:56
 * @FilePath: \web-project\vue3\vue3-quasar-ssr\src\pages\h5_about.vue
-->
<template>
  <div class="about-page">
    <p>H5-about</p>
    <q-btn @click="$router.push({ name: 'h5home' })">跳转H5-首页</q-btn>
  </div>
</template>
  
  <script setup>
import { useMeta } from "quasar";

useMeta({
  title: "H5-关于-About",
  titleTemplate: (title) => `${title}-我们`,

  meta: {
    title: {
      name: "H5-关于我们",
      content: "H5-关于我们-abouts",
    },
    description: {
      name: "H5-关于我们-description-name",
      content: "H5-关于我们-description-content",
    },
  },
});
</script>
  
  <style scoped lang="scss">
</style>