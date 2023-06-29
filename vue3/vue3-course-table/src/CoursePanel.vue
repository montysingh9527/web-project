<script setup>
const props = defineProps({
  courseName: {
    type: String,
    default: "Null",
  },
  courseKey: {
    type: String,
    default: "Null",
  },
});

const emit = defineEmits(["handleDragEnd"]);

/**
 * 开始拖拽
 * @param {*} e 
 */
function handleDragStart(e) {
  const tar = e.target;
  tar.style.opacity = ".6";
}

/**
 * 拖拽结束
 * @param {*} e 
 */
function handleDragEnd(e) {
  const tar = e.target;
  tar.style.opacity = "1";
  emit("handleDragEnd", tar);
}
</script>

<template>
  <div
    class="course-panel"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    :data-key="courseKey"
  >
    <h1>{{ courseName }}-{{ courseKey }}</h1>
    <span class="remove-btn">X</span>
  </div>
</template>



<style scoped lang="scss">
.course-panel {
  position: relative;
  max-width: 100px;
  height: 100px;
  background-color: orange;
  margin: 10px auto;
  padding: 10px;
  box-sizing: border-box;
  cursor: move;
  h1 {
    font-size: 20px;
    font-weight: normal;
    text-align: center;
  }
  .remove-btn {
    position: absolute;
    top: 4px;
    right: 10px;
    cursor: pointer;
  }
}
</style>

