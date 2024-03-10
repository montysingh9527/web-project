<template>
  <div>
    <iframe :src="url" frameborder="0" scrolling="yes" style="position: absolute;top:0;"
            :style="{width: iframeStyle.width, height: iframeStyle.height}">
    </iframe>

    <van-overlay :show="loading"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.8)`}">
      <van-loading v-if="loading" class="ab-middle flex-middle" size="50px"/>
    </van-overlay>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      url: '',
      iframeStyle: {
        width: window.innerWidth + 'px',
        height: window.innerHeight + 'px',
      }
    }
  },

  methods: {
    jump(lotteryId) {
      this.loading = true

      setTimeout(() => {
        this.loading = false
      }, 7000)

      const host = process.env.NODE_ENV === 'development' ? 'https://test21.fhptdev.com' : window.location.origin;
      // https://test21.fhptdev.com/mobile/#/lottery/index/1;
      // h5: /mobile/#/lottery/index/70
      // pc: /index3.php?id=70
      this.url = `${host}/mobile/#/lottery/index/${lotteryId}`
    }
  },

  beforeRouteEnter(to, from, next) {
    next(_this => {
      const lotteryId = to.query.id
      _this.jump(lotteryId)
    })
  }
}
</script>
