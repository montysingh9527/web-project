<template>
  <div class="football-pc-tmp2">

    <div class="flex-column scroll-y hide-scroll-bar"
         style="flex-shrink: 1;"
         :style="{height: navScrollHeight}">
      <div :style="{minHeight: scrollHeight}">
        <div class="header flex-column flex-between" :class="sportBgClass(sport).bg">
          <h3 style="color:#cecece;" class="fs22 full-width">{{ sportBgClass(sport).text }}</h3>

          <p class="flex-between full-width cursor" @click="$router.push(`/index/bet-grounder?sport=${sport}`)">
            <span class="white fs14">{{$t('tzp')}}</span>
            <span style="color:#6EEBC3;" class="flex-middle-only fs12">
                    {{$t('ground')}} {{ sportGroundCount }}
                    <i class="van-icon-arrow van-icon"></i>
                </span>
          </p>
        </div>

        <!--精选赛事-->
        <div class="highlights ">
          <div class="fs16 green" style="padding: 16px 0 0 36px;">{{$t('j_x_sh')}}</div>

          <div class="highlights-list  re">
            <div class="highlight-item-arrow ab-middle-y" style="left:0;" @click.stop="_scroll(-1)">
              <van-icon class="ab-middle" name="arrow-left" size="20" color="#126E51"></van-icon>
            </div>
            <div class="highlight-item-arrow ab-middle-y" style="right:0;" @click.stop="_scroll(1)">
              <van-icon class="ab-middle" name="arrow" size="20" color="#126E51"></van-icon>
            </div>

            <ul ref="scroll-content"
                class="scroll-x hide-scroll-bar flex" style="padding: 16px 36px 0 24px;"
                @click.stop>
              <li class="highlights-item fs12 cursor"
                  @click="toDetail(match)"
                  v-for="match of hotMatches" :key="match.match_id">
                <div class="flex-middle-only lh-20">
                  <load-image class="m-r8" style="width:0.8rem;height:0.8rem"
                              v-if="Number(sport) !== 13"
                              :src="match.home_logo"
                              :loading="require('../../../assets/images/tmp1/team_logo1.svg')"
                              :error="require('../../../assets/images/tmp1/team_logo1.svg')"
                  />
                  <span class="cles-1 fs12">{{ match.home_name }}</span>
                </div>

                <div class="flex-middle-only lh-20">
                  <load-image class="m-r8" style="width:0.8rem;height:0.8rem;"
                              v-if="Number(sport) !==  13"
                              :src="match.away_logo"
                              :loading="require('../../../assets/images/tmp1/team_logo2.svg')"
                              :error="require('../../../assets/images/tmp1/team_logo2.svg')"
                  />
                  <span class="cles-1 fs12">{{ match.away_name }}</span>
                </div>

                <p class="lh-30 flex-middle-only">
                  <span>{{ format(match.start_time * 1000, 'MM-dd hh:mm') }}</span>
                  <i class="van-icon van-icon-arrow"></i>
                </p>
                <div class="flex-between" style="height:2rem;" v-if="Number(sport) === 1">
                  <Play class="flex-middle flex-column"
                        v-for="value of [$t('h_team'), $t('a_team')]"
                        :show-handicap="true"
                        :key="value"
                        :play="findPlay(value, 'header', match.markets)"
                        :match="match"
                        :group="findGroup(findPlay(value, 'header', match.markets), match.market_groups)"
                  />
                </div>

                <div class="flex-between" style="height:2rem;" v-if="Number(sport) === 18">
                  <Play class="flex-middle flex-column"
                        v-for="value of ['1', '2']" :key="value"
                        :show-handicap="true"
                        :play="findPlay(value, 'header', match.markets)"
                        :match="match"
                        :group="findGroup(findPlay(value, 'header', match.markets), match.market_groups)"
                  />
                </div>

                <div class="flex-between" style="height:2rem;" v-if="Number(sport) === 13">
                  <Play class="flex-middle tennis-play"
                        v-for="value of ['1', '2']" :key="value"
                        :show-name="true"
                        :play="findPlay(value, 'name', match.markets)"
                        :match="match"
                        :group="findGroup(findPlay(value,'name', match.markets), match.market_groups)"
                  />
                </div>

                <div class="flex-between" style="height:2rem;" v-if="Number(sport) === 91">
                  <Play class="flex-middle volleyball-play"
                        v-for="value of ['1', '2']" :key="value"
                        :show-header="true"
                        :play="findPlay(value, 'header', match.markets)"
                        :match="match"
                        :group="findGroup(findPlay(value,'header', match.markets), match.market_groups)"
                  />
                </div>

                <div class="flex-between" style="height:2rem;" v-if="Number(sport) === 16">
                  <Play class="flex-middle volleyball-play"
                        v-for="value of ['1', '2']" :key="value"
                        :show-header="true"
                        :play="findPlay(value, 'header', match.markets)"
                        :match="match"
                        :group="findGroup(findPlay(value,'header', match.markets), match.market_groups)"
                  />
                </div>

                <div class="flex-between" style="height:2rem;" v-if="Number(sport) === 151">
                  <Play class="flex-middle volleyball-play"
                        v-for="value of ['1', '2']" :key="value"
                        :show-header="true"
                        :play="findPlay(value, 'header', match.markets)"
                        :match="match"
                        :group="findGroup(findPlay(value,'header', match.markets), match.market_groups)"
                  />
                </div>
              </li>
            </ul>
          </div>

        </div>


        <!--赛事预告-->
        <div v-if="Number(sport) === 1" class="flex-column match-advance" @click="$router.push('/index/bet-upcoming')">
          <h3 class="full-width fs16 m-b20" style="color: #5FE8BD;">{{$t('ssyg')}}</h3>
          <p>
            <span style="color:#f0f0f0;">{{$t('to_hours', {hour: 24})}}</span>
            <span class="flex-middle-only fs12 block" style="color: #ddd;">{{$t('sais', {n: sportUpcomingCount})}}</span>
          </p>
        </div>

        <van-collapse v-model="activeNames" :border="false">
          <van-collapse-item :name="item.code"
                             :ref="`collapse-item-${item.code}`"
                             :border="false"
                             :is-link="false"
                             v-for="item of collapseList"
                             :key="item.code">
            <template #title>
              <div class="fs16 flex-between cursor" style="color: #5FE8BD;padding: 0 36px;height:48px;"
                   @click="_getLeaguesByMarketGroup(item.code)">
                <span>{{ item.name }}</span>

                <van-loading size="16px" v-if="loadings[item.code]"/>

                <i class="van-icon van-icon-arrow-down"
                   style="color:#cecece;"
                   v-else
                   v-show="!activeNames.includes(item.code)"
                ></i>
              </div>
            </template>
            <van-collapse v-model="activeSubNames" :border="false">
              <van-collapse-item :name="`${item.code}-${group.code}`"
                                 :border="false"
                                 :is-link="false"
                                 v-for="group of item.list"
                                 :key="group.code">
                <template #title>
                  <div class="fs14 flex-between cursor" style="color: #ddd;height:44px;padding: 0 36px;">
                    <span>{{ group.name }}</span>
                    <i class="van-icon van-icon-arrow-down"
                       style=";color:#cecece;"
                       v-show="!activeSubNames.includes(group.code)"></i>
                  </div>
                </template>

                <van-row style="padding: 12px 36px;">
                  <van-col class="fs12 lh-30 cursor" style="color:#b5b5b5;" :span="6"
                           @click="toMatches(league, item, group.code)"
                           v-for="league of group.leagues"
                           :key="league.league_id">{{ league.league_name }}
                  </van-col>
                </van-row>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from "vuex"
