<template>
    <div class="page">
        <div class="play_video">
            <!-- <i class="back" @click="$router.push('/home')"></i> -->
            <i class="back" @click="$router.back()"></i>
            <div id="dplayer" class="dplayer"></div>
            <div
                v-if="videoInfo.payMode == 2 && !isPay"
                class="show_poster"
                style="
                    background-image: url('http://img.cola9527taozi15.xyz/vod/meterial/20220224/WB0Y0R0N0A0549495719.png');
                "
            >
                <div class="show_poster_title">此影片为付费视频，请使用钻石购买即可观看</div>
                <div>
                    <van-button
                        class="show_poster_btn"
                        round
                        style="color: white; background: rgb(247, 180, 63); border-color: rgb(247, 180, 63)"
                        @click="byVideo()"
                        >购买视频</van-button
                    >
                    <van-button
                        class="show_poster_btn"
                        round
                        style="color: white; background: rgb(247, 180, 63); border-color: rgb(247, 180, 63)"
                        @click="$router.push('/coin')"
                        >购买钻石</van-button
                    >
                </div>
            </div>
        </div>
        <div class="play_scroll">
            <div class="play_content">
                <div class="play_title van-multi-ellipsis--l2 break">
                    {{ videoInfo.title}}
                    <span
                        class="share"
                        @click="copyUrl()"
                        data-clipboard-action="copy"
                        :data-clipboard-text="currentUrl"
                        >点击分享影片</span
                    >
                </div>
                <img v-if="state.advDetail&&state.advDetail.imgUrl" v-lazyload="state.advDetail.imgUrl" @click="onClickAdv()" style="width:100%; margin-top:20px" />
                 <!-- <van-image src="http://img.cola9527taozi15.xyz/vod/meterial/20211207/VL0H0W37540038426527.png" style="margin-top:20px" /> -->
            </div>
            <div class="play_list">
                <div class="play_list_title">猜你喜欢</div>
                <van-list>
                    <div class="list">
                        <div
                            class="list_item"
                            v-for="item in videoInfo.ext"
                            :key="item.id"
                            @click="onClickVideo(item.id)"
                        >
                            <div class="list_left_item">
                                <img
                                    v-lazyload="item.imgUrl"
                                    style="width: 4.26667rem; height: 2.53333rem; overflow: hidden; border-radius: 4px"
                                />
                                <div class="list_status">
                                    <span class="list_vip list_format">VIP</span>
                                </div>
                                <div class="list_duration">{{ item.playTime }}</div>
                            </div>
                            <div class="list_right_item">
                                <div class="list_title van-multi-ellipsis--l2">{{ item.title }}</div>
                                <div class="list_lable">
                                    <span>{{ item.zan }}次赞</span><span>评分{{ item.score }}</span>
                                </div>
                                <div class="list_play">{{ item.playCount }}次播放</div>
                            </div>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
    </div>

    <van-popup v-model:show="showRechargeVip" class="show_popup" style="width: 85%; z-index: 2008" overlay>
        <div class="show">
            <div class="show_top">
                <i class="show_close" @click="showRechargeVip = !showRechargeVip"></i>
            </div>
            <div class="show_content">
                <van-image :src="videoInfo.imgUrl" class="show_bg" />
                <div class="show_title">此影片为VIP专享，请购买VIP可畅享无限观影下载视频等多种特权</div>
                <van-button
                    class="show_btn"
                    round
                    style="color: white; background: rgb(247, 180, 63); border-color: rgb(247, 180, 63)"
                    @click="$router.push('/vip')"
                    >去开通vip
                </van-button>
            </div>
        </div>
    </van-popup>
</template>

