import { computed, reactive, ref } from "vue";

/**
 * 下拉框选择
 * @param {*} initialIndex 索引
 * @returns
 */
export function useTargetIndex(initialIndex) {
  const targetIndex = ref(initialIndex);

  function setTargetIndex(newIndex) {
    targetIndex.value = Number(newIndex);
  }

  return [targetIndex, setTargetIndex];
}

/**
 * 右边数据
 * @param {*} initialData
 * @returns
 */
export function useRightListData(initialData, checkedData) {
  const rightListData = ref(initialData);
  // 添加到右边
  function addRightListData(newData) {
    rightListData.value = [...rightListData.value, ...newData];
    checkedData.left = [];
  }
  // 从右边删除
  function removeRightListData(newData) {
    newData.forEach((newItem) => {
      rightListData.value = rightListData.value.filter(
        (item) => item.id !== newItem.id
      );
    });
    checkedData.right = [];
  }
  return [rightListData, addRightListData, removeRightListData];
}

/**
 * 左右数据切换
 */
export function useCheckedData() {
  const checkedData = reactive({
    left: [], // 左边数据
    right: [], // 右边数据
  });
  /**
   * 添加
   * @param {*} leftOrRight  左边或者右边
   * @param {*} item 要添加的数据
   */
  function addCheckedData(leftOrRight, item) {
    switch (leftOrRight) {
      case "left":
        checkedData.left.push(item);
        break;
      case "right":
        checkedData.right.push(item);
        break;
      default:
        break;
    }
  }
  /**
   * 删除
   * @param {*} leftOrRight 左边或者右边
   * @param {*} id
   */
  function removeCheckedData(leftOrRight, id) {
    switch (leftOrRight) {
      case "left":
        checkedData.left = checkedData.left.filter((item) => item.id !== id);
        break;
      case "right":
        checkedData.right = checkedData.right.filter((item) => item.id !== id);
        break;
      default:
        break;
    }
  }

  return [checkedData, addCheckedData, removeCheckedData];
}

/**
 * 拖拽
 */
export function useDragedItem() {
  const dragedItem = ref(null);

  function setDragedItem(item) {
    dragedItem.value = item;
  }

  return [dragedItem, setDragedItem];
}

// 计算属性方法
export function useComputedDate(data, targetIndex, rightListData, checkedData) {
  const leftTitle = computed(() => data[targetIndex.value].title);

  // 右边展示数据
  const leftListData = computed(() => {
    const { data: currentData } = data[targetIndex.value];
    return currentData.filter((item) => {
      if (!rightListData.value.find(({ id }) => item.id === id)) {
        return item;
      }
    });
  });
  // 计算按钮是否左右添加可以点击
  const transferButtonDisabled = computed(() => ({
    left: checkedData.right.lenght === 0,
    right: checkedData.left.lenght === 0,
  }));
  return {
    leftTitle,
    leftListData,
    transferButtonDisabled,
  };
}