import Footer from "../../../components/Footer"
import ChooseBet from "../../../mixins/choose-bets"
import SportMixin from "../../../mixins/sport"
import LoadImage from "../../../common/LoadImage";
import Play from "../../../components/Play";
import {getHotMatches} from "../../../axios/sport";
import {format} from "../../../assets/js/util";

export default {
  mixins: [ChooseBet, SportMixin],
  data() {
    return {
      scrollHeight: 0,
      navScrollHeight: 0,
      highlightsListWidth: 400,
      hotMatches: [],
      collect_active: !!localStorage.getItem('football')
    }
  },

  computed: {
    ...mapGetters(['collectFootball'])
  },

  watch: {
    $route(route) {
      this.sport = route.query.sport || 1
      this._getHotMatches()
    }
  },

  methods: {
    ...mapMutations({toggleCollectFootball: 'UPDATE_COLLECT_FOOTBALL'}),

    // 根据标识找出对应玩法
    findPlay(value, k, markets) {
      return markets.find(market => String(market[k]) === String(value)) || {}
    },

    findGroup(play, groups) {
      return groups.find(group => group.market_group_id === play.market_group_id) || {}
    },

    _scroll(flag) {
      const content = this.$refs['scroll-content']
      let scrollLeft = content.scrollLeft

      content.scrollLeft = scrollLeft + flag * 600
    },

    // 热门滚球
    _getHotMatches() {
      let params = {
        sport: this.sport
      }
      getHotMatches(params)
          .then(res => {
            if (res.code === 200) {
              this.hotMatches = res.data.sort((a, b) => Number(a.start_time) - Number(b.start_time))
            }
          })
          .catch(err => {
            console.log('热门滚球信息err', err)
          })
    },

    toDetail(match) {
      console.log('match', match)
      const query = {
        match_id: match.match_id,
        league_id: match.league_id,
        match_status: 0,
        sport: this.sport
      }

      this.$router.push({
        path: '/index/bet-detail',
        query
      })
    },

    format(date, fmt) {
      return format(date, fmt)
    }
  },

  components: {
    Footer,
    LoadImage,
    Play
  },

  mounted() {
    this._getHotMatches()
    this.scrollHeight = window.innerHeight - 96 - 115 + 'px'
    this.navScrollHeight = window.innerHeight - 96 + 'px'
    this.highlightsListWidth = window.innerWidth - 530 + 'px'

    window.addEventListener('resize', () => {
      this.scrollHeight = window.innerHeight - 96 - 115 + 'px'
      this.navScrollHeight = window.innerHeight - 96 + 'px'
      this.highlightsListWidth = window.innerWidth - 530 + 'px'
    })
  }
};
</script>
<style type="text/css" lang="less">
.football-pc-tmp2 {
  background-color: #505050;

  .header {
    background-size: 100% 100%;
    height: 150px;
    width: 100%;
    padding: 40px 36px 16px 36px;
  }

  .match-advance {
    padding: 16px 36px 24px;
    border-bottom: 1px solid #367A65;
    background: #585858;
  }

  .van-collapse-item__title, .van-collapse-item__content {
    padding: 0 !important;
  }

  .van-cell, .van-collapse-item__content {
    background-color: transparent !important;
    line-height: 1;
  }

  .van-collapse-item {
    background: #505050;
    border-bottom: 1px solid #367A65;
    border-top: 1px solid #367A65;

    .van-collapse-item {
      border-bottom: 1px solid #5D5D5D;
      border-top: 1px solid #5D5D5D;
    }
  }

  .highlights {
    background: #585858;
    border-top: 2px solid #367A65;
    border-bottom: 2px solid #6e6e6e;

  }

  .highlights-list {
    /*max-width: 50vw;*/

    padding-top: 0.8rem;

    &:hover {
      .highlight-item-arrow {
        display: block !important;
      }

    }

    .highlight-item-arrow {
      display: none !important;
      width: 35px;
      height: 100px;
      background-color: rgba(0, 0, 0, .5);
    }

    /*&::-webkit-scrollbar {*/
    /*    !*滚动条整体样式*!*/
    /*    //width : 10px;  !*高宽分别对应横竖滚动条的尺寸*!*/
    /*    height: 8px;*/
    /*    !*padding: 2px 0;*!*/
    /*}*/
    /*&::-webkit-scrollbar-thumb {*/
    /*    !*滚动条里面小方块*!*/
    /*    border-radius: 3px;*/
    /*    background: #494949;*/
    /*    height: 6px;*/
    /*}*/
    /*&::-webkit-scrollbar-track {*/
    /*    !*滚动条里面轨道*!*/
    /*    border-radius: 10px;*/
    /*    height: 6px;*/
    /*    background: #606060!important;*/
    /*}*/
  }

  .highlights-item {
    flex-shrink: 0;
    color: #ddd;
    width: 11.2rem;
    padding: 0 0.6rem;
    border-right: 1px solid #666;
  }

  .highlights-item-play {
    width: 100%;
    padding: 0.4rem 0;
  }

  .tennis-play .bet-name {
    margin-right: 10px;
  }

  .volleyball-play .bet-header {
    margin-right: 10px;
  }
}
</style>
