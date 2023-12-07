<template>
    <div class="page">
        <van-nav-bar title="我的" @click-left="$router.back()" style="height: 46px" :border="false" fixed placeholder>
            <template #left>
                <van-icon name="arrow-left" style="color: rgb(125, 125, 128); font-size: 16px" />
            </template>
        </van-nav-bar>
        <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
        <div class="panel">
            <!-- <div class="attendance"><i></i><span>签到</span></div> -->
            <i class="setting" @click="$router.push('setting')"></i>
            <div class="box">
                <img v-lazyload="headUrl" style="width: 1.6rem; height: 1.6rem; border-radius: 50%" />

                <div class="info">
                    <div class="info_top">
                        <span class="info_name van-ellipsis">{{ account }}</span>
                        <span class="no_vip"></span>
                    </div>
                    <div class="info_bottom">
                        <span class="van-ellipsis">ID：{{ userId }}</span>
                        <!-- <span>每日观影次数：0/10</span> -->
                    </div>
                </div>
            </div>
            <div class="status">
                <div class="status_name">
                    <p class="user" v-if="!isVip">普通用户</p>
                    <p class="user" v-else>VIP用户</p>
                    <div class="open">
                        <span class="privilege">开通会员卡立享尊享特权</span><i class="right_arrow"></i>
                    </div>
                </div>
                <div class="status_btn" v-if="!isVip" @click="$router.push('/vip')">开通VIP</div>
            </div>
        </div>
        <ul class="nav">
            <li @click="$router.push('/vip')">
                <div class="nav_top">
                    <span>购买VIP</span
                    ><i
                        style="
                            background-image: url('data:image/png;base64,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');
                        "
                    ></i>
                </div>
                <p class="nav_bottom">获取更多观影</p>
            </li>
            <li @click="$router.push('/coin')">
                <div class="nav_top">
                    <span>购买钻石</span
                    ><i
                        style="
                            background-image: url('data:image/png;base64,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');
                        "
                    ></i>
                </div>
                <p class="nav_bottom">解锁更多付费视频</p>
            </li>
        </ul>
        <div style="margin-top: 10px; padding: 0 15px">
            <img
                v-if="state.advDetail && state.advDetail.imgUrl"
                v-lazyload="state.advDetail.imgUrl"
                @click="onClickAdv()"
                style="width: 100%; height: 100px;"
            />
        </div>

        <div class="list">
            <van-cell>
                <template #title>
                    <span class="list_title">应用中心</span>
                </template>
            </van-cell>
            <van-grid :border="false" v-if="state.appList && state.appList.length > 0">
                <van-grid-item v-for="item in state.appList" :key="item.id" @click="downlaodApp(item.downUrl)">
                    <img v-lazyload="item.imgUrl" width="40" height="40" />
                    <div style="font-size: 14px; margin-top: 10px">{{ item.title }}</div>
                </van-grid-item>
            </van-grid>
        </div>
        <!-- </van-pull-refresh> -->
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, provide, ref, nextTick, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { getUserInfo } from '@/api/user'
import { getConfig, getAppList, getAdvOne } from '@/api/common'
export default {
    name: 'My',
    components: {},
    setup(props, context) {
        const store = useStore()
        const loading = ref(false)

        const headUrl = computed(() => store.state.user.userInfo.headUrl)
        const account = computed(() => store.state.user.userInfo.account)
        const userId = computed(() => store.state.user.userInfo.id)
        const isVip = computed(() => store.state.user.userInfo.isVip)

        const state = reactive({
            appList: [],
            advDetail: {}
        })

        getAdvOne({ position: '3' }).then((res) => {
            // console.log(res)
            if (res.code !== 0) {
                Toast.fail(res.message)
            } else {
                state.advDetail = res.result
            }
        })

        const onClickAdv = () => {
            // console.log(state.advDetail.hrefUrl)
            window.location.href = state.advDetail.hrefUrl
        }

        getConfig({}).then((res) => {
            // console.log(res)
            if (res.code !== 0) {
                Toast.fail(res.message)
            } else {
                store.commit('common/SET_CONFIG', res.result)
            }
        })

        getAppList({}).then((res) => {
            // console.log(res)
            if (res.code !== 0) {
                Toast.fail(res.message)
            } else {
                state.appList = res.result
            }
        })

        const downlaodApp = (downUrl) => {
            window.location.href = downUrl
        }

        const onRefresh = () => {}

        return { state, loading, headUrl, account, userId, isVip, onRefresh, onClickAdv, downlaodApp }
    }
}
</script>
<style scoped lang="scss">
.page {
    height: 100%;
    background: #fff;
}

