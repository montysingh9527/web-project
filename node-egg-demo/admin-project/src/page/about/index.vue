<template>
  <div class="about">
    <q-btn @click="change_file">请求</q-btn>
  </div>
</template>

<script setup>
const change_file = () => {
  console.log("---logs-请求--");
};
</script>

<style scoped lang="scss">
</style>
