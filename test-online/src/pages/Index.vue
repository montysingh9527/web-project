<template>
  <div>
    <HeaderBar></HeaderBar>
    <q-btn @click="$router.push('css')" label="css案例"></q-btn>

    <div class="row q-ma-md">
      <PaoMaDeng></PaoMaDeng>
      <i18n></i18n>
      <chouqian />
    </div>
  </div>
</template>

<script>
import HeaderBar from "src/components/header.vue"; // 头部
import PaoMaDeng from "src/pages/vueTest/Test/paomadeng.vue"; // 跑马灯
import i18n from "src/pages/vueTest/Test/i18n.vue"; // i18n多语言
import chouqian from "src/pages/vueTest/Test/chouqian.vue"; // 抽签
export default {
  name: "HomeIndex",
  components: { HeaderBar, PaoMaDeng, i18n, chouqian },
};
</script>
