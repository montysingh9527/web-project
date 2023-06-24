<template>
  <div class="table-list">
    <div class="q-mt-md" v-for="(item, index) in table_list['zh']" :key="index">
      <lanTable :thdata="item.thlist" :tddata="item.tdlist"></lanTable>
    </div>
    <div class="q-mt-md" v-for="(item, index) in table_list['en']" :key="index">
      <lanTable :thdata="item.thlist" :tddata="item.tdlist"></lanTable>
    </div>
  </div>
</template>
<script>
import lanTable from "src/pages/h5_pc/components/lan_table.vue"; // 产业讯息
export default {
  name: "LanTable",
  components: { lanTable },

  data() {
    return {
      table_list: {
        zh: [
          {
            thlist: [
              {
                thtitle: "类型",
              },
              {
                thtitle: "支持语言",
              },
              {
                thtitle: "市场",
              },
              {
                thtitle: "范例",
              },
            ],
            tdlist: [
              {
                tdtext: "IM",
                tdtext1: "全语系",
                tdtext2: "美国/新加坡/菲律宾/香港/台湾/马来西亚（限制）",
                tdtext3: "inplaymatrix.com",
                bg: "#f08",
                bw: 100,
              },
              {
                tdtext: "SABA",
                tdtext1: "英文/中文/繁体中文/泰文/越南文",
                tdtext2: "新加坡/台湾/香港/澳门/美国/澳大利亚（限制）",
                tdtext3: "sabab2b.com",
                bg: "#f0f",
              },
              {
                tdtext: "IM",
                tdtext1: "",
                tdtext2: "美国/新加坡/菲律宾/香港/台湾/马来西亚（限制）",
                tdtext3: "",
                bg: "#f08",
                bw: 100,
                isonly: true,
              },
              {
                tdtext: "RSG",
                tdtext1: "越南文",
                tdtext2: "印尼/ 印度/ 韩国",
                tdtext3: "rsg-games.com",
                bg: "#b4f",
              },
            ],
          },
        ],
        en: [
          {
            thlist: [
              {
                thtitle: "Type",
              },
              {
                thtitle: "支持语言",
              },
              {
                thtitle: "市场",
              },
              {
                thtitle: "范例",
              },
            ],
            tdlist: [
              {
                tdtext: "IM",
                tdtext1: "全语系",
                tdtext2: "美国/新加坡/菲律宾/香港/台湾/马来西亚（限制）",
                tdtext3: "inplaymatrix.com",
                bg: "#f08",
              },
              {
                tdtext: "SABA",
                tdtext1: "英文/中文/繁体中文/泰文/越南文",
                tdtext2: "新加坡/台湾/香港/澳门/美国/澳大利亚（限制）",
                tdtext3: "sabab2b.com",
                bg: "#f0f",
              },
              {
                tdtext: "SABA",
                tdtext1: "英文/中文/繁体中文/泰文/越南文",
                tdtext2: "新加坡/台湾/香港/澳门/美国/澳大利亚（限制）",
                tdtext3: "sabab2b.com",
                bg: "#f0f",
              },
            ],
          },
        ],
      },
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.table-list {
}
</style>
