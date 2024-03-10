<template>
  <div class="matches" @click="showUserInfo = false">
    <header class="flex-middle-only re line_color listreturn3">
      <div class="ab-middle-y" style="left: 0.8rem;" @click.stop="handleClickAvatar">
        <Avatar/>
      </div>

      <span class="ab-middle white fs14 center-down" @click="sportListSheetStatus = true">{{ sport.label }}</span>

      <div class="ab-middle-y" style="right: 0.8rem;">
        <i class="icon_base icon-kefu-white"></i>
      </div>
    </header>
    <Dialog v-show="showUserInfo"/>

    <ul class="flex flex-between listreturn4" style="padding: 0 3rem">
      <li class="fs12 lh-45 re" v-for="cate of categories" :key="cate.name"
          @click="selectCategory(cate)"
          :style="{color: category.name == cate.name ? '#7B5605' : '#818796'}"
      >
        {{ cate.alias }}
        <i class="ab-middle-x active_line" v-if="cate.name == category.name"></i>
      </li>
    </ul>

    <div class="index-continaer">
      <div class="flex-middle lh-48" v-if="!filterLeagueList.length && !loading">{{$t('no_more')}}</div>
      <div class="matches-ul p-r10 p-l10" v-for="league of filterLeagueList" :key="league.id">
        <van-row class="flex-between full-width center" style="color: #4D5872">
          <van-col :span="10">
            <p class="tip fs12 left full-width" style="display: inline-block;">{{league.name}}</p>
          </van-col>

          <van-col :span="14" class="flex-between fs12" v-if="league.sport === '1'">
            <div class="center flex-1" v-for="nav of ['1x2', 'game_lines_spread', 'match_goals']" :key="nav">{{$t(nav)}}</div>
          </van-col>

          <van-col :span="14" class="flex-between fs12" v-else-if="league.sport === '18'">
            <div class="center flex-1" v-for="nav of ['game_lines_spread', 'game_lines_total', 'game_lines_money_line']" :key="nav">{{$t(nav)}}</div>
          </van-col>

          <van-col :span="14" class="flex-between fs12" v-else-if="league.sport === '13'">
            <div class="center flex-1" v-for="nav of ['1', '2']" :key="nav">{{nav}}</div>
          </van-col>

          <van-col :span="14" class="flex-between fs12" v-else-if="league.sport === '91'">
            <div class="center flex-1" v-for="nav of ['winner', 'game_lines_total', 'rang_f_j']" :key="nav">{{$t(nav)}}</div>
          </van-col>

          <van-col :span="14" class="flex-between fs12" v-else-if="league.sport === '16'">
            <div class="center flex-1" v-for="nav of ['r_l', 'game_lines_total', 'game_lines_money_line']" :key="nav">{{$t(nav)}}</div>
          </van-col>

          <van-col :span="14" class="flex-between fs12" v-else-if="league.sport === '151'">
            <div class="center flex-1" v-for="nav of ['winner', 'game_lines_spread', 'd_t_s']" :key="nav">{{$t(nav)}}</div>
          </van-col>
        </van-row>

        <van-row v-for="match of league.matches" :key="match.id" class="li flex full-width center m-t8" style="color: #7B5605;">
          <van-col :span="10" class="l1 flex-1 flex-middle" @click="_toDetail(match, league)">
            <div style="color: #4D5872" class="full-width full-height left p-l16 p-r16">
              <p style="color: #4E5772; margin-top: 0.4rem" v-if="match.status != '1'">{{$utils.format(match.start_time * 1000, 'MM-dd hh:mm')}}</p>
              <p class="fs12" style="color: #4E5772; margin-top: 0.4rem;" v-else-if="match.sport == '13'">
                {{$t('saip') + match.current_set + $t('saij') + match.current_game}}
              </p>
              <p class="fs12" style="color: #4E5772; margin-top: 0.4rem;height: 1rem;" v-else-if="match.sport == '91'"></p>
              <div class="fs12" style="color: #4E5772; margin-top: 0.4rem" v-else>
                <span>{{match.timer.period}}</span>
                <count-down :type="match.sport == 1 || (match.league_name.indexOf('CS:GO') === -1 && match.sport == 151) ? 'up' : 'down'"
                    :time="(match.timer.tm || 0) * 60 + (match.timer.ts * 1 || 0)"
                    :suspend="match.timer.tt"/>
              </div>
              <div class="flex-middle-only fs12 re" style="margin-top: 0.8rem">
                <img style="width: 0.7rem; margin-right: 0.2rem" :src="match.home_logo" alt=""/>
                <p class="van-ellipsis">{{match.home_name}}</p>
                <span class="ab-middle-y" style="right: -0.5rem" v-if="match.status == '1'">{{match.ss ? match.ss.split('-')[0] : 0}}</span>
              </div>
              <div class="flex-middle-only fs12 re" style="margin-top: 0.3rem">
                <img style="width: 0.7rem; margin-right: 0.2rem" :src="match.away_logo" alt=""/>
                <p class="van-ellipsis">{{match.away_name}}</p>
                <span class="ab-middle-y" style="right: -0.5rem" v-if="match.status == '1'">{{match.ss ? match.ss.split('-')[1] : 0}}</span>
              </div>
              <div class="flex " style="align-items: center; color: #7B5605;margin-top: 0.6rem" @click="$router.push('/betting')">
                <img style="width: 0.7rem" src="../../../assets/images/tmp3/not-collect.png" alt="">
                <span class="fs12 m-l8" style="margin-right: 0.2rem">{{match.market_group_count}}</span>
                <span class="fs12 re" style="top: -0.08rem">></span>
              </div>
            </div>
          </van-col>

          <!--足球-->
          <van-col :span="14" class="flex-between" v-if="match.sport == 1">
            <div class="flex-column flex-1 b-r">
              <!--独赢-->
              <div class="full-width b-b" style="height: 2rem;" v-for="k of ['1', '2', 'x']" :key="k">
                <play v-if="match.market_groups['full_time_result']"
                      class="flex-middle"
                      :play="match.market_groups['full_time_result'][k]"
                      :group="match.market_groups['full_time_result']"
                      :match="match"
                />
              </div>
            </div>
            <div class="flex-column flex-1 b-r" style="height: 6rem;">
              <!--比赛进球-->
              <div class="flex-column flex-1 full-width b-b" style="height: 3rem;width: 100%;" v-for="k of ['1', '2']"  :key="k">
                <play class="flex-column flex-middle"
                    :show-handicap="true"
                    :play="match.market_groups['asian_handicap'][k]"
                    :group="match.market_groups['asian_handicap']"
                    :match="match"
                />
              </div>
            </div>
            <div class="flex-column flex-1" style="height: 6rem;">
              <!--大小盘-->
              <div class="flex-column flex-1 full-width b-b" style="height: 3rem;width: 100%;" v-for="k of ['1', '2']"  :key="k">
                <play class="flex-column flex-middle"
                      :show-header="true"
                      :play="match.market_groups['match_goals'][k]"
                      :group="match.market_groups['match_goals']"
                      :match="match"
                >
                  <div slot="header" class="flex-middle" slot-scope="{ play }">
                    <span class="m-r5">{{play.header}}</span>
                    <span>{{play.handicap}}</span>
                  </div>
                </play>
              </div>
            </div>
          </van-col>

          <!--篮球-->
          <van-col :span="14" class="flex-between" v-if="match.sport == 18">
            <div class="flex-column flex-1 b-r" v-if="match.market_groups['basketball_game_lines_spread']">
              <div class="full-width b-b" style="height: 3rem;" v-for="k of ['1', '2']" :key="k">
                <play class="flex-middle flex-column"
                      :play="match.market_groups['basketball_game_lines_spread'][k]"
                      :group="match.market_groups['basketball_game_lines_spread']"
                      :match="match"
                      :show-handicap="true"
                />
              </div>
            </div>
            <div class="flex-column flex-1 b-r" style="height: 6rem;" v-if="match.market_groups['basketball_game_lines_total']">
              <div class="flex-column flex-1 full-width b-b" style="height: 3rem;" v-for="k of ['1', '2']"  :key="k">
                <play class="flex-column flex-middle"
                      :show-handicap="true"
                      :play="match.market_groups['basketball_game_lines_total'][k]"
                      :group="match.market_groups['basketball_game_lines_total']"
                      :match="match"
                >
                  <span slot="alias" class="fs10">{{k === '1' ? $t('height') : $t('below')}}</span>
                </play>
              </div>
            </div>
            <div class="flex-column flex-1 b-r" style="height: 6rem;" v-if="match.market_groups['basketball_game_lines_money_line']">
              <!--大小盘-->
              <div class="flex-column flex-1 full-width b-b" style="height: 3rem;" v-for="k of ['1', '2']"  :key="k">
                <play class="flex-column flex-middle"
                      :show-handicap="true"
                      :play="match.market_groups['basketball_game_lines_money_line'][k]"
                      :group="match.market_groups['basketball_game_lines_money_line']"
                      :match="match"
                />
              </div>
            </div>
          </van-col>

          <!--网球-->
          <van-col :span="14" class="flex-between" v-if="match.sport == 13">
            <div class="flex-between flex-1 full-height" v-if="match.market_groups['tennis_to_win_match']">
              <div class="full-width full-height b-r" v-for="k of ['1', '2']" :key="k">
                <play class="flex-column flex-middle"
                      :play="match.market_groups['tennis_to_win_match'][k]"
                      :group="match.market_groups['tennis_to_win_match']"
                      :match="match"
                />
              </div>
            </div>
