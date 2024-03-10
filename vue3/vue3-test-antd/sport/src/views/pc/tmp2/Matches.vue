<template>
  <div class="matches-pc-tmp2">
    <div class="upcoming-title flex-column flex-between">
      <div class="flex-middle-only fs12 full-width cursor" style="color:#cecece;" @click="$router.back()">
        <i class="van-icon van-icon-arrow-left m-r8"></i>
        <span>{{ sportName(sport) }}</span>
      </div>

      <div class="flex-middle-only full-width" @click="showPicker = true">
        <span style="color: #ddd;" class="fs20 m-r8">{{ league.league_name }}</span>
        <i class="van-icon van-icon-arrow-down" style="color:#cecece;"></i>
      </div>
    </div>

    <div class="flex-middle-only" style="padding: 0 36px;height:48px;">
      <span class="fs16" style="color:#5FE8BD;">{{ handicap.name }}</span>

      <div ref="picker-anchor" class="flex-middle-only cursor" @click="showHandicapPicker = true">
        <span class="fs12 m-l10" style="color: #ddd;">{{$t('change')}}</span>
        <i class="van-icon van-icon-arrow-down" style="color:#cecece;"></i>
      </div>
    </div>

    <div class="lh-45 center" style="color:#b6b6b6;" v-if="!list.length">{{$t('no_more')}}</div>

    <div :style="{minHeight: scrollHeight + 'px'}">
      <div v-for="group of list" :key="group.title">
        <van-row class="flex-middle-only" style="height:1.4rem;background-color: #585858;">
          <van-col :span="10" style="color:#ddd;padding-left: 36px;" class="fs12">{{ group.title }}</van-col>
          <van-col :span="13" class="flex-between fs12" style="color:#ddd;">
            <div class="flex-1 center" v-for="nav of navTabs" :key="nav">{{ nav }}</div>
          </van-col>
        </van-row>

        <van-row class="bet-item"
                 :style="{height: rowHeight}"
                 v-for="match of group.matches" :key="match.id"
                 @click="toDetail({...match, league_id: group.id,status: 0})">
          <van-col :span="10" class="flex-middle-only full-height">

            <Favorite style="margin:0 16px;" :is-favorite="match.is_favorite" :match-id="match.id"/>

            <div class="flex bet-item-match-info flex-1 full-height">
              <div style="width: 56px;" class="fs12">
                <span>{{ format(match.start_time * 1000, 'hh:mm') }}</span>
              </div>

              <div class="flex-1 cursor" @click="toDetail({...match, league_id: group.id, match_status: 0})">
                <div class="flex-between lh-20">
                  <p class="cles-1" style="max-width: 85%;">{{ match.home_name }}</p>
                  <span>{{ match.ss ? match.ss.split('-')[0] : '' }}</span>
                </div>
                <div class="flex-between lh-20">
                  <p class="cles-1" style="max-width: 85%;">{{ match.away_name }}</p>
                  <span>{{ match.ss ? match.ss.split('-')[1] : '' }}</span>
                </div>

                <p style="margin-top:12px;" v-if="Number(sport) === 1">{{$t('pingj')}}</p>
              </div>
            </div>
          </van-col>
          <van-col :span="13" class="flex-middle-only full-height">
            <!--展示单种玩法 独赢-->
            <play class="flex-middle flex-column" v-for="k of ['1', 'x', '2']"
                  v-if="handicap.code === 'full_time_result'"
                  :play="match.market_groups['full_time_result'][k]"
                  :group="match.market_groups['full_time_result']"
                  :match="match"
                  :key="k"/>

            <!--展示单种玩法 比赛进球-->
            <play v-for="k of ['1', '2']"
                  v-if="handicap.code === 'asian_handicap'"
                  :show-handicap="true"
                  :play="match.market_groups['asian_handicap'][k]"
                  :group="match.market_groups['asian_handicap']"
                  :match="match"
                  :key="k"
            />

            <!--展示单种玩法 大小盘-->
            <play class="flex-column flex-middle" v-for="k of ['1', '2']" :key="k"
                  v-if="handicap.code === 'match_goals'"
                  :show-handicap="true"
                  :play="match.market_groups['match_goals'][k]"
                  :group="match.market_groups['match_goals']"
                  :match="match"
            />

            <!--展示网球单种玩法 比赛获胜-->
            <play v-for="k of ['1', '2']"
                  class="flex-middle"
                  v-if="handicap.code === 'tennis_to_win_match'"
                  :play="match.market_groups['tennis_to_win_match'][k]"
                  :group="match.market_groups['tennis_to_win_match']"
                  :match="match"
                  :key="k"/>

            <!--展示足球玩法 展示全部-->
            <van-row gutter="1" v-if="handicap.code ==='asian_handicap_goal'"
                     class="full-width full-height">
              <van-col :span="8" class="flex-column flex-between full-height">
                <!--展示单种玩法 独赢-->
                <play class="flex-middle" v-for="k of ['1', '2', 'x']"
                      :play="match.market_groups['full_time_result'][k]"
                      :group="match.market_groups['full_time_result']"
                      :match="match"
                      :key="k"/>
              </van-col>
              <van-col :span="8" class="flex-column flex-between full-height">

                <!--展示单种玩法 比赛进球-->
                <play class="flex-middle flex-column" v-for="k of ['1', '2']"
                      :show-handicap="true"
                      :play="match.market_groups['asian_handicap'][k]"
                      :group="match.market_groups['asian_handicap']"
                      :match="match"
                      :key="k"/>
              </van-col>
              <van-col :span="8" class="flex-column flex-between full-height">
                <!--展示单种玩法 大小盘-->
                <play class="flex-middle flex-column" v-for="k of ['1', '2']"
                      :show-handicap="true"
                      :play="match.market_groups['match_goals'][k]"
                      :group="match.market_groups['match_goals']"
                      :match="match"
                      :key="k">
                  <span slot="alias" class="fs10 m-r5">{{ k === '1' ? $t('height') : $t('below') }}</span>
                </play>
              </van-col>
            </van-row>

            <!--展示篮球玩法 展示全部-->
            <van-row gutter="1" v-if="handicap.code === 'basketball_game_lines'"
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
                  <span slot="alias" class="fs10">{{ k === '1' ? $t('height') : $t('below') }}</span>
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

            <!--展示排玩法 展示全部-->
            <van-row gutter="1" v-if="handicap.code === 'volleyball_game_lines'"
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

            <!--展示网球赛盘 展示全部-->
            <van-row gutter="1" v-if="handicap.code === 'tennis_set_betting'"
                     class="full-width full-height">
              <van-col :span="12" class="flex-column flex-between full-height" v-for="k of ['1', '2']" :key="k">
                <play v-for="play of match.market_groups['tennis_set_betting'][k]" :key="play.market_id"
                      class="flex-column flex-middle"
                      :show-name="true"
                      :play="play"
                      :group="match.market_groups['tennis_set_betting']"
                      :match="match"
                />
              </van-col>
            </van-row>

            <!--展示棒球玩法 展示全部-->
            <van-row gutter="1" v-if="handicap.code === 'baseball_game_lines'"
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

            <!--展示电子竞技玩法 展示全部-->
            <van-row gutter="1" v-if="handicap.code === 'esports_match_lines'"
                     class="full-width full-height">
              <van-col :span="8" class="flex-column flex-between full-height">
                <play v-for="k of ['1', '2']" :key="k"
                      class="flex-column flex-middle"
                      :show-handicap="true"
                      :play="match.market_groups['to_win'][k]"
                      :group="match.market_groups['to_win']"
                      :match="match"
                />
              </van-col>
              <van-col :span="8" class="flex-column flex-between full-height">
                <play v-for="k of ['1', '2']" :key="k"
                      class="flex-column flex-middle"
                      :show-handicap="true"
                      v-if="match.market_groups['match_handicap'][k]"
                      :play="match.market_groups['match_handicap'][k]"
                      :group="match.market_groups['match_handicap']"
                      :match="match"
                >
                  <span slot="alias" class="fs10">{{ k === '1' ? $t('height') : $t('below')}}</span>
                </play>
              </van-col>
              <van-col :span="8" class="flex-column flex-between full-height">
                <play v-for="k of ['1', '2']" :key="k"
                      class="flex-middle flex-column"
                      v-if="match.market_groups['total_maps'][k]"
                      :show-handicap="true"
                      :play="match.market_groups['total_maps'][k]"
                      :group="match.market_groups['total_maps']"
                      :match="match"
                />
              </van-col>
            </van-row>
          </van-col>
          <van-col :span="1"
                   @click="toDetail({...match, league_id: group.id, match_status: 0})"
                   class="flex-middle full-height cursor" style="border-left: 1px solid #5d5d5d;">
            <span>{{ match.market_group_count }}</span>
            <i class="van-icon van-icon-arrow"></i>
          </van-col>
        </van-row>
      </div>
    </div>

    <Footer/>

    <van-overlay :show="showPicker"
                 :lock-scroll="false"
                 @click.stop="showPicker = false"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.2)`}"
    >
      <div class="ab hide-scroll-bar"
           :style="{width: '17rem', top: '230px', left: '250px'}"
           @click.stop>
        <ul class="tmp2-overlay-content scroll-y">
          <li :class="league.league_id === item.league_id ? 'active' : ''"
              @click="_changeLeague(item)" v-for="item of leagues" :key="item.league_id">
            {{ item.league_name }}
          </li>
        </ul>
      </div>
    </van-overlay>

    <van-overlay :show="showHandicapPicker"
                 @click.stop="showHandicapPicker = false"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.2)`}"
    >
      <div class="ab hide-scroll-bar"
           :style="{width: '11rem',left: '250px', top: '280px'}"
           @click.stop>
        <ul class="tmp2-overlay-content">
          <li class="cursor" v-for="item of handicaps" :key="item.code"
              :class="handicap.code === item.code ? 'active' : ''"
              @click="_changeHandicap(item)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import handicapPicker from "../../../components/HandicapPicker";
