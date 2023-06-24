<template>
  <div class="selector-wrapper">
    <SelectorItem
      v-for="(item, index) of modelData"
      :key="index"
      :item="item"
    />
  </div>
</template>
<script>
import SelectorItem from "./item.vue";
import modelData from "../../../configs/model";

export default {
  name: "ModelItem",
  components: { SelectorItem },
  props: {},

  setup(props, ctx) {
    return {
      modelData,
    };
  },
};
</script>
  
  <style lang="scss" scoped>
.selector-wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 0.15rem 0.1rem;
  box-sizing: border-box;
}
</style>