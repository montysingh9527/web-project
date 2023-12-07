<template>
    <div class="page">
        <van-nav-bar
            title="绑定手机"
            @click-left="$router.back()"
            style="height: 46px"
            :border="false"
            fixed
            placeholder
        >
            <template #left>
                <van-icon name="arrow-left" style="color: rgb(125, 125, 128); font-size: 16px" />
            </template>
        </van-nav-bar>
        <div class="container">
            <van-form @submit="onSubmit">
                <div class="field_box field_phone">
                    <div data-v-fc730198="" class="icon_item phone_icon"></div>
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
                <div class="field_box field_code mt12">
                    <div data-v-fc730198="" class="icon_item code_icon"></div>
                    <van-field
                        v-model="state.code"
                        placeholder="请输入验证码"
                        :border="false"
                        size="large"
                        :rules="[{ required: true, message: '请输入验证码' }]"
                    />
                    <div class="code" @click="sendMobileCode">{{ state.codeText }}</div>
                </div>
                <!-- <div class="field_box field_code mt12">
                    <div class="icon_item lock_icon"></div>
                    <van-field
                        v-model="state.pwd"
                        placeholder="请输入密码"
                        :border="false"
                        size="large"
                        clearable
                        :rules="[{ required: true, message: '请输入密码' }]"
                    />
                </div>
                <div class="field_box field_code mt12">
                    <div class="icon_item lock_icon"></div>
                    <van-field
                        v-model="state.cpwd"
                        placeholder="请确认密码"
                        :border="false"
                        size="large"
                        clearable
                        :rules="[{ required: true, message: '请确认密码' }]"
                    />
                </div> -->
                <div class="mt27">
                    <van-button type="primary" block round native-type="submit">绑定手机</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {Toast} from "vant"