<script>
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive, inject, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import DPlayer from 'dplayer'
import Hls from 'hls.js'
import ClipboardJS from 'clipboard'
import { getVideoInfo, getAdvOne } from '@/api/common'
import { coinPay } from '@/api/user'
import { getCryptImg } from '../../utils/request'
export default {
    name: 'Play',
    components: {},
    setup(props, context) {
        const reload = inject('reload')
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        const currentUrl = window.location.href

        const isVip = computed(() => store.state.user.userInfo.isVip)

        const showRechargeVip = ref(false)

        const state = reactive({
            advDetail:{}
        })

        let dp = {}

        const videoInfo = reactive({
            id: '', //视频id
            title: '', //标题
            imgUrl: '', //缩略图
            playTime: '', //时长
            serverCode: '',
            payMode: 1, //收费模式：1免费，2收费，3会免
            payCoin: 0, //收费金额
            playCount: 0, //播放数
            userId: '', //待定义
            videoType: '', //待定义
            videoUrl: '', //播放地址
            demourl: '', //试看地址
            categoryId: '0', //分类ID
            sales: 0, //销量
            score: 0, //评分
            isPay: false, //是否购买，视频详情接口返回该字段
            zan: 0, //点赞数
            tagIds: '', //视频标签
            ext: [] //附加数据，详情接口返回推荐视频
        })

        const initPlayer = () => {
            // console.log(videoInfo)
            dp = new DPlayer({
                container: document.querySelector('.dplayer'),
                theme: '#FADFA3',
                loop: true,
                lang: 'zh-cn',
                screenshot: true,
                hotkey: true,
                preload: 'auto',
                // logo: "logo.png",
                volume: 0.7,
                mutex: true,
                autoplay: false,
                video: {
                    url: videoInfo.videoUrl,
                    // url: videoInfo.videoUrl,
                    // url: 'http://77888.0712360.com/mdcm/videos/videos/616790c48a4a8017b7f21e1c/06a7de368f79e26b2c9e93cddd502f4c.mp4',
                    // url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
                    // url: 'http://vods.mifen517.com/video/1a069bb9bdfc7ed956da3e168a249369/demoUrl.m3u8',
                    pic: videoInfo.imgUrl,
                    thumbnails: videoInfo.imgUrl,
                    type: 'customHls',
                    customType: {
                        customHls: function (video, player) {
                            const hls = new Hls()
                            hls.loadSource(video.src)
                            hls.attachMedia(video)
                            hls.withCredentials = true
                        }
                    }

                    // url: "http://video.kjgh.xyz/video_20211006x/1005_gcth_1_480/1005_gcth_1_480.m3u8",
                    // type: 'mp4',
                    // type: "customHls",
                    // customType: {
                    //   customHls: function (video, player) {
                    //     const hls = new Hls();
                    //     hls.loadSource(video.src);
                    //     hls.attachMedia(video);
                    //     hls.withCredentials = true;
                    //   },
                    // },
                }
                // subtitle: {
                // 	url: 'dplayer.vtt',
                // 	type: 'webvtt',
                // 	fontSize: '25px',
                // 	bottom: '10%',
                // 	color: '#b7daff',
                // },
                // danmaku: {
                // 	id: '9E2E3368B56CDBB4',
                // 	api: 'https://api.prprpr.me/dplayer/',
                // 	token: 'tokendemo',
                // 	maximum: 1000,
                // 	addition: ['https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142'],
                // 	user: 'DIYgod',
                // 	bottom: '15%',
                // 	unlimited: true,
                // },
                // contextmenu: [{
                // 		text: 'custom1',
                // 		link: 'https://github.com/DIYgod/DPlayer',
                // 	},
                // 	{
                // 		text: 'custom2',
                // 		click: (player) => {
                // 			// console.log(player);
                // 		},
                // 	},
                // ],
                // highlight: [{
                // 		text: 'marker for 20s',
                // 		time: 20,
                // 	},
                // 	{
                // 		text: 'marker for 2mins',
                // 		time: 120,
                // 	}
                // ],
            })
        }

        const onClickVideo = async (id) => {
            await router.push(`/play?id=${id}`)
            reload()
        }

        const copyUrl = () => {
            var clipboard = new ClipboardJS('.share')
            // console.log(clipboard)
            //成功回调
            clipboard.on('success', (e) => {
                Toast.success('已复制当前链接到粘贴板')
                // 释放内存
                clipboard.destroy()
            })
            //失败回调
            clipboard.on('error', function () {
                Toast.fail('复制链接失败')
                // 释放内存
                clipboard.destroy()
            })
        }

        getAdvOne({ position: "3" }).then((res) => {
            // console.log(res);
            if (res.code !== 0) {
                Toast.fail(res.message)
            } else {
                state.advDetail = res.result
            }
        })

        const onClickAdv = ()=>{
            // console.log(state.advDetail.hrefUrl);
            window.location.href = state.advDetail.hrefUrl
        }

        const byVideo = () => {
            coinPay({ userId: JSON.parse(localStorage.getItem('userDetail')).id, videoId: videoInfo.id }).then(
                (res) => {
                    if (res.code !== 0) {
                        Toast.fail(res.message)
                    } else {
                        videoInfo.isPay = true
                    }
                }
            )
        }

        const getData = () => {
            // console.log(route.query.id)
            getVideoInfo({ id: route.query.id, userId: JSON.parse(localStorage.getItem('userDetail')).id }).then(
                (res) => {
                    // console.log(res)
                    if (res.code !== 0) {
                        Toast.fail(res.message)
                    } else {
                        if (res.result.imgUrl) {
                            getCryptImg(res.result.imgUrl).then((r) => {
                                videoInfo.imgUrl = r
                                initPlayer()
                            })
                        }
                        videoInfo.id = res.result.id
                        videoInfo.title = res.result.title
                        videoInfo.playTime = res.result.playTime
                        videoInfo.payMode = res.result.payMode
                        videoInfo.payCoin = res.result.payCoin
                        videoInfo.playCount = res.result.playCount
                        videoInfo.videoType = res.result.videoType
                        videoInfo.videoUrl = res.result.videoUrl
                        videoInfo.demourl = res.result.demourl
                        videoInfo.sales = res.result.sales
                        videoInfo.score = res.result.score
                        videoInfo.isPay = res.result.isPay
                        videoInfo.zan = res.result.zan
                        videoInfo.tagIds = res.result.tagIds
                        videoInfo.ext = res.result.ext
                        // console.log(res.result.payMode)
                        if (res.result.payMode === 3 && !isVip.value) {
                            showRechargeVip.value = true
                        }
                    }
                }
            )
        }
        getData()
        onMounted(() => {})

        return {
            state,
            currentUrl,
            showRechargeVip,
            isVip,
            videoInfo,
            reload,
            byVideo,
            onClickVideo,
            copyUrl,
            onClickAdv
        }
    }
}
</script>
<style scoped lang="scss">
.page {
    font-family: PingFangTC-Regular;
    height: 100%;
}

