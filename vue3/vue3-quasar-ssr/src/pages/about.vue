<!--
 * @Description: 
 * @Date: 2023-09-30 23:28:56
 * @FilePath: \web-project\vue3\vue3-quasar-ssr\src\pages\about.vue
-->
<template>
  <div class="about-page">
    <p>about</p>
    <q-btn @click="$router.push({name: 'home'})">跳转首页</q-btn>
  </div>
</template>
  
  <script setup>
import { useMeta } from "quasar";

useMeta({
  title: "关于-About",
  titleTemplate: (title) => `${title}-我们`,

  meta: {
    title: {
      name: "关于我们",
      content: "关于我们-abouts",
    },
    description: {
      name: "关于我们-description-name",
      content: "关于我们-description-content",
    }
  },
});
</script>
  
  <style scoped lang="scss">
</style>