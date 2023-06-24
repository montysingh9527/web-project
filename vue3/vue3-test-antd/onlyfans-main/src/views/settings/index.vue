<template>
    <div>
        <Header title="设置"> </Header>
        <div class="b-settings__wrapper">
            <div class="b-settings__nav b-settings__menu">
                <ul class="b-settings__menu">
                    <li class="b-settings__menu__item">
                        <span><a href="/u304975452" class=""> @u304975452 </a></span>
                    </li>
                    <!-- <li class="b-settings__menu__item">
                        <a href="/my/settings/profile" class="m-tb-sm m-with-rectangle-hover"
                            ><div>个人档案</div>
                            <span class="b-settings__menu__item__arrow"
                                ><svg class="g-icon" aria-hidden="true">
                                    <use
                                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-arrow-right"
                                        href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-arrow-right"
                                    ></use></svg></span
                        ></a>
                    </li> -->
                    <li class="b-settings__menu__item" @click="$router.push('/settings/nickname')">
                        <a href="javascript:;" class="m-tb-sm m-with-rectangle-hover"
                            ><div>昵称</div>
                            <span class="b-settings__menu__item__arrow"
                                ><svg class="g-icon" aria-hidden="true">
                                    <use
                                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-arrow-right"
                                        href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-arrow-right"
                                    ></use></svg></span
                        ></a>
                    </li>
                    <li class="b-settings__menu__item" @click="$router.push('/settings/introduction')">
                        <a href="javascript:;" class="m-tb-sm m-with-rectangle-hover"
                            ><div>简介</div>
                            <span class="b-settings__menu__item__arrow"
                                ><svg class="g-icon" aria-hidden="true">
                                    <use
                                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-arrow-right"
                                        href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-arrow-right"
                                    ></use></svg></span
                        ></a>
                    </li>                         
                    <li class="b-settings__menu__item" @click="$router.push('/settings/mail')">
                        <a href="javascript:;" class="m-tb-sm m-with-rectangle-hover"
                            ><div>邮箱</div>
                            <span class="b-settings__menu__item__arrow"
                                ><svg class="g-icon" aria-hidden="true">
                                    <use
                                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-arrow-right"
                                        href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-arrow-right"
                                    ></use></svg></span
                        ></a>
                    </li>
                </ul>
                <ul class="b-settings__menu">
                    <li class="b-settings__menu__item"><span> 安全 </span></li>
                    <li class="b-settings__menu__item" @click="$router.push('/settings/password')">
                        <a href="javascript:;" class="m-tb-sm m-with-rectangle-hover"
                            ><div>密码</div>
                            <span class="b-settings__menu__item__arrow"
                                ><svg class="g-icon" aria-hidden="true">
                                    <use
                                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-arrow-right"
                                        href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-arrow-right"
                                    ></use></svg></span
                        ></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup name="Settings">
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'


</script>
<style lang="scss" scoped>
.b-settings__wrapper {
    line-height: 24px;
    color: var(--text-color);
    font-size: 16px;
    .b-settings__menu,
    .b-settings__menu ul {
        list-style: none;
        margin: 0;
    }
    @media (max-width: 767px) {
        .b-settings__menu ul {
            margin-left: -16px;
            margin-right: -16px;
        }
    }
    .b-settings__menu ul {
        border-top: 8px solid var(--marked-color);
    }
    .b-settings__menu,
    .b-settings__menu ul {
        list-style: none;
        margin: 0;
    }
    .b-settings__menu__item > span a {
        color: inherit;
    }
    .b-settings__menu__item > a,
    .b-settings__menu__item > span,
    .b-settings__menu__item > a,
    .b-settings__menu__item > span {
        min-height: 48px;
        border-bottom: 1px solid rgba(138, 150, 163, 0.25);
        padding: 10px 40px 10px 16px;
        position: relative;
    }
    .b-settings__menu__item > a {
        z-index: 1;
    }

    .b-settings__menu__item > a:not(:hover),
    .b-settings__menu__item > span:not(:hover),
    .b-settings__menu__item > a:not(:hover),
    .b-settings__menu__item > span:not(:hover) {
        color: inherit;
    }

    .b-settings__menu__item > a:not(.b-offer-join__content),
    .b-settings__menu__item > span:not(.b-offer-join__content),
    .b-settings__menu__item > a:not(.b-offer-join__content),
    .b-settings__menu__item > span:not(.b-offer-join__content) {
        display: flex;
        align-content: center;
        align-items: center;
    }
    .b-settings__menu__item > span {
        font-weight: 500;
    }

    .b-settings__menu__item__arrow {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: #8a96a3;
        width: 24px;
        height: 24px;
    }
}
</style>
