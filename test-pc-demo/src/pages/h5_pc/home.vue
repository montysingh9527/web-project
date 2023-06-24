<template>
  <div class="home" :style="{ height: `${hit}px` }">
    <img src="/img/bg.png" alt="home" />
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      hit: window.innerHeight,
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.home {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
