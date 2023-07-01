<template>
    <router-view v-slot="{ Component }">
        <keep-alive :include="['Home','Main']">
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>

<script>
import { getCurrentInstance, onMounted, provide, ref, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { showSuccessToast, showFailToast } from 'vant'
import { Encrypt, Decrypt } from '@/utils/crypto'
import { apiReg, apiGetConfig, apiSendHt } from '@/api/common'
export default {
    name: 'App',
    components: {},
    setup(props, context) {
        const route = useRoute()
        const store = useStore()
        const isRouterAlive = ref(true) //router自己跳自己不刷新
        const keepAlive = computed(() => store.state.common.keepAlive)
        const reload = () => {
            isRouterAlive.value = false
            nextTick(function () {
                isRouterAlive.value = true
            })
        }
        provide('reload', reload)

        const regUserAction = () => {
            apiReg({ devType: '3' }).then((res) => {
                // {
                //     "devType": 3,
                //     "lastLoginTime": "2023-02-13 19:43:11",
                //     "salt": "QlaJ0pde",
                //     "createTime": "2023-02-13 19:43:11",
                //     "nickName": "BBBE1377",
                //     "costTemplate": "1615910521981648898",
                //     "appId": "E705D026E3B01F8E4BEC4EA9CC77F157",
                //     "id": "1625098255178756097",
                //     "pwd": "ba6dfdcc88293fb2c95b2871d0bb4f39886329a2b96c51e3",
                //     "account": "BBBE1377",
                //     "lastLoginIp": "94.200.183.54"
                // }
                if (res.code !== 0) {
                    showFailToast(res.message)
                } else {
                    localStorage.setItem('userDetail', JSON.stringify(res.result))
                    console.log(3333);
                    store.dispatch('user/dispatch_refreshUserInfo')
                }
            })
        }

        setInterval(() => {
            apiSendHt({ type: '2' }).then((res) => {
                if (res.code !== 0) {
                    showFailToast(res.message)
                } else {
                }
            })
        }, 60000)

        apiGetConfig({}).then((res) => {
            // console.log(res)
            // {
            //     "resUrl": "http://ofres.truebelieve.cn/",
            //     "commentsKey": "QQ,微信,红包",
            //     "mail": "aaa@qq.com",
            //     "keywords": "onlyfans,交友,视频,漫画",
            //     "appName": "onlyfans",
            //     "smsSendCount": 10,
            //     "kfUrl": "http://www.baidu.com",
            //     "bakDomain": "http://www.baidu.com",
            //     "feelCount": 3,
            //     "description": "onlyfans测试描述内容",
            //     "informationApply": 1,
            //     "commentApply": 0,
            //     "resServerUrl": "https://v2pics2.shxfxj.com/",
            //     "tgUrl": "测试分享内容。。。http://www.baidu.com?t=${1}",
            //     "defCoin": 20,
            //     "uploadUrl": "http://ofres.truebelieve.cn/api/upload/uploadFile/",
            //     "apiUrl": "http://ofapi.cszunmei.cn",
            //     "payNote": "sssdfsdffsd",
            //     "id": "1",
            //     "userRegCount": 20
            // }
            if (res.code !== 0) {
                showFailToast(res.message)
            } else {
                store.commit('common/SET_CONFIG', res.result)
            }
        })

        if (!localStorage.getItem('userDetail')) {
            regUserAction()
        }else{
            console.log(4444);
            store.dispatch('user/dispatch_refreshUserInfo')
             
        }

        return {
            route,
            keepAlive,
            isRouterAlive
        }
    }
}
</script>
<style lang="scss">
.main-wrapper {
    background-color: inherit;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

// @media (max-width: 499px){
//     .main-wrapper {
//         justify-content: flex-end;
//     }
// }

@media (max-width: 499px) and (orientation: portrait) {
    @supports (padding-bottom: env(safe-area-inset-bottom)) {
        .main-wrapper {
            padding-bottom: 57px;
        }
    }
}

.g-icon {
    width: 24px;
    height: 24px;
    flex: 0 0 24px;
    display: inline-block;
    fill: currentColor;
    line-height: 1;
}
</style>
