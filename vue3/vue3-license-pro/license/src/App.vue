<template>
  <div id="app">
    <MyHeader>{{ headerTitle }}</MyHeader>
    <router-view />
  </div>
</template>

<script>
import MyHeader from "./views/components/header.vue";

import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "App",
  components: { MyHeader },

  setup() {
    const store = useStore(),
      router = useRouter();

    router.push("/");

    watch(
      () => {
        return router.currentRoute.value.name;
      },
      (value) => {
        console.log("====路由名称===",value)
        store.commit("setHeaderTitle", value);
      }
    );

    return {
      headerTitle: computed(() => store.state.headerTitle),
    };
  },
};
</script>