<!-- 新手引导 -->
<template>
  <div class="guide-content">
    <div class="guide">
      <div>新手引导</div>
      <button @click="start">开始</button>
    </div>
    <guide class="guide-com" v-if="show_guide" @onClose="onClose"></guide>
  </div>
</template>
<script>
import guide from "./component/guide.vue";
export default {
  name: "guideIndex",
  components: { guide },
  data() {
    return {
        show_guide: false,
    };
  },
  created() {},
  methods: {
    start(){
        this.show_guide = true;
    },
    onClose(){
        this.show_guide = false;
    }
  },
};
</script>

<style scoped lang="scss">
.guide {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.guide-com{
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
}
</style>
