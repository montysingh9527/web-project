<template>
  <div class="my-menu" v-show="show">
    <my-check-box
      @click="setChecked(item.id)"
      :checked="computedChecked(item.id)"
      v-for="item in data"
      :key="item.id"
      :id="item.id"
    >
      <span>{{ item.name }}</span>
      <span class="q-ml-md">{{ item.score }}</span>
    </my-check-box>
  </div>
</template>

<script>
import MyCheckBox from "./mycheckbox.vue";
export default {
  name: "MyMenu",
  components: {
    MyCheckBox,
  },
  props: {
    data: Array,
    checkedData: Array,
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setChecked(id) {
      this.$emit(
        "click",
        this.data.find((item) => item.id === id)
      );
    },
    computedChecked(id){
        return this.checkedData.some(item=>item.id === id);
    }
  },
};
</script>

<style lang="scss" scoped>
.my-menu {
  width: 300px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #000;
}
</style>