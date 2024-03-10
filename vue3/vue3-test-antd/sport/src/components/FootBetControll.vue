<template>
  <div>
    <!--底部注单-->
    <div class="bet-container full-width">
      <div class="bet-container-title over-hidden flex-between" @click="showBetDetail = true"
           :style="{height: betKeys.length && showBetDetail === false ? '2.2rem': 0}">
        <div class="flex-middle-only">
          <p class="fs14 dark bet-num flex-middle">{{ betKeys.length || '' }}</p>
          <span class="fs12" style="margin-left: 12px;color: #4E5772;">{{$t('tz_xq')}}</span>
        </div>

        <div class="flex-between">
          <span style="margin-right: 1.2rem;color: #404040;">
              <span class="m-r8" style="color: #666;font-weight: 500;">{{$t('blance')}}: </span>
              {{projectConfig.siteCurrency}} {{ userInfo.balance }}
          </span>
          <p class="flex-middle" style="background-color: #4E5772;border-radius: 50%;width: .8rem;height: .8rem;">
            <van-icon name="arrow-up" color="#fff" size="10px"></van-icon>
          </p>
        </div>
      </div>
    </div>

    <van-popup v-model="showBetDetail" round position="bottom"
               style="background-color: transparent;height: 100vh;overflow: hidden"
               :lazy-render="false"
               @click="showBetDetail = false"
    >
      <div class="drawer-content ab-middle-x" @click.stop>
        <div class="bet-container-title over-hidden flex-between" @click="showBetDetail = false"
             style="height: 2.2rem;">
          <div class="flex-middle-only">
            <p class="fs14 dark bet-num flex-middle">{{ betKeys.length || '0' }}</p>
            <span class="fs12" style="margin-left: 12px;color: #4E5772;">{{$t('tz_xq')}}</span>
          </div>

          <div class="flex-between">
            <span style="margin-right: 1.2rem;color: #404040;">
                <span class="m-r8" style="color: #666;font-weight: 500;">{{$t('blance')}}: </span>
                {{projectConfig.siteCurrency}} {{ userInfo.balance }}
            </span>
            <p class="flex-middle" style="background-color: #4E5772;border-radius: 50%;width: .8rem;height: .8rem;">
              <van-icon name="arrow-down" color="#fff" size="10px"></van-icon>
            </p>
          </div>
        </div>

        <div class="bet-container-body">
