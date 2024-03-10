<template>
  <div class="foot-bet-controller-pc-tmp2">
    <!--底部注单-->
    <div class="bet-container" v-if="betValues.length" style="width: 450px;">

      <!--一个注单 pc-->
      <div class="full-width" v-if="betValues.length === 1  && !showBetDetail && !hideOnlyOne">
        <div class="bet-container-title over-hidden flex-between full-width">
          <div class="flex-middle-only" style="padding-left: 0.6rem;">
            <p class="fs12 white bet-num flex-middle">{{ betKeys.length || '0' }}</p>
            <div class="fs12" style="margin-left: 0.6rem;">
              <span class="block">{{ $t('t_z_d') }}</span>
            </div>
          </div>

          <div class="flex-between full-height">
            <p class="right" style="margin-right: 0.6rem;">
              <span class="block" style="opacity: 0.5;color:#666;">{{ $t('blance') }}</span>
              <span style="color:#404040;">{{$utils.toCurrency(projectConfig.currency).siteCurrency}}&nbsp;{{ userInfo.balance }}</span>
            </p>
            <div style="border-left: 1px solid #cecece;width:2.5rem" class="full-height flex-middle"
                 @click.stop="hideOnlyOne = true">
              <van-icon name="cross" size="16"/>
            </div>
          </div>
        </div>


        <div class="normal-bet-item re bet-item-only"
             :class="String(bet.disable) === '1' ? 'disabled' : ''"
             v-for="bet of betValues"
             :key="`${bet.signId}`">
          <div class="flex">
            <div class="p-r10" @click="deleteBet(bet.signId)">
              <van-icon name="cross" color="#126E51" size="18"/>
            </div>

            <div class="dark over-hidden flex-1">
              <div style="max-width: 54%;">
                <span>{{ bet.title }}</span>
              </div>
              <div class="fs12">{{ bet.market_name }}</div>
              <div class="dark-light fs12 flex-between">
                <p style="max-width: 50%;">{{ bet.home_name }} V {{ bet.away_name }}</p>
                <span v-if="bet.isFBD == 1">{{$t('d_b')}} {{bet.limit_min}} - {{bet.limit_max}}</span>
                <span v-if="bet.isFBD == 1">{{$t('k_t')}} {{bet.left_amount || '0'}}</span>
              </div>
            </div>
          </div>

          <div class="flex-between bet-money-box ab" v-if="statusAlias(bet).state">
            <p class="fs12 bet-odd center" style="width: 2.5rem;padding: 0.1rem 0;">{{ bet.odds }}
