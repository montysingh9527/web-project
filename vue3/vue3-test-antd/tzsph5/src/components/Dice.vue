<template>
  <div :class="['dice-box', size, 'cell' + num, active ? 'active' : '']">
    <template v-if="num === 1">
      <i></i>
    </template>
    <template v-else-if="num === 2"> <i></i> <i></i> </template>
    <template v-else-if="num === 3"> <i></i><i></i><i></i> </template>
    <template v-else-if="num === 4">
      <div><i></i><i></i></div>
      <div><i></i><i></i></div>
    </template>
    <template v-else-if="num === 5">
      <div><i></i><i></i></div>
      <div><i></i></div>
      <div><i></i><i></i></div>
    </template>
    <template v-else-if="num === 6">
      <div><i></i><i></i></div>
      <div><i></i><i></i></div>
      <div><i></i><i></i></div>
    </template>
    <template v-else>{{ num }}</template>
  </div>
</template>

<script>
export default {
  props: {
    number: [String, Number],
    size: {
      type: String,
      default: "normal",
    },
    active: Boolean,
  },
  computed: {
    num() {
      return Number(this.number) || this.number;
    },
  },
};
</script>

<style lang="scss" scoped>
.dice-box {
  display: flex;
  width: 30px;
  height: 30px;
  padding: 5px;
  margin: 8px;
  line-height: 8px;
  font-size: 14px;
  font-weight: bold;
  color: #969799;
  background-color: #f0f0f0;
  border-radius: 10%;
  text-align: center;
  justify-content: center;

  div {
    display: flex;
    justify-content: space-between;
  }

  i {
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #969799;
  }

  &.active {
    background-color: #5873fb;

    i {
      background-color: #fff;
    }
  }
}

.cell1 {
  align-items: center;
  justify-content: center;

  i {
    width: 5px;
    height: 5px;
  }
}

.cell2,
.cell4,
.cell5,
.cell6 {
  flex-direction: column;
  justify-content: space-between;
}

.cell2 {
  align-items: center;
}

.cell3 {
  justify-content: space-between;
  align-content: space-between;

  i {
    align-self: flex-start;
  }

  i:nth-of-type(2) {
    align-self: center;
  }

  i:last-of-type {
    align-self: flex-end;
  }
}

.cell5 {
  div:nth-of-type(2) {
    align-self: center;
  }
}

.dice-box.small {
  width: 10px;
  height: 10px;
  padding: 2px;
  line-height: 10px;
  font-size: 14px;

  i {
    width: 5px;
    height: 5px;
  }

  &.cell1 i {
    width: 5px;
    height: 5px;
  }
}

.dice-box.middle {
  width: 48px;
  height: 48px;
  margin: 15px;
  padding: 5px;
  line-height: 48px;
  font-size: 14px;
  border-radius: 15%;
  background-color: #5873fb;
  i {
    background-color: #fff;
  }

  i {
    width: 10px;
    height: 10px;
  }

  &.cell1 i {
    width: 10px;
    height: 10px;
  }
}
</style>
