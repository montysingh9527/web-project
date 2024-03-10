<template>
  <div class="w100 h100">
    <van-nav-bar
        style="background-image: linear-gradient(180deg, #f2ab06 0%, #b78008 100%);!important;height:2.2rem"
        @click-left="$router.back()"
    >
      <div slot="left" class="flex-middle-only">
        <van-icon  name="arrow-left" size="16px" color="#fff"></van-icon>
      </div>

      <span slot="title" class="fs16 white">{{$t('zjgl')}}</span>
    </van-nav-bar>
    <iframe :src="url"
            frameborder="0"
            scrolling="yes"
            :style="{width: iframeStyle.width, height: iframeStyle.height}">
    </iframe>

    <van-overlay :show="loading"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.8)`}">
      <van-loading v-if="loading" size="50px" style="display: flex;justify-content: center;align-items: center;top:50%;"/>
    </van-overlay>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      url: '',
      path: '',
      iframeStyle: {}
    }
  },

  methods: {
    transToPage(page = '') {
      const host = process.env.NODE_ENV === 'development' ? 'http://t061f.fhptdev.com' : window.location.origin

      switch (page) {
        case "account":
          return `${host}/mobile/#/bank/deposit?formSport=1`
        case "transfer":
          return `${host}/mobile/#/bank/realtrans`
        case "realBet":
          return `${host}${this.path}`
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(_this => {
      _this.loading = true

      setTimeout(() =>{
        _this.loading = false
      }, 7000)

      console.log('to.query===', to.query)
      console.log('_this.url===', _this.url)
      _this.url = _this.transToPage(to.query.page || '')
      _this.path = _this.transToPage(to.query.path || '')

      _this.iframeStyle= {
        width:  window.innerWidth + 'px',
        height:  window.innerHeight - window.rem2px(2.2) + 'px',
      }
    })
  }
}
</script>
