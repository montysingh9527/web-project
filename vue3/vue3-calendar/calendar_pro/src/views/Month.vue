<template>
  <div class="container">Month</div>
</template>
  
  <script>
import { onMounted } from "vue";
import getDate from "../services/index.js";
export default {
  name: "MonthPage",

  setup(props, ctx) {
    onMounted(() => {
      getDate("month", "2023-4");
    });
    return {};
  },
};
</script>
  