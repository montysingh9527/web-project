<template>
  <div class="activity">
    <van-row gutter="5" class="grid-list" cols="1">
      <van-col :span="12" style="margin-bottom: 5px;"
               @click="showPromote(item.content)"
               v-for="(item,index) in list" :key="index">
        <div class="grid-item">
          <img class="full-width" :src="base_img_url + item.pic">
          <p class="lh-30 fs12" style="color:#818796;">{{ item.title }}</p>
        </div>
      </van-col>
    </van-row>

    <van-overlay :show="showActivityContent"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.9)`}">

      <div class="scroll-y hide-scroll-bar ab-middle pd10" style="background-color: #f1fcf2;"
           :style="{width:iframeStyle.width, height: iframeStyle.height}"
           v-html="ActivityContent"
      ></div>

      <van-icon class="ab"
                @click.stop="showActivityContent = false"
                :style="{left: iframeStyle.iconLeft, top: iframeStyle.iconTop}"
                name="cross" size="30px" color="#ddd"></van-icon>
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
      if (!content) return this.$toast(this.$t('no_ac'))
      this.ActivityContent = content
      this.showActivityContent = true
    }
  },
  created() {
    this.iframeStyle = {
      width: window.innerWidth * 0.6 + 'px',
      height: window.innerHeight * 0.8 + 'px',
      iconTop: window.innerHeight * 0.1 + 'px',
      iconLeft: window.innerWidth * 0.8 + 10 + 'px'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._getPromote();
    })
  },
};
</script>

<style type="text/css" lang="less" scoped>
.activity {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .grid-list {
    height: auto !important;
  }

  .grid-item {
    cursor: pointer;
    padding: 20px 20px 0 20px;
    box-shadow: 0 0 4px 0 #dde4f3;
    background-color: #fff;
  }

  img {
    width: 100%;
  }
}
</style>
