<template>
  <div class="left-pc-nav">
    <div class="flex-between fs14 nav-left-sport-item"
         v-for="tab of navs" :key="tab.title"
         @click="changeNav(tab)">
      <span>{{tab.title}}</span>
      <!--<i class="icon_base collect" :class="collectFootball && 'active'" @click.stop="toggleCollectFootball"></i>-->
      <van-icon name="arrow"/>
    </div>

    <van-overlay :show="loading"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.7)`}">
      <van-loading v-if="loading" class="ab-middle flex-middle" size="50px"/>
    </van-overlay>

    <van-overlay :show="showLottery" :custom-style="{backgroundColor: `rgba(0,0,0,.9)`}" @click="showLottery = false">
      <iframe id="iframe" class="ab-middle" frameborder="2" scrolling="no"
              :src="src"
              :width="iframeStyle.width" :height="iframeStyle.height">
      </iframe>

      <van-icon class="ab"
                :style="{left: iframeStyle.iconLeft, top: iframeStyle.iconTop}"
                name="cross" size="30px" color="#ddd"></van-icon>
      <van-loading v-if="loading && showLottery" class="ab-middle flex-middle" size="50px"/>
    </van-overlay>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from "vuex"
  import Event from "../event";
  import customiseMixin from "../mixins/customiseMixin";

  export default {
    mixins: [ customiseMixin ],
    data() {
      return {
        loading: false,
        showLottery: false,
        src: ''
      }
    },
    computed: {
      ...mapGetters(['projectConfig', 'collectFootball', 'userInfo', 'homeGames']),
      navs() {
        const arr = [
          {title: this.$t('fball'), id: '1', alias: this.$t('fball'), sport_id: 1},
          {title: this.$t('bball'), id: '18', alias: this.$t('bball'), sport_id: 18},
          {title: this.$t('tennis'), id: '13', alias: this.$t('tennis'), sport_id: 13},
          {title: this.$t('vball'), id: '91', alias: this.$t('vball'), sport_id: 91},
          {title: this.$t('b_ball'), id: '16', alias: this.$t('b_ball'), sport_id: 16},
          {title: this.$t('esports'), id: '151', alias: this.$t('esports'), sport_id: 151},
          // {title: this.$t('r_bjl'), id: '', alias: this.$t('z_r')},
          // {title: this.$t('r_lhd'), id: '', alias: this.$t('z_r')},
          // {title: this.$t('r_lp'), id: '', alias: this.$t('z_r')},
          // {title: this.$t('d_21'), id: '', alias: this.$t('q_p')},
          // {title: this.$t('lx_lhj'), id: '', alias: this.$t('d_z')},
          // {title: this.$t('mg_dz'), id: '', alias: this.$t('d_z')},
          // {title: this.$t('py_dr'), id: '', alias: this.$t('b_y')},
          // {title: this.$t('lk_py'), id: '', alias: this.$t('b_y')},
          // {title: this.$t('z_j_h'), id: '', alias: this.$t('q_p')},
          // {title: this.$t('nn'), id: '', alias: this.$t('q_p')},
          // {title: this.$t('hb'), id: '', alias: this.$t('q_p')},
          // {title: this.$t('mj'), id: '', alias: this.$t('q_p')}
        ].filter(sport => sport.id in this.displayNavItemIds)

        let list = arr.map(item => {
          let obj = this.homeGames.find(game => item.alias && game.name.indexOf(item.alias) > -1)
          if (obj) {
            item.id = obj.id
          }
          return item;
        })
        return list
      },
    },

    methods: {
      ...mapMutations({toggleCollectFootball: 'UPDATE_COLLECT_FOOTBALL'}),

      changeNav(nav) {
        this.nav = nav;

        switch (nav.alias) {
          case this.$t('z_r'):
          case this.$t('q_p'):
          case this.$t('d_z'):
          case this.$t('b_y'):
          case this.$t('d_j'):
            this.$router.push(`/index/real-games?id=${nav.id}`)
            return;
          case this.$t('c_p'):
            this.toLottery(nav.id)
            // this.$router.push('/lottery')
            // PC：/index3.php，H5：/mobile/#/lottery/gameList
            return;
          case this.$t('fball'):
          case this.$t('bball'):
          case this.$t('tennis'):
          case this.$t('vball'):
          case this.$t('b_ball'):
          case this.$t('esports'):
            // if (nav.id) {
            //   this.toMatches(nav)
            // } else {
            //   this.$router.push(`/index/sport?sport=${nav.sport_id}`)
            // }
            this.$router.push(`/index/sport?sport=${nav.sport_id}`)
            return;
        }
      },

      toMatches(sport) {
        let query = {
          league_id: sport.id,
          league_name: sport.title,
          sport: sport.sport_id
        }

        if (sport.sport_id === 1) {
          query = {
            ...query,
            market_group_code: 'asian_handicap_goal',
            market_group_name: this.$t('a_h_goal'),
            country: 'EU',
          }
        } else if (sport.sport_id === 18) {
          query = {
            ...query,
            market_group_code: 'basketball_game_lines',
            market_group_name: this.$t('b_g_lines'),
            country: 'us',
          }
        }


        this.$router.push({
          path: '/index/bet-matches',
          query
        })
      },

      toLottery(id) {
        if (!this.userInfo.userId) {
          Event.$emit('show-login')
          return;
        }
        const host = window.location.origin
        // this.showLottery = true
        // this.loading = true
        this.src = `${host}/index3.php?id=${id}`

        // let iframe = document.getElementById("iframe");
        /**
         PC额度转换 /index3.php?realtrans=1
         PC其他游戏记录 /index3.php?realBetList=1
         * */
        window.open(this.src, '_blank')

        // let iwindow = iframe.contentWindow;
        //
        // setTimeout(()=> {
        //     this.loading = false
        // }, 10000)
        // iwindow.onload = () => {
        //     this.loading = false
        //     console.log('this.onload', this.loading)
        // }
      }
    },

    created() {
      this.iframeStyle = {
        width: window.innerWidth * 0.9 + 'px',
        height: window.innerHeight * 0.9 + 'px',
        iconTop: window.innerHeight * 0.05 + 'px',
        iconLeft: window.innerWidth * 0.95 + 10 + 'px'
      }
    }
  }
</script>
<style type="text/css" lang="less" scoped>
  .nav-left-sport-item {
    height: 40px;
    color: #cecece;
    padding: 0 16px;
    cursor: pointer;

    &.active {
      background-color: #474747 !important;
    }

    &:hover {
      background-color: #474747 !important;
    }
  }
</style>