<!--          <header class="bg-white flex-end flex-middle-only" style="height: 53px;">-->
<!--            <div class="flex-middle country-box m-r20 bg-gray p-l16 p-r16"-->
<!--                 style="height: 1.4rem;border-radius: 0.7rem"-->
<!--                 @click="showPicker = true">-->
<!--              <span class="m-r8 fs12">{{ betType }}</span>-->
<!--              <i class="icon_triangle m-t4" style="border-top-color: #2B2745!important;"></i>-->
<!--            </div>-->
<!--          </header>-->
          <div class="bet-body-detail re">
            <ul class="top-line under-line hide-scroll-bar scroll-y" style="max-height: 50vh;">

              <!--class="disabled" 您所选投注项的盘口、赔率或有效性已经产生变化-->
              <li class="flex-between normal-bet-item re"
                  :class="String(bet.disable) === '1' ? 'disabled' : ''"
                  v-for="bet of betValues"
                  :key="`${bet.signId}`">
                <div class="flex-middle-only">
                  <div class="flex-middle-only p-r8" style="height:2rem;"
                       @click="deleteBet(bet.signId)"
                  >
                    <p class="flex-middle" style="background-color: #4E5772;border-radius: 50%;width: .8rem;height: .8rem;">
                      <van-icon name="cross" color="#fff" size="10px"></van-icon>
                    </p>
                  </div>

                  <div class="dark hide-scroll-bar">
                    <div style="width: 150%;">
                      <span class="m-r8" style="color: #4E5772;">{{ bet.title }}</span>
                    </div>
                    <div class="fs10">{{ bet.market_name }}</div>
                    <div class="dark-light" style="width: 140%;">
                      <span class="fs10">{{ bet.home_name }} VS {{ bet.away_name }}</span>
                      <span class="fs10" v-if="bet.isFBD == 1">{{$t('d_b')}} {{bet.limit_min}} - {{bet.limit_max}}</span>
                      <span class="fs10" v-if="bet.isFBD == 1">{{$t('k_t')}} {{bet.left_amount || '0'}}</span>
                    </div>
                  </div>
                </div>

                <div class="flex-between bet-money-box" v-if="statusAlias(bet).state">
                  <p class="fs12 right bet-odd" style="width: 3rem">@{{ bet.odds }}</p>
                  <van-field class="m-l16 fs12 bet-money-input" :placeholder="$t('mon')"
                             v-if="betType === '标准式投注'"
                             @input="_onChangeInput(bet)"
                             maxlength="8"
                             v-model="money_model[bet.signId]"
                             :formatter="formatter"
                             type="number"/>

                  <div v-else-if="betType === 'Banker式投注'" class="bet-B m-l16 flex-middle dark-light" @click="_changeMultipleBet($event, bet)">B</div>
                </div>
                <div v-else class="flex-middle-only" style="min-width: 20%;">
                  <span class="fs12 m-r8">{{ statusAlias(bet).msg }}</span>
                  <i class="icon_base icon_lock"></i>
                </div>
              </li>
            </ul>

            <!--正常低高度单项注单-->
            <ul class="bg-white p-l16 p-r16">
              <li class="flex-between normal-h40-item" v-for="bet of bankerBets" :key="bet.name">
                <div>
                  <span class="dark fs12">{{ bet.bet_info }}</span>
                  <span class="fs10 dark-light">(共{{ bet.betNum }}注)</span>
                </div>
                <input class="m-l16 fs12 bet-money-input"
                       v-model="bet.money"
                       type="text" :placeholder="$t('mon')"/>
              </li>
            </ul>
          </div>

          <div class="bg-white footer-controller">
            <van-collapse accordion v-model="activeNames"
                          v-if="showSingleBet"
                          :border="false"
                          class="bg-white">
              <van-collapse-item name="collapse">
                <template slot="right-icon"></template>
                <template slot="title">
                  <div class="flex-between re bg-white full-width">
                    <div class="flex-middle-only">
                      <p class="collapse-line" style="height: 2rem;"></p>

                      <div class="">
                        <span>{{$t('d_y1')}}</span>
                        <p>
                          <span class="fs10 dark-light">{{$t('coll')}}</span>
                        </p>
                      </div>
                    </div>

                    <div class="flex-between bet-money-box" style="margin-right: 0.7rem;" @click.stop>
                      <van-field class="m-l16 fs12 bet-money-input flex-middle-only" :placeholder="$t('mon')"
                                 @click.stop
                                 @input="_onChangeResultMoney"
                                 maxlength="8" :formatter="formatter"
                                 v-model="resultMoney"
                                 type="number"/>
                    </div>
                  </div>
                </template>
                <ul class="p-l16 p-r16">
                  <li class="flex-between normal-h40-item" style="border-bottom: none;padding-left: 0;">
                    <div class="fs12">
                      <!--<span class="dark fs12">单式</span>-->
                      <span class="dark-light">{{$t('ntn', {n: computedNum(betValues)})}}</span>
                      <span class="m-l20 dark">@ {{ computedOdd(betValues) }}</span>
                    </div>

                    <van-field class="m-l16 fs12 bet-money-input flex-middle-only" :placeholder="$t('mon')"
                               maxlength="8" :formatter="formatter"
                               v-model="singleMoney"
                               @input="_onChangeInput"
                               type="number"/>
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
            <div v-else class="flex-between re bg-white full-width p-t8 p-b8">
              <div class="flex-middle-only">
                <p class="collapse-line" style="height: 2rem;"></p>
                <div>
                  <p>{{$t('d_y1')}}</p>
                  <!--<span class="fs14 dark-light">{{betKeys.length}}X</span>-->
                </div>
              </div>

              <div class="flex-between bet-money-box" style="margin-right: 0.7rem;" @click.stop>
                <van-field class="m-l16 fs12 bet-money-input flex-middle-only" :placeholder="$t('mon')"
                           @click.stop
                           @input="_onChangeResultMoney"
                           maxlength="8" :formatter="formatter"
                           v-model="resultMoney"
                           type="number"/>
              </div>
            </div>

            <p class="center bg-white" v-if="betValues.find(bet => String(bet.disable) === '1' || String(bet.is_show)=== '0' || String(bet.is_suspend) === '1')">
              <span class="fs10 origin-center dark-light">{{$t('bet_change')}}</span>
            </p>

            <div class="flex-middle bet-footer-submit">
              <button class="delete-all btn"
                      @click="deleteBet('ALL')">
                <span class="fs12" style="color: #4D5872;">{{$t('all_del')}}</span>
              </button>

              <van-button class="submit-bet btn m-l16 fs12 white" block
                          :class="Number(amount) > 0 ? 'active' : ''"
                          @click="submitBet"
                          :loading="loading" :loading-text="$t('c_bets')">
                {{ btnText }} <span class="fs14">({{projectConfig.siteCurrency}}&nbsp;{{ amount }})</span>
              </van-button>
            </div>
          </div>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import indexMixin from '../mixins/index-mixin'

