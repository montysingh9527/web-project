<!--
 * @Description: 
 * @Date: 2023-09-30 21:00:29
 * @FilePath: \web-project\vue3\vue3-quasar-ssr\src\layouts\MainLayout.vue
-->
<template>
  <q-layout class="q-layouts" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar Meta </q-toolbar-title>

        <div>Quasar v{{ $q.version }}-{{is_show_header}}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
        <q-item v-for="(item, index) in essentialLinks" :key="index">
          <q-item-section>
            <q-item-label @click="jump_url">{{ item.title }}</q-item-label>
            <q-item-label caption>{{ item.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view class="router-view" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref,computed } from "vue";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "关于",
    caption: "quasar.dev",
    icon: "school",
    link: "about",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    // EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false);

    const routes = useRouter()
    // console.log("===process.client===", process.client)
    console.log('-layout--logs-222--',routes);
    // console.log('---logs-window--',window.__INITIAL_STATE__);
    const jump_url = (url) => {
      routes.push({
        name: "about",
      });
    };
    const is_show_header = computed(()=>{
      return false;
    })

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      jump_url,
      is_show_header,
    };
  },
});
</script>