.page .play_video {
    height: 5.6rem;
    position: relative;
    z-index: 99;
    box-sizing: border-box;
    background-color: #000;
    i {
        font-style: italic;
    }
}

.page .play_video .back {
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    background: url(data:image/png;base64,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)
        no-repeat 50%;
    background-size: contain;
    top: 0.21333rem;
    left: 0.32rem;
    z-index: 999;
}

.page .play_video .dplayer {
    height: 5.6rem;
}

.page .play_scroll {
    height: calc(100vh - 5.6rem);
    overflow-y: scroll;
}

.page .play_content {
    padding: 0.21333rem;
}

.page .play_list {
    margin-top: 0.26667rem;
}

.page .play_list .play_list_title {
    font-family: PingFangTC-Medium;
    font-size: 0.48rem;
    color: #121212;
    padding: 0 0.21333rem;
}

.show_popup {
    background-color: transparent;
}

.show_popup .show .show_top {
    position: relative;
    height: 1.17333rem;
}

.show_popup .show .show_top .show_close {
    width: 0.69333rem;
    height: 1.17333rem;
    background: url(data:image/png;base64,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)
        no-repeat 50%;
    background-size: contain;
    position: absolute;
    top: 0;
    right: 0.4rem;
}

.show_popup .show .show_content {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.53333rem 0.8rem;
    border-radius: 0.26667rem;
}

.show_popup .show .show_content .show_bg {
    width: 4.93333rem;
    height: 4.82667rem;
}

.show_popup .show .show_content .show_title {
    font-size: 0.37333rem;
    color: #474747;
}

.show_popup .show .show_content .show_btn {
    margin-top: 0.4rem;
    width: 100%;
}

.show_poster {
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    height: 5.6rem;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    padding: 0 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}
.show_poster .show_poster_title {
    font-size: 0.42667rem;
    letter-spacing: 0.02667rem;
    line-height: 0.58667rem;
    background: hsla(0, 0%, 39.2%, 0.5);
    border-radius: 0.5em;
    padding: 0.13333rem;
    color: #fff;
}

.show_poster .show_poster_btn {
    margin: 0.53333rem 0.53333rem 0 0.53333rem;
    width: 2.48667rem;
    height: 0.93333rem;
}

.page .play_content .play_title {
    font-family: PingFangTC-Medium;
    font-size: 0.48rem;
    color: #121212;
    font-weight: 700;
}

.list {
    padding: 0.26667rem 0.21333rem;
}

.list .list_item {
    font-family: PingFangTC-Regular;
    display: flex;
    align-items: center;
    height: 2.53333rem;
    // padding: 0.24rem 0;
    margin: 0.24rem 0;
}

.list .list_item .list_left_item {
    width: 4.26667rem;
    height: 2.53333rem;
    position: relative;
}

.list .list_item .list_left_item .list_status {
    position: absolute;
    top: 0.16rem;
    right: 0.16rem;
    display: flex;
    align-items: center;
}

.list .list_item .list_left_item .list_status .list_format {
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

.list_left_item .list_duration {
    position: absolute;
    left: 0.16rem;
    bottom: 0.16rem;
    font-size: 0.26667rem;
    color: #fff;
}

.list .list_item .list_right_item {
    margin-left: 0.26667rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.list .list_item .list_right_item .list_title {
    height: 0.96rem;
    line-height: 0.48rem;
    font-family: PingFangTC-Regular;
    font-size: 0.34667rem;
    color: #474747;
    word-break: break-all;
}

.list .list_item .list_right_item .list_lable {
    font-family: PingFangTC-Regular;
    font-size: 0.32rem;
    color: #7d7d80;
    margin-top: 0.13333rem;
}

.list .list_item .list_right_item .list_lable {
    font-family: PingFangTC-Regular;
    font-size: 0.32rem;
    color: #7d7d80;
    margin-top: 0.13333rem;
}

.list .list_item .list_right_item .list_lable span:after {
    content: '';
    display: inline-block;
    height: 0.21333rem;
    border-right: 0.02667rem solid #d9d9d9;
    margin: 0 0.18667rem;
    position: relative;
    top: 0;
}

.list .list_item .list_right_item .list_lable {
    font-family: PingFangTC-Regular;
    font-size: 0.32rem;
    color: #7d7d80;
    margin-top: 0.13333rem;
}

.list .list_item .list_right_item .list_play {
    font-family: PingFangTC-Regular;
    font-size: 0.32rem;
    color: #7d7d80;
    margin-top: 0.13333rem;
}

.share {
    color: #fbde72;
    text-decoration: underline;
    float: right;
    margin-right: 10px;
}
</style>
