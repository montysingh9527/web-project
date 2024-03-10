<template>
  <div class="re index-content">

    <router-view></router-view>

    <van-tabbar v-model="active" active-color="#4d5872" inactive-color="#4d5872">
      <van-tabbar-item v-for="tar of tars" :key="tar.path" :to="tar.path">
        <span>{{tar.text}}</span>
        <template #icon="props">
          <img :src="props.active ? tar.active_icon : tar.icon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>

export default {
  data() {
    return {
      active: 0
    }
  },

  computed: {
    tars() {
      return [
        {text: this.$t('home'), icon: require('@/assets/images/tmp3/home.png'), active_icon: require('@/assets/images/tmp3/home_active.png'), path: '/index/home'},
        {text: this.$t('b_s'), icon: require('@/assets/images/tmp3/match.png'), active_icon: require('@/assets/images/tmp3/match_active.png'), path: '/index/matches'},
        {text: this.$t('t_z_j_l'), icon: require('@/assets/images/tmp3/bets_record.png'), active_icon: require('@/assets/images/tmp3/bets_record_active.png'), path: '/index/betsRecord'},
        {text: this.$t('result'), icon: require('@/assets/images/tmp3/result.png'), active_icon: require('@/assets/images/tmp3/result_active.png'), path: '/index/result'},
        {text: this.$t('my'), icon: require('@/assets/images/tmp3/user.png'), active_icon: require('@/assets/images/tmp3/user_active.png'), path: '/index/user'},
      ]
    }
  },

  methods: {
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    }
  },

  mounted() {
    this.timer = null
    console.log('this.active', this.$route.path)
    this.active = this.tars.findIndex(item => item.path == this.$route.path) || 0
  }
}
</script>
<style type="text/css" lang="less">
  @import "../../../assets/css/mobile";
  .index-content {
    height: 100vh;
    overflow: hidden;
  }

  .fixed-bottom-2 {
    .bet-container {
      bottom: 2.5rem!important;
    }
  }
</style>
