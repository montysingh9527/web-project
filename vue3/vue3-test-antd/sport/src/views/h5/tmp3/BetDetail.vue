<template>
  <div class="tmp3-h5-detail scroll-y">
    <Head>
      <p class="flex-middle" @click="handleShowSheel">
        <span>{{match.league_name || league_name}}</span>
        <i class="icon icon_triangle" v-if="!loading" style="margin-top: 5px;"></i>
        <van-loading size="20" v-else/>
      </p>
      <template slot="right">
        <i class="icon_base icon-kefu-white" @click="jumpService"></i>
      </template>
    </Head>

    <div class="match-info re">
      <div class="collect-content ab-middle-x flex-middle" :class="{active: isFavorite}" @click="_favorite">
        <van-icon name="star" :color="isFavorite ? '#F0AA08' : '#ddd'"/>
        <span class="fs12 m-l4">{{$t('s_c')}}</span>
      </div>

      <!--足球 篮球 电子竞技 或者比赛未开始-->
      <van-row class="full-height re" v-if="[1, 18, 16, 151].includes(Number(match.sport_id)) || match.status != 1">
        <van-col :span="9" class="flex-column flex-middle full-height">
          <img class="block logo" :src="match.home_logo" alt="">
          <p class="center bold" style="color: #7B5605;">{{match.home_name}}</p>
          <p class="bold fs18" style="color: #7B5605;" v-if="match.status == 1">{{match.ss ? match.ss.split('-')[0] : '-'}}</p>
        </van-col>
        <van-col :span="6" class="full-height">
          <!--比赛进行中-->
          <div v-if="String(match.status) === '1'" class="count-down-content ab-middle flex-middle">
            <p class="center fs10" style="white-space: pre;">{{ match.timer.period }}</p>
            <count-down
                :type="Number(sport) === 1 || (league_name.indexOf('CS:GO') === -1 && sport == 151) ? 'up' : 'down'"
                :time="(match.timer.tm || 0) * 60 + (match.timer.ts * 1 || 0)"
                :suspend="match.timer.tt"/>
          </div>

          <!--未开始-->
          <div v-else class="flex-column flex-middle full-height">
            <span>{{$utils.format(match.start_time * 1000, 'MM-dd') || '--'}}</span>
            <span class="start-time inline-block fs12 flex-middle white m-t8">{{$utils.format(match.start_time * 1000, 'hh:mm')|| '--'}}</span>
            <span>{{ $t(aliasStatus(match.status)) }}</span>
          </div>
        </van-col>
        <van-col :span="9" class="flex-column flex-middle full-height">
          <img class="block logo" :src="match.away_logo" alt="">
          <p class="center bold" style="color: #7B5605;">{{match.away_name}}</p>
          <p class="bold fs18" style="color: #7B5605;" v-if="match.status == 1">{{match.ss ? match.ss.split('-')[1] : ''}}</p>
        </van-col>
      </van-row>

      <div class="full-height full-width p-r16 flex-column flex-middle" v-if="[13, 91].includes(Number(match.sport_id)) && match.status == 1">
        <div class="flex-middle-only flex-between full-width">
          <div class="cles-1 p-l10 flex-middle-only">
            <img style="height: 1.2rem;vertical-align: middle;" :src="match.home_logo" alt="">
            <span style="color: #7B5605;">{{ match.home_name }}</span>
          </div>

          <div style="min-width: 30%" class="flex-end" v-if="Number(match.sport_id) === 16">
            <p style="width: 1rem;color: #7B5605;" class="flex-middle">{{ match.ss.split('-')[0] }}</p>
          </div>

          <div v-else style="min-width: 30%" class="flex-end">
            <p style="width: 1rem;color: #7B5605;" class="flex-middle">{{ match.ss.split('-')[0] }}</p>
            <p style="width: 1rem" class="flex-middle" v-if="s.home"
               v-for="(s, i) in match.scores" :key="i">{{ s.home }}
            </p>
            <p v-if="match.points" style="width: 1rem" class="flex-middle">{{ match.points.split('-')[0] }}</p>
          </div>
        </div>

        <div class="flex-middle-only flex-between full-width m-t12">
          <div class="cles-1 p-l10 flex-middle-only">
            <img style="height: 1.2rem;vertical-align: middle;" :src="match.away_logo" alt="">
            <span style="color: #7B5605;">{{ match.away_name }}</span>
          </div>
          <div style="min-width: 30%" class="flex-end" v-if="Number(match.sport_id) === 16">
            <p style="width: 1rem" class="flex-middle">{{ match.ss.split('-')[1] }}</p>
          </div>
          <div style="min-width: 30%" class="flex-end" v-else>
            <p style="width: 1rem;color: #7B5605;" class="flex-middle">{{ match.ss.split('-')[1] }}</p>
            <p style="width: 1rem" class="flex-middle" v-if="s.away" v-for="(s, i) in match.scores" :key="i">{{ s.away }}</p>
            <p v-if="match.points" style="width: 1rem" class="flex-middle">{{ match.points.split('-')[1] }}</p>
          </div>
        </div>
      </div>
      <!--tab-->
      <div class="full-width tabs-title ab" style="bottom: 0;">
        <scroll-x :tabs="market_tabs" v-slot="{ item }" @change="selectPlay">
          <template>
            <div class="flex-middle-only re" style="padding-right: 1.2rem;">
              <span class="fs12" style="color: #cecece;" :class="item.index === groupIndex ? 'active' : ''">{{ item && item.name }}</span>
            </div>
          </template>
        </scroll-x>
      </div>
    </div>

    <div class="play-info-content bg-white" v-if="playList && playList.length">
      <div v-for="group of playList" :key="group.market_group_id">
        <div class="flex-middle-only pd-12 lh-40">
          <i class="inline-block vertical-line"></i>
          <span class="fs12 m-l4" style="color: #7B5605;">{{ group.name }}</span>
        </div>

        <!--主队、客队-->
        <van-row class="flex-middle-only m-b8" v-if="group.code === 'asian_handicap'">
          <van-col :span="12" class="center fs12 cles-1" style="color: #4D5872;">{{ match.home_name }}</van-col>
          <van-col :span="12" class="center fs12 cles-1" style="color: #4D5872;">{{ match.away_name }}</van-col>
        </van-row>

        <!--全场独赢-->
        <van-row gutter="10" v-if="group.code === 'full_time_result'">
          <van-col :span="12" v-for="v of ['1', 'x', '2']" :key="v" class="m-t8">
            <play class="play-bg flex-between p-l8 p-r5"
                  :show-name="true"
                  :match="match"
                  :group="group"
                  :play="findPlay('name', v,  group.markets)"
            >
                <span slot="play-name" slot-scope="{play}">{{play.name == '1' ? match.home_name : play.name == '2' ? match.away_name : $t('pingj')}}</span>
            </play>
          </van-col>
          <!--占位-->
          <van-col :span="12"></van-col>
        </van-row>

        <!--让分三项-->
        <van-row gutter="10" v-if="group.code === 'basketball_point_spread_3_way'">
          <van-col :span="12" v-for="v of ['1', 'x', '2']" :key="v">
            <play class="play-bg flex-around"
                  :match="match"
                  :group="group"
                  :show-handicap="true"
                  :play="findPlay('header', v,  group.markets)"
            >
              <span slot="alias">
                {{v == '1' ? match.home_name : v == '2' ? match.away_name : $t('pingj')}}
              </span>
            </play>
          </van-col>
        </van-row>

        <!--让球-->
        <van-row gutter="10" class="" v-if="group.code === 'asian_handicap'">
          <van-col :span="12" v-for="v of ['h', 'a']" :key="v" class="flex-column">
            <play class="play-bg flex-between p-l8 p-r5"
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
        <van-row gutter="10" v-if="group.code === 'tennis_to_win_match' || group.code === 'tennis_set_1_winner' || group.code === 'tennis_set_winner'">
          <van-col :span="24" class="flex-between fs12 m-b8">
            <p class="flex-1 center">{{match.home_name}}</p>
            <p class="flex-1 center">{{match.away_name}}</p>
          </van-col>
          <van-col :span="12" v-for="v of ['1', '2']" :key="v" class="flex-column">
            <play class="play-bg flex-middle"
                  :match="match"
                  :group="group"
                  :play="findPlay('header', v,  group.markets)"
            />
          </van-col>
        </van-row>

        <!--大小盘-->
        <van-row gutter="10" class="" v-if="group.code === 'match_goals'">
          <van-col :span="12" v-for="v of ['o', 'u']" :key="v">
            <play class="play-bg flex-between p-l8 p-r5"
                  :show-header="true"
                  :show-name="true"
                  :match="match"
                  :group="group"
                  :play="findPlay('header2', v,  group.markets)"
            >
            </play>
          </van-col>
        </van-row>

        <!--反驳但-->
        <van-row gutter="10" class="" v-if="group.code === 'incorrect_score' ||
        group.code === 'correct_score' ||
        group.code === 'half_time_incorrect_score' ||
        group.code === 'half_time_correct_score'"
        >
          <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">
            <play class="play-bg flex-around m-b8"
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
        <div class="" v-if="isMatchBetting(group.code)">
          <van-row gutter="8">
            <van-col :span="9" :offset="6" class="center fs12 lh-30">{{match.home_name}}</van-col>
            <van-col :span="9" class="center fs12 lh-30">{{match.away_name}}</van-col>
          </van-row>
          <van-row gutter="8" class="flex-middle-only">
            <van-col :span="6" class="full-height flex-middle-only p-l10">
              <p style="width: 2px;height: 12px;background: #7B5605;border-radius: 4px;"></p>
              <span class="fs12 m-l4">{{ $t('r_f') }}</span>
            </van-col>
            <van-col :span="9" v-for="v of ['1', '2']" :key="v" class="full-height">
              <play class="flex-between play-bg p-l8 p-r5"
                    :match="match"
                    :group="group"
                    :show-handicap="true"
                    v-for="play of group.markets" :key="play.market_id"
                    v-if="play.name === 'Spread' && play.header === v"
                    :play="play"
              />
            </van-col>
          </van-row>
          <van-row gutter="8" class="flex-middle-only m-t8">
            <van-col :span="6" class="flex-middle-only full-height p-l10">
              <p style="width: 2px;height: 12px;background: #7B5605;border-radius: 4px;"></p>
              <span class="fs12 m-l4">{{ $t('z_f') }}</span>
            </van-col>
            <van-col :span="9" v-for="v of ['1', '2']" :key="v" class="full-height">
              <play class="flex-between play-bg p-l8 p-r5"
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
          <van-row gutter="8" class="flex-middle-only m-t8">
            <van-col :span="6" class="flex-middle-only full-height p-l10">
              <p style="width: 2px;height: 12px;background: #7B5605;border-radius: 4px;"></p>
              <span class="fs12 m-l4">{{ $t('game_lines_money_line') }}</span>
            </van-col>
            <van-col :span="9" v-for="v of ['1', '2']" :key="v" class="full-height">
              <play class="flex-between play-bg p-l8"
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
          <van-row class="fs12">
            <van-col :offset="6" :span="9" class="lh-30 center">{{match.home_name}}</van-col>
            <van-col :span="9" class="lh-30 center">{{match.away_name}}</van-col>
          </van-row>
          <van-row gutter="8" class="flex-middle-only">
            <van-col :span="6" class="flex-middle-only full-height p-l10">
              <p style="width: 2px;height: 12px;background: #7B5605;border-radius: 4px;"></p>
              <span class="fs12 m-l4">{{ $t('winner') }}</span>
            </van-col>
            <van-col :span="9" v-for="v of ['1', '2']" :key="v" class="full-height">
              <play class="flex-middle play-bg"
                    :match="match"
                    :group="group"
                    :show-handicap="true"
                    v-for="play of group.markets" :key="play.market_id"
                    v-if="play.name === 'to_win' && play.header === v"
                    :play="play"
              />
            </van-col>
          </van-row>
          <van-row gutter="8" class="flex-middle-only m-t8">
            <van-col :span="6" class="flex-middle-only full-height p-l10">
              <p style="width: 2px;height: 12px;background: #7B5605;border-radius: 4px;"></p>
              <span class="fs12 m-l4">{{ $t('r_f') }}</span>
            </van-col>
            <van-col :span="9" v-for="v of ['1', '2']" :key="v" class="full-height">
              <play class="flex-between play-bg p-l8 p-r5"
                    :match="match"
                    :group="group"
                    :show-handicap="true"
                    v-for="play of group.markets" :key="play.market_id"
                    v-if="play.name === 'handicap_sets' && play.header === v"
                    :play="play"
              />
            </van-col>
          </van-row>
          <van-row gutter="8" class="flex-middle-only m-t8">
            <van-col :span="6" class="flex-middle-only full-height p-l10">
              <p style="width: 2px;height: 12px;background: #7B5605;border-radius: 4px;"></p>
              <span class="fs12 m-l4">{{ $t('z_f') }}</span>
            </van-col>
            <van-col :span="9" v-for="v of ['1', '2']" :key="v" class="full-height">
              <play class="flex-around play-bg"
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
        <div class="" v-if="group.code === 'baseball_game_lines'">
          <van-row gutter="8">
            <van-col :span="8" class="flex-middle full-height">
              <span class="fs12">{{ $t('r_l') }}</span>
            </van-col>
            <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
              <play class="flex-middle play-bg"
                    :match="match"
                    :group="group"
                    :show-handicap="true"
                    v-for="play of group.markets" :key="play.market_id"
                    v-if="play.name === 'run_line' && play.header === v"
                    :play="play"
              />
            </van-col>
          </van-row>
          <van-row gutter="8">
            <van-col :span="8" class="flex-middle full-height">
              <span class="fs12">{{ $t('z_f') }}</span>
            </van-col>
            <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
              <play class="flex-middle play-bg"
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
          <van-row gutter="8">
            <van-col :span="8" class="flex-middle full-height">
              <span class="fs12">{{ $t('q_r_p') }}</span>
            </van-col>
            <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
              <play class="flex-middle play-bg"
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
        <van-row gutter="10" class="" v-if="group.code === 'volleyball_correct_set_score'">
          <van-col :span="12" v-for="v of ['1', '2']" :key="v">
            <play class="play-bg flex-between p-l8 p-r5 m-b8"
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
        <div class="" v-if="group.code === 'tennis_set_betting'">
          <van-row gutter="8" class="flex-middle-only m-b8" v-for="name of scoreBetSetting(group.markets)" :key="name">
            <van-col :span="6" class="flex-middle-only full-height p-l10">
              <p style="width: 2px;height: 12px;background: #7B5605;border-radius: 4px;"></p>
              <span class="fs12 m-l4">{{ name }}</span>
            </van-col>
            <van-col :span="9" v-for="v of ['1', '2']" :key="v" class="full-height">
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

        <!--电子竞技-->
        <div class="" v-if="group.code === 'esports_match_lines'">
          <van-row gutter="8" class="flex-middle-only">
            <van-col :span="6" class="flex-middle-only full-height p-l10">
              <p style="width: 2px;height: 12px;background: #7B5605;border-radius: 4px;"></p>
              <span class="fs12 m-l4">{{ $t('winner') }}</span>
            </van-col>
            <van-col :span="9" v-for="v of ['1', '2']" :key="v" class="full-height">
              <play class="play-bg flex-middle"
                    :match="match"
                    :group="group"
                    v-for="play of group.markets" :key="play.market_id"
                    v-if="play.name === 'to_win' && play.header === v"
                    :play="play"
              />
            </van-col>
          </van-row>
          <van-row gutter="8" class="flex-middle-only m-t8">
            <van-col :span="6" class="flex-middle-only full-height p-l10">
              <p style="width: 2px;height: 12px;background: #7B5605;border-radius: 4px;"></p>
              <span class="fs12 m-l4">{{ $t('r_f_p') }}</span>
            </van-col>

            <van-col :span="9" v-for="v of ['1', '2']" :key="v" class="full-height">
              <play class="flex-middle play-bg"
                    :match="match"
                    :group="group"
                    :show-handicap="true"
                    v-for="play of group.markets" :key="play.market_id"
                    v-if="play.name === 'match_handicap' && play.header === v"
                    :play="play"
              ></play>
            </van-col>
          </van-row>
          <van-row gutter="1" class="flex-middle-only m-t8">
            <van-col :span="8" class="flex-middle-only full-height p-l10">
              <p style="width: 2px;height: 12px;background: #7B5605;border-radius: 4px;"></p>
              <span class="fs12 m-l4">{{ $t('d_t_s') }}</span>
            </van-col>
            <van-col :span="9" v-for="v of ['1', '2']" :key="v" class="full-height">
              <play class="flex-around play-bg"
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
    </div>

    <div v-if="isLoad && !playList.length" class="lh-45 flex-middle" style="color:#cecece;">
      {{ $t('no_more_play') }}
    </div>

    <van-action-sheet v-model="showLeagueSheet" :title="$t('s_ty')">
      <div class="sheet-content" style="min-height: 40vh;">
        <van-tabs style="max-width: 80vw;min-width: 10rem;"
                  color="#7B5605"
                  :ellipsis="false"
                  line-width="30px"
                  title-active-color="#7B5605"
                  title-inactive-color="#818796"
                  @click="_changeCate"
        >
          <van-tab v-for="cate of categories" :key="cate.value">
            <template #title> {{$t(cate.txt)}} </template>
          </van-tab>
        </van-tabs>
        <van-loading class="flex-middle" v-if="loading" />
        <van-collapse v-model="activeCollapses" :border="false" accordion >
          <van-collapse-item :name="league.id"
                             v-for="league of leagues"
                             :key="league.id"
                             :border="false"
                             :is-link="false">
            <template #title>
              <div class="flex-between lh-40 fs12 cursor league-title" :style="String(activeCollapses) === String(league.id) && 'border-bottom: none!important;'">
                <div class="flex-middle-only">
                  <p style="width: 2px;height: 12px;background: #7B5605;border-radius: 4px;"></p>
                  <span class="m-l8">{{ league.name }}</span>
                </div>

                <van-icon name="arrow" color="#7B5605" :class="String(activeCollapses) === String(league.id) && 'active_arrow'"/>
              </div>
            </template>

            <div class="flex-between match-item" :class="match.id === match_id ? 'active' : ''"
                 v-for="match of league.matches" :key="match.id"
                 @click="handleSelectMatch(match)">
              <van-row class="cursor full-width" v-if="match.status == '1'">
                <van-col :span="4" class=" fs12 flex-middle" style="color:#4D5872;height: 2.5rem;">
                  <p class="fs12" style="color: #4E5772;" v-if="match.sport == '13'">
                    {{$t('saip') + match.current_set + $t('saij') + match.current_game}}
                  </p>
                  <p class="fs12" style="color: #4E5772; margin-top: 0.4rem;height: 1rem;" v-else-if="match.sport == '91'"></p>
                  <div v-else>
                    <p class="fs12">{{match.timer.period}}</p>
                    <count-down
                        :type="Number(match.sport) == 1 || (match.league_name.indexOf('CS:GO') === -1 && match.sport == 151) ? 'up' : 'down'"
                        :time="(match.timer.tm || 0) * 60 + (match.timer.ts * 1 || 0)"
                        :suspend="match.timer.tt"/>
                  </div>

                  <p class="m-l10" style="height: 32px;background: #DDE6EE;width: 1px;"></p>
                </van-col>
                <van-col :span="20" class="p-r16 flex-column flex-between p-t8 p-b8" style="height: 2.5rem;">
                  <div class="flex-between full-width">
                    <p class="flex-middle-only">
                      <img :src="match.home_logo" style="width: 0.8rem;" alt="">
                      <span class="cles-1 m-l4">{{ match.home_name }}</span>
                    </p>

                    <div class="flex-middle-only">
                      <span style="color: #7B5605" v-if="[1, 18, 16, 151].includes(Number(match.sport))">{{match.ss ? match.ss.split('-')[0] : '-'}}</span>
                      <p style="width: 1rem" class="flex-middle" v-else v-for="(s, i) in match.scores" :key="i">{{ s && s.home }}
                      </p>
                      <p v-if="match.points" style="width: 1rem" class="flex-middle">{{ match.points.split('-')[0] }}</p>
                    </div>
                  </div>

                  <div class="flex-between full-width">
                    <p class="flex-middle-only">
                      <img :src="match.away_logo" style="width: 0.8rem;" alt="">
                      <span class="cles-1 m-l4">{{ match.away_name }}</span>
                    </p>

                    <div class="flex-middle-only">
                      <span style="color: #7B5605" v-if="[1, 18, 16, 151].includes(Number(match.sport))">{{match.ss ? match.ss.split('-')[1] : '-'}}</span>
                      <p style="width: 1rem" class="flex-middle" v-else
                         v-for="(s, i) in match.scores" :key="i">{{ s && s.away }}
                      </p>
                      <p v-if="match.points" style="width: 1rem" class="flex-middle">{{ match.points.split('-')[1] }}</p>
                    </div>
                  </div>
                </van-col>
              </van-row>
              <van-row class="cursor full-width" v-else>
                <van-col :span="11" class="flex-middle-only flex-end fs12" style="color:#4D5872;">
                  <span class="cles-1 m-r8">{{ match.home_name }}</span>
                  <img :src="match.home_logo" style="width: 0.8rem;" alt="">
                </van-col>
                <van-col :span="2" class="flex-middle">VS</van-col>
                <van-col :span="11" class="flex-middle-only flex-start fs12" style="color:#4D5872;">
                  <img :src="match.away_logo" style="width: 0.8rem;" alt="">
                  <span class="cles-1 m-l8">{{ match.away_name }}</span>
                </van-col>
              </van-row>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </van-action-sheet>

    <FootBetController/>
  </div>