<!--              {{ (bet.group_code === 'incorrect_score' || bet.group_code === 'half_time_incorrect_score') ? '%' : '' }}-->
            </p>
            <van-field class="m-l10 fs12 bet-money-input" :placeholder="$t('mon')"
                       @input="_onChangeInput(bet)"
                       maxlength="12"
                       v-model="money_model[bet.signId]"
                       :formatter="formatter"
                       type="number"/>
          </div>

          <div v-else class="flex-middle-only ab" style="top:0.6rem;right:0.6rem;">
            <span class="fs12 m-r8">{{ statusAlias(bet).msg }}</span>
            <i class="icon_base icon_lock"></i>
          </div>
        </div>

        <p class="center bg-white lh-35" v-if="betChanged.isChange">
          <span class="fs10 origin-center dark-light">{{ $t('bet_change') }}</span>
        </p>
        <van-button class="submit-bet btn" block square
                    :color="betChanged.isChange ? '#58D7AF':'#126E51'"
                    @click="submitBet"
                    :loading="loading" :loading-text="$t('c_bets')">
                        <span class="fs16"
                              :style="{color: betChanged.isChange ? '#333':'#fff'}">{{ betChanged.text }}</span>
          <span v-if="!betChanged.isChange" class="fs16 m-l10"
                style="color: #5FE8BD;">{{$utils.toCurrency(projectConfig.currency).siteCurrency}}&nbsp;{{ $utils.formatText(amount) }}</span>
        </van-button>
      </div>

      <!--多个注单-->
      <div class="bet-container-title over-hidden flex-between full-width" style="padding:0 0.6rem;"
           @click.stop="_showBetDetail"
           v-if="(betValues.length > 1  && !showBetDetail) || hideOnlyOne">
        <div class="flex-middle-only">
          <p class="fs14 white bet-num flex-middle">{{ betKeys.length || '' }}</p>
          <span class="fs12" style="margin-left: 12px;color:#545454;">{{ $t('t_z_d') }}</span>
        </div>

        <div class="flex-between fs12" style="color:#666;" v-if="showSingleBet">
          <span class="m-r10">1X</span>
          <span>{{ $t('ntn', {n: computedNum(betValues)}) }}</span>
          <span class="m-l10" style="color:#126E51;">{{ computedOdd(betValues) }}</span>
        </div>

        <div class="flex-between fs12" v-else>
          <span>{{ betValues.length }}X</span>
        </div>
      </div>
    </div>

    <van-popup v-model="showBetDetail"
               :lock-scroll="true"
               :lazy-render="true"
               position="bottom">
      <div class="drawer-content-tmp2 over-hidden" style="width: 450px;">
        <div class="bet-container-title over-hidden flex-between" style="padding-left:0.6rem;"
             @click.stop="showBetDetail = false">
          <div class="flex-middle-only">
            <p class="fs12 white bet-num flex-middle">{{ betKeys.length || '0' }}</p>
            <div class="fs12" style="margin-left: 0.6rem;">
              <span class="block">{{ $t('t_z_d') }}</span>
            </div>
          </div>

          <div class="flex-between full-height">
            <p class="right" style="margin-right: 0.6rem;">
              <span class="block" style="opacity: 0.5;color:#666;">{{ $t('blance') }}</span>
              <span style="color:#404040;">{{$utils.toCurrency(projectConfig.currency).siteCurrency}}&nbsp;{{ userInfo.balance }}</span>
            </p>
            <div style="border-left: 1px solid #cecece;width:2.5rem" class="full-height flex-middle">
              <van-icon name="cross" size="16"/>
            </div>
          </div>
        </div>

        <div class="bg-white flex-middle-only delete-all-content">
          <span class="fs12" style="color: #126E51;" @click.stop="deleteBet('ALL')">{{ $t('all_del') }}</span>
        </div>

        <div class="bet-container-body">
          <ul class="bet-body-detail re scroll-y hide-scroll-bar" style="max-height: 50vh;">
            <!--class="disabled" 您所选投注项的盘口、赔率或有效性已经产生变化-->
            <li class="normal-bet-item re"
                :class="String(bet.disable) === '1' ? 'disabled' : ''"
                v-for="bet of betValues"
                :key="`${bet.signId}`">
              <div class="flex">
                <div class="p-r10" @click="deleteBet(bet.signId)">
                  <van-icon name="cross" color="#126E51" size="18"/>
                </div>

                <div class="dark over-hidden flex-1">
                  <div style="max-width: 54%;">
                    <span>{{ bet.title }}</span>
                  </div>
                  <div class="fs12">{{ bet.market_name }}</div>
                  <div class="dark-light fs12 flex-between">
                    <span>{{ bet.home_name }} V {{ bet.away_name }}</span>
                    <span v-if="bet.isFBD == 1">{{$t('d_b')}} {{bet.limit_min}} - {{bet.limit_max}}</span>
                    <span v-if="bet.isFBD == 1">{{$t('k_t')}} {{bet.left_amount || '0'}}</span>
                  </div>
                </div>
              </div>

              <div class="flex-between bet-money-box ab" v-if="statusAlias(bet).state">
                <p class="fs12 bet-odd center" style="width: 2.5rem;padding: 0.1rem 0;">{{ bet.odds }}
<!--                  {{ (bet.group_code === 'incorrect_score' || bet.group_code === 'half_time_incorrect_score') ? '%' : '' }}-->
                </p>
                <van-field class="m-l10 fs12 bet-money-input" :placeholder="$t('mon')"
                           @input="_onChangeInput(bet)"
                           maxlength="12"
                           v-model="money_model[bet.signId]"
                           :formatter="formatter"
                           type="number"/>
              </div>

              <div v-else class="flex-middle-only ab" style="top:0.6rem;right:0.6rem;">
                <span class="fs12 m-r8">{{ statusAlias(bet).msg }}</span>
                <i class="icon_base icon_lock"></i>
              </div>
            </li>
          </ul>

          <div class="normal-bet-item re" v-if="showSingleBet" style="background-color: #f0f0f0;">
            <span>{{ $t('ntn', {n: computedNum(betValues)}) }}</span>
            <p class="flex-middle-only fs12" style="color: #404040;" @click="_showResultFull">
              <span>{{ $t('coll') }}</span>
              <van-icon name="arrow-down"/>
            </p>

            <div class="flex-between bet-money-box ab">
              <p class="fs12 right bet-odd" style="width: 3rem">{{ computedOdd(betValues) }}</p>
              <van-field class="m-l16 fs12 bg-white bet-money-input" :placeholder="$t('mon')"
                         maxlength="12"
                         :formatter="formatter"
                         v-model="singleMoney"
                         @input="_onChangeInput"
                         type="number"/>
            </div>
          </div>

          <div class="re full-width result-full-input"
               :style="{height: (showResultFull || !showSingleBet) ? '2.2rem' : '0'}">
            <div class="fs12 lh-45" style="color: #404040;margin-left: 0.6rem;">
              <span style="margin-right: 4px;">{{ $t('d_y') }}</span>
            </div>

            <div class="bet-money-box ab" style="top:-1px;">
              <span class="ab-middle-y fs12" style="color:#666;z-index: 9;left:1.2rem;">{{ betKeys.length }}X</span>
              <van-field class="m-l16 fs12 bet-money-input flex-end"
                         style="z-index: 8;"
                         :placeholder="$t('mon')"
                         @input="_onChangeResultMoney"
                         maxlength="12" :formatter="formatter"
                         v-model="resultMoney"
                         type="number"/>
            </div>
          </div>

          <p class="center bg-white lh-35"
             v-if="betChanged.isChange"
          >
            <span class="fs10 origin-center dark-light">{{ $t('bet_change') }}</span>
          </p>
          <van-button class="submit-bet btn" block square
                      :color="betChanged.isChange ? '#58D7AF':'#126E51'"
                      @click="submitBet"
                      :loading="loading" :loading-text="$t('c_bets')">
                        <span class="fs16"
                              :style="{color: betChanged.isChange ? '#333':'#fff'}">{{ betChanged.text }}</span>
            <span v-if="!betChanged.isChange" class="fs16 m-l10"
                  style="color: #5FE8BD;">{{$utils.toCurrency(projectConfig.currency).siteCurrency}}&nbsp;{{ $utils.formatText(amount) }}</span>
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import indexMixin from '../mixins/index-mixin'

