<template>
  <div class="sport">
    <van-swipe :autoplay="3000" indicator-color="white" v-if="projectConfig.slideList && Array.isArray(projectConfig.slideList)">
      <van-swipe-item v-for="banner of projectConfig.slideList" :key="banner.id">
        <img style="width: 100%;max-height: 7rem;" :src="banner.pic" alt="">
      </van-swipe-item>
    </van-swipe>
    <div class="flex-middle-only marquee-content" @click="$router.push('/notice')">
      <div style="height:1.4rem;padding: 0 0.4rem;" class="flex-middle">
        <i class="icon_base icon_notice_2"></i>
      </div>

      <marquee class="fs13" style="color:#4D5872;" v-html="scrollNotices"></marquee>
    </div>

    <ul class="flex p-l20 p-r20 flex-between">
      <li class="fs12 lh-45 re" v-for="sport of sports" :key="sport.id"
          @click="selectSport(sport)"
          :style="{color: active_sport.id == sport.id ? '#7B5605' : '#818796'}"
      >
        {{$t(sport.text)}}
        <i class="ab-middle-x active_line" v-if="active_sport.id == sport.id"></i>
      </li>
    </ul>
    
    <h3 class="flex-start fs14 p-l20 m-t14" style="color: #4D5872;">
      <img class="m-r8" style="height: 1rem;" src="../../assets/images/tmp3/live.png" alt="">
      {{$t('ground')}}
    </h3>

    <div class="m-t14">
      <ul class="flex-start scroll-x hide-scroll-bar" style="max-width: 100vw;">
        <li class="ground-item m-l16 re" v-for="item of matches" :key="item.match.id" @click="_toMatchDetail(item)">
          <div class="flex-between p-r20 p-l20 fs12 full-height">
            <div class="colum-left flex full-height">
              <p class="tip">{{item.league.name}}</p>
              <div class="flex-middle-only">
                <load-image class="m-r8" style="width:1rem;height:1rem;"
                    :src="item.match.home_logo"
                    :loading="require('../../assets/images/tmp1/team_logo1.svg')"
                    :error="require('../../assets/images/tmp1/team_logo1.svg')"
                />
                <span style="font-size: 10px;">{{item.match.home_name}}</span>
              </div>
              <div class="vs">vs</div>
              <div class="flex-middle-only">
                <load-image class="m-r8" style="width:1.2rem;height:1.2rem;"
                            :src="item.match.away_logo"
                            :loading="require('../../assets/images/tmp1/team_logo2.svg')"
                            :error="require('../../assets/images/tmp1/team_logo2.svg')"
                />
                <span style="font-size: 10px;">{{item.match.away_name}}</span>
              </div>
            </div>
            <div class="right colum-right">
              <p>{{item.match.timer.period}}
                <count-down
                  :type="item.sport == 1 || (item.league.name.indexOf('CS:GO') === -1 && item.sport == 151) ? 'up' : 'down'"
                  :time="(item.match.timer.tm || 0) * 60 + (item.match.timer.ts * 1 || 0)"
                  :suspend="item.match.timer.tt"/>
              </p>
              <p>
                {{ item.match.ss ? item.match.ss.split('-')[0] : 0 }} :
                {{ item.match.ss ? item.match.ss.split('-')[1] : 0 }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <h3 class="flex-start fs14 p-l20 m-t20" style="color: #4D5872;">
      <img class="m-r8" style="height: 1rem;" src="../../assets/images/tmp3/hot.png" alt="">
      {{$t('rm_bs')}}
    </h3>

    <div class="m-t14">
      <ul style="max-width: 100vw;" class="p-l10 p-r10">
        <li class="ground-item2 re full-width m-b8" v-for="match of hotMatches" :key="match.match_id" @click="_toHotMatchDetail(match)">
          <div class="content flex p-r20 p-l20 fs12">
            <div class="colum-left flex ">
              <p class="tip">{{match.league_name}}</p>
            </div>
            <div class="right colum-right">
              <p>{{$utils.format(match.start_time * 1000, 'yyyy/MM/dd hh:mm:ss')}}</p>
            </div>
          </div>
          <div class="flex-middle p-r20 p-l20 fs12 list-content">
            <div class="center list">
              <load-image class="m-r8" style="width:1rem;height:1rem;"
                          :src="match.home_logo"
                          :loading="require('../../assets/images/tmp1/team_logo1.svg')"
                          :error="require('../../assets/images/tmp1/team_logo1.svg')"
              />
              <p>{{match.home_name}}</p>
            </div>
            <div>vs</div>
            <div class="center list">
              <load-image class="m-r8" style="width:1rem;height:1rem;"
                          :src="match.away_logo"
                          :loading="require('../../assets/images/tmp1/team_logo1.svg')"
                          :error="require('../../assets/images/tmp1/team_logo1.svg')"
              />
              <p>{{match.away_name}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="rankingMap.switch_ranking == 1">
      <h3 class="flex-start fs14 p-l20 m-t20" style="color: #4D5872;">
        <img class="m-r8" style="height: 1rem;" src="../../assets/images/tmp3/ranking.png" alt="">
        {{rankingMap.ranking_name}}
      </h3>

      <div class="p-l10 p-r10 ranking re">
        <div class="m-t8 re scroll-y hide-scroll-bar" style="max-height: 50vh;">
          <div class="ab full-width bgc"></div>
          <table class="table full-width center re">
            <thead>
            <tr>
              <th align="left" width="25%">
                <div class="center" style="display: inline-block;width: 2.5rem; height: 1.6rem; line-height: 1.6rem">{{$t('p_m')}}</div>
              </th>
              <th width="25%" align="left">
                <div class="p-l8">{{$t('player')}}</div>
              </th>
              <th width="25%">
                <div>
                  {{$t('h_l_l')}}
                </div>
              </th>
              <th width="25%" align="right">
                <div class="p-r8">{{$t('z_y_l')}}</div>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="r of rankingMap.list" :key="r.usr">
              <td align="left">
                <div class="center" style="display: inline-block;width: 2.5rem; height: 1.9rem; line-height: 1.9rem">
                  <img v-if="r.sort <= 3" style="width: 1rem;vertical-align: middle" :src="require('@/assets/images/tmp3/rank'+r.sort+'.png')" alt="">
                  <span v-else>{{r.sort}}</span>
                </div>
              </td>
              <td align="left">
                <span class="p-l8">{{r.usr}}</span>
              </td>
              <td>
                <span>{{r.hl + '%' }}</span>
              </td>
              <td align="right">
                <span class="p-r8">{{r.yl}}</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations, mapGetters} from "vuex";
import { sports } from "../../common/config";
import LoadImage from "../../common/LoadImage";
import CountDown from "../../common/CountDown";
import {getPlayerRanking, getScrollNotices} from "../../axios/sport";
export default {
  data() {
    return {
      active_sport: {text: 'fball', id: 1},
      rankingMap: {
        list: [],
        ranking_name: '',
        switch_ranking: 0
      },
      scrollNotices: ''
    }
  },

  computed: {
    ...mapGetters(['userInfo', 'projectConfig']),
  },

  props: {
    matches: {
      type: Array,
      default: () => []
    },
    hotMatches: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    ...mapMutations({
      updateBet: 'UPDATE_BET'
    }),

    selectSport(sport = {}) {
      this.active_sport = sport;
      this.$emit('select-sport', sport);
    },

    _toHotMatchDetail(match = {}) {
      this.$router.push({
        path: `/bet-detail`,
        query: {
          match_id: match.match_id,
          league_id: match.league_id,
          match_status: 0,
          sport: match.sport,
          league_name: match.league_name,
        }
      })
    },

    _toMatchDetail(item = {}) {
      console.log('match=======>', item)
      this.$router.push({
        path: `/bet-detail`,
        query: {
          match_id: item.match.id,
          league_id: item.league.id,
          match_status: item.match.status,
          sport: item.sport,
          league_name: item.league.name
        }
      })
    },

    _getScrollNotices() {
      getScrollNotices({client: 'mobile'})
          .then(res => {
            if (res.code === 200) {
              this.scrollNotices = ''

              res.data.forEach(notice => {
                this.scrollNotices += notice.content + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
              })
            }
          })
    }
  },

  components: {
    LoadImage,
    CountDown
  },

  mounted() {
    getPlayerRanking()
        .then(res => {
          if(res.code == 200) {
            this.rankingMap = res.data;
          }
        })

    this._getScrollNotices()
  },

  created() {
    this.sports = sports;
  },

  destroyed() {

  },

  deactivated() {

  },

  activated() {

  }
}
</script>
<style type="text/css" lang="less">
@import url('../../assets/css/index');



.colum-left {
  color: #4D5872;
  flex-direction: column;
  .tip {
    margin-top: .7rem;
    margin-bottom: .8rem;
  }
  .vs {
    font-size: 0.7rem;
    line-height: 1.1rem;
    margin-left: 0.4rem;
  }
  img {
    width: .7rem;
    .m-r(4);
  }
}

.colum-right {
  color: #4D5872;
  .full-height();
  p:nth-child(1) {
    line-height: 1.6rem;
  }
  p:nth-child(2) {
    .white();
    margin-top: -0.04rem;
  }
}

.ground-item2 {
  > .content {
    .justify-content(space-between);
  }
  .colum-right {
     p:nth-child(1) {
      line-height: 1.6rem;
    }
  }
  .colum-left {
    .tip {
      margin-bottom: 0;
    }
  }
}

.sport {
  .marquee-content {
    background-color: #F9FCFF;
    margin-top: -0.1rem;
  }

  .ground-item {
    background-image: url("../../assets/images/tmp3/bg_groud.png");
    background-size: 100% 100%;
    height: 6rem;
    width: 13.4rem;
    flex-shrink: 0;
  }

  .ground-item2 {
    background-image: url("../../assets/images/tmp3/bg_groud2.png");
    background-size: 100% 100%;
    height: 6.1rem;
    flex-shrink: 0;
    .list-content {
      height: 4rem;
      color: #4D5872;
      img {
        width: 1.3rem;
      }
      .list {
        width: 50%;
      }
    }
  }
}

.ranking {
  .bgc {
    height: 1.4rem;
    background-image: linear-gradient(180deg, #ECF2F8 0%, #FFFFFF 100%);
    left: 0;
    top: 0;
  }
  .table {
    box-shadow: 0px 2px 4px 0px rgba(28,29,32,0.1);
    border-radius: 4px;
    overflow: hidden;
    border-collapse: collapse;
    border-spacing: 0;
    thead {
      th {
        .fs(12);
        color: #4E5A74;
      }
    }
    tbody {
      tr:not(:last-child) {
        td {
          .fs(14);
          color: #4E5772;
          border-bottom: 1px solid #DDE6EE;
        }
      }
    }
  }
}
</style>
