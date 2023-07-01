<template>
    <div>
        <div class="flex items-center p-4 pb-2" @click="$router.push(`/personal?id=${item.userInfo.id}`)">
            <div class="g-avatar__img-wrapper">
                <img v-if="item.userInfo.headUrl" v-lazyload="item.userInfo.headUrl" />
            </div>
            <div class="ml-4">
                <div class="b-username">
                    {{ item.userInfo.nickName }}
                    <svg extra-class="m-verified" class="g-icon m-verified" aria-hidden="true">
                        <use
                            xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-verified"
                            href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-verified"
                        ></use>
                    </svg>
                </div>
                <div class="g-user-username">@{{ item.userInfo.account }}</div>
            </div>

            <div class="updateTimeStr h-10">{{ item.updateTimeStr }}</div>
        </div>

        <div class="txtContent px-4">
            {{ item.txtContent }}
        </div>

        <div v-if="item.articleType == 2" class="picArray-box overflow-hidden">
            <img v-if="item.picArray?.length" v-lazyload="item.picArray[0]" />
        </div>

        <div class="video-box relative" v-if="item.articleType == 1">
            <video
                class="video"
                :id="'player' + item.id"
                playsinline
                controls
                allowfullscreen
                allowtransparency
                :data-poster="item.videoPic"
            ></video>
            <!-- <img class="video-face" v-lazyload :src="item.videoPic" fit="cover" v-if="!item.showPic" /> -->

            <img
                v-lazyload="item.videoPic"
                fit="cover"
                v-if="!item.showPic && item.videoPic"
                class="absolute left-0 top-0 w-full h-full z-10"
            />

            <div
                v-if="!item.showPic"
                @click="playVideo(item, 'player' + item.id)"
                class="w-12 h-12 bg-[#00000080] rounded-full flex justify-center items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            >
                <svg extra-class="m-nav-icon" class="g-icon play" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202212301302-3d04c14e35#icon-play"
                        href="/src/assets/icon/icon-home.svg?rev=202212301302-3d04c14e35#icon-play"
                    ></use>
                </svg>
            </div>
        </div>

        <div class="b-post__tools">
            <div class="b-post__tools__item m-first" @click="addZan(item)">
                <button
                    type="button"
                    disabled="disabled"
                    class="b-post__tools__btn set-favorite-btn g-btn m-rounded m-icon m-icon-only m-sm-size m-with-round-hover m-gray"
                >
                    <svg class="g-icon" aria-hidden="true" v-if="!item.isZan">
                        <use
                            xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-like"
                            href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-like"
                        ></use>
                    </svg>
                    <svg class="g-icon" aria-hidden="true" v-else style="color:#0091ea">
                        <use
                            xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-liked"
                            href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-liked"
                        ></use>
                    </svg>
                </button>
                <span class="num">{{ item.zan }}</span>
            </div>
            <div class="b-post__tools__item">
                <button
                    type="button"
                    disabled="disabled"
                    class="b-post__tools__btn send-comment-btn g-btn m-rounded m-icon m-icon-only m-sm-size m-with-round-hover m-gray"
                >
                    <svg class="g-icon" aria-hidden="true">
                        <use
                            xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-comment"
                            href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-comment"
                        ></use>
                    </svg>
                </button>
                <span class="num">{{ item.comment }}</span>
            </div>
            <!---->
            <!-- <div  class="b-post__tools__item m-with-text-button">
                        <button
                            
                            type="button"
                            disabled="disabled"
                            at-attr="post_tip"
                            class="
                                b-post__tools__btn
                                send-tip-btn
                                m-uppercase m-with-round-hover m-width-fluid-hover
                                g-btn
                                m-rounded m-icon m-sm-size m-with-text
                            "
                        >
                            <svg  class="g-icon" aria-hidden="true">
                                <use
                                    xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-funds"
                                    href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-funds"
                                ></use></svg
                            ><span  class="b-post__tools__btn-text">发送小费</span>
                        </button>
                    </div> -->
            <div class="b-post__tools__item m-last" @click="subscribeArticle(item)">
                <button
                    type="button"
                    class="b-post__tools__btn set-bookmark-btn g-btn m-rounded m-icon m-icon-only m-sm-size m-with-round-hover m-gray"
                >
                    <svg class="g-icon" aria-hidden="true" v-if="!item.isLock" style="color:#0091ea">
                        <use
                            xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-bookmarked"
                            href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-bookmarked"
                        ></use>
                    </svg>
                    <svg class="g-icon" aria-hidden="true" v-else>
                        <use
                            xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-bookmark"
                            href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-bookmark"
                        ></use>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ArticleItem'
}
</script>



