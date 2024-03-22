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
        <q-toolbar-title>
          <!-- <q-btn round dense flat color="white" :icon="$q.fullscreen?.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen?.toggle()" v-if="$q.screen.gt.sm">
          </q-btn> -->
          <div>{{ timeWelcome() }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" class="bg-grey-3" :breakpoint="500" :width="200" elevated bordered show-if-above>
      <q-scroll-area class="fit">
        <leftMenu></leftMenu>
      </q-scroll-area>
    </q-drawer>
    <q-page-container class="page-container">
      <router-view class="layout-router-view"></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import leftMenu from "src/layout/left_menu.vue";
import { timeWelcome } from "src/utils/welcome.js"
import { ref } from 'vue';
const leftDrawerOpen = ref(false)

</script>

<style scoped lang="scss"></style>