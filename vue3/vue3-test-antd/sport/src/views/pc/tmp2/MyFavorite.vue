<template>
  <div class="bet-grounder-pc-tmp2">
    <div class="white flex-between" style="height:50px;padding: 0 36px;background-color: #404040">
      <span class="fs20">{{$t('fav')}}</span>
    </div>

    <div class="scroll-y hide-scroll-bar" :style="{minHeight: scrollHeight + 'px'}">
      <div v-if="!list.length" class="lh-45 center">{{$t('no_more')}}</div>

      <van-collapse v-model="activeCollapses" :border="false">
        <van-collapse-item :name="league.id"
                           :border="false"
                           :is-link="false"
                           v-for="league of list"
                           :key="league.id">
          <template #title>
            <van-row style="background: #585858;height:40px;" class="flex-middle-only">
              <van-col :span="12" style="color:#cecece;padding-left: 36px;" class="fs12 cles-1">
                {{ league.name }}
              </van-col>

              <van-col :span="12" v-if="activeCollapses.includes(league.id)"
                       class="flex-between fs12" style="color:#cecece;">
                <div class="center flex-1" v-if="league.sport === '1'" v-for="nav of footballNavs" :key="nav">
                  {{ nav }}
                </div>
                <div class="center flex-1" v-if="league.sport === '18'" v-for="nav of basketballNavs" :key="nav">
                  {{ nav }}
                </div>
                <div class="center flex-1" v-if="league.sport === '13'" v-for="nav of tennisNavs" :key="nav">{{ nav }}
                </div>
                <div class="center flex-1" v-if="league.sport === '91'" v-for="nav of volleyballNavs" :key="nav">
                  {{ nav }}
                </div>
                <div class="center flex-1" v-if="league.sport === '16'" v-for="nav of baseballNavs" :key="nav">
                  {{ nav }}
                </div>
                <div class="center flex-1" v-if="league.sport === '151'" v-for="nav of gamingNavs" :key="nav">
                  {{ nav }}
                </div>
              </van-col>

              <van-col :offset="11" :span="1" class="flex-end" v-else>
                <i class="van-icon van-icon-arrow-down" style="color:#cecece;margin-right:0.6rem;"></i>
              </van-col>
            </van-row>
          </template>

          <van-row class="bet-item" style="height: 144px;" v-for="match of league.matches" :key="match.id">
            <van-col :span="12" class="flex full-height"
                     @click="toDetail({...match, league_id: league.id})">

              <div class="full-height flex-middle">
                <Favorite style="margin:0 16px;" :is-favorite="match.is_favorite" :match-id="match.id"/>
              </div>

              <div class="flex bet-item-match-info flex-1 full-height cursor" style="color:#ddd;">
                <div style="width: 64px;" class="fs12 m-t4"
                     v-if="Number(match.sport) === 1 || Number(match.sport) === 18 || Number(match.sport) === 151">
                  <span class="m-b8 block"
                        v-if="String(match.status) === '1' && match.timer.period">{{ match.timer && match.timer.period }}</span>
                  <count-down v-if="String(match.status) === '1'"
                              :type="(Number(match.sport) === 1 || Number(match.sport) === 151) ? 'up':'down'"
                              :time="(match.timer.tm || 0) * 60 + (match.timer.ts * 1 || 0)"
                              :suspend="match.timer.tt"/>

                  <span v-else>{{ format(match.start_time * 1000, 'MM-dd hh:mm') }}</span>
                  <p class="flex-middle-only m-t8">
                    {{ match.market_group_count }}
                    <i class="van-icon van-icon-arrow"></i>
                  </p>
                </div>

                <div class="flex-1">
                  <div class="flex-between lh-20">
                    <div class="cles-1">
                      <i class="circle m-r5"
                         :class="match.playing_indicator === '1' && 'active'"
                         :id="`match-home-indicator-${match.id}`"
                         v-if="(Number(match.sport) === 13 || Number(match.sport) === 91 || Number(match.sport) === 151) && Number(match.status) === 1">
                      </i>
                      <span>{{ match.home_name }}</span>
                    </div>

                    <p style="max-width: 40%">
                                            <span class="p-l5 p-r5"
                                                  :id="`match-home-score-${i}-${match.id}`"
                                                  v-for="(s, i) in score(match.ss).home_score" :key="i">{{ s }}</span>
                    </p>
                  </div>
                  <div class="flex-between lh-20">
                    <div class="cles-1">
                      <i class="circle m-r5"
                         :class="match.playing_indicator === '2' && 'active'"
                         :id="`match-away-indicator-${match.id}`"
                         v-if="(Number(match.sport) === 13 || Number(match.sport) === 91|| Number(match.sport) === 151) && Number(match.status) === 1">
                      </i>
                      <span>{{ match.away_name }}</span>
                    </div>
                    <p style="max-width: 40%">
                                            <span class="p-l5 p-r5"
                                                  :id="`match-away-score-${i}-${match.id}`"
                                                  v-for="(s, i) in score(match.ss).away_score" :key="i">{{ s }}</span>
                    </p>
                  </div>

                  <div class="flex-middle-only fs12  m-t14"
                       v-if="Number(match.status) === 1 && (Number(match.sport) === 13 || Number(match.sport) === 91 || Number(match.sport) === 151)">
                    <!--滚球-->
                    <p class="m-r8" v-if="Number(match.sport) === 13">
                      {{$t('saip')}} <span :id="`match-current-set-${match.id}`">{{ match.current_set }}</span>
                      {{$t('saij')}} <span :id="`match-current-game-${match.id}`">{{ match.current_game }}</span>
                    </p>
                    <span>{{ match.market_group_count }}</span>
                    <i class="van-icon van-icon-arrow"></i>
                  </div>
                </div>
              </div>
            </van-col>
            <van-col :span="12" class="flex-middle-only full-height">

              <!--足球-->
              <van-row gutter="1" v-if="match.sport === '1'" class="full-width full-height">
                <van-col :span="8" class="flex-column flex-between full-height">
                  <!--展示单种玩法 独赢-->
                  <play v-for="k of ['1', '2', 'x']"
                        class="flex-middle"
                        :play="match.market_groups['full_time_result'][k]"
                        :group="match.market_groups['full_time_result']"
                        :match="match"
                        :key="k"/>
                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height">

                  <!--展示单种玩法 比赛进球-->
                  <play v-for="k of ['1', '2']"
                        class="flex-middle flex-column"
                        :show-handicap="true"
                        :play="match.market_groups['asian_handicap'][k]"
                        :group="match.market_groups['asian_handicap']"
                        :match="match"
                        :key="k"/>
                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height">
                  <!--展示单种玩法 大小盘-->
                  <play v-for="k of ['1', '2']" class="flex-middle flex-column"
                        :show-handicap="true"
                        :play="match.market_groups['match_goals'][k]"
                        :group="match.market_groups['match_goals']"
                        :match="match"
                        :key="k">
                    <span slot="alias" class="fs12 m-r5">{{ k === '1' ? $t('height') : $t('below') }}</span>
                  </play>
                </van-col>
              </van-row>

              <!--篮球-->
              <van-row gutter="1" v-if="match.sport === '18'"
                       class="full-width full-height">
                <van-col :span="8" class="flex-column flex-between full-height">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-column flex-middle"
                        :show-handicap="true"
                        :play="match.market_groups['basketball_game_lines_spread'][k]"
                        :group="match.market_groups['basketball_game_lines_spread']"
                        :match="match"
                  />
                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-column flex-middle"
                        :show-handicap="true"
                        :play="match.market_groups['basketball_game_lines_total'][k]"
                        :group="match.market_groups['basketball_game_lines_total']"
                        :match="match"
                  >
                    <span slot="alias" class="fs10">{{ k === '1' ? $t('height') : $t('below')}}</span>
                  </play>
                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-middle"
                        :play="match.market_groups['basketball_game_lines_money_line'][k]"
                        :group="match.market_groups['basketball_game_lines_money_line']"
                        :match="match"
                  />
                </van-col>
              </van-row>

              <!--网球-->
              <van-row gutter="1" v-if="match.sport === '13'" class="full-width full-height">
                <van-col :span="12" class="flex-column flex-between full-height">
                  <play class="flex-column flex-middle"
                        :play="match.market_groups['tennis_to_win_match']['1']"
                        :group="match.market_groups['tennis_to_win_match']"
                        :match="match"
                  />
                </van-col>
                <van-col :span="12" class="flex-column flex-between full-height">
                  <play class="flex-column flex-middle"
                        :play="match.market_groups['tennis_to_win_match']['2']"
                        :group="match.market_groups['tennis_to_win_match']"
                        :match="match"
                  />
                </van-col>
              </van-row>

              <!--排球-->
              <van-row gutter="1" v-if="match.sport === '91'"
                       class="full-width full-height">
                <van-col :span="8" class="flex-column flex-between full-height">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-column flex-middle"
                        :play="match.market_groups['to_win'][k]"
                        :group="match.market_groups['to_win']"
                        :match="match"
                  />
                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-column flex-middle"
                        :show-handicap="true"
                        :play="match.market_groups['total_points'][k]"
                        :group="match.market_groups['total_points']"
                        :match="match"
                  >
                    <span slot="alias" class="fs10">{{ k === '1' ? $t('height') : $t('below')}}</span>
                  </play>
                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-middle flex-column"
                        :show-handicap="true"
                        :play="match.market_groups['handicap_sets'][k]"
                        :group="match.market_groups['handicap_sets']"
                        :match="match"
                  />
                </van-col>
              </van-row>

              <!--棒球-->
              <van-row gutter="1" v-if="match.sport === '16'"
                       class="full-width full-height">
                <van-col :span="8" class="flex-column flex-between full-height">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-column flex-middle"
                        :show-handicap="true"
                        :play="match.market_groups['run_line'][k]"
                        :group="match.market_groups['run_line']"
                        :match="match"
                  />
                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-column flex-middle"
                        :show-handicap="true"
                        :play="match.market_groups['total_points'][k]"
                        :group="match.market_groups['total_points']"
                        :match="match"
                  >
                    <span slot="alias" class="fs10">{{ k === '1' ? $t('height') : $t('below')}}</span>
                  </play>
                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-middle flex-column"
                        :show-handicap="true"
                        :play="match.market_groups['money_line'][k]"
                        :group="match.market_groups['money_line']"
                        :match="match"
                  />
                </van-col>
              </van-row>

              <!--电子竞技-->
              <van-row gutter="1" v-if="match.sport === '151'"
                       class="full-width full-height">
                <van-col :span="12" class="flex-column flex-between full-height" v-for="k of ['1', '2']" :key="k">
                  <play
                        class="flex-column flex-middle"
                        :show-handicap="true"
                        :play="match.market_groups['to_win'][k]"
                        :group="match.market_groups['to_win']"
                        :match="match"
                  />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-collapse-item>
      </van-collapse>
    </div>

    <Footer/>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import {format} from "../../../assets/js/util";
