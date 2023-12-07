<template>
    <div class="login">
        <div class="nav_bar">
            <span class="close" @click="$router.back()"></span>
        </div>

        <div class="pwd_login" v-show="state.currentTab == 1">
            <p data-v-02726f19="" class="title">账号登录</p>
            <div class="container">
                <van-form @submit="onSubmit">
                    <div class="field_box">
                        <van-field
                            v-model="state.account"
                            placeholder="请输入账号"
                            :border="false"
                            size="large"
                            :rules="[{ required: true, message: '请输入账号' }]"
                        />
                    </div>
                    <div class="field_box mt12">
                        <van-field
                            v-model="state.pwd"
                            placeholder="请输入密码"
                            :border="false"
                            size="large"
                            :rules="[{ required: true, message: '请输入密码' }]"
                        />
                    </div>
                    <div class="mt21">
                        <van-button type="primary" block round native-type="submit">立即登录</van-button>
                    </div>
                </van-form>
            </div>
            <!-- <div class="tips"> -->
            <!-- <span @click="$router.push('/register')">注册账号</span> -->
            <!-- <span>忘记密码</span> -->
            <!-- </div> -->
        </div>

        <div class="code_login" v-show="state.currentTab == 2">
            <p class="title">手机号码登录</p>
            <div class="container">
                <van-form @submit="onSubmitByMobile">
                    <div class="field_box field_phone">
                        <div id="vue_country_intl-3" class="vue-country-popover-container">
                            <!-- <div class="quhao">+86<span class="arrow_bottom"></span></div> -->
                            <div class="quhao">+86</div>
                        </div>
                        <van-field
                            v-model="state.mobile"
                            placeholder="请输入手机号"
                            :border="false"
                            size="large"
                            :rules="[{ required: true, message: '请输入手机号' }]"
                        />
                    </div>
                    <div class="field_box mt12">
                        <van-field
                            v-model="state.code"
                            placeholder="请输入验证码"
                            :border="false"
                            size="large"
                            :rules="[{ required: true, message: '请输入验证码' }]"
                        />
                        <div class="code" @click="sendMobileCode">{{ state.codeText }}</div>
                    </div>
                    <div class="mt21">
                        <van-button type="primary" block round native-type="submit">立即登录</van-button>
                    </div>
                </van-form>
            </div>
        </div>

        <div class="foot_bar">
            <span class="title" @click="state.currentTab = 1">账号登录</span>
            <span class="divider"></span>
            <span class="title" @click="state.currentTab = 2">手机号码登录</span>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Toast } from 'vant'
import { loginUser, loginByPhone, sendCode } from '@/api/user'
export default {
    name: 'App',
    components: {},
    setup(props, context) {
        const router = useRouter()

        const state = reactive({
            currentTab: 1,
            account: '',
            pwd: '',
            mobile: '',
            code: '',
            codeText: '获取验证码',
            codeTimes: 60
        })

        const sendMobileCode = () => {
            if (state.codeText !== '获取验证码') {
                return
            }
            if (!state.mobile) {
                Toast.fail('请输入手机号')
                return
            }
            if (!/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(state.mobile)) {
                Toast.fail('请输入正确的手机号')
                return
            }
            sendCode({ mobile: state.mobile, type: '1' }).then((res) => {
                if (res.code !== 0) {
                    Toast.fail(res.message)
                } else {
                    Toast.success(res.message)
                    const timer = setInterval(() => {
                        state.codeTimes--
                        state.codeText = state.codeTimes + '后重发'
                        if (state.codeTimes === 0) {
                            clearInterval(timer)
                            state.codeText = '获取验证码'
                        }
                    }, 1000)
                }
            })
        }

        const onSubmit = () => {
            // console.log(state)
            if (!/^[a-zA-Z0-9]{6,20}$/.test(state.account)) {
                Toast.fail('请设置6-20位以数字或字母的账号')
                return
            }
            if (!/^[a-zA-Z0-9]{6,20}$/.test(state.pwd)) {
                Toast.fail('请设置6-20位以数字或字母的登录密码')
                return
            }

            loginUser({ account: state.account, pwd: state.pwd }).then((res) => {
                if (res.code !== 0) {
                    Toast.fail(res.message)
                } else {
                    Toast.success(res.message)
                    localStorage.setItem('userDetail', JSON.stringify(res.result))
                    router.push('/home')
                }
            })
        }

        const onSubmitByMobile = () => {
            // console.log(222)
            if (!/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(state.mobile)) {
                Toast.fail('请输入正确的手机号')
                return
            }

            loginByPhone({ mobile: state.mobile, code: state.code }).then((res) => {
                // console.log(res)
                if (res.code !== 0) {
                    Toast.fail(res.message)
                } else {
                    Toast.success(res.message)
                    localStorage.setItem('userDetail', JSON.stringify(res.result))
                    router.push('/home')
                }
            })
        }

        return { state, onSubmit, onSubmitByMobile, sendMobileCode }
    }
}
</script>
<style scoped lang="scss">
.nav_bar {
    height: 1.17333rem;
    padding: 0 0.32rem;
    display: flex;
    align-items: center;
}

