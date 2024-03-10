<template>
    <header  class="header flex-middle-only re full-width full-height" :class="{fixed: $attrs.fixed === ''}">
        <slot name="left">
            <div class="ab-middle-y" style="left: 0.8rem;" @click="$router.back()">
                <img style="width: 1rem" src="../../assets/images/tmp3/back.png" alt="">
            </div>
        </slot>

        <span class="ab-middle white fs14 " :class="{'center-down': $attrs.centerdown === ''}">
            <slot></slot>
        </span>

        <div class="ab-middle-y" style="right: 0.8rem;">
            <slot name="right"></slot>
        </div>
    </header>
</template>

<style scoped>
.fixed {
    position: fixed !important;
    left: 0;
    top: 0;
    z-index: 100;
}
.header {
    height: 2.4rem;
    background-image: linear-gradient(180deg, #F2AB06 0%, #B78008 100%);
}
</style>