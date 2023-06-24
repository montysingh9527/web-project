<template>
  <div class="container">
    <dayCard :data="dayData"></dayCard>
    <dayList :data="dayData"></dayList>
  </div>
</template>
  
<script>
import dayCard from "./components/daypage/card.vue";
import dayList from "./components/daypage/list/index.vue";

import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import getDate from "../services/index.js";
import { getNowDate } from "../libs/utils";

export default {
  name: "DayPage",
  components: { dayCard, dayList },

  setup(props, ctx) {
    const store = useStore(),
      state = store.state;

    onMounted(() => {
      getDate(store, "day", getNowDate("day"));
    });
    return {
      dayData: computed(() => state.dayData),
    };
  },
};
</script>
  