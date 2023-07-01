<template>
  <header class="header">
    <h1>
      <slot></slot>
    </h1>
  </header>
</template>

<script>
export default {
  name: "MyHeader",
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.44rem;
  font-size: 0.16rem;
  background-color: #07bcff;
  color: #fff;
}
</style>
