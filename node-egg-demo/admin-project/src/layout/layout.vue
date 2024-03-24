<!--
 * @Description: 主布局
 * @Date: 2024-01-06 23:12:54
 * @FilePath: \web-project\node-egg-demo\admin-project\src\layout\layout.vue
-->
<template>
  <!-- hHh lpR fFf   lHh Lpr lFf-->
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title>
          <div>管理后台 </div>
        </q-toolbar-title>
        <q-space />
        <div class="toolbar-right">
          <q-toolbar-title>
            <!-- <q-btn round dense flat color="white" :icon="$q.fullscreen?.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen?.toggle()" v-if="$q.screen.gt.sm">
          </q-btn> -->
            <div class="row no-wrap">
              <div>{{ timeWelcome() }}。</div>
              <div>{{ useUser.userInfo?.username }}</div>
              <q-avatar>
                <img :src="user_logo" alt="">
                <q-menu class="q-pa-xs">
                  <div class="q-gutter-xs" style="width: 90px;">
                    <q-btn icon="person_pin" color="primary" label="查看" push size="sm" v-close-popup
                      @click="showProfile" />
                    <q-btn icon="logout" color="primary" label="退出" push size="sm" v-close-popup @click="logout" />
                  </div>
                </q-menu>
              </q-avatar>
            </div>
          </q-toolbar-title>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" class="bg-grey-3" :breakpoint="500" :width="200" elevated bordered show-if-above>
      <q-scroll-area class="fit">
        <leftMenu :menu_data="menu_data" />
      </q-scroll-area>
    </q-drawer>
    <q-page-container class="page-container">
      <router-view class="layout-router-view"></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import leftMenu from "src/layout/left_menu.vue";
import { timeWelcome } from "src/utils/welcome.js";
import { computed, ref } from 'vue';
import { menu_data } from "src/layout/menu_config.js";
import useUserInfo from "src/store/user.js";
import { useRouter } from "vue-router";

const useUser = useUserInfo();
const Router = useRouter();

const leftDrawerOpen = ref(false)

// 用户logo
const user_logo = computed(() => BASE_URL + useUser?.userInfo?.avatar)

// 退出登录
const logout = () => {
  useUser.del_userInfo();
  Router.push({ name: "login" });
}

</script>

<style scoped lang="scss"></style>