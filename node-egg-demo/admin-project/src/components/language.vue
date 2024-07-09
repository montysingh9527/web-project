<!--
 * @Description: 语言切换
 * @Date: 2024-06-16 09:56:34
 * @FilePath: \web-project\node-egg-demo\admin-project\src\components\language.vue
-->
<template>
    <div class="language">
        <div class="language-cont" @click="change_lang">
            <div class="language-cont-lang" v-for="item in lang_list" :key="item.value" :data-name="item.value"
                :class="{ 'lang-text': lang_text == item.value }">{{ item.label }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { LocalStorage } from "quasar";
import { loadLanguageAsync } from "src/i18n/index.js";

const lang_list = [
    {
        label: "ZH",
        value: "zh",
    },
    {
        label: "EN",
        value: "en",
    }
]

const lang_text = ref(LocalStorage.getItem("lang") ?? "zh")

const change_lang = (e) => {
    lang_text.value = e.target.dataset.name ?? "zh";
    LocalStorage.set("lang", lang_text.value);
    loadLanguageAsync(lang_text.value);
}

loadLanguageAsync(lang_text.value);

</script>

<style scoped lang="scss">
.language {
    &-cont {
        display: flex;
        // gap: 2px;
        border-radius: 15px;
        border: 1px solid var(--q-gb-bg-c-3);
        background: var(--q-gb-bg-c-51);
        cursor: pointer;

        &-lang {
            position: relative;
            width: 32px;
            height: 32px;
            line-height: 32px;
            // margin: 1px 2px;
            text-align: center;

            &.lang-text {
                background: var(--q-gb-bg-c-51);
                border-radius: 50%;

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    // border: 1px solid var(--q-gb-bg-c-3);
                }
            }
        }

    }
}
</style>
