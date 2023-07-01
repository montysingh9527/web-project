<template>
  <div id="app">
    <my-header>{{ headerTitle }}</my-header>
    <SearchInput :placeholder="placeholder" :maxlength="maxlength" />
    <router-view />
    <Tab />
  </div>
</template>

<script>
import MyHeader from "./views/components/header"; // 顶部title
import Tab from "./views/components/tab"; // 底部tab栏
import SearchInput from "./views/components/searchInput"; // 搜索

import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "App",
  components: {
    MyHeader,
    Tab,
    SearchInput,
  },
  setup() {
    const store = useStore(),
      state = store.state,
      router = useRouter();

    router.push("/");
    // 设置搜索框文字提示
    store.commit("setPlaceholder", "day");

    watch(
      () => {
        return router.currentRoute.value.name;
      },
      (value) => {
        console.log("====value====>>>", value);
        // 设置顶部title
        store.commit("setHeaderTitle", value);
        // 设置搜索框文字提示
        store.commit("setPlaceholder", value);
        // 设置搜索框输入长度
        store.commit("setMaxLength", value);
      }
    );

    return computed(() => state).value; // {}
  },
};
</script>
