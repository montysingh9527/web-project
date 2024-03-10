<template>
  <div class="search">
    <van-search
        background="#126E51"
        class="flex-1"
        autofocus
        v-model="searchText"
        show-action
        :placeholder="$t('search')"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onClear"
        @input="_delaySearch"
        :action-text="$t('close')"
    />

    <div v-if="searchResult.empty === true" class="p-l16 fs12 lh-30" style="color: #e4e4e4;">
      {{$t('s_p')}}
    </div>
    <div v-else>
      <div class="example flex-middle-only"
           :style="{borderBottomColor: sportBorderColor(sport.id)}">
        <div class="full-height flex-middle-only" v-if="searchResult.teams.length || searchResult.leagues.length">
          <div v-for="item of sports" :key="item.id"
               @click="selectSport(item)"
               class="re full-height flex-middle-only m-l16">
            <span class="white fs12">{{ $t(item.text) }}</span>
            <i v-if="item.id === sport.id" class="ab-middle-x search-result-under-line"></i>
          </div>
        </div>

        <span v-else class="fs12 m-l16" style="color: #a7a7a7;">{{$t('ex_s')}}</span>
      </div>

      <ul class="search-example"
          v-if="(searchResult.leagues && !searchResult.leagues.length) && (searchResult.teams &&  !searchResult.teams.length)">
        <li class="lh-30" v-for="txt of exampleList" :key="txt" @click="changeExampleSearch(txt)">
          <span>{{ txt }}></span>
        </li>
      </ul>

      <div v-else class="scroll-y" :style="{height: scrollHeight + 'px'}">
        <div v-for="(league, i) in searchResult.leagues" :key="league.league_id">
          <div :index="i" @click.stop="toMatches(league)"
               style="padding: 0 0.6rem;background-color: #585858;color: #ddd;"
               class="flex-between lh-40">
            <span class="fs16">{{ league.league_name }}</span>
            <div class="flex-middle">
              <span>{{$t('s_ma')}}</span>
              <van-icon name="arrow" color="#ddd"></van-icon>
            </div>
          </div>

          <van-row class="flex-middle-only" v-for="match of league.matches" :key="match.match_id"
                   v-if="Number(match.sport_id) === Number(sport.id)"
                   style="padding: 0.4rem 0.8rem;">
            <van-col :span="12" @click="toDetail(match)">
              <p class="fs14" style="color: #ddd;">{{ match.home_name }} V {{ match.away_name }}</p>
              <p class="fs10" style="color: #a5a5a5;">{{ format(match.start_time * 1000, 'MM-dd hh:mm') }}</p>
            </van-col>

            <!--足球-->
            <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '1'">
              <Play v-for="market of match.markets" :key="market.market_id"
                    :show-name="true"
                    :play="market"
                    :group="{name: $t('d_y'),code: 'full_time_result'}"
                    :match="match"
              />
            </van-col>

            <!--篮球-->
            <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '18'">
              <Play v-for="market of match.markets" :key="market.market_id"
                    :show-handicap="true"
                    :play="market"
                    :group="{name: $t('b_g_lines'),code: 'basketball_game_lines'}"
                    :match="match"
              />
            </van-col>

            <!--网球-->
            <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '13'">
              <Play v-for="market of match.markets" :key="market.market_id"
                    :show-header="true"
                    :play="market"
                    :group="{name: $t('winner'),code: 'tennis_to_win_match'}"
                    :match="match"
              />
            </van-col>

            <!--排球-->
            <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '91'">
              <Play v-for="market of match.markets" :key="market.market_id"
                    :show-header="true"
                    :play="market"
                    :group="{name: $t('b_g_lines'),code: 'volleyball_game_lines'}"
                    :match="match"
              />
            </van-col>

            <!--棒球-->
            <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '16'">
              <Play v-for="market of match.markets" :key="market.market_id"
                    :show-header="true"
                    :play="market"
                    :group="{name: $t('b_g_lines'),code: 'baseball_game_lines'}"
                    :match="match"
              />
            </van-col>

            <!--电子竞技-->
            <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '151'">
              <Play v-for="market of match.markets" :key="market.market_id"
                    :show-header="true"
                    :play="market"
                    :group="{name: $t('b_g_lines'),code: 'esports_match_lines'}"
                    :match="match"
              />
            </van-col>
          </van-row>
        </div>

        <van-row class="flex-middle-only" v-for="match of searchResult.teams" :key="match.match_id"
                 v-if="Number(match.sport_id) === Number(sport.id)"
                 style="padding: 0.4rem 0.8rem;">
          <van-col :span="12" @click="toDetail(match)">
            <p class="fs14" style="color: #ddd;">{{ match.home_name }} V {{ match.away_name }}</p>
            <p class="fs10" style="color: #a5a5a5;">{{ format(match.start_time * 1000, 'MM-dd hh:mm') }}</p>
          </van-col>

          <!--足球-->
          <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '1'">
            <Play v-for="market of match.markets" :key="market.market_id"
                  :show-name="true"
                  :play="market"
                  :group="{name: $t('d_y'),code: 'full_time_result'}"
                  :match="match"
            />
          </van-col>

          <!--篮球-->
          <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '18'">
            <Play v-for="market of match.markets" :key="market.market_id"
                  :show-handicap="true"
                  :play="market"
                  :group="{name: $t('b_g_lines'),code: 'basketball_game_lines'}"
                  :match="match"
            />
          </van-col>

          <!--网球-->
          <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '13'">
            <Play v-for="market of match.markets" :key="market.market_id"
                  :show-header="true"
                  :play="market"
                  :group="{name: $t('winner'),code: 'tennis_to_win_match'}"
                  :match="match"
            />
          </van-col>

          <!--排球-->
          <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '91'">
            <Play v-for="market of match.markets" :key="market.market_id"
                  :show-header="true"
                  :play="market"
                  :group="{name: $t('b_g_lines'),code: 'volleyball_game_lines'}"
                  :match="match"
            />
          </van-col>

          <!--棒球-->
          <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '16'">
            <Play v-for="market of match.markets" :key="market.market_id"
                  :show-header="true"
                  :play="market"
                  :group="{name: $t('b_g_lines'),code: 'baseball_game_lines'}"
                  :match="match"
            />
          </van-col>

          <!--电子竞技-->
          <van-col :span="10" :offset="2" class="flex-between" v-if="match.sport_id === '151'">
            <Play v-for="market of match.markets" :key="market.market_id"
                  :show-header="true"
                  :play="market"
                  :group="{name: $t('b_g_lines'),code: 'esports_match_lines'}"
                  :match="match"
            />
          </van-col>
        </van-row>
      </div>
    </div>

    <FootBetControllerTmp2/>
  </div>
