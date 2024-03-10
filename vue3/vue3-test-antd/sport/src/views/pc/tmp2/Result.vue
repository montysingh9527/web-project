<template>
  <div class="result-pc-tmp2">
    <div class="flex-between white flex-between header">
      <span class="fs20">{{$t('result')}}</span>

      <div class="flex-middle-only">
        <van-popover
            v-model="showSportPopover"
            trigger="click"
            :actions="sports"
            @select="onSelect"
        >
          <template #reference>
            <div class="flex-middle-only cursor" style="margin-right: 24px;">
              <span>{{ sport.text }}</span>
              <van-icon name="arrow-down"></van-icon>
            </div>
          </template>
        </van-popover>

        <div class="fs14 flex-middle-only cursor" @click="showDatePicker = true">
          <span>{{ format(startDate, 'yyyy-MM-dd') }}-{{ format(endDate, 'yyyy-MM-dd') }}</span>
          <i class="van-icon van-icon-arrow-down m-l8"></i>
        </div>
      </div>
    </div>

    <div class="flex-middle-only title">
      <div class="flex-middle cursor" @click="showLeaguePicker = true">
        <span class="m-r8 fs16 green">{{ league.name }}</span>
        <span class="fs12 flex-middle-only" style="color: #ddd;">{{$t('change')}}<i class="van-icon van-icon-arrow-down"></i></span>
      </div>
    </div>

    <div class="scroll-y hide-scroll-bar" :style="{height: scrollHeight + 'px'}">

      <div v-for="(item, j) in list" :key="j" style="border-bottom: 1px solid #367A65;">
        <div class="flex-middle-only" v-if="league.id === 0" style="height: 48px;padding: 0 36px;">
          <span class="fs16 green">{{ item.league_name }}</span>
        </div>

        <van-row class="table-header flex-middle-only" v-if="item.sport_id === '1'">
          <van-col :span="4">{{$t('date')}}</van-col>
          <van-col :span="8">{{$t('sai_c')}}</van-col>
          <van-col :span="2">{{$t('s_b_c')}}</van-col>
          <van-col :span="2">{{$t('x_b_c')}}</van-col>
          <van-col :span="2">{{$t('j_s_s')}}</van-col>
          <van-col :span="2">{{$t('q_c')}}</van-col>
          <van-col :span="2">{{$t('z_t')}}</van-col>
        </van-row>

        <van-row class="table-header flex-middle-only" v-if="item.sport_id === '18'">
          <van-col :span="4">{{$t('date')}}</van-col>
          <van-col :span="8">{{$t('sai_c')}}</van-col>
          <van-col :span="1">{{$t('d1')}}</van-col>
          <van-col :span="1">{{$t('d2')}}</van-col>
          <van-col :span="1">{{$t('s_b_c')}}</van-col>
          <van-col :span="1">{{$t('d3')}}</van-col>
          <van-col :span="1">{{$t('d4')}}</van-col>
          <van-col :span="1">{{$t('j_s_s')}}</van-col>
          <van-col :span="2">{{$t('q_c')}}</van-col>
          <van-col :span="2">{{$t('z_t')}}</van-col>
        </van-row>

        <van-row class="table-header flex-middle-only" v-if="item.sport_id === '13'">
          <van-col :span="4">{{$t('date')}}</van-col>
          <van-col :span="8">{{$t('sai_c')}}</van-col>
          <van-col :span="2">{{$t('j1')}}</van-col>
          <van-col :span="2">{{$t('j2')}}</van-col>
          <van-col :span="2">{{$t('j3')}}</van-col>
          <van-col :span="2">{{$t('j4')}}</van-col>
          <van-col :span="2">{{$t('j5')}}</van-col>
          <van-col :span="1">{{$t('z_b_f')}}</van-col>
          <van-col :span="1">{{$t('z_t')}}</van-col>
        </van-row>

        <van-row class="table-header flex-middle-only" v-if="item.sport_id === '91'">
          <van-col :span="4">{{$t('date')}}</van-col>
          <van-col :span="8">{{$t('sai_c')}}</van-col>
          <van-col :span="2">{{$t('j1')}}</van-col>
          <van-col :span="2">{{$t('j2')}}</van-col>
          <van-col :span="2">{{$t('j3')}}</van-col>
          <van-col :span="2">{{$t('j4')}}</van-col>
          <van-col :span="2">{{$t('j5')}}</van-col>
          <van-col :span="1">{{$t('z_b_f')}}</van-col>
          <van-col :span="1">{{$t('z_t')}}</van-col>
        </van-row>

        <van-row class="table-header flex-middle-only" v-if="item.sport_id === '16'">
          <van-col :span="4">{{$t('date')}}</van-col>
          <van-col :span="7">{{$t('sai_c')}}</van-col>
          <van-col :span="1">{{$t('j1')}}</van-col>
          <van-col :span="1">{{$t('j2')}}</van-col>
          <van-col :span="1">{{$t('j3')}}</van-col>
          <van-col :span="1">{{$t('j4')}}</van-col>
          <van-col :span="1">{{$t('j5')}}</van-col>
          <van-col :span="1">{{$t('j6')}}</van-col>
          <van-col :span="1">{{$t('j7')}}</van-col>
          <van-col :span="1">{{$t('j8')}}</van-col>
          <van-col :span="1">{{$t('j9')}}</van-col>
          <van-col :span="1">{{$t('s_l')}}</van-col>
          <van-col :span="1">{{$t('a_d')}}</van-col>
          <van-col :span="1">{{$t('z_b_f')}}</van-col>
          <van-col :span="1">{{$t('z_t')}}</van-col>
        </van-row>

        <van-row class="table-header flex-middle-only" v-if="item.sport_id === '151'">
          <van-col :span="4">{{$t('date')}}</van-col>
          <van-col :span="8">{{$t('sai_c')}}</van-col>
          <van-col :span="2" :offset="8">{{$t('q_c')}}</van-col>
          <van-col :span="2">{{$t('z_t')}}</van-col>
        </van-row>

        <div v-if="item.sport_id === '1'">
          <van-row class="table-body-item flex-middle-only" v-for="(child, i) in item.children" :key="i">
            <van-col :span="4">{{ format(child.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</van-col>
            <van-col :span="8">{{ child.home_name }} v {{ child.away_name }}</van-col>
            <van-col :span="2">
              <span v-if="child.status !== 5 && child.scores && child.scores['1']">{{ child.scores['1'].home }} - {{ child.scores['1'].away }}</span>
              <span v-else>-</span>
            </van-col>
            <van-col :span="2">
              <span
                  v-if="child.status !== 5 && child.scores && child.scores['2']">{{ child.scores['2'].home }} - {{ child.scores['2'].away }}</span>
              <span v-else>-</span>
            </van-col>
            <van-col :span="2">
              <span
                  v-if="child.status !== 5 && child.scores && child.scores['3']">{{ child.scores['3'].home }} - {{ child.scores['3'].away }}</span>
              <span v-else>-</span>
            </van-col>
            <van-col :span="2">
              <span
                  v-if="child.status !== 5 && child.ss">{{ child.ss.split('-')[0] }} - {{ child.ss.split('-')[1] }}</span>
              <span v-else>-</span>
            </van-col>
            <van-col :span="2">{{ child.status_name }}</van-col>
          </van-row>
        </div>

        <div v-if="item.sport_id === '18'">
          <van-row class="table-body-item flex-middle-only" v-for="(child, i) in item.children" :key="i">
            <van-col :span="4">{{ format(child.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</van-col>
            <van-col :span="8">{{ child.home_name }} v {{ child.away_name }}</van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['1']">{{ child.scores['1'].home }}-{{ child.scores['1'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['2']">{{ child.scores['2'].home }}-{{ child.scores['2'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['3']">{{ child.scores['3'].home }}-{{ child.scores['3'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['4']">{{ child.scores['4'].home }}-{{ child.scores['4'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['5']">{{ child.scores['5'].home }}-{{ child.scores['5'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['6']">{{ child.scores['6'].home }}-{{ child.scores['6'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="2">
              <span v-if="child.scores && child.ss">{{ child.ss.split('-')[0] }}-{{ child.ss.split('-')[1] }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="2">
              {{ child.status_name }}
            </van-col>
          </van-row>
        </div>

        <div v-if="item.sport_id === '13'">
          <van-row class="table-body-item flex-middle-only" v-for="(child, i) in item.children" :key="i">
            <van-col :span="4">{{ format(child.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</van-col>
            <van-col :span="8">{{ child.home_name }} v {{ child.away_name }}</van-col>
            <van-col :span="2">
              <span
                  v-if="child.scores && child.scores['1']">{{ child.scores['1'].home }}-{{ child.scores['1'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="2">
              <span
                  v-if="child.scores && child.scores['2']">{{ child.scores['2'].home }}-{{ child.scores['2'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="2">
              <span
                  v-if="child.scores && child.scores['3']">{{ child.scores['3'].home }}-{{ child.scores['3'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="2">
              <span
                  v-if="child.scores && child.scores['4']">{{ child.scores['4'].home }}-{{ child.scores['4'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="2">
              <span
                  v-if="child.scores && child.scores['5']">{{ child.scores['5'].home }}-{{ child.scores['5'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span v-if="child.scores && child.ss">{{ child.ss.split('-')[0] }}-{{ child.ss.split('-')[1] }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              {{ child.status_name }}
            </van-col>
          </van-row>
        </div>

        <div v-if="item.sport_id === '91'">
          <van-row class="table-body-item flex-middle-only" v-for="(child, i) in item.children" :key="i">
            <van-col :span="4">{{ format(child.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</van-col>
            <van-col :span="8">{{ child.home_name }} v {{ child.away_name }}</van-col>
            <van-col :span="2">
              <span
                  v-if="child.scores && child.scores['1']">{{ child.scores['1'].home }}-{{ child.scores['1'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="2">
              <span v-if="child.scores && child.scores['2']">{{ child.scores['2'].home }}-{{ child.scores['2'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="2">
              <span
                  v-if="child.scores && child.scores['3']">{{ child.scores['3'].home }}-{{ child.scores['3'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="2">
              <span
                  v-if="child.scores && child.scores['4']">{{ child.scores['4'].home }}-{{ child.scores['4'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="2">
              <span
                  v-if="child.scores && child.scores['5']">{{ child.scores['5'].home }}-{{ child.scores['5'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span v-if="child.scores && child.ss">{{ child.ss.split('-')[0] }}-{{ child.ss.split('-')[1] }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              {{ child.status_name }}
            </van-col>
          </van-row>
        </div>

        <div v-if="item.sport_id === '16'">
          <van-row class="table-body-item flex-middle-only" v-for="(child, i) in item.children" :key="i">
            <van-col :span="4">{{ format(child.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</van-col>
            <van-col :span="7">{{ child.home_name }} v {{ child.away_name }}</van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['1']">{{ child.scores['1'].home }}-{{ child.scores['1'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['2']">{{ child.scores['2'].home }}-{{ child.scores['2'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['3']">{{ child.scores['3'].home }}-{{ child.scores['3'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['4']">{{ child.scores['4'].home }}-{{ child.scores['4'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['5']">{{ child.scores['5'].home }}-{{ child.scores['5'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['6']">{{ child.scores['6'].home }}-{{ child.scores['6'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['7']">{{ child.scores['7'].home }}-{{ child.scores['7'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['8']">{{ child.scores['8'].home }}-{{ child.scores['8'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['9']">{{ child.scores['9'].home }}-{{ child.scores['9'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['hit']">{{ child.scores['hit'].home }}-{{ child.scores['hit'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span
                  v-if="child.scores && child.scores['run']">{{ child.scores['run'].home }}-{{ child.scores['run'].away }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              <span v-if="child.scores && child.ss">{{ child.ss.split('-')[0] }}-{{ child.ss.split('-')[1] }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="1">
              {{ child.status_name }}
            </van-col>
          </van-row>
        </div>

        <div v-if="item.sport_id === '151'">
          <van-row class="table-body-item flex-middle-only" v-for="(child, i) in item.children" :key="i">
            <van-col :span="4">{{ format(child.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</van-col>
            <van-col :span="8">{{ child.home_name }} v {{ child.away_name }}</van-col>

            <van-col :span="2" :offset="8">
              <span v-if="child.scores && child.ss">{{ child.ss.split('-')[0] }}-{{ child.ss.split('-')[1] }}</span>
              <span v-else>--</span>
            </van-col>
            <van-col :span="2">
              {{ child.status_name }}
            </van-col>
          </van-row>
        </div>
      </div>
    </div>

    <div class="flex-middle" style="height: 48px;">
      <span class="fs12">{{$t('t_p', {totalPage})}} </span>
      <div class="fs12 flex-middle m-l8 m-r8 pagination-page-size re">
        <span>{{$t('p_s', {pageSize})}}</span>
        <i class="van-icon van-icon-arrow-down"></i>

        <ul class="ab pagination-page-size-list">
          <li class="pagination-page-size-item"
              :style="{color: pageSize === 50 ? '#FFDF1B' : ''}"
              @click="handleSizeChange(50)">50{{$t('pie')}}
          </li>
          <li class="pagination-page-size-item"
              :style="{color: pageSize === 100 ? '#FFDF1B': ''}"
              @click="handleSizeChange(100)">100{{$t('pie')}}
          </li>
        </ul>
      </div>
      <van-pagination v-model="page"
                      force-ellipses
                      :items-per-page="pageSize"
                      :total-items="totalPage"
                      @change="handleCurrentChange"
                      :show-page-size="5"
      >
        <template #prev-text>
          <van-icon name="arrow-left"/>
        </template>
        <template #next-text>
          <van-icon name="arrow"/>
        </template>
        <template #page="{ text }">{{ text }}</template>
      </van-pagination>

      <div class="flex-middle m-l10">
        <span>{{$t('go')}}</span>
        <van-field class="fs12 center page-input m-l8 m-r8"
                   maxlength="8"
                   v-model="page1"
                   @input="handleCurrentChange"
                   type="number"/>
        <span>{{$t('page')}}</span>
      </div>

    </div>

    <Footer/>

    <van-calendar v-model="showDatePicker"
                  :formatter="formatter"
                  :style="{top: '145px',right: '36px', left:'auto',borderRadius: 0,width: '400px',height: '500px', color:'#333'}"
                  type="range"
                  :confirm-text="$t('q_r')"
                  :show-title="false"
                  position="top"
                  :min-date="new Date(new Date().getTime() - 24 * 3600000 * 60)"
                  :max-date="new Date(new Date().getTime() + 24 * 3600000)"
                  @close="showDatePicker = false"
                  @confirm="_changeDate" color="#126E51"/>

    <van-overlay :show="showLeaguePicker"
                 @click.stop="showLeaguePicker = false"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.1)`}"
    >
      <div class="ab hide-scroll-bar scroll-y bg-white"
           :style="{width: '300px',maxHeight: '400px', top: '235px',left: '246px'}" @click.stop>
        <ul class="p-l10 p-r10 hide-scroll-bar" style="color: #5d5d5d;">
          <li class="lh-40 under-line cles-1 cursor" v-for="league of leagues" :key="league.id"
              @click="onConfirmLeague(league)">
            {{ league.name }}
          </li>
        </ul>
      </div>
    </van-overlay>

    <van-overlay :show="loading"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.7)`}">
      <van-loading v-if="loading" class="ab-middle flex-middle" size="50px"/>
    </van-overlay>
  </div>
</template>
<script>
import {format} from "../../../assets/js/util";
import {getMatchHistory} from "../../../axios/sport";
import Footer from "../../../components/Footer"
import customiseMixin from "../../../mixins/customiseMixin";

export default {
  mixins: [customiseMixin],
  data() {
    return {
      showLeaguePicker: false,
      showDatePicker: false,
      showSportPopover: false,
      sport: {},
      leagues: [],
      league: {id: 0, name: this.$t('all_m')},
      list: [],
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      loading: false,
      page: 1,
      page1: 1,
      totalPage: 1,
      pageSize: 50,
      scrollHeight: 0
    }
  },

  methods: {
    formatter(day) {
      if (day.type === 'start') {
        day.bottomInfo = this.$t('q_s');
      } else if (day.type === 'end') {
        day.bottomInfo = this.$t('j_s');
      }

      return day;
    },

    handleSizeChange(pageSize) {
      console.log('pageSize', pageSize, this.pageSize)
      this.pageSize = pageSize

      this._getMatchHistory(true)
    },

    handleCurrentChange(page) {
      console.log(typeof page);
      if (!page) {
        return;
      }
      this.page = Number(page)

      this._getMatchHistory(true)
    },

    _changeDate(date) {
      this.showDatePicker = false
      this.startDate = date[0]
      this.endDate = date[1]
      this.page = 1

      this._getMatchHistory(true)
    },

    onConfirmLeague(league) {
      this.showLeaguePicker = false

      if (this.league.id !== league.id) {
        this.league = {...league}
        this._getMatchHistory(true)
      }
    },

    _getMatchHistory(isFirst = false) {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        sport: this.sport.id,
        league: this.league.id,
        startDate: format(this.startDate, 'yyyy-MM-dd'),
        endDate: format(this.endDate, 'yyyy-MM-dd')
      }

      if (isFirst) {
        this.loading = true
      }

      getMatchHistory(params)
          .then(res => {
            this.loading = false;

            if (res.code === 200) {
              let leagues = res.data.leagues
              leagues[0].name = this.$t('all_m')
              this.leagues = leagues

              this.totalPage = Number(res.data.count)

              let list = res.data.data
                          .filter(item => item.sport_id in this.displaySportIds)
                          .sort((a, b) => b.start_time - a.start_time)

              this.list = this.serializeList(list)
            }
          })
          .catch(err => {
            console.log(err)
            this.loading = false
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
            index: arr.length,
            sport_id: item.sport_id
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

    onSelect(item) {
      console.log(item)
      this.sport = item
      this._getMatchHistory(true)
    },

    format(date, fmt) {
      return format(date, fmt)
    }
  },

  components: {
    Footer
  },

  mounted() {
    this._getMatchHistory(true)
    this.scrollHeight = window.innerHeight - 360
    window.addEventListener('resize', () => {
      this.scrollHeight = window.innerHeight - 360
    })
  },

  computed: {
    sports() {
      return [
        {text: this.$t('all'), id: ''},
        ...[
          {text: this.$t('fball'), id: '1'},
          {text: this.$t('bball'), id: '18'},
          {text: this.$t('tennis'), id: '13'},
          {text: this.$t('vball'), id: '91'},
          {text: this.$t('b_ball'), id: '16'},
          {text: this.$t('esports'), id: '151'}
        ].filter(sport => sport.id in this.displaySportIds)
      ];
    }
  },

  created() {
    this.chaheList = []
    this.sports = [
      {text: this.$t('all'), id: ''},
    ]
    this.sport = this.sports[0]
  },
}
</script>
<style type="text/css" lang="less">
.result-pc-tmp2 {
  background-color: #494949;
  color: #ddd;

  .header {
    height: 50px;
    padding: 0 36px;
  }

  .title {
    height: 50px;
    padding: 0 36px;
    border-top: 1px solid #367A65;
    border-bottom: 1px solid #367A65;
  }

  .table-header {
    padding: 0 36px;
    background: #585858;
    height: 28px;
    font-size: 12px;
  }

  .table-body-item {
    border-bottom: 1px solid #5D5D5D;
    padding: 0 36px;
    min-height: 45px;
  }

  /***分页**/

  .van-pagination {
    font-size: 12px;

    .van-pagination__item {
      color: #ddd;
      background-color: #5d5d5d;

      min-width: auto;
      height: 24px;
      padding: 0 10px;
      border-radius: 2px;
      margin: 0 4px;

      &.van-pagination__item--active {
        color: #FFDF1B !important;
      }
    }

    .van-pagination__item::after {
      border-width: 0;
    }
  }

  .van-overlay {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }

  .pagination-page-size {
    width: 90px;
    height: 26px;
    background-color: #5D5D5D;
    color: #ddd;

    &:hover {
      .pagination-page-size-list {
        display: block !important;
      }
    }
  }

  .pagination-page-size-list {
    background-color: #5D5D5D;
    padding: 0 0 0 20px;
    width: 90px;
    bottom: -55px;
    display: none;
  }

  .pagination-page-size-item {
    border-bottom: 1px solid #585858;
    padding: 5px 0;
  }

  .page-input {
    width: 44px;
    height: 20px;
    background-color: #5D5D5D;
    padding: 0;
    color: #ddd;

    .van-field__control {
      text-align: center;
      font-size: 12px;
      color: #ddd;
    }
  }

  .van-cell::after {
    border-bottom: none !important;
  }
}
</style>