.page .panel {
    width: 100%;
    height: 5.06667rem;
    background: url(@/assets/img/8ab8c2742e899a9076128612b86724a4.png) no-repeat 50%;
    background-size: cover;
    position: relative;
}

.page .panel .attendance {
    position: absolute;
    top: 0.18667rem;
    right: 1.44rem;
    border: 0.02667rem solid #333;
    border-radius: 0.4rem;
    padding: 0 0.26667rem;
    height: 0.8rem;
    display: flex;
    align-items: center;
}

.page .panel .attendance i {
    width: 0.45333rem;
    height: 0.45333rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIqADAAQAAAABAAAAIgAAAAACeqFUAAAD2ElEQVRYCc1XS0wTQRj+99F2+4KCaLElqUVFoxGj4DPGR4zRhpsHPaEHRRM9iwcVuWjAkxcfkcSYYIzxQNDEVzRRowbR1otRAUWrtMUXPqgsUlrwn6Vsd+tCh1Krkww78z++7+OfnZktB+O0srKymQ6H4xb2OqfTGQmFQo/GCVe5amtr2XA4fBbzGjF/ucvluhwIBKKqIMWEU4z/GCLIcTR6sBuxb3C73ae7urr6/gjUMIiiWDE8PHwMXQbsc2KxWLC7u9urESqZ2LEccbtD4WcRrFAxH3eIIpS5wLKsap6czCgNDdWbi2Kgb7BZ+GUmPW8+f/8t3/nhpyx2z6aSqD2XFCd183X2MFe8Abnia+bbh9bOmxYVI9G+7z+jrRxEqqqONQVGkfjRwYn9W6qLCixHzAIv2zhW1iCFWQw8n2OU3aOpmk9BL2uQ/AaeZW1mvZ50Rx5sEgdib5HzwN76S2T5QGI6uW9rzYIiW71ShCZ6Bo0mA8cTzlPVWw5LQhoOVrqLC801WhzWpP/eItBVg2Al51qNOi0KKC60HiIaWIgNNuL7oK5jPGXjwulQaDOCjmOhYrETwbXBtBjmFeXCInc+cCwDcxw5sHTWFK0wMOo4jmhgmo5u7yuwGkyaUVky9oQjIms28EKW+MakMQucwOKiqLbwmNF/0cGzDKPen3+RLBU0s3L5UhFPQbpTKhVamn6GYfr5SHQIUEiaEJlJQyEjB1pm4CaH8t+8IxkX4sgzwoqSAsA7ZUIloj+zKWBLXTbYtqZYOk3FgSjUNb+AcP8gRWb80qOKTBE0026BytUjIkioycDDjKnmFFkJN3VFyJ2xau5UKMgRoKX9M4S+9csoZDl2rJ8FPJc4GwcGY/D+C9XHnIRDLWTdfDtUlDmlpCV4gZ262QHvPvdBnkUPuzbMBqPi+2MIj4Nzd9/AD5FuWQgo9cvqyE/ci/iRA7uRfPZ0q/TMNalv5QsP/NAW7JVE0/6hFtL66gsefAlYUoE9G0vAnqu+M688CYCv82sikHJELaQ91AsXH/rHhb33/CPcwZ5OoxZCwB+/7oGm1i5NnqdvvkIzViPdNiEhhOT+y09w1RdU8XVgtch7MZnG44WnWHk6qNvPPsAv3J7L8AQN9IjQjFWKDU0YRiYjGhj8WUnqObIvZVfWB0H8NmKeZZ02iZBoYLEqjUn2rE+JBulMLi8vv4YTT9YVICFW44bX6/VIu0an01Whzf8PhPiReyfhlYS0tLQEBUEoRXVnsiWGcBFOwk04E9dlXAHuorkY5MGlcqEpccHE/ZN8iIj9DrGv+3y+NiXWbyGoFSJbg1kMAAAAAElFTkSuQmCC)
        no-repeat 50%;
    background-size: contain;
    display: inline-block;
}

