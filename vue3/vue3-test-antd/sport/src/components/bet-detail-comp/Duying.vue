<template>
    <div class="bet-group-item">
        <div class="bet-group-item-header flex-middle-only fs12">
            <div class="flex-1 center">{{match.home_name}}</div>
            <div class="flex-1 center">平局</div>
            <div class="flex-1 center">{{match.away_name}}</div>
        </div>
        <van-row :gutter="4">
            <van-col :span="8">
                <Play :play="play_1" :match="match" :group="group" v-if="play_1.is_show === '1' && play_1.is_suspend === '0'"/>
                <div v-else class="flex-middle bet_disabled">
                    <i class="icon_base icon_lock"></i>
                </div>
            </van-col>
            <van-col :span="8">
                <Play :play="play_x" :match="match" :group="group" v-if="play_1.is_show === '1' && play_1.is_suspend === '0'"/>
                <div v-else class="flex-middle bet_disabled">
                    <i class="icon_base icon_lock"></i>
                </div>
            </van-col>
            <van-col :span="8">
                <Play :play="play_2" :match="match" :group="group" v-if="play_1.is_show === '1' && play_1.is_suspend === '0'"/>
                <div v-else class="flex-middle bet_disabled">
                    <i class="icon_base icon_lock"></i>
                </div>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    import Play from "../Play";
    export default {
        props: {
            match: {
                type: Object,
                default: () => ({})
            },

            group: {
                type: Object,
                default: () => ({})
            },

            markets: {
                type: Array,
                default: () => []
            }
        },

        computed: {
            play_1() {
                return this.markets.find(market => market.name === '1') || {}
            },
            play_x() {
                return this.markets.find(market => market.name === 'x') || {}
            },
            play_2() {
                return this.markets.find(market => market.name === '2') || {}
            },
        },

        components: {
            Play
        }
    }
</script>
