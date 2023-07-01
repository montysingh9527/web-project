<!-- 跑马灯 -->

<template>
    <div class="deng">
        <p>跑马灯</p>
      <span
        v-for="(item, index) in 20"
        :key="index"
        :class="[
          'deng-box',
          `deng-${index}`,
          index == red && 'deng-red',
          index == blue && 'deng-blue',
          index == pink && 'deng-pink',
        ]"
      >
        {{ item }}
      </span>
    </div>
</template>
<script>
export default {
  data() {
    return {
      red: 0,
      blue: 0,
      pink: 0,
    };
  },
  created() {
    clearInterval(this.redtimer);
    this.redtimer = setInterval(() => {
      this.red++;
      if (this.red == 20) {
        this.red = 0;
      }
    }, 300);

    clearInterval(this.bluetimer);
    clearTimeout(this.blueT);
    this.blueT = setTimeout(() => {
      this.bluetimer = setInterval(() => {
        this.blue++;
        if (this.blue == 20) {
          this.blue = 0;
        }
      }, 300);
    }, 1000);

    clearInterval(this.pinktimer);
    clearTimeout(this.pinkT);
    this.pinkT = setTimeout(() => {
      this.pinktimer = setInterval(() => {
        this.pink++;
        if (this.pink == 20) {
          this.pink = 0;
        }
      }, 300);
    }, 2000);
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.deng {
  background-color: #f4c3c3;
  position: relative;
  width: 200px;
  height: 150px;
  p {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: bold;
    color: #144ff0;
  }
  .deng-box {
    position: absolute;
    display: inline-block;
    background-color: #b1babb;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    box-shadow: 0px 3px 0px 0px var(--f-active-box-shadow-4);
    &.deng-red {
      background-color: red;
    }
    &.deng-blue {
      background-color: blue;
    }
    &.deng-pink {
      background-color: #f08194;
    }
    &.deng-0 {
      left: 0px;
    }
    &.deng-1 {
      left: 30px;
    }
    &.deng-2 {
      left: 60px;
    }
    &.deng-3 {
      left: 90px;
    }
    &.deng-4 {
      left: 120px;
    }
    &.deng-5 {
      left: 150px;
    }
    &.deng-6 {
      left: 180px;
    }
    &.deng-7 {
      top: 30px;
      left: 180px;
    }
    &.deng-8 {
      top: 60px;
      left: 180px;
    }
    &.deng-9 {
      top: 90px;
      left: 180px;
    }
    &.deng-10 {
      top: 120px;
      left: 180px;
    }
    &.deng-11 {
      top: 120px;
      left: 150px;
    }
    &.deng-12 {
      top: 120px;
      left: 120px;
    }
    &.deng-13 {
      top: 120px;
      left: 90px;
    }
    &.deng-14 {
      top: 120px;
      left: 60px;
    }
    &.deng-15 {
      top: 120px;
      left: 30px;
    }
    &.deng-16 {
      top: 120px;
      left: 0px;
    }
    &.deng-17 {
      top: 90px;
      left: 0px;
    }
    &.deng-18 {
      top: 60px;
      left: 0px;
    }
    &.deng-19 {
      top: 30px;
      left: 0px;
    }
  }
}
</style>
