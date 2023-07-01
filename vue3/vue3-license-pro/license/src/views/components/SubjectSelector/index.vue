<template>
  <div class="selector-wrapper">
    <select-item
      v-for="(item, index) of subjectData"
      :key="index"
      :item="item"
    />
  </div>
</template>
<script>
import SelectItem from "./item.vue";
import subjectData from "../../../configs/subject";
export default {
  name: "SubjectSelector",
  components: { SelectItem },
  setup() {
    return {
      subjectData, // 静态数据直接返回
    };
  },
};
</script>

<style scoped lang="scss">
.selector-wrapper {
  display: flex;
  flex-direction: row;
  padding: 0.15rem 0.1rem;
  box-sizing: border-box;
}
</style>
