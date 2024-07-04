<!--
 * @Description: 主题切换
 * @Date: 2024-06-16 09:56:34
 * @FilePath: \web-project\node-egg-demo\admin-project\src\components\theme.vue
-->
<template>
    <div class="theme-cont cursor-pointer">
        <q-icon @click="change_theme" :name="is_day == 'day' ? 'light_mode' : 'nightlight'" size="lg" />
    </div>
</template>

<script setup>
import { ref } from "vue"
import { LocalStorage } from "quasar"
import { set_theme } from "src/css/index.js";


const is_day = ref(LocalStorage.getItem("theme") ?? "day");

set_theme(is_day.value);

const change_theme = () => {
    if (is_day.value == "day") {
        is_day.value = "night";
    } else {
        is_day.value = "day";
    }
    LocalStorage.set("theme", is_day.value)
    set_theme(is_day.value);
}

</script>
<style scoped lang="scss"></style>
