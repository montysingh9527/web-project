<!--
 * @Description: 数据图
 * @Date: 2025-03-31 15:15:09
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\css_test\css_home\chart_wrap.vue
-->
<template>
  <div class="chart-wrap">
    <div class="chartWrap">
      <div class="imgBox">
        <div class="img2Wrap"><img src="src/assets/chart_scrollline1.png" alt="" class="img2"></div>
        <div class="img3Wrap"><img src="src/assets/chart_scrollline2.png" alt="" class="img3"></div>
        <div class="Text10B">
          <span>10B</span>
          <span class="">总产出</span>
        </div>
      </div>
      <ul class="textWrap">
        <li><span class="bg1">70%</span> <strong>游戏挖矿</strong></li>
        <li><span class="bg2">5%</span> <strong>合作伙伴持有并锁仓两年</strong></li>
        <li><span class="bg3">10%</span> <strong>空投及社区奖励</strong></li>
        <li><span class="bg4">5%</span> <strong>好友推荐奖励</strong></li>
        <li><span class="bg5">10%</span> <strong>创始团队持有并锁仓两年</strong></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
</script>

<style scoped lang="scss">
.chartWrap {
  overflow: hidden;
  height: 328px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(90deg, #313944 0%, #1f252f 100%);
}

.imgBox {
  position: relative;
  width: 420px;
  height: 330px;
  background: url(src/assets/chart_wheel.png) no-repeat center;
  background-size: contain;
  padding: 10px 40px;
  box-sizing: border-box;
  .img2Wrap {
    position: absolute;
    top: 35px;
    left: 56px;
    width: 260px;
    .img2 {
      width: 100%;
      transition-duration: 1s;
      animation: rotate 5s linear infinite;
    }
  }
  .img3Wrap {
    position: absolute;
    top: 30px;
    left: 51px;
    width: 270px;
    .img3 {
      width: 100%;
      transition-duration: 1s;
      animation: rotate 5s linear infinite;
    }
  }

  .Text10B {
    position: absolute;
    top: 0;
    left: 40px;
    width: 290px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span {
      &:nth-child(1) {
        color: #fff;
        font-family: Montserrat-ExtraBold;
        font-size: 32px;
        line-height: 24px;
      }
      &:nth-child(2) {
        color: #fff9;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
}

.textWrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 535px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  padding: 15px 0;
  left: -15px;
  li {
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    strong {
      color: #fffc;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0px;
      text-align: left;
      font-weight: 400;
    }
    span {
      border-radius: 8px;
      height: 28px;
      line-height: 28px;
      width: 64px;
      text-align: center;
      margin-right: 16px;
      font-family: Montserrat-ExtraBold;
      font-size: 14px;
      flex-shrink: 0;
      flex-grow: 0;
      &.bg1 {
        background: rgba(96, 164, 226, 0.2);
        color: #60a4e2;
      }
      &.bg2 {
        background: rgba(114, 226, 96, 0.2);
        color: #72e260;
      }
      &.bg3 {
        background: rgba(111, 235, 208, 0.2);
        color: #6febd0;
      }
      &.bg4 {
        background: rgba(249, 184, 62, 0.2);
        color: #f9b83e;
      }
      &.bg5 {
        background: rgba(200, 96, 226, 0.2);
        color: #c860e2;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(359deg);
  }
}
</style>