.nav_bar .close {
    width: 0.58667rem;
    height: 0.58667rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAALKADAAQAAAABAAAALAAAAAD8buejAAACJElEQVRYCe2XS07DMBCG7fQanAUVduwAISGVPTtugEpauAE79iyQQGLHtuUISEiw5xqJmT9lFCckzthON+BIaf2a8eff40eUSk9SICmQFEgKJAX+sgJaOrj5fHFglLlDe5Opi5s8f5badrW7zPNDXapb1Gmlz5fLq5eudu2yrF3QlwesMWYHryrUIw3gtK/tUHllSz7YHwsxZId6MXDTmZmUxtyHQMMGtjRPk6ZPWU4MjDCgyStqt/7Q3bC62PiuPbtS4lG+rlYf0+nep1HqiBzyQDPkUb5er95dHfXBZlqfXS/yJ5etXScGhhGgQqBdsLTYHmygobQXcAj0mLDo3xvYB3psWPQt3ofRuP24gND2926gC8SsbxjY/UYBw1EXNB0EJe2tqObFScl4WDgMCgkY8tOzECGEJcY4sOgzGhhOGJqSx/RaoKhVZaazqDCovPz8WFNmF4elf8KgYUzh0cjHZkZRuI7jzhnT0sNFMpho4Bq2cTcoSVmsOpZXfCIOQUeFRDcsFlg201rPsDPUAP53j9q2TgUr3A+72Wd5ISIcqDsWJlrpIOAhWNZjG9DewFLYbUF7AfvCbgNaDIxvMFMqugrau4H8BHOFx+7+9A33bR6g658Xg6tNVbf5YAyDZee49ODy0949+GOU27n+xcBNJ3Jlm3ZKdUO3W/XnxcD4FKe99QsvnWcnMVfEypZ8sD/47kdMNUmBpEBSICmQFPhPCnwDBlaCNsGij+8AAAAASUVORK5CYII=)
        no-repeat 50%;
    background-size: contain;
}

.pwd_login {
    padding: 1.2rem 0.77333rem;
}

.pwd_login .title {
    text-align: center;
    font-family: PingFangTC-Semibold;
    font-size: 0.48rem;
    color: #323334;
}

.pwd_login .container {
    margin-top: 0.82667rem;
}

.pwd_login .container .field_box {
    position: relative;
}

:deep(.van-cell) {
    padding: 0;
}

:deep(.van-cell, .van-field__body) {
    width: 100%;
    height: 1.28rem;
    border-radius: 0.64rem;
    background-color: #f5f5f5;
}

:deep(.van-cell input) {
    height: 1.28rem;
    line-height: 1.28rem;
    border-radius: 0.64rem;
    padding: 0 0.42667rem;
}

.pwd_login .container .field_box {
    position: relative;
}

.mt12 {
    margin-top: 0.32rem;
}

.mt21 {
    margin-top: 0.56rem;
}

.pwd_login .tips {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.37333rem;
}

.pwd_login .tips span:first-child {
    color: #ff9903;
}

.pwd_login .tips span:nth-child(2) {
    color: #a2a2a6;
}

.pwd_login .tips span {
    font-family: PingFangTC-Regular;
    font-size: 0.37333rem;
}

.foot_bar {
    position: fixed;
    bottom: 1.17333rem;
    width: 100%;
    height: 1.33333rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.foot_bar .title {
    font-family: PingFangTC-Regular;
    font-size: 0.37333rem;
    color: #ff9903;
}

.foot_bar .divider {
    display: inline-block;
    height: 0.34667rem;
    border-left: 0.05333rem solid #ff9903;
    margin: 0 0.26667rem;
    font-size: 0;
}

.code_login {
    padding: 1.2rem 0.77333rem;
}

.code_login .title {
    text-align: center;
    font-family: PingFangTC-Semibold;
    font-size: 0.48rem;
    color: #323334;
}
.code_login .container {
    margin-top: 0.82667rem;
}

.code_login .container .vue-country-popover-container {
    position: absolute;
    left: 0.42667rem;
    height: 1.28rem;
    line-height: 1.28rem;
    z-index: 99;
    font-size: 0.37333rem;
    color: #f7b43f;
}

.vue-country-popover-container {
    display: inline-block;
}

.code_login .container .arrow_bottom {
    width: 0;
    height: 0;
    display: inline-block;
    border: 0.13333rem solid transparent;
    border-top-color: #f7b43f;
    position: relative;
    top: 0.08rem;
    margin-left: 0.13333rem;
}

.field_phone :deep(.van-cell) input {
    padding-left: 2.13333rem;
}

.code_login .container .field_box {
    position: relative;
}

.code_login .container .code {
    position: absolute;
    right: 0.42667rem;
    top: 0.42667rem;
    font-family: PingFangTC-Regular;
    font-size: 0.37333rem;
    line-height: 0.42667rem;
    color: #f8b945;
}

.code_login .container .code:before {
    content: '';
    display: inline-block;
    height: 0.34667rem;
    width: 0;
    border-right: 0.02667rem solid #d8d8d8;
    margin: 0 0.42667rem;
    position: relative;
}
</style>
