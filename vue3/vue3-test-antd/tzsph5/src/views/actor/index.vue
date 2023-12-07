<template>
    <div class="page">
        <van-nav-bar title="up主" @click-left="$router.back()" style="height: 46px" :border="false" fixed placeholder>
            <template #left>
                <van-icon name="arrow-left" style="color: rgb(125, 125, 128); font-size: 16px" />
            </template>
        </van-nav-bar>

        <div style="height: 44px">
            <van-sticky :offset-top="46">
                <div class="nav">
                    <div class="nav_title">
                        <span>热门女优</span>
                        <i class="nav_fire"></i>
                    </div>
                    <!-- <i class="nav_search"></i> -->
                </div>
            </van-sticky>
        </div>
        <van-grid :border="false">
            <van-grid-item v-for="item in state.data" :key="item.id"  style="flex-basis: 25%" :to="`/actorDetail?id=${item.id}`">
                <img v-lazyload="item.imgUrl" style="width: 1.38667rem; height: 1.38667rem; border-radius: 50%" />
                <!-- <van-image :src="resourceHost + item.imgUrl" round style="width: 1.38667rem; height: 1.38667rem; border-radius: 50%" /> -->
                <p class="name van-ellipsis">{{item.title}}</p>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute } from 'vue-router'

import { getActorList,listVideoByActor } from '@/api/common'
import {useKeepAliveHook} from '@/hooks/index.js'

export default {
    name: 'Actor',
    components: {},
    setup(props, context) {
        useKeepAliveHook()

        const resourceHost = import.meta.env.VITE_APP_RESOURCE_HOST
        const state = reactive({
            data: []
        })



        onMounted(() => {
            getActorList().then((res) => {
                // console.log(res)
                if (res.code !== 0) {
                    Toast.fail(res.message)
                } else {
                    state.data = res.result
                }
            })
        })
        return {
            state,
            resourceHost
        }
    }
}
</script>
<style scoped lang="scss">
.page .nav {
    padding: 0 0.42667rem;
    height: 1.17333rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
}

.page .nav .nav_title {
    font-size: 0.48rem;
    font-weight: 700;
    vertical-align: middle;
}

.page .nav .nav_fire {
    width: 0.42667rem;
    height: 0.42667rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAAEAAAAAA0VXHyAAABpElEQVQ4EbVTTShEYRQ99z2hKEl+ykKy8POQDQs2ZqaQhVLEAhvZsmErltiY7KUm7JSVyE+2NiLMLImVn6JIGb7rfm+8z3szU1bu4t17zzn39N7tPuA/gkMNkxyqf+aQ0/2Xv5Uu4HDDNJijYBQJ56Tz6X3AgMP1o1C89CtS9m+dvTIG3OtUQFE0KKOaYJ/ZGQO8qwWAi9Mk/Tzo5HoYdzUXyH7mJTd6mGugCYAGPNBk5jI8YVH3PDdnIfm5IfuZRTK55mnIJSPOML7UpgdmZkqAmGSxtYYjq4eOLndTn6C4yRBZC64LDLsaHtcpZaBf1R9EZ/42e83NGk8ZEGQHvrCsGdnJnQ/JLBlVGvwxsM6DCnqFXdgi7BiIVsQsEeSlI9xoLGWQY68K8GJE/NVBBydPdBiP0dHVJEqpVYzeDK8LRkwn14D2zu9h2SMi+tAgFKY40lbi1vrxaFfKQJ7pCcfoLJe70S/iCw43tkOpZbFvFeoWFm3JaevBIXNkRNvIz5ugndMHPRow8LzkL+yTg+mX3pHBasnXIr1ADq/Tfnzf0+n8DcUpeb4pyyj4AAAAAElFTkSuQmCC)
        no-repeat 50%;
    background-size: contain;
    margin-left: 0.18667rem;
    display: inline-block;
}

