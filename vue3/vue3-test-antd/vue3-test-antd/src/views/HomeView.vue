<template>
  <div class="home">
    <img alt="Vue logo" :src="imgs" />
    <a-button @click="sendText">发送</a-button>
    <about></about>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { api_home } from "@/request"

const imgs = require("@/assets/logo.png");
import About from "@/views/about.vue";

export default defineComponent({
  name: "HomeView",
  components: { About },
  setup() {

    const sendText = () => {
      api_home.gethome({}).then(res=>{
        console.log("=====res===res===",res)
      })
    }
    return {
      imgs,
      sendText,
    };
  },
});
</script>
