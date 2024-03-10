<template>
  <div class="pc-content-width flex" style="padding: 24px 0 60px 0;">
    <div class="flex-column flex-between" style="width: 300px">
      <div class="goback flex-middle cursor full-width" @click="$router.back()">
        <img style="width: 12px; margin-right: 8px" src="../../../assets/images/tmp3/pc/index-left2.png" alt="">
        <span style="color: #4D5872" class="fspx14 bold">{{ $t('f_h_s_y') }}</span>
      </div>

      <div class="betting-content p-b16 flex-1 full-width bg-white" style="margin-top: 24px;">
        <div class="topborder"></div>
        <div style="width: 80%" class="marginauto">
          <ul class="flex flex-between" style="padding: 0 16px">
            <li class="fspx12 re cursor flex-middle" style="height: 40px;width: 25%;" v-for="cate of categories" :key="cate.name"
                @click="handleSelectCate(cate)"
                :style="{color: category.name == cate.name ? '#7B5605' : '#818796'}">
              {{ cate.alias }}
              <i class="ab-middle-x active_line" style="bottom: 0; width: 70%;" v-if="cate.name == category.name"></i>
            </li>
          </ul>
        </div>
        <div class="scroll-y hide-scroll-bar" style="max-height: 748px">
          <!-- 选择比赛，非滚球 -->
          <van-collapse v-model="activeCollapses" :border="false" accordion>
            <van-collapse-item :name="item.id" v-for="item of list" :key="item.id" :border="false" :is-link="false">
              <template #title>
                <div class="flex-between cursor">
                  <div class="flex-middle-only">
                    <p class="m-r8" style="width: 3px;height: 16px;background-color: #7b5605;border-radius: 2px;"></p>
                    <span class="fs12 bold" style="color: #7B5605;">{{ item.name }}</span>
                  </div>
                  <van-icon name="arrow-down" :style="{transform: (Array.isArray(activeCollapses) && activeCollapses.includes(item.id)) ? 'rotate(0deg)' : 'rotate(270deg)'}"></van-icon>
                </div>
              </template>
              <ul>
                <li class="selectbetli flex-middle cursor"
                    :class="{active: match.match_id === mt.id}"
                    v-for="mt of item.matches" :key="mt.id" style="margin-bottom: 12px"
                    @click="_changeMatch(mt)"
                >
                  <div class="cursor full-width flex" v-if="mt.status == '1'">
                    <div class=" fs12 flex-middle" style="color:#4D5872;height: 50px;width: 50px;">
                      <div class="fs12" style="color: #4E5772;" v-if="mt.sport == '13'">
                        <p class="center">{{$t('saip') + mt.current_set}}</p>
                        <p class="center">{{$t('saij') + mt.current_game}}</p>
                      </div>
                      <p class="fs12" style="color: #4E5772; margin-top: 0.4rem;height: 1rem;" v-else-if="mt.sport == '91'"></p>
                      <div v-else class="center">
                        <p class="fs10 center">{{mt.timer.period}}</p>
                        <count-down
                            :type="Number(mt.sport) == 1 || (mt.league_name.indexOf('CS:GO') === -1 && mt.sport == 151) ? 'up' : 'down'"
                            :time="(mt.timer.tm || 0) * 60 + (mt.timer.ts * 1 || 0)"
                            :suspend="mt.timer.tt"/>
                      </div>

                      <p class="m-l5" style="height: 32px;background: #DDE6EE;width: 1px;"></p>
                    </div>
                    <div class="p-l8 p-r5 flex-column flex-between p-t8 p-b8 flex-1" style="height: 50px;">
                      <div class="flex-between full-width fs12">
                        <p class="flex-middle-only">
                          <img :src="mt.home_logo" style="width: 0.8rem;" alt="">
                          <span class="cles-1 m-l5">{{ mt.home_name }}</span>
                        </p>

                        <div class="flex-middle-only flex-end">
                          <span style="color: #7B5605;">{{mt.ss ? mt.ss.split('-')[0] : '-'}}</span>
                          <p v-if="mt.sport == '13' || mt.sport == '91'" style="width: 1rem" class="flex-middle" v-else v-for="(s, i) in mt.scores" :key="i">{{ s && s.home }}</p>
                          <p v-if="mt.points" style="width: 1rem" class="flex-middle">{{ mt.points.split('-')[0] }}</p>
                        </div>
                      </div>

                      <div class="flex-between full-width fs12">
                        <p class="flex-middle-only">
                          <img :src="mt.away_logo" style="width: 0.8rem;" alt="">
                          <span class="cles-1 m-l4">{{ mt.away_name }}</span>
                        </p>

                        <div class="flex-middle-only">
                          <span style="color: #7B5605;">{{mt.ss ? mt.ss.split('-')[1] : '-'}}</span>
                          <p v-if="mt.sport == '13' || mt.sport == '91'" style="width: 1rem" class="flex-middle" v-else v-for="(s, i) in mt.scores" :key="i">{{ s && s.home }}</p>
                          <p v-if="mt.points" style="width: 1rem" class="flex-middle">{{ mt.points.split('-')[1] }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <van-row class="cursor full-width" v-else>
                    <van-col :span="11" class="flex-middle-only flex-end fs12" style="color:#4D5872;">
                      <span class="cles-1 m-r8">{{ mt.home_name }}</span>
                      <img :src="mt.home_logo" style="width: 0.8rem;" alt="">
                    </van-col>
                    <van-col :span="2" class="flex-middle">VS</van-col>
                    <van-col :span="11" class="flex-middle-only flex-start fs12" style="color:#4D5872;">
                      <img :src="mt.away_logo" style="width: 0.8rem;" alt="">
                      <span class="cles-1 m-l8">{{ mt.away_name }}</span>
                    </van-col>
                  </van-row>
                </li>
              </ul>
              <!--                </div>-->
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
    </div>
    <div style="width: 876px; padding-left: 24px">
      <div class="betting-content">
        <div class="topborder"></div>
        <div class="lab2">
          <div class="topbg re">
            <div class="ab-middle-x collect-content flex-middle cursor p-l4 p-r5" :class="{active: isFavorite}" @click="_favorite">
              <van-icon name="star" :color="isFavorite ? '#F0AA08' : '#ddd'"/>
              <span class="fs12 m-l4">{{$t('s_c')}}</span>
            </div>

            <div class="list1 flex-middle center" v-if="match.status != 1 || [1, 16, 18, 151].includes(Number(match.sport_id))">
              <div>
                <img style="width: 32px" :src="match.home_logo"/>
                <p class="bold fspx12" style="color: #7B5605;margin-top: 16px">{{match.home_name}}</p>
                <p class="bold fspx18" style="color: #7B5605;margin-top: 16px" v-if="match.status == 1">{{match.ss ? match.ss.split('-')[0] : '-'}}</p>
                <p class="bold fspx18" style="color: #7B5605;margin-top: 16px" v-else>-</p>
              </div>
              <!--比赛未开始-->
              <div class="fs12" style="color: #4D5872;" v-if="match.status != 1">
                <div>{{ $utils.format(match.start_time * 1000, 'MM-dd') }}</div>
                <div class="timer">{{$utils.format(match.start_time * 1000, 'hh:mm')}}</div>
                <div>{{ $t(aliasStatus(match.status)) }}</div>
              </div>

              <!--比赛进行中-->
              <div v-else style="width: 400px;color: #4D5872;">
                <div v-if="[1, 16, 18, 151].includes(Number(sport))">
                  <p class="center fs12 m-b10">{{ match.timer.period }}</p>
                  <count-down class="fs16"
                              :type="Number(sport) === 1 || (league_name.indexOf('CS:GO') === -1 && sport == 151) ? 'up' : 'down'"
                              :time="(match.timer.tm || 0) * 60 + (match.timer.ts * 1 || 0)"
                              :suspend="match.timer.tt"/>
                </div>
              </div>
              <div>
                <img style="width: 32px" :src="match.away_logo"/>
                <p class="bold fspx12" style="color: #7B5605;margin-top: 16px">{{match.away_name}}</p>
                <p class="bold fspx18" style="color: #7B5605;margin-top: 16px" v-if="match.status == 1">{{match.ss ? match.ss.split('-')[1] : '-'}}</p>
                <p class="bold fspx18" style="color: #7B5605;margin-top: 16px" v-else>-</p>
              </div>
            </div>

            <div class="list1 center" v-if="match.status == 1 && [13, 91].includes(Number(match.sport_id))">
              <div class="flex-between">
                <div class="flex-middle-only">
                  <img style="width: 32px" :src="match.home_logo"/>
                  <p class="bold fspx12" style="color: #7B5605;">{{match.home_name}}</p>
                </div>
                <div class="flex-1 flex-end p-r20">
                  <p class="right bold m-r8" style="width: 18px;color: #7B5605;">{{match.ss ? match.ss.split('-')[0] : '-'}}</p>
                  <p class="right" style="width: 20px;" v-for="(obj, k) in match.scores" :key="k">{{obj.home}}</p>
                </div>
              </div>

              <div class="flex-between">
                <div class="flex-middle-only">
                  <img style="width: 32px" :src="match.away_logo"/>
                  <p class="bold fspx12" style="color: #7B5605;">{{match.away_name}}</p>
                </div>
                <div class="flex-1 flex-end p-r20">
                  <p class="right bold m-r8" style="width: 18px;color: #7B5605;">{{match.ss ? match.ss.split('-')[1] : '-'}}</p>
                  <p class="right" style="width: 20px;" v-for="(obj, k) in match.scores" :key="k">{{obj.away}}</p>
                </div>
              </div>
            </div>
            <div class="list2" style="display: inline-block; padding: 0 24px">
              <ul class="flex flex-between">
                <li class="fspx12 lh-45 re cursor" style="height: 40px; margin-right: 32px" v-for="(item, index) of market_tabs"
                    :key="item.name" @click="selectPlay({...item, index})"
                    :style="{color: groupIndex === index ? '#7B5605' : '#818796'}">
                  {{ item.name }}
                  <i class="ab-middle-x active_line" style="bottom: 0;" v-if="index === groupIndex"></i>
                </li>
              </ul>
            </div>
          </div>
          <div class="list3 bg-white betting-content bet-detail-content" v-for="group of playList" :key="group.market_group_id">
            <div>
              <p class="pctip" style="margin-top: 18px; margin-bottom: 12px">{{ group.name }}</p>

              <!--半场/让分三项/波胆-->
              <van-row class="flex-middle-only group-nav-title bold" style="color: #4D5872;"
                       v-if="group.code === 'half_time_correct_score' ||
                  group.code === 'correct_score' ||
                  group.code === 'half_time_incorrect_score' ||
                  group.code === 'full_time_result' ||
                  group.code === 'incorrect_score' ||
                  group.code === 'basketball_point_spread_3_way'"
              >
                <van-col :span="8" class="center fs12 bold">{{ match.home_name }}</van-col>
                <van-col :span="8" class="center fs12 bold">{{$t('pingj')}}</van-col>
                <van-col :span="8" class="center fs12 bold">{{ match.away_name }}</van-col>
              </van-row>

              <!--主客队-->
              <van-row class="flex-middle-only group-nav-title m-b16" style="color: #4D5872;"
                       v-if="group.code === 'asian_handicap' ||
                       group.code === 'tennis_to_win_match' ||
                       group.code === 'tennis_set_1_winner' ||
                       group.code === 'volleyball_correct_set_score' ||
                       group.code === 'tennis_set_winner'"
              >
                <van-col :span="12" class="center fs12 bold">{{ match.home_name }}</van-col>
                <van-col :span="12" class="center fs12 bold">{{ match.away_name }}</van-col>
              </van-row>

              <!--赛盘投注主客队-->
              <van-row gutter="16" class="flex-middle-only group-nav-title m-b16" style="color: #4D5872;"
                       v-if="group.code === 'tennis_set_betting' ||
                       group.code === 'volleyball_game_lines'"
              >
                <van-col :span="8" class="center fs12 bold"></van-col>
                <van-col :offset="8" :span="8" class="center fs12 bold">{{ match.home_name }}</van-col>
                <van-col :span="8" class="center fs12 bold">{{ match.away_name }}</van-col>
              </van-row>

              <!--独赢-->
              <van-row gutter="16" class="m-t14" v-if="group.code === 'full_time_result'">
                <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">
                  <play class="play-bg flex-middle"
                        :match="match"
                        :group="group"
                        :play="findPlay('name', v,  group.markets)"
                  />
                </van-col>
              </van-row>

              <!--让球-->
              <van-row gutter="16" v-if="group.code === 'asian_handicap'">
                <van-col :span="12" v-for="v of ['h', 'a']" :key="v" class="flex-column">
                  <play class="flex-between play-bg p-l16 p-r16"
                        v-for="play of group.markets" :key="play.market_id"
                        v-if="play.header2 === v"
                        :show-handicap="true"
                        :match="match"
                        :group="group"
                        :play="play"
                  />
                </van-col>
              </van-row>

              <!--大小盘-->
              <van-row gutter="16" v-if="group.code === 'match_goals'">
                <van-col :span="12" v-for="v of ['o', 'u']" :key="v">
                  <play class="play-bg flex-between p-l16 p-r20"
                        :match="match"
                        :show-header="true"
                        :group="group"
                        :play="findPlay('header2', v,  group.markets)"
                  >
                    <div slot="header" slot-scope="{play}">
                      <span class="bold fs14 m-r8 bet-header">{{play.header}}</span>
                      <span>{{play.handicap}}</span>
                    </div>
                  </play>
                </van-col>
              </van-row>

              <!--让分3项-->
              <van-row gutter="16" class="border-bottom-line"
                       v-if="group.code === 'basketball_point_spread_3_way'">
                <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">
                  <play class="play-bg flex-middle"
                        :match="match"
                        :show-handicap="true"
                        :group="group"
                        :play="findPlay('header', v,  group.markets)"
                  />
                </van-col>
              </van-row>

              <!--正确比分/半场正确得分-->
              <van-row gutter="16"
                       v-if="group.code === 'incorrect_score' ||
                  group.code === 'correct_score' ||
                  group.code === 'half_time_incorrect_score' ||
                  group.code === 'half_time_correct_score'"
              >
                <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">
                  <play class="flex-between play-bg m-b16 p-l16 p-r10"
                        :match="match"
                        :group="group"
                        :show-name="true"
                        v-for="play of group.markets" :key="play.market_id"
                        v-if="play.header === v"
                        :play="play"
                  />
                </van-col>
              </van-row>

              <!--比赛投注模板-->
              <div v-if="isMatchBetting(group.code)">
                <van-row gutter="16" class="m-b16">
                  <van-col :span="8" class="flex-middle full-height" style="height: 38px;">
                    <span class="fs12 bold" style="color: #4D5872;">{{$t('r_f')}}</span>
                  </van-col>
                  <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                    <play class="flex-between play-bg p-l16 p-r10"
                          :match="match"
                          :group="group"
                          :show-handicap="true"
                          v-for="play of group.markets" :key="play.market_id"
                          v-if="play.name === 'Spread' && play.header === v"
                          :play="play"
                    />
                  </van-col>
                </van-row>
                <van-row gutter="16" class="m-b16">
                  <van-col :span="8" class="flex-middle full-height" style="height: 38px;">
                    <span class="fs12 bold" style="color: #4D5872;">{{$t('z_f')}}</span>
                  </van-col>
                  <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                    <play class="flex-between play-bg p-l16 p-r10"
                          :match="match"
                          :group="group"
                          :show-handicap="true"
                          v-for="play of group.markets" :key="play.market_id"
                          v-if="play.name === 'Total' && play.header === v"
                          :play="play"
                    >
                      <span slot="alias" class="fs10">{{ v === '1' ? $t('height') : $t('below') }}</span>
                    </play>
                  </van-col>
                </van-row>
                <van-row gutter="16">
                  <van-col :span="8" class="flex-middle full-height" style="height: 38px;">
                    <span class="fs12 bold" style="color: #4D5872;">{{$t('game_lines_money_line')}}</span>
                  </van-col>
                  <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                    <play class="flex-middle play-bg p-l16 p-r10"
                          :match="match"
                          :group="group"
                          v-for="play of group.markets" :key="play.market_id"
                          v-if="play.name === 'Money Line' && play.header === v"
                          :play="play"
                    />
                  </van-col>
                </van-row>
              </div>

              <!--排球-->
              <div class="" v-if="group.code === 'volleyball_game_lines'">
                <van-row gutter="16" class="m-b16">
                  <van-col :span="8" class="flex-middle full-height" style="height: 38px;">
                    <span class="fs12 bold" style="color: #4d5772;">{{$t('winner')}}</span>
                  </van-col>
                  <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                    <play class="flex-middle play-bg"
                          :match="match"
                          :group="group"
                          v-for="play of group.markets" :key="play.market_id"
                          v-if="play.name === 'to_win' && play.header === v"
                          :play="play"
                    />
                  </van-col>
                </van-row>
                <van-row gutter="16" class="m-b16">
                  <van-col :span="8" class="flex-middle full-height" style="height: 38px;">
                    <span class="fs12 bold" style="color: #4d5772;">{{$t('r_f')}}</span>
                  </van-col>
                  <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                    <play class="flex-middle play-bg"
                          :match="match"
                          :group="group"
                          :show-handicap="true"
                          v-for="play of group.markets" :key="play.market_id"
                          v-if="play.name === 'handicap_sets' && play.header === v"
                          :play="play"
                    />
                  </van-col>
                </van-row>
                <van-row gutter="16">
                  <van-col :span="8" class="flex-middle full-height" style="height: 38px;">
                    <span class="fs12 bold" style="color: #4d5772;">{{$t('z_f')}}</span>
                  </van-col>
                  <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                    <play class="flex-between play-bg p-l16 p-r10"
                          :match="match"
                          :group="group"
                          :show-handicap="true"
                          v-for="play of group.markets" :key="play.market_id"
                          v-if="play.name === 'total_points' && play.header === v"
                          :play="play"
                    >
                      <span slot="alias" class="fs10">{{ v === '1' ? $t('height') : $t('below') }}</span>
                    </play>
                  </van-col>
                </van-row>
              </div>

              <!--排球 赛局正确比分-->
              <van-row gutter="16" v-if="group.code === 'volleyball_correct_set_score'">
                <van-col :span="12" v-for="v of ['1', '2']" :key="v">
                  <play class="flex-between play-bg p-l16 p-r10 m-b16"
                        :match="match"
                        :group="group"
                        :show-name="true"
                        v-for="play of group.markets" :key="play.market_id"
                        v-if="play.header === v"
                        :play="play"
                  />
                </van-col>
              </van-row>

              <!--网球/比赛获胜-->
              <van-row gutter="16" v-if="group.code === 'tennis_to_win_match' || group.code === 'tennis_set_1_winner' || group.code === 'tennis_set_winner'">
                <van-col :span="12" v-for="v of ['1', '2']" :key="v" class="flex-column">
                  <play class="play-bg flex-middle"
                        :match="match"
                        :group="group"
                        :play="findPlay('header', v,  group.markets)"
                  />
                </van-col>
              </van-row>

              <!--网球赛盘投注-->
              <div v-if="group.code === 'tennis_set_betting'">
                <van-row gutter="16" class="m-b16" v-for="name of scoreBetSetting(group.markets)" :key="name">
                  <van-col :span="8" class="flex-middle full-height" style="height: 38px;">
                    <span class="fs12 bold" style="color: #4d5772;">{{ name }}</span>
                  </van-col>
                  <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                    <play class="flex-middle play-bg"
                          v-for="play of group.markets"
                          :key="play.market_id"
                          :match="match"
                          :group="group"
                          v-if="play.name === name && play.header === v"
                          :play="play"
                    />
                  </van-col>
                </van-row>
              </div>

              <!--排球-->
              <div v-if="group.code === 'baseball_game_lines'">
                <van-row gutter="16" class="m-b16">
                  <van-col :span="8" class="flex-middle full-height" style="height: 38px;">
                    <span class="fs12 bold" style="color: #4d5772;">{{$t('r_l')}}</span>
                  </van-col>
                  <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                    <play class="flex-middle play-bg"
                          :match="match"
                          :show-handicap="true"
                          :group="group"
                          v-for="play of group.markets" :key="play.market_id"
                          v-if="play.name === 'run_line' && play.header === v"
                          :play="play"
                    />
                  </van-col>
                </van-row>
                <van-row gutter="16" class="m-b16">
                  <van-col :span="8" class="flex-middle full-height" style="height: 38px;">
                    <span class="fs12 bold">{{$t('z_f')}}</span>
                  </van-col>
                  <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                    <play class="flex-between play-bg p-l16 p-r10"
                          :match="match"
                          :group="group"
                          :show-handicap="true"
                          v-for="play of group.markets" :key="play.market_id"
                          v-if="play.name === 'total_points' && play.header === v"
                          :play="play"
                    >
                      <span slot="alias" class="fs10">{{ v === '1' ? $t('height') : $t('below') }}</span>
                    </play>
                  </van-col>
                </van-row>
                <van-row gutter="16">
                  <van-col :span="8" class="flex-middle full-height" style="height: 38px;">
                    <span class="fs12 bold" style="color: #4d5772;">{{$t('q_r_p')}}</span>
                  </van-col>
                  <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                    <play class="play-bg flex-middle"
                          :match="match"
                          :group="group"
                          :show-handicap="true"
                          v-for="play of group.markets" :key="play.market_id"
                          v-if="play.name === 'money_line' && play.header === v"
                          :play="play"
                    >

                    </play>
                  </van-col>
                </van-row>
              </div>

              <!--电子竞技-->
              <div v-if="group.code === 'esports_match_lines'">
                <van-row gutter="16" class="m-b16">
                  <van-col :span="8" class="flex-middle full-height" style="height: 38px;">
                    <span class="fs12 bold" style="color: #4d5772;">{{$t('winner')}}</span>
                  </van-col>
                  <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                    <play class="flex-middle play-bg"
                          :match="match"
                          :group="group"
                          v-for="play of group.markets" :key="play.market_id"
                          v-if="play.name === 'to_win' && play.header === v"
                          :play="play"
                    />
                  </van-col>
                </van-row>
                <van-row gutter="16" class="m-b16">
                  <van-col :span="8" class="flex-middle full-height" style="height: 38px;">
                    <span class="fs12 bold" style="color: #4d5772;">{{$t('r_f_p')}}</span>
                  </van-col>
                  <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                    <play class="flex-between play-bg p-l16 p-r10"
                          :match="match"
                          :group="group"
                          :show-handicap="true"
                          v-for="play of group.markets" :key="play.market_id"
                          v-if="play.name === 'match_handicap' && play.header === v"
                          :play="play"
                    ></play>
                  </van-col>
                </van-row>
                <van-row gutter="16">
                  <van-col :span="8" class="flex-middle full-height" style="height: 38px;">
                    <span class="fs12 bold" style="color: #4d5772;">{{$t('d_t_s')}}</span>
                  </van-col>
                  <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                    <play class="flex-between play-bg p-l16 p-r10"
                          :match="match"
                          :group="group"
                          :show-handicap="true"
                          v-for="play of group.markets" :key="play.market_id"
                          v-if="play.name === 'total_maps' && play.header === v"
                          :play="play"
                    >
                      <span slot="alias" class="fs12">{{v === '1' ? $t('height') : $t('below')}}</span>
                    </play>
                  </van-col>
                </van-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FootBetController />
  </div>
</template>

<script>
import betDetail from "../../../mixins/betDetail";
import getBetList from "../../../mixins/getBetList";
import Play from "../../../components/Play";
import FootBetController from "../../../components/FootBetControll";
import CountDown from "../../../common/CountDown";
import {favorite} from "../../../axios/sport";

export default {
  mixins: [betDetail, getBetList],
  data() {
    return {
      sportListSheetStatus: false, // 投注详情

      groupIndex: 0,
      category: {name: 'inplay', alias: this.$t('groun')},
      sport: '1',
      league_id: '',
      league_name: '',
      activeCollapses: [],
    }
  },

  methods: {
    getMatchList() {
      const params = {
        sport: this.sport, // 1 足球 18 篮球
        category: this.category.name,
        page: 1,
        pageSize: 100,
        // league: this.league_id
      }
      console.log('this.category.name===', this.category.name)
      this._getMatches(params)
    },

    handleSelectCate(cate = {}) {
      this.category = cate;

      this.getMatchList()
    },

    _favorite() {
      // 如果没有登录
      if (!this.userInfo.userId) {
        this.$toast(this.$t('login_f'))
        return;
      }

      // 1收藏0取消
      favorite({id: this.match.match_id, favorite: this.isFavorite ? '0' : '1'})
          .then(res => {
            if (res.code === 200) {
              console.log('OK')
              this.isFavorite = !this.isFavorite
            } else {
              this.$toast(res.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
  },

  components: {
    Head: () => import('../../../components/temp3/Head'),
    Details: () => import('../../../components/temp3/PcDetails'),
    Play,
    FootBetController,
    CountDown
  },

  mounted() {
    this.getMatchList();
  },

  created() {
    this.categories = [
      {name: 'today', alias: this.$t('j_r')},
      {name: 'upcoming', alias: this.$t('z_p')},
      {name: 'inplay', alias: this.$t('groun')},
      {name: 'favorite', alias: this.$t('s_c')},
    ]
  },
}
</script>

<style scoped lang="less">
@import url('../../../assets/css/index');

.collect-content {
  height: 1rem;
  background-size: 100% 100%;
  z-index: 9999;
  border: 1px solid #ddd;
  color: #ddd;
  &.active {
    background-color: #0BE9AD;
    color: #fff;
    border: none;
  }
}

.goback {
  height: 46px;
  background-image: linear-gradient(180deg, #ECF1F7 0%, #FFFFFF 100%);
  border: 1px solid #D6DCE6;
  border-radius: 4px;
}


.list1 {
  padding: 34px 0;
}

.timer {
  height: 20px;
  background-image: linear-gradient(180deg, #F0AA08 0%, #B88306 100%);
  border-radius: 10px;
  line-height: 20px;
  display: inline-block;
  padding: 0 10px;
  margin: 8px 190px;
  .white();
}

.matchesfilter {
  .lab2 {
    padding-top: 48px;
    padding-bottom: 74px;
  }

  .lab3 {
    position: fixed;
    left: 0;
    bottom: 0;
  }
}

.itemlist {
  width: 393px;
  height: 38px;
  background: url("../../../assets/images/tmp3/pc/bet-item-bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 0 8px;

  &.active {
    background: url("../../../assets/images/tmp3/pc/bet-item-bg-active.png") no-repeat;
    background-size: 100% 100%;
    color: white !important;

    span:last-child {
      color: #f6ec23 !important;
    }
  }
}

.topbg {
  background: url("../../../assets/images/tmp3/pc/tz-bg.png") no-repeat center center;
  background-size: 106% 107%;

}

.inputint {
  width: 80px;
  height: 28px;
  background: #FFFFFF;
  border: 1px solid #BCC0CB;
  border-radius: 2px;
  padding: 0 8px;
  text-align: right;
}

.btul {
  background-image: linear-gradient(90deg, #F3F6FA 0%, #F9FBFC 100%);
  box-shadow: inset 0px -1px 0px 0px rgba(221, 230, 238, 1);
  box-shadow: inset 0px 1px 0px 0px rgba(221, 230, 238, 1);

  li {
    border-bottom: 1px solid #DDE6EE;

  }
}

.details-content {
  .btn1 {
    width: 90px;
    height: 38px;
    background-image: linear-gradient(180deg, #ECF1F7 0%, #FFFFFF 100%);
    border: 1px solid #BCC0CB;
    border-radius: 4px;
  }

  .btn2 {
    width: 274px;
    height: 38px;
    background-image: linear-gradient(180deg, #F2AC0A 0%, #B68108 100%);
    border-radius: 4px;

    &.change {
      background-image: linear-gradient(180deg, #F45F5F 0%, #C92B2B 100%);
    }
  }
}

.selectbetli {
  height: 48px;
  background: url("../../../assets/images/tmp3/select-bg.png") no-repeat;
  background-size: 100% 100%;

  &.active {
    background: url("../../../assets/images/tmp3/select-bg-active.png") no-repeat;
    background-size: 100% 100%;
  }
}

.selectbetli2 {
  height: 48px;
  background: url("../../../assets/images/tmp3/select-bg.png") no-repeat;
  background-size: 100% 100%;

  &.active {
    background: url("../../../assets/images/tmp3/select-bg-active.png") no-repeat;
    background-size: 100% 100%;
  }
}

.betting-content {
  box-shadow: 0 2px 4px 0 rgba(28, 29, 32, 0.1);
  //border-radius: 4px;
  overflow: hidden;
}

.topborder {
  height: 2px;
  background-image: linear-gradient(134deg, #F2AB06 0%, #B78008 100%);
  border-radius: 100px;
}
.bet-detail-content {
  overflow: hidden;
  //margin-top: 1px;
  //box-shadow: 0 0 4px 0 rgba(221,228,243,1);
  //border-radius: 4px;
  padding: 0 24px 20px;
}

.play-bg {
  height: 38px;
  background-image: url("../../../assets/images/tmp3/bet-item-bg.png") !important;
  background-size: 100% 100%;
  &.active {
    background-image: url("../../../assets/images/tmp3/bet-item-bg-active.png")!important;
  }
}
</style>