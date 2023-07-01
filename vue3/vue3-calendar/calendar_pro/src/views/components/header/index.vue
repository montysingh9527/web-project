<template>
  <header class="header">
    <div class="header-title">
      <slot></slot>
    </div>
  </header>
</template>
<script>
export default {
  name: "MyHeader",
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 0.44rem;
  background-color: #ed4040;
  text-align: center;
  line-height: 0.44rem;
  .header-title {
    font-size: 0.18rem;
    color: #fff;
  }
}
</style>