import Favorite from "../../../components/Favorite";
import Play from "../../../components/Play";
import Footer from "../../../components/Footer"
import MatchesMixin from "../../../mixins/matches";
import {format} from "../../../assets/js/util"

export default {
  mixins: [MatchesMixin],
  data() {
    return {
      scrollHeight: 0
    }
  },

  computed: {
    rowHeight() {
      const {code} = this.handicap
      let arr = ['tennis_set_betting', 'asian_handicap_goal', 'basketball_game_lines', 'volleyball_game_lines', 'baseball_game_lines']
      if (arr.indexOf(code) > -1) {
        return '144px'
      }

      return '90px'
    }
  },

  watch: {
    '$route'(route) {
      this.initialMatches(route.query)
    }
  },

  methods: {
    toDetail(match) {

      this.$router.push({
        path: `/index/bet-detail`,
        query: {
          match_id: match.id,
          league_id: match.league_id,
          match_status: match.status,
          sport: match.sport
        }
      })
    },
    format(date, fmt) {
      return format(date, fmt)
    }
  },

  components: {
    handicapPicker,
    Favorite,
    Play,
    Footer
  },

  mounted() {
    this.scrollHeight = window.innerHeight - 115 - 240
    window.addEventListener('resize', () => {
      this.scrollHeight = window.innerHeight - 115 - 240
    })
  }
};
</script>
<style type="text/css" lang="less">
.matches-pc-tmp2 {
  color: #ddd;
  background-color: #505050;

  .upcoming-title {
    height: 98px;
    background-color: #404040;
    padding: 16px 36px 20px 36px;
  }

  .bet-item {
    max-height: 145px;
    min-height: 70px;
    padding: 12px 0;
    border-bottom: 1px solid #5d5d5d;
  }

  .bet-item-match-info {
    height: 100%;
    padding: 0 12px;
    border-right: 1px solid #5d5d5d;
    border-left: 1px solid #5d5d5d;
  }
}
</style>
