<template>
  <div class="box button-group">
    <button
      @click="leftButtonClick"
      :disabled="leftButtonDisabled"
    >
      &lt;
    </button>
    <button
      @click="rightButtonClick"
      :disabled="rightButtonDisabled"
    >
      &gt;
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  leftButtonDisabled: {
    type: Boolean,
    default: true,
  },
  rightButtonDisabled: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["leftButtonClick", "rightButtonClick"]);

const leftButtonClick = () => {
  emit("leftButtonClick");
};

const rightButtonClick = () => {
  emit("rightButtonClick");
};
</script>

<style scoped lang="scss">
.button-group {
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
</style>
