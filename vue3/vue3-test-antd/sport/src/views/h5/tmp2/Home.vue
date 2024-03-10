<template>
  <CommonLayout class="home" @select-sport="_selectSport">
    <div class="flex-middle-only marquee-content" @click.stop="$router.push('/index/notice')">
      <div style="height:1.5rem;padding: 0 0.5rem;" class="flex-middle">
        <i class="icon_base icon_notice_2"></i>
      </div>

      <!--            <marquee-notices class="lh-30 flex-1" :text="scrollNotices" :textColor="'#ddd'"/>-->
      <marquee class="fs12" style="color:#ddd;" v-html="scrollNotices"></marquee>
    </div>

    <HomeNav/>

    <div class="pd-16-12 flex-between" @click="$router.push('/index/bet-grounder')">
      <span class="green fs16">{{$t('ground')}}</span>
      <p class="fs12 flex-middle-only" style="color: #cecece;">
        <span>{{sportCount}}{{$t('events')}}</span>
        <i class="van-icon van-icon-arrow"></i>
      </p>
    </div>

    <div v-if="'fball' in displaySportNames && footballMatches.length">
      <van-row class="football-ground-title">
        <van-col :span="11" style="color:#ddd;padding-left:0.6rem;">{{$t('fball')}}</van-col>
        <van-col :span="13" class="flex-between" style="color:#cecece;">
          <div class="center flex-1">1</div>
          <div class="center flex-1">x</div>
          <div class="center flex-1">2</div>
        </van-col>
      </van-row>

      <BetPlayItem :match="item.match"
                   :league-id="item.league.id"
                   v-for="item of footballMatches"
                   :handicap="{code: 'full_time_result'}"
                   :key="`football-${item.match.id}`"/>
    </div>


    <div v-if="'bball' in displaySportNames && basketballMatches.length">
      <van-row class="basketball-ground-title">
        <van-col :span="11" style="color:#ddd;padding-left:0.6rem;">{{$t('bball')}}</van-col>
        <van-col :span="13" class="flex-between" style="color:#cecece;">
          <div class="center flex-1">1</div>
          <div class="center flex-1">2</div>
        </van-col>
      </van-row>

      <BetPlayItem :match="item.match"
                   :league-id="item.league.id"
                   v-for="item of basketballMatches"
                   :handicap="{code: 'basketball_game_lines_spread'}"
                   :key="`basketball-${item.match.id}`"/>
    </div>


    <div v-if="'tennis' in displaySportNames && tennisMatches.length">
      <van-row class="tennis-ground-title">
        <van-col :span="14" style="color:#ddd;padding-left:0.6rem;">{{$t('tennis')}}</van-col>
        <van-col :span="10" class="flex-between" style="color:#cecece;">
          <div class="center flex-1">1</div>
          <div class="center flex-1">2</div>
        </van-col>
      </van-row>

      <BetPlayItem :match="item.match"
                   :league-id="item.league.id"
                   v-for="item of tennisMatches"
                   :handicap="{code: 'tennis_to_win_match'}"
                   :key="`tennis-${item.match.id}`"/>
    </div>


    <div v-if="'vball' in displaySportNames && volleyballMatches.length">
      <van-row class="volleyball-ground-title">
        <van-col :span="14" style="color:#ddd;padding-left:0.6rem;">{{$t('vball')}}</van-col>
        <van-col :span="10" class="flex-between" style="color:#cecece;">
          <div class="center flex-1">1</div>
          <div class="center flex-1">2</div>
        </van-col>
      </van-row>

      <BetPlayItem :match="item.match"
                   :col-span-left="14"
                   :league-id="item.league.id"
                   v-for="item of volleyballMatches"
                   :handicap="{code: 'to_win'}"
                   :key="`volleyball-${item.match.id}`"/>
    </div>

    <!--电子竞技-->
    <div v-if="'esports' in displaySportNames && esportsMatches.length">
      <van-row class="esport-ground-title">
        <van-col :span="14" style="color:#ddd;padding-left:0.6rem;">{{$t('esports')}}</van-col>
        <van-col :span="10" class="flex-between" style="color:#cecece;">
          <div class="center flex-1">1</div>
          <div class="center flex-1">2</div>
        </van-col>
      </van-row>

      <BetPlayItem :match="item.match"
                   :col-span-left="14"
                   :league-id="item.league.id"
                   v-for="item of esportsMatches"
                   :handicap="{code: 'to_win'}"
                   :key="`esports-${item.match.id}`"/>
    </div>


    <!--精选赛事-->
    <Highlights style="border-top:1px solid #367A65;border-bottom: 1px solid #367A65;"/>

    <!--足球投注盘-->
    <div class="flex-between" style="padding: 0.8rem 0.6rem 1rem 0.6rem;" @click="$router.push('/index/sport?sport=1')">
      <div>
        <img style="width:0.7rem;" class="m-r8" :src="require('../../../assets/images/tmp2/football-active.svg')"
             alt="">
        <span class="fs16" style="color: #5FE8BD;">{{$t('fbets')}}</span>
      </div>
      <i class="van-icon van-icon-arrow" style="color: #cecece;"></i>
    </div>

  </CommonLayout>
</template>
<script>
  import MarqueeNotices from "../../../common/Marquee";
  import LoadImage from "../../../common/LoadImage";
  import CommonLayout from '../../../components/CommonLayout';
  import BetPlayItem from "../../../components/BetPlayItem";
  import Highlights from "../../../components/Highlights";
  import HomeNav from "../../../components/HomeNav";
  import Home from "../../../mixins/home";
  import customiseMixin from "../../../mixins/customiseMixin";
  import {getScrollNotices} from "../../../axios/sport";

  export default {
    mixins: [Home, customiseMixin],

    components: {
      MarqueeNotices,
      LoadImage,
      CommonLayout,
      BetPlayItem,
      Highlights,
      HomeNav
    },

    mounted() {
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
  };
</script>

<style type="text/css" lang="less" scoped>
  .home {
    background: #494949;

    .football-ground-title {
      box-shadow: inset 0 -2px 0 0 #367A65;
      padding-bottom: 0.6rem;
    }

    .basketball-ground-title {
      box-shadow: inset 0 -2px 0 0 #9E6900;
      padding: 0.6rem 0;
    }

    .tennis-ground-title {
      box-shadow: inset 0 -2px 0 0 #4D6B2E;;
      padding: 0.6rem 0;
    }

    .volleyball-ground-title {
      box-shadow: inset 0 -2px 0 0 #80684C;
      padding: 0.6rem 0;
    }

    .esport-ground-title {
      box-shadow: inset 0 -2px 0 0 #624C6E;
      padding: 0.6rem 0;
    }
  }
</style>