<!--            <div class="flex-column flex-1 b-r" style="height: 6rem;" v-if="match.market_groups['tennis_set_betting']">-->
<!--              <div class="flex-column flex-1 full-width b-b" style="height: 3rem;" v-for="k of ['1', '2']"  :key="k">-->
<!--                <play class="flex-column flex-middle"-->
<!--                      :show-handicap="true"-->
<!--                      :play="match.market_groups['tennis_set_betting'][k]"-->
<!--                      :group="match.market_groups['tennis_set_betting']"-->
<!--                      :match="match"-->
<!--                />-->
<!--              </div>-->
<!--            </div>-->
            <div class="flex-column flex-1 b-r" style="height: 6rem;" v-if="match.market_groups['basketball_game_lines_money_line']">
              <!--大小盘-->
              <div class="flex-column flex-1 full-width b-b" style="height: 3rem;" v-for="k of ['1', '2']"  :key="k">
                <play class="flex-column flex-middle"
                      :show-handicap="true"
                      :play="match.market_groups['basketball_game_lines_money_line'][k]"
                      :group="match.market_groups['basketball_game_lines_money_line']"
                      :match="match"
                />
              </div>
            </div>
          </van-col>

          <!--排球-->
          <van-col :span="14" class="flex-between" v-if="match.sport == 91">
            <div class="flex-column flex-1 b-r" v-if="match.market_groups['to_win']">
              <div class="full-width b-b" style="height: 3rem;" v-for="k of ['1', '2']" :key="k">
                <play class="flex-column flex-middle"
                      :play="match.market_groups['to_win'][k]"
                      :group="match.market_groups['to_win']"
                      :match="match"
                />
              </div>
            </div>
            <div class="flex-column flex-1 b-r" style="height: 6rem;" v-if="match.market_groups['total_points']">
              <div class="flex-column flex-1 full-width b-b" style="height: 3rem;" v-for="k of ['1', '2']"  :key="k">
                <play class="flex-column flex-middle"
                      :show-handicap="true"
                      :play="match.market_groups['total_points'][k]"
                      :group="match.market_groups['total_points']"
                      :match="match"
                >
                  <span slot="alias" class="fs10">{{k === '1' ? $t('height') : $t('below')}}</span>
                </play>
              </div>
            </div>
            <div class="flex-column flex-1 b-r" style="height: 6rem;" v-if="match.market_groups['handicap_sets']">
              <!--大小盘-->
              <div class="flex-column flex-1 full-width b-b" style="height: 3rem;" v-for="k of ['1', '2']"  :key="k">
                <play class="flex-column flex-middle"
                      :show-handicap="true"
                      :play="match.market_groups['handicap_sets'][k]"
                      :group="match.market_groups['handicap_sets']"
                      :match="match"
                />
              </div>
            </div>
          </van-col>

          <!--棒球-->
          <van-col :span="14" class="flex-between" v-if="match.sport == 16">
            <div class="flex-column flex-1 b-r" v-if="match.market_groups['run_line']">
              <div class="full-width b-b" style="height: 3rem;" v-for="k of ['1', '2']" :key="k">
                <play class="flex-column flex-middle"
                      :show-handicap="true"
                      :play="match.market_groups['run_line'][k]"
                      :group="match.market_groups['run_line']"
                      :match="match"
                />
              </div>
            </div>
            <div class="flex-column flex-1 b-r" style="height: 6rem;" v-if="match.market_groups['total_points']">
              <div class="flex-column flex-1 full-width b-b" style="height: 3rem;" v-for="k of ['1', '2']"  :key="k">
                <play class="flex-column flex-middle"
                      :show-handicap="true"
                      :play="match.market_groups['total_points'][k]"
                      :group="match.market_groups['total_points']"
                      :match="match"
                >
                  <span slot="alias" class="fs10">{{k === '1' ? $t('height') : $t('below')}}</span>
                </play>
              </div>
            </div>
            <div class="flex-column flex-1 b-r" style="height: 6rem;" v-if="match.market_groups['money_line']">
              <!--大小盘-->
              <div class="flex-column flex-1 full-width b-b" style="height: 3rem;" v-for="k of ['1', '2']"  :key="k">
                <play class="flex-column flex-middle"
                      :show-handicap="true"
                      :play="match.market_groups['money_line'][k]"
                      :group="match.market_groups['money_line']"
                      :match="match"
                />
              </div>
            </div>
          </van-col>

          <!--电子竞技-->
          <van-col :span="14" class="flex-between" v-if="match.sport == 151">
            <div class="flex-column flex-1 b-r" v-if="match.market_groups['to_win']">
              <div class="full-width b-b" style="height: 3rem;" v-for="k of ['1', '2']" :key="k">
                <play class="flex-column flex-middle"
                      :play="match.market_groups['to_win'][k]"
                      :group="match.market_groups['to_win']"
                      :match="match"
                />
              </div>
            </div>
            <div class="flex-column flex-1 b-r" style="height: 6rem;" v-if="match.market_groups['match_handicap']">
              <div class="flex-column flex-1 full-width b-b" style="height: 3rem;" v-for="k of ['1', '2']"  :key="k">
                <play class="flex-column flex-middle"
                      :show-handicap="true"
                      :play="match.market_groups['match_handicap'][k]"
                      :group="match.market_groups['match_handicap']"
                      :match="match"
                ></play>
              </div>
            </div>
            <div class="flex-column flex-1 b-r" style="height: 6rem;" v-if="match.market_groups['total_maps']">
              <!--大小盘-->
              <div class="flex-column flex-1 full-width b-b" style="height: 3rem;" v-for="k of ['1', '2']"  :key="k">
                <play class="flex-column flex-middle"
                      :show-handicap="true"
                      :play="match.market_groups['total_maps'][k]"
                      :group="match.market_groups['total_maps']"
                      :match="match"
                >
                  <span slot="alias" class="fs10">{{k === '1' ? $t('height') : $t('below')}}</span>
                </play>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="matches-filter-float" @click="showLeagueFilter = true" v-if="list.length">
      <img style="width: 2.9rem" src="../../../assets/images/tmp3/filter.png" alt="">
    </div>

    <van-action-sheet v-model="sportListSheetStatus" :title="$t('s_ty')">
      <div class="sheet-content">
        <ul>
          <li @click="onSelectSport(item)" v-for="(item, index) in sportSheetList" :key="item.value"
              class="flex-middle sheetli fs14">
            <img style="width: 1.4rem" :src="require('../../../assets/images/tmp3/sport'+(index + 1)+'.png')" alt="">
            {{ item.label }}
          </li>
        </ul>
      </div>
    </van-action-sheet>

    <van-popup v-model:show="showLeagueFilter"
               position="right"
               :style="{ height: '100vh', width: '100vw' }"
               duration=".2"
    >
      <MatchesFilter @close="closeFilterPop" :leagues="list" @confirm="handleConfirmLeague"/>
    </van-popup>

    <FootBetController class="fixed-bottom-2"/>
  </div>
