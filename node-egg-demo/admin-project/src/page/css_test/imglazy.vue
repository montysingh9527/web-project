<!--
 * @Description: 图片懒加载
 * @Date: 2024-08-13 00:34:39
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\css_test\imglazy.vue
-->
<template>
    <div class="img-lazy-box">
        <div class="img-lazy-box-cont" v-for="(item, index) in img_list" :key="`lazy-${index}`">
            <div>{{ item.title }}</div>
            <img v-lazy="item.value" :alt="item.title">
        </div>
    </div>
</template>

<script setup>
import bg1 from "src/assets/bg-1.jpg";
import bg2 from "src/assets/bg-2.jpg";
import bg3 from "src/assets/bg-3.jpg";
import bg4 from "src/assets/bg-4.jpg";
import bg5 from "src/assets/bg-5.jpg";
import bg6 from "src/assets/bg-6.jpg";

const img_list = [
    {
        title: "图片一",
        value: bg1,
    },
    {
        title: "图片二",
        value: bg2,
    },
    {
        title: "图片三",
        value: bg3,
    },
    {
        title: "图片四",
        value: bg4,
    },
    {
        title: "图片五",
        value: bg5,
    },
    {
        title: "图片六",
        value: bg6,
    }
]

</script>

<style scoped lang="scss">

.img-lazy-box{
    text-align: center;
    font-size: 30px;
    &-cont {
        margin-top: 50px;
        img {
            width: 100%;
        }
    }
}
</style>
