<template>
  <div data-v-039d3f4b="" class="top">
    <div data-v-039d3f4b="" class="content">
      <div data-v-58f2f3c6="" data-v-039d3f4b="" class="search">
        <div data-v-58f2f3c6="" class="sildbar">
          <i data-v-58f2f3c6="" class="sildbar_menu"></i>
        </div>
        <div data-v-58f2f3c6="" class="seek">
          <span data-v-58f2f3c6=""></span><span data-v-58f2f3c6="">搜视频</span>
        </div>
        <div data-v-58f2f3c6="" class="vault">
          <span data-v-58f2f3c6=""></span><span data-v-58f2f3c6="">片库</span>
        </div>
      </div>
      <div data-v-7a7ef011="" data-v-039d3f4b="" class="nav_tab">
        <div data-v-7a7ef011="" class="nav_tab_left">
          <div data-v-7a7ef011="" class="van-tabs van-tabs--line">
            <div>
              <div class="van-sticky">
                <div class="van-tabs__wrap van-tabs__wrap--scrollable">
                  <div
                    role="tablist"
                    class="van-tabs__nav van-tabs__nav--line van-tabs__nav--complete"
                    style="border-color: rgb(247, 180, 63)"
                  >
                    <div
                      role="tab"
                      aria-selected="true"
                      class="van-tab van-tab--active"
                      style="color: rgb(247, 180, 63)"
                    >
                      <span class="van-tab__text">推荐</span>
                    </div>
                    <div
                      role="tab"
                      class="van-tab"
                      style="color: rgb(239, 239, 241)"
                    >
                      <span class="van-tab__text">国产</span>
                    </div>
                    <div
                      role="tab"
                      class="van-tab"
                      style="color: rgb(239, 239, 241)"
                    >
                      <span class="van-tab__text">日韩</span>
                    </div>
                    <div
                      role="tab"
                      class="van-tab"
                      style="color: rgb(239, 239, 241)"
                    >
                      <span class="van-tab__text">三级</span>
                    </div>
                    <div
                      role="tab"
                      class="van-tab"
                      style="color: rgb(239, 239, 241)"
                    >
                      <span class="van-tab__text">欧美</span>
                    </div>
                    <div
                      role="tab"
                      class="van-tab"
                      style="color: rgb(239, 239, 241)"
                    >
                      <span class="van-tab__text">亚洲异族</span>
                    </div>
                    <div
                      role="tab"
                      class="van-tab"
                      style="color: rgb(239, 239, 241)"
                    >
                      <span class="van-tab__text">动漫</span>
                    </div>
                    <div
                      class="van-tabs__line"
                      style="
                        background-color: rgb(247, 180, 63);
                        width: 20px;
                        transform: translateX(34px) translateX(-50%);
                        height: 4px;
                        border-radius: 4px;
                      "
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="van-tabs__content van-tabs__content--animated">
              <div
                class="van-tabs__track"
                style="
                  transform: translate3d(0%, 0px, 0px);
                  transition-duration: 0.3s;
                "
              >
                <div
                  role="tabpanel"
                  class="van-tab__pane-wrapper"
                >
                  <div class="van-tab__pane"></div>
                </div>
                <div
                  role="tabpanel"
                  aria-hidden="true"
                  class="van-tab__pane-wrapper van-tab__pane-wrapper--inactive"
                >
                  <div class="van-tab__pane"><!----></div>
                </div>
                <div
                  data-v-7a7ef011=""
                  role="tabpanel"
                  aria-hidden="true"
                  class="van-tab__pane-wrapper van-tab__pane-wrapper--inactive"
                >
                  <div class="van-tab__pane"><!----></div>
                </div>
                <div
                  data-v-7a7ef011=""
                  role="tabpanel"
                  aria-hidden="true"
                  class="van-tab__pane-wrapper van-tab__pane-wrapper--inactive"
                >
                  <div class="van-tab__pane"><!----></div>
                </div>
                <div
                  data-v-7a7ef011=""
                  role="tabpanel"
                  aria-hidden="true"
                  class="van-tab__pane-wrapper van-tab__pane-wrapper--inactive"
                >
                  <div class="van-tab__pane"><!----></div>
                </div>
                <div
                  data-v-7a7ef011=""
                  role="tabpanel"
                  aria-hidden="true"
                  class="van-tab__pane-wrapper van-tab__pane-wrapper--inactive"
                >
                  <div class="van-tab__pane"><!----></div>
                </div>
                <div
                  data-v-7a7ef011=""
                  role="tabpanel"
                  aria-hidden="true"
                  class="van-tab__pane-wrapper van-tab__pane-wrapper--inactive"
                >
                  <div class="van-tab__pane"><!----></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-v-7a7ef011="" class="nav_tab_right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PublicHeader from "@components/header/PublicHeader.vue";
import DPlayer from "dplayer";
import Hls from "hls.js";
export default {
  components: {
    PublicHeader,
  },
  setup() {
    let dp = {};

    const initPlayer = () => {
      dp = new DPlayer({
        container: document.getElementById("dplayer"),
        autoplay: false,
        theme: "#FADFA3",
        loop: true,
        lang: "zh-cn",
        screenshot: true,
        hotkey: true,
        preload: "auto",
        logo: "logo.png",
        volume: 0.7,
        mutex: true,
        autoplay: true,
        video: {
          // url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
          url: "http://video.kjgh.xyz/video_20211006x/1005_gcth_1_480/1005_gcth_1_480.m3u8",
          // type: 'mp4',
          type: "customHls",
          customType: {
            customHls: function (video, player) {
              const hls = new Hls();
              hls.loadSource(video.src);
              hls.attachMedia(video);
              hls.withCredentials = true;
            },
          },
        },
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
      });
    };
    return {
      initPlayer,
    };
  },
  mounted() {
    this.initPlayer();
  },
};
</script>

<style lang="scss" scoped>
.box [data-v-sdfsdf] {
  width: 100%;
  height: 100%;
}
</style>
