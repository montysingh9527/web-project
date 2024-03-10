<template>
  <CommonLayout class="foot-ball-tmp2" :hide-header="true">
    <div class="header flex-column flex-between" :class="sportBgClass(sport, 'h5').bg">
      <h3 style="color:#cecece;" class="fs22 full-width">{{ sportBgClass(sport, 'h5').text }}</h3>

      <p class="flex-between full-width" @click="$router.push(`/index/bet-grounder?sport=${sport}`)">
        <span class="white fs14">{{$t('tzp')}}</span>
        <span style="color:#6EEBC3;" class="flex-middle-only fs12">
                    {{$t('ground')}} {{ sportGroundCount }}
                    <i class="van-icon-arrow van-icon"></i>
                </span>
      </p>
    </div>

    <!--精选赛事-->
    <Highlights :sport="sport" style="border-top:2px solid #367A65;border-bottom: 2px solid #6e6e6e;"/>

    <!--赛事预告-->
    <div class="flex-column match-advance" v-if="Number(sport) === 1" @click="$router.push('/index/bet-upcoming')">
      <h3 class="full-width fs16 m-b20" style="color: #5FE8BD;">{{$t('ssyg')}}</h3>
      <p class="full-width flex-between">
        <span style="color:#f0f0f0;">{{$t('hours_24')}}</span>
        <span class="flex-middle-only fs12" style="color: #ddd;">
            {{$t('sais', {n:sportUpcomingCount })}}
            <i class="van-icon van-icon-arrow"></i>
        </span>
      </p>
    </div>

    <van-collapse v-model="activeNames" :border="false">
      <van-collapse-item :name="item.code"
                         :ref="`collapse-item-${item.code}`"
                         :border="false"
                         :is-link="false"
                         v-for="item of collapseList"
                         :key="item.code">
        <template #title>
          <div class="pd-16-12 fs16 flex-between" style="color: #5FE8BD;"
               @click="_getLeaguesByMarketGroup(item.code)">
            <span>{{ item.name }}</span>

            <van-loading size="16px" v-if="loadings[item.code]"/>

            <i class="van-icon van-icon-arrow-down"
               style="color:#cecece;"
               v-else
               v-show="!activeNames.includes(item.code)"
            ></i>
          </div>
        </template>
        <van-collapse v-model="activeSubNames" :border="false">
          <van-collapse-item :name="`${item.code}-${group.code}`"
                             :border="false"
                             :is-link="false"
                             v-for="group of item.list"
                             :key="group.code">
            <template #title>
              <div class="pd-16-12 fs14 flex-between" style="color: #ddd;">
                <span>{{ group.name }}</span>
                <i class="van-icon van-icon-arrow-down"
                   style=";color:#cecece;"
                   v-show="!activeSubNames.includes(group.code)"></i>
              </div>
            </template>

            <van-row style="padding: 0 0.6rem 0.6rem;">
              <van-col class="fs12 lh-30" style="color:#b5b5b5;" :span="12"
                       @click="toMatches(league, item, group.code)"
                       v-for="league of group.leagues"
                       :key="league.league_id">{{ league.league_name }}
              </van-col>
            </van-row>
          </van-collapse-item>
        </van-collapse>
      </van-collapse-item>
    </van-collapse>
  </CommonLayout>
</template>
<script>
import CommonLayout from '../../../components/CommonLayout'
import Highlights from "../../../components/Highlights";
import SportMixin from "../../../mixins/sport"

export default {
  mixins: [SportMixin],
  components: {
    CommonLayout,
    Highlights
  },
};
</script>
<style type="text/css" lang="less">
.foot-ball-tmp2 {
  .header {
    background-size: 100% 100%;
    height: 6.4rem;
    width: 100%;
    padding: 1.5rem 0.6rem 0.8rem 0.6rem;
  }

  .match-advance {
    padding: 0.8rem 0.6rem 1.3rem;
    border-bottom: 1px solid #367A65;
    background: #585858;
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
    border-bottom: 1px solid #367A65;
    border-top: 1px solid #367A65;

    .van-collapse-item {
      border-bottom: 1px solid #5D5D5D;
      border-top: 1px solid #5D5D5D;
    }
  }
}
</style>
