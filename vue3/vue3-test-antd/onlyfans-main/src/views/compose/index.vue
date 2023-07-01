<template>
    <div>
        <Header title="新增贴文">
            <template #right>
                <van-button round type="primary" class="g-btn" :disabled="!txtContent" @click="onSubmit">
                    发帖
                </van-button>
            </template>
        </Header>
        <div class="send-box">
            <van-cell-group :border="false">
                <van-field
                    v-model="txtContent"
                    placeholder="发布贴文..."
                    size="large"
                    type="textarea"
                    autosize
                    rows="3"
                />
            </van-cell-group>
            <div class="ml-3">
                <van-uploader
                    v-model="imageList"
                    :after-read="onAfterRead"
                    accept="imageList/*"
                    multiple
                >
                    <!-- :max-count="1" -->
                    <svg data-v-eb436e2a="" class="g-icon" aria-hidden="true">
                        <use
                            xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-media"
                            href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-media"
                        ></use>
                    </svg>
                </van-uploader>
            </div>
        </div>
    </div>
</template>

<script setup name="Compose">
import axios from 'axios'
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { showSuccessToast, showFailToast } from 'vant'
import { Encrypt, Decrypt } from '@/utils/crypto'
import { apiSend } from '@/api/common'

const store = useStore()

const uploadUrl = computed(() => store.state.common.config.uploadUrl)
const resUrl = computed(() => store.state.common.config.resUrl)

const txtContent = ref('')
const imageList = ref([])
const totalSize = ref(0)

const onAfterRead = async (file) => {
    // 图片大小限制 10mb
    // if (file.size > 1024 * 1024 * 10) {
    //     showFailToast('图片过大')
    //     return false
    // } else {
    //     console.log(file)
    // }
}

const onSubmit = () => {
    totalSize.value = imageList.value.reduce((pre, cur) => {
        return pre + cur.file.size
    }, 0)

    const formData = new FormData()
    imageList.value.forEach((e) => {
        formData.append('files', e.file)
    })

    axios
        .post('/r/api/upload/uploadImage', formData, {
            headers: {
                'Access-Control-Allow-Origin': '*', //解决cors头问题
                'Access-Control-Allow-Credentials': 'true', //解决session问题
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', //将表单数据传递转化为form-data类型
                token: Encrypt(totalSize.value)
            },
            withCredentials: true
        })
        .then((res) => {
            console.log(res.data.code)
            if (res.data.code !== 0) {
                showFailToast(res.data.message)
            } else {
                // ["user/image/2023-03-07/upload_DHSNXE_1678188836345.jpg"]
                // ["user/image/2023-03-07/upload_DWEQQI_1678188858994.jpg","user/image/2023-03-07/upload_KVIAVT_1678188858994.jpg","user/image/2023-03-07/upload_GHIVQY_1678188858994.jpg"]
                let imgResult = Decrypt(res.data.result)

                // console.log(imgResult.substring(1, imgResult.length - 1))

                apiSend({ txtContent: txtContent.value, pics: imgResult.substring(1, imgResult.length - 1) })
                    .then((res) => {
                        console.log(res)
                        if (res.code !== 0) {
                            showFailToast(res.message)
                        } else {
                            showSuccessToast(res.message)
                            totalSize.value = 0
                            imageList.value = []
                            txtContent.value = ''
                        }
                    })
                    .catch(() => {})
            }
        })
        .catch()
}
</script>
<style lang="scss" scoped>
.send-box {
    margin-bottom: 9px;
    border-bottom: 8px solid var(--marked-color);
}

.g-btn {
    border: none;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 20px;
    color: #fefefe;
    background: #00aff0;
    min-width: 78px;
    transition: opacity 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
    display: inline-block;
    text-align: center;
    text-transform: uppercase;
    height: 36px;
}

.g-btn.disabled,
.g-btn[disabled] {
    background: rgba(138, 150, 163, 0.75);
    opacity: 0.4;
    pointer-events: none;
}
</style>
