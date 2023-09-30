<!--
 * @Description: 
 * @Date: 2023-09-30 23:25:01
 * @FilePath: \web-project\vue3\vue3-quasar-ssr\src\pages\home.vue
-->
<template>
  <div class="home-page">
    <p>home</p>
    <q-btn @click="$router.push({ name: 'about' })">跳转关于我们</q-btn>
  </div>
</template>

<script setup>
import { useMeta } from "quasar";
import getMeta from "src/boot/get_meta.js";

useMeta({
  title: "首页-Home",
  titleTemplate: (title) => `${title} | Quasar Framework`,

  meta: getMeta("首页", "Developer-oriented-首页信息"),
});
</script>

<style scoped lang="scss">
</style>
