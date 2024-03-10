<template>
    <div class="re index-content">
<!--        <van-nav-bar left-arrow :border="false" @click-left="$router.back()" @click-right="onClickRight">-->
        <van-nav-bar :border="false" @click-right="onClickRight">
            <template #title>
                <div class="flex-middle">
                    <div class="ab-middle-y white">
                        {{category.name}}
                        <span id="games-count">(0)</span>
                        <i class="category-triangle"></i>
                    </div>

                    <van-dropdown-menu>
                        <van-dropdown-item title-class="white" ref="item">
                            <!--                        <template slot="title">-->
                            <!--                            <span id="category-name">{{option.name}}</span>(<span id="games-count">0</span>)-->
                            <!--                        </template>-->
                            <div class="flex-middle bg-primary fs12" style="padding: 0.8rem 0;overflow-x: scroll;">
                                <span class="drop-item" @click="_changeCategory(p)"
                                      :class="category.value === p.value ? 'active': ''"
                                      v-for="p of categories" :key="p.value">{{p.name}}</span>
                            </div>
                        </van-dropdown-item>
                    </van-dropdown-menu>
                </div>
            </template>
            <template #right>
                <div class="flex-middle icon-menu-box">
                    <i class="icon_base icon-menu" style="width:0.6rem;height:0.5rem;"></i>
                </div>
            </template>
        </van-nav-bar>

        <div class="flex-middle-only" style="background:#121021" @click="$router.push('/notice')">
            <div style="height:1.5rem;padding: 0 0.5rem;" class="flex-middle">
                <i class="icon_base icon_notice" ></i>
            </div>

            <marquee-notices :text="scrollNotices" :textColor="'#888'"/>
        </div>

        <!--体育分类-->
        <div class="fs12 game-tabs flex-between">
            <scroll-x :tabs="sports">
                <template v-slot="{ item }">
                    <span class="fs12 game-item flex-middle"
                          @click="selectGame(item)"
                          :class="String(item.id) === String(sport.id) ? 'active' : ''">
                        {{item.text + ' ' + (category.value !== 'result' ? item.count : '')}}
                    </span>
                </template>
            </scroll-x>
        </div>

        <keep-alive>
            <router-view class="wrap-router"/>
        </keep-alive>


        <van-overlay :show="showMenu" @click="showMenu = false"
                     :custom-style="{backgroundColor: `rgba(0, 0, 0, .2)`}">
            <ul class="popup-menu ab bg-white" @click.stop>
                <li class="center under-line"
                    style="background-color: #E6E7F3;height:2rem;border-radius: 0.4rem 0.4rem 0 0;">
                    <span class="fs10 origin-center">余额(¥)</span>
                    <p>{{userInfo.balance}}</p>
                </li>
                <li class="center dark fs12 under-line lh-35" @click="_jump('/unBet')">未结注单</li>
                <li class="center dark fs12 lh-35" @click="_jump('/forms')">已结注单</li>
            </ul>
        </van-overlay>

        <FootBetController></FootBetController>
    </div>
