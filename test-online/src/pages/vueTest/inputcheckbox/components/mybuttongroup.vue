<template>
  <div class="my-button-group">
    <mybutton
      v-for="item of regulars"
      :key="item.regular"
      :type="type"
      :active="current === item.regular"
      @click.native="setCurrent(item.regular)"
    >
      {{ item.text }}
    </mybutton>
  </div>
</template>
    
  <script>
import mybutton from "./mybutton.vue";
export default {
  name: "MyButtonGroup",
  components: { mybutton },
  props: {
    regulars: Array,
    type: {
      type: String,
      default: "primary",
    },
    current: String,
  },
  data() {
    return {};
  },
  methods: {
    setCurrent(regular) {
      this.$emit("click", regular);
    },
  },
};
</script>

<style lang="scss" scoped>
.my-button-group {
  display: inline-block;
}
</style>