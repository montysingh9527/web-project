<!--
 * @Description: 左侧菜单
 * @Date: 2024-03-19 01:11:02
 * @FilePath: \web-project\node-egg-demo\admin-project\src\layout\left_menu.vue
-->
<template>
    <div class="menu-left">
        <q-list v-for="(item, index) in menu_data" :key="index">
            <template v-if="item.children">
                <q-expansion-item :default-opened="opened_expansion(item)" group="somegroup" :icon="item.icon"
                    :label="item.title" :content-inset-level="1" expand-separator>
                    <q-item @click="change_path(child)" v-for="(child, idx) in item.children" :key="idx" clickable
                        v-ripple :active="child.key == route_name" class="menu-left-item"
                        active-class="q-item-no-link-highlighting">
                        <q-item-section>
                            <q-item-label>{{ child.title }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-expansion-item>
            </template>
            <template v-else>
                <q-item @click="change_path(item)" clickable v-ripple :active="item.key == route_name"
                    class="menu-left-item" active-class="q-item-no-link-highlighting">
                    <q-item-section avatar>
                        <q-icon :name="item.icon" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{ item.title }}</q-item-label>
                    </q-item-section>
                </q-item>
            </template>

        </q-list>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import { computed } from "vue"
import { menu_data, opened_father_key } from "src/layout/menu_config.js";

const Router = useRoute();
const Routers = useRouter();

// 当前路由
const route_name = computed(() => Router.name)
/**
 * 切换菜单
 */
const change_path = (itemRow) => {
    Routers.push({
        name: itemRow.path
    })
}

/**
 * 当前菜单是否展开
 */
const opened_expansion = (itemRow) => {
    const is_opened = opened_father_key[itemRow.key].includes(route_name.value)
    return is_opened;
}

</script>

<style scoped lang="scss"></style>
