<template>
  <div class="common-layout">
    <div class="flex-middle-only nav-sport-tab scroll-x"
         :style="{boxShadow: `inset 0 -1px 0 0 ${activeColors[nav.id]&&activeColors[nav.id].line_color}`}"
         v-if="!hideHeader">
      <div class="re center"
           style="padding: 0 0.6rem;flex-shrink: 0;"
           v-for="tab of navs" :key="tab.id"
           @click="changeNav(tab)"
      >
        <!--icon-->
        <i :class="[tab.icon, tab.id === nav.id && 'active']"></i>
        <!--底部-->
        <i :class="tab.id === nav.id && 'tab-active-line'"
           :style="{backgroundColor: activeColors[nav.id] && activeColors[nav.id].border_color}"></i>
        <span class="fs12 white block center">{{ tab.title }}</span>
      </div>
    </div>

    <slot></slot>

    <!--底部-->
    <div class="fs12" style="background-color: #444;padding-bottom:2rem;">
      <p class="fs14 pd-16-12" style="color: #ddd;">{{$t('t_z_d')}}</p>
      <van-row style="color:#b4b4b4;padding: 0 0.6rem;">
        <van-col :span="12" @click="$router.push('/index/my-bet?type=a')">{{$t('re_bets')}}</van-col>
        <van-col :span="12" @click="$router.push('/index/my-bet?type=b')">{{$t('un_bets')}}</van-col>
      </van-row>

      <p class="fs14 pd-16-12" style="color: #ddd;">{{$t('result')}}</p>
      <van-row style="color:#b4b4b4;padding: 0 0.6rem;">
        <van-col :span="24" @click="$router.push('/index/result')">{{$t('bs_jg')}}</van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import Event from "../event";
import customiseMixin from "../mixins/customiseMixin";

export default {
  mixins: [ customiseMixin ],
  data() {
    return {
      nav: {id: this.$route.query.sport}
    }
  },

  methods: {
    changeNav(nav) {
      this.nav = nav

      switch (nav.alias) {
        case this.$t('z_r'):
        case this.$t('q_p'):
        case this.$t('d_z'):
        case this.$t('b_y'):
        case this.$t('d_j'):
          this.$router.push(`/real-games?id=${nav.id}`)
          return;
        case this.$t('c_p'):
          Event.$emit('toggle-nav-type', 2)
          this.$router.push('/lottery')
          // PC：/index3.php，H5：/mobile/#/lottery/gameList
          return;
        case 'bet365':
          this.$emit('select-sport', {name: nav.title, sport: nav.id})
          return;
      }
    }
  },

  watch: {
    '$route'(route) {
      console.log('watch route', route.query.sport)
      const sport = route.query.sport
      this.nav = this.navs.find(item => item.id === sport) || {}
    }
  },

  computed: {
    ...mapGetters(['homeGames', 'projectConfig']),
    navs() {
      const arr = [
        {title: this.$t('fball'), icon: 'football-icon', id: '1', alias: 'bet365'},
        {title: this.$t('bball'), icon: 'basketball-icon', id: '18', alias: 'bet365'},
        {title: this.$t('tennis'), icon: 'tennis-icon', id: '13', alias: 'bet365'},
        {title: this.$t('vball'), icon: 'volleyball-icon', id: '91', alias: 'bet365'},
        {title: this.$t('b_ball'), icon: 'baseball-icon', id: '16', alias: 'bet365'},
        {title: this.$t('esports'), icon: 'gaming-icon', id: '151', alias: 'bet365'},
        {title: this.$t('z_bjl'), icon: 'sx-icon', id: '32', alias: this.$t('z_r')},
        {title: this.$t('q_p'), icon: 'qipai-icon', id: '38', alias: this.$t('q_p')},
        {title: this.$t('c_p'), icon: 'cp-icon', id: 'cp', alias: this.$t('c_p')},
        {title: this.$t('l_h_j'), icon: 'lhj-icon', id: '33', alias: this.$t('d_z')},
        {title: this.$t('b_y'), icon: 'buyu-icon', id: '36', alias: this.$t('b_y')},
        {title: this.$t('d_j'), icon: 'dianjing-icon', id: '37', alias: this.$t('d_j')},
      ].filter(sport => sport.id in this.displayNavItemIds)

      let list = arr.map(item => {
        let obj = this.homeGames.find(game => item.alias && game.name.indexOf(item.alias) > -1)
        if (obj) {
          item.id = obj.id
        }
        return item;
      })
      return list
    }
  },

  props: {
    hideHeader: false
  },

  created() {
    this.activeColors = {
      '1': {line_color: '#367A65', border_color: '#00BF8B'},
      '18': {line_color: '#9E6900', border_color: '#ED9E00'},
      '13': {line_color: '#4D6B2E', border_color: '#74A145'},
      '91': {line_color: '#80684c', border_color: '#c09c72'},
      '16': {line_color: '#a15d37', border_color: '#f28c53'}
    }
    this.$root.$on('projectConfig', projectConfig => {
      this.projectConfig = projectConfig
    })
  }
}
</script>

<style type="text/css" lang="less" scoped>
.nav-sport-tab {
  height: 3.5rem;
  background-color: #383838;

  .tab-active-line {
    position: absolute;
    height: 2px;
    width: 1.2rem;
    bottom: -0.55rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
