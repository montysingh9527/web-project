<template>
  <div class="bet-grounder-pc-tmp2">
    <ul class="flex-middle-only header-sport" :style="{borderBottomColor: getDefaultSport(sport.id).bottomColor}">
      <li v-for="item of sports" :key="item.id"
          v-if="item.id in displaySportIds"
          class="re full-height cursor flex-column flex-middle"
          :class="item.id !== 1 ? 'm-l20':''"
          @click="onSelect(item)"
      >
        <p class="sport-icon" :class="[getDefaultSport(item.id).icon, item.id === sport.id && 'active']"></p>
        <span class="white fs12">{{ $t(item.text) }}</span>
        <i class="ab-middle-x sport-under-line"
           v-if="item.id === sport.id"
           :style="{backgroundColor: getDefaultSport(sport.id).activeColor}">
        </i>
      </li>
    </ul>

    <div class="white flex-between" style="height:50px;padding: 0 36px;background-color: #404040">

      <span class="fs20">{{ getDefaultSport(sport.id).name }}</span>

      <ul class="flex right-tabs">
        <li class="fs12 pd10 re cursor" v-for="item of currentHandicaps"
            @click="onConfirmHandicap(item.code)"
            :key="item.code">
          <span>{{ $t(item.name) }}</span>

          <span class="tab-line ab-middle-x" v-if="handicap.code === item.code"></span>
        </li>
      </ul>
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
            <van-row style="background: #585858;height:40px;" class="flex-middle-only cursor">
              <van-col :span="12" style="color:#cecece;padding-left: 36px;" class="fs12 cles-1">
                {{ league.name }}
              </van-col>

              <van-col :span="12" v-if="activeCollapses.includes(league.id)"
                       class="flex-between fs12" style="color:#cecece;">
                <div class="center flex-1" v-for="nav of navTabs" :key="nav">{{ nav }}</div>

              </van-col>

              <van-col :offset="11" :span="1" class="flex-end" v-else>
                <i class="van-icon van-icon-arrow-down" style="color:#cecece;margin-right:0.6rem;"></i>
              </van-col>
            </van-row>
          </template>

          <van-row class="bet-item" :style="{height: rowHeight}" v-for="match of league.matches" :key="match.id">
            <van-col :span="12" class="flex full-height">

              <div class="full-height flex-middle">
                <Favorite style="margin:0 16px;" :is-favorite="match.is_favorite" :match-id="match.id"/>
              </div>

              <div class="flex bet-item-match-info flex-1 full-height cursor" style="color:#ddd;"
                   @click="toDetail({...match, league_id: league.id})">
                <div style="width: 64px;" class="fs12 m-t4"
                     v-if="Number(match.sport) === 1 || Number(match.sport) === 18 || Number(sport.id) === 151">

                  <span class="m-b8 block" v-if="match.timer">{{ match.timer.period }}</span>

                  <!--足球和篮球倒计时,足球正数 篮球倒数 电子竞技 CS-GO倒数,DOTA2 正数-->
                  <count-down v-if="Number(sport.id) === 1 || Number(sport.id) === 18 || Number(sport.id) === 151"
                              :type="(Number(match.sport) === 1 || (league.name.indexOf('CS:GO') === -1) && sport.id == 151) ? 'up':'down'"
                              :time="(match.timer.tm || 0) * 60 + (match.timer.ts * 1 || 0)"
                              :suspend="match.timer.tt"/>

                  <p class="flex-middle-only m-t8">
                    <span>{{ match.market_group_count }}</span>
                    <i class="van-icon van-icon-arrow"></i>
                  </p>
                </div>

                <div class="flex-1">
                  <div class="flex-between lh-20">
                    <div class="cles-1">

                      <!--网球发球方-->
                      <i class="circle m-r5"
                         :class="match.playing_indicator === '1' && 'active'"
                         :id="`match-home-indicator-${match.id}`"
                         v-if="Number(match.sport) === 13">
                      </i>
                      <span>{{ match.home_name }}</span>
                    </div>

                    <!--足球,篮球,棒球只显示总比分-->
                    <div style="max-width: 40%" class="flex-end"
                         v-if="Number(match.sport) === 1 || Number(match.sport) === 18 || Number(match.sport) === 16">
                      <p style="width: 20px" class="yellow flex-middle" :id="`match-away-score-0-${match.id}`">
                        {{ match.ss.split('-')[0] }}</p>
                    </div>

                    <!--网球,排球 显示所有比分-->
                    <div style="max-width: 40%" class="flex-end" v-else>
                      <p style="width: 20px" class="yellow flex-middle" :id="`match-away-score-0-${match.id}`">
                        {{ match.ss.split('-')[0] }}</p>

                      <p style="width: 20px" class="flex-middle" v-for="(s, i) in scoresObj(match)" :key="i">
                        {{ s.home }}
                      </p>
                      <p v-if="match.points" style="width: 1rem" class="flex-middle">
                        {{ match.points.split('-')[0] }}</p>
                    </div>
                  </div>
                  <div class="flex-between lh-20">
                    <div class="cles-1">
                      <!--网球,排球,棒球 发球方-->
                      <i class="circle m-r5"
                         :class="match.playing_indicator === '2' && 'active'"
                         :id="`match-away-indicator-${match.id}`"
                         v-if="Number(match.sport) === 13">
                      </i>
                      <span>{{ match.away_name }}</span>
                    </div>

                    <!--足球,篮球,棒球只显示总比分-->
                    <div style="max-width: 40%" class="flex-end"
                         v-if="Number(match.sport) === 1 || Number(match.sport) === 18 || Number(match.sport) === 16">
                      <p style="width: 20px" class="yellow flex-middle" :id="`match-away-score-0-${match.id}`">
                        {{ match.ss.split('-')[1] }}</p>
                    </div>

                    <!--网球,排球 显示所有比分-->
                    <div style="max-width: 40%" class="flex-end" v-else>
                      <p style="width: 20px" class="yellow flex-middle" :id="`match-away-score-0-${match.id}`">
                        {{ match.ss.split('-')[1] }}</p>

                      <p style="width: 20px" class="flex-middle" v-for="(s, i) in scoresObj(match)" :key="i">
                        {{ s.away }}</p>

                      <p v-if="match.points" style="width: 1rem" class="flex-middle">
                        {{ match.points.split('-')[1] }}</p>
                    </div>
                  </div>

                  <div class="flex-middle-only fs12  m-t14"
                       v-if="Number(match.sport) === 13 || Number(match.sport) === 91">
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

            <!--展示电子竞技单种玩法 输赢-->
            <van-col :span="12" class="flex-middle-only full-height"
                     v-if="handicap.code === 'esports_match_lines' && match.market_groups['to_win']">
              <play class="flex-middle"
                    v-for="k of ['1', '2']"
                    :play="match.market_groups['to_win'][k]"
                    :group="match.market_groups['to_win']"
                    :match="match"
                    :key="k"/>
            </van-col>

            <!--展示单种玩法 独赢-->
            <van-col :span="12" class="flex-middle-only full-height"
                     v-if="handicap.code === 'full_time_result' && match.market_groups['full_time_result']">

              <play class="flex-middle"
                    v-for="k of ['1', 'x', '2']"
                    :play="match.market_groups['full_time_result'][k]"
                    :group="match.market_groups['full_time_result']"
                    :match="match"
                    :key="k"/>
            </van-col>

            <!--展示单种玩法 比赛让球-->
            <van-col :span="12" class="flex-middle-only full-height"
                     v-if="handicap.code === 'asian_handicap' && match.market_groups['asian_handicap']">
              <play class="flex-middle flex-column"
                    v-for="k of ['1', '2']"
                    :show-handicap="true"
                    :play="match.market_groups['asian_handicap'][k]"
                    :group="match.market_groups['asian_handicap']"
                    :match="match"
                    :key="k"/>
            </van-col>

            <!--展示单种玩法 大小盘-->
            <van-col :span="12" class="flex-middle-only full-height"
                     v-if="handicap.code === 'match_goals' && match.market_groups['match_goals']">
              <play class="flex-middle flex-column"
                    v-for="k of ['1', '2']"
                    :show-handicap="true"
                    :play="match.market_groups['match_goals'][k]"
                    :group="match.market_groups['match_goals']"
                    :match="match"
                    :key="k"/>
            </van-col>

            <!--展示篮球 让分-->
            <van-col :span="12" class="flex-middle-only full-height"
                     v-if="handicap.code === 'basketball_game_lines_spread' && match.market_groups['basketball_game_lines_spread']">
              <play class="flex-column flex-middle"
                    v-for="k of ['1', '2']" :key="k"
                    :show-handicap="true"
                    :play="match.market_groups['basketball_game_lines_spread'][k]"
                    :group="match.market_groups['basketball_game_lines_spread']"
                    :match="match"
              />
            </van-col>

            <!--篮球 总分-->
            <van-col :span="12" class="flex-middle-only full-height"
                     v-if="handicap.code === 'basketball_game_lines_total' && match.market_groups['basketball_game_lines_total']">
              <play class="flex-column flex-middle"
                    v-for="k of ['1', '2']" :key="k"
                    :show-handicap="true"
                    :play="match.market_groups['basketball_game_lines_total'][k]"
                    :group="match.market_groups['basketball_game_lines_total']"
                    :match="match"
              />
            </van-col>

            <!--篮球 强弱盘-->
            <van-col :span="12" class="flex-middle-only full-height"
                     v-if="handicap.code === 'basketball_game_lines_money_line' && match.market_groups['basketball_game_lines_money_line']">
              <play
                  class="flex-middle"
                  v-for="k of ['1', '2']" :key="k"
                  :play="match.market_groups['basketball_game_lines_money_line'][k]"
                  :group="match.market_groups['basketball_game_lines_money_line']"
                  :match="match"
              />
            </van-col>

            <!--展示网球 获胜者-->
            <van-col :span="12" class="flex-middle-only full-height"
                     v-if="handicap.code === 'tennis_to_win_match' && match.market_groups['tennis_to_win_match']">
              <play class="flex-column flex-middle"
                    v-for="k of ['1', '2']" :key="k"
                    :show-handicap="true"
                    :play="match.market_groups['tennis_to_win_match'][k]"
                    :group="match.market_groups['tennis_to_win_match']"
                    :match="match"
              />
            </van-col>

            <!--展示足球亚洲盘,大小盘,滚球玩法 展示全部-->
            <van-col :span="12" class="flex-middle-only full-height" v-if="handicap.code === 'asian_handicap_goal'">
              <van-row gutter="1" class="full-width full-height">
                <van-col :span="8" class="flex-column flex-between full-height"
                         v-if="match.market_groups['full_time_result']">
                  <!--展示单种玩法 独赢-->
                  <play v-for="k of ['1', '2', 'x']"
                        class="flex-middle"
                        :play="match.market_groups['full_time_result'][k]"
                        :group="match.market_groups['full_time_result']"
                        :match="match"
                        :key="k"/>
                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height"
                         v-if="match.market_groups['asian_handicap']">

                  <!--展示单种玩法 比赛进球-->
                  <play v-for="k of ['1', '2']"
                        class="flex-middle flex-column"
                        :show-handicap="true"
                        :play="match.market_groups['asian_handicap'][k]"
                        :group="match.market_groups['asian_handicap']"
                        :match="match"
                        :key="k"/>

                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height"
                         v-if="match.market_groups['match_goals']">
                  <!--展示单种玩法 大小盘-->
                  <play v-for="k of ['1', '2']"
                        class="flex-middle flex-column"
                        :show-handicap="true"
                        :play="match.market_groups['match_goals'][k]"
                        :group="match.market_groups['match_goals']"
                        :match="match"
                        :key="k">
                    <span slot="alias" class="fs12 m-r5">{{ k === '1' ? $t('height') : $t('below') }}</span>
                  </play>
                </van-col>
              </van-row>
            </van-col>

            <!--展示篮球玩法 展示全部-->
            <van-col :span="12" class="flex-middle-only full-height" v-if="handicap.code === 'basketball_game_lines'">
              <van-row gutter="1" class="full-width full-height">
                <van-col :span="8" class="flex-column flex-between full-height"
                         v-if="match.market_groups['basketball_game_lines_spread']">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-column flex-middle"
                        :show-handicap="true"
                        :play="match.market_groups['basketball_game_lines_spread'][k]"
                        :group="match.market_groups['basketball_game_lines_spread']"
                        :match="match"
                  />
                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height"
                         v-if="match.market_groups['basketball_game_lines_total']">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-column flex-middle"
                        :show-handicap="true"
                        :play="match.market_groups['basketball_game_lines_total'][k]"
                        :group="match.market_groups['basketball_game_lines_total']"
                        :match="match"
                  >
                    <span slot="alias" class="fs10">{{ k === '1' ? $t('height') : $t('below') }}</span>
                  </play>
                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height"
                         v-if="match.market_groups['basketball_game_lines_money_line']">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-middle"
                        :play="match.market_groups['basketball_game_lines_money_line'][k]"
                        :group="match.market_groups['basketball_game_lines_money_line']"
                        :match="match"
                  />
                </van-col>
              </van-row>
            </van-col>

            <!--展示排球玩法 展示全部-->
            <van-col :span="12" class="flex-middle-only full-height" v-if="handicap.code === 'volleyball_game_lines'">
              <van-row gutter="1" class="full-width full-height">
                <van-col :span="8" class="flex-column flex-between full-height" v-if="match.market_groups['to_win']">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-middle"
                        :play="match.market_groups['to_win'][k]"
                        :group="match.market_groups['to_win']"
                        :match="match"
                  />
                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height"
                         v-if="match.market_groups['total_points']">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-column flex-middle"
                        :show-handicap="true"
                        :play="match.market_groups['total_points'][k]"
                        :group="match.market_groups['total_points']"
                        :match="match"
                  >
                    <span slot="alias" class="fs10">{{ k === '1' ? $t('height') : $t('below') }}</span>
                  </play>
                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height"
                         v-if="match.market_groups['handicap_sets']">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-middle flex-column"
                        :show-handicap="true"
                        :play="match.market_groups['handicap_sets'][k]"
                        :group="match.market_groups['handicap_sets']"
                        :match="match"
                  />
                </van-col>
              </van-row>
            </van-col>

            <!--展示棒球玩法 展示全部-->
            <van-col :span="12" class="flex-middle-only full-height" v-if="handicap.code === 'baseball_game_lines'">
              <van-row gutter="1" class="full-width full-height">
                <van-col :span="8" class="flex-column flex-between full-height">
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-middle flex-column"
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
                    <span slot="alias" class="fs10">{{ k === '1' ? $t('height') : $t('below') }}</span>
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
            </van-col>
          </van-row>
        </van-collapse-item>
      </van-collapse>
    </div>

    <Footer/>
  </div>
