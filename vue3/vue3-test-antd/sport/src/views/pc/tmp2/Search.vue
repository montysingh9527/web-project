<template>
  <div class="search-pc-tmp2">
    <div class="flex-middle-only marquee-content" @click.stop="$router.push('/index/notice')">
      <div style="height:36px;padding-right:16px;" class="flex-middle">
        <i class="icon_base icon_notice_2"></i>
      </div>

      <marquee-notices class="lh-30 flex-1 fs12" :text="scrollNotices" :textColor="'#cecece'"/>
    </div>
    <header class="flex-between">
      <div style="width: 200px;">
        <img style="height:40px;" :src="projectConfig.pc_logo" alt="">
      </div>

      <div class="flex-1 flex-between">
        <div class="search-box-tmp2 flex-middle-only">
          <i class="el-icon-search white fs18"></i>
          <input class="ab" style="height:1px;width:1px;top:-9999px;" type="password">
          <input v-model="searchText" @keyup="_delaySearch" type="text" class="m-l8" :placeholder="$t('search')">
        </div>

        <div class="flex-middle-only">
          <i class="el-icon-close fs18 white m-r10 cursor" @click="onClear"></i>
          <span class="fs12 cursor" style="color:#e4e4e4;" @click="$router.back()">{{$t('close')}}</span>
        </div>
      </div>

      <div class="flex-end flex-middle-only" style="width: 200px;">
        <LoginPc/>
      </div>
    </header>

    <div class="scroll-y hide-scroll-bar search-page-content" :style="{height: scrollHeight + 'px'}">
      <div v-if="searchResult.empty === true" class="p-l16 fs12 lh-45" style="color: #e4e4e4;">
        {{$t('s_p')}}
      </div>
      <div v-else>
        <div class="example flex-middle-only" :style="{borderBottomColor: sportBorderColor(sport.id)}">
          <div class="full-height flex-middle-only" v-if="searchResult.teams.length || searchResult.leagues.length">
            <div v-for="item of sports" :key="item.id"
                 @click="selectSport(item)"
                 class="re full-height flex-middle-only m-l16 cursor">
              <span class="white fs12">{{ $t(item.text) }}</span>
              <i v-if="item.id === sport.id" class="ab-middle-x search-result-under-line"></i>
            </div>
          </div>

          <span v-else class="fs12 m-l16" style="color: #a7a7a7;">{{$t('ex_s')}}</span>
        </div>

        <ul class="search-example"
            v-if="(searchResult.leagues && !searchResult.leagues.length) && (searchResult.teams &&  !searchResult.teams.length)">
          <li class="lh-30 cursor" v-for="txt of exampleList" :key="txt" @click="changeExampleSearch(txt)">
            <span>{{ txt }}></span>
          </li>
        </ul>

        <div v-else class="overflow-y hide-scroll-bar" style="padding-top:0.4rem;"
             :style="{height: scrollHeight + 'px'}">

          <div v-for="(league, i) in searchResult.leagues" :key="i">
            <div :index="i" @click.stop="toMatches(league)"
                 style="padding: 0 16px;color: #ddd;"
                 class="flex-between lh-40 cursor">
              <span class="fs16">{{ league.league_name }}</span>
              <div class="flex-middle">
                <span>{{$t('s_ma')}}</span>
                <van-icon name="arrow" color="#ddd"></van-icon>
              </div>
            </div>

            <van-row class="flex-middle-only" v-for="match of league.matches" :key="match.match_id"
                     v-if="Number(match.sport_id) === Number(sport.id)"
                     style="padding: 0.4rem 0.8rem;">
              <van-col :span="12" @click="toDetail(match)">
                <p class="fs14" style="color: #ddd;">{{ match.home_name }} V {{ match.away_name }}</p>
                <p class="fs10" style="color: #a5a5a5;">{{ format(match.start_time * 1000, 'MM-dd hh:mm') }}</p>
              </van-col>
              <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '1'">
                <Play v-for="market of match.markets" :key="market.market_id"
                      :show-name="true"
                      :play="market"
                      :group="{name: $t('d_y'),code: 'full_time_result'}"
                      :match="match"
                />
              </van-col>

              <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '18'">
                <Play v-for="market of match.markets" :key="market.market_id"
                      :show-handicap="true"
                      :play="market"
                      :group="{name: $t('b_g_lines'),code: 'basketball_game_lines'}"
                      :match="match"
                />
              </van-col>

              <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '13'">
                <Play v-for="market of match.markets" :key="market.market_id"
                      :show-header="true"
                      :play="market"
                      :group="{name: $t('winner'),code: 'tennis_to_win_match'}"
                      :match="match"
                />
              </van-col>

              <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '91'">
                <Play v-for="market of match.markets" :key="market.market_id"
                      :show-header="true"
                      :play="market"
                      :group="{name: $t('b_g_lines'),code: 'volleyball_game_lines'}"
                      :match="match"
                />
              </van-col>

              <!--棒球-->
              <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '16'">
                <Play v-for="market of match.markets" :key="market.market_id"
                      :show-header="true"
                      :play="market"
                      :group="{name: $t('b_g_lines'),code: 'baseball_game_lines'}"
                      :match="match"
                />
              </van-col>

              <!--电子竞技-->
              <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '151'">
                <Play v-for="market of match.markets" :key="market.market_id"
                      :show-header="true"
                      :play="market"
                      :group="{name: $t('b_g_lines'),code: 'esports_match_lines'}"
                      :match="match"
                />
              </van-col>
            </van-row>
          </div>

          <van-row class="flex-middle-only" v-for="match of searchResult.teams" :key="match.match_id"
                   v-if="Number(match.sport_id) === Number(sport.id)"
                   style="padding: 0.4rem 0.8rem;">
            <van-col :span="12" @click="toDetail(match)">
              <p class="fs14" style="color: #ddd;">{{ match.home_name }} V {{ match.away_name }}</p>
              <p class="fs10" style="color: #a5a5a5;">{{ format(match.start_time * 1000, 'MM-dd hh:mm') }}</p>
            </van-col>

            <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '1'">
              <Play v-for="market of match.markets" :key="market.market_id"
                    :show-name="true"
                    :play="market"
                    :group="{name: $t('d_y'),code: 'full_time_result'}"
                    :match="match"
              />
            </van-col>
            <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '18'">
              <Play v-for="market of match.markets" :key="market.market_id"
                    :show-handicap="true"
                    :play="market"
                    :group="{name: $t('b_g_lines'),code: 'basketball_game_lines'}"
                    :match="match"
              />
            </van-col>
            <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '13'">
              <Play v-for="market of match.markets" :key="market.market_id"
                    :show-header="true"
                    :play="market"
                    :group="{name: $t('winner'),code: 'tennis_to_win_match'}"
                    :match="match"
              />
            </van-col>
            <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '91'">
              <Play v-for="market of match.markets" :key="market.market_id"
                    :show-header="true"
                    :play="market"
                    :group="{name: $t('b_g_lines'),code: 'volleyball_game_lines'}"
                    :match="match"
              />
            </van-col>

            <!--棒球-->
            <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '16'">
              <Play v-for="market of match.markets" :key="market.market_id"
                    :show-header="true"
                    :play="market"
                    :group="{name: $t('b_g_lines'),code: 'baseball_game_lines'}"
                    :match="match"
              />
            </van-col>

            <!--电子竞技-->
            <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '151'">
              <Play v-for="market of match.markets" :key="market.market_id"
                    :show-header="true"
                    :play="market"
                    :group="{name: $t('b_g_lines'),code: 'esports_match_lines'}"
                    :match="match"
              />
            </van-col>
          </van-row>
        </div>
      </div>
    </div>

    <Footer/>

    <FootBetControllerPcTmp2/>
  </div>
