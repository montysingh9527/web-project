<template>
  <div>
    <Header />
    <Home />
    <About />
    <Industry />
  </div>
</template>

<script>
import Header from "src/pages/h5_pc/header.vue";  // 头部
import Home from "src/pages/h5_pc/home.vue";   // 首页
import About from "src/pages/h5_pc/about.vue"; // 关于
import Industry from "src/pages/h5_pc/industry.vue"; // 产业讯息
export default {
  name: "PageIndex",
  components: {
    Header,
    Home,
    About,
    Industry,
  },
  data() {
    return {};
  },
};
</script>
