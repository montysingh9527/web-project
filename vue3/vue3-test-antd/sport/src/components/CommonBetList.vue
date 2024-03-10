<template>
  <div class="common-bet-list">
    <van-collapse v-model="activeCollapses" :border="false">
      <van-collapse-item :name="league.id"
                         v-for="league of list"
                         :key="league.id"
                         :border="false"
                         :is-link="false">
        <template #title>
          <van-row class="flex-middle-only bet-item-title">
            <van-col :span="colSpan(league.sport).left" style="color:#cecece;padding-left:0.6rem;" class="fs12 cles-1">
              {{league.name}}
            </van-col>

            <van-col :span="colSpan(league.sport).right" class="flex-between fs12"
                     v-if="activeCollapses.includes(league.id) && category !== 'favorite'" style="color:#cecece;">
              <div class="center flex-1" v-for="nav of navTabs" :key="nav">{{nav}}</div>
            </van-col>

            <van-col :span="colSpan(league.sport).right" class="flex-between fs12"
                     v-else-if="activeCollapses.includes(league.id) && category === 'favorite' && league.sport === '1'"
                     style="color:#cecece;">
              <div class="center flex-1" v-for="nav of ['1x2', 'game_lines_spread', 'match_goals']" :key="nav">{{$t(nav)}}</div>
            </van-col>

            <van-col :span="colSpan(league.sport).right" class="flex-between fs12"
                     v-else-if="activeCollapses.includes(league.id) && category === 'favorite' && league.sport === '18'"
                     style="color:#cecece;">
              <div class="center flex-1" v-for="nav of ['game_lines_spread', 'game_lines_total', 'game_lines_money_line']" :key="nav">{{nav}}</div>
            </van-col>

            <van-col :span="colSpan(league.sport).right" class="flex-between fs12"
                     v-else-if="activeCollapses.includes(league.id) && category === 'favorite' && league.sport === '13'"
                     style="color:#cecece;">
              <div class="center flex-1" v-for="nav of ['1', '2']" :key="nav">{{nav}}</div>
            </van-col>

            <van-col :span="colSpan(league.sport).right" class="flex-between fs12"
                     v-else-if="activeCollapses.includes(league.id) && category === 'favorite' && league.sport === '91'"
                     style="color:#cecece;">
              <div class="center flex-1" v-for="nav of ['winner', 'game_lines_total', 'rang_f_j']" :key="nav">{{$t(nav)}}</div>
            </van-col>

            <van-col :span="colSpan(league.sport).right" class="flex-between fs12"
                     v-else-if="activeCollapses.includes(league.id) && category === 'favorite' && league.sport === '16'"
                     style="color:#cecece;">
              <div class="center flex-1" v-for="nav of ['r_l', 'game_lines_total', 'game_lines_money_line']" :key="nav">{{$t(nav)}}</div>
            </van-col>

            <van-col :span="colSpan(league.sport).right" class="flex-between fs12"
                     v-else-if="activeCollapses.includes(league.id) && category === 'favorite' && league.sport === '151'"
                     style="color:#cecece;">
              <div class="center flex-1" v-for="nav of ['1', '2']" :key="nav">{{nav}}</div>
            </van-col>

            <van-col :span="colSpan(league.sport).right" class="flex-end" v-else>
              <i class="van-icon van-icon-arrow-down" style="color:#cecece;margin-right:0.6rem;"></i>
            </van-col>
          </van-row>
        </template>

        <BetPlayItem
          v-if="category !== 'favorite'"
          :league-id="league.id"
          :handicap="handicap"
          :match="item" v-for="item of league.matches"
          :key="item.id"/>

        <BetPlayItem
          v-if="category === 'favorite'"
          :league-id="league.id"
          :handicap="sportHandicap(league.sport)"
          :match="item" v-for="item of league.matches"
          :key="item.id"/>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
  import BetPlayItem from "./BetPlayItem";
  import Event from "../event";
  import {format} from '../assets/js/util'
  import getBetList from "../mixins/getBetList";

  export default {
    mixins: [getBetList],
    data() {
      return {};
    },

    props: {
      title: {
        type: String,
        default: ''
      },

      category: '',

      leagueId: '',

      sport: {
        type: [String, Number],
        default: '1'
      },

      handicap: {
        type: Object,
        default: () => ({code: 'asian_handicap_goal', name: this.$t('a_h_goal'), sport: '1'})
        // default: () => ({code: 'basketball_game_lines', name: '比赛投注', sport: '18'})
      },

      upcomingTime: ''
    },

    computed: {
      navTabs() {
        const { code } = this.handicap

        console.log('navTabs', code);
        switch (code) {
          case 'full_time_result':
            return ['1', 'x', '2']
          case 'asian_handicap':
          case 'tennis_to_win_match':
          case 'basketball_game_lines_spread':
          case 'basketball_game_lines_money_line':
            return ['1', '2']
          case 'match_goals':
          case 'basketball_game_lines_total':
            return [this.$t('height'), this.$t('below')]
          case 'asian_handicap_goal':
            return ['1x2', this.$t('game_lines_spread'), this.$t('match_goals')]
          case 'basketball_game_lines':
            return [this.$t('game_lines_spread'), this.$t('game_lines_total'), this.$t('game_lines_money_line')]
          case 'volleyball_game_lines':
            return [this.$t('winner'), this.$t('game_lines_total'), this.$t('rang_f_j')]
          case 'baseball_game_lines':
            return [this.$t('r_l'), this.$t('game_lines_total'), this.$t('game_lines_money_line')]
          case 'to_win':
            return ['1', '2']
        }
      }
    },

    watch: {
      upcomingTime() {
        this.startLoop = false

        this._getBetList(true)
      },

      sport() {
        this._getBetList(true)
      }
    },

    methods: {
      colSpan(id) {
        let sport_id = Number(id)
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

      sportHandicap(id) {
        const sport_id = String(id)

        let obj = {
          '1': {code: 'asian_handicap_goal'},
          '18': {code: 'basketball_game_lines'},
          '13': {code: 'tennis_to_win_match'},
          '91': {code: 'volleyball_game_lines'},
          '16': {code: 'baseball_game_lines'},
          '151': {code: 'esports_match_lines'}
        }

        return obj[sport_id]
      },

      // 获取所有比赛列表
      _getBetList(loading = false) {

        let params = {
          sport: this.sport, // 1 足球 18 篮球
          category: this.category,
          page: 1,
          pageSize: 200,
          league: this.leagueId
        }

        // 如果是收藏 获取全部体育项目
        if (this.category === 'favorite') {
          params.sport = ''
        }

        if (this.upcomingTime && [3, 12, 24].includes(this.upcomingTime)) {
          params.start_time = format(new Date(), 'yyyy-MM-dd hh:mm:ss')
          params.end_time = format(new Date().getTime() + this.upcomingTime * 3600000, 'yyyy-MM-dd hh:mm:ss')
        }

        if(this.upcomingTime && this.upcomingTime === 20) {
          const now = new Date();
          params.start_time = format(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0), 'yyyy-MM-dd hh:mm:ss')
          params.end_time = format(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59), 'yyyy-MM-dd hh:mm:ss')
        }

        this._getMatches({...params}, loading)
      }
    },

    components: {
      BetPlayItem
    },

    activated() {
      this.startLoop = false

      this._getBetList(true)

      Event.$on('fetch-match-change', () => {
        if (this.startLoop === true) this.loopGetMatchChanges()
      })
    },

    deactivated() {
      this.loopTimes = 0
      this.startLoop = false
      Event.$off('fetch-match-change')
    }
  };
</script>

<style type="text/css" lang="less">
  .common-bet-list {
    .van-collapse-item__title, .van-collapse-item__content {
      padding: 0 !important;
    }

    .bet-item-title {
      background: #585858;
      height: 1.8rem;
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
