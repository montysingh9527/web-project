<template>
  <div class="selector-item">
    <div
      :class="[
        'inner',
        {
          slected: item.type == modelType,
        },
      ]"
      @click="setModelType(item.type)"
    >
      {{ item.text }}
    </div>
  </div>
</template>
  
  <script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "ModelItem",
  props: {
    item: Object,
  },

  setup(props, ctx) {
    console.log("==ModelItem==",props.item)
    const store = useStore(),
      state = store.state;
    const setModelType = (type) => {
        console.log("====ModelType===",type)
      store.commit("setModelType", type);
    };
    return {
      modelType: computed(() => state.modelType),
      setModelType,
    };
  },
};
</script>
  
  <style lang="scss" scoped>
.selector-item {
  width: 50%;
  padding: 0.15rem;
  box-sizing: border-box;
  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.03rem solid #31b0d5;
    border-radius: 0.08rem;
    color: #31b0d5;
    font-size: 0.16rem;
    padding: 0.2rem;
    transition: all 0.3s;
    &.slected {
      background-color: #31b0d5;
      color: #fff;
    }
  }
}
</style>