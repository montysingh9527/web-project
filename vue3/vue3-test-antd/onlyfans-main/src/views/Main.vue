<template>
    <div class="container m-main-container">
        <router-view v-slot="{ Component }">
            <keep-alive :include="['Home']">
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>

    <van-tabbar route :border="false">
        <van-tabbar-item to="/home">
            <template #icon>
                <svg extra-class="m-nav-icon" class="g-icon m-nav-icon" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302031115-90b0c65565#icon-home"
                        href="/src/assets/icon/icon-home.svg?rev=202302031115-90b0c65565#icon-home"
                    ></use>
                </svg>
            </template>
        </van-tabbar-item>
        <van-tabbar-item to="/notification">
            <template #icon>
                <svg extra-class="m-nav-icon" class="g-icon m-nav-icon" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302031115-90b0c65565#icon-notifications"
                        href="/src/assets/icon/icon-home.svg?rev=202302031115-90b0c65565#icon-notifications"
                    ></use>
                </svg>
            </template>
        </van-tabbar-item>
        <van-tabbar-item to="/compose">
            <template #icon>
                <svg extra-class="m-nav-icon" class="g-icon m-nav-icon" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302031115-90b0c65565#icon-compose"
                        href="/src/assets/icon/icon-home.svg?rev=202302031115-90b0c65565#icon-compose"
                    ></use>
                </svg>
            </template>
        </van-tabbar-item>
        <!-- <van-tabbar-item to="/messages">
            <template #icon>
                <svg extra-class="m-nav-icon" class="g-icon m-nav-icon" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302031115-90b0c65565#icon-messages"
                        href="/src/assets/icon/icon-home.svg?rev=202302031115-90b0c65565#icon-messages"
                    ></use>
                </svg>
            </template>
        </van-tabbar-item> -->
        <van-tabbar-item @click="userinfoPopup = true">
            <template #icon>
                <svg extra-class="m-nav-icon" class="g-icon m-nav-icon" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302031115-90b0c65565#icon-home"
                        href="/src/assets/icon/icon-home.svg?rev=202302031115-90b0c65565#icon-home"
                    ></use>
                </svg>
            </template>
        </van-tabbar-item>
    </van-tabbar>
    <!-- <div style="height:57px"></div> -->

    <van-popup v-model:show="userinfoPopup" position="right" :style="{ width: '70%', height: '100%' }" closeable>
        <div class="g-avatar__img-wrapper">
            <img src="../assets/img/avatar.jpg" />
        </div>
        <div class="username-box">
            <div class="b-username">
                {{ userInfo.nickName }}
            </div>
            <div class="g-user-username">@{{ userInfo.account }}</div>
        </div>

        <div class="l-sidebar__menu">
            <a
                href="javascript:;"
                class="l-sidebar__menu__item"
                at-attr="profile"
                data-name="Profile"
                @click="toRoute('/personal')"
            >
                <svg extra-class="l-sidebar__menu__icon" class="g-icon l-sidebar__menu__icon" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-profile-round"
                        href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-profile-round"
                    ></use>
                </svg>
                我的个人资料
            </a>
            <a
                href="javascript:;"
                class="l-sidebar__menu__item"
                at-attr="bookmarks"
                data-name="BookmarkPosts"
                @click="toRoute('/fav')"
            >
                <svg extra-class="l-sidebar__menu__icon" class="g-icon l-sidebar__menu__icon" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-bookmark"
                        href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-bookmark"
                    ></use></svg
                >书签
            </a>
            <a
                href="javascript:;"
                class="l-sidebar__menu__item"
                at-attr="lists"
                data-name="UsersLists"
                @click="toRoute('/contacts')"
            >
                <svg extra-class="l-sidebar__menu__icon" class="g-icon l-sidebar__menu__icon" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-lists"
                        href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-lists"
                    ></use></svg
                >列表
            </a>
            <a
                href="javascript:;"
                class="l-sidebar__menu__item"
                at-attr="settings"
                data-name="Settings"
                @click="toRoute('/settings')"
            >
                <svg extra-class="l-sidebar__menu__icon" class="g-icon l-sidebar__menu__icon" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-settings"
                        href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-settings"
                    ></use>
                </svg>
                设置
            </a>
            <!-- <hr class="l-sidebar__menu__divider" /> -->
            <!-- <a href="/my/payments/" class="l-sidebar__menu__item" at-attr="cards" data-name="Payments">
                <svg extra-class="l-sidebar__menu__icon" class="g-icon l-sidebar__menu__icon" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-card"
                        href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-card"
                    ></use></svg
                ><span>您的信用卡<span class="g-gray-text">（待订阅）</span></span>
            </a> -->
            <!-- <a href="/my/banking/" class="l-sidebar__menu__item" at-attr="bank" data-name="Banking">
                <svg extra-class="l-sidebar__menu__icon" class="g-icon l-sidebar__menu__icon" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-add-bank"
                        href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-add-bank"
                    ></use></svg
                ><span><span>成为创作者</span><span class="g-gray-text"> (来赚钱) </span></span>
            </a> -->
            <hr class="l-sidebar__menu__divider" />
            <a href="javascript:;" class="l-sidebar__menu__item" data-name="FAQ" at-attr="FAQ" @click="jumpUrl(kfUrl)"
                ><svg extra-class="l-sidebar__menu__icon" class="g-icon l-sidebar__menu__icon" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-support"
                        href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-support"
                    ></use>
                </svg>
                帮助中心
            </a>
            <!-- <button type="button" data-name="SwitchTheme" at-attr="theme_btn" class="l-sidebar__menu__item">
                <svg extra-class="l-sidebar__menu__icon" class="g-icon l-sidebar__menu__icon" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-theme-dark"
                        href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-theme-dark"
                    ></use></svg
                ><span class="l-sidebar__switch-mode__label">夜间模式</span>
            </button> -->
            <!-- <div at-attr="lang_dropdown" class="l-sidebar__menu__item m-lang-item">
                <div
                    class="b-dropdown dropdown m-row"
                    boundary="scrollParent"
                    offset="0"
                    menu-class="[object Object]"
                    right="true"
                    role="menu"
                    split-button-type="button"
                    toggle-tag="button"
                    toggle-text="Toggle dropdown"
                    variant="secondary"
                >
                    <button aria-haspopup="menu" aria-expanded="false" type="button" class="btn dropdown-toggle">
                        <span class="m-globe"
                            ><svg
                                extra-class="l-sidebar__menu__icon"
                                class="g-icon l-sidebar__menu__icon"
                                aria-hidden="true"
                            >
                                <use
                                    xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-language"
                                    href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-language"
                                ></use></svg></span
                        ><span class="b-lang-text"> Chinese Simplified </span
                        ><span class="b-icon-arrow"
                            ><svg class="g-icon" aria-hidden="true">
                                <use
                                    xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-arrow-down"
                                    href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-arrow-down"
                                ></use></svg
                        ></span>
                    </button>
                </div>
            </div> -->
            <hr class="l-sidebar__menu__divider" />
            <button type="button" at-attr="logout" class="l-sidebar__menu__item">
                <svg extra-class="l-sidebar__menu__icon" class="g-icon l-sidebar__menu__icon" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-logout"
                        href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-logout"
                    ></use>
                </svg>
                更换账号
            </button>
        </div>
    </van-popup>
