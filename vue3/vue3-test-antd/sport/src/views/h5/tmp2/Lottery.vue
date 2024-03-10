<template>
  <div class="lottery">
    <h3 style="height: 60px;font-size: 28px;color:#e4e4e4;" class="flex-middle">{{ $t('l_l') }}</h3>

    <div class="scroll-y hide-scroll-bar" :style="{height: scrollHeight}">
      <div v-for="item of list" :key="item.title">
        <h3 class="lh-45 p-l16" style="color: #ddd;">{{ item.title }}</h3>
        <van-row :gutter="12" class="m-b16" style="padding: 0 0.6rem">
          <van-col :span="12"
                   v-for="lottery of item.list"
                   :key="lottery.gameId"
                   @click="toDetail(lottery)">
            <div class="flex-middle-only lottery-item">
              <img style="width: 3.1rem;height:3.1rem;" :src="lottery.logo" alt="">
              <div class="m-l8">
                <p class="cles-1 left white">{{ lottery.title }}</p>
                <p class="left fs12 m-t8" style="color:#126E51;">{{ $t('s_g') }}</p>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
import {getLotteryList} from "../../../axios/lottery"
import {mapGetters} from "vuex"
import Event from "../../../event";

export default {
  data() {
    return {
      list: []
    }
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  methods: {
    toDetail(game) {
      if (!this.userInfo.userId) {
        Event.$emit('show-login')
        return;
      }
      this.$router.push(`/lottery-detail?id=${game.gameId}`)
    }
  },

  mounted() {
    getLotteryList()
        .then(res => {
          this.list = res
          console.log(res)
        })
    Event.$emit('toggle-nav-type', 2)
  },

  created() {
    this.scrollHeight = window.innerHeight - window.rem2px(2.3) + 'px'
  }
}
</script>
<style type="text/css" lang="less">
.lottery {
  .lottery-item {
    background-image: linear-gradient(180deg, #1C1C1C 0%, #294745 100%);
    border-radius: 8px;
    box-shadow: 0 0 3px #9c9c9c;
    padding: 0.3rem 0.6rem;
    margin-bottom: 0.6rem;
  }
}
</style>