</template>
<script>
import SearchMixin from "../../../mixins/search"
import {mapGetters} from "vuex"
import MarqueeNotices from "../../../common/Marquee";
import Footer from "../../../components/Footer"
import {getScrollNotices} from "../../../axios/sport";
import FootBetControllerPcTmp2 from "../../../components/FootBetControllerPcTmp2";
import LoginPc from "../../../components/LoginPc";
import Play from "../../../components/Play";

export default {
  mixins: [SearchMixin],
  data() {
    return {
      scrollNotices: '',
      scrollHeight: 700,
    }
  },

  computed: {
    ...mapGetters(['userInfo', 'projectConfig'])
  },

  methods: {
    _getScrollNotices() {
      getScrollNotices({client: 'pc'})
          .then(res => {

            if (res.code === 200) {
              this.scrollNotices = ''

              res.data.forEach(notice => {
                this.scrollNotices += notice.content + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
              })
            }
          })
    },

    // 计算滚动高度
    computedScrollHeight(height = 0) {
      this.scrollHeight = window.innerHeight - 96 - 115 - height
    }
  },
  components: {
    MarqueeNotices,
    Footer,
    FootBetControllerPcTmp2,
    LoginPc,
    Play
  },
  mounted() {
    this.computedScrollHeight()

    window.addEventListener('resize', () => {
      this.computedScrollHeight()
    })

    this._getScrollNotices()
  }
}
</script>
<style type="text/css" lang="less">
.search-pc-tmp2 {
  background-color: #333;
  min-width: 990px;

  .marquee-content {
    padding: 0 36px;
    height: 36px;
    background-color: #333;
  }

  .search-box-tmp2 {
    input {
      color: #fff;
      width: 500px;

      &::placeholder {
        color: #00E099;
        font-size: 12px;
      }
    }
  }

  > header {
    height: 60px;
    background: #126E51;
    padding: 0 36px;
  }

  > footer {
    background-color: #444444;
    box-shadow: inset 0 1px 0 0 #137A5A;
    height: 115px;
  }

  .example {
    height: 2.2rem;
    border-bottom: 2px solid;
  }

  .search-example {
    padding: 0.8rem;
    color: #ddd;
  }

  .search-result-under-line {
    width: 1.2rem;
    height: 2px;
    background: #ddd;
    bottom: -2px;
  }

  .van-hairline--bottom::after {
    border-bottom-width: 0;
  }

  .van-index-anchor--sticky {
    background-color: #494949;
  }

  /*默认效果*/

  .bet-box {
    padding: 0.4rem 0;
    margin: 1px;
  }

  /*选中效果*/

  .bet-active {
    background-color: #e4e4e4 !important;

    .market-odds {
      color: #126E51 !important;
    }
  }

  .search-page-content {
    padding: 0 236px;
    min-width: 750px;
    margin: 0 auto;
  }
}
</style>
