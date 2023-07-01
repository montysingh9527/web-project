<template>
  <button :class="['my-btn', type, { active }]">
    <slot></slot>
  </button>
</template>
  
<script>
export default {
  name: "MyButton",
  props: {
    type: {
      default: "primary",
      validator(value) {
        return ["primary", "success", "danger", "warning"].includes(value);
      },
    },
    active: Boolean,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.my-btn {
  &.primary {
    background-color: blue;
    color: #fff;
  }
  &.success {
    background-color: green;
    color: #fff;
  }
  &.danger {
    background-color: red;
    color: #fff;
  }
  &.warning {
    background-color: orange;
    color: #fff;
  }
  &.active {
    background-color: #fff;
    color: #333;
  }
}
</style>