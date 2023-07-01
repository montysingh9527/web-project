<template>
  <div>
    <van-overlay :show="true">
      <van-loading class="wrapper" type="spinner" />
    </van-overlay>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>
<style scoped>
.van-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
