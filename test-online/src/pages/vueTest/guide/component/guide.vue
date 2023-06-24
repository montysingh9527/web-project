<template>
  <div :style="stylecomp">
    <div class="content-top">
      <div
        class="content-text"
        v-for="(item, index) in content[nextidx]"
        :key="index"
      >
        <div class="text-item" v-html="item"></div>
        <div class="text-btn" @click="nextbtn">
          下一步 ({{ nextidx }}/{{ Object.keys(content).length }})
        </div>
      </div>
      <div class="text-rad">
        <ul>
          <li
            v-for="idx in Object.keys(content).length"
            :key="idx"
            :class="['text-radius', { 'active-rad': nextidx == idx }]"
          ></li>
        </ul>
      </div>
      <div class="btn-close" @click="btnClose">
        <img src="/img/close.svg" />
      </div>
    </div>
    <div class="content-box"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: {
        1: {
          text: `<span><span class="text-red">Hi</span> 今天，我们成功升级了！</span><br/><span>邀请你一起体验下<span class="text-red">新功能</span>！</span>`,
        },
        2: {
          text: `<span>新增<span class="text-red">篮球预约投注</span>功能！</span><br/><span>不妨<span class="text-red">点击</span>试试看！</span>`,
        },
        3: {
          text: `<span>预约<span class="text-red">数值调整</span>新体验！</span><br/><span><span class="text-red">长按“+/—”，新功能</span>可连续调整哟！</span>`,
        },
        4: {
          text: `<span>新增右侧区域<span class="text-red">收起功能！</span></span><br/><span>收起后可展示<span class="text-red">更多玩法</span>哟！</span>`,
        },
      },
      nextidx: 1,
    };
  },
  computed:{
    stylecomp(){
        return {
            "backgroundImage": `url(/img/zh-${this.nextidx}.jpg)`
        }
    }
  },
  created() {},
  methods: {
    // 下一步
    nextbtn() {
      if (this.nextidx == Object.keys(this.content).length) {
        this.$emit("onClose");
      }
      this.nextidx++;
    },
    // 关闭
    btnClose() {
      this.$emit("onClose");
    },
  },
};
</script>

<style scoped lang="scss">
.content-top {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 420px;
  background: url("/img/top.png") no-repeat 50%;
  background-size: 400px 330px;
  .content-text {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-20%, 20%);
    font-size: 15px;
    .text-red {
      color: red;
    }
    .text-btn {
      cursor: pointer;
      margin-top: 40px;
      width: 150px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      border-radius: 20px;
      background-image: linear-gradient(198deg, #ffb001, #ff7000 95%);
    }
  }
  .text-rad {
    position: absolute;
    bottom: 100px;
    left: 90px;
    ul {
      display: flex;
      list-style-type: none;
      .text-radius {
        height: 15px;
        width: 15px;
        margin-left: 10px;
        background-color: rgb(147, 142, 142);
        border-radius: 50%;
        &.active-rad {
          background-color: rgb(238, 114, 53);
        }
      }
    }
  }
  .btn-close {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }
}
</style>
