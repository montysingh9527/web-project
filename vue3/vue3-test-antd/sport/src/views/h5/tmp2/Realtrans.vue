<template>
    <div class="account">
        <van-nav-bar
                style="background-color: #126E51!important;height:2.6rem;position: fixed;z-index: 9;width: 100%;"
                @click-left="$router.push('/')"
        >
            <div slot="left" class="flex-middle-only">
                <van-icon  name="arrow-left" size="16px" color="#fff"></van-icon>
                <span class="fs12 white">{{$t('home')}}</span>
            </div>

            <span slot="title" class="fs16 white">{{$t('trans')}}</span>
        </van-nav-bar>
        <iframe :src="url" frameborder="0" scrolling="yes" style="position: absolute;top:0;"
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
                loading: false
            }
        },
        created() {
            this.loading = true

            setTimeout(() =>{
                this.loading = false
            }, 7000)
            const host = window.location.origin
            this.url = `${host}/mobile/#/bank/realtrans`
            // this.url = `http://localhost:18888/sporth5#/register`

            console.log(this.url)

            this.iframeStyle= {
                width:  window.innerWidth + 'px',
                height:  window.innerHeight + 'px',
            }
        }
    }
</script>
<style type="text/css" lang="less">
    .account {

    }
</style>
