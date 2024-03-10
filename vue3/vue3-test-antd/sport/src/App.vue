<template>
  <div class="app" v-cloak>
    <keep-alive>
      <transition :name="transitionRouter" mode="in-out">
        <router-view class="wrap-router"/>
      </transition>
    </keep-alive>

    <van-overlay :show="loading" :custom-style="{backgroundColor: `rgba(0,0,0,.7)`}">
      <van-loading v-if="loading" class="ab-middle flex-middle" size="50px"/>
    </van-overlay>

    <div v-if="showKefu && projectConfig && projectConfig.zxkfUrl"
         class="kefu-float-box white"
         @click="toKefu"
         :class="isPc ? 'pc' : 'mobile'"
    >
<!--      <van-icon name="cross" class="ab" style="right: -2px;top:-2px;" color="#ddd" @click.stop="showKefu = false"></van-icon>-->
    </div>
  </div>
</template>
<script>
import {getAutoLogin, getUserBalance, getWebConfig, getInitData, getUserMsg} from './axios/user'
import {getUrlParameters} from './assets/js/util'
import {mapMutations, mapGetters} from "vuex";
import Cookie from "js-cookie";
import Event from './event'
import {getHomeGames} from "./axios/sport";

export default {
  data() {
    return {
      enterTransition: "animated fadeIn",
      leaveTransition: "animated fadeOut",
      transitionRouter: '',
      loading: false,
      showKefu: localStorage.getItem('tmp') === 'tmp2',
      topNavs: []
    };
  },

  computed: {
    ...mapGetters(['appParams', 'projectConfig']),
    games() {
      if (this.projectConfig.popGameTypes && this.topNavs.length) {
        const popGameTypes = this.projectConfig.popGameTypes;
        const host = process.env.NODE_ENV === 'development' ? 'http://tmutmktv015igvc.lkzhapo23165akj.com' : window.location.origin;
        const lang = localStorage.getItem('lang').indexOf('zh') > -1 ? 'zh' : 'en';
        return this.topNavs.map(tab => {
          tab.list.map(game => {
            if (popGameTypes[game.gameId]) {

              let {imgDir, list} = popGameTypes[game.gameId]
              let arr = []

              for (let subGameChildId in list) {
                let id = subGameChildId.replace('|', '')
                let logo = id === '0' ? `${host}/images/gameHome.png` : `${host}/images/${imgDir}/${lang}/${id}.png`
                let obj = {
                  gameId: id,
                  title: list[subGameChildId],
                  logo
                }

                arr.push(obj)
              }

              game.subGames = arr
            }

            return game
          })

          return tab
        })
      }
      return []
    }
  },

  methods: {
    ...mapMutations({
      updateUserInfo: 'UPDATE_USER_INFO',
      setAppParams: 'SET_APP_PARAMS',
      setProjectConfig: 'UPDATE_PROJECT_CONFIG',
      updateHomeGames: 'UPDATE_HOME_GAMES',
      updateUserInfoStatus: 'UPDATE_USERINFO_STATUS'
    }),

    toKefu() {
      window.open(this.projectConfig.zxkfUrl, '_blank')
    },

    rewriteCookiesAndLogin() {
      let params = getUrlParameters(window.location.href)
      //
      const {
        loginsessid = Cookie.get('loginsessid'),
        logintoken = Cookie.get('logintoken')
      } = params

      if (loginsessid && logintoken) {
        Cookie.set('loginsessid', loginsessid)
        Cookie.set('logintoken', logintoken)
      }

      this.setAppParams(params)

      getInitData()
          .then(_initdata => {
            if (_initdata.enable) {
              //检查cookie的logintoken是否可用
              this.updateUserInfo(_initdata);

              getUserMsg()
                  .then(_usermsg => {
                    this.updateUserInfo(_usermsg)

                    // 刷新金额
                    getUserBalance()
                        .then(res => {
                          if (!Number.isNaN(Number.parseFloat(res))) {
                            this.updateUserInfo({balance: res})
                          }
                        })
                  })
            }
          })


      // getAutoLogin({loginsessid, logintoken})
      //     .then(res => {
      //         if (res.code !== 0) {
      //             // this.$toast(res.msg)
      //             console.log('参数效验失败,请重新登录')
      //             return false;
      //         }
      //
      //         const _initdata = res.data
      //
      //         if (_initdata.enable) {
      //
      //             // console.log('_initdata.enable', _initdata.enable)
      //             this.updateUserInfo(_initdata)
      //             // getUserMsg()
      //             //     .then(res => {
      //             //         this.updateUserInfo(res);
      //             //     })
      //             // 刷新金额
      //             getUserBalance()
      //                 .then(res => {
      //                     if (!Number.isNaN(Number.parseFloat(res))) {
      //                         this.updateUserInfo({balance: res})
      //                     }
      //                 })
      //         } else {
      //             console.log('登录失败')
      //         }
      //     })
      //     .catch(err => {
      //         console.log(err)
      //     })
    },
    appBgColor() {
      console.log(this.appParams)
      let tmp = localStorage.getItem('tmp') || this.appParams.tmp

      switch (tmp) {
        case "tmp1":
          document.body.style.backgroundColor = '#f2f2f2'
          return;
        case "tmp2":
          document.body.style.backgroundColor = '#494949'
          return;
      }
    },

    _getHomeGames() {
      getHomeGames()
          .then(res => {
            if (res.code === 0) {
              this.topNavs = res.data.icons
            }
          })
    },
  },

  watch: {
    games: {
      handler(g) {
        if (g.length > 0) {
          localStorage.setItem('games', JSON.stringify(g))
          this.updateHomeGames(g)
        }
      },
      deep: true
    },
    $route(to, from) {
      if (!to.meta.index && !from.meta.index) {
        this.transitionRouter = ""
        return;
      }

      //将不想有过渡动画效果的部分路由写进判断条件中
      if (to.path !== '/' || from.path !== '/') {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index < from.meta.index) {
          //设置动画名称
          this.transitionRouter = 'slide-left';
        } else if (to.meta.index > from.meta.index) {
          this.transitionRouter = 'slide-right';
        }
      } else {
        this.transitionRouter = ""
      }
    }
  },

  mounted() {
    Event.$on('loading', state => {
      this.loading = state.loading
    })

    this.$nextTick(() => {
      // 所有定时器
      setInterval(() => {
        let second = new Date().getSeconds()
        Event.$emit('interval', new Date().getTime())

        // 每隔20秒请求发送一次获取 热门比赛信息 事件
        if (second % 20 === 0) {
          Event.$emit('loop-getHotMatches')
        }

        // 每隔3秒请求发送一次获取 比赛信息 事件
        if (second % 4 === 0) {
          Event.$emit('fetch-match-change')
        }
      }, 1000)

      // this.appBgColor()
    });

    document.onclick = () => {
      this.updateUserInfoStatus(false);
    }
  },
  created() {
    this.rewriteCookiesAndLogin()
    this._getHomeGames()
    getWebConfig()
        .then(res => {
          if(window.innerWidth <= 768) {
            document.title = res.webName
          } else {
            document.title = res.page_title;
          }

          document.getElementById('ico').setAttribute('href', res.favicon)
          this.setProjectConfig(res)
          sessionStorage.setItem('projectConfig', JSON.stringify(res))
        })
    this.isPc = window.innerWidth > 768;
  },

  destroyed() {
    document.onclick = null;
  }
};
</script>

<style type="text/css" lang="less">
.app {
  overflow: hidden;
  height: 100%;
  .wrap-router {
    -webkit-overflow-scrolling: touch;
    position: relative;
    height: 100%;
  }

  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all .2s;
  }

  .slide-left-enter,
  .slide-left-leave {
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all .2s;
  }

  .slide-right-enter,
  .slide-right-leave {
    transform: translate3d(100%, 0, 0);
  }
  .van-hairline--top-bottom{
    .van-tabbar-item{
      text-align: center;
    }
  }

  .kefu-float-box {
    background-color: #4a4a4a;
    background-image: url("./assets/images/tmp2/kefu.png");
    position: fixed;
    background-size: 100% 100%;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 11px 0 rgba(0, 0, 0, 0.2);

    &.mobile {
      width: 35px;
      height: 35px;
    }

    &.pc {
      width: 65px;
      height: 65px;
    }
  }
}
</style>
