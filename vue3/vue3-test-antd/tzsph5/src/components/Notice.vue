<template>
  <div v-show="state.isShow" class="box">
    <div class="bg"></div>
    <div class="ct">
      <span class="sp">{{ text }}</span>
      <van-button class="next" @click="cancel()">Close</van-button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "",
  props: {
    text: String,
  },
  emits: ["close"],
  setup(props, context) {
    const state = reactive({
      height: document.documentElement.clientHeight,
      isShow: true,
    });
    const { text } = props;
    const cancel = () => {
      state.isShow = false;
    };
    return {
      props,
      state,
      cancel,
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  z-index: 999;

  .bg {
    position: absolute;
    background: #000;
    opacity: 0.5;
    width: 100%;
    height: 100%;
  }

  .ct {
    position: absolute;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    background: white;
    width: 80%;
    min-height: 130px;
    border-radius: 10px;
    flex-direction: column;

    .sp {
      width: 80%;
      text-align: center;
      font-size: 15px;
    }
    .next {
      margin-top: 20px;
      width: 150px;
      height: 40px;
      background: red;
      color: white;
    }
  }
}
</style>
