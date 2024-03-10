<template>
    <van-form @submit="submit" class="forget-fund-pwd black">
        <input type="password" style="width:1px;height:1px;position: fixed;top:-9999px;">


        <div class="m-t8 m-b16">
            <h3 class="lh-35">绑定的卡号</h3>
            <van-field class="input-border"
                       right-icon="info-o"
                       v-model="formParams.lgPwd"
                       clickable
                       placeholder="填写登录密码"
                       :border="false"
                       :rules="[{required: true, message: '密码不能为空'}, {pattern: /^[a-zA-Z0-9]{6,15}$/g, message: '密码须6至15个字符'}]"
            />
        </div>
        <div class="m-b16">
            <h3 class="lh-35">手机号</h3>

            <van-field right-icon="info-o"
                       class="input-border"
                       v-model="formParams.oldPwd"
                       clickable
                       placeholder="密码格式为4个数字字符"
                       :border="false"
                       clearable
                       :rules="[{pattern: /^\d{4}$/, message: '密码格式为4个数字字符'}]"
            />
        </div>


        <div class="m-t8 m-b16">
            <h3 class="lh-35">新提款密码</h3>

            <van-field right-icon="info-o"
                       class="input-border"
                       v-model="formParams.newPwd"
                       clickable
                       type="password"
                       placeholder="填写新密码"
                       :border="false"
                       clearable
                       :rules="[{pattern: /^\d{4}$/, message: '密码格式为4个数字字符'}]"
            />
        </div>

        <van-button class="fs14" block color="#79AF9E" native-type="submit">提交</van-button>
    </van-form>

</template>
<script>
    const md5 = require('md5');
    import { setCoinPwd, setFundPwd } from '../../axios/user'
    import { mapGetters, mapMutations } from "vuex"
    export default {
        data() {
            return {
                formParams: {}
            }
        },

        methods: {
            ...mapMutations({
                updateUserInfo: 'UPDATE_USER_INFO'
            }),

            validatorPwd(value) {
                let reg = new RegExp(`^${this.formParams.newPwd}$`, 'g')

                console.log(2222)

                return reg.test(value)
            },

            forgetFundPwd() {
                this.$emit('forget-click')
            },

            submit(errorInfo) {
                if (!errorInfo) return;

                if(this.userInfo.hasFundpwd) {
                    let tmpl = {
                        oldPwd: this.formParams['oldPwd'],
                        newPwd: this.formParams['reNewPwd']
                    };
                    setCoinPwd(tmpl).then(res => {
                        if(res === 'ok') {
                            this.$toast('修改成功！');
                            this.formParams =  {}
                        } else {
                            this.$toast(res);
                        }
                    })
                } else {
                    let tmpl = {
                        loginpwd: md5(this.formParams['lgPwd']),
                        coinpwd: md5(this.formParams['reNewPwd'])
                    };
                    setFundPwd(tmpl)
                        .then(res => {
                            if(res === 'ok') {
                                this.$toast('修改成功！');
                                this.updateUserInfo({hasFundpwd: true})
                                this.formParams =  {}
                            } else {
                                this.$toast(res);
                            }
                        })
                }
            }
        },

        computed: {
            ...mapGetters(['userInfo'])
        }
    }
</script>
<style type="text/css" lang="less">
    .forget-fund-pwd {
        max-width: 608px;
        margin: 0 auto;

        .input-border {
            border: 1px solid #bbb;
        }
    }
</style>