.page .panel .attendance span {
    font-family: PingFangSC-Regular;
    font-size: 0.37333rem;
    color: #333;
    margin-left: 0.10667rem;
}

.page .panel .setting {
    width: 0.58667rem;
    height: 0.58667rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFgAAAAAcITNaAAAD9klEQVQ4EX2UXWiTZxTH37xJmmpbsRMVIrhaBVFxfiT9iETIdlFbqXNMBRVRFMRtTEXYRPSmMBiDCXqlMjq92cVGq+JFW+26ma3YkrbxA78urChKm9GuCDa21iatv/+7PCEd1gPn/Z/nPP9z3vOc58NlvUcCgYDX7XYH0+l00LbteaJOTk7+A3QXFhbejEajqenCXdNNyE/iJ0CJ7HfIi6KiIj/JX79jzrL/7ywrKyuVr7y8fBGwULbL5WpDz0sZ/ikfUjw8PFwsIxQKzRDmypSKqXAnk7+Q4AFLXoA9G70ej8c/yQ0KBoM3mF8H7zb4F7gL/ba7u/uC4WUrhryGyXomXJBXgLMZ36O3ewzZIH0/hP0vvNXgYXDOxMTEWVYZNBwncTgcLmbyMjqDZL+iG9FwbW3tKqp4bsgGY7FY3OPxqJCj+E6iTaiPTb4YiUS0Ssujz+jo6BHgQ/QRu72fDUnK39PTY1VWVi4bHx/fx1DtGCHZLQo4SfJnjH9EraqqqoKhoaHbmEuSyeRe8JRdV1enqr9ALZb9vUmqMe35lKQ9mN+ga9EwSQ+Cj1j2BtCR1tbWV/zwu8zwgNBubm6uAOcykSbxpcykKi0hSSPjmcz9jm5FtzG+juax7EY2e7Hhwx2SDS7lpyGbps8jIIXDjX3cEFOplKr0MtdGr6tpy0W0kbNbhb8dLUR3o1Zm1TqKOpp/8NMBG/IVxg6B5DpuRlbKwPcTgRPGqdtGsE6P5GN9mpqalgEqcBh+Dcfzsfqr3j4V4lQVRvJlQHYbh0F8ThzjEfm8Xu+gkPgCjuJy2XZFRUWA0hs0IOCaMCNtQshf6c0wzpqaGh++LzPjm8KOjo4BYq9i2uSKsembPfRSR063zMrLyzsmlFDFBU7E1yRZT1CUq16P7RocHDwAlkMZ8fl8px0yHyrdT67nmD460GfTjxiDByKMjY1FhJLOzs5eEm5BR0m0jo09D/6cSfqCRNWq9D+2ZTG/MWMndIGcXhFsNuMEy55pyNy6NhLoMfoBTgsaRU9Q0aquri6dDEdo5yx+aFZ7Bs6k8wjpGvJS3YG1UMGQ+gi+n5+fX9/e3u5sTCZHFjirc+BVU+kbYrZjf87kY676Wip+6SQWm0p1UVRFdqOwe+l7hLb0YWeFfm8i0W9o7nOZ5Achju89EbNHKZFI9Pn9/gS+D6j2HEEl2EuoyNvf39+C7YhWx17cYFCA3kXV57m0bAet+xvbkWzFxmFQ7wTJdXnGqCQO9qJefEtBvRsPuYUf6cKw2pUcAv0kK+9LvAZWC4nmZ9k5Bj+7wrI/y3FNMadNLBZJXfRzNRigPX4wTcIB2hMvLS2909DQkJ6SLWfwFoCsyyX8fiVEAAAAAElFTkSuQmCC)
        no-repeat 50%;
    background-size: contain;
    display: inline-block;
    position: absolute;
    top: 0.29333rem;
    right: 0.53333rem;
}

.page .panel .box {
    padding: 1.17333rem 0.42667rem;
    display: flex;
    align-items: center;
}

.page .panel .box .avatar {
    width: 1.6rem;
    height: 1.6rem;
}

.page .panel .box .info {
    margin-left: 0.32rem;
}

.page .panel .box .info .info_top {
    font-family: PingFangHK-Semibold;
    font-size: 0.48rem;
    color: #333;
    display: flex;
    align-items: center;
}

.page .panel .box .info .info_top .info_name {
    margin-right: 0.13333rem;
}

