<template>
  <div ref="scrollContainer" class="scroll-container" @scroll="handleScroll">
    <div class="spacer" :style="{ height: totalHeight + 'px' }"></div>
    <div class="list" :style="{ transform: `translateY(${startOffset}px)` }">
      <div class="item" v-for="(item, index) in visibleItems" :key="item.id" :style="{ height: itemHeight + 'px' }" :data-id="item.id">
        <img :src="`https://picsum.photos/id/${item.id}/200/120`" loading="lazy" />
        <p>第 {{ item.id }} 张图</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
/**
 仅渲染部分	可视区域 + buffer
 图片懒加载	使用 loading="lazy"
 性能极高	DOM 数量恒定，几千条不卡顿
 可扩展性强	可加 loading 动画、空状态、懒加载数据等
 */

// 配置参数
const itemHeight = 120;
const buffer = 5; // 缓冲条数（上下各 buffer 项）
const containerHeight = 500;

// 模拟大数据
const items = Array.from({ length: 1000 }, (_, i) => ({ id: i }));

// DOM 和滚动控制
const scrollTop = ref(0);
const scrollContainer = ref(null);

const totalHeight = items.length * itemHeight;

const visibleCount = Math.ceil(containerHeight / itemHeight) + buffer * 2;

const startIndex = computed(() =>
  Math.max(Math.floor(scrollTop.value / itemHeight) - buffer, 0)
);
const endIndex = computed(() =>
  Math.min(startIndex.value + visibleCount, items.length)
);

const visibleItems = computed(() =>
  items.slice(startIndex.value, endIndex.value)
);

const startOffset = computed(() => startIndex.value * itemHeight);

const handleScroll = () => {
  scrollTop.value = scrollContainer.value.scrollTop;
};

onMounted(() => {
  scrollTop.value = 0;
});
</script>

<style scoped lang="scss">
.scroll-container {
  height: 500px;
  overflow-y: auto;
  border: 1px solid #ccc;
  position: relative;
  .spacer {
    width: 100%;
  }
  .list {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    .item {
      display: flex;
      gap: 12px;
      align-items: center;
      padding: 10px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      img {
        width: 200px;
        height: 120px;
        object-fit: cover;
        border-radius: 6px;
      }
    }
  }
}
</style>