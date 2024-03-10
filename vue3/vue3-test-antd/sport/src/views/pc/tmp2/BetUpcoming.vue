<template>
  <div class="upcoming-pc-tmp2">
    <div class="upcoming-title flex-column flex-between">
      <div class="flex-middle-only full-width fs12 m-b8" style="color:#cecece;" @click="$router.back()">
        <i class="van-icon van-icon-arrow-left m-r8"></i>
        <span>{{ $t('fball') }}-{{ $t('ssyg') }}</span>
      </div>

      <div class="flex-middle-only full-width cursor" @click="showPicker = true">
        <span style="color: #ddd;" class="fs20 m-r8">{{ hour !== 20 ? $t('to_hours', {hour}) : $t('m_t')}}</span>
        <i class="van-icon van-icon-arrow-down" style="color:#cecece;"></i>
      </div>
    </div>

    <!--        <div class="flex-middle-only" style="height:48px;padding:0 36px;">-->
    <!--            <span class="fs16" style="color:#5FE8BD;">{{handicap.name}}</span>-->


    <!--            <div ref="picker-anchor" class="flex-middle-only" @click="showHandicapPicker = true">-->
    <!--                <span class="fs12 m-l10" style="color: #ddd;">更改</span>-->
    <!--                <i class="van-icon van-icon-arrow-down" style="color:#cecece;"></i>-->
    <!--            </div>-->
    <!--        </div>-->

    <div>
      <div v-if="!list.length" class="lh-45 center">{{ $t('no_more') }}</div>
      <van-collapse v-model="activeCollapses" :border="false">
        <van-collapse-item :name="league.id"
                           :border="false"
                           :is-link="false"
                           v-for="league of list"
                           :key="league.id">
          <template #title>
            <van-row style="background: #585858;height:40px;" class="flex-middle-only">
              <van-col :span="10" style="color:#cecece;padding-left: 36px;" class="fs12 cles-1">
                {{ league.name }}
              </van-col>

              <van-col :span="13" v-if="activeCollapses.includes(league.id)"
                       class="flex-between fs12" style="color:#cecece;">
                <div class="center flex-1" v-for="nav of navTabs" :key="nav">{{ nav }}</div>
              </van-col>

              <van-col :offset="13" :span="1" class="flex-end" v-else>
                <i class="van-icon van-icon-arrow-down" style="color:#cecece;margin-right:0.6rem;"></i>
              </van-col>
            </van-row>
          </template>

          <van-row class="bet-item" v-for="match of league.matches" :key="match.id">
            <van-col :span="10" class="flex-middle-only full-height cursor"
                     @click="toDetail({...match, league_id: league.id})">

              <Favorite style="margin:0 16px;" :is-favorite="match.is_favorite" :match-id="match.id"/>

              <div class="flex bet-item-match-info flex-1 full-height" style="color:#ddd;">
                <div style="width: 56px;" class="fs12 lh-20">
                  <span>{{ format(match.start_time * 1000, 'MM-dd hh:mm') }}</span>
                </div>

                <div class="flex-1">
                  <div class="flex-between lh-20">
                    <p class="cles-1" style="max-width: 85%;">{{ match.home_name }}</p>
                    <span>{{ match.ss ? match.ss.split('-')[0] : '' }}</span>
                  </div>
                  <div class="flex-between lh-20">
                    <p class="cles-1" style="max-width: 85%;">{{ match.away_name }}</p>
                    <span>{{ match.ss ? match.ss.split('-')[1] : '' }}</span>
                  </div>

                  <p style="margin-top:12px;">{{ $t('pingj') }}</p>
                </div>
              </div>
            </van-col>
            <van-col :span="13" class="flex-middle-only full-height">
              <!--展示单种玩法 独赢-->
              <play v-if="handicap.code === 'full_time_result'"
                    v-for="k of ['1', 'x', '2']"
                    :play="match.market_groups['full_time_result'][k]"
                    :group="match.market_groups['full_time_result']"
                    :match="match"
                    :key="k"/>


              <!--展示单种玩法 比赛让球-->
              <play v-if="handicap.code === 'asian_handicap'"
                    v-for="k of ['1', '2']"
                    :play="match.market_groups['asian_handicap'][k]"
                    :group="match.market_groups['asian_handicap']"
                    :match="match"
                    :key="k"/>

              <!--展示单种玩法 大小盘-->
              <play v-if="handicap.code === 'match_goals'"
                    v-for="k of ['1', '2']"
                    :play="match.market_groups['match_goals'][k]"
                    :group="match.market_groups['match_goals']"
                    :match="match"
                    :key="k"/>

              <!--展示玩法 展示全部-->
              <van-row gutter="1" v-if="handicap.code === 'asian_handicap_goal'"
                       class="full-width full-height">
                <van-col :span="8" class="flex-column flex-between full-height">
                  <!--展示单种玩法 独赢-->
                  <play v-for="k of ['1', '2', 'x']" :key="k"
                        class="flex-middle"
                        :play="match.market_groups['full_time_result'][k]"
                        :group="match.market_groups['full_time_result']"
                        :match="match"
                  />
                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height">

                  <!--展示单种玩法 比赛进球-->
                  <play v-for="k of ['1', '2']"
                        class="flex-column flex-middle"
                        :play="match.market_groups['asian_handicap'][k]"
                        :group="match.market_groups['asian_handicap']"
                        :show-handicap="true"
                        :match="match"
                        :key="k"/>

                </van-col>
                <van-col :span="8" class="flex-column flex-between full-height">
                  <!--展示单种玩法 大小盘-->
                  <play v-for="k of ['1', '2']" :key="k"
                        class="flex-column flex-middle"
                        :play="match.market_groups['match_goals'][k]"
                        :group="match.market_groups['match_goals']"
                        :match="match"
                        :show-handicap="true"
                  >
                    <span slot="alias" class="fs12 m-r5">{{ k === '1' ? $t('height') : $t('below') }}</span>
                  </play>
                </van-col>
              </van-row>
            </van-col>
            <van-col :span="1" @click="toDetail({...match, league_id: league.id})"
                     class="flex-middle full-height cursor" style="border-left: 1px solid #5d5d5d;color:#cecece;">
              <span>{{ match.market_group_count }}</span>
              <i class="van-icon van-icon-arrow"></i>
            </van-col>
          </van-row>
        </van-collapse-item>
      </van-collapse>
    </div>

    <Footer/>

    <van-overlay :show="showPicker"
                 @click.stop="showPicker = false"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.2)`}"
    >
      <div class="ab hide-scroll-bar"
           :style="{width: '220px', top: '220px', left: '250px'}"
           @click.stop>
        <ul class="tmp2-overlay-content">
          <li class="cursor" :class="hour === 3 && 'active'" @click="_nextHour(3)">{{ $t('to_hours', {hour: 3}) }}</li>
          <li class="cursor" :class="hour === 12 && 'active'" @click="_nextHour(12)">{{ $t('to_hours', {hour: 12}) }}</li>
          <li class="cursor" :class="hour === 24 && 'active'" @click="_nextHour(24)">{{ $t('to_hours', {hour: 24}) }}</li>
          <li class="cursor" :class="hour === 20 && 'active'" @click="_nextHour(20)">{{ $t('m_t') }}</li>
        </ul>
      </div>
    </van-overlay>

    <van-overlay :show="showHandicapPicker"
                 @click.stop="showHandicapPicker = false"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.2)`}"
    >
      <div class="ab hide-scroll-bar"
           :style="{width: '220px',left: '36px', top: '240px'}"
           @click.stop>
        <ul class="tmp2-overlay-content">
          <li v-for="item of handicaps" :key="item.code"
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
import {format} from "../../../assets/js/util";
import Favorite from "../../../components/Favorite";
import Play from "../../../components/Play";
import Event from "../../../event";
import Footer from "../../../components/Footer"
import getBetList from "../../../mixins/getBetList";

