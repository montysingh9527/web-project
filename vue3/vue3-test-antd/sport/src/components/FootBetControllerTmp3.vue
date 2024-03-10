<template>
  <div class="foot-bet-controller-tmp3">
    <!--底部注单-->
    <div class="bet-container" v-show="betKeys.length > 0">
      <!--一个注单 h5-->

      <!--多个注单-->
      <div class="bet-container-title over-hidden flex-between full-width" style="padding:0 0.6rem;" @click.stop="showBetDetail = true" v-if="!showBetDetail">
        <div class="flex-middle-only">
          <p class="fs14 white bet-num flex-middle">{{ betKeys.length || '' }}</p>
          <span class="fs12" style="margin-left: 12px;color:#545454;">{{ $t('tz_xq') }}</span>
        </div>

        <div class="flex-between">
            <span style="margin-right: 1.2rem;color: #404040;">
                <span class="m-r8" style="color: #666;font-weight: 500;">余额: </span>
                <span class="bold">&nbsp;{{ userInfo.balance }}</span>
            </span>
          <p class="flex-middle" style="background-color: #4E5772;border-radius: 50%;width: .8rem;height: .8rem;">
            <van-icon class="bold" name="arrow-up" color="#fff" size="10px"></van-icon>
          </p>
        </div>
      </div>
    </div>

    <van-popup v-model="showBetDetail"
               :lock-scroll="true"
               position="bottom"
               @closed="editing = false">
      <div class="drawer-content-tmp2 over-hidden">
        <div class="bet-container-title over-hidden flex-between full-width" style="padding:0 0.6rem;" @click.stop="showBetDetail = false">
          <div class="flex-middle-only">
            <p class="fs14 white bet-num flex-middle">{{ betKeys.length || '' }}</p>
            <span class="fs12" style="margin-left: 12px;color:#545454;">{{ $t('tz_xq') }}</span>
          </div>

          <div class="flex-between">
            <span style="margin-right: 1.2rem;color: #404040;">
                <span class="m-r8" style="color: #666;font-weight: 500;">{{$t('blance')}}: </span>
                <span class="bold">¥&nbsp;{{ userInfo.balance }}</span>
            </span>
            <p class="flex-middle" style="background-color: #4E5772;border-radius: 50%;width: .8rem;height: .8rem;">
              <van-icon class="bold" name="arrow-down" color="#fff" size="10px"></van-icon>
            </p>
          </div>
        </div>

        <div class="bet-container-body">
          <ul class="bet-body-detail re scroll-y hide-scroll-bar" style="max-height: 50vh;">
            <!--class="disabled" 您所选投注项的盘口、赔率或有效性已经产生变化-->
            <li class="normal-bet-item re"
                :class="String(bet.disable) === '1' ? 'disabled' : ''"
                v-for="bet of betValues"
                :key="`${bet.signId}`">
              <div class="flex">
                <div class="p-r10 flex-middle-only" @click="deleteBet(bet.signId)">
                  <p class="flex-middle" style="background-color: #4E5772;border-radius: 50%;width: .8rem;height: .8rem;">
                    <van-icon name="cross" color="#fff" size="10px"></van-icon>
                  </p>
                </div>

                <div class="dark over-hidden flex-1">
                  <div style="max-width: 54%;">
                    <span>{{ bet.title }}</span>
                  </div>
                  <div class="fs12 flex-between">
                    {{ bet.market_name }}
                  </div>
                  <div class="dark-light fs12 flex-between">
                    <span>{{ bet.home_name }} V {{ bet.away_name }}</span>
                  </div>
                  <div class="dark-light fs12" v-if="bet.isFBD == 1">
                    <span>{{$t('d_b')}} {{bet.limit_min}} - {{bet.limit_max}}</span>
                    <span class="m-l16">{{$t('k_t')}} {{bet.left_amount || '0'}}</span>
                  </div>
                </div>
              </div>

              <div class="flex-between bet-money-box ab-middle-y" v-if="statusAlias(bet).state">
                <p class="fs12 bet-odd center" style="width: 2.5rem;padding: 0.1rem 0;">
                  @{{ bet.odds }} {{ (bet.group_code === 'incorrect_score' || bet.group_code === 'half_time_incorrect_score') ? '%' : '' }}
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

            <div class="flex-between bet-money-box ab-middle-y">
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
              <span style="margin-right: 4px;">{{ $t('d_y1') }}</span>
            </div>

            <div class="bet-money-box ab-middle-y">
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
          <div class="flex-between p-l16 p-r16 p-t4 p-b4 bg-white">
            <button class="delete-all m-r16"
                    @click="deleteBet('ALL')">
              <span class="fs12" style="color: #4D5872;">全部删除</span>
            </button>

            <van-button class="submit-bet" block square
                        :color="betChanged.isChange ? 'linear-gradient(180deg, #F45F5F 0%, #C92B2B 100%)' : 'linear-gradient(180deg, #F2AC0A 0%, #B68108 100%)'"
                        @click="submitBet"
                        :loading="loading" :loading-text="$t('c_bets')"
            >
              <span class="" :style="{color: betChanged.isChange ? '#fff':'#fff'}">{{ betChanged.text }}</span>
              <span v-if="!betChanged.isChange" class="m-l10" style="color: #fff;">
                ({{$utils.toCurrency(projectConfig.currency).siteCurrency}}&nbsp;{{ $utils.formatText(amount) }})
              </span>
            </van-button>
          </div>
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
    _openSwipeCell() {
      console.log('this.$refs', this.$refs['swipe-cell'])
      if (this.swipeCellState === 'close') {
        this.$refs['swipe-cell'][0].open('right')
        this.swipeCellState = 'open'
      } else {
        this.$refs['swipe-cell'][0].close('right')
        this.swipeCellState = 'close'
      }

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
.foot-bet-controller-tmp3 {
  color: #545454;

  .bet-container {
    bottom: 0;
    z-index: 99999;
    position: fixed;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  .drawer-content-tmp2 {
    position: fixed;
    z-index: 99999 !important;
    width: 100%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .bet-container-title {
    /*transition: height .1s linear;*/
    box-shadow: 0px -2px 4px 0px rgba(28,29,32,0.1);
    height: 2.5rem;
    background: #fff;

    .bet-num {
      width: 1.25rem;
      height: 1rem;
      background-image: linear-gradient(180deg, #F0AA08 0%, #B88306 100%);
      border-radius: 0.5rem;
      color: #fff;
      font-weight: 500;
    }
  }

  .delete-all-content {
    box-shadow: inset 0 1px 0 0 #CECECE;
    height: 2.2rem;
    padding-left: 0.6rem;
  }

  .bet-body-detail {
    background-image: linear-gradient(90deg, #F3F6FA 0%, #F9FBFC 100%);
    box-shadow: inset 0 -1px 0 0 rgba(221,230,238,1), inset 0 1px 0 0 rgba(221,230,238,1);

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
      color: #7B5605;
    }

    &.disabled {
      .bet-odd {
        //background: #EA3D3D;
        color: #EA3D3D;
      }
    }

    &:last-child {
      border: none;
    }
  }

  .bet-money-box {
    right: .8rem;

    .bet-money-input {
      width: 4rem;
      height: 1.4rem;
      background: #FFFFFF;
      border: 1px solid #BCC0CB;
      border-radius: 2px;
      padding: 0 2px;

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

  .delete-all {
    width: 4.5rem;
    height: 1.8rem;
    flex-shrink: 0;
    background-image: linear-gradient(180deg, #ECF1F7 0%, #FFFFFF 100%);
    border: 1px solid #BCC0CB;
    border-radius: 4px;
  }

  .submit-bet {
    border-radius: 4px;
    height: 1.9rem!important;
    color: #4E5A74;
  }

  .result-full-input {
    background-image: linear-gradient(90deg, #F3F6FA 0%, #F9FBFC 100%);
    transition: height .2s linear;
    overflow: hidden;
  }

  .van-popup {
    background-color: transparent !important;
  }

  .van-overlay {
    background-color: rgba(0, 0, 0, .4);
  }
}
</style>
