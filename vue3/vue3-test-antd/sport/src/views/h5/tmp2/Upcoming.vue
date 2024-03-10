<template>
  <div class="upcoming">
    <div class="upcoming-title pd-16-12">
      <div class="flex-middle-only fs12 m-b8" style="color:#cecece;" @click="$router.back()">
        <i class="van-icon van-icon-arrow-left m-r8"></i>
        <span>{{ $t('fball') }}-{{ $t('ssyg') }}</span>
      </div>

      <div class="flex-middle-only">
        <van-popover placement="bottom-start" v-model="showPicker" trigger="click">
          <template #reference>
            <span style="color: #ddd;" class="fs20 m-r8" @click="showPicker = true">{{ hour !== 20 ? $t('to_hours', {hour}) : $t('m_t') }}</span>
            <i class="van-icon van-icon-arrow-down" style="color:#cecece;"></i>
          </template>

          <ul class="tmp2-overlay-content" style="width: 17rem;">
            <li :class="hour === 3 && 'active'" @click="_nextHour(3)">{{ $t('to_hours', {hour: 3}) }}</li>
            <li :class="hour === 12 && 'active'" @click="_nextHour(12)">{{ $t('to_hours', {hour: 12}) }}</li>
            <li :class="hour === 24 && 'active'" @click="_nextHour(24)">{{ $t('to_hours', {hour: 24}) }}</li>
            <li :class="hour === 20 && 'active'" @click="_nextHour(20)">{{ $t('m_t')}}</li>
          </ul>
        </van-popover>
      </div>
    </div>

    <CommonLayout :hide-header="true">
      <CommonBetList category="upcoming"
                     :title-style="{height: '2rem'}"
                     :upcoming-time="hour"
                     :handicap="handicap" title=""/>
    </CommonLayout>
  </div>
</template>
<script>
import CommonBetList from '../../../components/CommonBetList'
import CommonLayout from "../../../components/CommonLayout";

export default {
  data() {
    return {
      handicap: {code: 'asian_handicap_goal', name: this.$t('a_h_goal')},
      showPicker: false,
      hour: 24,
    }
  },

  methods: {
    _changeHandicap(handicap) {
      this.handicap = handicap
      this.showPicker = false
    },

    _nextHour(hour) {
      this.hour = hour
      this.showPicker = false
    },

    _changeLeague(id) {
      this.league_id = id
      this.showPicker = false
    }
  },

  components: {
    CommonBetList,
    CommonLayout
  },

  created() {
    this.handicaps = [
      {code: '', name: this.$t('a_h_goal')},
      {code: 'full_time_result', name: this.$t('full_time_result')},
      {code: 'asian_handicap', name: this.$t('asian_handicap')},
      {code: 'match_goals', name: this.$t('match_goals')},
    ]
  }
};
</script>
<style type="text/css" lang="less">
.upcoming {
  .upcoming-title {
    background-color: #404040;
  }
}
</style>
