<template>
  <div class="matches-h5-tmp2">
    <CommonLayout :hide-header="true">
      <div class="upcoming-title pd-16-12">
        <div class="flex-middle-only fs12 m-b8" style="color:#cecece;" @click="$router.back()">
          <i class="van-icon van-icon-arrow-left m-r8"></i>
          <span>{{ sportName(sport) }}</span>
        </div>

        <van-popover placement="bottom-start" v-model="showPicker" trigger="click">
          <template #reference>
            <div class="flex-middle-only">
              <span style="color: #ddd;" class="fs20 m-r8"
                    @click.stop="showPicker = true">{{ league.league_name }}</span>
              <i class="van-icon van-icon-arrow-down" style="color:#cecece;"></i>
            </div>
          </template>

          <ul class="tmp2-overlay-content scroll-y" style="width: 17rem;">
            <li :class="league.league_id === item.league_id ? 'active' : ''"
                @click="_changeLeague(item)" v-for="item of leagues" :key="item.league_id">
              {{ item.league_name }}
            </li>
          </ul>
        </van-popover>
      </div>

      <div class="flex-middle-only lh-45 handicap-header">
        <van-popover placement="bottom-start" v-model="showHandicapPicker" trigger="click">
          <div slot="reference">
            <span class="fs16" style="color:#5FE8BD;">{{ handicap.name }}</span>
            <span class="fs12 m-l10" style="color: #ddd;" @click="showHandicapPicker = true">{{$t('change')}}</span>
            <i class="van-icon van-icon-arrow-down" style="color:#cecece;"></i>
          </div>

          <ul class="tmp2-overlay-content" style="width: 11rem;">
            <li v-for="item of handicaps" :key="item.code"
                :class="handicap.code === item.code ? 'active' : ''"
                @click="_changeHandicap(item)">
              {{ item.name }}
            </li>
          </ul>
        </van-popover>
      </div>


      <div class="lh-45 center" style="color:#b6b6b6;" v-if="!list.length">{{$t('no_more')}}</div>
      <div v-for="group of list" :key="group.title">
        <van-row class="flex-middle-only" style="height:1.4rem;background-color: #585858;">
          <van-col :span="colSpan(group.sport).left" :offset="2" style="color:#ddd;padding-left: 0.6rem;" class="fs12">
            {{ group.title }}
          </van-col>
          <van-col :span="colSpan(group.sport).right" class="flex-between fs12" style="color:#ddd;">
            <div class="flex-1 center" v-for="nav of navTabs" :key="nav">{{ nav }}</div>
          </van-col>
        </van-row>

        <BetPlayItem
            class="matches-bet-item"
            :handicap="handicap"
            format-txt="hh:mm"
            :match="match" v-for="match of group.matches"
            :league-id="group.id"
            :key="match.id"/>
      </div>
    </CommonLayout>
  </div>
</template>
<script>
import MatchesMixin from "../../../mixins/matches";
import CommonLayout from "../../../components/CommonLayout";
import handicapPicker from "../../../components/HandicapPicker";
import BetPlayItem from "../../../components/BetPlayItem";

export default {
  mixins: [MatchesMixin],

  components: {
    handicapPicker,
    BetPlayItem,
    CommonLayout
  }
};
</script>
<style type="text/css" lang="less">
.matches-h5-tmp2 {
  background-color: #404040;

  .upcoming-title {
    background-color: #404040;
  }

  .matches-bet-item {
    background: #505050;
  }

  .handicap-header {
    padding: 0 0.6rem;
    background-color: #505050;
  }
}
</style>
