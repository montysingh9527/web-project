<template>
    <div class="list_box">
        <img
            v-lazyload="videoList.imgUrl"
            class="list_img"
            style="width: 100%; overflow: hidden; border-radius: 4px"
        />
        <div class="list_status">
            <span v-if="videoList.payMode===1" class="list_free list_format">福利</span>
            <span v-if="videoList.payMode===2" class="list_pay list_format">收费</span>
            <span v-if="videoList.payMode===3" class="list_vip list_format">VIP</span>
        </div>
        <div class="list_read_number">{{ videoList.playCount }}</div>
        <div class="list_duration">{{ videoList.playTime }}</div>
    </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "ImgUrlBox",
  props: {
      videoList:Object,
    //   payMode:Number,   //收费模式：1免费，2收费，3会免
    // playCount: Number,  //播放数
    // playTime: String,   //时长
  },

  setup(props, context) {
 
  },
};
</script>

<style lang="scss" scoped>

.list .list_item .list_box {
    position: relative;
    height: 100px;
    font-size: .26667rem;
    color: #fff;
    // &:nth-child(4n) {
    //     width: 176px;
    //     height: 100px;
    // }
    // &:nth-child(4n+1) {
    //     width: 176px;
    //     height: 100px;
    // }
}



.list .list_item .list_box .list_img {
    width: 100%;
    height: 100%;
}

.list .list_item .list_box .list_status {
    position: absolute;
    top: 0.16rem;
    right: 0.16rem;
    display: flex;
    align-items: center;
}

.list .list_item .list_box .list_status .list_format {
    width: 0.74667rem;
    height: 0.42667rem;
    line-height: 0.42667rem;
    text-align: center;
    font-family: PingFangTC-Medium;
    font-size: 0.29333rem;
    color: #fefffe;
    border-radius: 0.05333rem;
    margin-left: 0.13333rem;
}

.list .list_item .list_box .list_status .list_vip {
    background: #e04b8c;
}

.list .list_item .list_box .list_status .list_free {
    background: #ba00ff;
}

.list .list_item .list_box .list_status .list_pay {
    background: #ec5903;
}

.list .list_item .list_box .list_read_number {
    position: absolute;
    left: 0.16rem;
    bottom: 0.16rem;
}

.list .list_item .list_box .list_duration {
    position: absolute;
    right: 0.16rem;
    bottom: 0.16rem;
}


</style>
