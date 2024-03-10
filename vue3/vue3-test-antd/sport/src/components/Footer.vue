<template>
    <footer class="flex-middle">
        <div>
            <img class="block" style="margin: 0 auto 18px;max-height: 40px;"
                 :src="projectConfig.pc_logo" alt="">
        </div>
    </footer>
</template>
<script>
    import {mapGetters } from "vuex"
    export default {
        computed: {
            ...mapGetters(['projectConfig'])
        }
    }
</script>
<style type="text/css" lang="less" scoped>
    footer {
        background: #444444;
        box-shadow: inset 0 1px 0 0 #137A5A;
        height: 115px;
    }
</style>
