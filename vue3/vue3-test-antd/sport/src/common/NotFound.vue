<template>
    <div class="re">
        <img class="block" style="margin: 10rem auto 1rem;width: 8rem;"
             :src="require('../assets/images/default/empty-image-default.png')" alt="">
        <p class="center">抱歉,页面未找到!</p>

        <div class="flex-middle">
            <button class="btn m-t8 warning" @click="_back">返回首页</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            _back() {
                this.$router.push('/')
            }
        }
    };
</script>

<style type="text/css" lang="less" scoped>

</style>
