<!--
 * @Description: CSS测试页面
 * @Date: 2024-07-18 12:13:51
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\css_test\index.vue
-->
<template>
    <div class="css-container ma-10">
        <div class="text-h5 text-center"></div>
        <div class="css-tabs">
            <div @click="changeTab(tab)" :class="['css-tab', { 'tab-active': is_comp == tab.value }]"
                v-for="(tab, index) in tab_list" :key="`tab-${index}`">
                <div class="tab-title">{{ tab.title }}</div>
            </div>
        </div>
        <component :is="comp_map[is_comp]" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import scssStar from "src/page/css_test/scss_star.vue";  // 星空效果
import imgLazy from "src/page/css_test/imglazy.vue"; // 图片懒加载
import progress from "src/page/css_test/progress.vue"; // 顶部进度条
import lottery from "src/page/css_test/lottery/index.vue"; // 走势图
import virtualList from "src/page/css_test/virtual_list/index.vue"; // 虚拟列表
import knob from "src/page/css_test/knob/index.vue";  // 进度条比例
const tab_list = [
    {
        title: "css测试",
        value: "progress",
    },
    {
        title: "图片懒加载",
        value: "imgLazy",
    },
    {
        title: "星空效果",
        value: "scssStar",
    },
    {
        title: "走势图",
        value: "lottery",
    },
    {
        title: "虚拟列表",
        value: "virtualList",
    },
    {
        title: "进度条比例",
        value: "knob",
    },
    {
        title: "星空效果-6",
        value: "scssStar-6",
    },
    {
        title: "星空效果-7",
        value: "scssStar-7",
    },
    {
        title: "星空效果-8",
        value: "scssStar-8",
    },
    {
        title: "星空效果-9",
        value: "scssStar-9",
    },
    {
        title: "星空效果-10",
        value: "scssStar-10",
    },
    {
        title: "星空效果-11",
        value: "scssStar-11",
    },
    {
        title: "星空效果-12",
        value: "scssStar-12",
    }
]

const comp_map = {
    progress,
    scssStar,
    imgLazy,
    lottery,
    virtualList,
    knob,
}

const is_comp = ref("progress")

const changeTab = (tab) => {
    console.log('---logs--e-', tab);
    is_comp.value = tab.value;
}
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
    display: none;
}

.css-tabs {
    display: flex;
    gap: 10px;
    border: 1px solid var(--q-gb-bg-c-5, #5a6074);
    // margin: 10px;
    overflow: hidden;
    overflow-x: scroll;

    .css-tab {
        cursor: pointer;
        padding: 10px;
        white-space: nowrap;

        &:hover:not(.tab-active) {
            color: var(--q-gb-bd-c-3, #5a6074);
            transform: scale(1.08);
        }

        &.tab-active {
            background: var(--q-gb-bg-lg-1, #58a6ff);
        }
    }

}
</style>