export default {
  mixins: [indexMixin],
  data() {
    return {
      hideOnlyOne: false,
      editing: false,
      showResultFull: true, // 是否显示独赢输入框
      swipeCellState: 'close',
    }
  },

  computed: {
    ...mapGetters(['userInfo', 'projectConfig']),
  },
  watch: {
    showBetDetail(flag) {
      if (!flag) {
        this.$emit('close')
      }
    }
  },
  methods: {
    _showBetDetail() {
      this.showBetDetail = true
      this.hideOnlyOne = false
    },

    submitBet() {
      this._submitBet()
          .then(msg => {
            this.$toast.success(msg);
            // this.loading = false
          })
          .catch(msg => {
            this.$toast.fail(msg || this.$t('bet_fail'));
            // this.loading = false
          })
    },

    _showResultFull() {
      this.showResultFull = !this.showResultFull
    }
  }
}
</script>
<style type="text/css" lang="less">
.foot-bet-controller-pc-tmp2 {
  color: #545454;

  .bet-container {
    bottom: 0;
    z-index: 99999;
    position: absolute;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  .drawer-content-tmp2 {
    position: fixed;
    z-index: 99999 !important;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .bet-container-title {
    /*transition: height .1s linear;*/
    height: 2.5rem;
    background: #fff;

    .bet-num {
      height: 1.3rem;
      width: 1.3rem;
      border-radius: 50%;
      background: #126E51;
    }
  }

  .delete-all-content {
    box-shadow: inset 0 1px 0 0 #CECECE;
    height: 2.2rem;
    padding-left: 0.6rem;
  }

  .bet-body-detail {
    background: #E4E4E4;
    box-shadow: inset 0 1px 0 0 #CECECE, inset 0 -1px 0 0 #CECECE;

    .van-collapse-item {
      padding-bottom: 0;

      .van-cell {
        padding: 0.4rem 0;
        line-height: 14px;
      }

      .van-cell__right-icon {
        position: absolute;
        font-size: 12px;
        left: 5rem;
        top: 1.2rem;
      }
    }

    .van-cell::after {
      border-bottom: none;
    }

    .van-collapse-item__content {
      padding: 0;
    }
  }


  .normal-bet-item {
    border-bottom: 1px solid #cecece;
    padding: 0.4rem 0.6rem;

    .bet-odd {
      font-size: 12px;
      color: #666666;
    }

    &.disabled {
      .bet-odd {
        background: #58D7AF;
        color: #404040;
      }
    }

    &:last-child {
      border: none;
    }
  }

  .only-one-input {
    input {
      color: #58D7AF !important;
      font-size: 0.8rem !important;
    }

    input::placeholder {
      font-size: 0.8rem !important;
      color: #58D7AF !important;
      letter-spacing: 0;
    }

    .van-field__body {
      height: 100% !important;
    }
  }

  .bet-money-box {
    right: 0;
    top: 1px;

    .bet-money-input {
      background: #f8f8f8;
      width: 5.9rem;
      height: 1.8rem;
      line-height: 1.8rem;
      padding: 0 3px;

      input {
        color: #383838 !important;
        text-align: right !important;
        padding-right: 0.2rem;
      }

      input::placeholder {
        font-size: 0.6rem !important;
        color: #757575;
        letter-spacing: 0;
        text-align: right;
      }
    }
  }

  .bet-item-only {
    border-top: 1px solid #cecece;
    border-bottom: 1px solid #cecece;
    background-color: #e4e4e4;
  }

  .result-full-input {
    background-color: #e4e4e4;
    transition: height .2s linear;
    overflow: hidden;
  }

  .van-popup {
    background-color: transparent !important;
  }

  .van-overlay {
    background-color: rgba(0, 0, 0, .1);
  }
}
</style>
