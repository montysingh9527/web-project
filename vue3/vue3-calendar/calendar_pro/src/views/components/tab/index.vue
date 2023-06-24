<template>
  <div class="tab">
    <div class="tab-item" v-for="(item, index) of tabData" :key="index">
      <TabIcon :iconText="item.iconText" :path="item.path">
        {{ item.tabText }}</TabIcon
      >
    </div>
  </div>
</template>
  <script>
import TabIcon from "./icon.vue";
import tabData from "../../../data/tab";

import { reactive } from "vue";
export default {
  name: "Tab",
  components: {
    TabIcon,
  },
  setup() {
    const state = reactive({
      tabData, // 将静态数据转响应式数据
    });
    return {
      ...state,
    };
  },
};
</script>
  
  <style scoped lang="scss">
.tab {
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 0.44rem;
  border-top: 1px solid #ddd;
  background-color: #fff;
  .tab-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33.33%;
    height: 100%;
  }
}
</style>
  