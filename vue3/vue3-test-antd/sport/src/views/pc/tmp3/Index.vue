<template>
  <div class="index-pc-tmp3">
    <PcHeader />
    <div class="pc-tmp3-container scroll-y hide-scroll-bar">
      <router-view />
    </div>
  </div>
</template>
<script>
// 缓存选中tab
export default {
  data() {
    return {
      scrollNotices: ''
    }
  },

  watch: {
    '$route'(to, from) {

    }
  },

  components: {
    PcHeader: () => import('../../../components/temp3/PcHeader.vue')
  },
}
</script>
<style type="text/css" lang="less">
@import "../../../assets/css/index";
.pc-tmp3-container {
  height: calc(100vh - 78px);
}
.index-pc-tmp3 {
  background:#f5fafd;
}
</style>
