<!--
 * @Author: sky sky@jinxinggame.com
 * @Date: 2022-09-13 20:58:51
 * @LastEditors: sky sky@jinxinggame.com
 * @LastEditTime: 2022-11-25 23:32:38
 * @FilePath: /java-2021-wap-project/src/components/public/Header/index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by sky sky@jinxinggame.com, All Rights Reserved. 
-->

<template>
    <NavBar
        class="navbar"
        v-bind="$attrs"
        :border="false"
        :class="className"
    >
        <template #left>
            <slot v-if="$slots.left" name="left" />
            <svg v-else  @click="onLeft" class="g-icon" aria-hidden="true"><use xlink:href="/src/assets/icon/icon-home.svg?rev=202302031115-90b0c65565#icon-back" href="/src/assets/icon/icon-home.svg?rev=202302031115-90b0c65565#icon-back"></use></svg>
        
        </template>
        
        <template #title>
            <slot v-if="$slots.title" name="title" />
            
            <div
                v-else
                class="title"
            >
                {{ $attrs.title }}
            </div>
        </template>
        
        <template v-if="$slots.right" #right>
            <slot name="right" />
        </template>
    </NavBar>
</template>

<script>
    import { useRouter } from 'vue-router'
    import { NavBar } from 'vant'

    export default {
        name: 'Header',
        props: {
            leftCallback: Function,
            className: String
        },
        components: { NavBar },
        setup(props) {
            const { back } = useRouter()
            
            const onLeft = () => {
                props.leftCallback ? props.leftCallback() : back()
            }
            
            return {
                onLeft
            }
        }
    }
</script>
<style scoped lang="scss">
.navbar{
    // position: fixed;
    // width: 100%;
    // top: 0;
    // z-index: 3;
    // height:calc(var(--safe-top) + 45px);
    // padding-top: var(--safe-top);
    color: var(--text-color);
    :deep(.van-nav-bar__content){
        height: 56px;
        border-bottom: 1px solid rgba(138,150,163,.25);;
        .van-nav-bar__left, .van-nav-bar__right{
            position: unset;
        }
        .van-nav-bar__title{
            margin: unset;
            color: var(--text-color);
            font-size: 19px;

        }
        .van-nav-bar__right{
            flex: 1 1 0%;
            display: flex;
            justify-content: flex-end;
        }

    }
    
}

</style>