</template>

<script>
export default {
    name: 'Main'
}
</script>


<script setup>
import { getCurrentInstance, onMounted, ref, reactive, defineComponent, computed, provide, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { apiReg } from '@/api/common'
import { jumpUrl } from '@/utils/common.js'
import icon_home from '../assets/icon/icon-home.svg'

const store = useStore()
const router = useRouter()
const keepAlive = computed(() => store.state.common.keepAlive)
const userInfo = computed(() => store.state.user.userInfo)
const kfUrl = computed(() => store.state.common.config.kfUrl)

const active = ref(0)
const userinfoPopup = ref(false)

const tabs = [
    {
        name: '首页',
        to: '/home'
    },
    {
        name: '分类',
        to: '/vault'
    },
    {
        name: 'up主',
        to: '/actor'
    },
    {
        name: '我的',
        to: '/my'
    }
]

const toRoute = (path) => {
    if (['/personal', '/settings'].indexOf(path) !== -1) {
        userinfoPopup.value = false
    } else {
        setTimeout(() => {
            userinfoPopup.value = false
        }, 1000)
    }

    if (path == '/personal') {
        path = path + '?id=' + store.state.user.userInfo.id
    }
    router.push(path)
}

onMounted(() => {})
</script>


<style lang="scss" scoped>
.van-tabbar {
    height: 57px;
    z-index: 1001;
    border-top: 1px solid rgba(138, 150, 163, 0.25);
    .van-tabbar-item {
        color: #8a96a3;
        .m-nav-icon {
            width: 33px;
            height: 33px;
            fill: currentColor;
        }
    }
    .van-tabbar-item--active {
        color: #242529;
    }
    :deep(.van-tabbar-item__icon) {
        margin-bottom: 0px;
    }
}

.container {
    width: 100%;
    padding-right: 16px;
    padding-left: 16px;
    margin-right: auto;
    margin-left: auto;
    max-width: 720px;
}

.container {
    padding-top: 0;
    padding-bottom: 0;
}

.container.m-main-container {
    display: flex;
    flex-direction: column;
    flex: 1;
}

@media (max-width: 1003px) {
    .container.m-main-container {
        padding-left: 0;
        padding-right: 0;
    }
}

.g-avatar__img-wrapper {
    width: 48px;
    height: 48px;
    border-radius: inherit;
    border-radius: 50%;
    margin-top: 16px;
    margin-left: 16px;
}

.g-avatar__img-wrapper img {
    border-radius: inherit;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    display: block;
    position: relative;
}

.b-username {
    min-width: 0;
    display: block;
    color: var(--text-color);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 500;
}
.g-user-username {
    font-size: 14px;
    color: #8a96a3;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.username-box {
    padding: 12px;
    border-bottom: 1px solid rgba(138, 150, 163, 0.25);
}
.l-sidebar__menu {
    padding: 12px;
}

.l-sidebar__menu__item {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    color: var(--text-color);
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    padding: 6px;
    border: none;
    background: none;
    width: 100%;
    transition: color 0.1s ease, background-color 0.1s ease;
    position: relative;
    border-radius: 18px;
    margin-bottom: 8px;
    cursor: pointer;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    -webkit-hyphens: auto;
    hyphens: auto;
    text-align: left;
}

.l-sidebar__menu__item .l-sidebar__menu__icon {
    margin: 0 10px 0 0;
    transition: color 0.1s ease;
}

.l-sidebar__menu__divider {
    margin: 8px -10px;
    border-top: 0.5px solid rgba(138, 150, 163, 0.25);
}
</style>
