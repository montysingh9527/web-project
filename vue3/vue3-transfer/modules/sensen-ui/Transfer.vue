<template>
  <div class="transfer-content">
    <div>
      <select @change="setTargetIndex($event.target.value)">
        <option v-for="(title, index) of options" :key="index" :value="index">
          {{ title }}
        </option>
      </select>
    </div>
    <div class="transfer">
      <div class="box left-list">
        <h1 class="list-title">{{ leftTitle }}</h1>
        <div>
          <div
            v-for="item of leftListData"
            :key="item.id"
            :class="['list-item', item.disabled ? 'disabled' : '']"
          >
            <input
              type="checkbox"
              :disabled="item.disabled"
              :id="'__checkbox__' + item.id"
              @click="setCheckedData($event.target.checked, 'left', item)"
            />
            <label :for="'__checkbox__' + item.id">{{ item.phone_name }}</label>
          </div>
        </div>
      </div>
      <div class="box button-group">
        <button
          @click="removeRightListData(checkedData.right)"
          :disabled="transferButtonDisabled.left"
        >
          &lt;
        </button>
        <button
          @click="addRightListData(checkedData.left)"
          :disabled="transferButtonDisabled.right"
        >
          &gt;
        </button>
      </div>
      <div class="box right-list">
        <h1 class="list-title">{{ rightTitle }}</h1>
        <div>
          <div
            v-for="item of rightListData"
            :key="item.id"
            :class="['list-item', item.disabled ? 'disabled' : '']"
          >
            <input
              type="checkbox"
              :disabled="item.disabled"
              :id="'__checkbox__' + item.id"
              @click="setCheckedData($event.target.checked, 'right', item)"
            />
            <label :for="'__checkbox__' + item.id">{{ item.phone_name }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import propsDefination from "./extends/props"; // props抽离
import {
  useTargetIndex,
  useComputedDate,
  useRightListData,
  useCheckedData,
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

const [checkedData, addCheckedData, removeCheckedData] = useCheckedData();

const [rightListData, addRightListData, removeRightListData] = useRightListData(
  [],
  checkedData
);

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
    .list-title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 38px;
      font-weight: normal;
      font-size: 15px;
      margin: 0;
      color: #666;
      border-bottom: 1px solid #ddd;
      background-color: #efefef;
    }
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
    &.button-group {
      display: flex;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      button {
        border: none;
        outline: none;
        width: 38px;
        height: 38px;
        background-color: #ffa500;
        color: #fff;
        border-radius: 5px;
        &:disabled {
          opacity: 0.6;
        }
        &:nth-child(2) {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