</template>
<script>
    import MarqueeNotices from "../../../common/Marquee";
    import { mapGetters } from 'vuex'
    import ScrollX from "../../../common/ScrollX";
    import {getScrollNotices, getSportCategory} from "../../../axios/sport";
    import { sports } from "../../../common/config";
    import FootBetController from "../../../components/FootBetControll";
    export default {
        data() {
            return {
                showMenu: false,
                categories: [{name: '今日', value: 'today', count: 0},
                    {name: '早盘', value: 'upcoming', count: 0},
                    {name: '滚球', value: 'inplay', count: 0},
                    {name: '收藏', value: 'favorite', count: 0},
                    {name: '赛果', value: 'result'}],
                category: {name: '今日', value: 'today'},
                scrollNotices: '',
                scrollable: false,
                sports: sports,
                sport: {id: '1', name: '足球'}
            }
        },

        computed: {
            ...mapGetters(['userInfo']),
            filterShowBetRouter() {
                const disableRoutes = ['/home/result', '/unBet', '/forms']

                const path = this.$route.path

                return !disableRoutes.includes(path)
            }
        },

        watch: {
            $route(to) {
                let { category } = to.query

                if (category) {
                    this.category = this.categories.find(item => item.value === category)
                    this._getSportCategory()
                }
            },
        },

        methods: {
            onClickRight() {
                this.showMenu = true
            },

            // 根据体育类型和列表分类 改变URL参数
            changeLocalQuery(item = {}, toPath = this.$route.path) {
                let path = toPath
                let query = {...this.$route.query, ...item}

                this.$router.replace({path, query})
            },

            // 选择分类
            _changeCategory(category) {
                // 早盘
                if (category.value === this.category.value) return;
                this.category = category

                this.$refs.item.toggle()

                // 获取体育项目比赛数量
                this._getSportCategory()

                if (category.value === 'result') {
                    this.changeLocalQuery({category: this.category.value}, '/home/result')
                } else {
                    this.changeLocalQuery({category: this.category.value}, '/home/sport')
                }
            },

            // 选择体育运动
            selectGame(game) {
                if (this.sport.id === game.id) return;
                this.sport = game

                // if (this.category.value !== 'result') {
                //     this._getMatches()
                // } else {
                //     this._getMatchHistory()
                // }
                this.changeLocalQuery({sport_id: this.sport.id})
            },

            // 获取体育分类和比赛数量
            _getSportCategory(flag = false) {
                this.clearTimer()
                this.timer = setTimeout(() => {
                    getSportCategory(this.category.value)
                        .then(res => {
                            if (res.code === 200 && res.data) {
                                let datas = res.data
                                let total = 0
                                let menus = sports.map(item => {
                                    item.count = datas.find(c => Number(c.id) === Number(item.id)).count
                                    total += Number(item.count)
                                    return item
                                })

                                menus.unshift({text: '全部', count: total})

                                if (flag) {
                                    this.sportItem = menus[0]
                                } else {
                                    this.sportItem = menus.find(menu => menu.id === this.sportItem.id)
                                }

                                document.getElementById('games-count').innerHTML = this.category.value !== 'result' ? `(${menus[0].count})` : ''

                                this.sports = menus
                            }
                        })
                        .catch(err => {
                            console.log('err', err)
                        })
                }, 20)
            },

            _jump(item) {
                if (typeof item === 'string') {
                    this.$router.push(item)
                    this.showMenu = false
                    return;
                }

                let query = {
                    league_id: item.league_id,
                    match_id: item.match_id
                }

                this.$router.push({path: '/index/football/betGrounder', query})
            },

            clearTimer() {
                if (this.timer) {
                    clearTimeout(this.timer)
                    this.timer = null
                }
            }
        },

        components: {
            ScrollX,
            MarqueeNotices,
            FootBetController
        },

        mounted() {
            this.timer = null
            // 获取滚动消息
            getScrollNotices({client: 'mobile'})
                .then(res => {
                    if (res.code === 200) {
                        this.scrollNotices = ''

                        res.data.forEach(notice => {
                            this.scrollNotices += notice.content + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                        })

                        setTimeout(() => { this.scrollable = true }, 300)
                    }
                })
        },

        beforeRouteEnter(to, from, next) {
            next(_this => {
                let {category, sport_id} = to.query

                if (category) _this.category = _this.categories.find(item => item.value === category)
                else if (to.path === '/home/result'){
                    _this.category = _this.categories.find(item => item.value === 'result')
                }
                if (sport_id) _this.sport.id = sport_id

                _this._getSportCategory(true)
            })
        }
    }
</script>
<style type="text/css" lang="less">
    .index-content {
        background-color: #2B2745;
        .van-nav-bar {
            background-color: #2B2745;
            height: auto;

            .van-icon {
                color: #fff;
            }
        }

        .icon-menu-box {
            background: #38325D;
            width: 1.4rem;
            height: 1.4rem;
            border: 1px solid #1B182A;
            border-radius: 0.4rem;
        }

        .drop-item {
            display: inline-block;
            height: 1.4rem;
            line-height: 1.4rem;
            padding: 0 1rem;
            color: #fff;
            background: #403A64;
            border-radius: 0.7rem;
            margin-right: 0.4rem;

            &.active {
                background: #fff !important;
                color: #2E2A44;
            }

            &:last-child {
                margin-right: 0;
            }
        }

        .van-dropdown-menu__bar {
            background-color: transparent;
            width: 6rem;
        }

        .van-dropdown-menu__title {
            /*position: absolute;*/
            /*right: 1.2rem;*/
            display: none;
        }

        .category-triangle {
            position: absolute;
            top: 0.3rem;
            right: -0.6rem;
            border: 3px solid;
            border-color: transparent transparent #dcdee0 #dcdee0;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            opacity: .8;
        }

        .popup-menu {
            /*position: ;*/
            width: 4rem;
            top: 2.4rem;
            right: 0.8rem;
            border-radius: 0.4rem;

            &::before {
                content: '';
                border-radius: 2px;
                display: block;
                position: absolute;
                border: 8px solid transparent;
                border-bottom-color: #F6F5FA;
                top: -0.7rem;
                right: 8px;
            }
        }

        .van-notice-bar {
            height: 1.6rem !important;
            padding: 0;
        }

        .van-notice-bar__content {
            display: flex;
        }

        .notice-bar img {
            height: 1rem;
        }

        .game-tabs {
            background-color: #2B2745;;
            color: #A39FB8;
            padding: 0.4rem 0.8rem;
            border-bottom: 1px solid #121021;

            .game-item {
                display: inline-block;
                width: 3.2rem;
                height: 1.4rem;
                border-radius: 8px;

                &.active {
                    background-color: #121021;
                    color: #fff;
                }
            }
        }
    }
</style>
