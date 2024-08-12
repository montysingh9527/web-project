<!--
 * @Description: CSS测试页面
 * @Date: 2024-07-18 12:13:51
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\css_test\index.vue
-->
<template>
    <div class="css-container">
        <div class="text-h5 text-center">CSS测试页面</div>
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
import scssStar from "src/page/css_test/scss_star.vue";
import imgLazy from "src/page/css_test/imglazy.vue"; // 图片懒加载
import progress from "src/page/css_test/progress.vue";
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
        title: "星空效果-3",
        value: "scssStar-3",
    },
    {
        title: "星空效果-4",
        value: "scssStar-4",
    },
    {
        title: "星空效果-5",
        value: "scssStar-5",
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
    margin: 10px;
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
