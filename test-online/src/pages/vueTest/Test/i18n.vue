<!-- i18n多语言测试

参考：  https://kazupon.github.io/vue-i18n/zh/guide/formatting.html#%E5%85%B7%E5%90%8D%E6%A0%BC%E5%BC%8F

-->

<template>
  <div class="i18n-box">
    <div class="i18n-select">
      <select @change="changeI18n">
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>
    </div>
    <div class="i18-content">
      <span v-for="(item, index) in list" :key="index"
        >{{ item.text }} <br
      /></span>
      <span>{{ $t("type") }}</span
      ><br />
      <span>{{ $t("duction.guide") }}</span
      ><br />
      <span
        >对象形式:{size}：{{ $t("pages.placeholder", { size: sizeto }) }}</span
      ><br />
      <span>数组形式:[sizeto]：{{ $t("pages.place", [sizeto]) }}</span
      ><br />
      <button @click="onAdd">页码加+1</button>
    </div>
  </div>
</template>
<script>

// import { loadLanguageAsync } from "src/boot/i18n"
export default {
  data() {
    return {
      sizeto: 0,
      list: [
        {
          id: 1,
          text: this.$t("select[0]"),
        },
        {
          id: 2,
          text: this.$t("select[1]"),
        },
      ],
    };
  },
  methods: {
    // 添加页码
    onAdd() {
      this.sizeto++;
    },
    // 语言切换
    changeI18n(event) {
      const val = event.target.value;
      console.log(val);
      // loadLanguageAsync(val);
      this.$i18n.locale = val;
    },
  },
};
</script>

<style scoped lang="scss">
.i18n-box {
  margin-left: 20px;
  border: 1px solid red;
  width: 200px;
  position: relative;
  .i18n-select {
    position: absolute;
    right: 0;
  }
}
</style>