</template>
<script>
import ScrollX from "../../../common/ScrollX";
import {favorite, getMatches} from "../../../axios/sport";
import betDetail from "../../../mixins/betDetail";
import CountDown from "../../../common/CountDown";
import Play from "../../../components/Play";
import Head from "../../../components/temp3/Head"
import { mapGetters } from "vuex";
import Event from "../../../event"
import FootBetController from "../../../components/FootBetControll";

export default {
  mixins: [ betDetail ],
  data() {
    return {
      activeCollapses: '',
      league_name: '',
      leagues: [],
      showLeagueSheet: false,
      sportCollapses: [],
      loading: false,
    }
  },

  computed: {
    ...mapGetters(['projectConfig', 'userInfo'])
  },

  methods: {
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
    jumpService() {
      window.open(this.projectConfig.zxkfUrl, '_blank')
    },

    // 滚球下拉列表
    _getGroundMatches(category = 'today') {
      let params = {
        sport: this.match.sport_id || this.sport, // 1 足球
        category,
        page: 1,
        pageSize: 200,
        // league: this.leagueId
      }
      this.loading = true;
      this.leagues = []
      getMatches(params)
        .then(res => {
          this.loading = false;
          if (res.code === 200) {
            this.leagues = this.serializeList(res.data.data)
            console.log('this.leagues', this.leagues)
          }
        })
        .catch(err => {
          Event.$emit('loading', {loading: false});
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
    },

    handleSelectMatch(match = {}) {
      this.showLeagueSheet = false;
      this._changeMatch(match)
    },

    _changeCate(index = 0) {
      console.log('index', index)
      this._getGroundMatches(this.categories[index].value);
    },

    handleShowSheel() {
      if (this.loading) return;
      this.showLeagueSheet = true;
    }
  },

  components: {
    ScrollX,
    CountDown,
    Play,
    Head,
    FootBetController
  },

  mounted() {
    this._getGroundMatches();
  },

  created() {
    this.categories = [
      {txt: 'j_r', value: 'today'},
      {txt: 'z_p', value: 'upcoming'},
      {txt: 'groun', value: 'inplay'},
      {txt: 's_c', value: 'favorite'},
    ]
  }
}
</script>
<style type="text/css" lang="less">
@import "../../../assets/css/mobile";
  .tmp3-h5-detail {
    height: 100vh;
    padding-bottom: 3rem;
    .match-info {
      height: 9.25rem;
      width: 100vw;
      background-image: url("../../../assets/images/tmp3/match-info-bg.png");
      background-size: 100% auto;
    }

    .collect-content {
      min-width: 3.4rem;
      height: 1rem;
      background-size: 100% 100%;
      z-index: 9999;
      border: 1px solid #ddd;
      color: #ddd;
      &.active {
        background-color: #0BE9AD;
        color: #fff;
      }
    }

    .logo {
      width: 2rem;
      height: 2rem;
      margin-bottom: .8rem;
    }
    .start-time {
      width: 2.5rem;
      height: 1rem;
      background-image: linear-gradient(180deg, #F0AA08 0%, #B88306 100%);
      border-radius: 0.5rem;
    }

    .tabs-title {
      padding: 0 0.6rem;
      line-height: 1.6rem;
      color: #818796;
      .active {
        color: #7B5605!important;
        border-bottom: 2px solid #7B5605;
      }
    }

    .play-info-content {
      padding: 0 .6rem;
      box-shadow: 0px -2px 4px 0px rgba(221,228,243,1);
      border-radius: 10px 10px 0 0;
    }

    .vertical-line {
      width: 2px;
      height: 12px;
      background: #7B5605;
      border-radius: 10px;
    }

    .play-bg {
      height: 1.5rem;
      background-image: url("../../../assets/images/tmp3/bet-item-bg.png") !important;
      background-size: 100% 100%;
      &.active {
        background-image: url("../../../assets/images/tmp3/bet-item-bg-active.png")!important;
      }
    }

    .sheet-content {
      padding: 0 .8rem .6rem;
    }

    .active_arrow {
      transition: transform .2s linear;
      transform: rotate(90deg);
    }

    .match-item {
      background-image: url("../../../assets/images/tmp3/match-sheel.png");
      background-size: 100% 100%;
      margin-bottom: .6rem;
      height: 2.4rem;
      &.active {
        background-image: url("../../../assets/images/tmp3/match-sheel-active.png") !important;
      }
    }

    .league-title {
      color: #7B5605;
      border-bottom: 1px solid #eedeee;
    }

    .van-collapse-item .van-collapse-item__title {
      padding: 0!important;
    }
  }
</style>
