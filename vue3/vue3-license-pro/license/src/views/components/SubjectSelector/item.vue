<template>
  <div class="selector-item">
    <div
      :class="[
        'inner',
        {
          selected: item.id === subjectId,
        },
        {
          selecte1: item.id == 1,
        },
        {
          selecte2: item.id == 4,
        },
      ]"
      @click="setSubjectId(item.id)"
    >
      {{ item.subject }}-{{ item.id }}
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "SelectorItem",
  props: {
    item: Object,
  },

  setup(props, ctx) {
    console.log("===SelectorItem==", props.item);
    const store = useStore(),
      state = store.state;

    const setSubjectId = (id) => {
      console.log("==切换科目==>", id);
      store.commit("setSubjectId", id);
    };
    return {
      subjectId: computed(() => state.subjectId),
      setSubjectId,
    };
  },
};
</script>


<style lang="scss" scoped>
.selector-item {
  width: 50%;
  color: #fff;
  font-size: 0.16rem;
  padding: 0.15rem;
  box-sizing: border-box;
  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 0.05rem;
    padding: 0.5rem 0;
    transform: box-shadow 0.3s;
    &.selecte1 {
      background-color: #f0ad4e;
    }
    &.selecte2 {
      background-color: #5cb85c;
    }
    &.selected {
      box-shadow: 0.03rem 0.08rem 0.1rem #666;
    }
  }
}
</style>