<template>
  <div class="my-check-box">
    <label :for="id" class="my-check-box-lbl">
      <input type="checkbox" :id="id" @click="doCheck" v-bind="$attrs"/>
      <span class="icon"></span>
    </label>
    <span class="text">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: "MyCheckBox",
  inheritAttrs: false, // 关闭继承
  props: {
    id: Number | String,
  },
  methods: {
    doCheck() {
      this.$emit("click", this.id);
    },
  },
};
</script>

<style scoped lang="scss">
.my-check-box-lbl {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid #333;
  border-radius: 50%;
  margin-right: 5px;
  input {
    visibility: hidden;
    &:checked + .icon {
      display: none;
    }
  }
  .icon {
    display: block;
    position: absolute;
    top: 3px;
    left: 3px;
    width: 8px;
    height: 8px;
    background-color: blue;
    border-radius: 50%;
  }
}
</style>
