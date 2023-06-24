<template>
  <!-- 使用自定义指令 -->
  <div class="search-component" v-menuhide="setMenuHide">
    <div class="search-input">
      <Myinput
        @input.native="setScore"
        type="number"
        placeholder="请输入"
        :value="searchedScore"
      >
      </Myinput>
      <MyButtonGroup
        @click="setCurrentregular"
        :regulars="regulars"
        :current="currentRegular"
      ></MyButtonGroup>
      <my-menu
        :show="menuShow"
        :data="menuList"
        :checkedData="checkedList"
        @click="setChecked"
      ></my-menu>
    </div>
  </div>
</template>
  
<script>
import Myinput from "./myinput.vue";
import MyButtonGroup from "./mybuttongroup.vue";
import MyCheckBox from "./mycheckbox.vue";
import MyMenu from "./mymenu.vue";
import menuhide from "../directives/menuhide.js"
export default {
  name: "Search",
  components: { Myinput, MyButtonGroup, MyCheckBox, MyMenu },
  props: {
    data: Array,
  },
  directives: {
    menuhide
  },
  data() {
    return {
      searchedScore: 0,
      currentRegular: "up",
      menuShow: false,
      menuList: [],
      checkedList: [],
      regulars: [
        {
          regular: "up",
          text: "以上",
        },
        {
          regular: "down",
          text: "以下",
        },
      ],
      checked: 1,
    };
  },
  methods: {
    setScore(e) {
      const _value = e.target.value;
      if (_value.length > 0) {
        this.searchedScore = Number(_value);
        this.filterStudents();
      }
    },
    setCurrentregular(regular) {
      this.currentRegular = regular;
      this.filterStudents();
    },
    // 过滤分数
    filterStudents() {
      switch (this.currentRegular) {
        case "up":
          this.menuList = this.data.filter(
            (item) => item.score >= this.searchedScore
          );
          break;
        case "down":
          this.menuList = this.data.filter(
            (item) => item.score < this.searchedScore
          );
          break;
        default:
          break;
      }
      this.menuShow = this.menuList.length > 0;
    },
    getChecked(id) {
      return this.checkedList.some((item) => item.id === id);
    },
    setChecked(info) {
      const hasThisTiem = this.getChecked(info.id);
      if (hasThisTiem) {
        this.checkedList = this.checkedList.filter(
          (item) => item.id !== info.id
        );
      } else {
        this.checkedList.push(info);
      }
      this.$emit("setCheckedList", this.checkedList);
    },
    // 自定义指令调用的方法
    setMenuHide(){
      this.menuShow = false;
    },
  },
};
</script>