export default {
  mixins: [getBetList],
  data() {
    return {
      handicap: {code: 'asian_handicap_goal', name: this.$t('a_h_goal')},
      showPicker: false,
      hour: 24,
      showHandicapPicker: false,
    }
  },

  computed: {
    navTabs() {
      const {code} = this.handicap
      switch (code) {
        case 'full_time_result':
          return ['1', 'x', '2']
        case 'asian_handicap':
        case 'match_goals':
          return ['1', '2']
        case 'asian_handicap_goal':
          return ['1x2', this.$t('a_h_goal'), this.$t('match_goals')]
      }
    }
  },

  methods: {
    _changeHandicap(handicap) {
      this.handicap = handicap
      this.showHandicapPicker = false
    },

    _nextHour(hour) {
      this.hour = hour
      this.showPicker = false

      this._getBetList(true)
    },

    _changeLeague(id) {
      this.league_id = id
      this.showPicker = false
    },

    /**获取比赛列表**/
    _getBetList(loading = false) {

      let params = {
        sport: '1', // 1 足球
        category: 'upcoming',
        page: 1,
        pageSize: 200,
        league: this.leagueId
      }

      if ([3, 12, 24].includes(this.hour)) {
        params.start_time = format(new Date(), 'yyyy-MM-dd hh:mm:ss')
        params.end_time = format(new Date().getTime() + this.hour * 3600000, 'yyyy-MM-dd hh:mm:ss')
      }

      if(this.hour === 20) {
        const now = new Date();
        params.start_time = format(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0), 'yyyy-MM-dd hh:mm:ss')
        params.end_time = format(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59), 'yyyy-MM-dd hh:mm:ss')
      }

      this._getMatches(params, loading)
    },

    format(date, fmt) {
      return format(date, fmt)
    },

    toDetail(match) {
      const query = {
        match_id: match.match_id || match.id,
        league_id: match.league_id,
        match_status: match.status,
        sport: match.sport
      }

      this.$router.push({
        path: '/index/bet-detail',
        query
      })
    },
  },

  components: {
    Favorite,
    Play,
    Footer
  },

  created() {
    this.handicaps = [
      {code: 'asian_handicap_goal', name: this.$t('a_h_goal')},
      {code: 'full_time_result', name: this.$t('full_time_result')},
      {code: 'asian_handicap', name: this.$t('asian_handicap')},
      {code: 'match_goals', name: this.$t('match_goals')},
    ]
  },

  beforeRouteEnter(to, from, next) {
    next(_this => {
      Event.$on('fetch-match-change', () => {
        if (_this.startLoop === true) {
          _this.loopGetMatchChanges()
        }
      })
      _this._getBetList(true)
    })
  },

  beforeRouteLeave(to, from, next) {
    this.loopTimes = 0
    this.startLoop = false
    Event.$off('fetch-match-change')
    next()
  }
};
</script>
<style type="text/css" lang="less">
.upcoming-pc-tmp2 {
  color: #ddd;
  background-color: #505050;

  .upcoming-title {
    height: 98px;
    background-color: #404040;
    padding: 16px 36px 24px;
  }

  .bet-item {
    height: 145px;
    width: 100%;
    padding: 12px 0;
    border-bottom: 1px solid #5d5d5d;
  }

  .bet-item-match-info {
    height: 100%;
    padding: 0 12px;
    border-right: 1px solid #5d5d5d;
    border-left: 1px solid #5d5d5d;
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
