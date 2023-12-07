<template>
    <div class="page">
        <van-nav-bar
            title="修改密码"
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
                <div class="field_box field_code mt12">
                    <div class="icon_item lock_icon"></div>
                    <van-field
                        v-model="state.pwd"
                        placeholder="请输入新密码"
                        :border="false"
                        size="large"
                        clearable
                        :rules="[{ required: true, message: '请输入新密码' }]"
                    />
                </div>
                <div class="field_box field_code mt12">
                    <div class="icon_item lock_icon"></div>
                    <van-field
                        v-model="state.cpwd"
                        placeholder="请确认新密码"
                        :border="false"
                        size="large"
                        clearable
                        :rules="[{ required: true, message: '请确认新密码' }]"
                    />
                </div>
                <div class="mt27">
                    <van-button type="primary" block round native-type="submit">确认提交</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { Toast } from 'vant'
import { getBanner, getIndexCol } from '@/api/common.js'
import { Encrypt, Decrypt } from '@/utils/crypto'
import { bindPhone, updatePwd } from '@/api/user'
export default {
    name: 'App',
    components: {},
    setup(props, context) {
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
            updatePwd({
                pwd: state.pwd,
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
            onSubmit
        }
    }
}
</script>
<style lang="scss" scoped></style>
