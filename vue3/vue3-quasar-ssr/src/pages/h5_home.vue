<!--
 * @Description: 
 * @Date: 2023-11-05 23:26:35
 * @FilePath: \web-project\vue3\vue3-quasar-ssr\src\pages\h5_home.vue
-->
<template>
  <div class="h5-home-page">
    <p>h5-home</p>
    <q-btn @click="$router.push({ name: 'h5about' })">h5-跳转关于我们</q-btn>
  </div>
</template>
  
  <script setup>
import { useMeta } from "quasar";
import getMeta from "src/boot/get_meta.js";

useMeta({
  title: "h5-首页-Home",
  titleTemplate: (title) => `${title} | Quasar Framework`,

  meta: getMeta("h5-首页", "Developer-oriented-h5-首页信息"),
});
console.log("---logs--H5-");
</script>
  
  <style scoped lang="scss">
</style>
  