</template>
<script>
import {sports} from "../../../common/config"
import {mapGetters} from "vuex"
import {format} from "../../../assets/js/util";
import Event from "../../../event";
import ChooseBet from "../../../mixins/choose-bets"
import CountDown from "../../../common/CountDown";
import Favorite from "../../../components/Favorite";
import Footer from "../../../components/Footer"
import Play from "../../../components/Play";
import getBetList from "../../../mixins/getBetList"
import customiseMixin from "../../../mixins/customiseMixin";

const all_handicap_item = {code: 'asian_handicap_goal', name: '亚洲让分盘和大小盘', sport: '1', alias: 'a_h_goal'}
const basketball_game_lines = {code: 'basketball_game_lines', name: '比赛投注', sport: '18', alias: 'b_g_lines'}
const tennis_game_lines = {code: 'tennis_to_win_match', name: '比赛获胜', sport: '13', alias: 't_t_w_match'}
const volleyball_game_lines = {code: 'volleyball_game_lines', name: '比赛投注', sport: '91', alias: 'b_g_lines'}
const baseball_game_lines = {code: 'baseball_game_lines', name: '比赛投注', sport: '16', alias: 'b_g_lines'}
const esports_match_lines = {code: 'esports_match_lines', name: '比赛投注', sport: '151', alias: 'b_g_lines'}