</template>
<script>
import SearchMixin from "../../../mixins/search"
import {mapGetters} from "vuex"
import FootBetControllerTmp2 from "../../../components/FootBetControllerTmp2"
import Play from "../../../components/Play"

const scrollHeight = window.innerHeight - 54 - window.rem2px(2.3)
export default {
  mixins: [SearchMixin],
  data() {
    return {
      scrollHeight: scrollHeight
    };
  },

  computed: {
    ...mapGetters(['bets'])
  },

  watch: {
    bets(bets) {
      this.computedScrollHeight(bets)
    },
  },

  methods: {
    computedScrollHeight(bets) {
      let keys = Object.keys(bets)

      // 如果 只有一个注单
      if (keys.length === 1) {
        // 78 48
        this.scrollHeight = scrollHeight - window.rem2px(5.8)
      } else if (keys.length > 1) {

        // 如果 多个注单
        this.scrollHeight = scrollHeight - window.rem2px(4.7)
      } else {
        this.scrollHeight = scrollHeight
      }
    }
  },

  components: {
    FootBetControllerTmp2,
    Play
  },

  mounted() {
    setTimeout(() => {
      this.computedScrollHeight(this.bets)
    }, 1000)
  }
};
</script>

<style type="text/css" lang="less">
.search {
  background: #494949;
  box-shadow: inset 0 -1px 0 0 #367A65;

  .van-icon-search {
    color: #fff;
    font-size: 20px;
  }

  .van-search__content {
    background-color: transparent;
  }

  .van-field__control {
    color: #fff;

    &::placeholder {
      font-size: 0.7rem;
      color: #00E099;
      letter-spacing: 0;
    }
  }

  .van-search__action {
    color: #fff;
  }

  .example {
    height: 2.2rem;
    border-bottom: 2px solid;
  }

  .search-example {
    padding: 0.8rem;
    color: #ddd;
  }

  .search-result-under-line {
    width: 1.2rem;
    height: 2px;
    background: #ddd;
    bottom: -2px;
  }

  .van-hairline--bottom::after {
    border-bottom-width: 0;
  }

  .van-index-anchor--sticky {
    background-color: #494949;
  }

  /*默认效果*/

  .bet-box {
    padding: 0.4rem 0;
    margin: 1px;
  }

  /*选中效果*/

  .bet-active {
    background-color: #e4e4e4 !important;

    .market-odds {
      color: #126E51 !important;
    }
  }
}
</style>
