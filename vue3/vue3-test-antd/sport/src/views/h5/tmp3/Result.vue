<template>
  <div class="result" @click="showUserInfo = false">
    <!-- 头部 start -->
    <div class="result_title lh-48 re center fs14 bold white line_color listreturn7">
      <a href="javascript:void(0)" class="ab" @click.stop="handleClickAvatar()">
        <Avatar/>
      </a>
      {{ $t('bs_jg') }}
      <div class="r_matchs ab white fs12 center-down" @click="popWindow">
        {{ sport.text }}
      </div>

      <Dialog v-show="showUserInfo"/>
    </div>
    <!-- 头部 end -->
    <div class="list ">
      <!-- 筛选条件 start -->
      <div class="flex h-46 listreturn8 p-l16 p-r16">
        <div class="flex-1"></div>
        <!-- 赛事筛选 start -->
        <div class="w-14 re flex-items m-r16" @click="popMatches">
          <img class="w-14" src="../../../assets/images/tmp3/bet/results.png" alt="" srcset="">
          <!-- 小红点 -->
          <div class="ab w-6 h-6 radius50 bg-red red_point"></div>
        </div>
        <!-- 赛事筛选 end -->
        <!-- 日期筛选 start -->
        <div class="w-14 flex-items" @click="isShowTimeSheet = true">
          <img class="w-14" src="../../../assets/images/tmp3/bet/date.png" alt="" srcset="">
        </div>
        <!-- 日期筛选 end -->
      </div>
      <!-- 筛选条件 end -->

      <!--比赛 类型  -->
      <div class="index-continaer">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
              v-model="loading"
              :finished="finished"
              :offset="10"
              :immediate-check="false"
              finish-text="no more data"
              @load="onLoad"
          >
            <div v-for="(item, j) of renderList" :key="item.league_id" class="p-l16 p-r16">
              <div class="border_l">
                <div class="p-l4">
                  <p class="fs12 record-color bold">{{item.league_name}}</p>
                </div>
              </div>
              <ul class="result_ul box m-t12 radius4">
                <li class="under-line" style="margin-bottom: .5rem;background-color: #F3F6FA" v-for="(match, i) of item.children" :key="match.match_id">
                  <div class="flex p-l12 p-r12">
                    <div class="flex-1 p-t16 p-b16">
                      <div class="fs12 color6">{{format(match.start_time * 1000, 'yyyy-MM-dd hh:mm')}}</div>
                      <div class="fs12 gray reguler p-t4">{{ match.home_name }}</div>
                      <div class="fs12 gray reguler p-t4">{{ match.away_name }}</div>
                    </div>
                    <div class="p-t16 p-b16 right p-r15">
                      <div class="fs12 color6">{{ match.status_name }}</div>
                      <div class="fs12 gray reguler p-t4">
                        <span v-if="match.status !== 5 && match.ss">{{ match.ss.split('-')[0] }}</span>
                        <span v-else>-</span>
                      </div>
                      <div class="fs12 gray reguler p-t4">
                        <span v-if="match.status !== 5 && match.ss">{{ match.ss.split('-')[1] }}</span>
                        <span v-else>-</span>
                      </div>
                    </div>
                    <div class="flex-items" @click="_showResultDetail(j, i)">
                      <img class="w-14" :class="{rotate: detailIndex.indexOf(`${j}-${i}`) > -1}" src="../../../assets/images/tmp3/bet/r_more.png" alt="" srcset="">
                    </div>
                  </div>
                  <div class="result_hide" v-show="detailIndex.indexOf(`${j}-${i}`) > -1">
                    <!--足球-->
                    <div v-if="match.sport_id === '1'">
                      <div class="flex-middle fs12 gray reguler h-32 under-line center">
                        <div class="flex-1">{{ $t('s_b_c') }}</div>
                        <div class="flex-1">{{ $t('x_b_c') }}</div>
                        <div class="flex-1">{{ $t('j_s_s') }}</div>
                        <div class="flex-1">{{ $t('q_c') }}</div>
                      </div>
                      <div class="flex-middle fs12 gray reguler h-32 center">
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['1']">{{ match.scores['1'].home }} - {{ match.scores['1'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['2']">{{ match.scores['2'].home }} - {{ match.scores['2'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['3']">{{ match.scores['3'].home }} - {{ match.scores['3'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.ss">{{ match.ss.split('-')[0] }} - {{ match.ss.split('-')[1] }}</span>
                          <span v-else>-</span>
                        </div>
                      </div>
                    </div>

                    <!--篮球-->
                    <div v-if="match.sport_id === '18'">
                      <div class="flex-middle fs12 gray reguler h-32 under-line center">
                        <div class="flex-1">{{ $t('d1') }}</div>
                        <div class="flex-1">{{ $t('d2') }}</div>
                        <div class="flex-1">{{ $t('s_b_c') }}</div>
                        <div class="flex-1">{{ $t('d3') }}</div>
                        <div class="flex-1">{{ $t('d4') }}</div>
                        <div class="flex-1">{{ $t('j_s_s') }}</div>
                      </div>
                      <div class="flex-middle fs12 gray reguler h-32 center">
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['1']">{{ match.scores['1'].home }} - {{ match.scores['1'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['2']">{{ match.scores['2'].home }} - {{ match.scores['2'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['3']">{{ match.scores['3'].home }} - {{ match.scores['3'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['4']">{{ match.scores['4'].home }} - {{ match.scores['4'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['5']">{{ match.scores['5'].home }} - {{ match.scores['5'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                           <span v-if="match.status !== 5 && match.scores && match.scores['6']">{{ match.scores['6'].home }} - {{ match.scores['6'].away }}</span>
                          <span v-else>-</span>
                        </div>
                      </div>
                    </div>

                    <!--网球-->
                    <div v-if="match.sport_id === '13'">
                      <div class="flex-middle fs12 gray reguler h-32 under-line center">
                        <div class="flex-1">{{ $t('j1') }}</div>
                        <div class="flex-1">{{ $t('j2') }}</div>
                        <div class="flex-1">{{ $t('j3') }}</div>
                        <div class="flex-1">{{ $t('j4') }}</div>
                        <div class="flex-1">{{ $t('j5') }}</div>
                        <div class="flex-1">{{ $t('z_b_f') }}</div>
                      </div>
                      <div class="flex-middle fs12 gray reguler h-32 center">
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['1']">{{ match.scores['1'].home }} - {{ match.scores['1'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['2']">{{ match.scores['2'].home }} - {{ match.scores['2'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['3']">{{ match.scores['3'].home }} - {{ match.scores['3'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['4']">{{ match.scores['4'].home }} - {{ match.scores['4'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['5']">{{ match.scores['5'].home }} - {{ match.scores['5'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.ss">{{ match.ss.split('-')[0] }} - {{ match.ss.split('-')[1] }}</span>
                          <span v-else>-</span>
                        </div>
                      </div>
                    </div>

                    <!--排球-->
                    <div v-if="match.sport_id === '91'">
                      <div class="flex-middle fs12 gray reguler h-32 under-line center">
                        <div class="flex-1">{{ $t('j1') }}</div>
                        <div class="flex-1">{{ $t('j2') }}</div>
                        <div class="flex-1">{{ $t('j3') }}</div>
                        <div class="flex-1">{{ $t('j4') }}</div>
                        <div class="flex-1">{{ $t('j5') }}</div>
                        <div class="flex-1">{{ $t('z_b_f') }}</div>
                      </div>
                      <div class="flex-middle fs12 gray reguler h-32 center">
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['1']">{{ match.scores['1'].home }} - {{ match.scores['1'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['2']">{{ match.scores['2'].home }} - {{ match.scores['2'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['3']">{{ match.scores['3'].home }} - {{ match.scores['3'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['4']">{{ match.scores['4'].home }} - {{ match.scores['4'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.scores && match.scores['5']">{{ match.scores['5'].home }} - {{ match.scores['5'].away }}</span>
                          <span v-else>-</span>
                        </div>
                        <div class="flex-1">
                          <span v-if="match.status !== 5 && match.ss">{{ match.ss.split('-')[0] }} - {{ match.ss.split('-')[1] }}</span>
                          <span v-else>-</span>
                        </div>
                      </div>
                    </div>

                    <!--棒球-->
                    <div v-if="match.sport_id === '16'">
                      <div>
                        <div class="flex-middle fs12 gray reguler h-32 under-line center">
                          <div class="flex-1">{{ $t('j1') }}</div>
                          <div class="flex-1">{{ $t('j2') }}</div>
                          <div class="flex-1">{{ $t('j3') }}</div>
                          <div class="flex-1">{{ $t('j4') }}</div>
                          <div class="flex-1">{{ $t('j5') }}</div>
                        </div>
                        <div class="flex-middle fs12 gray reguler h-32 center">
                          <div class="flex-1">
                            <span v-if="match.status !== 5 && match.scores && match.scores['1']">{{ match.scores['1'].home }} - {{ match.scores['1'].away }}</span>
                            <span v-else>-</span>
                          </div>
                          <div class="flex-1">
                            <span v-if="match.status !== 5 && match.scores && match.scores['2']">{{ match.scores['2'].home }} - {{ match.scores['2'].away }}</span>
                            <span v-else>-</span>
                          </div>
                          <div class="flex-1">
                            <span v-if="match.status !== 5 && match.scores && match.scores['3']">{{ match.scores['3'].home }} - {{ match.scores['3'].away }}</span>
                            <span v-else>-</span>
                          </div>
                          <div class="flex-1">
                            <span v-if="match.status !== 5 && match.scores && match.scores['4']">{{ match.scores['4'].home }} - {{ match.scores['4'].away }}</span>
                            <span v-else>-</span>
                          </div>
                          <div class="flex-1">
                            <span v-if="match.status !== 5 && match.scores && match.scores['5']">{{ match.scores['5'].home }} - {{ match.scores['5'].away }}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                        <div class="flex-middle fs12 gray reguler h-32 under-line center">
                          <div class="flex-1">{{ $t('j6') }}</div>
                          <div class="flex-1">{{ $t('j7') }}</div>
                          <div class="flex-1">{{ $t('j8') }}</div>
                          <div class="flex-1">{{ $t('j9') }}</div>
                          <div class="flex-1">{{ $t('s_l')}}</div>
                          <div class="flex-1">{{ $t('a_d')}}</div>
                        </div>
                        <div class="flex-middle fs12 gray reguler h-32 center">
                          <div class="flex-1">
                            <span v-if="match.status !== 5 && match.scores && match.scores['6']">{{ match.scores['6'].home }} - {{ match.scores['6'].away }}</span>
                            <span v-else>-</span>
                          </div>
                          <div class="flex-1">
                            <span v-if="match.status !== 5 && match.scores && match.scores['7']">{{ match.scores['7'].home }} - {{ match.scores['7'].away }}</span>
                            <span v-else>-</span>
                          </div>
                          <div class="flex-1">
                            <span v-if="match.status !== 5 && match.scores && match.scores['8']">{{ match.scores['8'].home }} - {{ match.scores['8'].away }}</span>
                            <span v-else>-</span>
                          </div>
                          <div class="flex-1">
                            <span v-if="match.status !== 5 && match.scores && match.scores['9']">{{ match.scores['9'].home }} - {{ match.scores['9'].away }}</span>
                            <span v-else>-</span>
                          </div>
                          <div class="flex-1">
                            <span v-if="match.status !== 5 && match.scores && match.scores['hit']">{{ match.scores['hit'].home }} - {{ match.scores['hit'].away }}</span>
                            <span v-else>-</span>
                          </div>
                          <div class="flex-1">
                            <span v-if="match.status !== 5 && match.scores && match.scores['run']">{{ match.scores['run'].home }} - {{ match.scores['run'].away }}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>

    <!-- 筛选体育项目 -->
    <van-action-sheet v-model="popShow" :title="$t('s_ty')" :style="{ height: '40%' }" @closed="selectSport">
      <div class="sheet-content">
        <van-radio-group v-model="sport_id">
          <van-cell-group>
            <van-cell v-for="item of sports" :key="item.id" :title="item.text" clickable
                      @click.stop="checkRadio(item)" :style="{color: sport.id === item.id ? '#7B5605' : '#4E5772'}">
              <template #right-icon>
                <van-radio :name="item.id" checked-color="#7B5605"/>
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-action-sheet>

    <!-- 筛选赛事 -->
    <van-action-sheet v-model="popMatchesShow" :title="$t('s_ss')" :style="{ height: '90%' }" @close="league = {}">
      <div class="sheet-content">
        <div class="select_project">
          <div class=""></div>
          <div class="h-40 flex under-line">
            <div class="flex-items fs12 gray flex-1">{{ $t('all') }}</div>
            <div class="flex-items">
              <img class="width_em" v-if="!isCheckAll" src="../../../assets/images/tmp3/bet/no.jpg" @click="checkAll">
              <img class="width_em" v-if="isCheckAll" src="../../../assets/images/tmp3/bet/all.jpg" @click="checkAll">
            </div>
          </div>
        </div>
        <van-checkbox-group ref="checkboxGroup" v-model="leagueIds">
          <van-cell-group>
            <van-cell
                v-for="(item, index) of list"
                clickable
                :key="index"
                :title="item.league_name"
                @click.stop
            >
              <template #right-icon>
                <van-checkbox :name="item.league_id" ref="checkboxes" shape="square" checked-color="#7B5605"/>
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <div class="h-37"></div>
        <div class="h-37"></div>
        <div class="match_btn h-37">
          <van-button color="linear-gradient(to bottom, #F2AC0A, #B68108)" block class="h-37"
                      @click="onConfirmLeague">{{ $t('q_r') }}
          </van-button>
        </div>
      </div>
    </van-action-sheet>

    <van-action-sheet v-model="isShowTimeSheet" :title="$t('x_z_r_q')">
      <div class="flex-middle" style="margin-top: 1rem">
        <div class="timer-round center fs12" @click="setIntervalTime(1)">{{ $t('j_t') }}</div>
        <div class="timer-round center fs12" @click="setIntervalTime(2, true)">{{ $t('y_t') }}</div>
        <div class="timer-round center fs12" @click="setIntervalTime(7)">{{ $t('z_j_y_z') }}</div>
      </div>
      <div class="flex-middle p-l16 p-r16" style="margin: 1.2rem 0;">
        <div
            class="show-time-continaer fs14 center bold"
            :class="{active: currentSelectLabel === 0}"
            @click="changeCurrentTime(0)">{{ format(minIntervalTime, 'yyyy/MM/dd') }}
        </div>
        <div class="flex-1 center">—</div>
        <div
            class="show-time-continaer fs14 center bold"
            :class="{active: currentSelectLabel === 1}"
            @click="changeCurrentTime(1)">{{ format(maxIntervalTime, 'yyyy/MM/dd') }}
        </div>
      </div>
      <div class="vandatetimecontiner">
        <van-datetime-picker
            v-model="currentDate"
            type="date"
            :title="$t('s_dyr')"
            :min-date="minDate"
            :max-date="maxDate"
        />
      </div>
      <div class="full-width bg-white" style="padding: .6rem;">
        <div @click="onConfirmDate" class="submit public-btn flex-middle fs14" style="height: 1.9rem; ">
          {{ $t('q_r') }}
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import {mapState, mapMutations} from "vuex";
import {format} from '../../../assets/js/util'
import {setWindowScrollContentHeight} from '../../../assets/js/util';
import {getMatchHistory} from "../../../axios/sport";
import dayjs from 'dayjs';

export default {
  mixins: [],
  data() {
    const now = new Date();
    return {
      isShow: false,
      popShow: false,
      isShowTimeSheet: false,
      popMatchesShow: false,
      minDate: new Date(now.getFullYear() - 1, 0, 1),
      maxDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      currentDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      minIntervalTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7), // 选择的最小时间
      maxIntervalTime: new Date(now.getFullYear(), now.getMonth(), now.getDate()), // 选择的最大时间
      currentSelectLabel: 0, // 0 是最小的时间框， 1是最大的时间框
      sport: {text: this.$t('fball'), id: 1},
      sport_id: 1,
      leagueIds: [], // 选择联赛
      leagues: [],
      result: [],
      renderList: [],
      list: [], // 请求的列表      
      loading: false,
      finished: false, // 是否已加载完成，加载完成后不再触发load事件      
      refreshing: false, // 下拉状态      
      page: 1,
      detailIndex: [],
      showUserInfo: false,
      isCheckAll: false
    }
  },

  computed: {
    ...mapState(['userInfo']),
    sports() {
      return [
        {text: this.$t('all'), id: 0},
        {text: this.$t('fball'), id: 1},
        {text: this.$t('bball'), id: 18},
        {text: this.$t('tennis'), id: 13},
        {text: this.$t('vball'), id: 91},
        {text: this.$t('b_ball'), id: 16},
        {text: this.$t('esports'), id: 151},
      ];
    }
  },

  watch: {
    currentDate(n) {
      if (this.currentSelectLabel === 0) {
        this.minIntervalTime = n;
      } else {
        this.maxIntervalTime = n;
      }
    }
  },

  methods: {
    ...mapMutations({
      updateBet: 'UPDATE_BET',
    }),

    checkRadio(item) {
      console.log('checkRadio===', item)
      this.sport = item;
      this.popWindow()
      this.onRefresh()
    },

    checkAll() {
      this.isCheckAll = !this.isCheckAll
      console.log(this.leagueIds)
      if (this.isCheckAll) {
        this.leagueIds = this.list.map(item => item.league_id)
      } else {
        this.leagueIds = []
      }
    },

    handleClickAvatar() {
      if(this.userInfo.userId) {
        this.showUserInfo = true
      } else {
        this.$toast(this.$t('login_f'))
      }
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

    filterList() {
      const list = this.list.slice()
      if (this.leagueIds.length) {
        this.renderList =  list.filter(item => this.leagueIds.includes(item.league_id))
      } else {
        this.renderList = list
      }
    },

    // 选择联赛
    onConfirmLeague() {
      this.popMatchesShow = false;
      this.filterList()
    },

    // 选择日期
    onConfirmDate() {
      this.isShowTimeSheet = false;
      this.onRefresh()
    },

    onRefresh() {
      // 清空列表数据
      this.finished = false
      this.refreshing = true
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.list = [];
      this.page = 1
      this.onLoad()

      console.log('onRefresh')
    },

    onLoad(isFirst = false) {
      let params = {
        page: this.page,
        pageSize: 100,
        sport: this.sport.id || '',
        league: this.leagueIds.join(','),
        startDate: this.$utils.format(this.minIntervalTime, 'yyyy-MM-dd'),
        endDate: this.$utils.format(this.maxIntervalTime, 'yyyy-MM-dd')
      }

      console.log('this.startDate', params.startDate)
      console.log('this.endDate', params.endDate)
      console.log('this.list', this.list.length)

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
              this.leagues = res.data.leagues;

              this.chaheList = [...this.chaheList, ...res.data.data]
                  .sort((a, b) => b.start_time - a.start_time)

              this.list = this.serializeList(this.chaheList)

              console.log('this.list===', this.list.length)
              this.filterList()

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

    format,

    setIntervalTime(val, bool) {
      this.minIntervalTime = new Date(this.timerChange(val, bool)[0])
      this.maxIntervalTime = new Date(this.timerChange(val, bool)[1])

      this.currentDate = this.currentSelectLabel === 0 ? this.minIntervalTime : this.maxIntervalTime;
    },

    timerChange(e, isRecent = false) {
      const d = new Date();
      const startDate = dayjs(d)
          .startOf('day')
          .add(-(e - 1), 'days')
          .valueOf();
      const endDate = dayjs(d).endOf('day').add(0, 'days').valueOf();
      if (isRecent) {
        const end = dayjs(d).endOf('day').add(-1, 'days').valueOf();
        return [startDate, end];
      }
      return [startDate, endDate];
    },

    setWindowHeight() {
      setTimeout(() => {
        setWindowScrollContentHeight([
          document.querySelector('.listreturn7'),
          document.querySelector('.listreturn8'),
          document.querySelector('.van-hairline--top-bottom')
        ]);
      }, 30)
    },

    changeCurrentTime(val) {
      this.currentSelectLabel = val;
      // 动态改变currentDate的值
      if (this.currentSelectLabel === 0) {
        this.currentDate = this.minIntervalTime;
      } else {
        this.currentDate = this.maxIntervalTime;
      }
    },

    popWindow() {
      this.popShow = !this.popShow;
    },

    selectSport() {
      console.log('selectSport closed', this.sport)
      this.onRefresh();
    },

    popMatches() {
      this.popMatchesShow = !this.popMatchesShow;

    },
  },

  components: {
    Avatar: () => import('../../../components/temp3/Avatar'),
    Dialog: () => import('../../../components/temp3/Dialog'),
  },

  mounted() {
    this.setWindowHeight();
    this.onRefresh();
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
.vandatetimecontiner {
  padding: 0 3rem;

  .van-picker__toolbar {
    display: none;
  }

  .van-picker-column__item--selected {
    color: #7B5605;
  }
}

.van-checkbox__icon .van-icon {
  width: 1rem !important;
  height: 1rem !important;
}

.timer-round {
  widows: 3.2rem;
  height: 1.4rem;
  border-radius: 1rem;
  line-height: 1.4rem;
  border: 1px solid #BCC0CB;
  color: #4E5772;
  padding: 0 1rem;
  margin: 0 .3rem;
}

.show-time-continaer {
  width: 7.5rem;
  height: 1.5rem;
  background: #FFFFFF;
  border: 1px solid #4D5872;
  border-radius: .1rem;
  color: #4D5872;
  line-height: 1.5rem;

  &.active {
    border: 1px solid #7B5605;
    color: #7B5605;
  }
}

.result {
  .van-popup__close-icon {
    color: #4D5772;
  }

  .downupBefore {
    display: block;
    content: '';
    border-width: .22rem .22rem .22rem .22rem;
    border-style: solid;
    position: absolute;
    right: 0;
    top: 1.1rem;
  }

  .center-down {
    padding-right: .7rem;

    &::before {
      border-color: #fff transparent transparent transparent;
      .downupBefore();
    }
  }

  .r_matchs {
    width: 5rem;
    height: 2.4rem;
    right: .8rem;
    top: 0;
    text-align: right;
  }

  .list {

  }

  .border_l {
    border-left: .1rem solid #7B5605;

    > div > p {
      line-height: 1;
    }
  }

  .red_point {
    right: -0.1rem;
    top: .7rem;
  }

  .result_title {
    a {
      top: 0;
      left: .8rem;
    }

    img {
      padding-top: .7rem
    }
  }

  .result_ul {
    margin-bottom: 1.2rem;

    li:last-child {
      border: none
    }
  }

  .result_hide {
    padding: 0 .6rem;
    background-image: linear-gradient(#ECF1F7, #FFFFFF);
  }

  .select_project {
    padding: 0 .7rem;
  }

  .van-cell::after {
    border: none;
  }

  .van-hairline--top-bottom::after {
    border: none;
  }

  .match_btn {
    position: fixed;
    width: 100%;
    height: 3.2rem;
    padding: 0 0.8rem;
    bottom: 0;
    left: 0;
    background: white;
  }
}

.width_em {
  width: 1rem;
  height: 1rem;
}
</style>