.page .panel .box .info .info_top .no_vip {
    width: 0.58667rem;
    height: 0.58667rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFgAAAAAcITNaAAAB9UlEQVQ4Ee1Uu0oDQRSdzQMSN4FEQhIIREMehX9gYakgdv6DhWBrLWqjiH9gIWhtIYIPsNUvEM0DIhYhJAghmiZPzxl24uwmUcFSL2zm3nPuPXPn7myE+DdrAsakSRSLxbnBYLCKZ3pcjmEYr8DPcrnc41h+HJjP5xdQeAXRqXG8hrXcbvdSJpO50zDpupxAvV4PAjv5gShLzV6vd1qtVk2nzohwo9E4RNKMM/GLONVsNg+cvG3GmOtSv9+/diZ9F2NsA4xkMZ1O36pcW8c4/r4iEomEiMViKhxZo9GoSCaTEked0e129/Qkp3BWkS6XSwSDQREKhRQ0XMPhsOTQ6RCDP6wlaBNGfKEy8UJEu90WFAkEAgqWgsQ6nY6oVCpDXK8laBP2+XzrwJ5IsLBWqwkcU0QiEeH3+4VpmtLHTZAcc2jo9sHr9W7IwPr5PIsFlMvlWXR6jzBOiGLxeJzF8sEspWir1bIqRMXj8czjxb0ogKutYwKpVOoZ812B+86YAuycY8GNEbjnEiMHe8OGK05REiMdE6SVSqVlHPkcrocxuuIi2LFlXTaQzWZvFKCvIx0rEp/pJQo5c2kU1EQ5lrVJoiyYKEwShUcQ2KWvGzbcwp/PsY45/Ymj0BMLhcIO4k1i2GgPG27r/K98XDsvn1+J/M3iD7uTrrJ0moCTAAAAAElFTkSuQmCC)
        no-repeat 50%;
    background-size: contain;
    display: inline-block;
}

.page .panel .box .info .info_bottom {
    font-family: PingFangHK-Regular;
    font-size: 0.34667rem;
    color: #333;
    line-height: 0.34667rem;
    margin-top: 0.13333rem;
}

.page .panel .box .info .info_bottom span:first-child {
    margin-right: 0.13333rem;
}

.page .panel .box .info .info_bottom {
    font-family: PingFangHK-Regular;
    font-size: 0.34667rem;
    color: #333;
    line-height: 0.34667rem;
    margin-top: 0.13333rem;
}

.page .panel .status {
    margin: 0 0.42667rem;
    // height: 1.06667rem;
    background: url(@/assets/img/4d3462daaed338898e1adfbb350958e4.png) no-repeat 50%;
    background-size: cover;
    border-radius: 0.21333rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.42667rem 0.34667rem 0.42667rem 0.4rem;
}

.page .panel .status .status_name {
    flex: 1;
}

.page .panel .status .status_name .user {
    font-family: PingFangTC-Medium;
    font-size: 0.48rem;
    color: #f8b945;
}

.page .panel .status .status_name .open {
    font-size: 0.32rem;
    display: flex;
    align-items: center;
    margin-top: 0.21333rem;
}

.page .panel .status .status_name .open .privilege {
    font-family: PingFangTC-Regular;
    color: #f8b945;
}