</template>
<script>
import {mapState, mapMutations} from "vuex";
import {setWindowScrollContentHeight} from '../../../assets/js/util';
import getBetList from "../../../mixins/getBetList";
import Event from "../../../event";
import Play from "../../../components/Play";
import MatchesFilter from "../../../components/temp3/MatchesFilter";
import FootBetController from "../../../components/FootBetControll";
import CountDown from '../../../common/CountDown'

export default {
  mixins: [ getBetList ],
  data() {
    return {
      categories: [
        {name: 'today', alias: this.$t('j_r')},
        {name: 'upcoming', alias: this.$t('z_p')},
        {name: 'inplay', alias: this.$t('groun')},
        {name: 'favorite', alias: this.$t('s_c')},
      ],
      sportSheetList: [
        {label: this.$t('fball'), value: '1'},
        {label: this.$t('bball'), value: '18'},
        {label: this.$t('tennis'), value: '13'},
        {label: this.$t('vball'), value: '91'},
        {label: this.$t('b_ball'), value: '16'},
        {label: this.$t('esports'), value: '151'},
      ],
      sportListSheetStatus: false,
      category: {name: 'today', alias: this.$t('j_r')},
      sport: {label: this.$t('fball'), value: '1'},
      showLeagueFilter: false,
      league_id: '',
      showUserInfo: false,
      loading: false,
    }
  },

  computed: {
    ...mapState(['userInfo', 'userInfoStatus']),
    filterLeagueList() {
      if(!this.league_id) return this.list;
      return this.list.filter(item => item.id === this.league_id)
    },
  },

  watch: {
    loading(flag) {
      Event.$emit('loading', {loading: flag})
    }
  },

  methods: {
    ...mapMutations({
      updateBet: 'UPDATE_BET',
      updateUserInfoStatus: 'UPDATE_USERINFO_STATUS'
    }),

    handleClickAvatar() {
      if(this.userInfo.userId) {
        this.showUserInfo = true
      } else {
        this.$toast(this.$t('login_f'))
      }
    },

    _toDetail(match = {}, league = {}) {
      console.log('match', match)
      this.$router.push({
        path: `/bet-detail`,
        query: {
          match_id: match.id,
          league_id: league.id,
          match_status: match.status,
          sport: match.sport,
          league_name: league.name
        }
      })
    },

    closeFilterPop() {
      console.log('关闭被触发了');
      this.showLeagueFilter = false
    },

    handleConfirmLeague(league_id) {
      this.closeFilterPop();

      console.log('handleConfirmLeague===', league_id)
      this.league_id = league_id;
    },

    setWindowHeight() {
      setTimeout(() => {
        setWindowScrollContentHeight([
          document.querySelector('.listreturn3'),
          document.querySelector('.listreturn4'),
          document.querySelector('.van-hairline--top-bottom')
        ]);
      }, 30)
    },

    onSelectSport(sport = {}) {
      this.sportListSheetStatus = false;
      this.sport = sport;
      this.league_id = ''
      this.replaceLocation()
      this.loading = true;
      this.getMatchList()
    },

    // 无刷新更换url链接
    replaceLocation() {
      const href = window.location.href;
      const url = href.split('?')[0];
      window.location.replace(`${url}?category=${this.category.name}&sport_id=${this.sport.value}`)
    },

    // 选择 早盘 滚球 收藏
    selectCategory(cate = {}) {
      console.log('cate', cate);
      const { name } = cate;
      this.category = cate;
      this.league_id = ''
      this.replaceLocation();
      this.loading = true;
      this.getMatchList()
    },

    getMatchList() {
      const params = {
        sport: this.sport.value, // 1 足球 18 篮球
        category: this.category.name,
        page: 1,
        pageSize: 500,
        league: this.league_id
      }

      console.log('this.league_id===', this.league_id)

      const name = this.category.name;
      switch (name) {
        case 'today':
          // this._getUpcomingList(params)
          // break;
        case 'upcoming':
        case 'inplay':
        case 'favorite':
          this._getMatches(params)
          break;
      }
    },

    getLeague() {
      this.allLeagueList = []
    }
  },

  components: {
    Dialog: () => import('../../../components/temp3/Dialog'),
    Avatar: () => import('../../../components/temp3/Avatar'),
    Play,
    MatchesFilter,
    FootBetController,
    CountDown
  },

  mounted() {
    this.setWindowHeight();
  },

  beforeRouteEnter(to, from, next) {
    next(_this => {
      let {category, sport_id} = to.query

      if (category) _this.category = _this.categories.find(cate => cate.name === category) || {name: 'today', category: 'today', alias: _this.$t('j_r')};
      if (sport_id) _this.sport = _this.sportSheetList.find(item => item.value == sport_id) || {label: _this.$t('fball'), value: '1'};
      _this.loading = true
      _this.getMatchList()

      Event.$on('fetch-match-change', () => {
        if (_this.startLoop === true) {
          _this.loopGetMatchChanges()
        }
      })
    })
  },
}
</script>
<style type="text/css" lang="less">
@import url('../../../assets/css/index');

