<template>
  <div class="h5-result-tmp2">
    <div class="flex-between white" style="height:2.2rem;padding: 0  0.6rem;">
      <div>
        <span class="fs20 m-r8">{{$t('result')}}</span>
        <van-popover
            v-model="showSportPopover"
            trigger="click"
            :actions="sports"
            @select="onSelect"
        >
          <template #reference>
            <div class="flex-middle-only fs12" style="margin-right: 24px;color:#ddd;">
              <span>{{ $t(sport.text) }}</span>
              <van-icon name="arrow-down"></van-icon>
            </div>
          </template>
        </van-popover>
      </div>


      <div class="fs14 flex-middle-only" @click="showCalendar = true">
        <span>{{ format(startDate, 'yyyy/MM/dd') }}-{{ format(endDate, 'yyyy/MM/dd') }}</span>
        <i class="van-icon van-icon-arrow-left" style="transform: rotate(-90deg);"></i>
      </div>
    </div>

    <div class="flex-middle-only pd-16-12"
         ref="picker-anchor"
         @click="showPicker = true"
         style="border-top: 1px solid #367A65;border-bottom:1px solid #367A65;">
      <span class="m-r8 fs16 green">{{ league.name }}</span>
      <span class="fs12 flex-middle-only" style="color: #ddd;">{{$t('change')}} <i
          class="van-icon van-icon-arrow-down"></i></span>
    </div>

    <div ref="list" style="overflow-y: scroll;"
         :style="{height: scrollHeight}">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :immediate-check="false"
            :finished="finished"
            :finished-text="$t('no_more')"
            @load="onLoad"
        >
          <van-collapse v-model="activeCollapses" :border="false">
            <van-collapse-item :name="j"
                               v-for="(item, j) in list"
                               :key="j"
                               :border="false"
                               :is-link="false">
              <template #title>
                <div class="flex-between pd-16-12" v-if="String(league.id) === '0'">
                  <span class="fs16 green">{{ item.league_name }}</span>
                  <van-icon
                      v-show="!activeCollapses.includes(j)"
                      name="arrow-down"
                      color="#cecece"/>
                </div>
              </template>

              <div class="re" v-for="(child, i) in item.children" :key="i" style="padding-bottom: 0.8rem;">
                <div class="flex-between" @click.stop="_showResultDetail(j, i)" style="padding: 0 0.6rem;">
                  <div class="fs12 flex-1" style="color:#ddd;">
                    <p class="flex-between lh-30" style="color:#a5a5a5;">
                      <span>{{ format(child.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</span>
                      <span>{{ child.status_name }}</span>
                    </p>
                    <p class="flex-between lh-20">
                      <span>{{ child.home_name }}</span>
                      <span v-if="child.status !== 5 && child.ss">{{ child.ss.split('-')[0] }}</span>
                      <span v-else>-</span>
                    </p>

                    <p class="flex-between lh-20">
                      <span>{{ child.away_name }}</span>
                      <span v-if="child.status !== 5 && child.ss">{{ child.ss.split('-')[1] }}</span>
                      <span v-else>-</span>
                    </p>
                  </div>
                  <i class="van-icon van-icon-arrow-down m-l10"
                     :class="detailIndex.indexOf(`${j}-${i}`) > -1 ? 'rotate90' : ''"
                     style="font-size: 14px;color: #aeaeae;transition: transform .2s linear;"></i>
                </div>

                <!--足球-->
                <van-row class="fs12 over-hidden height-transition m-t8"
                         v-if="child.sport_id === '1'"
                         style="background-color: #505050;padding: 0 0.6rem;"
                         v-show="detailIndex.indexOf(`${j}-${i}`) > -1">
                  <van-col :span="6">
                    <p class="flex-middle h30 result-under-line center">{{$t('s_b_c')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['1']">{{ child.scores['1'].home }} - {{ child.scores['1'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>

                  <van-col :span="6">
                    <p class="flex-middle h30 result-under-line center">{{$t('x_b_c')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['2']">{{ child.scores['2'].home }} - {{ child.scores['2'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>

                  <van-col :span="6">
                    <p class="flex-middle h30 result-under-line center">{{$t('j_s_s')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['3']">{{ child.scores['3'].home }} - {{ child.scores['3'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>

                  <van-col :span="6">
                    <p class="flex-middle h30 result-under-line center">{{$t('q_c')}}</p>
                    <p class="center lh-30 white">
                      <span
                          v-if="child.status !== 5 && child.ss">{{ child.ss.split('-')[0] }} - {{ child.ss.split('-')[1] }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                </van-row>

                <!--篮球-->
                <van-row class="fs12 over-hidden height-transition m-t8" v-if="child.sport_id === '18'"
                         style="background-color: #505050;padding: 0 0.6rem;"
                         v-show="detailIndex.indexOf(`${j}-${i}`) > -1">
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('d1')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['1']">{{ child.scores['1'].home }} - {{ child.scores['1'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('d2')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['2']">{{ child.scores['2'].home }} - {{ child.scores['2'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('s_b_c')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['3']">{{ child.scores['3'].home }} - {{ child.scores['3'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('d3')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['4']">{{ child.scores['4'].home }} - {{ child.scores['4'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('d4')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['5']">{{ child.scores['5'].home }} - {{ child.scores['5'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j_s_s')}}</p>
                    <p class="center lh-30 white">
                                            <span v-if="child.status !== 5 && child.scores && child.scores['6']">
                                                {{ child.scores['6'].home }} - {{ child.scores['6'].away }}
                                            </span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                </van-row>

                <!--网球-->
                <van-row class="fs12 over-hidden height-transition m-t8" v-if="Number(child.sport_id) === 13"
                         style="background-color: #505050;padding: 0 0.6rem;"
                         v-show="detailIndex.indexOf(`${j}-${i}`) > -1">
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j1')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['1']">{{ child.scores['1'].home }} - {{ child.scores['1'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j2')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['2']">{{ child.scores['2'].home }} - {{ child.scores['2'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j3')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['3']">{{ child.scores['3'].home }} - {{ child.scores['3'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j4')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['4']">{{ child.scores['4'].home }} - {{ child.scores['4'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j5')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['5']">{{ child.scores['5'].home }} - {{ child.scores['5'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('z_b_f')}}</p>
                    <p class="center lh-30 white">
                                            <span v-if="child.status !== 5 && child.ss">
                                                {{ child.ss.split('-')[0] }} - {{ child.ss.split('-')[1] }}
                                            </span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                </van-row>

                <!--排球-->
                <van-row class="fs12 over-hidden height-transition m-t8" v-if="child.sport_id === '91'"
                         style="background-color: #505050;padding: 0 0.6rem;"
                         v-show="detailIndex.indexOf(`${j}-${i}`) > -1">
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j1')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['1']">{{ child.scores['1'].home }} - {{ child.scores['1'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j2')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['2']">{{ child.scores['2'].home }} - {{ child.scores['2'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j3')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['3']">{{ child.scores['3'].home }} - {{ child.scores['3'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j4')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['4']">{{ child.scores['4'].home }} - {{ child.scores['4'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j5')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['5']">{{ child.scores['5'].home }} - {{ child.scores['5'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="center h30 result-under-line center">{{$t('z_b_f')}}</p>
                    <p class="center lh-30 white">
                                            <span v-if="child.status !== 5 && child.ss">
                                                {{ child.ss.split('-')[0] }} - {{ child.ss.split('-')[1] }}
                                            </span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                </van-row>

                <!--棒球-->
                <van-row class="fs12 over-hidden height-transition m-t8" v-if="child.sport_id === '16'"
                         style="background-color: #505050;padding: 0 0.6rem;"
                         v-show="detailIndex.indexOf(`${j}-${i}`) > -1">
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j1')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['1']">{{ child.scores['1'].home }} - {{ child.scores['1'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j2')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['2']">{{ child.scores['2'].home }} - {{ child.scores['2'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j3')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['3']">{{ child.scores['3'].home }} - {{ child.scores['3'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j4')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['4']">{{ child.scores['4'].home }} - {{ child.scores['4'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j5')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['5']">{{ child.scores['5'].home }} - {{ child.scores['5'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j6')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['6']">{{ child.scores['6'].home }} - {{ child.scores['6'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j7')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['7']">{{ child.scores['7'].home }} - {{ child.scores['7'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j8')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['8']">{{ child.scores['8'].home }} - {{ child.scores['8'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('j9')}}</p>
                    <p class="center lh-30 white">
                      <span v-if="child.status !== 5 && child.scores && child.scores['9']">{{ child.scores['9'].home }} - {{ child.scores['9'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('s_l')}}</p>
                    <p class="center lh-30 white">
                      <span
                          v-if="child.status !== 5 && child.scores && child.scores['hit']">{{ child.scores['hit'].home }} - {{ child.scores['hit'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('a_d')}}</p>
                    <p class="center lh-30 white">
                      <span
                          v-if="child.status !== 5 && child.scores && child.scores['run']">{{ child.scores['run'].home }} - {{ child.scores['run'].away }}</span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                  <van-col :span="4">
                    <p class="flex-middle h30 result-under-line center">{{$t('z_b_f')}}</p>
                    <p class="center hl-30 white">
                      <span v-if="child.status !== 5 && child.ss">
                          {{ child.ss.split('-')[0] }} - {{ child.ss.split('-')[1] }}
                      </span>
                      <span v-else>-</span>
                    </p>
                  </van-col>
                </van-row>
              </div>
            </van-collapse-item>
          </van-collapse>
        </van-list>
      </van-pull-refresh>
    </div>

    <van-overlay :show="showPicker"
                 :lock-scroll="false"
                 @click="showPicker = false"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.2)`}"
    >
      <div class="ab overlay-container hide-scroll-bar" :style="{top: top}" @click.stop>
        <ul class="tmp2-overlay-content scroll-y">
          <li v-for="item of leagues" :key="item.id"
              :class="league.id === item.id ? 'active' : ''"
              @click="onConfirmLeague(item)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </van-overlay>

    <Calendar :show="showCalendar" @close="showCalendar = false"
              :start-date="startDate"
              @change="onConfirmDate"/>

    <van-overlay :show="isLoading"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.7)`}">
      <van-loading v-if="isLoading" class="ab-middle flex-middle" size="50px"/>
    </van-overlay>
  </div>
</template>
<script>
import Calendar from "../../../components/Calendar";
import {format} from "../../../assets/js/util";
import {getMatchHistory} from "../../../axios/sport";
import {sports} from "../../../common/config"
import customiseMixin from "../../../mixins/customiseMixin";

export default {
  mixins: [customiseMixin],
  data() {
    return {
      activeCollapses: [0],
      showPicker: false,
      showCalendar: false,
      showSportPopover: false,
      detailIndex: [],
      leagues: [],
      league: {id: 0, name: this.$t('all_m')},
      list: [],
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      loading: false,
      refreshing: false,
      finished: false,
      page: 1,
      isLoading: false,
      top: 0,
      sport: {text: this.$t('all')}
    }
  },

  components: {
    Calendar
  },

  computed: {
    sports() {
      const arr = [
        {text: 'all', id: ''},
        ...sports.filter(sport => sport.id in this.displaySportIds)
      ];

      return arr.map(item => {
        item.text = this.$t(item.text);
        return item;
      })
    }
  },

  methods: {

    format(date, fmt) {
      return format(date, fmt)
    },

    onConfirmLeague(league) {
      setTimeout(() => this.showPicker = false, 100)

      if (this.league.id !== league.id) {
        this.league = {...league}
        this.onRefresh()
      }
    },

    onConfirmDate(rangeDate) {
      console.log('rangeDate', rangeDate)
      this.startDate = rangeDate[0]
      this.endDate = rangeDate[1]

      this.showCalendar = false
      this.onRefresh()
    },

    _showResultDetail(j, i) {
      let v = `${j}-${i}`
      let index = this.detailIndex.indexOf(v)
      if (index > -1) {
        this.detailIndex.splice(index, 1)
      } else {
        this.detailIndex.push(v)
      }
    },

    onRefresh() {
      // 清空列表数据
      this.finished = false
      this.refreshing = true
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true

      this.page = 1
      this.onLoad()
    },

    onLoad(isFirst = false) {
      let params = {
        page: this.page,
        pageSize: 100,
        sport: this.sport.id,
        league: this.league.id,
        startDate: format(this.startDate, 'yyyy-MM-dd'),
        endDate: format(this.endDate, 'yyyy-MM-dd')
      }

      if (isFirst) {
        this.isLoading = true
      }

      getMatchHistory(params)
          .then(res => {
            this.isLoading = false

            if (this.refreshing) {
              this.chaheList = [];
              this.page = 1
              this.refreshing = false;
            }

            if (res.code === 200) {
              let leagues = res.data.leagues
              leagues[0].name = this.$t('all_m')
              this.leagues = leagues

              this.chaheList = [
                ...this.chaheList,
                ...res.data.data.filter(item => item.sport_id in this.displaySportIds)
              ].sort((a, b) => b.start_time - a.start_time)

              this.list = this.serializeList(this.chaheList)

              console.log(this.list);

              this.page++

              if (this.chaheList.length >= Number(res.data.count)) {
                this.finished = true;
              }
            }

            this.loading = false;
          })
          .catch(err => {
            console.log(err)
            this.loading = false
            this.isLoading = false
          })
    },

    // 二次排序处理
    serializeList(list = []) {
      let obj = {}
      let arr = []

      list.forEach(item => {

        // 没有出现过的联赛 push到 arr 并记录下标位置
        if (!obj[item.league_id]) {

          obj[item.league_id] = {
            league_id: item.league_id,
            league_name: item.league_name,
            children: [item],
            index: arr.length
          }

          arr.push(obj[item.league_id])

        } else {
          // 否则 将找出相关联赛的 下标位置 并替换成新的

          obj[item.league_id].children.push(item)

          let index = obj[item.league_id].index

          arr.splice(index, 1, obj[item.league_id])
        }
      })

      return arr
    },

    onSelect(sport) {
      this.sport = sport

      this.onRefresh()
    }
  },

  mounted() {
    this.onLoad(true)

    this.$nextTick(() => {
      this.top = this.$refs['picker-anchor'].getBoundingClientRect().bottom + 'px'
    })
  },

  created() {
    this.chaheList = []
    this.scrollHeight = window.innerHeight - window.rem2px(7.2) + 'px';
  }
}
</script>
<style type="text/css" lang="less">
.h5-result-tmp2 {

  .h30 {
    height: 1.5rem!important;
  }

  .picker-bar {
    height: 2.4rem;
  }

  .result-under-line {
    color: #b6b6b6;
    border-bottom: 1px solid #5d5d5d;
  }

  .overlay-container {
    width: 90vw;
    margin-left: 0.6rem;
    max-height: 60vh;
    overflow-y: scroll;
  }

  .van-collapse-item__title,
  .van-collapse-item__content {
    padding: 0 !important;
  }

  .van-cell, .van-collapse-item__content {
    background-color: transparent !important;
    line-height: 1;
  }

  .van-collapse-item {
    background: #404040;
  }

  .van-collapse-item__wrapper {
    border-bottom: 1px solid #367A65;;
  }
}
</style>
