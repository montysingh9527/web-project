<template>
    <van-form @submit="_setNewPwd" class="login-pwd black">
        <input type="password" style="width:1px;height:1px;position: fixed;top:-9999px;">

        <div class="m-t8 m-b16">
            <h3 class="lh-35">新登录密码</h3>
            <van-field class="input-border"
                       right-icon="info-o"
                       v-model="formParams.newPwd"
                       type="password"
                       clickable
                       placeholder="6至15个字符"
                       :border="false"
                       :rules="[{required: true, message: '密码不能为空'}, {pattern: /^[a-zA-Z0-9]{6,15}$/g, message: '密码须6至15个字符'}]"
            />
        </div>

        <div class="m-b16">
            <h3 class="lh-35">确认密码</h3>
            <van-field v-model="formParams.reNewPwd"
                       class="input-border"
                       type="password"
                       clickable
                       :border="false"
                       :rules="[{validator: validatorPwd, message: '确认密码必须与新密码一致'}]"
            />
        </div>


        <div class="m-b20">
            <h3 class="lh-35">当前登录密码</h3>
            <van-field right-icon="info-o"
                       class="input-border"
                       v-model="formParams.oldPwd"
                       clickable
                       type="password"
                       placeholder="密码格式为6至15个字符"
                       :border="false"
                       clearable
                       :rules="[{ required: true, message: '密码不能为空'}, {pattern: /^[a-zA-Z0-9]{6,15}$/, message: '密码须6至15个字符'}]"
            />
        </div>

        <van-button class="fs14" block color="#79AF9E" native-type="submit">提交</van-button>
    </van-form>
</template>
<script>
    import {setNewPwd} from "../../axios/user"
    export default {
        data() {
            return {
                formParams: {}
            }
        },

        methods: {

            validatorPwd(value) {
                let reg = new RegExp(`^${this.formParams.newPwd}$`, 'g')

                console.log(2222)

                return reg.test(value)
            },

            _setNewPwd(errorInfo) {
                if (errorInfo) {
                    setNewPwd(this.formParams)
                        .then(res => {
                            console.log(res)
                            if (res === 'ok') {
                                this.$toast('修改成功')
                                this.formParams = {}
                            } else {
                                this.$toast(res)
                            }
                        })
                }
            }
        }
    }
</script>
<style type="text/css" lang="less">
    .login-pwd {
        max-width: 608px;
        margin: 0 auto;

        .input-border {
            border: 1px solid #bbb;
        }
    }
</style>