.index-continaer {
  .scroll-y();
  .hide-scroll-bar();
  padding-bottom: 2.5rem;
}

.downupBefore {
  display: block;
  content: '';
  border-width: .22rem .22rem .22rem .22rem;
  border-style: solid;
  position: absolute;
  right: 0;
  top: .2rem;
}

.center-up {
  padding-right: .7rem;

  &::before {
    border-color: transparent transparent #fff transparent;
    .downupBefore();
  }
}

.center-down {
  padding-right: .7rem;

  &::before {
    border-color: #fff transparent transparent transparent;
    .downupBefore();
    top: .4rem;
  }
}

.matches {
  header {
    height: 2.4rem;
  }
}

.matches-ul:first-child {
  padding-top: 0.4rem;
}

.matches-ul {
  margin-bottom: 0.9rem;

  .li {
    height: 6rem;
    background: url("../../../assets/images/tmp3/matches-bg.png") no-repeat;
    background-size: 100% auto;
  }

  .active {
    color: #FFF320;
    background-image: linear-gradient(180deg, #59627A 0%, #97A2BB 100%);
    box-shadow: inset 0 0 .4rem 0 rgba(85, 98, 129, 1);

    .white-two {
      color: white !important;
    }
  }
}

.table_content {
  flex-direction: column;

  > p:nth-child(1) {
    color: #4D5872;
    padding-bottom: .2rem;
  }
}


.matches-filter-float {
  position: fixed;
  right: 0;
  bottom: 4.05rem;
}

.sheet-content {
  padding: 0 .6rem .6rem .6rem;
}

.b-b {
  border-bottom: 1px solid #dde6ee;
  &:last-child {
    border-bottom: none!important;
  }
}

.b-r {
  border-right: 1px solid #dde6ee;
  &:last-child {
    border-right: none!important;
  }
}

.sheetli {
  height: 3.4rem;
  background: url("../../../assets/images/tmp3/sport-sheet-bg.png") no-repeat;
  background-size: 100% 100%;
  color: #7B5605;
  font-weight: bold;

  img {
    margin-right: .6rem;
  }
}
</style>
