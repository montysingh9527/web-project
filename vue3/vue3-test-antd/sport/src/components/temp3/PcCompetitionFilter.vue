<template>
  <van-overlay :show="showOverlay" @click="showOverlay = false">
    <div class="wrapper">
      <div class="block matchesfilter" @click.stop>
        <div>
          <div class="flex-middle" style="height: 50px">
            <div style="width: 56px"></div>
            <div class="flex-1 center fspx16 bold" style="color: #4D5872">{{ $t('bs_sx') }}</div>
            <div class="cursor center" style="width: 56px; font-size: 30px; padding: 10px" @click="showOverlay = false">×</div>
          </div>
          <div class="lab1 flex-between full-width bg-white">
            <div class="btn flex-middle cursor" @click="allSelect">
              <img class="icon m-r8" src="../../assets/images/tmp3/all-select.png" alt="">
              <span class="fspx14">{{ $t('q_x') }}</span>
            </div>
            <div class="btn flex-middle cursor" @click="reverse">
              <img class="icon m-r8" src="../../assets/images/tmp3/revert-select.png" alt="">
              <span class="fspx14">{{ $t('f_x') }}</span>
            </div>
          </div>
          <div class="lab2 flex-1 scroll-y hide-scroll-bar" style="height: 400px">
            <ul class="lab_ul">
              <li class="li flex-middle-only cursor" v-for="league of leagues" :key="league.id" @click="handlerSelectLeague(league)">
                <div class="flex-middle-only">
                  <div class="radio" :class="{select: selectList.includes(league.id)}"></div>
                  <img v-if="league.logo" style="width: 28px;"
                       :src="league.logo" alt="">
                  <div class="details m-l16">
                    <p class="fspx14" style="color: #7B5605">{{league.name}}</p>
                    <p class="fspx12" style="color: #4D5872; margin-top: 2.8px">{{ $t('g_y_j_c', {totalMatchs: league.matches.length}) }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="lab3 full-width bg-white" style="padding: 12px;">
            <van-button class="submit public-btn flex-middle fspx14 cursor m-r16" style="height: 38px;width: 100%;" @click="handleConfirm">
              {{ $t('q_r') }}
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  data() {
    return {
      showOverlay: false,
      selectList: [],
    }
  },

  watch: {
    '$route'(to, from) {
    }
  },

  props: {
    leagues: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    // 全选
    allSelect() {
      // 如果存在删除
      this.leagues.forEach(league => {
        if (!this.selectList.includes(league.id)) {
          this.selectList.push(league.id)
        }
      })
    },

    // 反选
    reverse() {
      let arr = [];
      let obj = {}

      this.selectList.forEach(id => {
        obj[id] = true;
      })

      this.leagues.forEach(item => {
        if(!obj[item.id]) {
          arr.push(item.id)
        }
      })

      this.selectList = arr;
    },

    handlerSelectLeague(item) {
      const index = this.selectList.findIndex(id => id === item.id);
      if(index > -1) {
        this.selectList.splice(index, 1);
      } else {
        this.selectList.push(item.id);
      }
    },

    handleConfirm() {
      this.$emit('select-league', this.selectList);
    },

    show() {
      this.showOverlay = true
    },

    close() {
      this.showOverlay = false
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 600px;
  background-color: #fff;
  border-radius: 7px;
  overflow: hidden;
}

.matchesfilter {
  .lab1 {
    height: 54px;
    padding: 0 16px;

    .btn {
      color: #F3AC0A;
      width: 276px;
      height: 38px;
      border: 1px solid #F3AC0A;
      border-radius: 2px;

      .icon {
        width: 14px;
      }
    }
  }

  .lab_ul {
    padding: 0 12px;

    .li {
      height: 84px;
      background: url('../../assets/images/tmp3/matches-filter-bg.png');
      background-size: 100% 100%;
      float: left;
      width: 282px;

      &:nth-child(even) {
        float: right;
      }

      .radio {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        margin-left: 20px;
        border: 1px solid #7B5605;

        &.select {
          background: #7B5605 url('../../assets/images/tmp3/select.png') no-repeat center center;
          background-size: 8px auto;
        }
      }
    }
  }

  .lab3 {

  }
}
</style>
