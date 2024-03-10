<template>
    <span>
        {{ formatTime(startTime) }}
    </span>
</template>

<script>
import Event from '../event'

export default {
  data() {
    return {
      startTime: 0,
      stop: false
    };
  },

  props: {
    // 向上计时 或向下计时 down | up
    type: {
      type: String,
      default: 'up'
    },

    // 开始时间 单位秒
    time: {
      type: Number,
      default: 0
    },

    format: {
      type: String,
      default: 'mm:ss'
    },

    suspend: {
      type: [String, Number],
      default: '0'
    }
  },

  watch: {
    time(t) {
      // this.clearTimer()
      this.startTime = t
      // this._start()
    },
  },

  mounted() {
    this._start()
  },

  methods: {
    _start() {
      this.startTime = this.time

      Event.$on('interval', i => {
        if (this.stop) return;
        if (this.type === 'up' && String(this.suspend) === '1') {
          this.startTime++
        } else if (this.type === 'down' && String(this.suspend) === '1') {
          this.startTime--

          if (this.startTime <= 0) {
            this.startTime = 0
          }
        }
      })
    },

    updateStartTime(time = 0) {
      this.startTime = time;
    },

    formatTime(seconds) {
      let m = Math.floor(seconds / 60)
      let s = Math.floor(seconds % 60)
      let fmt = 'mm:ss' // this.format
      let o = {
        'm+': m, // 分
        's+': s, // 秒
      }

      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
      return fmt
    }
  },

  destroyed() {
    this.stop = true
  }
};
</script>
