<template>
    <div class="account">
        <van-nav-bar
                style="background-color: #126E51!important;height:2.6rem;position: fixed;z-index: 9;width: 100%;top:0;"
                @click-left="clickLeft"
        >
            <div slot="left" class="flex-middle-only">
                <van-icon  name="arrow-left" size="16px" color="#fff"></van-icon>
<!--                <span class="fs12 white">首页</span>-->
            </div>

            <span slot="title" class="fs16 white">{{title}}</span>
        </van-nav-bar>

        <ul class="bg-white" style="margin: 2.2rem auto;" v-if="!showIframe">
            <li class="flex-between lh-40" style="border-bottom: 1px solid #bbb;padding: 0 0.6rem"
                @click="jump(item)" v-for="item of list" :key="item.path">
                <span class="fs16" style="color:#06855F;">{{item.title}}</span>
                <van-icon name="arrow" size="20px" color="#bbb"></van-icon>
            </li>
        </ul>

        <iframe v-show="showIframe" id="iframe" frameborder="0" scrolling="yes" style="position: absolute;top:0;"
                :style="{width: iframeStyle.width, height: iframeStyle.height}">
        </iframe>

        <van-overlay :show="loading"
                     :custom-style="{backgroundColor: `rgba(0,0,0,.8)`}">
            <van-loading v-if="loading" class="ab-middle flex-middle" size="50px"/>
        </van-overlay>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loading: false,
                title: this.$t('r_b_r'),
                showIframe: false
            }
        },

        methods: {
            clickLeft() {
                if (this.showIframe) {
                    this.showIframe = false
                } else {
                    this.$router.push('/')
                }
            },

            jump(item) {
                this.title = item.title
                this.loading = true
                this.showIframe = true

                setTimeout(() =>{
                    this.loading = false
                }, 7000)

                const host = window.location.origin
                let url = `${host}${item.path}`
                // let url = `http://localhost:18888/sporth5#/register`

                let iframe = document.getElementById('iframe')
                iframe.src = url

                let iwindow = iframe.contentWindow;

                iwindow.onload = () => {
                    this.loading = false
                    console.log('this.onload', this.loading)
                }
            }
        },
        created() {

            this.iframeStyle= {
                width:  window.innerWidth + 'px',
                height:  window.innerHeight + 'px',
            }

            this.list = [
                {title: this.$t('r_b_r1'), path: '/mobile/#/lottery/realBetReal'},
                {title: this.$t('d_b_r'), path: '/mobile/#/lottery/realBetGame'},
                {title: this.$t('q_b_r'), path: '/mobile/#/lottery/realBetCard'},
                {title: this.$t('t_b_r'), path: '/mobile/#/lottery/realBetSport'},
                {title: this.$t('b_b_r'), path: '/mobile/#/lottery/realBetFish'},
                {title: this.$t('d_b_r1'), path: '/mobile/#/lottery/realBetEsport'},
            ]
        }
    }
</script>
<style type="text/css" lang="less">
    .account {

    }
</style>
