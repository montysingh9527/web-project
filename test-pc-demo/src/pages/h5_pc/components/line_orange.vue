<!-- 三个斜点 -->
<template>
  <div class="line-orange">
    <span class="noe"></span>
    <span class="tow"></span>
    <span class="three"></span>
  </div>
</template>
<script>
export default {
    name:"LineOrange",
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.line-orange {
    display: flex;
    span {
        display: block;
        height: 7px;
        width: 25px;
        margin-right: 8px;
        transform: skewX(-45deg);
    }
    .noe {
        background: #ffc10f;
    }
    .tow{
        background: #ffc10f;
    }
    .three{
        background: #ff7e04;
    }

}
</style>
