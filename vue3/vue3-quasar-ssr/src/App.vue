<!--
 * @Description: 
 * @Date: 2023-09-30 21:00:29
 * @FilePath: \web-project\vue3\vue3-quasar-ssr\src\App.vue
-->
<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { Platform } from "quasar";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "App",
  setup() {
    const router = useRouter();
    console.log("-App--logs-router--", router);

    onMounted(() => {
      const is_h5 = Platform.is.mobile;
      console.log("---logs-Platform--", is_h5, "---", Platform);
      let name = "";
      if (is_h5) {
        name = "h5";
      } else {
        name = "pc";
      }
      router.push({ name });
    });
    return {};
  },
});
</script>