.page .panel .status .status_name .open .right_arrow {
    width: 0.32rem;
    height: 0.32rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAYAAAAPtVbGAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGaADAAQAAAABAAAAGAAAAABlk77uAAAEP0lEQVRIDY1WTWhUVxQ+986bTEQEO420WnWhCEka7EZoSx1j606li1oRU7ALQdPWgHVnm8SKYFy0/hAoCq7824gVFxW0toK1aRcu6k9TEIp2oUXQErDRSWbm3X7fOfc9NQm2d3j35/x83znn3vfuOHlOCxc/fllCeDcEt1qcWyTi5mAsBJG7wbnbzvuzPiRnXOeXt54DI24qZbjUMyutjfd5cd1pkCKAge/VFAT5HBOIXQhSOFFoaup1b+65rUYTukkk4fvudySkJ4O4soIDyIBpyjmAQcoxk3MNXVUKsjFZuu/EBA6x8KI0XNj0IcpzDqGVFQDygAXBiagzTlUGGoATPrbm0JDjjcvb+jJBNuY24bvu5eLS8wCw8kT+AIuR0YY8Hk9ldrkZfJaFAUCpa6w0G6+BeO82JJWvjj5DEn786AWp1m8i0hYtRQyZw2g1leWfD0m1lsoXXa2y5q1XkAkUPtujWL7oE/duLCk1LXavD9wkkVlWa9tRhBZ6ayliflZrmomkOAH9x36XUz/dtagJikdNOWomlFEhpfpYfTcnbD5c3DoTmh7N02ToIwvsp08ryN6NHVJMTNZ/bFhOD92x6kBEyKefJ65hTfhlezshvdQfroRVM5UTojEuIFReLcvg5tcmEWXBMAmGoMcA9iSlIK3V3+PUSyqrOGGW+UnKNlOtqXVSaS/LgU2LlYi2fUd/kzM/36HSfLN8IiGFqXOKjfctLIwxxEyIzLeAPTRaa2Pr7GgBETPCKYKo98gNJbLtoAeamZpfILZuvJuD7db08kyiIQ3yFjGWdbwo+zQjI+oD0Z/3RjUotYUd3RkEEmgJVw4V9XRp1CrkcaRSzXVuxFxHIcYSMslWBGukBCYAm72gT2cHkoAzaRB0JKhGEedkykpGmKHhB/LJ17/KeB3IaL3r22TB7OmY0RsvqvpHjCD33ZLNNeTs/qAxI+FPI4lhZqcty4YEWw5ezQn6u9plXed8ujM6dpo9/awihu1xvr6ljQLCTpW0RzNwI748/DcIruUEO7raZG1lrsav+OpIL/twGmdQbC/JjLOQVxUQhtmo5haOkKDnGYJWI4jAOiiqRqbE9E+KyTccvXt7/wjYB7ldVlX0cNBk0P3zqCafHr6eZ8Dv19rKPPrGEsWBTPGx3OWUe2NgmGb27WouDsDgPrNQeNpTi87HDyG+rLLzgzZ5f6mViEqCKaAaY0Z/PAAdS1zxM0KwqZqTJ5963IRcIyruE3xk5FFDquMNeak8LZdZ1BajziMp5/Cb/KknKJteWiKHgZtkSfI+0TlLwUbiPDbIdG1ys5P+4rK9u9Q2dnkmmVCv3xTXr3N6Ozrc7SyJAluUmt3E+wSpVxHaf1+/JHIrDv4gpVIr8AaxDzU9bYhcz34WCZSRGScH8OKPF0qltqnud8XM/KYap/pLhKwK2Nm/8M/oFrL9X3+J/gWCWseLRjX4owAAAABJRU5ErkJggg==)
        no-repeat 50%;
    background-size: contain;
    display: inline-block;
    margin-left: 0.13333rem;
}

.page .panel .status .status_btn {
    width: 2.8rem;
    height: 1.06667rem;
    border-radius: 0.53333rem;
    background: #f8b945;
    font-family: PingFangTC-Medium;
    font-size: 0.42667rem;
    color: #333;
    line-height: 1.06667rem;
    text-align: center;
}

.page .nav {
    display: flex;
    padding: 1.06667rem 0.42667rem 0.21333rem;
}
.page .nav li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(50% - 0.18667rem);
    height: 1.92rem;
    border-radius: 0.10667rem;
    padding: 0 0.4rem;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: contain;
    &:first-child {
        background-image: url(@/assets/img/5691b78804841a81bdb5761f6143cc4e.png);
        color: rgb(121, 63, 0);
    }
    &:nth-child(2) {
        background-image: url(@/assets/img/5d1ba6fa1b9cf769133524a9dce9425b.png);
        color: rgb(114, 47, 39);
    }
}

.page .nav li .nav_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.page .nav li .nav_top span {
    font-family: PingFangSC-Medium;
    font-size: 0.48rem;
}

.page .nav li .nav_top i {
    display: inline-block;
    width: 0.72rem;
    height: 0.72rem;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: contain;
}

.page .nav li .nav_bottom {
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    margin-top: 0.16rem;
}

.page .nav li:nth-child(2) {
    margin-left: 0.37333rem;
}

.page .grid {
    padding: 0.21333rem 0 0.26667rem;
}

.page .list {
    padding-bottom: 0.26667rem;
}

.page .list .list_title {
    font-family: PingFangTC-Medium;
    font-size: 0.42667rem;
    color: #474747;
    font-weight: 600;
}
</style>
