/*
 * @Description: 倒计时
 * @Date: 2025-01-02 19:29:27
 * @FilePath: \web-project\node-egg-demo\admin-project\src\store\useTimerStore.js
 */
import { defineStore } from "pinia";

let timer = null;

export const useTimerStore = defineStore("timer", {
  state: () => ({
    remaining: 0, // 剩余秒数
    isRunning: false,
  }),
  actions: {
    start(duration) {
      this.remaining = duration;
      this.isRunning = true;

      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        if (this.remaining > 0) {
          this.remaining--;
        } else {
          this.stop();
        }
      }, 1000);
    },
    stop() {
      this.isRunning = false;
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    },
    reset() {
      this.stop();
      this.start(duration);
    },
  },
});
