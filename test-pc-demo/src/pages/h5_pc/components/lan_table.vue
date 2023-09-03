<template>
  <div class="lan-table">
    <table border="1" cellpadding="0">
      <tr>
        <th v-for="(tab, idx) in thdata" :key="idx">{{ tab.thtitle }}</th>
      </tr>
      <tr v-for="(tdtab, idx) in tddata" :key="idx">
        <template v-if="tdtab.isonly">
          <td>{{ tdtab.tdtext }}</td>
          <td :style="{ background: tdtab.bg }" colspan="3">{{ tdtab.tdtext2 }}</td>
        </template>
        <template v-else>
          <td>{{ tdtab.tdtext }}</td>
          <td :style="{ background: tdtab.bg, width: `${tdtab.bw}px` }">
            {{ tdtab.tdtext1 }}
          </td>
          <td :style="{ background: tdtab.bg }">{{ tdtab.tdtext2 }}</td>
          <td :style="{ background: tdtab.bg }">{{ tdtab.tdtext3 }}</td>
        </template>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "lanTable",
  props: {
    thdata: Array,
    tddata: Array,
  },
  data() {
    return {};
  },
  mounted() {
    console.log("====tabdata====", this.thdata, this.tddata);
  },
  created() {},
  methods: {
    initdata(data) {
    }
  },
};
</script>

<style scoped lang="scss">
.lan-table {
  table {
    margin: 0 auto;
    // width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    border-color: #000;
  }
  th,
  td {
    text-align: center;
  }
  th {
    height: 60px;
  }
  td {
    height: 50px;
  }
}
</style>