export default {
  mixins: [indexMixin],
  computed: {
    ...mapGetters(['userInfo', 'projectConfig']),
  },
  methods: {
    submitBet() {
      this._submitBet()
          .then(msg => {
            this.$toast.success(msg);
            // this.loading = false
          })
          .catch(msg => {
            this.$toast.fail(msg || '投注失败!');
            // this.loading = false
          })
    }
  }
}
</script>
<style type="text/css" lang="less">
.bet-container {
  position: fixed;
  bottom:0;
  z-index: 2;
  background: rgb(230, 231, 243);
  max-width: 100vw;
  width: 516px;
  left: 50%;
  transform: translateX(-50%);
}
.drawer-content {
  max-width: 100vw;
  width: 516px;
  bottom:0;
}

.bet-container-title {
  transition: height .2s linear;
  height: 2.2rem;
  padding: 0 0.8rem;
  background: #fff;
  box-shadow: 0px -2px 4px 0px rgba(28,29,32,0.1);

  .bet-num {
    width: 1.25rem;
    height: 1rem;
    background-image: linear-gradient(180deg, #F0AA08 0%, #B88306 100%);
    border-radius: 0.5rem;
    color: #fff;
    font-weight: 500;
  }
}

.bet-body-detail {
  max-width: 514px;
  //width: 375px;
  max-height: 50vh;
  background-image: linear-gradient(90deg, #F3F6FA 0%, #F9FBFC 100%);
  box-shadow: inset 0 -1px 0 0 rgba(221,230,238,1) inset 0 1px 0 0 rgba(221,230,238,1);
}

.footer-controller {
  .van-collapse-item {
    padding-bottom: 0;

    .van-cell {
      padding: 0;
      line-height: 14px;
    }

    .van-cell__right-icon {
      position: absolute;
      font-size: 12px;
      left: 4.5rem;
      top: 0.8rem;
    }
  }

  .van-cell::after {
    border-bottom: none;
  }

  .van-collapse-item__content {
    padding: 0!important;
  }
}


.normal-bet-item {
  border-bottom: 1px solid #e7e6f3;
  padding: 0.4rem .8rem;

  .bet-odd {
    width: 3rem;
    color: #7B5605;
  }

  &.disabled {
    .bet-odd {
      color: #EA3D3D;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      background: #EA3D3D;
      border-radius: 2px;
      width: 0.2rem;
      height: 2.5rem;
      left: -0.8rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &:last-child {
    border: none;
  }
}

.normal-h40-item {
  height: 2rem;
  padding-left: 1.3rem;
  border-bottom: 1px solid #E6E7F3;

  /*&:last-child {*/
  /*    border-bottom: none;*/
  /*}*/
}

.bet-money-input {
  background: #FFFFFF;
  border: 1px solid #E6E7F3;
  border-radius: 2px;
  width: 71px;
  height: 24px;
  padding: 0 3px;

  input {
    text-align: right !important;
    padding-right: 0.2rem;
  }

  input::placeholder {
    font-size: 0.6rem !important;
    color: #888888;
    letter-spacing: 0;
    text-align: right;
  }
}

.bet-money-box {

  .bet-B {
    background: #FFFFFF;
    border: 1px solid #E6E7F3;
    border-radius: 2px;
    height: 41px;
    width: 41px;

    &.active {
      background: #FAC200;
      color: #2E2A44 !important;
    }
  }
}

.bet-footer-submit {
  padding: 12px 16px;

  .delete-all {
    width: 4.5rem;
    height: 1.8rem;
    background-image: linear-gradient(180deg, #ECF1F7 0%, #FFFFFF 100%);
    border: 1px solid #BCC0CB;
    border-radius: 4px;
  }

  .submit-bet {
    background-image: linear-gradient(180deg, #F2AC0A 0%, #B68108 100%);
    border-radius: 4px;
    height: 38px;
    color: #4E5A74;

    &.active {
      background-image: linear-gradient(180deg, #F2AC0A 0%, #B68108 100%);
      color: #fff;

      > span {
        color: #000;
      }
    }
  }
}

.van-popup--bottom.van-popup--round {
  border-radius: 0 !important;
}
</style>