import { getBanner, getIndexCol } from '@/api/common.js'
import { Encrypt, Decrypt } from '@/utils/crypto'
import { bindPhone, sendCode } from '@/api/user'
export default {
    name: 'App',
    components: {},
    setup(props, context) {
        const router = useRouter
        const state = reactive({
            mobile: '',
            code: '',
            codeText: '获取验证码',
            pwd: '',
            cpwd: ''
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
            sendCode({ mobile: state.mobile, type: '2' }).then((res) => {
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
            if (!/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(state.mobile)) {
                Toast.fail('请输入正确的手机号')
                return
            }

            bindPhone({
                mobile: state.mobile,
                code: state.code,
                userId: JSON.parse(localStorage.getItem('userDetail')).id
            }).then((res) => {
                if (res.code !== 0) {
                    Toast.fail(res.message)
                } else {
                    Toast.success(res.message)
                    router.push('/home')
                }
            })
        }

        return {
            state,
            sendMobileCode,
            onSubmit
        }
    }
}
</script>
<style lang="scss" scoped>
.page .container {
    padding: 0.53333rem 0.26667rem;
}
.page .container .field_box {
    position: relative;
    border-bottom: 0.02667rem solid #f0f1f2;
}

.page .container .phone_icon {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFgAAAAAcITNaAAAAiklEQVQ4EWNgoBFgRDfXxMRk6////73QxfHxGRkZt505c8YbWQ0TMgfEJtVQXHpY0A2G8YEugDHx0kAfYpXHcDFWVWQIjhoMD7TRoBgNCngIwBmjqYL2QYGz2EQvDmF8YotTnAbD/QRlNDc3g1menp7oUlj5GAaDqhlstUhtbS1WA6CCW/FJUlUOAJzsHep8O0SgAAAAAElFTkSuQmCC)
        no-repeat 50%;
    background-size: cover;
}
.page .container .icon_item {
    position: absolute;
    top: 0.34667rem;
    left: 0.21333rem;
    z-index: 99;
    width: 0.58667rem;
    height: 0.58667rem;
}

.page .container .vue-country-popover-container {
    position: absolute;
    left: 1.22667rem;
    height: 1.28rem;
    line-height: 1.28rem;
    z-index: 99;
    font-size: 0.37333rem;
    color: #f7b43f;
}

.vue-country-popover-container {
    display: inline-block;
}

.page .container .arrow_bottom {
    width: 0;
    height: 0;
    display: inline-block;
    border: 0.13333rem solid transparent;
    border-top-color: #f7b43f;
    position: relative;
    top: 0.08rem;
    margin-left: 0.13333rem;
}

:deep(.van-cell) {
    padding: 0;
}

:deep(.van-cell),
:deep(.van-field__body) {
    width: 100%;
    height: 1.28rem;
    background-color: #fff;
}

.field_phone :deep(.van-cell) input {
    padding-left: 2.93333rem;
}

:deep(.van-cell) input {
    height: 1.28rem;
    line-height: 1.28rem;
    padding: 0 0.42667rem;
}

.page .mt12 {
    margin-top: 0.32rem;
}

.page .container .code_icon {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFgAAAAAcITNaAAABbElEQVQ4EdWVPY6CUBDH/xBsLKy4A1ZYaEIsTWjYTWwoPYMnMFZUHoCC1koTGgu3oLGxtDChwgRaCz0ACYkuQ6IxyBs/sls4DfPx5veGGXgP+CeRytxOp7M8n89fZT9nS5L0s9lsvm/XyLcG6a9CRTlKGXyx8wouKvvM37Ayfldx5ao3nJ8HFvaY3j6KIsxmM2RZBl3XC/t0OiEMQ0ynU9TrdWGTWLCmaTAMA4qiwDRNrFYrtNttTCYTFkq7sWBa4Ps+ms1mAVqv1+h2u5Dlx6NhVwRBgDRNMRgMsNvtispd18V+v8d8Pqd9hcJW3Ov1sN1uEcdx0ed+v4/8L4Nt21gsFkIoBVhwrVYDDetwOID0JEkKMA2t0Wi8D6ZMy7LQarWukOPxiNFohOFwePVVKWzFlHALJVtVVXieRyor7PDYzAfBzwMLe1w+Di/2s8epEFxuoeM4hYu+kmfkDkzXTNUtMh6POd6SC/5p7BexrGoqQUgzwQAAAABJRU5ErkJggg==)
        no-repeat 50%;
    background-size: cover;
}

.page .mt27 {
    margin-top: 0.72rem;
}

.page .container .lock_icon {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFgAAAAAcITNaAAACPElEQVQ4EbWUy2sTURTGO3HU1qCiSC2IdKV0UankBZPVbJSmJOImbty4cm0XoliErArtv6AUxJ0rF4quROrGPKEVX4sJaBEXRrAkwdY8xt8tPWE6zSR30wuH79zz+O655z5GRg5oGDq88Xj8MnHnXdfdQjbK5fKXYXkDibPZ7BHHcZ4bhjEN0RlkG/mFrGQymeVcLtdF7zsCianMiMViK2TdRBzIV7vd7kn06+ht5FGpVJrvy4oxkJjtz0L0hJjxUCg0XSwWPyoS7Dc6nc4SxIZpmnP5fP6TsvtHyG+QORVPoavt3xFS5UN/BrxBTrHApLL1G4OIL1LUP6r96k+kUlX9CXzn/D6Z72mFbdtmo9GYwxmm4rugIr8P/pYEhfhuAzbED2jXN2L+pNPp197D7BFDOlqv1z+QoKoYQ3SHS+Am5O84zGuSZIrSbDavoE8gh6loUezDkKpdqr5FnJVIJGYKhcKayukRo6sqjyGLlUrlIag9otHoDMEWhzkqSfsOj2p77ZEghapVPJhDXpvo5Li0oiVzhfuIvU7Rk8nkJIf6o1qtfk6lUkfFPgi1iNvt9iWKOg3RhVqtFnjFvAtpEXMgL0h6z3af8kCqXoIgXYt4N9kBh/5qspD3VogtCN/Sju9BTr9dm5g/+LE/Wea06Ljogl7ivxi3CboXiUTEr4PqetrsZoM/RHHsjB5xOBx+xZP+ifUs5Au7fl3YIpAfNL8uCXseg2VZY61W6ypO7b+CStUF2KRVL4X0QPE/4cvKJIjV5skAAAAASUVORK5CYII=)
        no-repeat 50%;
    background-size: cover;
}

.field_code :deep(.van-cell) input {
    padding-left: 1.22667rem;
    padding-right: 3.2rem;
}

.page .container .code {
    position: absolute;
    right: 0.42667rem;
    top: 0.42667rem;
    font-family: PingFangTC-Regular;
    font-size: .37333rem;
    line-height: .42667rem;
    color: #f8b945;
}

.page .container .code:before {
    content: "";
    display: inline-block;
    height: 0.34667rem;
    width: 0;
    border-right: 0.02667rem solid #d8d8d8;
    margin: 0 0.42667rem;
    position: relative;
}
</style>
