<template>
  <div>
    <union-selectors
      :data="cityData"
      @handle-select="handleSelect"
    ></union-selectors>
  </div>
</template>
<script setup>
import cityData from "./city.js";
import unionSelectors from "./components/index.vue";

const handleSelect = (data) => {
  console.log("--选择数据-data---", data);
};
</script>
