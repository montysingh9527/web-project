<template>
  <van-row class="bet-play-item flex-middle-only">
    <van-col :span="colSpan.left"
             style="color:#ddd;"
             class="fs12 full-height flex"
             @click="_toDetail(match)"
    >
      <div class="flex-middle full-height m-l8 m-r8">
        <Favorite :is-favorite="match.is_favorite" :match-id="match.id"/>
      </div>

      <div class="ground-item-info flex-column flex-between flex-1">
        <!--球队和比分-->
        <div class="full-width">
          <div class="flex-between lh-20">
            <p class="cles-1">
              <i class="circle m-r5"
                 :class="match.playing_indicator === '1' && 'active'"
                 :id="`match-home-indicator-${match.id}`"
                 v-if="Number(match.sport) === 13 && Number(match.status) === 1">
              </i>

              <!--电子竞技主队(红或蓝色放)-->
              <i class="circle m-r5" v-if="Number(match.sport) === 151 && Number(match.status) === 1"></i>
              <span>{{match.home_name}}</span>
            </p>

            <!--足球篮球排球电竞-->
            <div style="max-width: 50%;" class="flex-end" v-if="Number(match.sport) === 1 || Number(match.sport) === 18 || Number(match.sport) === 16 || Number(match.sport) === 151">
              <p style="width: 1rem" class="yellow flex-middle" :id="`match-home-score-0-${match.id}`" v-if="match.ss">
                {{match.ss.split('-')[0]}}
              </p>
            </div>

            <div style="max-width: 50%;" class="flex-end" v-else>
              <p style="width: 1rem" class="yellow flex-middle" :id="`match-home-score-0-${match.id}`" v-if="match.ss">{{match.ss.split('-')[0]}}</p>
              <p v-if="match.scores" style="width: 1rem" class="flex-middle" v-for="(s, i) in scoresObj(match.scores)"
                 :key="i">
                {{s && s.home || '-'}}
              </p>
              <p v-if="match.points" style="width: 1rem" class="flex-middle">{{match.points.split('-')[0]}}</p>
            </div>
          </div>
          <div class="flex-between lh-20">
            <p class="cles-1">
              <i class="circle m-r5"
                 :class="match.playing_indicator === '2' && 'active'"
                 :id="`match-away-indicator-${match.id}`"
                 v-if="Number(match.sport) === 13 && Number(match.status) === 1"></i>

              <!--电子竞技客队(红或蓝色放)-->
              <i class="circle m-r5" v-if="Number(match.sport) === 151 && Number(match.status) === 1"></i>
              <span>{{match.away_name}}</span>
            </p>

            <!--足球篮球排球小节比分电竞-->
            <div style="max-width: 50%;" class="flex-end" v-if="Number(match.sport) === 1 || Number(match.sport) === 18 || Number(match.sport) === 16 || Number(match.sport) === 151">
              <p style="width: 1rem" class="yellow flex-middle" :id="`match-away-score-0-${match.id}`" v-if="match.ss">
                {{match.ss.split('-')[1]}}
              </p>
            </div>

            <div style="max-width: 50%;" class="flex-end" v-else>
              <p style="width: 1rem" class="yellow flex-middle" :id="`match-away-score-0-${match.id}`" v-if="match.ss">
                {{match.ss.split('-')[1]}}</p>
              <p v-if="match.scores" style="width: 1rem" class="flex-middle" v-for="(s, i) in scoresObj(match.scores)"
                 :key="i">
                {{s && s.away || '-'}}
              </p>
              <p v-if="match.points" style="width: 1rem" class="flex-middle">{{match.points.split('-')[1]}}</p>
            </div>
          </div>
        </div>

        <!--网球或排球-->
        <div class="full-width flex-middle-only" v-if="Number(match.sport) === 13 || Number(match.sport) === 91 || Number(match.sport) === 16">
          <!--早盘-->
          <span v-if="Number(match.status) !== 1" class="m-r10">{{format(match.start_time*1000, formatTxt)}}</span>

          <!--滚球-->
          <p v-if="Number(match.status) === 1 && (Number(match.sport) === 13)" class="m-r8">
            {{$t('saip')}} <span :id="`match-current-set-${match.id}`">{{match.current_set}}</span>
            {{$t('saij')}} <span :id="`match-current-game-${match.id}`">{{match.current_game}}</span>
          </p>
          <span>{{match.market_group_count}}</span>
          <i class="van-icon van-icon-arrow"></i>
        </div>

        <!--需要计时的体育(足球,篮球等)-->
        <div class="full-width" v-else>
          <p class="fs12 lh-20" v-if="match.sport === '1' && String(match.status) !== '1'">{{$t('pingj')}}</p>

          <div class="flex-middle-only m-t8">
            <span class="m-r8" v-if="String(match.status) === '1'">{{match.timer && match.timer.period}}</span>
            <count-down
              class="m-r8"
              :type="(Number(match.sport) === 1 || (match.league_name.indexOf('CS:GO') === -1) && match.sport == '151') ? 'up':'down'"
              v-if="String(match.status) === '1'"
              :time="(match.timer.tm || 0) * 60 + (match.timer.ts * 1 || 0)"
              :suspend="match.timer.tt"/>

            <span v-else class="m-r8">{{format(match.start_time*1000, formatTxt)}}</span>

            <span>{{match.market_group_count}}</span>
            <i class="van-icon van-icon-arrow"></i>
          </div>
        </div>
      </div>

    </van-col>

    <van-col :span="colSpan.right" class="flex-between full-height" style="color:#FFDF1B;">

      <!--展示单种玩法 独赢-->
      <play v-if="handicap.code === 'full_time_result' && match.market_groups['full_time_result']"
            class="flex-middle"
            v-for="k of ['1', 'x', '2']" :key="k"
            :play="match.market_groups['full_time_result'][k]"
            :group="match.market_groups['full_time_result']"
            :match="match"
      />

      <!--展示单种玩法 比赛让球-->
      <play v-if="handicap.code === 'asian_handicap' && match.market_groups['asian_handicap']"
            class="flex-column flex-middle"
            v-for="k of ['1', '2']" :key="k"
            :show-handicap="true"
            :play="match.market_groups['asian_handicap'][k]"
            :group="match.market_groups['asian_handicap']"
            :match="match"
      />

      <!--展示单种玩法 大小盘-->
      <play v-if="handicap.code === 'match_goals' && match.market_groups['match_goals']"
            class="flex-column flex-middle"
            :show-handicap="true"
            v-for="k of ['1', '2']" :key="k"
            :play="match.market_groups['match_goals'][k]"
            :group="match.market_groups['match_goals']"
            :match="match"
      />

      <!--展示篮球 让分 总分 强弱盘-->
      <play
        v-if="handicap.code === 'basketball_game_lines_spread' && match.market_groups['basketball_game_lines_spread']"
        class="flex-column flex-middle"
        v-for="k of ['1', '2']" :key="k"
        :show-handicap="true"
        :play="match.market_groups['basketball_game_lines_spread'][k]"
        :group="match.market_groups['basketball_game_lines_spread']"
        :match="match"
      />

      <play v-if="handicap.code === 'basketball_game_lines_total' && match.market_groups['basketball_game_lines_total']"
            class="flex-column flex-middle"
            v-for="k of ['1', '2']" :key="k"
            :show-handicap="true"
            :play="match.market_groups['basketball_game_lines_total'][k]"
            :group="match.market_groups['basketball_game_lines_total']"
            :match="match"
      />

      <play
        v-if="handicap.code === 'basketball_game_lines_money_line' && match.market_groups['basketball_game_lines_money_line']"
        class="flex-middle"
        v-for="k of ['1', '2']" :key="k"
        :play="match.market_groups['basketball_game_lines_money_line'][k]"
        :group="match.market_groups['basketball_game_lines_money_line']"
        :match="match"
      />

      <!--网球-->
      <play v-if="handicap.code === 'tennis_to_win_match' && match.market_groups['tennis_to_win_match']"
            class="flex-middle"
            v-for="k of ['1', '2']" :key="k"
            :play="match.market_groups['tennis_to_win_match'][k]"
            :group="match.market_groups['tennis_to_win_match']"
            :match="match"
      />

      <!--排球/电子竞技-->
      <play v-if="handicap.code === 'to_win' && match.market_groups['to_win']"
            class="flex-middle"
            v-for="k of ['1', '2']" :key="k"
            :play="match.market_groups['to_win'][k]"
            :group="match.market_groups['to_win']"
            :match="match"
      />

