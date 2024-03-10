<template>
  <div class="bet-detail-pc-tmp2 flex">
    <div class="bet-detail-left scroll-y hide-scroll-bar" v-if="String(match_status) === '1'"
         :style="{height: leftScrollHeight}">

      <van-collapse v-model="sportCollapses" :border="false" accordion>
        <van-collapse-item :name="item.id"
                           v-for="item of sports"
                           :key="item.id"
                           :border="false"
                           :is-link="false">
          <template #title>
            <div class="flex-middle-only cursor nav-sport" style="background-color: #383838;"
                 @click="selectSport(item)"
                 :key="item.id"
                 :style="{borderBottomColor: navSportId === item.id ? getDefaultSport(item.id).bottomColor : ''}"
            >
              <div :class="[getDefaultSport(item.id).icon, navSportId === item.id && 'active']"></div>
              <span class="m-l8" style="color:#ddd;">{{ $t(item.text) }}</span>
            </div>
          </template>

          <van-collapse v-model="activeCollapses" :border="false" accordion @change="_changeCollapses">
            <van-collapse-item :name="league.id"
                               v-for="league of leagues"
                               :key="league.id"
                               :border="false"
                               :is-link="false">
              <template #title>
                <van-row style="background-color: #474747;padding:0 36px;" class="flex-middle-only lh-45 fs12 cursor">
                  <van-col :span="22" class="cles-1" style="color:#c3c3c3;">
                    {{ league.name }}
                  </van-col>

                  <van-col :span="2" class="flex-end">
                    <i v-if="String(activeCollapses) !== String(league.id)"
                       class="van-icon van-icon-arrow-down" style="color:#c3c3c3;"></i>
                  </van-col>
                </van-row>
              </template>

              <div class="flex ground-match-item"
                   :class="match.id === match_id ? 'active' : ''"
                   v-for="match of league.matches" :key="match.id"
                   @click="_changeMatch(match)">

                <div style="width:30px;" class="m-r16"
                     v-if="match.sport === '1' || match.sport === '18' || match.sport === '151'">
                  <count-down style="color:#c3c3c3;" class="fs12"
                              :ref="`detail-count-down-${match.id}`"
                              :type="(match.sport === '1' || (league.name.indexOf('CS:GO') === -1) && match.sport === '151') ? 'up':'down'"
                              :time="(match.timer.tm || 0) * 60 + (match.timer.ts * 1 || 0)"
                              :suspend="match.timer.tt"/>
                </div>

                <div class="flex-1 cursor">
                  <div class="flex-between fs12" style="color:#c3c3c3;">
                    <span class="cles-1">{{ match.home_name }}</span>

                    <div v-if="match.sport === '1' || match.sport === '18' || match.sport === '16' || match.sport === '151'">
                      <p style="width:20px" class="flex-middle yellow">{{ match.ss && match.ss.split('-')[0] }}</p>
                    </div>
                    <div style="max-width:50%;" class="flex-end" v-else>
                      <p style="width:20px" class="flex-middle yellow">{{ match.ss && match.ss.split('-')[0] }}</p>
                      <p style="width:20px" class="flex-middle" v-for="(s, i) in scoresObj(match)" :key="i">{{ s.home || '-' }}</p>
                      <p style="width:20px" class="flex-middle" v-if="match.points">{{ match.points.split('-')[0] }}</p>
                    </div>
                  </div>
                  <div class="flex-between fs12" style="color:#c3c3c3;">
                    <span class="cles-1">{{ match.away_name }}</span>

                    <div v-if="match.sport === '1' || match.sport === '18' || match.sport === '16' || match.sport === '151'">
                      <p style="width:20px" class="flex-middle yellow">{{ match.ss && match.ss.split('-')[1] }}</p>
                    </div>

                    <div v-else style="max-width:50%;" class="flex-end">
                      <p style="width:20px" class="flex-middle yellow">{{ match.ss && match.ss.split('-')[1] }}</p>
                      <p style="width:20px" class="flex-middle"
                         v-for="(s, i) in scoresObj(match)" :key="i">{{ s.away || '-' }}</p>
                      <p style="width:20px" class="flex-middle" v-if="match.points">{{ match.points.split('-')[1] }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>
        </van-collapse-item>
      </van-collapse>
    </div>

    <div class="bet-detail-right flex-1 scroll-y hide-scroll-bar" :style="{height: leftScrollHeight}">
      <div class="" :style="{minHeight: rightScrollHeight}">
        <!--早盘-->
        <div style="background-color: #404040;" v-if="String(match_status) !== '1'">
          <h3 class="flex-between fs12" style="color: #cecece;padding: 16px 36px 0;">
            <span class="flex-middle-only cursor" @click="$router.back()">
                <i class="van-icon van-icon-arrow-left m-r5"></i>
                <span>{{ getSportName(sport) }} - {{ match.league_name }}</span>
            </span>
          </h3>

          <div class="flex-between match-info cursor" style="margin-top: 0.8rem;" @click="showPicker = true">
            <div class="flex-middle-only flex-1">
              <span class="fs20" style="color: #ddd;">{{ match.home_name }} v {{ match.away_name }}</span>
              <i class="van-icon van-icon-arrow-down" style="color: #cecece;"></i>
            </div>

            <span style="color: #cecece;margin-right:36px;">{{ format(match.start_time * 1000, 'MM-dd hh:mm') }}</span>
          </div>
        </div>

        <!--滚球/足球/篮球-->
        <div class="flex-between ground-header re"
             v-if="Number(match_status) === 1 &&
             (Number(match.sport_id) === 1 || Number(match.sport_id) === 18 || Number(match.sport_id) === 151)
        ">
          <div class="ab flex-middle-only fs12 cursor" style="left:16px;top:16px;" @click="$router.back()">
            <i class="van-icon van-icon-arrow-left"></i>

            <span style="color: #cecece">{{$t('ground')}} {{ getSportName(sport) }}-{{ league.name }}</span>
          </div>

          <div class="flex-middle flex-1 full-height">
            <div class="cles-1 right" style="margin-top: 24px;">{{ match.home_name }}</div>
            <div class="flex-column flex-between re full-height" style="width: 64px;">
              <div class="count-down-content flex-middle" style="width: 110px;">
                <span class="fs12 m-r5">{{ match.timer.period }}</span>
                <count-down
                    :type="(Number(match.sport_id) === 1 || (league.name.indexOf('CS:GO') === -1) && Number(match.sport_id) === 151) ? 'up':'down'"
                    :time="(match.timer.tm || 0) * 60 + (match.timer.ts * 1 || 0)"
                    :suspend="match.timer.tt"/>
              </div>

              <div class="flex-1 fs16" style="color: #FFDF1B;margin-top:18px;">
                <span class="">{{ match.ss ? match.ss.split('-')[0] : 0 }}</span>
                <span class="" style="margin-left: 0.5rem;">{{ match.ss ? match.ss.split('-')[1] : 0 }}</span>
              </div>
              <div class="flex-middle">
                <p style="height:2px;width:20px;background-color: #137A5A;"></p>
                <p style="height:2px;width:20px;background-color: #fff;margin-left:2px;"></p>
              </div>
            </div>
            <div class="cles-1" style="margin-top: 24px;">{{ match.away_name }}</div>
          </div>
        </div>

        <!--滚球/排球/网球-->
        <div class="tennis-header"
             v-if="Number(match_status) === 1 &&
             ( Number(match.sport_id) === 13 ||
               Number(match.sport_id) === 91 ||
               Number(match.sport_id) === 16)"
        >
          <div class="flex-middle-only fs12 cursor lh-40" @click="$router.back()">
            <i class="van-icon van-icon-arrow-left"></i>

            <span style="color: #cecece">{{$t('ground')}} {{ getSportName(sport) }}-{{ league.name }}</span>
          </div>

          <div class="flex-1 full-height fs20">
            <div class="flex-between flex-middle-only lh-40">
              <div class="flex-middle-only">
                <i class="circle" v-if="Number(match.sport_id) === 13"
                   :class="match.playing_indicator === '1' ? 'active' : ''"></i>
                <span class="m-l8">{{ match.home_name }}</span>
              </div>

              <div class="flex-middle-only">
                <p style="width:30px" class="flex-middle yellow">{{ match.ss && match.ss.split('-')[0] }}</p>
                <p style="width:30px;height:30px;" class="flex-middle re"
                   v-for="(s, i) in scoresObj(match)" :key="i">
                  {{ s.home}}
                  <span class="ab fs12 lh-20" v-if="Number(match.sport_id) === 16" style="top: -25px;font-weight: normal;">{{i}}</span>
                </p>
                <p style="width:30px" class="flex-middle">{{ match.points && match.points.split('-')[0] }}</p>
              </div>
            </div>
            <div class="flex-between flex-middle-only lh-40">
              <div class="flex-middle-only">
                <i class="circle" v-if="Number(match.sport_id) === 13"
                   :class="match.playing_indicator === '2' ? 'active' : ''"></i>
                <span class="m-l8">{{ match.away_name }}</span>
              </div>

              <div class="flex-middle-only">
                <p style="width:30px;" class="flex-middle yellow">{{ match.ss && match.ss.split('-')[1] }}</p>

                <p style="width:30px;height:30px;" class="flex-middle"
                   v-for="(s, i) in scoresObj(match)" :key="i">
                  {{ s.away }}
                </p>
                <p style="width:30px" class="flex-middle">{{ match.points && match.points.split('-')[1] }}</p>
              </div>
            </div>
          </div>
        </div>

        <!--棒球-->
        <!--                <div class="tennis-header" v-if="Number(match_status) === 1 && Number(match.sport_id) === 16">-->
        <!--                    <div class="flex-middle-only fs12 cursor lh-40" @click="$router.back()">-->
        <!--                        <i class="van-icon van-icon-arrow-left"></i>-->

        <!--                        <span style="color: #cecece">滚球盘 {{getSportName(sport)}}-{{league.name}}</span>-->
        <!--                    </div>-->

        <!--                    <div class="flex-1 full-height fs20">-->
        <!--                        <div class="flex-between flex-middle-only lh-40">-->
        <!--                            <div class="flex-middle-only">-->
        <!--                                <i class="circle" :class="match.playing_indicator === '1' ? 'active' : ''"></i>-->
        <!--                                <span class="m-l8">{{match.home_name}}</span>-->
        <!--                            </div>-->

        <!--                            <div class="flex-middle-only re">-->
        <!--                                <div class="ab flex-middle-only fs12" style="top:-30px;">-->
        <!--                                    <p style="width:30px;" class="center"-->
        <!--                                       v-for="(s, i) in match.scores" :key="i">{{i}}</p>-->
        <!--                                </div>-->


        <!--                                <p style="width:30px" class="flex-middle"-->
        <!--                                   v-for="(s, i) in match.scores" :key="i">{{s.home}}</p>-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                        <div class="flex-between flex-middle-only lh-40">-->
        <!--                            <div class="flex-middle-only">-->
        <!--                                <i class="circle" :class="match.playing_indicator === '2' ? 'active' : ''"></i>-->
        <!--                                <span class="m-l8">{{match.away_name}}</span>-->
        <!--                            </div>-->

        <!--                            <div class="flex-middle-only">-->
        <!--                                <p style="width:30px" class="flex-middle"-->
        <!--                                   v-for="(s, i) in match.scores" :key="i">{{s.away}}</p>-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                </div>-->


        <!--玩法名称-->
        <div class="full-width tabs-title border-bottom-line" style="padding: 0 36px;">
          <scroll-x :tabs="market_tabs" v-slot="{ item }" @change="selectPlay">
            <template>
              <div class="flex-middle-only re cursor" style="padding-right: 1.2rem;">
                                <span class="fs14" style="color:#cecece;"
                                      :class="item.index === groupIndex ? 'active' : ''">
                                    {{ item && item.name }}
                                </span>
              </div>
            </template>
          </scroll-x>
        </div>

        <!--玩法列表-->
        <div v-if="playList && playList.length" style="background-color: #505050;color:#ddd;"
             v-for="group of playList"
             :key="group.market_group_id">
          <div class="flex-between lh-45" style="padding: 0 36px;">
            <span class="fs14">{{ group.name }}</span>
          </div>

          <!--比赛投注/半场/赛盘投注-->
          <van-row class="flex-middle-only group-nav-title" v-if="isMatchBetting(group.code)||
                    group.code === 'tennis_set_betting' ||
                    group.code === 'baseball_game_lines' ||
                    group.code === 'esports_match_lines' ||
                    group.code === 'volleyball_game_lines'">
            <van-col :span="8" :offset="8" class="center fs12">{{ match.home_name }}</van-col>
            <van-col :span="8" class="center fs12">{{ match.away_name }}</van-col>
          </van-row>

          <!--让球/比赛获胜/赛局正确比分-->
          <van-row class="flex-middle-only group-nav-title"
                   v-if="group.code === 'asian_handicap' ||
                             group.code === 'tennis_to_win_match' ||
                             group.code === 'volleyball_correct_set_score' ||
                             group.code === 'tennis_set_winner' ||
                             group.code === 'tennis_set_1_winner'"
          >
            <van-col :span="12" class="center fs12">{{ match.home_name }}</van-col>
            <van-col :span="12" class="center fs12">{{ match.away_name }}</van-col>
          </van-row>

          <!--大小盘-->
          <van-row v-if="group.code === 'match_goals'" class="flex-middle-only group-nav-title">
            <van-col :span="8" :offset="8" class="center fs12">{{$t('height')}}</van-col>
            <van-col :span="8" class="center fs12">{{$t('below')}}</van-col>
          </van-row>

          <!--让球-->
          <van-row gutter="1" class="border-bottom-line" v-if="group.code === 'asian_handicap'">
            <van-col :span="12" v-for="v of ['h', 'a']" :key="v" class="flex-column">
              <play class="flex-middle lh-45"
                    v-for="play of group.markets" :key="play.market_id"
                    v-if="play.header2 === v"
                    :show-handicap="true"
                    :match="match"
                    :group="group"
                    :play="play"
              />
            </van-col>
          </van-row>

          <!--半场/让分三项/波胆-->
          <van-row class="flex-middle-only group-nav-title"
                  v-if="group.code === 'half_time_correct_score' ||
                  group.code === 'correct_score' ||
                  group.code === 'half_time_incorrect_score' ||
                  group.code === 'full_time_result' ||
                  group.code === 'incorrect_score' ||
                  group.code === 'basketball_point_spread_3_way'"
          >
            <van-col :span="8" class="center fs12">{{ match.home_name }}</van-col>
            <van-col :span="8" class="center fs12">{{$t('pingj')}}</van-col>
            <van-col :span="8" class="center fs12">{{ match.away_name }}</van-col>
          </van-row>

          <!--独赢-->
          <van-row gutter="1" class="border-bottom-line"
                   v-if="group.code === 'full_time_result'">
            <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">
              <play class="lh-45"
                    :match="match"
                    :group="group"
                    :play="findPlay('name', v,  group.markets)"
              />
            </van-col>
          </van-row>

          <!--大小盘-->
          <van-row gutter="1" class="border-bottom-line" v-if="group.code === 'match_goals'">
            <van-col :span="8" class="flex-middle lh-45">
              {{ group.markets[0] && group.markets[0].handicap.replace(',', '/') }}
            </van-col>
            <van-col :span="8" v-for="v of ['o', 'u']" :key="v">
              <play class="lh-45"
                    :match="match"
                    :group="group"
                    :play="findPlay('header2', v,  group.markets)"
              />
            </van-col>
          </van-row>

          <!--让分3项-->
          <van-row gutter="1" class="border-bottom-line"
                   v-if="group.code === 'basketball_point_spread_3_way'">
            <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">
              <play class="lh-45 flex-middle"
                    :match="match"
                    :show-handicap="true"
                    :group="group"
                    :play="findPlay('header', v,  group.markets)"
              />
            </van-col>
          </van-row>

          <!--正确比分/半场正确得分-->
          <van-row gutter="1" class="border-bottom-line"
                   v-if="group.code === 'incorrect_score' ||
                  group.code === 'correct_score' ||
                  group.code === 'half_time_incorrect_score' ||
                  group.code === 'half_time_correct_score'"
          >
            <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">
              <play class="lh-45 flex-middle"
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
          <div class="border-bottom-line" v-if="isMatchBetting(group.code)">
            <van-row gutter="1" class="grid-line-bottom">
              <van-col :span="8" class="flex-middle full-height grid-line-right">
                <span class="fs12">{{$t('r_f')}}</span>
              </van-col>
              <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                <play class="flex-middle"
                      :match="match"
                      :group="group"
                      :show-handicap="true"
                      v-for="play of group.markets" :key="play.market_id"
                      v-if="play.name === 'Spread' && play.header === v"
                      :play="play"
                />
              </van-col>
            </van-row>
            <van-row gutter="1" class="grid-line-bottom">
              <van-col :span="8" class="flex-middle full-height grid-line-right">
                <span class="fs12">{{$t('z_f')}}</span>
              </van-col>
              <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                <play class="flex-middle"
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
            <van-row gutter="1" class="grid-line-bottom">
              <van-col :span="8" class="flex-middle full-height grid-line-right">
                <span class="fs12">{{$t('game_lines_money_line')}}</span>
              </van-col>
              <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                <play class="flex-column flex-middle"
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
          <div class="border-bottom-line" v-if="group.code === 'volleyball_game_lines'">
            <van-row gutter="1" class="grid-line-bottom">
              <van-col :span="8" class="flex-middle full-height grid-line-right">
                <span class="fs12">{{$t('winner')}}</span>
              </van-col>
              <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                <play class="flex-middle"
                      :match="match"
                      :group="group"
                      v-for="play of group.markets" :key="play.market_id"
                      v-if="play.name === 'to_win' && play.header === v"
                      :play="play"
                />
              </van-col>
            </van-row>
            <van-row gutter="1" class="grid-line-bottom">
              <van-col :span="8" class="flex-middle full-height grid-line-right">
                <span class="fs12">{{$t('r_f')}}</span>
              </van-col>
              <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                <play class="flex-middle"
                      :match="match"
                      :group="group"
                      :show-handicap="true"
                      v-for="play of group.markets" :key="play.market_id"
                      v-if="play.name === 'handicap_sets' && play.header === v"
                      :play="play"
                />
              </van-col>
            </van-row>
            <van-row gutter="1" class="grid-line-bottom">
              <van-col :span="8" class="flex-middle full-height grid-line-right">
                <span class="fs12">{{$t('z_f')}}</span>
              </van-col>
              <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                <play class="flex-middle"
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
          <van-row gutter="1" class="border-bottom-line"
                   v-if="group.code === 'volleyball_correct_set_score'"
          >
            <van-col :span="12" v-for="v of ['1', '2']" :key="v">
              <play class="lh-45 flex-middle"
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
          <van-row gutter="1" class="border-bottom-line"
                   v-if="group.code === 'tennis_to_win_match' || group.code === 'tennis_set_1_winner' || group.code === 'tennis_set_winner'">
            <van-col :span="12" v-for="v of ['1', '2']" :key="v" class="flex-column">
              <play class="lh-45 flex-middle"
                    :match="match"
                    :group="group"
                    :play="findPlay('header', v,  group.markets)"
              />
            </van-col>
          </van-row>

          <!--网球赛盘投注-->
          <div class="border-bottom-line" v-if="group.code === 'tennis_set_betting'">
            <van-row gutter="1" class="grid-line-bottom" v-for="name of scoreBetSetting(group.markets)" :key="name">
              <van-col :span="8" class="flex-middle full-height grid-line-right">
                <span class="fs12">{{ name }}</span>
              </van-col>
              <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                <play class="flex-column flex-middle"
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
          <div class="border-bottom-line" v-if="group.code === 'baseball_game_lines'">
            <van-row gutter="1" class="grid-line-bottom">
              <van-col :span="8" class="flex-middle full-height grid-line-right">
                <span class="fs12">{{$t('r_l')}}</span>
              </van-col>
              <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                <play class="flex-middle"
                      :match="match"
                      :show-handicap="true"
                      :group="group"
                      v-for="play of group.markets" :key="play.market_id"
                      v-if="play.name === 'run_line' && play.header === v"
                      :play="play"
                />
              </van-col>
            </van-row>
            <van-row gutter="1" class="grid-line-bottom">
              <van-col :span="8" class="flex-middle full-height grid-line-right">
                <span class="fs12">{{$t('z_f')}}</span>
              </van-col>
              <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                <play class="flex-middle"
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
            <van-row gutter="1" class="grid-line-bottom">
              <van-col :span="8" class="flex-middle full-height grid-line-right">
                <span class="fs12">{{$t('q_r_p')}}</span>
              </van-col>
              <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                <play class="flex-middle"
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
          <div class="border-bottom-line" v-if="group.code === 'esports_match_lines'">
            <van-row gutter="1" class="grid-line-bottom">
              <van-col :span="8" class="flex-middle full-height grid-line-right">
                <span class="fs12">{{$t('winner')}}</span>
              </van-col>
              <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                <play class="flex-middle"
                      :match="match"
                      :group="group"
                      v-for="play of group.markets" :key="play.market_id"
                      v-if="play.name === 'to_win' && play.header === v"
                      :play="play"
                />
              </van-col>
            </van-row>
            <van-row gutter="1" class="grid-line-bottom">
              <van-col :span="8" class="flex-middle full-height grid-line-right">
                <span class="fs12">{{$t('r_f_p')}}</span>
              </van-col>
              <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                <play class="flex-middle"
                      :match="match"
                      :group="group"
                      :show-handicap="true"
                      v-for="play of group.markets" :key="play.market_id"
                      v-if="play.name === 'match_handicap' && play.header === v"
                      :play="play"
                ></play>
              </van-col>
            </van-row>
            <van-row gutter="1" class="grid-line-bottom">
              <van-col :span="8" class="flex-middle full-height grid-line-right">
                <span class="fs12">{{$t('d_t_s')}}</span>
              </van-col>
              <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                <play class="flex-middle flex-column"
                      :match="match"
                      :group="group"
                      :show-handicap="true"
                      v-for="play of group.markets" :key="play.market_id"
                      v-if="play.name === 'total_maps' && play.header === v"
                      :play="play"
                >
                  <span slot="alias" class="fs10">{{v === '1' ? $t('height') : $t('below')}}</span>
                </play>
              </van-col>
            </van-row>
          </div>
        </div>

        <div v-if="isLoad && !playList.length" class="lh-45 flex-middle" style="color:#cecece;">
          {{$t('no_more_play')}}
        </div>
      </div>

      <Footer/>
    </div>

    <van-overlay :show="showPicker"
                 :lock-scroll="false"
                 @click.stop="showPicker = false"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.2)`}"
    >
      <div class="ab hide-scroll-bar"
           :style="{width: '17rem',  top: '220px', left: match_status === '1' ? '250px' : '33px'}"
           @click.stop>
        <ul class="tmp2-overlay-content scroll-y">
          <li class="cursor" :class="mat.match_id === match_id && 'active'"
              v-for="mat of matches"
              @click.stop="_changeMatch(mat)"
              :key="mat.match_id"
          >{{ mat.home_name }} V {{ mat.away_name }}
          </li>
        </ul>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import ScrollX from "../../../common/ScrollX";
import {getMatches} from "../../../axios/sport";
import betDetail from "../../../mixins/betDetail";
import customiseMixin from "../../../mixins/customiseMixin";
import CountDown from "../../../common/CountDown";
import FootBetControllerTmp2 from "../../../components/FootBetControllerTmp2";
import Footer from "../../../components/Footer"
import Play from "../../../components/Play"
import {sports} from "../../../common/config"

export default {
  mixins: [betDetail, customiseMixin],
  data() {
    return {
      sportCollapses: [],
      activeCollapses: "",
      league_name: '',
      leagues: [],
      leftScrollHeight: 0,
      rightScrollHeight: 0,
      navSportId: 1
    }
  },

  methods: {
    _changeCollapses(data) {
      console.log('data====>', data)
    },
    selectSport(item) {
      this.navSportId = item.id

      this._getGroundMatches(item.id)
    },

    getDefaultSport(sport = 1) {
      let id = Number(sport)

      if (id === 1) {
        return {
          icon: 'football-icon',
          bottomColor: '#137A5A',
        }
      } else if (id === 18) {
        return {
          icon: 'basketball-icon',
          bottomColor: '#9E6900',
        }
      } else if (id === 13) {
        return {
          icon: 'tennis-icon',
          bottomColor: '#4D6B2E',
        }
      } else if (id === 91) {
        return {
          icon: 'volleyball-icon',
          bottomColor: '#80684C',
        }
      } else if (id === 16) {
        return {
          icon: 'baseball-icon',
          bottomColor: '#A15D37',
        }
      } else if (id === 151) {
        return {
          icon: 'gaming-icon',
          bottomColor: '#624C6E',
        }
      }
    },

    // 滚球下拉列表
    _getGroundMatches(sport = 1, isFirst = false) {
      let params = {
        sport, // 1 足球
        category: 'inplay',
        page: 1,
        pageSize: 200,
      }

      getMatches(params)
          .then(res => {
            if (res.code === 200) {
              this.leftLeagueList = res.data.data
              this.leagues = this.serializeList(res.data.data)
            }

            if (isFirst) {
              this.sportCollapses = Number(sport)
            }
          })
          .catch(err => {
            this.loading = false
            console.log(err)
          })
    },

    // 序列化 比赛列表
    serializeList(arr) {
      let leaguesObj = {}
      // this.activeCollapses = []

      arr.forEach(item => {
        let league_id = item.league.id

        item.match.sport = item.sport

        if (String(item.match.id) === String(this.match.match_id)) {
          this.activeCollapses = league_id
        }

        if (!leaguesObj[league_id]) {

          leaguesObj[league_id] = {
            matches: [item.match],
            ...item.league
          }
        } else {
          leaguesObj[league_id].matches.push(item.match)
        }
      })

      let list = Object.values(leaguesObj)
      // console.log('activeCollapses===>', this.activeCollapses);
      console.log('list===>', list)
      return list
    },

    updateLeftList(match = {}) {
      const matchId = match.id || match.match_id;

      this.leftLeagueList = this.leftLeagueList.map(item => {
        if (item.match.id === matchId) {
          console.log(123123)
          item.match = {...item.match, ...match};
        }
        return item;
      })
      this.leagues = this.serializeList(this.leftLeagueList)
    },

    computedScrollHeight() {
      this.leftScrollHeight = window.innerHeight - 140 + 'px'
      this.rightScrollHeight = window.innerHeight - 96 - 115 + 'px'
    }
  },

  components: {
    ScrollX,
    CountDown,
    FootBetControllerTmp2,
    Footer,
    Play
  },

  mounted() {
    this.computedScrollHeight()

    window.addEventListener('resize', () => {
      this.computedScrollHeight()
    })
  },

  computed: {
    sports() {
      return sports.filter(sport => sport.id in this.displaySportIds)
    }
  },

  created() {
    this.leftLeagueList = []
  },

  beforeRouteEnter(to, from, next) {
    next(_this => {
      if (String(_this.match_status) === '1') {
        _this.navSportId = Number(to.query.sport) || 1
        _this._getGroundMatches(to.query.sport, true)
      }
    })
  },

  beforeRouteLeave(to, from, next) {
    this.showPicker = false
    next()
  },
}
</script>
<style type="text/css" lang="less">
.bet-detail-pc-tmp2 {
  background-color: #505050;

  .ground-header {
    color: #ddd;
    height: 68px;
    background-color: #404040;
    border-bottom: 1px solid #4e4e4e;
  }

  .tennis-header {
    padding: 0 16px;
    color: #ddd;
    background-color: #404040;
    border-bottom: 1px solid #4e4e4e;
  }

  .bet-detail-left {
    color: #c3c3c3;
    background-color: #383838;
    width: 300px;
  }

  .match-info {
    /*max-width:1140px;*/
    border-bottom: 1px solid #4e4e4e;
    padding: 0 0 16px 36px;
  }

  .count-down-content {
    background-color: #165031;
    color: #5FE8BD;
    font-size: 0.6rem;
    padding: 0 0.45rem;
  }

  .pd-12 {
    padding: 0 0.6rem;
  }

  .group-nav-title {
    background-color: #585858;
    color: #cecece;
    height: 1.4rem;
  }

  .tabs-title {
    padding: 0 0.6rem;
    line-height: 2.2rem;
    background-color: #404040;

    .active {
      color: #fff !important;
      border-bottom: 1px solid #fff;
    }
  }

  .border-bottom-line {
    border-bottom: 1px solid #137A5A;
  }

  .van-cell {
    padding: 0 !important;
  }

  .van-collapse-item__content {
    padding: 0 !important;
    background-color: transparent;
  }

  .ground-match-item {
    padding: 12px 36px;
    background-color: #383838;

    &.active {
      background-color: #404040 !important;

      .score {
        color: #FFDF1B !important;
      }
    }
  }

  .grid-line-bottom {
    border-bottom: 1px solid #5D5D5D;
    height: 2.25rem;
  }

  .nav-sport {
    padding-left: 36px;
    border-bottom: 2px solid #484848;
    height: 44px;
  }

  .bet-handicap, .bet-name {
    margin-right: 8px !important;
  }
}
</style>