.page .nav .nav_search {
    width: 0.42667rem;
    height: 0.45333rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAiCAYAAAA+stv/AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIgAAAADWRjGTAAAE0klEQVRYCb1X3U8bRxCfO2OM+VCBFBuIGsKH09qIkpfyUKUUAooCIVIRymOV5qmp8vdEQqoUkUDahJIKUrkK6UNM32kfQGDTyCE2OC4gwDbEptim+xu6l+I782FHjATnnd2d/d3M7G/mlD0hdISsrKzQ/LyXXr70UzQapbdvt3lHSUkplZd/QA5HEzmdn1BlZeURlvTTymEAvF4fPXs2SRsbG1RQUEC7u0m9BaExm/fnqqvt1NNzlerrzwvt8cQQQCQSoUePRikcDlM6vUfSSaqqCiAmbUykUDKZEuM0n6YoqnjuUUNDPd24MUDFxcVHotABCASCNDLyg3jbXUqlUqQoivgjKiqyUnOzi+x2G5WVlTGIWCxGy8shDg/WAywAmEwmcbiVbt78mmw226EgDgDA4ffuDbFxvDUMVVRUUG/vVWpqasxqCFk0NzcnwvWctre32Cvwlsmk0u3b31JV1YdZ92oA4Pa7dwdpZ2eHAaiqQu3t7XT5ckfWzZkT6XSa3O5faXr6T+GNNAFEaWkp3bnzHVmtRZnLeYygsTx+/JNw+z/a4f39X53ocBjBgdev91F3dxf/BgjcmPHxif1DDP4zAJ9vgUKhNyLmaXZbe/sX1Nr6qcHy46kuXfqcLl5sFbYKOBxer5dzxWg3A8BVQ8yRcIh5Z2en0doT6fr6esliKfxvj0qTk88N96urq6u0vr6uAcA9RtbnK+CNK1e6OZFxTV+/DohwxHVm1fl5H7sKMxaLhVlNtypHRUtLi7YTN8rn82lj+UP1+/0iTklOGqfTKfXv5QmGrK8/z7ZAWPBCpqibm1HWgeFApe9bampqOAwgKFB6pqggDghYrKysNHM+7zFYE4QEiURiOnvi6u5nHG6A5HzdqjwUSEBp1yi5VZRUKdGoHqGcy/WJegF+gcAbmaKinkNQeEKhUOZ83uNgcIlpGZXyzBl9v6A6HA5RYs28CPV/v6LlfS4bSCR2KBgM8m+TSaHGxgadYdXp/Fhcw12eSKWSNDs7q1uUq2J6+g++3tiPMBgCKC8vp7Nna8VChReBMhGOfCWRSNCLFx6uBSAhl8spKqJVZ5bvB+hXdobxeJwmJn7RLTyJArZGR8c4rNiHqtjZ2WFoggGcO/cRXbjgYMIAY83MzJDH87vhhqOUONztdtOrV4vMsKiIbW2fic6oynArA8DMwEC/aB5KOGaI19TUFI2N/cytmeFOA2U8nqDh4RFuSN6FMfvbw4TWEWGwtrZGg4PfixxIcj6Ans1mMzcY6A8KC2V5xep3goORcB6Ph90NL0qBDbvdTrdufSP2m6Vaex4AAC1K89DQMG1txTiBoEMSgdHq6uqotraWKRvsBpIJBJZEs7HMdCsPxqH7OYXETnInnQ2EDgAORF/49KmbryQoGkkkBbyuqiYx3OPb8n/ewBzGbW1t1NXVQQ8f/khLSyEGgVyorrbpPGEIQB4WDv8tOpnfREL5tdyQvC7X4PqiFwRIl6tZZPuXWheMMn///vChIA4FIA/BnV5Y+IsWFwO0ubkhqlqUuyZwOz7HQDD4GCkq0ne++Jp68CA7iGMBkEByfR7miVMBAOBGnmhpaT54DXN9w+Puy/QEKvGpeUCCBIgnT8ZFPi3StWs9pw9AApFPjYql4rSf/wIV0XazDyJuUgAAAABJRU5ErkJggg==)
        no-repeat 50%;
    background-size: contain;
}

.page .name {
    font-size: .37333rem;
    text-align: center;
    font-weight: 700;
    color: #474747;
    width: 1.2rem;
}
</style>