<!--      &lt;!&ndash;展示电子竞技 赛盘投注玩法&ndash;&gt;-->
<!--      <play v-if="handicap.code === 'to_win' && match.market_groups['to_win']"-->
<!--            class="flex-middle"-->
<!--            v-for="k of ['1', '2']" :key="k"-->
<!--            :play="match.market_groups['to_win'][k]"-->
<!--            :group="match.market_groups['to_win']"-->
<!--            :match="match"-->
<!--      />-->

      <!--展示足球玩法 展示全部-->
      <van-row gutter="1" v-if="handicap.code === 'asian_handicap_goal'" class="full-width full-height">
        <van-col :span="8" class="flex-column flex-between full-height" v-if="match.market_groups['full_time_result']">
          <!--独赢-->
          <play v-for="k of ['1', '2', 'x']" :key="k"
                class="flex-middle"
                :play="match.market_groups['full_time_result'][k]"
                :group="match.market_groups['full_time_result']"
                :match="match"
          />
        </van-col>
        <van-col :span="8" class="flex-column flex-between full-height" v-if="match.market_groups['asian_handicap']">

          <!--比赛进球-->
          <play v-for="k of ['1', '2']" :key="k"
                class="flex-column flex-middle"
                :show-handicap="true"
                :play="match.market_groups['asian_handicap'][k]"
                :group="match.market_groups['asian_handicap']"
                :match="match"
          />

        </van-col>
        <van-col :span="8" class="flex-column flex-between full-height" v-if="match.market_groups['match_goals']">
          <!--大小盘-->
          <play class="flex-column flex-middle"
                :show-handicap="true"
                v-for="k of ['1', '2']" :key="k"
                :play="match.market_groups['match_goals'][k]"
                :group="match.market_groups['match_goals']"
                :match="match"
          >
            <span slot="alias" class="fs10">{{k === '1' ? $t('height') : $t('below')}}</span>
          </play>
        </van-col>
      </van-row>

      <!--展示篮球玩法 展示全部-->
      <van-row gutter="1" v-if="handicap.code === 'basketball_game_lines'" class="full-width full-height" style="height:5rem;">
        <van-col :span="8" class="flex-column flex-between full-height" v-if="match.market_groups['basketball_game_lines_spread']">
          <play v-for="k of ['1', '2']" :key="k"
                :show-handicap="true"
                class="flex-column flex-middle"
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
            <span slot="alias" class="fs10">{{k === '1' ? $t('height') : $t('below')}}</span>
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

      <!--展示网球 赛盘投注玩法-->
      <van-row gutter="1" v-if="handicap.code === 'tennis_set_betting'" class="full-width full-height"
               style="height:5rem;">
        <van-col :span="12" class="flex-column flex-between full-height" v-for="k of ['1', '2']" :key="k">
          <play v-for="market of match.market_groups['tennis_set_betting'][k]" :key="market.market_id"
                class="flex-column flex-middle"
                :show-name="true"
                :play="market"
                :group="match.market_groups['tennis_set_betting']"
                :match="match"
          />
        </van-col>
      </van-row>

      <!--展示排球 赛盘投注玩法-->
      <van-row gutter="1" v-if="handicap.code === 'volleyball_game_lines'" class="full-width full-height"
               style="height:5rem;">
        <van-col :span="8" class="flex-column flex-between full-height" v-if="match.market_groups['to_win']">
          <play v-for="k of ['1', '2']" :key="k"
                class="flex-column flex-middle"
                :play="match.market_groups['to_win'][k]"
                :group="match.market_groups['to_win']"
                :match="match"
          />
        </van-col>
        <van-col :span="8" class="flex-column flex-between full-height" v-if="match.market_groups && match.market_groups['total_points']">
          <play v-for="k of ['1', '2']" :key="k"
                class="flex-column flex-middle"
                :show-handicap="true"
                :play="match.market_groups['total_points'][k]"
                :group="match.market_groups['total_points']"
                :match="match"
          >
            <span slot="alias" class="fs10">{{k === '1' ? $t('height') : $t('below')}}</span>
          </play>
        </van-col>
        <van-col :span="8" class="flex-column flex-between full-height" v-if="match.market_groups['handicap_sets']">
          <play v-for="k of ['1', '2']" :key="k"
                class="flex-middle flex-column"
                :show-handicap="true"
                :play="match.market_groups['handicap_sets'][k]"
                :group="match.market_groups['handicap_sets']"
                :match="match"
          />
        </van-col>
      </van-row>

      <!--展示棒球 赛盘投注玩法-->
      <van-row gutter="1" v-if="handicap.code === 'baseball_game_lines'" class="full-width full-height"
               style="height:5rem;">
        <van-col :span="8" class="flex-column flex-between full-height" v-if="match.market_groups['run_line']">
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
            <span slot="alias" class="fs10">{{k === '1' ? $t('height') : $t('below')}}</span>
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

      <!--展示电子竞技 赛盘投注玩法-->
      <van-row gutter="1" v-if="handicap.code === 'esports_match_lines'" class="full-width full-height"
               style="height:5rem;">
        <van-col :span="8" class="flex-column flex-between full-height">
          <play v-for="k of ['1', '2']" :key="k"
                class="flex-middle"
                :play="match.market_groups['to_win'][k]"
                :group="match.market_groups['to_win']"
                :match="match"
          />
        </van-col>
        <van-col :span="8" class="flex-column flex-between full-height">
          <play v-for="k of ['1', '2']" :key="k"
                class="flex-column flex-middle"
                :show-handicap="true"
                :play="match.market_groups['match_handicap'][k]"
                :group="match.market_groups['match_handicap']"
                :match="match"
          />
        </van-col>
        <van-col :span="8" class="flex-column flex-between full-height">
          <play v-for="k of ['1', '2']" :key="k"
                class="flex-middle flex-column"
                :show-handicap="true"
                :play="match.market_groups['total_maps'][k]"
                :group="match.market_groups['total_maps']"
                :match="match"
          ><span slot="alias" class="fs10">{{k === '1' ? $t('height') : $t('below')}}</span></play>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<script>
  import {mapGetters} from 'vuex'
  import CountDown from "../common/CountDown";
  import Favorite from "./Favorite";
  import Play from "./Play";
  import {format} from "../assets/js/util";

  export default {
    props: {
      match: {
        type: Object,
        default: () => ({})
      },

      leagueId: '',

      formatTxt: {
        type: String,
        default: 'MM-dd hh:mm'
      },

      handicap: {
        type: Object,
        default: () => ({code: 'asian_handicap_goal', name: this.$t('a_h_goal'), sport: '1'})
      },

      customStyle: {
        type: Object,
        default: () => ({})
      },

      colSpanLeft: {
        type: [Number, String],
        default: 0
      }
    },

    computed: {
      ...mapGetters(['userInfo']),
      colSpan() {
        let sport_id = Number(this.match.sport)

        if (this.colSpanLeft) {
          let leftSpan = Number(this.colSpanLeft)
          return {
            left: leftSpan,
            right: 24 - leftSpan
          }
        }

        if (sport_id === 13) {
          return {
            left: 14,
            right: 10
          }
        } else {
          return {
            left: 11,
            right: 13
          }
        }
      },
    },

    methods: {
      // 比分序列化
      scoresObj(scores = {}) {
        let list = Object.values(scores)
        return [list.pop()]
      },

      _toDetail() {
        console.log('match', this.match)
        this.$router.push({
          path: `/index/bet-detail`,
          query: {
            match_id: this.match.id,
            league_id: this.leagueId,
            match_status: this.match.status,
            sport: this.match.sport,
            league_name: this.match.league_name
          }
        })
      },

      format(date, fmt) {
        return format(date, fmt)
      },
    },

    components: {
      CountDown,
      Favorite,
      Play
    }
  };
</script>

<style type="text/css" lang="less" scoped>

  .bet-play-item {
    padding: 0.6rem 0;
    height: 5.6rem;
    border-bottom: 1px solid #5d5d5d;
  }

  .bet-play-item:last-child {
    border-bottom: none !important;
  }


  .ground-item-info {
    border-left: 1px solid #5d5d5d;
    border-right: 1px solid #5d5d5d;
    padding: 0.2rem 0.4rem;
  }
</style>
