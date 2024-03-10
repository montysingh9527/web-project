<template>
  <div class="home-pc-tmp2">
    <div class="flex">
      <div class="home-left scroll-y hide-scroll-bar" style="width:66%;background: #494949;">
        <div class="flex-column flex-between home-left-header">
          <h3 class="flex-between full-width cursor" style="padding: 12px 16px 0 36px;"
              @click="$router.push('/index/bet-grounder?category=inplay')">
            <span class="fs16" style="color:#5FE8BD;">{{$t('ground')}}</span>
            <span class="fs12" style="color:#cecece;">{{sportCount + $t('events')}} <i
              class="van-icon van-icon-arrow"></i></span>
          </h3>

          <van-row class="full-width" v-if="'fball' in displaySportNames">
            <van-col :span="11" style="padding-left:36px;">{{$t('fball')}}</van-col>
            <van-col :span="13" class="flex-between">
              <div class="flex-1 center">1</div>
              <div class="flex-1 center">x</div>
              <div class="flex-1 center">2</div>
            </van-col>
          </van-row>
        </div>

        <van-row class="full-width bet-item flex-middle-only" v-for="item of footballMatches" v-if="'fball' in displaySportNames"
                 :key="item.match.id">
          <van-col :span="11" class="flex-middle-only">
            <Favorite style="padding: 0 12px 0 20px;" :is-favorite="item.match.is_favorite" :match-id="item.match.id"/>
            <div class="match-info cursor flex-1" @click.stop="toDetail(item.match)">
              <div class="flex-between lh-20">
                <p class="cles-1" style="max-width: 85%;">{{item.match.home_name}}</p>
                <span :id="`match-home-score-0-${item.match.id}`">{{item.match.ss ? item.match.ss.split('-')[0] : ''}}</span>
              </div>
              <div class="flex-between lh-20">
                <p class="cles-1" style="max-width: 85%;">{{item.match.away_name}}</p>
                <span :id="`match-away-score-0-${item.match.id}`">{{item.match.ss ? item.match.ss.split('-')[1] : ''}}</span>
              </div>
              <p class="fs12 lh-20" style="color:#ddd;" v-if="String(item.match.status) !== '1' && !item.match.ss">{{$t('pingj')}}</p>
              <div class="flex-middle-only" style="margin-top:8px;">
                <div style="width: 46px;" class="flex-middle-only">
                  <count-down class="fs12"
                              :time="(item.match.timer.tm || 0) * 60 + (item.match.timer.ts * 1 || 0)"
                              :suspend="item.match.timer.tt"/>
                </div>

                <span class="fs12">{{item.match.market_group_count}}</span>

                <i class="van-icon van-icon-arrow fs12" style="color:#ddd;margin-top: 2px;"></i>
              </div>
            </div>
          </van-col>
          <van-col :span="13" class="flex-between full-height">
            <play v-for="k of ['1', 'x', '2']" :key="k"
                  class="flex-middle"
                  :play="item.match.market_groups['full_time_result'][k]"
                  :group="item.match.market_groups['full_time_result']"
                  :match="item.match"
            />
          </van-col>
        </van-row>

        <van-row class="full-width basketball-title flex-middle-only" v-if="'bball' in displaySportNames">
          <van-col :span="11" style="padding-left: 36px;">{{$t('bball')}}</van-col>
          <van-col :span="13" class="flex-between">
            <div class="flex-1 center">1</div>
            <div class="flex-1 center">2</div>
          </van-col>
        </van-row>

        <van-row class="full-width bet-item flex-middle-only" v-for="item of basketballMatches" v-if="'bball' in displaySportNames"
                 :key="item.match.id">
          <van-col :span="11" class="flex-middle-only">
            <Favorite style="padding: 0 12px 0 20px;" :is-favorite="item.match.is_favorite" :match-id="item.match.id"/>

            <div class="match-info cursor flex-1" @click.stop="toDetail(item.match)">
              <div class="flex-between lh-20">
                <p class="cles-1" style="max-width: 85%;">{{item.match.home_name}}</p>
                <span
                  :id="`match-home-score-0-${item.match.id}`">{{item.match.ss ? item.match.ss.split('-')[0] : ''}}</span>
              </div>
              <div class="flex-between lh-20">
                <p class="cles-1" style="max-width: 85%;">{{item.match.away_name}}</p>
                <span
                  :id="`match-away-score-0-${item.match.id}`">{{item.match.ss ? item.match.ss.split('-')[1] : ''}}</span>
              </div>
              <p class="fs12 lh-20" style="color:#ddd;"
                 v-if="String(item.match.status) !== '1' && !item.match.ss">{{$t('pingj')}}</p>
              <div class="flex-middle-only fs12" style="margin-top:8px;">
                <span class="m-r8" v-if="item.match.timer">{{item.match.timer.period}}</span>
                <div style="width: 46px;" class="flex-middle-only">
                  <count-down type="down"
                              :time="(item.match.timer.tm || 0) * 60 + (item.match.timer.ts * 1 || 0)"
                              :suspend="item.match.timer.tt"/>
                </div>


                <span>{{item.match.market_group_count}}</span>

                <i class="van-icon van-icon-arrow" style="color:#ddd;margin-top: 2px;"></i>
              </div>
            </div>
          </van-col>
          <van-col :span="13" class="flex-between full-height">
            <play v-for="k of ['1', '2']" :key="k"
                  class="flex-column flex-middle"
                  :show-handicap="true"
                  :play="item.match.market_groups['basketball_game_lines_spread'][k]"
                  :group="item.match.market_groups['basketball_game_lines_spread']"
                  :match="item.match"
            />
          </van-col>
        </van-row>


        <van-row class="full-width tennis-title flex-middle-only" v-if="'tennis' in displaySportNames">
          <van-col :span="11" style="padding-left: 36px;">{{$t('tennis')}}</van-col>
          <van-col :span="13" class="flex-between">
            <div class="flex-1 center">1</div>
            <div class="flex-1 center">2</div>
          </van-col>
        </van-row>

        <van-row class="full-width bet-item flex-middle-only" v-for="item of tennisMatches" :key="item.match.id" v-if="'tennis' in displaySportNames">
          <van-col :span="11" class="flex-middle-only">
            <Favorite style="padding: 0 12px 0 20px;" :is-favorite="item.match.is_favorite" :match-id="item.match.id"/>

            <div class="match-info cursor flex-1" @click.stop="toDetail(item.match)">
              <div class="flex-between lh-20">
                <div class="flex-middle-only cles-1" style="max-width: 85%;">
                  <i class="circle m-r5"
                     :class="item.match.playing_indicator === '1' && 'active'"
                     :id="`match-home-indicator-${item.match.id}`"
                  ></i>
                  <span>{{item.match.home_name}}</span>
                </div>

                <!--                                <div style="max-width: 50%;" class="flex-end" v-if="Number(item.match.sport) === 1 || Number(item.match.sport) === 18">-->
                <!--                                    <p style="width: 1rem" class="yellow flex-middle" :id="`match-home-score-0-${item.match.id}`">{{item.match.ss.split('-')[0]}}</p>-->
                <!--                                </div>-->

                <div style="max-width: 50%;" class="flex-end">
                  <p style="width: 20px" class="yellow flex-middle" :id="`match-home-score-0-${item.match.id}`">
                    {{item.match.ss.split('-')[0]}}</p>
                  <p style="width: 20px" class="flex-middle" v-for="(s, i) in scoresObj(item.match.scores)" :key="i">
                    {{s.home}}
                  </p>
                  <p v-if="item.match.points" style="width: 1rem" class="flex-middle">
                    {{item.match.points.split('-')[0]}}</p>
                </div>
                <!--                                <div style="max-width: 40%" class="flex-middle-only">-->
                <!--                                    <p style="width: 20px;" class="center"-->
                <!--                                       :id="`match-home-score-${i}-${item.match.id}`"-->
                <!--                                       v-for="(s, i) in score(item.match.ss).home_score" :key="i">{{s}}</p>-->
                <!--                                </div>-->
              </div>
              <div class="flex-between lh-20">
                <div class="cles-1 flex-middle-only" style="max-width: 85%;">
                  <i class="circle m-r5"
                     :class="item.match.playing_indicator === '2' && 'active'"
                     :id="`match-away-indicator-${item.match.id}`"
                  ></i>
                  <span>{{item.match.away_name}}</span>
                </div>

                <!--                                <div style="max-width: 50%;" class="flex-end" v-if="Number(item.match.sport) === 1 || Number(item.match.sport) === 18">-->
                <!--                                    <p style="width: 1rem" class="yellow flex-middle" :id="`match-away-score-0-${item.match.id}`">{{item.match.ss.split('-')[1]}}</p>-->
                <!--                                </div>-->

                <div style="max-width: 50%;" class="flex-end">
                  <p style="width: 20px" class="yellow flex-middle" :id="`match-away-score-0-${item.match.id}`">
                    {{item.match.ss.split('-')[1]}}</p>
                  <p style="width: 20px" class="flex-middle" v-for="(s, i) in scoresObj(item.match.scores)" :key="i">
                    {{s.away}}
                  </p>
                  <p v-if="item.match.points" style="width: 1rem" class="flex-middle">
                    {{item.match.points.split('-')[1]}}</p>
                </div>
                <!--                                <div style="max-width: 40%" class="flex-middle-only">-->
                <!--                                    <p style="width: 20px;" class="center"-->
                <!--                                       :id="`match-away-score-${i}-${item.match.id}`"-->
                <!--                                       v-for="(s, i) in score(item.match.ss).away_score" :key="i">{{s}}</p>-->
                <!--                                </div>-->
              </div>

              <div class="flex-middle-only" style="margin-top:8px;">
                <p class="m-r8 fs12">
                  {{$t('saip')}} <span :id="`match-current-set-${item.match.id}`">{{item.match.current_set}}</span>
                  {{$t('saij')}} <span :id="`match-current-game-${item.match.id}`">{{item.match.current_game}}</span>
                </p>
                <span class="fs12">{{item.match.market_group_count}}</span>

                <i class="van-icon van-icon-arrow fs12" style="color:#ddd;margin-top: 2px;"></i>
              </div>
            </div>
          </van-col>
          <van-col :span="13" class="flex-between full-height">
            <play v-for="k of ['1', '2']" :key="k"
                  class="flex-middle"
                  :play="item.match.market_groups['tennis_to_win_match'][k]"
                  :group="item.match.market_groups['tennis_to_win_match']"
                  :match="item.match"
            />
          </van-col>
        </van-row>


        <van-row class="full-width volleyball-title flex-middle-only" v-if="'vball' in displaySportNames">
          <van-col :span="11" style="padding-left: 36px;">{{$t('vball')}}</van-col>
          <van-col :span="13" class="flex-between">
            <div class="flex-1 center">1</div>
            <div class="flex-1 center">2</div>
          </van-col>
        </van-row>
        <van-row class="full-width bet-item flex-middle-only" v-for="item of volleyballMatches" :key="item.match.id" v-if="'vball' in displaySportNames">
          <van-col :span="11" class="flex-middle-only">
            <Favorite style="padding: 0 12px 0 20px;" :is-favorite="item.match.is_favorite" :match-id="item.match.id"/>

            <div class="match-info cursor flex-1" @click.stop="toDetail(item.match)">
              <div class="flex-between lh-20">
                <p class="cles-1" style="max-width: 85%;">{{item.match.home_name}}</p>

                <!--                                <div style="max-width: 40%" class="flex-middle-only">-->
                <!--                                    <p style="width: 20px;" class="center"-->
                <!--                                       :id="`match-home-score-${i}-${item.match.id}`"-->
                <!--                                       v-for="(s, i) in score(item.match.ss).home_score" :key="i">{{s}}</p>-->
                <!--                                </div>-->
                <div style="max-width: 50%;" class="flex-end">
                  <p style="width: 20px" class="yellow flex-middle" :id="`match-away-score-0-${item.match.id}`">
                    {{item.match.ss.split('-')[0]}}</p>
                  <p style="width: 20px" class="flex-middle" v-for="(s, i) in scoresObj(item.match.scores)" :key="i">
                    {{s.home}}
                  </p>
                  <p v-if="item.match.points" style="width: 1rem" class="flex-middle">
                    {{item.match.points.split('-')[0]}}</p>
                </div>
              </div>
              <div class="flex-between lh-20">
                <p class="cles-1" style="max-width: 85%;">{{item.match.away_name}}</p>

                <div style="max-width: 50%;" class="flex-end">
                  <p style="width: 20px" class="yellow flex-middle" :id="`match-away-score-0-${item.match.id}`">
                    {{item.match.ss.split('-')[1]}}</p>
                  <p style="width: 20px" class="flex-middle" v-for="(s, i) in scoresObj(item.match.scores)" :key="i">
                    {{s.away}}
                  </p>
                  <p v-if="item.match.points" style="width: 1rem" class="flex-middle">
                    {{item.match.points.split('-')[1]}}</p>
                </div>
              </div>

              <div class="flex-middle-only" style="margin-top:8px;">
                <span class="fs12">{{item.match.market_group_count}}</span>

                <i class="van-icon van-icon-arrow fs12" style="color:#ddd;margin-top: 2px;"></i>
              </div>
            </div>
          </van-col>
          <van-col :span="13" class="flex-between full-height">
            <play v-for="k of ['1', '2']" :key="k"
                  class="flex-middle"
                  :play="item.match.market_groups['to_win'][k]"
                  :group="item.match.market_groups['to_win']"
                  :match="item.match"
            />
          </van-col>
        </van-row>

        <van-row class="full-width gaming-title flex-middle-only" v-if="'esports' in displaySportNames">
          <van-col :span="11" style="padding-left: 36px;">{{$t('esports')}}</van-col>
          <van-col :span="13" class="flex-between">
            <div class="flex-1 center">1</div>
            <div class="flex-1 center">2</div>
          </van-col>
        </van-row>
        <van-row class="full-width bet-item flex-middle-only" v-for="item of esportsMatches" :key="item.match.id" v-if="'esports' in displaySportNames">
          <van-col :span="11" class="flex-middle-only">
            <Favorite style="padding: 0 12px 0 20px;" :is-favorite="item.match.is_favorite" :match-id="item.match.id"/>

            <div class="match-info cursor flex-1" @click.stop="toDetail(item.match)">
              <div class="flex-between lh-20">
                <p class="cles-1" style="max-width: 85%;">{{item.match.home_name}}</p>
                <div style="max-width: 50%;" class="flex-end">
                  <p style="width: 20px" class="yellow flex-middle" :id="`match-away-score-0-${item.match.id}`">
                    {{item.match.ss.split('-')[0]}}</p>
                </div>
              </div>
              <div class="flex-between lh-20">
                <p class="cles-1" style="max-width: 85%;">{{item.match.away_name}}</p>

                <div style="max-width: 50%;" class="flex-end">
                  <p style="width: 20px" class="yellow flex-middle" :id="`match-away-score-0-${item.match.id}`">
                    {{item.match.ss.split('-')[1]}}</p>
                </div>
              </div>

              <div class="flex-middle-only" style="margin-top:8px;">
                <span class="fs12">{{item.match.market_group_count}}</span>

                <i class="van-icon van-icon-arrow fs12" style="color:#ddd;margin-top: 2px;"></i>
              </div>
            </div>
          </van-col>
          <van-col :span="13" class="flex-between full-height">
            <play v-for="k of ['1', '2']" :key="k"
                  class="flex-middle"
                  :play="item.match.market_groups['to_win'][k]"
                  :group="item.match.market_groups['to_win']"
                  :match="item.match"
            />
          </van-col>
        </van-row>
      </div>

      <div class="home-right" style="width:34%">
        <h3 class="fs16" style="color: #5FE8BD;margin:0 0 16px 16px;">{{$t('j_x_sh')}}</h3>

        <van-row class="bet-item" style="height: 84px;" v-for="match of hotMatches" :key="match.match_id">
          <van-col :span="10" class="match-info cursor" @click.stop="toDetail({...match, status: 0})">
            <div class="flex-middle-only">
              <load-image class="block" style="width:16px;"
                          :src="match.home_logo"
                          :loading="require('../../../assets/images/tmp1/team_logo2.svg')"
                          :error="require('../../../assets/images/tmp1/team_logo2.svg')"
              />
              <span class="m-l10">{{match.home_name}}</span>
            </div>
            <div class="flex-middle-only">
              <load-image class="block" style="width:16px;"
                          :src="match.away_logo"
                          :loading="require('../../../assets/images/tmp1/team_logo2.svg')"
                          :error="require('../../../assets/images/tmp1/team_logo2.svg')"
              />
              <span class="m-l10">{{match.away_name}}</span>
            </div>

            <p class="lh-30 flex-middle-only">
              <span>{{format(match.start_time * 1000, 'MM-dd hh:mm')}}</span>
            </p>
          </van-col>
          <van-col :span="14" class="flex-between full-height">
            <play v-for="value of [$t('h_team'), $t('a_team')]" :key="value"
                  class="flex-middle hot-home-market"
                  :show-handicap="true"
                  :play="findPlay(value, 'header', match.markets)"
                  :group="findGroup(findPlay(value, 'header', match.markets), match.market_groups)"
                  :match="match"
            ></play>
          </van-col>
        </van-row>
      </div>
    </div>

    <Footer/>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import Footer from "../../../components/Footer"
  import LoadImage from "../../../common/LoadImage";
  import CountDown from "../../../common/CountDown";
  import Play from "../../../components/Play";
  import Favorite from "../../../components/Favorite";
  import LeftPcNav from "../../../components/LeftPcNav";
  import BetPlayItem from "../../../components/BetPlayItem";
  import home from "../../../mixins/home";
  import customiseMixin from "../../../mixins/customiseMixin";
  import {getHotMatches} from "../../../axios/sport";

  export default {
    mixins: [home, customiseMixin],
    data() {
      return {
        hotMatches: [],
        scrollHeight: 0
      };
    },

    computed: {
      ...mapGetters(['userInfo'])
    },

    methods: {
      // 比分序列化
      scoresObj(scores = {}) {
        let list = Object.values(scores)
        return [list.pop()]
      },

      toDetail(match) {
        console.log('match', match)
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

      // 热门滚球
      _getHotMatches() {
        let params = {
          sport: 1
        }
        getHotMatches(params)
          .then(res => {
            if (res.code === 200) {
              let list = res.data
              list = list.map(item => {
                item.sport = params.sport

                return item
              })

              this.hotMatches = list.sort((a, b) => Number(a.start_time) - Number(b.start_time))
            }
          })
          .catch(err => {
            console.log('热门滚球信息err', err)
          })
      },

      // 根据标识找出对应玩法
      findPlay(value, key, markets) {
        return markets.find(market => market[key] === value) || {}
      },

      findGroup(play, groups = []) {
        return groups.find(group => group.market_group_id === play.market_group_id) || {}
      },
    },

    components: {
      LoadImage,
      CountDown,
      Footer,
      Play,
      Favorite,
      LeftPcNav,
      BetPlayItem
    },

    mounted() {
      this.scrollHeight = window.innerHeight - 276

      window.addEventListener('resize', () => {
        this.scrollHeight = window.innerHeight - 276
      })

      this._getHotMatches()
    }
  };
</script>
<style type="text/css" lang="less">
  .home-pc-tmp2 {
    color: #ddd;

    .home-left-header {
      border-bottom: 2px solid #127B5A;
      height: 88px;
      padding-bottom: 16px;
    }

    .home-left {
      .bet-item {
        height: 90px;
        padding: 12px 0;
        border-bottom: 1px solid #585858;
      }

      .match-info {
        padding: 0 16px;
        border-left: 1px solid #5d5d5d;
        border-right: 1px solid #5d5d5d;
      }
    }

    .basketball-title {
      border-bottom: 2px solid #9E6900;
      height: 46px;
    }

    .tennis-title {
      border-bottom: 2px solid #4D6B2E;
      height: 46px;
    }

    .volleyball-title {
      border-bottom: 2px solid #80684C;
      height: 46px;
    }

    .gaming-title {
      border-bottom: 2px solid #624C6E;
      height: 46px;
    }

    .hot-home-market .bet-handicap {
      margin-right: 10px;
    }

    .home-right {
      background-color: #585858;
      padding: 16px 20px 0 0;

      .bet-item {
        border-bottom: 1px solid #666;
        padding: 12px 0 12px 16px;
        font-size: 12px;
        height: 84px;
      }

      .match-info {
        color: #ddd;
        border-right: 1px solid #666;
      }
    }
  }
</style>
