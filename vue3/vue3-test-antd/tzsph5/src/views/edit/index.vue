<template>
    <div class="page">
        <van-nav-bar
            title="编辑资料"
            @click-left="$router.back()"
            @click-right="onClickRight"
            right-text="保存"
            style="height: 46px"
            :border="false"
            fixed
            placeholder
        >
            <template #left>
                <van-icon name="arrow-left" style="color: rgb(125, 125, 128); font-size: 16px" />
            </template>
        </van-nav-bar>
        <div class="list">
            <van-cell-group>
                <van-cell is-link>
                    <template #title>
                        <span>头像</span>
                    </template>

                    <template #value>
                        <div class="cell_slot">
                            <!-- <van-uploader :after-read="afterRead"> -->
                            <!-- <template #default> -->
                            <img
                                v-if="uploaderImg.indexOf('data:image/png;base64') == -1"
                                v-lazyload="state.headUrl"
                                class="avatar"
                                style="width: 0.64rem; height: 0.64rem"
                            />
                            <img v-else :src="uploaderImg" class="avatar" style="width: 0.64rem; height: 0.64rem" />
                            <!-- </template> -->
                            <!-- </van-uploader> -->
                        </div>
                    </template>
                </van-cell>
                <van-cell title="昵称" value="内容" is-link>
                    <template #value>
                        <div class="cell_slot">
                            <div class="nick_name">
                                <van-field
                                    v-model="state.nickName"
                                    placeholder="请输入昵称"
                                    :border="false"
                                    size="large"
                                    input-align="right"
                                    :rules="[{ required: true, message: '请输入昵称' }]"
                                />
                            </div>
                        </div>
                    </template>
                </van-cell>
                <van-cell title="个人简介" is-link>
                    <template #value>
                        <div class="cell_slot">
                            <div class="nick_name">
                                <van-field
                                    v-model="state.introduction"
                                    placeholder="请输入简介"
                                    :border="false"
                                    size="large"
                                    input-align="right"
                                    :rules="[{ required: true, message: '请输入简介' }]"
                                />
                            </div>
                        </div>
                    </template>
                </van-cell>
                <van-cell title="性别" is-link @click="showPicker = true">
                    <template #value>
                        <span v-if="state.sex == 0">保密</span>
                        <span v-if="state.sex == 1">男</span>
                        <span v-if="state.sex == 2">女</span>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
    </div>
    <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
</template>

<script>
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { getBanner, getIndexCol } from '@/api/common.js'
import { Encrypt, Decrypt } from '@/utils/crypto'
import { uploadUserHead, updateUserInfo } from '@/api/user'
import axios from 'axios'
import Qs from 'qs'
export default {
    name: 'App',
    components: {},
    setup(props, context) {
        const store = useStore()
        // console.log(store.state.user)

        const uploaderImg = ref('')

        const showPicker = ref(false)
        const columns = ['保密', '男', '女']
        const state = reactive({
            headUrl: store.state.user.userInfo.headUrl,
            nickName: store.state.user.userInfo.nickName,
            introduction: store.state.user.userInfo.introduction,
            sex: store.state.user.userInfo.sex,
            newHeadUrl: '' //上传接口返回的新头像路径
        })

        // console.log(state)

        const afterRead = (file) => {
            // 此时可以自行将文件上传至服务器
            // console.log(file)
            // console.log(file.content)
            uploaderImg.value = file.content
            // console.log(file.file.size)

            // 标准
            // let fd = new FormData()
            //     fd.append('file', file.file)
            //     this.axios.post(url, fd, {headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }}).then()

            // axios
            //     .post(import.meta.env.VITE_APP_PROXY_HOST, fd, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //             token: Encrypt(file.file.size)
            //         }
            //     })
            //     .then((res) => {
            //         // console.log(res)
            //     })

            uploadUserHead(
                { token: Encrypt(file.file.size), 'Content-Type': 'multipart/form-data', aaa: '222' },
                Qs.stringify({ file: file.file })
            ).then((res) => {
                // console.log(res)
                if (res.code !== 0) {
                    Toast.fail(res.message)
                } else {
                    Toast.success(res.message)
                    router.push('/home')
                }
            })
        }

        const onConfirm = (value, index) => {
            state.sex = index
            showPicker.value = false
        }

        const onClickRight = () => {
            updateUserInfo({
                nickName: state.nickName,
                introduction: state.introduction,
                headUrl: state.newHeadUrl ? state.newHeadUrl : state.headUrl,
                sex: state.sex,
                id: JSON.parse(localStorage.getItem('userDetail')).id
            }).then((res) => {
                // console.log(res)
                if (res.code !== 0) {
                    Toast.fail(res.message)
                } else {
                    Toast.success(res.message)
                    router.push('/home')
                }
            })
        }
        return { state, uploaderImg, showPicker, columns, onConfirm, afterRead, onClickRight }
    }
}
</script>
<style lang="scss" scoped>
:deep(.van-nav-bar__text) {
    color: #f8b945;
}
.page .nick_name .van-cell {
    padding: 0;
}
</style>
