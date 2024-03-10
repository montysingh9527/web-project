<template>
    <span class="lottery-count-time">
        <i :style="{color: color}" v-for="(n,i) in times" :key="i" class="iconfont fs10" :class="/\d+/.test(n) === false ? '' : nums[n]">
            {{/\d+/.test(n) === false ? n : ''}}
        </i>
    </span>
</template>

<script>

    export default {
        name: "lottery-count-time",
        created() {
            this.nums = [
                'iconshuzi0', 'iconshuzi1', 'iconshuzi2', 'iconshuzi3', 'iconshuzi4',
                'iconshuzi5', 'iconshuzi6', 'iconshuzi7', 'iconshuzi8', 'iconshuzi9']
        },

        props: {
            time: '00:00:00',
            color: '#333'
        },

        computed: {
            times() {
                return this.time.split('');
            }
        },

        methods: {}
    };
</script>

<style type="text/css" lang="less" scoped>
    .lottery-count-time {
        padding-left: .25rem;
        i {
            float: left;
        }
    }
</style>