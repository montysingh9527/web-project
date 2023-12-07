<template>
<!-- <van-image :src="getimg(imgUrl)"  lazy-load class="swiper_img" style="overflow: hidden; border-radius: 4px" /> -->
<van-image v-if="aa" :src="aa" lazy-load class="swiper_img" style="overflow: hidden; border-radius: 4px" />
<!-- <van-image :src="imgUrl1" lazy-load class="swiper_img" style="overflow: hidden; border-radius: 4px" /> -->

<!-- http://nn11.gophotos.cc/video/e8383b2a3ff608ae5a6cd3677e301f6a/img.jpg -->


222
<img v-lazyload="imgUrl" style="width: 1.38667rem; height: 1.38667rem; border-radius: 50%" />
    
</template>

<script>
import { defineComponent,ref } from 'vue'
import { getCryptImg } from '@/utils/request.ts'
export default defineComponent({
    setup() {
        const imgUrl = "/user/2022-03-15/upload_POSENE_1647348871723.webp"
        const imgUrl1 = "http://nn11.gophotos.cc/video/e8383b2a3ff608ae5a6cd3677e301f6a/img.jpg"

        let aa = ref('')

        const getimg = async(imgUrl)=>{
             aa = await getCryptImg(imgUrl)
             // console.log(aa);
             return aa
        }
        getimg(imgUrl)


 

        

        return{
            aa,
            imgUrl1,
            getCryptImg,
            getimg,
            imgUrl: "/user/2022-03-15/upload_POSENE_1647348871723.webp"
        }
        
    },
})
</script>
