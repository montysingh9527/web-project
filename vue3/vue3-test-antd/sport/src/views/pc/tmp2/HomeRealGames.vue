<template>
    <div class="real-game">
        <h3 style="height: 60px;font-size: 28px;color:#e4e4e4;" class="flex-middle">{{game.name}}</h3>

        <van-row gutter="20">
            <van-col :span="6" v-for="item of game.list" :key="item.id" @click="jumpGame(item)">
                <div>
                    <div class="real-game-item re">
                        <img class="block ab real-game-logo" :src="item.icon" alt="">
                    </div>
                    <p class="fs12 flex-middle" style="color:#CCC;height:2.2rem;">{{item.name || item.title}}</p>
                </div>
            </van-col>
        </van-row>
    </div>
</template>
<script>
    import { mapGetters } from "vuex"
    import Event from "../../../event";
    export default {
        data() {
            return {
                gameId: ''
            }
        },

        computed: {
            ...mapGetters(['homeGames', 'userInfo']),
            game() {
                return this.homeGames.find(game => game.id === this.gameId) || {}
            }
        },
        watch: {
            '$route'(route) {
                this.gameId = route.query.id
            }
        },

        methods: {
            toggleTopNav(flag) {
                this.showTopNav = flag
            },

            jumpGame(game) {
                if (!this.userInfo.userId) {
                    Event.$emit('show-login')
                    return;
                }

                let host = window.location.origin

                let url = host + `/mobile/real/goToGame/${game.gameId}/0/`

                if (game.subGames && game.subGames.length) {
                    this.$router.push(`/index/real-games-detail?category=${game.category}&id=${game.gameId}`)
                } else {
                    const windows = window.open(url, '_black')
                }
            }
        },

        beforeRouteEnter(to, from, next) {
            next(_this => {
                _this.gameId = to.query.id
            })
        }
    }
</script>
<style type="text/css" lang="less">
    .real-game {
        background:#333;
        padding: 0 20px 20px 20px;

        .real-game-item {
            height: 6.8rem;
            width: 100%;
            background-image: linear-gradient(180deg, #1C1C1C 0%, #294745 100%);
        }

        .real-game-logo {
            max-height:6.8rem;
            max-width: 100%;
            right:0;
            bottom:0;
        }
    }
</style>