export default {
  mixins: [ChooseBet, getBetList, customiseMixin],
  data() {
    return {
      activeTab: 'asian_handicap_goal',
      handicap: all_handicap_item,
      category: 'inplay',
      showSportPopover: false,
      sport: {id: 1, text: this.$t('fball')},
      scrollHeight: 700
    }
  },

  computed: {
    ...mapGetters(['userInfo']),
    navTabs() {
      const {code} = this.handicap
      switch (code) {
        case 'full_time_result':
          return ['1', 'x', '2']
        case 'asian_handicap':
          return ['1', '2']
        case 'match_goals':
          return [this.$t('height'), this.$t('below')]
        case 'asian_handicap_goal':
          return ['1x2', this.$t('r_f'), this.$t('match_goals')]
        case 'basketball_game_lines':
          return [this.$t('r_f'), this.$t('z_f'), this.$t('game_lines_money_line')]
        case 'basketball_game_lines_spread':
        case 'basketball_game_lines_money_line':
          return ['1', '2']
        case 'basketball_game_lines_total':
          return [this.$t('height'), this.$t('below')]
        case 'tennis_to_win_match':
          return ['1', '2']
        case 'volleyball_game_lines':
          return [this.$t('winner'), this.$t('z_f'), this.$t('rang_f_j')]
        case 'baseball_game_lines':
          return [this.$t('r_l'), this.$t('z_f'), this.$t('q_r_p')]
        case 'esports_match_lines':
          return ['1', '2']
      }
    },

    currentHandicaps() {
      return this.handicaps.filter(item => Number(item.sport) === Number(this.sport.id))
    },

    rowHeight() {
      const {code} = this.handicap
      if (code === 'asian_handicap_goal' || code === 'basketball_game_lines' || code === 'volleyball_game_lines') {
        return '144px'
      }

      return '94px'
    }
  },

  watch: {
    $route(route) {
      let sport_id = route.query.sport
      if (sport_id) {
        this.sport = sports.find(item => Number(item.id) === Number(sport_id))
      }

      this._getList(true)
    }
  },

  methods: {
    // 比分序列化
    scoresObj(match = {}) {
      const { scores } = match;
      let list = Object.values(scores)

      if (match.sport === '151') {
        list.pop()
        return [...list]
      }
      return [list.pop()]
    },

    getDefaultSport(sport = 1) {
      let id = Number(sport)

      if (id === 1) {
        return {
          icon: 'football-icon',
          bottomColor: '#137A5A',
          activeColor: '#159A1A',
          name: this.$t('fball'),
          handicap: all_handicap_item
        }
      } else if (id === 18) {
        return {
          icon: 'basketball-icon',
          bottomColor: '#9E6900',
          activeColor: '#ED9E00',
          name: this.$t('bball'),
          handicap: basketball_game_lines
        }
      } else if (id === 13) {
        return {
          icon: 'tennis-icon',
          bottomColor: '#4D6B2E',
          activeColor: '#74A145',
          name: this.$t('tennis'),
          handicap: tennis_game_lines
        }
      } else if (id === 91) {
        return {
          icon: 'volleyball-icon',
          bottomColor: '#80684C',
          activeColor: '#C09C72',
          name: this.$t('vball'),
          handicap: volleyball_game_lines
        }
      } else if (id === 16) {
        return {
          icon: 'baseball-icon',
          bottomColor: '#a15d37',
          activeColor: '#f28c53',
          name: this.$t('b_ball'),
          handicap: baseball_game_lines
        }
      } else if(id === 151) {
        return {
          icon: 'gaming-icon',
          bottomColor: '#137A5A',
          activeColor: '#159A1A',
          name: this.$t('esports'),
          handicap: esports_match_lines
        }
      }
    },

    onSelect(sport) {
      let sport_id = Number(sport.id)

      this.sport = sport

      this.handicap = this.getDefaultSport(sport_id).handicap

      this.$router.push(`/index/bet-grounder?sport=${sport_id}`)
    },

    toDetail(match) {
      console.log('match', match)
      const query = {
        match_id: match.match_id || match.id,
        league_id: match.league_id,
        match_status: match.status,
        sport: this.sport.id
      }

      this.$router.push({
        path: '/index/bet-detail',
        query
      })
    },
    /**玩法切换**/
    onConfirmHandicap(code) {
      this.handicap = this.handicaps.find(handicap => handicap.code === code)
      this.showPicker = false
    },

    /**获取比赛列表**/
    _getList(loading = false) {
      let params = {
        sport: this.sport.id, // 1 足球
        category: 'inplay',
        page: 1,
        pageSize: 200,
        league: this.leagueId
      }

      if (this.upcomingTime) {
        params.start_time = format(new Date(), 'yyyy-MM-dd hh:mm:ss')
        params.end_time = format(new Date().getTime() + this.upcomingTime * 3600000, 'yyyy-MM-dd hh:mm:ss')
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
    this.sports = sports
  },

  beforeRouteEnter(to, from, next) {
    next(_this => {
      _this.startLoop = false
      let sport_id = Number(to.query.sport) || 1

      _this.sport = sports.find(item => item.id === sport_id)

      _this._getList(true)

      _this.handicap = _this.getDefaultSport(sport_id).handicap

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

  .header-sport {
    background-color: #333;
    padding: 0 36px;
    height: 70px;
    border-bottom: 2px solid;
  }

  .sport-icon {
    width: 26px;
    height: 26px;
    margin-bottom: 8px;
  }

  .sport-under-line {
    width: 24px;
    height: 3px;
    bottom: -2px;
  }

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
