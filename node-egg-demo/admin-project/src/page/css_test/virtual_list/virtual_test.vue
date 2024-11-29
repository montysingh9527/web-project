<!--
 * @Description: 
 * @Date: 2024-11-29 19:59:28
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\css_test\virtual_list\virtual_test.vue
-->
<template>
    <div class="virtual-test-list">
        <div class="virtual-test-wrap" ref="virtualCont" @scroll="onScrollTest">
            <div class="wrap-test" v-for="(item, index) in list" :key="`${index}-list`">
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"

const list = Array(1000).fill(null).map((_, index) => `Item-${index + 1}`);

// Array.from({ length: 1000 }, (_, index) => `Item ${index + 1}`)

console.log('---logs-list--', list);


const virtualCont = ref(null);


function onScrollTest (e) {
    const box = e.target;
    console.log('---logs-box--',box);
}



</script>

<style scoped lang="scss">
.virtual-test-wrap {
    position: relative;
    text-align: center;
    .wrap-test {
        position: absolute;
        left: 50%;
        height: 50px;
        font-size: 18px;
        font-weight: 700;

    }
}
</style>