import Event from "../../../event";
import ChooseBet from "../../../mixins/choose-bets"
import CountDown from "../../../common/CountDown";
import Favorite from "../../../components/Favorite";
import Footer from "../../../components/Footer"
import Play from "../../../components/Play";
import getBetList from "../../../mixins/getBetList"

export default {
  mixins: [ChooseBet, getBetList],
  data() {
    return {
      category: 'favorite',
      scrollHeight: 700
    }
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  methods: {
    toDetail(match) {
      console.log('match', match)
      const query = {
        match_id: match.match_id || match.id,
        league_id: match.league_id,
        match_status: match.status,
        sport: match.sport_id
      }

      this.$router.push({
        path: '/index/bet-detail',
        query
      })
    },

    /**获取比赛列表**/
    _getList(loading = false) {
      let params = {
        sport: '', // 1 足球
        category: 'favorite',
        page: 1,
        pageSize: 200,
        league: ''
      }

      this._getMatches(params, loading)
    },

    format(date, fmt) {
      return format(date, fmt)
    }
  },
  components: {
    CountDown,
    Favorite,
    Footer,
    Play
  },

  mounted() {
    this.scrollHeight = window.innerHeight - 146
    window.addEventListener('resize', () => {
      this.scrollHeight = window.innerHeight - 146
    })
  },

  created() {
    this.footballNavs = ['1x2', this.$t('r_f'), this.$t('match_goals')]
    this.basketballNavs = [this.$t('r_f'), this.$t('z_f'), this.$t('game_lines_money_line')]
    this.tennisNavs = ['1', '2']
    this.volleyballNavs = [this.$t('winner'), this.$t('z_f'), this.$t('rang_f_j')]
    this.baseballNavs = [this.$t('z_l'), this.$t('z_f'), this.$t('game_lines_money_line')]
    this.gamingNavs = ['1', '2']
  },

  beforeRouteEnter(to, from, next) {
    next(_this => {
      _this.startLoop = false

      _this._getList(true)

      Event.$on('fetch-match-change', () => {
        if (_this.startLoop === true) {
          _this.loopGetMatchChanges()
        }
      })
    })
  },

  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave', to.query)
    this.loopTimes = 0
    this.startLoop = false
    Event.$off('fetch-match-change')
    next()
  }
};
</script>
<style type="text/css" lang="less">
.bet-grounder-pc-tmp2 {
  background-color: #505050;
  color: #ddd;

  .van-tabs__line {
    bottom: 11px !important;
  }

  .bet-item {
    min-height: 68px;
    width: 100%;
    padding: 12px 0;
    border-bottom: 1px solid #5d5d5d;
  }

  .bet-item-match-info {
    padding: 0 12px;
    border-right: 1px solid #5d5d5d;
    border-left: 1px solid #5d5d5d;
  }

  .tab-line {
    bottom: -6px;
    width: 40px;
    height: 2px;
    background-color: #fff;
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
  }
}
</style>
