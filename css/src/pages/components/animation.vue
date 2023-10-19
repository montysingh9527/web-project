<!--
 * @Description: 动画
 * @Date: 2023-10-19 16:34:19
 * @FilePath: \web-project\css\src\pages\components\animation.vue
-->
<!-- 
1、定义动画
@keyframes 动画名称 { 
      0% { width:100px; }
      50%{ width:250px; } 
      100% { width:500px; } 
}
2、使用动画
div{
animation-name: 动画名称;   //(必须) 使用动画名称
animation-duration: 3s;    //（必须）持续时间，默认0
animation-delay: 2s;       // 动画何时开始, 默认0
animation-iteration-count: infinite;  // 动画播放次数，默认1，无限infinite
animation-direction: normal; // 是否反方向播放，默认normal，反方向alternate
animation-fill-mode: backwards;  // 动画结束后停留位置，默认backwards回到起始位置, forwards停留在结束位置
animation-timing-function:ease; //速度变化,默认ease不是匀速的,而是逐渐放慢; ease-in、ease-out、ease-in-out 等
                                linear:匀速;steps(5)指定时间函数间隔数量(步长), cubic-bezier函数来创建自定义的缓动函数，以满足特定的动画需求。
animation-play-state: paused;  //鼠标经过(:hover)让这个div停止动画，离开就继续动画
} 
-->
<template>
  <div class="animation-text">
    <div class="animation-text-box">
      <!-- 无限循环 -->
      <div class="xiaoqiu">0</div>
      <!-- 只运动一次, 球回到起始位置 -->
      <div class="xiaoqiu1">1</div>
      <!-- 只运动一次, 球停留结束位置 -->
      <div class="xiaoqiu2">2</div>
      <!-- 无限循环, 5s后开始, 从起始位置一直循环 -->
      <div class="xiaoqiu3">3</div>
      <!-- 无限循环, 曲线运动 -->
      <div class="xiaoqiu4">4</div>
      <!-- 无限循环, 不规则运动 -->
      <div class="xiaoqiu5">5</div>
      <!-- 无限循环, 不规则运动6 -->
      <div class="xiaoqiu6">6</div>
      <!-- 无限循环, 不规则运动7 -->
      <div class="xiaoqiu7">7</div>
      <!-- 无限循环, 不规则运动8 -->
      <div class="xiaoqiu8">8</div>
      <!-- 无限循环, 不规则运动9 -->
      <div class="xiaoqiu9">9</div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.animation-text {
  margin-top: 20px;
  width: 250px;
  &-box {
    border: 1px solid red;
    position: relative;
    .xiaoqiu {
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      text-align: center;
      background-color: #d1ec27;
      animation: xiaoqiuD 3s linear infinite alternate;
    }
    .xiaoqiu1 {
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      text-align: center;
      background-color: #81f496;
      animation: xiaoqiuD 3s linear alternate;
    }
    .xiaoqiu2 {
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      text-align: center;
      background-color: #f275df;
      animation: xiaoqiuD 3s linear forwards;
    }
    .xiaoqiu3 {
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      text-align: center;
      background-color: #47ebf7;
      animation: xiaoqiuA 3s 5s linear infinite;
    }
    .xiaoqiu4 {
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      text-align: center;
      background-color: #f25858;
      animation: xiaoqiuD 3s ease infinite alternate;
    }
    .xiaoqiu5 {
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      text-align: center;
      background-color: #166770;
      animation: xiaoqiuD 3s infinite alternate cubic-bezier(1, 0.7, 0.25, 1);
    }
    .xiaoqiu6 {
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      text-align: center;
      background-color: #229235;
      animation: xiaoqiuD 3s infinite alternate ease-in;
    }
    .xiaoqiu7 {
      position: absolute;
      top: -15px;
      left: -15px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      text-align: center;
      background-color: #f8012a;
      animation: xiaoqiuC 5s ease infinite;
    }
    .xiaoqiu8 {
      position: absolute;
      top: -15px;
      left: -15px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      text-align: center;
      background-color: #1843dd;
      animation: xiaoqiuC 5s 1s ease infinite;
    }
    .xiaoqiu9 {
      position: absolute;
      top: -15px;
      left: -15px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      text-align: center;
      background-color: #16d31f;
      animation: xiaoqiuC 5s 3s ease infinite;
    }
  }
}

@keyframes xiaoqiuD {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(200px);
  }
}

@keyframes xiaoqiuA {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(200px);
  }
}

@keyframes xiaoqiuC {
  0% {
    top: -15px;
    left: -15px;
    color: #fff;
  }
  25% {
    left: 235px;
    top: -15px;
    background-color: #229235;
    color: #000;
  }
  50% {
    left: 235px;
    top: 197px;
    color: #03a7f9;
    background-color: #4b31f2;
  }
  75% {
    left: -15px;
    top: 197px;
    color: #eb1c9f;
    background-color: #f5cc00;
  }
  100% {
    left: -15px;
    top: -15px;
    color: #e2f72d;
    background-color: #9f19b7;
  }
}
</style>
