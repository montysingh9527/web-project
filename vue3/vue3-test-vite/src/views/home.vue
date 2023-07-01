<template>
  <div class="home">
    <div class="home-title">后台管理系统</div>
    <a-button @click="sendText">发送</a-button>
    <a-button @click="btnReload">刷新浏览器</a-button>
    <about></about>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { api_home } from "@/request";

import About from "@/views/about.vue";

export default defineComponent({
  name: "HomeView",
  components: { About },
  setup() {
    const sendText = () => {
      api_home.gethome({}).then((res) => {
        console.log("=====res===res===", res);
      });
    };

    const btnReload = () => {
      window.location.reload();
    };

    const title = {
      test:""
    }

    return {
      sendText,
      btnReload,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-title {
  color: rgb(132, 234, 68);
}
</style>
