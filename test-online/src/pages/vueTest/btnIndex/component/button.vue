<!-- 子组件 -->
<template>
  <button
    :class="['btn-content', { current: curInx == index }]"
    :data-index="index"
  >
    {{ items }}
  </button>
</template>
  <script>
export default {
  name: "Button",
  props: {
    items: String,
    index: Number,
    curInx: Number,
  },
};
</script>
  
<style scoped lang="scss">
.btn-content {
  cursor: pointer;
  height: 30px;
  padding: 0 15px;
  margin: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  color: #999;
  background-color: #eee;
  &.current {
    background-color: #ffffff;
    color: #f40000;
    border: 1px solid #f29f9f;
  }
}
</style>
  