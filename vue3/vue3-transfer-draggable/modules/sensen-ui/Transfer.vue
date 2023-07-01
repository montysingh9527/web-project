<template>
  <div class="transfer-content">
    <div>
      <Selector @select-change="setTargetIndex" :data="options"></Selector>
    </div>
    <div class="transfer">
      <div
        class="box left-list"
        @dragover.prevent
        @drop="removeRightListData([dragedItem])"
      >
        <ListTitle :title="leftTitle" />
        <div>
          <ListItem
            :data="leftListData"
            left-or-right="left"
            @checkbox-click="setCheckedData"
            @dragItem="setDragedItem"
          ></ListItem>
        </div>
      </div>
      <ButtonGroup
        :left-button-disabled="transferButtonDisabled.left"
        :right-button-disabled="transferButtonDisabled.right"
        @leftButtonClick="removeRightListData(checkedData.right)"
        @rightButtonClick="addRightListData(checkedData.left)"
      />

      <div
        class="box right-list"
        @dragover.prevent
        @drop="addRightListData([dragedItem])"
      >
        <ListTitle :title="rightTitle" />
        <div>
          <ListItem
            :data="rightListData"
            left-or-right="right"
            @checkbox-click="setCheckedData"
            @dragItem="setDragedItem"
          ></ListItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Selector from "./components/Selector.vue"; // 选择框组件
import ListTitle from "./components/ListTitle.vue"; // 列表标题
import ButtonGroup from "./components/ButtonGroup.vue"; // 左右移动按钮
import ListItem from "./components/ListItem.vue"; // 列表
import propsDefination from "./extends/props"; // props抽离
import {
  useTargetIndex,
  useComputedDate,
  useRightListData,
  useCheckedData,
  useDragedItem,
} from "./extends/hooks";

const props = defineProps(propsDefination);
// const props = defineProps({
//     data: {
//         type: Array,
//         default: () => [],  // 引用值使用函数
//     }
// })
const options = props.data.map(({ title }) => title);

const [targetIndex, setTargetIndex] = useTargetIndex(0);

// 添加数据
const [checkedData, addCheckedData, removeCheckedData] = useCheckedData();

// 右侧添加删除
const [rightListData, addRightListData, removeRightListData] = useRightListData(
  [],
  checkedData
);

// 拖拽方法
const [dragedItem, setDragedItem] = useDragedItem();

// 计算方法
const { leftTitle, leftListData, transferButtonDisabled } = useComputedDate(
  props.data,
  targetIndex,
  rightListData,
  checkedData
);

const setCheckedData = (checked, leftOrRight, item) => {
  checked
    ? addCheckedData(leftOrRight, item)
    : removeCheckedData(leftOrRight, item.id);
};
</script>

<style scoped lang="scss">
.transfer {
  display: flex;
  flex-direction: row;
  width: 460px;
  height: 300px;
  border: 1px solid #ddd;
  .box {
    width: 230px;
    height: 100%;
    .list-item {
      display: flex;
      align-items: center;
      height: 30px;
      font-size: 12px;
      color: #666;
      &.disabled {
        opacity: 0.6;
      }
    }
  }
}
</style>