<script setup>
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Hls from "hls.js";
import { showSuccessToast, showFailToast } from 'vant'
import { apiArticleIndex, apiAddZan, apiSubscribeArticle } from '@/api/common'
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const router = useRouter()
const store = useStore()
const state = reactive({
    mail: ''
})

const playVideo = (item, id) => {
    item.showPic = true
    console.log('url==', item.isLock ? item.demoUrl : item.videoUrl)
    console.log('id==', id)
    var video = document.getElementById(id)
    if (Hls.isSupported()) {
        var hls = new Hls()
        hls.loadSource(item.isLock ? item.demoUrl : item.videoUrl)
        hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = item.isLock ? item.demoUrl : item.videoUrl
    }
}

// 点赞
const addZan = (item) => {
    apiAddZan({ id: item.id }).then((res) => {
        if (res.code !== 0) {
            showFailToast(res.message)
        } else {
            console.log(res);
            if(res.result){
                item.isZan = true
                item.zan = item.zan + 1
            }else{
                item.isZan = false
                item.zan = item.zan - 1
            }
            showSuccessToast(res.message)
        }
    })
}

// 订阅帖子
const subscribeArticle = (item) => {
    if(!item.isLock) return
    apiSubscribeArticle({ articleId: item.id }).then((res) => {
        if (res.code !== 0) {
            showFailToast(res.message)
        } else {
            console.log(res);
            if(res.result){
                item.isLock = true
            }else{
                item.isLock = false
            }
            showSuccessToast(res.message)
        }
    })
}
</script>
<style lang="scss" scoped>
.g-avatar__img-wrapper {
    width: 48px;
    height: 48px;
    border-radius: inherit;
    border-radius: 50%;
}

.g-avatar__img-wrapper img {
    border-radius: inherit;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    display: block;
    position: relative;
}

.b-username {
    min-width: 0;
    display: block;
    color: var(--text-color);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 500;
}
.g-user-username {
    font-size: 14px;
    color: #8a96a3;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.updateTimeStr {
    font-size: 14px;
    color: #8a96a3;
    margin: 0 0 0 auto;
    white-space: nowrap;
    text-align: right;
}

.txtContent {
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    -webkit-hyphens: auto;
    hyphens: auto;
    position: relative;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 5px;
}

.video-box {
    width: 100%;
    height: 210px;
    object-fit: cover;
}

.picArray-box {
    width: 100%;
    height: 210px;
    object-fit: cover;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}

.video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.b-post__tools {
    font-size: 13px;
    font-weight: 500;
    padding: 8px 0 0;
    display: flex;
    position: relative;
    .num {
        font-size: 18px;
    }
}

.b-post__tools__item {
    display: flex;
    align-content: center;
    align-items: center;
    white-space: nowrap;
    color: #8a96a3;
    margin-right: 4px;
}

.b-post__tools__item.m-first {
    margin-left: 6px;
}

.g-btn.m-icon:not(.m-colored) {
    background: none;
    transition: color 0.15s;
}

.g-btn.m-icon.m-icon-only {
    width: 48px;
    height: 48px;
    flex: 0 0 48px;
    padding: 0;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
}

.g-btn.m-icon.m-icon-only.m-sm-size {
    width: 36px;
    height: 36px;
    min-height: 36px;
    flex-basis: 36px;
}

.g-btn.m-icon:not(.m-colored):not(.m-with-text):not(.m-active) {
    color: rgba(138, 150, 163, 0.7);
}

.g-btn.m-icon.m-icon-only:not(.m-colored).m-gray {
    color: #8a96a3;
}

.b-post__tools__item.m-last {
    margin-left: auto;
    margin-right: 6px;
}

.play {
    color: #fff;
}
</style>
