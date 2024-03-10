<template>
  <div class="activity">
    <van-nav-bar
        style="background-image: linear-gradient(180deg, #f2ab06 0%, #b78008 100%);"
        @click-left="$router.push('/index/home')"
    >
      <div slot="left" class="flex-middle-only">
        <van-icon name="arrow-left" color="white"></van-icon>
        <span class="fs12 white">{{ $t('home') }}</span>
      </div>
      <p slot="title" class="white fs16 center">{{ $t('activity') }}</p>
    </van-nav-bar>

    <van-row gutter="5" class="grid-list scroll-y" :style="{height: scrollHeight}">
      <van-col :span="24" style="margin-bottom: 5px;"
               @click="showPromote(item.content)"
               v-for="(item,index) in list" :key="index">
        <div class="grid-item">
          <p class="lh-30 fs12" style="color:#ddd;">{{ item.title }}</p>
          <img class="full-width" :src="base_img_url + item.pic">
        </div>
      </van-col>
    </van-row>

    <van-overlay :show="showActivityContent" :lock-scroll="false"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.9)`}">

      <div style="background-color: #f1fcf2;"
           :style="{width:overlayStyle.width, height: overlayStyle.height}"
      >
        <van-nav-bar
            style="background-image: linear-gradient(180deg, #f2ab06 0%, #b78008 100%);"
            @click-left="showActivityContent = false"
        >
          <div slot="left" class="flex-middle-only">
            <van-icon name="arrow-left" color="white"/>
          </div>
          <p slot="title" class="white fs16 center">{{ $t('ac_detail') }}</p>
        </van-nav-bar>

        <div v-html="ActivityContent" class="pd10 activity-content" :style="{height: scrollHeight,  overflowY: 'scroll'}"></div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {getPromote} from "../../../axios/user";

const {innerHeight} = window
export default {
  name: "activity",
  data() {
    return {
      list: [],
      base_img_url: window.location.origin,
      // base_img_url: 'http://t075f.fhptcdn.com',
      showActivityContent: false,
      ActivityContent: ''
    };
  },
  methods: {
    async _getPromote() {
      this.list = (await getPromote()).promote_pic_ary;
      console.log('this.list ===', this.list)
    },

    showPromote(content) {
      let msg = this.$t('no_ac');
      if (!content) return this.$toast(msg);

      this.ActivityContent = content
      this.showActivityContent = true
    }
  },
  created() {
    this.overlayStyle = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.scrollHeight = window.innerHeight - window.rem2px(2.2) + 'px'
  },
  mounted() {
    this.$nextTick(() => {
      this._getPromote();
    })
  },
};
</script>

<style type="text/css" lang="less">
.activity {
  background-color: #404040;

  .grid-item {
    cursor: pointer;
    padding: 0 0.8rem 0.4rem 0.8rem;
    background-color: #383838;
  }

  img {
    width: 100%;
  }

  .activity-content {
    img {
      max-width: 100vw !important;
    }
  }
}
</style>
