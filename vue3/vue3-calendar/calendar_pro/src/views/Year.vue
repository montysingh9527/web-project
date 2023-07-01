<template>
  <div class="container">Year</div>
</template>

<script>
import { onMounted } from "vue";
import getDate from "../services/index.js";
export default {
  name: "YearPage",
  setup(props, ctx) {
    onMounted(() => {
      getDate("year", "2023");
    });
    return {};
  },
};
</script>
