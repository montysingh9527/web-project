<template>
  <div class="container">
    <SubjectSelector />
    <ModelSelector />
  </div>
</template>

<script>
import SubjectSelector from "./components/SubjectSelector/index.vue";
import ModelSelector from "./components/ModelSelector/index.vue";

export default {
  name: "IndexPage",
  components: {
    SubjectSelector,
    ModelSelector,
  },
};
</script>

<style scoped lang="scss">
.container {
  font-size: 12px;
  margin-top: 0.4rem;
}
</style>
