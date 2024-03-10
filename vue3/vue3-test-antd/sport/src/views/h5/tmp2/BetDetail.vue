<template>
  <CommonLayout class="bet-detail-tmp2" :hide-header="true">
    <!--早盘-->
    <div style="background-color: #404040;" class="pd-16-12" v-if="String(match_status) !== '1'">
      <h3 class="flex-between fs12" style="color: #cecece;">
                <span class="flex-middle-only" @click="$router.back()">
                    <i class="van-icon van-icon-arrow-left m-r5"></i>
                    <span>{{ getSportName(sport) }} - {{ match.league_name }}</span>
                </span>

        <span>{{ format(match.start_time * 1000, 'MM-dd hh:mm') }}</span>
      </h3>
      <div style="margin-top: 0.8rem;">

        <van-popover placement="bottom-start" v-model="showPicker" trigger="click">
          <template #reference>
            <span class="fs20" style="color: #ddd;"
                  @click="showPicker = true">{{ match.home_name }} v {{ match.away_name }}</span>
            <i class="van-icon van-icon-arrow-down" style="color: #cecece;"></i>
          </template>

          <div class="ab hide-scroll-bar" :style="{width: '17rem'}" @click.stop>
            <ul class="tmp2-overlay-content scroll-y">
              <li :class="mat.match_id === match_id && 'active'"
                  v-for="mat of matches"
                  @click="_changeMatch(mat)"
                  :key="mat.match_id"
              >{{ mat.home_name }} V {{ mat.away_name }}
              </li>
            </ul>
          </div>
        </van-popover>
      </div>
    </div>

    <!--滚球-->
    <div class="flex-between ground-header" v-if="String(match_status) === '1'">
      <div class="full-height flex-middle" @click="$router.back()"
           style="border-right: 1px solid #5d5d5d;width: 2rem;flex-shrink: 0;">
        <i class="van-icon van-icon-arrow-left"></i>
      </div>

      <van-row gutter="4" class="flex-middle flex-1 full-height"
               v-if="Number(match.sport_id) === 1 || Number(match.sport_id) === 18 || Number(match.sport_id) === 151">
        <van-col :span="10" class="cles-1 right">{{ match.home_name }}</van-col>
        <van-col :span="4" class="flex-column flex-between re full-height">
          <div v-if="String(match.status) === '1'" class="count-down-content ab-middle-x flex-middle">
            <span class="fs10" style="white-space: pre;">{{ match.timer.period }}</span>
            <count-down
                :type="Number(sport) === 1 || (league_name.indexOf('CS:GO') === -1 && sport == 151) ? 'up' : 'down'"
                :time="(match.timer.tm || 0) * 60 + (match.timer.ts * 1 || 0)"
                :suspend="match.timer.tt"/>
          </div>
          <span v-else class="count-down-content ab flex-middle fs10 center">{{ $t(aliasStatus(match.status)) }}</span>
          <div class="flex-1 fs16 ab-middle" style="color: #FFDF1B;padding-top: 0.15rem;">
            <span>{{ match.ss ? match.ss.split('-')[0] : 0 }}</span>
            <span style="margin-left: 0.5rem;">{{ match.ss ? match.ss.split('-')[1] : 0 }}</span>
          </div>
          <div class="ab-middle-x full-width flex-middle" style="bottom: 0;">
            <p style="height:2px;width:20px;background-color: #137A5A;"></p>
            <p style="height:2px;width:20px;background-color: #fff;margin-left:2px;"></p>
          </div>
        </van-col>
        <van-col :span="10" class="cles-1">{{ match.away_name }}</van-col>
      </van-row>

      <div class="full-height flex-1 full-width"
           v-if="Number(match.sport_id) === 13 || Number(match.sport_id) === 91 || Number(match.sport_id) === 16">
        <div class="flex-middle-only flex-between full-height" style="height: 50%">
          <div class="cles-1 p-l10 flex-middle-only">
            <i class="circle m-r8" :class="match.playing_indicator === '1' ? 'active' : ''"
               v-if="Number(match.sport_id) === 13"></i>
            <span>{{ match.home_name }}</span>
          </div>

          <div style="min-width: 30%" class="flex-end" v-if="Number(match.sport_id) === 16">
            <p style="width: 1rem" class="yellow flex-middle">{{ match.ss.split('-')[0] }}</p>
          </div>

          <div v-else style="min-width: 30%" class="flex-end">
            <p style="width: 1rem" class="yellow flex-middle">{{ match.ss.split('-')[0] }}</p>
            <p style="width: 1rem" class="flex-middle" v-if="s.home"
               v-for="(s, i) in scoresObj(match.scores)" :key="i">{{ s.home }}
            </p>
            <p v-if="match.points" style="width: 1rem" class="flex-middle">
              {{ match.points.split('-')[0] }}</p>
          </div>
        </div>

        <div class="flex-middle-only flex-between" style="height: 50%">
          <div class="cles-1 p-l10 flex-middle-only">
            <i class="circle m-r8" :class="match.playing_indicator === '2' ? 'active' : ''"
               v-if="Number(match.sport_id) === 13"></i>
            <span>{{ match.away_name }}</span>
          </div>
          <div style="min-width: 30%" class="flex-end" v-if="Number(match.sport_id) === 16">
            <p style="width: 1rem" class="yellow flex-middle">{{ match.ss.split('-')[1] }}</p>
          </div>
          <div style="min-width: 30%" class="flex-end" v-else>
            <p style="width: 1rem" class="yellow flex-middle">{{ match.ss.split('-')[1] }}</p>
            <p style="width: 1rem" class="flex-middle" v-if="s.away"
               v-for="(s, i) in scoresObj(match.scores)" :key="i">
              {{ s.away }}
            </p>
            <p v-if="match.points" style="width: 1rem" class="flex-middle">
              {{ match.points.split('-')[1] }}</p>
          </div>
        </div>
      </div>

      <van-popover placement="bottom-end"
                   v-model="showPicker2"
                   trigger="click"
                   @click.stop
                   overlay>
        <div slot="reference" class="flex-middle"
             style="width: 2rem;height:2.75rem;flex-shrink: 0;"
             @click.stop="_getGroundMatches">
          <i class="van-icon van-icon-arrow-down"></i>
        </div>

        <div class="hide-scroll-bar ab ground-popover" :style="{width: '17rem', right: '0.6rem'}" @click.stop>
          <div class="tmp2-overlay-content scroll-y">
            <van-collapse v-model="league_id" :border="false" accordion>
              <van-collapse-item :name="`${league.id}`"
                                 v-for="league of leagues"
                                 :key="league.id"
                                 :border="false"
                                 :is-link="false">
                <template #title>
                  <van-row style="background: #E4E4E4;border-bottom: 1px solid #c3c3c3;"
                           class="flex-middle-only lh-45">
                    <van-col :span="22" style="color:#404040;padding-left:0.6rem;">
                      {{ league.name }}
                    </van-col>

                    <van-col :span="2" class="flex-end">
                      <i class="van-icon van-icon-arrow-down"
                         style="color:#404040;margin-right:0.6rem;"></i>
                    </van-col>
                  </van-row>
                </template>

                <div v-for="match of league.matches" :key="match.id"
                     class="flex ground-match-item"
                     :class="String(match.id) === String(match_id) ? 'active' : ''"
                     @click.stop="_changeMatch(match)">
                  <div v-if="match.sport === '1' || match.sport === '18' || match.sport === '151'">
                    <count-down
                        :type="Number(sport) === 1 || (match.league_name.indexOf('CS:GO') === -1 && sport == 151) ? 'up':'down'"
                        :time="(match.timer.tm || 0) * 60 + (match.timer.ts * 1 || 0)"
                        :suspend="match.timer.tt"/>
                  </div>

                  <div class="flex-1 m-l16">
                    <div class="flex-between">
                      <span style="color: #545454;">{{ match.home_name }}</span>
                      <p v-if="Number(match.sport) === 1 || Number(match.sport) === 18 || Number(match.sport) === 16 || Number(match.sport) === 151"
                         style="width: 1rem" class="flex-middle">{{ match.ss.split('-')[0] }}</p>
                      <div v-else class="flex-end">
                        <p style="width: 1rem" class="flex-middle">
                          {{ match.ss.split('-')[0] }}</p>
                        <p style="width: 1rem" class="flex-middle"
                           v-for="(s, i) in scoresObj(match.scores)" :key="i">
                          {{ s && s.home || '-' }}
                        </p>
                        <p v-if="match.points" style="width: 1rem" class="flex-middle">
                          {{ match.points.split('-')[0] }}</p>
                      </div>
                    </div>
                    <div class="flex-between">
                      <span style="color: #545454;">{{ match.away_name }}</span>
                      <p v-if="Number(match.sport) === 1 || Number(match.sport) === 18 || Number(match.sport) === 16 || Number(match.sport) === 151"
                         style="width: 1rem" class="flex-middle">{{ match.ss.split('-')[1] }}</p>

                      <div v-else class="flex-end">
                        <p style="width: 1rem" class="flex-middle">
                          {{ match.ss.split('-')[1] }}</p>

                        <p style="width: 1rem" class="flex-middle"
                           v-for="(s, i) in scoresObj(match.scores)" :key="i">
                          {{ s && s.away || '-' }}
                        </p>
                        <p v-if="match.points" style="width: 1rem" class="flex-middle">
                          {{ match.points.split('-')[1] }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
      </van-popover>
    </div>

    <div class="full-width tabs-title border-bottom-line">
      <scroll-x :tabs="market_tabs" v-slot="{ item }" @change="selectPlay">
        <template>
          <div class="flex-middle-only re" style="padding-right: 1.2rem;">
            <span class="fs14" style="color: #cecece;" :class="item.index === groupIndex ? 'active' : ''">
                {{ item && item.name }}
            </span>
          </div>
        </template>
      </scroll-x>
    </div>


    <div v-if="playList && playList.length" style="background-color: #505050;color:#ddd;"
         v-for="group of playList" :key="group.market_group_id">
      <div>
        <div class="flex-between pd-12 lh-45">
          <span class="fs14">{{ group.name }}</span>
        </div>

        <!--比赛投注/半场/赛盘投注-->
        <van-row class="flex-middle-only group-nav-title" v-if="isMatchBetting(group.code) ||
                    group.code === 'tennis_set_betting' ||
                    group.code === 'baseball_game_lines' ||
                    group.code === 'volleyball_game_lines'||
                    group.code === 'esports_match_lines'"
        >
          <van-col :span="8" :offset="8" class="center fs12 cles-1">{{ match.home_name }}</van-col>
          <van-col :span="8" class="center fs12 cles-1">{{ match.away_name }}</van-col>
        </van-row>

        <!--让球/比赛获胜/赛局正确比分-->
        <van-row class="flex-middle-only group-nav-title"
                 v-if="group.code === 'asian_handicap' ||
                         group.code === 'tennis_to_win_match' ||
                         group.code === 'volleyball_correct_set_score' ||
                         group.code === 'tennis_set_winner' ||
                         group.code === 'tennis_set_1_winner'"
        >
          <van-col :span="12" class="center fs12 cles-1">{{ match.home_name }}</van-col>
          <van-col :span="12" class="center fs12 cles-1">{{ match.away_name }}</van-col>
        </van-row>

        <!--大小盘-->
        <van-row v-if="group.code === 'match_goals'" class="flex-middle-only group-nav-title">
          <van-col :span="8" :offset="8" class="center fs12">{{ $t('height') }}</van-col>
          <van-col :span="8" class="center fs12">{{ $t('below') }}</van-col>
        </van-row>

        <!--半场/让分三项/波胆/独赢-->
        <van-row class="flex-middle-only group-nav-title"
                 v-if="group.code === 'half_time_correct_score' ||
                        group.code === 'correct_score' ||
                        group.code === 'half_time_incorrect_score' ||
                        group.code === 'full_time_result' ||
                        group.code === 'incorrect_score' ||
                        group.code === 'basketball_point_spread_3_way'"
        >
          <van-col :span="8" class="center fs12 cles-1">{{ match.home_name }}</van-col>
          <van-col :span="8" class="center fs12">{{ $t('pingj') }}</van-col>
          <van-col :span="8" class="center fs12 cles-1">{{ match.away_name }}</van-col>
        </van-row>
      </div>

      <!--全场独赢-->
      <van-row gutter="1" class="border-bottom-line" v-if="group.code === 'full_time_result'">
        <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">
          <play class="lh-45"
                :match="match"
                :group="group"
                :play="findPlay('name', v,  group.markets)"
          />
        </van-col>
      </van-row>

      <!--让分三项-->
      <van-row gutter="1" class="border-bottom-line" v-if="group.code === 'basketball_point_spread_3_way'">
        <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">
          <play class="lh-45 flex-middle"
                :match="match"
                :group="group"
                :show-handicap="true"
                :play="findPlay('header', v,  group.markets)"
          />
        </van-col>
      </van-row>

      <!--让球-->
      <van-row gutter="1" class="border-bottom-line" v-if="group.code === 'asian_handicap'">
        <van-col :span="12" v-for="v of ['h', 'a']" :key="v" class="flex-column">
          <play class="lh-45 flex-middle"
                v-for="play of group.markets" :key="play.market_id"
                v-if="play.header2 === v"
                :show-handicap="true"
                :match="match"
                :group="group"
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

      <!--大小盘-->
      <van-row gutter="1" class="border-bottom-line" v-if="group.code === 'match_goals'">
        <van-col :span="8" class="flex-middle lh-45">{{
            group.markets[0] && group.markets[0].handicap &&
            group.markets[0].handicap.replace(',', '/')
          }}
        </van-col>
        <van-col :span="8" v-for="v of ['o', 'u']" :key="v">
          <play class="lh-45"
                :match-goals-name="false"
                :match="match"
                :group="group"
                :play="findPlay('header2', v,  group.markets)"
          />
        </van-col>
      </van-row>

      <!--反驳但-->
      <van-row gutter="1" class="border-bottom-line" v-if="group.code === 'incorrect_score' ||
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

      <!--正确比分-->
      <!--      <van-row gutter="1" class="border-bottom-line" v-if="group.code === 'correct_score'">-->
      <!--        <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">-->
      <!--          <play class="lh-45 flex-middle"-->
      <!--                :match="match"-->
      <!--                :group="group"-->
      <!--                :show-name="true"-->
      <!--                v-for="play of group.markets" :key="play.market_id"-->
      <!--                v-if="play.header === v"-->
      <!--                :play="play"-->
      <!--          />-->
      <!--        </van-col>-->
      <!--      </van-row>-->

      <!--半场正确比分-->
      <!--      <van-row gutter="1" class="border-bottom-line"-->
      <!--               v-if="group.code === 'half_time_correct_score'"-->
      <!--      >-->
      <!--        <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">-->
      <!--          <play class="lh-45 flex-middle"-->
      <!--                :match="match"-->
      <!--                :group="group"-->
      <!--                :fullTimeResultName="true"-->
      <!--                :show-name="true"-->
      <!--                v-for="play of group.markets" :key="play.market_id"-->
      <!--                v-if="play.header === v"-->
      <!--                :play="play"-->
      <!--          />-->
      <!--        </van-col>-->
      <!--      </van-row>-->

      <!--比赛投注模板-->
      <div class="border-bottom-line" v-if="isMatchBetting(group.code)">
        <van-row gutter="1" class="grid-line-bottom">
          <van-col :span="8" class="flex-middle full-height grid-line-right">
            <span class="fs12">{{ $t('r_f') }}</span>
          </van-col>
          <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
            <play class="flex-column flex-middle"
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
            <span class="fs12">{{ $t('z_f') }}</span>
          </van-col>
          <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
            <play class="flex-column flex-middle"
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
            <span class="fs12">{{ $t('game_lines_money_line') }}</span>
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
            <span class="fs12">{{ $t('winner') }}</span>
          </van-col>
          <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
            <play class="flex-column flex-middle"
                  :match="match"
                  :group="group"
                  :show-handicap="true"
                  v-for="play of group.markets" :key="play.market_id"
                  v-if="play.name === 'to_win' && play.header === v"
                  :play="play"
            />
          </van-col>
        </van-row>
        <van-row gutter="1" class="grid-line-bottom">
          <van-col :span="8" class="flex-middle full-height grid-line-right">
            <span class="fs12">{{ $t('r_f') }}</span>
          </van-col>
          <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
            <play class="flex-column flex-middle"
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
            <span class="fs12">{{ $t('z_f') }}</span>
          </van-col>
          <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
            <play class="flex-middle flex-column"
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

      <!--棒球-->
      <div class="border-bottom-line" v-if="group.code === 'baseball_game_lines'">
        <van-row gutter="1" class="grid-line-bottom">
          <van-col :span="8" class="flex-middle full-height grid-line-right">
            <span class="fs12">{{ $t('r_l') }}</span>
          </van-col>
          <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
            <play class="flex-middle"
                  :match="match"
                  :group="group"
                  :show-handicap="true"
                  v-for="play of group.markets" :key="play.market_id"
                  v-if="play.name === 'run_line' && play.header === v"
                  :play="play"
            />
          </van-col>
        </van-row>
        <van-row gutter="1" class="grid-line-bottom">
          <van-col :span="8" class="flex-middle full-height grid-line-right">
            <span class="fs12">{{ $t('z_f') }}</span>
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
            <span class="fs12">{{ $t('q_r_p') }}</span>
          </van-col>
          <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
            <play class="flex-middle"
                  :match="match"
                  :group="group"
                  :show-handicap="true"
                  v-for="play of group.markets" :key="play.market_id"
                  v-if="play.name === 'money_line' && play.header === v"
                  :play="play"
            ></play>
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

      <!--电子竞技-->
      <div class="border-bottom-line" v-if="group.code === 'esports_match_lines'">
        <van-row gutter="1" class="grid-line-bottom">
          <van-col :span="8" class="flex-middle full-height grid-line-right">
            <span class="fs12">{{ $t('winner') }}</span>
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
            <span class="fs12">{{ $t('r_f_p') }}</span>
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
            <span class="fs12">{{ $t('d_t_s') }}</span>
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
              <span slot="alias" class="fs10">{{ v === '1' ? $t('height') : $t('below') }}</span>
            </play>
          </van-col>
        </van-row>
      </div>
    </div>

    <div v-if="isLoad && !playList.length" class="lh-45 flex-middle" style="color:#cecece;">
      {{ $t('no_more_play') }}
    </div>

    <van-overlay :show="loading"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.7)`}">
      <van-loading v-if="loading" class="ab-middle flex-middle" size="50px"/>
    </van-overlay>
  </CommonLayout>
</template>
<script>
import CommonLayout from "../../../components/CommonLayout";
import ScrollX from "../../../common/ScrollX";
import {getMatches} from "../../../axios/sport";
import betDetail from "../../../mixins/betDetail";
import CountDown from "../../../common/CountDown";
import Play from "../../../components/Play";

export default {
  mixins: [betDetail],
  data() {
    return {
      activeCollapses: [],
      league_name: '',
      leagues: []
    }
  },

  methods: {
    // 滚球下拉列表
    _getGroundMatches() {
      let params = {
        sport: this.match.sport_id, // 1 足球
        // day: format(new Date(), 'yyyyMMdd'),
        category: 'inplay',
        page: 1,
        pageSize: 200,
        // league: this.leagueId
      }

      this.loading = true

      getMatches(params)
          .then(res => {
            this.loading = false

            if (res.code === 200) {
              this.leagues = this.serializeList(res.data.data)
              console.log('this.leagues', this.leagues)
              this.showPicker2 = true
            }
          })
          .catch(err => {
            this.loading = false
            console.log(err)
          })
    },

    // 序列化 比赛下拉列表
    serializeList(arr) {
      let leaguesObj = {}
      this.activeCollapses = []

      arr.forEach(item => {
        let match = {...item.match, sport: item.sport, league_name: item.league.name}
        let league_id = item.league.id
        this.activeCollapses.push(league_id)

        if (!leaguesObj[league_id]) {
          leaguesObj[league_id] = {
            matches: [match],
            ...item.league,
            sport: item.sport,
          }
        } else {
          leaguesObj[league_id].matches.push(match)
        }
      })

      let list = Object.values(leaguesObj)

      console.log('list===>', list)

      return list
    }
  },

  components: {
    ScrollX,
    CountDown,
    Play,
    CommonLayout
  }
}
</script>
<style type="text/css" lang="less">
.bet-detail-tmp2 {
  .bet-name {
    padding-right: 0.4rem;
  }

  .bet-handicap {
    margin-right: 0.4rem;
  }

  .ground-header {
    color: #ddd;
    height: 2.5rem;
    background-color: #383838;
  }

  .count-down-content {
    background-color: #165031;
    color: #5FE8BD;
    font-size: 0.6rem;
    padding: 0 0.25rem;
    min-width: 3.6rem;
    max-width: 4rem;
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
      border-bottom: 1px solid #fff;
    }
  }

  .grid-line-bottom {
    border-bottom: 1px solid #5D5D5D;
    height: 2.25rem;
  }
}
</style>
