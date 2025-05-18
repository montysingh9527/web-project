<!--
 * @Description: 计时器
 * @Date: 2025-05-16 11:27:27
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\css_test\css_timer.vue
-->
<!-- components/Countdown.vue -->
<template>
  <div v-if="isRunning">
    剩余时间：{{ formatTime(remaining) }}
  </div>
  <div v-else>
    倒计时已结束
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTimerStore } from 'src/store/useTimerStore.js';

const store = useTimerStore();
const remaining = computed(() => store.remaining);
const isRunning = computed(() => store.isRunning);

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}
</script>

