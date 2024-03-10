<template>
    <div class="toast fs14"
         v-if="show"
         v-html="text"
         :class="showContent ?'fadein':'fadeout'">
    </div>
</template>

<style type="text/css" lang="less" scoped>
    .toast {
        position: fixed;
        max-width: 95vw;
        min-height: 0.15rem;
        padding: 0.45rem 0.3rem;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 0.25rem;
        left: 50%;
        top:70%;
        color: #fff;
        transform: translate3d(-50%, -50%, 0);
        box-shadow: 0 0 0.25rem #000;
        z-index: 99999999999;
    }

    .fadein {
        animation: animate_in 0.25s;
    }

    .fadeout {
        animation: animate_out 0.25s;
        opacity: 0;
    }
    @keyframes animate_in {
        0% {
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    @keyframes animate_out {
        0% {
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
</style>
