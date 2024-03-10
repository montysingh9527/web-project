<template>
  <div class="home-pc-tmp3">
    <!-- banner -->
    <div class="banner">
      <el-carousel :interval="5000" arrow="always" class="full-height">
        <el-carousel-item v-for="banner of projectConfig.pcSlideList" :key="banner.pic">
          <img class="full-height marginauto block" :src="banner.pic" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 滚动 -->
    <div class="slider_div">
      <div @click="$router.push('/index/notice')">
        <van-notice-bar
            left-icon="volume-o"
            scrollable
        >
          <p v-html="scrollNotices"></p>
        </van-notice-bar>
      </div>

    </div>
    <!-- tab -->
    <div style="min-width: 400px; max-width: 500px; padding: 20px 0" class="marginauto">
      <ul class="flex p-l20 p-r20 flex-between">
        <li class="fspx12 lh-35 re cursor" v-for="sport of sports" :key="sport.id"
            @click="handleSelectSport(sport)"
            :style="{color: active_sport.id == sport.id ? '#7B5605' : '#818796'}"
        >
          {{ $t(sport.text) }}
          <i class="ab-middle-x active_line" v-if="active_sport.id == sport.id"></i>
        </li>
      </ul>
    </div>

    <!-- 内容部分 -->
    <main class="flex pc-content-width">
      <div style="width: 792px;">
        <!-- 精选比赛 -->
        <div v-if="!showAllMatch">
          <!-- 滚球盘 -->
          <div>
            <div class="flex" style="margin: 0 0 16px 0">
              <img style="width: 20px; margin-right: 8px" src="../../../assets/images/tmp3/pc/live.png" alt="">
              <span class="fspx16 bold" style="color: #4D5872">{{ $t('ground') }}</span>
            </div>
            <div class="gunqiucontent flex-middle" style="overflow: hidden">
              <div class="flex-middle tips" @click="scrollX(true)">
                <img style="width: 12px;" src="../../../assets/images/tmp3/pc/index-left2.png" alt="">
              </div>
              <div class="flex-1" style="width: 0">
                <ul class="scroll-ul-continaer flex-start scroll-x hide-scroll-bar" style="max-width: 100%;">
                  <li class="ground-item re cursor" v-for="item of groundMatches" :key="i"
                      @click="_toDetail(item.match, item.league)">
                    <div class="flex-between fspx12 full-height" style="padding: 0 12px;">
                      <div class="colum-left flex full-height">
                        <p class="pc-tip van-ellipsis" style="width: 127px;">{{ item.league.name }}</p>
                        <div class="flex-middle-only m-t20" style="width: 170px;">
                          <img v-if="item.match.home_logo" :src="item.match.home_logo" alt="">
                          {{ item.match.home_name }}
                        </div>
                        <div class="vs">VS</div>
                        <div class="flex-middle-only" style="width: 170px;">
                          <img v-if="item.match.away_logo" :src="item.match.away_logo" alt="">
                          {{ item.match.away_name }}
                        </div>
                      </div>
                      <div class="right colum-right re">
                        <!--网球-->
                        <p class="van-ellipsis fs12 ab" style="right: -2px;top:8px;width: auto;" v-if="item.sport == 13">
                          {{$t('saip')}} {{item.match.current_set}}
                          {{$t('saij')}} {{item.match.current_game}}
                        </p>

                        <!--排球-->
                        <p class="van-ellipsis fs12 ab" style="right: -2px;top:8px;width: auto;" v-else-if="item.sport == 91">
                          {{$t('saij')}} {{item.match.current_set}}
                        </p>

                        <div v-else class="van-ellipsis fs12 ab" style="right: -10px;top:8px;">
                          {{ item.match.timer && item.match.timer.period }}
                          <count-down
                              class="m-r8"
                              :type="(Number(item.match.sport) === 1 || (item.league.name.indexOf('CS:GO') === -1) && item.sport == '151') ? 'up':'down'"
                              v-if="String(item.match.status) === '1'"
                              :time="(item.match.timer.tm || 0) * 60 + (item.match.timer.ts * 1 || 0)"
                              :suspend="item.match.timer.tt"/>
                        </div>

                        <div class="ab white" style="width: 43px;top: 30px;height: 17px;right: -9px;">
                          <span class="ab-middle" v-if="item.match.ss && [1, 18, 91, 151].includes(item.sport)">
                            {{item.match.ss.split('-')[0] + ':' + item.match.ss.split('-')[1] }}
                          </span>
                          <span class="ab-middle" v-if="item.match.ss && [13, 16].includes(item.sport)">
                            {{item.match.ss.split('-')[0] + ':' + item.match.ss.split('-')[1] }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="flex-middle tips" @click="scrollX(false)">
                <img style="width: 12px;transform: rotate(180deg)" src="../../../assets/images/tmp3/pc/index-left2.png"
                     alt="">
              </div>
            </div>
          </div>
          <!-- 热门比赛 -->
          <div>
            <div class="flex" style="margin: 20px 0 16px 0">
              <img style="width: 20px; margin-right: 8px" src="../../../assets/images/tmp3/pc/hot.png" alt="">
              <span class="fspx16 bold" style="color: #4D5872">{{ $t('rm_bs') }}</span>
            </div>
            <ul style="max-width: 100%;" class="hotul">
              <li class="ground-item2 re full-width cursor" style="margin-bottom: 8px;" v-for="match of hotMatches"
                  :key="match.match_id" @click="_toDetail(match)">
                <div class="content flex fspx12" style="padding: 0 20px">
                  <div class="colum-left flex ">
                    <p class="pc-tip van-ellipsis">{{ match.league_name }}</p>
                  </div>
                  <div class="right colum-right">
                    <p>{{ $utils.format(match.start_time * 1000, 'yyyy/MM/dd hh:mm:ss') }}</p>
                  </div>
                </div>
                <div class="flex-middle fspx12 list-content" style="padding: 0 20px">
                  <div class="center list">
                    <img class="m-b8" :src="match.home_logo" alt="">
                    <p>{{ match.home_name }}</p>
                  </div>
                  <div>vs</div>
                  <div class="center list">
                    <img class="m-b8" :src="match.away_logo" alt="">
                    <p>{{ match.away_name }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 全部比赛 -->
        <div v-else>
          <div class="flex-middle-only">
            <p class="flex-middle-only fs16" style="color: #4D5872;">
              <img class="m-r8" style="width: 20px;" src="../../../assets/images/tmp3/pc/all_match_icon.png" alt="">
              {{ $t('a_m') }}
            </p>
            <p class="m-l16 m-r16" style="width: 1px;height: 12px;background-color: #DDE6EE;"></p>
            <ul class="flex-between" style="min-width: 160px;">
              <li class="cursor p-l8 p-r8" v-for="cate of categories" :key="cate.name"
                  :style="{color: cate.name === category.name ? '#7B5605': '#818796'}"
                  @click="handleSelectCate(cate)">{{ $t(cate.alias) }}
              </li>
            </ul>
          </div>
          <div class="matche-ul p-r10 p-l10 m-t14" v-for="league of filterLeagues" :key="league.id">
            <div class="flex full-width center" style="color: #4D5872">
              <div class="flex-1 left">
                <p class="tip" style="display: inline-block;">{{ league.name }}</p>
              </div>

              <div class="flex" v-if="league.sport === '1'">
                <div class="wid flex-middle fspx12" v-for="nav of ['1x2', 'game_lines_spread', 'match_goals']"
                     :key="nav">{{ $t(nav) }}
                </div>
              </div>
              <div class="flex" v-if="league.sport === '18'">
                <div class="wid flex-middle fspx12"
                     v-for="nav of ['game_lines_spread', 'game_lines_total', 'game_lines_money_line']" :key="nav">
                  {{ $t(nav) }}
                </div>
              </div>
              <div class="flex" v-if="league.sport === '13'">
                <div class="flex-middle fspx12" style="width: 260px;" v-for="nav of ['1', '2']" :key="nav">
                  {{ $t(nav) }}
                </div>
              </div>
              <div class="flex" v-if="league.sport === '91'">
                <div class="wid flex-middle fspx12" v-for="nav of ['winner', 'game_lines_total', 'rang_f_j']"
                     :key="nav">{{ $t(nav) }}
                </div>
              </div>
              <div class="flex" v-if="league.sport === '16'">
                <div class="wid flex-middle fspx12" v-for="nav of ['r_l', 'game_lines_total', 'game_lines_money_line']"
                     :key="nav">{{ $t(nav) }}
                </div>
              </div>
              <div class="flex" v-if="league.sport === '151'">
                <div class="wid flex-middle fspx12" v-for="nav of ['winner', 'game_lines_spread', 'd_t_s']" :key="nav">
                  {{ $t(nav) }}
                </div>
              </div>
              <div style="width:6px"></div>
            </div>
            <div v-for="match of league.matches" :key="match.id" class="li flex full-width center"
                 style="color: #7B5605; margin-top: 8px">
              <div class="l1 flex-1 flex-middle cursor" @click="_toDetail(match, league)">
                <div style="color: #4D5872" class="full-width full-height left p-l16 p-r16">
                  <div style="color: #4D5872; margin-top: 8px" class="fspx12">
                    <span v-if="match.status != 1">{{ $utils.format(match.start_time * 1000, 'MM/dd hh:mm') }}</span>
                    <div v-else>
                      <p v-if="match.sport == '13'">
                        {{$t('saip') + match.current_set + $t('saij') + match.current_game}}
                      </p>

                      <p v-if="match.sport == '16'">
                        {{$t('saip') + match.current_set + match.timer.period}}
                      </p>

                      <p v-if="match.sport == '91'" style="height: 20px;"></p>

                      <p v-if="[1,18,151].includes(Number(match.sport))">
                        <span>{{match.timer.period}}</span>
                        <count-down :type="match.sport == 1 || (match.league_name.indexOf('CS:GO') === -1 && match.sport == 151) ? 'up' : 'down'"
                                    :time="(match.timer.tm || 0) * 60 + (match.timer.ts * 1 || 0)"
                                    :suspend="match.timer.tt"/>
                      </p>
                    </div>
                  </div>
                  <div class="flex-middle-only flex-1 fspx12" style="margin-top: 16px; color: #4D5872">
                    <img style="width: 14px; margin-right: 4px" :src="match.home_logo" alt="">
                    <div class="flex-between flex-1">
                      <p class="van-ellipsis" style="max-width: 120px;">{{ match.home_name }}</p>
                      <div style="color: rgb(123, 86, 5);" v-if="match.status == 1 && [1,18,16,151].includes(Number(match.sport))">
                        {{match.ss && match.ss.split('-')[0]}}
                      </div>
                      <div class="flex" v-if="match.status == 1 && (match.sport == 13 || match.sport == 91)">
                        <p class="right" style="width: 18px;" v-for="(obj, k) in match.scores" :key="k">{{obj.home}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex-middle-only flex-1 fspx12" style="margin-top: 6px; color: #4D5872">
                    <img style="width: 14px; margin-right: 4px" :src="match.away_logo" alt="">
                    <div class="flex-between flex-1">
                      <p class="van-ellipsis" style="max-width: 120px;">{{ match.away_name }}</p>
                      <div style="color: rgb(123, 86, 5);" v-if="match.status == 1 && [1,18,16,151].includes(Number(match.sport))">
                        {{match.ss && match.ss.split('-')[1]}}
                      </div>
                      <div class="flex" v-if="match.status == 1 && (match.sport == 13 || match.sport == 91)">
                        <p class="right" style="width: 18px;" v-for="(obj, k) in match.scores" :key="k">{{obj.away}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex " style="align-items: center; color: #7B5605;margin-top: 12px"
                       @click="$router.push('/index/betting')">
                    <img style="width: 14px" src="../../../assets/images/tmp3/not-collect.png" alt="">
                    <span class="fspx12 m-l8" style="margin-right: 4px">{{ match.market_group_count }}</span>
                    <span class="fspx12 re" style="top: -1.6px">></span>
                  </div>
                </div>
              </div>

              <!--足球-->
              <div class="flex" v-if="match.sport == 1">
                <div class="wid flex b-r">
                  <!--独赢-->
                  <div class="full-width b-b" style="height: 2rem;" v-for="k of ['1', '2', 'x']" :key="k">
                    <play v-if="match.market_groups['full_time_result']"
                          class="flex-middle"
                          :play="match.market_groups['full_time_result'][k]"
                          :group="match.market_groups['full_time_result']"
                          :match="match"
                    />
                  </div>
                </div>
                <div class="wid flex b-r">
                  <!--比赛进球-->
                  <div class="flex-column flex-1 full-width b-b" style="height: 3rem;width: 100%;"
                       v-for="k of ['1', '2']" :key="k">
                    <play class="flex-column flex-middle"
                          :show-handicap="true"
                          :play="match.market_groups['asian_handicap'][k]"
                          :group="match.market_groups['asian_handicap']"
                          :match="match"
                    />
                  </div>
                </div>
                <div class="wid flex">
                  <!--大小盘-->
                  <div class="flex-column flex-1 full-width b-b" style="height: 3rem;width: 100%;"
                       v-for="k of ['1', '2']" :key="k">
                    <play class="flex-column flex-middle"
                          :show-header="true"
                          :play="match.market_groups['match_goals'][k]"
                          :group="match.market_groups['match_goals']"
                          :match="match"
                    >
                      <div slot="header" slot-scope="{play}">
                        <span class="fs12 m-r8 bet-header">{{play.header}}</span>
                        <span>{{play.handicap}}</span>
                      </div>
                    </play>
                  </div>
                </div>
              </div>

              <!--篮球-->
              <div class="flex" v-if="match.sport == 18">
                <div class="wid flex b-r">
                  <div class="full-width b-b flex-1" v-for="k of ['1', '2']" :key="k">
                    <play class="flex-column flex-middle"
                          :show-handicap="true"
                          :play="match.market_groups['basketball_game_lines_spread'][k]"
                          :group="match.market_groups['basketball_game_lines_spread']"
                          :match="match"
                    />
                  </div>
                </div>

                <div class="wid flex b-r">
                  <div class="flex-column flex-1 full-width b-b" v-for="k of ['1', '2']" :key="k">
                    <play class="flex-column flex-middle"
                          :show-handicap="true"
                          :play="match.market_groups['basketball_game_lines_total'][k]"
                          :group="match.market_groups['basketball_game_lines_total']"
                          :match="match"
                    >
                      <span slot="alias" class="fs10">{{ k === '1' ? $t('height') : $t('below') }}</span>
                    </play>
                  </div>
                </div>

                <div class="wid flex">
                  <div class="flex-column flex-1 full-width b-b" v-for="k of ['1', '2']" :key="k">
                    <play class="flex-column flex-middle"
                          :show-handicap="true"
                          :play="match.market_groups['basketball_game_lines_money_line'][k]"
                          :group="match.market_groups['basketball_game_lines_money_line']"
                          :match="match"
                    />
                  </div>
                </div>
              </div>

              <!--网球-->
              <div class="flex-between" style="width: 520px;" v-if="match.sport == 13">
                <div class="full-width full-height flex-1" v-for="k of ['1', '2']" :key="k">
                  <play class="flex-column flex-middle flex-1"
                        :play="match.market_groups['tennis_to_win_match'][k]"
                        :group="match.market_groups['tennis_to_win_match']"
                        :match="match"
                  />
                </div>
              </div>

              <!--排球-->
              <div class="flex" v-if="match.sport == 91">
                <div class="wid flex-between flex-column b-r flex-1" style="height: 114px;">
                  <div class="full-width b-b flex-1" v-for="k of ['1', '2']" :key="k">
                    <play class="flex-column flex-middle"
                          :play="match.market_groups['to_win'][k]"
                          :group="match.market_groups['to_win']"
                          :match="match"
                    />
                  </div>
                </div>
                <div class="wid flex-between flex-column b-r flex-1" style="height: 114px;">
                  <div class="full-width b-b flex-1" v-for="k of ['1', '2']" :key="k">
                    <play class="flex-column flex-middle"
                          :show-handicap="true"
                          :play="match.market_groups['total_points'][k]"
                          :group="match.market_groups['total_points']"
                          :match="match"
                    >
                      <span slot="alias" class="fs10">{{ k === '1' ? $t('height') : $t('below') }}</span>
                    </play>
                  </div>
                </div>
                <div class="wid flex-between flex-column b-r flex-1" style="height: 114px;">
                  <div class="full-width b-b flex-1" v-for="k of ['1', '2']" :key="k">
                    <play class="flex-column flex-middle"
                          :show-handicap="true"
                          :play="match.market_groups['handicap_sets'][k]"
                          :group="match.market_groups['handicap_sets']"
                          :match="match"
                    />
                  </div>
                </div>
              </div>

              <!--棒球-->
              <div class="flex" v-if="match.sport == 16">
                <div class="wid flex-between flex-column b-r flex-1" style="height: 114px;">
                  <div class="full-width b-b flex-1" v-for="k of ['1', '2']" :key="k">
                    <play class="flex-column flex-middle"
                          :show-handicap="true"
                          :play="match.market_groups['run_line'][k]"
                          :group="match.market_groups['run_line']"
                          :match="match"
                    />
                  </div>
                </div>
                <div class="wid flex-between flex-column b-r flex-1" style="height: 114px;">
                  <div class="full-width b-b flex-1" v-for="k of ['1', '2']" :key="k">
                    <play class="flex-column flex-middle"
                          :show-handicap="true"
                          :play="match.market_groups['total_points'][k]"
                          :group="match.market_groups['total_points']"
                          :match="match"
                    >
                      <span slot="alias" class="fs10">{{ k === '1' ? $t('height') : $t('below') }}</span>
                    </play>
                  </div>
                </div>
                <div class="wid flex-between flex-column b-r flex-1" style="height: 114px;">
                  <div class="full-width b-b flex-1" v-for="k of ['1', '2']" :key="k">
                    <play class="flex-column flex-middle"
                          :show-handicap="true"
                          :play="match.market_groups['money_line'][k]"
                          :group="match.market_groups['money_line']"
                          :match="match"
                    />
                  </div>
                </div>
              </div>

              <!--电子竞技-->
              <div class="flex" v-if="match.sport == 151">
                <div class="wid flex-between flex-column b-r flex-1" style="height: 114px;">
                  <div class="full-width b-b flex-1" v-for="k of ['1', '2']" :key="k">
                    <play class="flex-column flex-middle"
                          :play="match.market_groups['to_win'][k]"
                          :group="match.market_groups['to_win']"
                          :match="match"
                    />
                  </div>
                </div>
                <div class="wid flex-between flex-column b-r flex-1" style="height: 114px;">
                  <div class="full-width b-b flex-1" v-for="k of ['1', '2']" :key="k">
                    <play class="flex-column flex-middle"
                          :show-handicap="true"
                          :play="match.market_groups['match_handicap'][k]"
                          :group="match.market_groups['match_handicap']"
                          :match="match"
                    ></play>
                  </div>
                </div>
                <div class="wid flex-between flex-column b-r flex-1" style="height: 114px;">
                  <div class="full-width b-b flex-1" v-for="k of ['1', '2']" :key="k">
                    <play class="flex-column flex-middle"
                          :show-handicap="true"
                          :play="match.market_groups['total_maps'][k]"
                          :group="match.market_groups['total_maps']"
                          :match="match"
                    >
                      <span slot="alias" class="fs10">{{ k === '1' ? $t('height') : $t('below') }}</span>
                    </play>
                  </div>
                </div>
              </div>

              <div style="width:6px"></div>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 392px; padding-left: 20px" class="full-height">
        <div>
          <van-button class="change-type-button m-b10" :class="[showAllMatch ? 'active' : '', currentLang.code]" block @click="changePageType"></van-button>
          <div class="mathfilter flex-middle cursor" style="padding: 0 24px"
               @click="$refs.pcCompetitionFilter.show()" v-if="showAllMatch">
            <img style="width: 20px; margin-right: 16px;" src="../../../assets/images/tmp3/pc/mathfilter.png" alt="">
            <span class="flex-1 fspx16 bold" style="color: #7B5605">{{ $t('bs_sx') }}</span>
          </div>
          <div class="flex" style="margin: 20px 0 16px 0;" v-if="rankingMap.switch_ranking == 1">
            <img style="width: 20px; margin-right: 8px" src="../../../assets/images/tmp3/pc/ph.png" alt="">
            <span class="fspx16 bold" style="color: #4D5872">{{ rankingMap.ranking_name }}</span>
          </div>
          <div class="re" v-if="rankingMap.switch_ranking == 1">
            <div class="ab full-width bgc"></div>
            <table class="table full-width center re">
              <thead>
              <tr>
                <th align="left" width="25%">
                  <div class="center" style="display: inline-block;width: 50px; height: 32px; line-height: 32px">
                    {{ $t('p_m') }}
                  </div>
                </th>
                <th width="25%" align="left">
                  <div class="p-l8">{{ $t('player') }}</div>
                </th>
                <th width="25%">
                  <div>
                    {{ $t('h_l_l') }}
                  </div>
                </th>
                <th width="25%" align="right">
                  <div class="p-r8">{{ $t('z_y_l') }}</div>
                </th>
              </tr>
              </thead>
              <tbody style="max-height: 700px;" class="scroll-y hide-scroll-bar">
              <tr v-for="(r, i) in rankingMap.list.slice(0, 20)" :key="i">
                <td align="left">
                  <div class="center" style="display: inline-block;width: 50px; height: 38px; line-height: 38px">
                    <img v-if="r.sort <= 3" style="width: 20px;vertical-align: middle"
                         :src="require('@/assets/images/tmp3/rank'+r.sort+'.png')" alt="">
                    <span v-else>{{ r.sort }}</span>
                  </div>
                </td>
                <td align="left">
                  <span class="p-l8">{{ r.usr }}</span>
                </td>
                <td>
                  <span>{{ r.hl + '%' }}</span>
                </td>
                <td align="right">
                  <span class="p-r8">{{ r.yl }}</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
    <!-- 比赛筛选 -->
    <PcCompetitionFilter ref="pcCompetitionFilter" :leagues="allLeagues" @select-league="handleSearchLeague"/>

    <FootBetController />
  </div>
</template>
<script>
import {format} from "../../../assets/js/util";
import Marquee from '../../../common/Marquee.vue';
import {sports} from "../../../common/config";
import {Carousel, CarouselItem} from 'element-ui'
import home from "../../../mixins/home";
import {getHotMatches, getPlayerRanking, getScrollNotices} from "../../../axios/sport";
import getBetList from "../../../mixins/getBetList";
import CountDown from "../../../common/CountDown";
import Play from "../../../components/Play";
import FootBetController from "../../../components/FootBetControll";
import languageMixin from "../../../mixins/languageMixin";

export default {
  mixins: [home, getBetList, languageMixin],
  components: {
    Marquee,
    PcCompetitionFilter: () => import('../../../components/temp3/PcCompetitionFilter.vue'),
    'elCarousel': Carousel,
    'elCarouselItem': CarouselItem,
    CountDown,
    Play,
    FootBetController
  },
  data() {
    return {
      scrollIndex: 0,
      active_sport: {text: 'fball', id: 1},
      showAllMatch: false,
      rankingMap: {
        list: [],
        ranking_name: '',
        switch_ranking: 0
      },
      categories: [
        {name: 'today', alias: 'j_r'},
        {name: 'upcoming', alias: 'z_p'},
        {name: 'inplay', alias: 'groun'},
        {name: 'favorite', alias: 's_c'},
      ],
      category: {name: 'inplay', alias: 'groun'},
      searchLeagueIds: [],
      scrollNotices: ''
    }
  },

  computed: {
    groundMatches() {
      const id = this.active_sport.id.toString();
      switch (id) {
        case '1':
          return this.footballMatches;
        case '18':
          return this.basketballMatches;
        case '13':
          return this.tennisMatches;
        case '16':
          return this.baseballMatches;
        case '91':
          return this.volleyballMatches;
        case '151':
          return this.esportsMatches;
      }
    },

    allLeagues() {
      return this.showAllMatch ? this.list : [];
    },

    filterLeagues() {
      if (this.showAllMatch) {
        if (this.searchLeagueIds.length) {
          return this.list.filter(league => this.searchLeagueIds.includes(league.id));
        }
        return this.list;
      }
      return this.list;
    }
  },

  methods: {
    // 跳转比赛详情
    _toDetail(match = {}, league = {}) {

      const league_id = match.league_id || league.id;
      const league_name = match.league_name || league.name;
      const match_id = match.id || match.match_id;

      console.log('跳转比赛详情', match)
      console.log('跳转比赛详情', league)
      this.$router.push({
        path: `/index/bet-detail`,
        query: {
          match_id,
          league_id,
          match_status: match.status,
          sport: match.sport,
          league_name
        }
      })
    },

    // 筛选确定按钮
    handleSearchLeague(leagueIds = []) {
      this.searchLeagueIds = leagueIds;
      this.$refs.pcCompetitionFilter.close()
    },

    // 选择类型
    handleSelectCate(cate = {}) {
      this.category = cate;
      this.replaceLocationParams()
      this.getMatchList();
      this.searchLeagueIds = [];
    },

    // 切换体育
    handleSelectSport(sport = {}) {
      this.active_sport = sport;
      this.replaceLocationParams()
      this.searchLeagueIds = []
      if (this.showAllMatch) {
        this.getMatchList()
      } else {
        this._getGroundMatches()
        this._getHotMatches()
      }
    },

    getMatchList() {
      const params = {
        sport: this.active_sport.id, // 1 足球 18 篮球
        category: this.category.name,
        page: 1,
        pageSize: 20,
        league: this.league_id
      }
      this._getMatches(params)
    },

    // 热门滚球
    _getHotMatches() {
      let params = {
        sport: this.active_sport.id
      }
      getHotMatches(params)
          .then(res => {
            if (res.code === 200) {
              let list = res.data
              list = list.map(item => {
                item.sport = params.sport

                return item
              })

              this.hotMatches = list.sort((a, b) => Number(a.start_time) - Number(b.start_time));
              console.log('this.hotMatches====', this.hotMatches)
            }
          })
          .catch(err => {
            console.log('热门滚球信息err', err)
          })
    },

    format(date, fmt) {
      return format(date, fmt)
    },

    scrollX(isLeft) {
      const liList = document.querySelector('.scroll-ul-continaer').querySelectorAll('li');
      if (isLeft) {
        if (this.scrollIndex !== 0) {
          this.scrollIndex--;
          liList[this.scrollIndex].scrollIntoView({behavior: "smooth", inline: 'start'});
        }
      } else {
        if (this.scrollIndex !== (liList.length - 3)) {
          this.scrollIndex++;
          liList[this.scrollIndex + 2].scrollIntoView({behavior: "smooth", inline: 'start'});
        }
      }
    },

    replaceLocationParams() {
      const href = window.location.href;
      const url = href.split('?')[0];
      const type = this.showAllMatch ? 1 : 0
      window.location.replace(`${url}?category=${this.category.name}&sport_id=${this.active_sport.id}&type=${type}`)
    },

    // 精选和全部赛事切换按钮
    changePageType() {
      this.showAllMatch = !this.showAllMatch;
      // 获取比赛列表
      if (this.showAllMatch) {
        this.getMatchList()
      }

      // 获取精选和热门赛事
      else {
        this._getGroundMatches()
        this._getHotMatches()
      }

      this.replaceLocationParams()
    },

    _getScrollNotices() {
      getScrollNotices({client: 'pc'})
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

  created() {
    this.sports = sports;

    getPlayerRanking()
        .then(res => {
          if (res.code == 200) {
            this.rankingMap = res.data;
          }
        })
  },

  mounted() {
    const sport_id = this.$route.query.sport_id || '1';
    const category_name = this.$route.query.category || 'today';
    this.showAllMatch = this.$route.query.type == 1;
    this.active_sport = this.sports.find(s => s.id == sport_id) || {text: 'fball', id: 1};
    this.category = this.categories.find(c => c.name == category_name) || {name: 'grounder', alias: this.$t('groun')}

    if (this.showAllMatch) {
      this.getMatchList()
    } else {
      this._getGroundMatches()
      this._getHotMatches()
    }
    this.getLangList()
    this._getScrollNotices()
  }
}
</script>
<style type="text/css" lang="less" scoped>
@import url('../../../assets/css/index');


.colum-left {
  color: #4D5872;
  flex-direction: column;

  .pc-tip {
    position: relative;
    top: 12px;
  }

  .vs {
    margin: 5.4px 0
  }

  img {
    width: 14px;
    .m-r(4);
  }
}

.colum-right {
  position: relative;
  color: #4D5872;
  .full-height();

  p:nth-child(1) {
    height: 32px;
  }

  p:nth-child(2) {
    .white();
    position: absolute;
    right: 0;
    top: 28px;
  }
}

.banner {
  height: 480px;
  background: #fff;

  /deep/ .el-carousel__container {
    height: 100%;
  }

  /deep/ .el-carousel__button {
    background: rgba(122, 85, 6, 0.4);
    width: 24px;
    height: 6px;
    border-radius: 5px;
  }

  /deep/ .el-carousel__indicator.is-active button {
    background-color: rgba(122, 85, 6, 1);
  }
}

.active_line {
  height: 2px;
  width: 100%;
  background-color: #7b5605;
  border-radius: 2px;
  bottom: 0px;
}

.gunqiucontent {
  height: 120px;

  .tips {
    width: 34px;
    height: 112px;
    background: #F7F5F0;
    border: 1px solid #EDE7D9;
    border-radius: 4px;
  }
}

.ground-item {
  background-image: url("../../../assets/images/tmp3/bg_groud.png");
  background-size: 100% 100%;
  height: 120px;
  width: 228px;
  flex-shrink: 0;
  margin-right: 9px;
  margin-top: 20px;

  .colum-right p {
    width: 40px;
    height: 17px;
    line-height: 1;
    right: -10px;
    top: 29px;
  }
}

.ground-item2 {
  background-image: url("../../../assets/images/tmp3/bg_groud2.png");
  background-size: 100% 100%;
  height: 122px;
  flex-shrink: 0;

  .list-content {
    height: 80px;
    color: #4D5872;

    img {
      width: 26px;
    }

    .list {
      width: 50%;
    }
  }

  > .content {
    .justify-content(space-between);
  }

  .colum-right {
    p:nth-child(1) {
      line-height: 32px;
    }
  }

  .colum-left {
    .tip {
      margin-bottom: 0;
    }
  }
}

.hotul {
  overflow: hidden;

  li {
    width: 392px;
    float: left;

    &:nth-child(even) {
      float: right;
    }
  }
}

.table {
  box-shadow: 0px 2px 4px 0px rgba(28, 29, 32, 0.1);
  border-radius: 4px;
  overflow: hidden;
  border-collapse: collapse;
  border-spacing: 0;

  thead {
    th {
      .fspx12();
      color: #666666;
    }
  }

  tbody {
    tr:not(:last-child) {
      td {
        .fspx14();
        color: #4E5772;
        border-bottom: 1px solid #DDE6EE;
      }
    }
  }
}

.bgc {
  height: 28px;
  background-image: linear-gradient(180deg, #ECF2F8 0%, #FFFFFF 100%);
  left: 0;
  top: 0;
}

.matche-ul:first-child {
  padding-top: 8px;
}

.matche-ul {
  margin-bottom: 18px;

  .li {
    height: 120px;
    background: url("../../../assets/images/tmp3/pc/matches-bg.jpeg") no-repeat;
    background-size: 100% auto;
  }

  .active {
    color: #FFF320;
    background-image: linear-gradient(180deg, #59627A 0%, #97A2BB 100%);
    box-shadow: inset 0px 0px 8px 0px rgba(85, 98, 129, 1);

    .white-two {
      color: white !important;
    }
  }
}

.wid {
  width: 173px;
  flex-direction: column;
}

.table_content {
  flex-direction: column;

  > p:nth-child(1) {
    color: #4D5872;
    padding-bottom: 4px;
  }
}

.mathfilter {
  height: 50px;
  background-image: linear-gradient(180deg, #ECF2F8 0%, #FFFFFF 100%);
  border: 1px solid #BCC0CB;
  border-radius: 4px;
}

.slider_div {
  width: 100%;
  height: 36px;
  background: #FFFFFF;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);

  > div {
    cursor: pointer;
    width: 1200px;
    margin: 0 auto;

    > div {
      background: none;
    }
  }
}

.b-b {
  border-bottom: 1px solid #dde6ee;

  &:last-child {
    border-bottom: none !important;
  }
}

.b-r {
  border-right: 1px solid #dde6ee;
}

.change-type-button {
  margin-top: 40px;
  width: 372px;
  height: 120px;
  background-size: 100% 100%;
}

.zh-cn {
  background-image: url("../../../assets/images/tmp3/pc/allbs.png");
  &.active {
    background-image: url("../../../assets/images/tmp3/pc/jx.png");
  }
}

.en {
  background-image: url("../../../assets/images/tmp3/pc/allbs_en.png");
  &.active {
    background-image: url("../../../assets/images/tmp3/pc/jx_en.png");
  }
}

.it {
  background-image: url("../../../assets/images/tmp3/pc/allbs_it.png");
  &.active {
    background-image: url("../../../assets/images/tmp3/pc/jx_it.png");
  }
}

.es { // 西班牙
  background-image: url("../../../assets/images/tmp3/pc/allbs_es.png");
  &.active {
    background-image: url("../../../assets/images/tmp3/pc/jx_es.png");
  }
}

.hi { // 印地语
  background-image: url("../../../assets/images/tmp3/pc/allbs_hi.png");
  &.active {
    background-image: url("../../../assets/images/tmp3/pc/jx_hi.png");
  }
}

.id { // 印尼
  background-image: url("../../../assets/images/tmp3/pc/allbs_id.png");
  &.active {
    background-image: url("../../../assets/images/tmp3/pc/jx_id.png");
  }
}

.ja-jp { // 日本
  background-image: url("../../../assets/images/tmp3/pc/allbs_jp.png");
  &.active {
    background-image: url("../../../assets/images/tmp3/pc/jx_jp.png");
  }
}

.th {
  background-image: url("../../../assets/images/tmp3/pc/allbs_th.png");
  &.active {
    background-image: url("../../../assets/images/tmp3/pc/jx_th.png");
  }
}

.zh-tw {
  background-image: url("../../../assets/images/tmp3/pc/allbs_tw.png");
  &.active {
    background-image: url("../../../assets/images/tmp3/pc/jx_th.png");
  }
}

.pt {
  background-image: url("../../../assets/images/tmp3/pc/allbs_pt.png");
  &.active {
    background-image: url("../../../assets/images/tmp3/pc/jx_pt.png");
  }
}

.vi {
  background-image: url("../../../assets/images/tmp3/pc/allbs_vi.png");
  &.active {
    background-image: url("../../../assets/images/tmp3/pc/jx_vi.png");
  }
}

.ko {
  background-image: url("../../../assets/images/tmp3/pc/allbs_ko.png");
  &.active {
    background-image: url("../../../assets/images/tmp3/pc/jx_ko.png");
  }
}

.ms {
  background-image: url("../../../assets/images/tmp3/pc/allbs_ms.png");
  &.active {
    background-image: url("../../../assets/images/tmp3/pc/jx_ms.png");
  }
}
</style>
