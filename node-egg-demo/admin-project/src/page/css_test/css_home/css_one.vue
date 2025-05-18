<template>
  <div class="css-one">
    <div class="css-one-w">
      <div class="css-one-w-a">三角形</div>
      <div class="css-one-w-b"></div>
      
    </div>
    <div class="css-one-z">
      <div class="css-one-z-a fs20 text-center">触摸展示</div>
      <div class="css-one-z-p">show time</div>
    </div>
    <div class="css-one-y" data-min="居中虚线">
      <i class="line-i"></i>
      <div class="css-one-y-a">
        <div class="css-one-y-a-a"></div>
        <p>说明：1</p>
      </div>
      <div class="css-one-y-a">
        <div class="css-one-y-a-b"></div>
        <p>说明：2</p>
      </div>
    </div>
    <div class="container" ref="contRef">
      <div class="item"></div>
      <div class="item-one"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const contRef = ref(null);

onMounted(() => {
  const contW = contRef.value.clientWidth;
  const contH = contRef.value.clientHeight;
  const contObj = {
    "--w": contW + "px",
    "--h": contH + "px",
  };
  for (const [prop, value] of Object.entries(contObj)) {
    contRef.value.style.setProperty(prop, value);
  }
});
</script>

<style scoped lang="scss">
.css-one {
  display: flex;
  gap: 20px;
}
.css-one-w {
  display: flex;
  .css-one-w-a {
    width: 0px;
    height: 0px;
    border: 100px solid transparent;
    border-top-color: #ff1493;
    border-left-color: #ff1493;
  }
  .css-one-w-b {
    width: 0px;
    height: 0px;
    border: 100px solid transparent;
    border-top-color: #ff1493;
    border-left-color: #ff1493;
    border-right-color: #f7ee89;
    border-bottom-color: #f7ee89;
  }
}
.css-one-z {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    .css-one-z-p {
      bottom: 0;
    }
    .css-one-z-a {
      filter: blur(2px);
    }
  }
  .css-one-z-a {
    transition: all 2s ease;
    height: 200px;
    width: 200px;
    background-color: #a6f2e3;
  }
  .css-one-z-p {
    position: absolute;
    bottom: -50px;
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 50px;
    background-color: #ff1493;
    transition: all 0.5s;
  }
}
.css-one-y {
  position: relative;
  width: 220px;
  background: #bcddd3;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: space-around;
  &::before {
    content: attr(data-min);
    position: absolute;
    top: 10px;
    font-size: 10px;
  }
  .line-i {
    background-image: repeating-linear-gradient(
      90deg,
      #0000,
      #0000 8px,
      #ffca98cc 0,
      #ffca98cc 15px,
      #0000 0
    );
    display: block;
    height: 2px;
    left: 0;
    position: absolute;
    top: 40%;
    width: 100%;
  }
  .css-one-y-a {
    text-align: center;

    .css-one-y-a-a {
      height: 100px;
      width: 100px;
      background-color: #1685e7;
      border-radius: 50%;
    }
    .css-one-y-a-b {
      height: 100px;
      width: 100px;
      background-color: #2bfaa0;
      border-radius: 50%;
    }
  }
}
.container {
  width: 200px;
  border: 2px solid #1b83eb;
  position: relative;
  .item {
    width: 50px;
    height: 50px;
    position: absolute;
    border-radius: 50%;
    background-color: #c709ed;
    animation: squarePath 3s linear infinite;
  }
  .item-one {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #39f413;
    animation: moveitem 2s linear infinite;
  }
}

@keyframes moveitem {
  50% {
    transform: translateX(calc(var(--w) - 100%));
  }
}

@keyframes squarePath {
  0% {
    top: 0;
    left: 0;
  }
  25% {
    top: 0;
    left: 100%;
    transform: translateX(-100%);
  }
  50% {
    top: 100%;
    left: 100%;
    transform: translate(-100%, -100%);
  }
  75% {
    top: 100%;
    left: 0;
    transform: translateY(-100%);
  }
  100% {
    top: 0;
    left: 0;
    transform: none;
  }
}
</style>
