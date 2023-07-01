<template>
    <div style="height: 100%; background: #f7f8fa">
        <Header title="更改密码"> </Header>
        <div class="b-settings__wrapper">
            <!---->
            <div class="b-settings__content" is-valid="true" all-data-saved="true">
                <div class="row">
                    <van-form @submit="onSubmit">
                        <van-cell-group inset>
                            <van-field
                                v-model="state.pwd"
                                label="新密码"
                                placeholder="请输入新密码"
                                size="large"
                                :rules="[{ required: true, message: '请输入新密码' }]"
                            />
                            <van-field
                                v-model="state.cpwd"
                                type="password"
                                label="确认新密码"
                                placeholder="请确认新密码"
                                size="large"
                                :rules="[{ required: true, message: '请确认新密码' }]"
                            />
                        </van-cell-group>
                        <div style="margin: 16px">
                            <van-button round block type="primary" native-type="submit"> 提交 </van-button>
                        </div>
                    </van-form>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup name="SettingsPassword">
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { showSuccessToast, showFailToast } from 'vant'
import { apiUpdatePwd } from '@/api/common'

const router = useRouter()
const store = useStore()
const state = reactive({
    pwd: '',
    cpwd: ''
})

const onSubmit = () => {
    // console.log(state)
    if (state.pwd !== state.cpwd) {
        Toast.fail('两次密码不一致')
        return
    }
    apiUpdatePwd({
        pwd: state.pwd
    }).then((res) => {
        if (res.code !== 0) {
            showFailToast(res.message)
        } else {
            showSuccessToast(res.message)
            store.dispatch('user/dispatch_refreshUserInfo')
            router.push('/home')
        }
    })
}
</script>
<style lang="scss" scoped>
.m-main-container {
    background: #f7f8fa;
}
.b-settings__wrapper {
    .b-settings__content:last-child,
    .b-settings__nav ul:last-child {
        margin-bottom: 50px;
    }
    .b-settings__content > .row,
    .b-settings__wrapper > .row {
        display: block;
    }
    // .row {
    //     display: flex;
    //     flex-wrap: wrap;
    //     margin-right: -16px;
    //     margin-left: -16px;
    // }

    .row {
        width: 100%;
        margin-top: 0;
        margin-bottom: 0;
    }
    .g-input__wrapper {
        padding-bottom: 20px;
        position: relative;
    }
    .b-settings .b-settings__spacer {
        padding: 14px 16px;
    }

    .b-settings .b-settings__spacer.g-input__fieldset,
    .b-settings .b-settings__spacer.g-input__wrapper {
        padding: 24px 16px 19px;
        border-bottom: 1px solid rgba(138, 150, 163, 0.25);
    }

    .g-input.m-reset-mb {
        margin-bottom: 0;
    }

    .theme--light.v-input,
    .theme--light.v-input input,
    .theme--light.v-input textarea,
    .theme--light.v-select .v-select__selection--comma {
        color: var(--text-color);
    }

    :deep(.van-cell-group) {
        margin-top: 12px;
    }
}
</style>
