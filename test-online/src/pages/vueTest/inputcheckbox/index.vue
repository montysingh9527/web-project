<template>
  <div class="q-ma-md">
    <Search ref="search" :data="students" @setCheckedList="setCheckedList" />
    <div class="my-table">
      <table border="1" v-if="checkedList.length > 0">
        <thead>
          <tr>
            <th>操作</th>
            <th>姓名</th>
            <th>分数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of checkedList" :key="item.id">
            <td>
              <MyCheckbox :id="item.id" :checked="true" @click="setChecked(item)"></MyCheckbox>
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import students from "./mock/data.js";
import Search from "./components/search.vue";
import MyCheckbox from "./components/mycheckbox.vue"
export default {
  name: "InputCheckBox",
  components: { Search ,MyCheckbox },
  data() {
    return {
      students,
      checkedList: [],
    };
  },
  methods: {
    setCheckedList(checkedStuents){
      this.checkedList = checkedStuents;
    },
    setChecked(info){
      console.log(this.$refs)
      this.$refs.search.setChecked(info); 
    }
  },
};
</script>