<template>
  <div class="result-pc-tmp3">
    <div class="div-1200 re record-container scroll-y hide-scroll-bar" style="overflow-x: hidden">
      <div class="ab match_select flex-items cursor">
        <img class="" src="../../../assets/images/tmp3/bet/results.png" alt="">
        <span class="gray" @click="matchsShow = !matchsShow">{{$t('y_x_s_s', {number: selectLeagueIds.length})}}</span>
        <div class="notice_jt"></div>
        <div class="ab userinfo" v-if="matchsShow">
            <div class="content pchoverstyle">
              <div class="pop_content">
                <div class="h-40 flex under-line">
                  <div class="flex-items">
                    <img class="width_em" v-if="!isCheckAll" src="../../../assets/images/tmp3/bet/no.jpg" alt="" @click="checkAll">
                    <img class="width_em" v-if="isCheckAll" src="../../../assets/images/tmp3/bet/all.jpg" alt="" @click="toggleAll">
                  </div>
                  <div class="flex-items fs12 gray flex-1">{{$t('all')}}</div>
                </div>
                <van-checkbox-group v-model="result" ref="checkboxGroup" @change="handleSelectCheckbox">
                  <van-checkbox shape="square" v-for="item of list" :key="item.league_name" :name="item.league_id">{{item.league_name}}</van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
        </div>
      </div>
      <div class="ab date_select flex-items cursor m-l16">
        <img class="" src="../../../assets/images/tmp3/bet/date.png" alt="">
        <span class="gray">{{showDate[0]}}</span> &nbsp;-  &nbsp;
        <span class="gray">{{showDate[1]}}</span>&nbsp;
        <div class="notice_jt"></div>
        <div class="ab cursor" style="right: 0; top: 6px;">
          <el-date-picker
            @change="handleChangeDate"
            size="mini"
            class="datepcikercompint"
            v-model="timeRange"
            align="right"
            type="daterange"
            :placeholder="$t('x_z_r_q')"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </div>
      <div class="pc-record-tab ab div-1200">
        <van-tabs animated v-model="active_tab" color="#7B5605" line-width="2.8rem" @click="handleChangeSport">
          <van-tab v-for="sport of sports" :key="sport.id" :title="$t(sport.text)">
            <ul class="pc-record-list">
              <li class="bg-white radius4 b-t2" v-for="item of filterList" :key="item.league_name">
                <div class="flex l-title">
                  <div class="flex-1 flex-items">
                    <span class="pc-border-l reguler record-color">{{item.league_name}}</span>
                  </div>
                </div>
                <van-row class="record_th" v-if="item.sport_id === '1'">
                  <van-col :span="4">{{$t('date')}}</van-col>
                  <van-col :span="8">{{$t('sai_c')}}</van-col>
                  <van-col :span="2" :offset="2">{{$t('s_b_c')}}</van-col>
                  <van-col :span="2">{{$t('x_b_c')}}</van-col>
                  <van-col :span="2">{{$t('j_s_s')}}</van-col>
                  <van-col :span="2">{{$t('q_c')}}</van-col>
                  <van-col :span="2">{{$t('z_t')}}</van-col>
                </van-row>

                <van-row class="record_th" v-if="item.sport_id === '18'">
                  <van-col :span="3">{{$t('date')}}</van-col>
                  <van-col :span="8">{{$t('sai_c')}}</van-col>
                  <van-col :span="1" :offset="3">{{$t('d1')}}</van-col>
                  <van-col :span="1">{{$t('d2')}}</van-col>
                  <van-col :span="1">{{$t('s_b_c')}}</van-col>
                  <van-col :span="1">{{$t('d3')}}</van-col>
                  <van-col :span="1">{{$t('d4')}}</van-col>
                  <van-col :span="1">{{$t('j_s_s')}}</van-col>
                  <van-col :span="2">{{$t('q_c')}}</van-col>
                  <van-col :span="2">{{$t('z_t')}}</van-col>
                </van-row>

                <van-row class="record_th" v-if="item.sport_id === '13'">
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

                <van-row class="record_th" v-if="item.sport_id === '91'">
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

                <van-row class="record_th" v-if="item.sport_id === '16'">
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

                <van-row class="record_th" v-if="item.sport_id === '151'">
                  <van-col :span="4">{{$t('date')}}</van-col>
                  <van-col :span="8">{{$t('sai_c')}}</van-col>
                  <van-col :span="2" :offset="8">{{$t('q_c')}}</van-col>
                  <van-col :span="2">{{$t('z_t')}}</van-col>
                </van-row>

                <div class="record_tr" v-if="item.sport_id === '1'">
                  <van-row v-for="child of item.children" :key="child.match_id">
                    <van-col :span="4">{{ $utils.format(child.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</van-col>
                    <van-col :span="8">{{ child.home_name }} v {{ child.away_name }}</van-col>
                    <van-col :span="2" :offset="2">
                      <span v-if="child.status !== 5 && child.scores && child.scores['1']">{{ child.scores['1'].home }} - {{ child.scores['1'].away }}</span>
                      <span v-else>-</span>
                    </van-col>
                    <van-col :span="2">
                      <span v-if="child.status !== 5 && child.scores && child.scores['2']">{{ child.scores['2'].home }} - {{ child.scores['2'].away }}</span>
                      <span v-else>-</span>
                    </van-col>
                    <van-col :span="2">
                      <span v-if="child.status !== 5 && child.scores && child.scores['3']">{{ child.scores['3'].home }} - {{ child.scores['3'].away }}</span>
                      <span v-else>-</span>
                    </van-col>
                    <van-col :span="2">
                      <span v-if="child.status !== 5 && child.ss">{{ child.ss.split('-')[0] }} - {{ child.ss.split('-')[1] }}</span>
                      <span v-else>-</span>
                    </van-col>
                    <van-col :span="2">{{ child.status_name }}</van-col>
                  </van-row>
                </div>

                <div class="record_tr" v-if="item.sport_id === '18'">
                  <van-row v-for="child of item.children" :key="child.match_id">
                    <van-col :span="3">{{ $utils.format(child.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</van-col>
                    <van-col :span="8">{{ child.home_name }} v {{ child.away_name }}</van-col>
                    <van-col :span="1" :offset="3">
                      <span v-if="child.scores && child.scores['1']">{{ child.scores['1'].home }}-{{ child.scores['1'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['2']">{{ child.scores['2'].home }}-{{ child.scores['2'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['3']">{{ child.scores['3'].home }}-{{ child.scores['3'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['4']">{{ child.scores['4'].home }}-{{ child.scores['4'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['5']">{{ child.scores['5'].home }}-{{ child.scores['5'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['6']">{{ child.scores['6'].home }}-{{ child.scores['6'].away }}</span>
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

                <div class="record_tr" v-if="item.sport_id === '13'">
                  <van-row v-for="child of item.children" :key="child.match_id">
                    <van-col :span="4">{{ $utils.format(child.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</van-col>
                    <van-col :span="8">{{ child.home_name }} v {{ child.away_name }}</van-col>
                    <van-col :span="2">
                      <span v-if="child.scores && child.scores['1']">{{ child.scores['1'].home }}-{{ child.scores['1'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="2">
                      <span v-if="child.scores && child.scores['2']">{{ child.scores['2'].home }}-{{ child.scores['2'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="2">
                      <span v-if="child.scores && child.scores['3']">{{ child.scores['3'].home }}-{{ child.scores['3'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="2">
                      <span v-if="child.scores && child.scores['4']">{{ child.scores['4'].home }}-{{ child.scores['4'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="2">
                      <span v-if="child.scores && child.scores['5']">{{ child.scores['5'].home }}-{{ child.scores['5'].away }}</span>
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

                <div class="record_tr" v-if="item.sport_id === '91'">
                  <van-row v-for="child of item.children" :key="child.match_id">
                    <van-col :span="4">{{ $utils.format(child.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</van-col>
                    <van-col :span="8">{{ child.home_name }} v {{ child.away_name }}</van-col>
                    <van-col :span="2">
                      <span v-if="child.scores && child.scores['1']">{{ child.scores['1'].home }}-{{ child.scores['1'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="2">
                      <span v-if="child.scores && child.scores['2']">{{ child.scores['2'].home }}-{{ child.scores['2'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="2">
                      <span v-if="child.scores && child.scores['3']">{{ child.scores['3'].home }}-{{ child.scores['3'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="2">
                      <span v-if="child.scores && child.scores['4']">{{ child.scores['4'].home }}-{{ child.scores['4'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="2">
                      <span v-if="child.scores && child.scores['5']">{{ child.scores['5'].home }}-{{ child.scores['5'].away }}</span>
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

                <div class="record_tr" v-if="item.sport_id === '16'">
                  <van-row v-for="child of item.children" :key="child.match_id">
                    <van-col :span="4">{{ $utils.format(child.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</van-col>
                    <van-col :span="7">{{ child.home_name }} v {{ child.away_name }}</van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['1']">{{ child.scores['1'].home }}-{{ child.scores['1'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['2']">{{ child.scores['2'].home }}-{{ child.scores['2'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['3']">{{ child.scores['3'].home }}-{{ child.scores['3'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['4']">{{ child.scores['4'].home }}-{{ child.scores['4'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['5']">{{ child.scores['5'].home }}-{{ child.scores['5'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['6']">{{ child.scores['6'].home }}-{{ child.scores['6'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['7']">{{ child.scores['7'].home }}-{{ child.scores['7'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['8']">{{ child.scores['8'].home }}-{{ child.scores['8'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['9']">{{ child.scores['9'].home }}-{{ child.scores['9'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['hit']">{{ child.scores['hit'].home }}-{{ child.scores['hit'].away }}</span>
                      <span v-else>--</span>
                    </van-col>
                    <van-col :span="1">
                      <span v-if="child.scores && child.scores['run']">{{ child.scores['run'].home }}-{{ child.scores['run'].away }}</span>
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

                <div class="record_tr" v-if="item.sport_id === '151'">
                  <van-row v-for="child of item.children" :key="child.match_id">
                    <van-col :span="4">{{ $utils.format(child.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</van-col>
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
              </li>
            </ul>
          </van-tab>
        </van-tabs>

        <div class="notice_page flex-middle">
          <div class="fs12 flex-middle p-l4 p-r5" style="height: 24px;border: 1px solid #bcc0cb;">{{$t('t_p', {totalPage})}}</div>

          <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="totalPage">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {DatePicker, Pagination} from 'element-ui';
import dayjs from 'dayjs';
import {format} from "../../../assets/js/util";
import {getMatchHistory} from "../../../axios/sport";
import { sports } from "../../../common/config";
import Event from '../../../event';

function timerChange(e, isRecent = false) {
    const d = new Date();
    const startDate = dayjs(d)
      .startOf('day')
      .add(-(e - 1), 'days')
      .valueOf();

    return [startDate, d];
}

export default {
  data() {
    return {
      timeRange: [new Date(), new Date()],
      pickerOptions: {
        shortcuts: [{
          text: this.$t('j_t'),
          onClick(picker) {
            const d = timerChange(1)
            const end = new Date(d[0]);
            const start = new Date(d[1]);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: this.$t('y_t'),
          onClick(picker) {
            const d = timerChange(2, true)
            const end = new Date(d[1]);
            const start = new Date(d[0]);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: this.$t('z_j_y_z'),
          onClick(picker) {
            const d = timerChange(7)
            const end = new Date(d[1]);
            const start = new Date(d[0]);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      list: [],
      selectLeagueIds: [],
      result: [],
      isCheckAll: false,
      matchsShow:false,
      currentPage: 1,
      pageSize: 100,
      sport: {id: 1},
      league: {},
      totalPage: 0
    }
  },

  computed: {
    showDate() {
      if (this.timeRange && Array.isArray(this.timeRange)) {
        return [
          format(this.timeRange[0], 'yyyy-MM-dd'),
          format(this.timeRange[1], 'yyyy-MM-dd')
        ]
      } else {
        return []
      }
    },

    filterList() {
      if(!this.selectLeagueIds.length) {
        return this.list;
      }

      let arr = [];
      let obj = {};
      this.selectLeagueIds.forEach(id => {
        obj[id] = true;
      })

      this.list.forEach(item => {
        if(obj[item.league_id]) {
          arr.push(item);
        }
      })

      return arr;
    }
  },

  methods: {
    handleChangeDate() {
      this._getMatchHistory(true)
    },

    handleSelectCheckbox(groups = []) {
      console.log('handleSelectCheckbox===>', groups)
      this.selectLeagueIds = groups;
    },

    handleChangeSport(index = 0) {
      this.sport = this.sports[index];

      console.log('sport====', this.sport)

      this.selectLeagueIds = [];
      this._getMatchHistory(true)
    },

    _getMatchHistory(isFirst = false) {
      let params = {
        page: this.currentPage,
        pageSize: this.pageSize,
        sport: this.sport.id,
        league: this.league.id,
        startDate: format(this.timeRange[0], 'yyyy-MM-dd'),
        endDate: format(this.timeRange[1], 'yyyy-MM-dd')
      }

      if (isFirst) {
        Event.$emit('loading', {loading: true});
      }

      getMatchHistory(params)
          .then(res => {
            Event.$emit('loading', {loading: false});

            if (res.code === 200) {
              let leagues = res.data.leagues
              leagues[0].name = this.$t('all_m')
              this.leagues = leagues

              this.totalPage = Number(res.data.count)

              let list = res.data.data.sort((a, b) => b.start_time - a.start_time)

              this.list = this.serializeList(list)

              console.log('this.list', this.list);
            }
          })
          .catch(err => {
            console.log(err)
            this.loading = false
            Event.$emit('loading', {loading: false});
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

    checkAll() {
      this.isCheckAll = true;
      this.$refs.checkboxGroup.toggleAll(true);
    },

    toggleAll() {
      this.isCheckAll = false;
      this.$refs.checkboxGroup.toggleAll();
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;

      this._getMatchHistory()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this._getMatchHistory()
    },
  },

  components: {
    'el-date-picker': DatePicker,
    'el-pagination': Pagination
  },

  created() {
    this.sports = sports;
  },

  mounted() {
    this._getMatchHistory(true);
  }
}
</script>
<style type="text/css" lang="less">
.result-pc-tmp3 {
  .userinfo {
    z-index: 100;
    width: 200px;
    left: -9px;
    top: 0;
    margin-top: 35px;
    display: block;
    .van-checkbox__icon{
      font-size: 16px;
    }
    .van-checkbox__icon .van-icon{
      width:16px;
      height:16px;
    }
    .van-checkbox{
      height: 34px;
    }
    .van-checkbox__icon--checked .van-icon{
      background-color: #7A5506;
      border-color: #7A5506;
    }
    .width_em{
      margin-right: 8px;
      width: 16px;
      height: 16px;
    }
  }
  >div{
    width: 1200px;
    margin: 0 auto;
    height: calc(100vh - 130px);
  }
background:#fafcfd;
  .van-tabs__nav{
    width:600px;
    margin-left: -20px;
    background: #f5fafd;
  }
  .van-tab--active {
    font-size: 14px;
    color: #7B5605 !important;
    font-weight: 700;
  }
  .notice_jt{
    width: 0;
    height: 0;
    margin-top:6px;
    border: .2rem solid #4D5872;
    border-color: #4D5872 transparent transparent transparent;
  }
  .date_select{
    right: 0;
    height: 40px;
    top: 4px;
    width: 190px;
    text-align: right;
    font-size: 12px;
    z-index: 666;
    >img{
      width:14px;
      margin-right: 8px;
    }
  }
  .match_select{
    right:206px;
    top: 16px;
    font-size: 12px;
    z-index: 666;
    >img{
      width:14px;
      margin-right: 8px;
    }
  }
  .th-1{
    width:160px;
  }
  .th-2{
    width:172px;
  }
  .th-3{
    width:120px;
  }
  .th-4{
    width:120px;
  }
  .th-5{
    width:90px;
  }
}
.pc-record-tab{
  left: 0;
  top: 0;
  width:1200px;
  padding-bottom: 50px;
}
.pc-record-list{
  padding:2px;
  margin-top:16px;
  .l-title{
    padding: 0 24px;
    height: 46px;
    font-size: 12px;
  }
  li{
    margin-bottom:16px;
    box-shadow: 0px 0px 4px 0px rgba(221,228,243,1);
  }
}
.pc-border-l{
  display: inline-block;
  padding-left: 8px;
  line-height: 1;
  border-left: 2px solid #7B5605;
}
.pc-title-r{
  line-height: 46px;
  >span:nth-of-type(3){
    padding-left: 16px;
  }
  >span:nth-of-type(4){
    padding-right: 16px;
  }
}
.record_th{
  padding: 6px 24px;
  font-size:12px;
  color:#4E5A74;
  font-weight: normal;
  background: #F3F6FA;
}
.record_tr{
  padding: 0 24px;
  font-size: 12px;
  color: #4E5772;
  >div{
    padding: 12px 0;
    border-bottom: 1px solid #DDE6EE;
  }
  >div:last-child{
    border:none;
  }
}
.pc-list-table{
  width:1152px;
  margin: 0 auto;
  th{
    height: 28px;
    font-size:12px;
    color:#4E5A74;
    font-weight: normal;
    background: #F3F6FA;
  }
  tr{
    font-size: 12px;
    color: #4E5772;
  }
  td{
    border-bottom: 1px solid #DDE6EE;
    height: 44px;
  }
  tr:last-child{
    td{
      border:none;
    }
  }
}
.notice_page{
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.record-container:after{
  display: block;
  clear:both;
  height:0;
  content: "";
  visibility: hidden;
  overflow:hidden;
}
.pop_content{
  padding: 5px 16px 0 16px
}
.datepcikercompint {
  width: 236px !important;
  opacity: 0;
  .el-range__close-icon {
    display: none;
  }
}
</style>
