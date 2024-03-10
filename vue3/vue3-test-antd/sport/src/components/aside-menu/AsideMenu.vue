<template>
    <ul class="menu-list p-l10 p-r10 fs12 over-hidden re" :style="{width: !isCollapse ? '192px' : '70px'}">
        <li @click="() => isCollapse = !isCollapse" class="collapse_content cursor">
            <i class="icon_base collapse_icon"></i>
            <span style="color: #A39FB8;">{{isCollapse ? '' : '收起'}}</span>
        </li>

        <li class="menu-item flex-between cursor"
            :class="sport_id === item.sport ? 'active' : ''"
            :style="{width: !isCollapse ? '172px' : '50px'}"
             v-for="item of list" :key="item.sport"
            @click.stop="_select(item)"
        >
            <div class="flex-middle-only">
                <i class="icon_base"
                   :style="{backgroundImage: `url(${sport_id === item.sport ? item.active_icon : item.icon})`, marginRight: '12px'}"></i>
                <span v-show="!isCollapse" class="fs12" :style="{color: sport_id === item.sport ? '#fff' : '#A39FB8'}">{{item.text}}</span>
            </div>

            <span v-show="!isCollapse && showCount" class="corner_mark fs12 white">{{item.count}}</span>
        </li>

        <li class="menu-btn-content">
            <div class="flex-around over-hidden" v-if="!isCollapse">
                <button class="menu-btn center white fs12 m-r8 cursor" @click="jumpPage(betItem)">未结注单</button>
                <button class="menu-btn center white fs12 cursor" @click="jumpPage(forms)">已结注单</button>
            </div>

            <van-popover v-if="isCollapse" v-model="showPopover" trigger="click"
                         placement="right-end">
                <template #reference>
                    <div slot="reference" class="flex-middle menu-one-btn"
                         style="width:32px;height:32px;left:11px;">
                        <i class="icon_base icon-bottom-menu"></i>
                    </div>
                </template>
                <ul class="fs12 bg-white">
                    <li class="center under-line" style="height: 36px;line-height: 36px;width:80px" @click="jumpPage(betItem)">
                        未结注单
                    </li>
                    <li class="center" style="height: 36px;line-height: 36px;width:80px" @click="jumpPage(forms)">已结注单</li>
                </ul>
            </van-popover>
        </li>
    </ul>
</template>
<script>
    import list from './menus'

    export default {

        data() {
            return {
                isCollapse: false,
                sport_id: Number(this.$route.query.sport) || 0,
                height: window.innerHeight - 46 - 28 + 'px',
                showPopover: false
            }
        },

        computed: {
            list() {

                let arr = this.sports.map(sport => {
                    let obj = list[`${sport.id}`]

                    return {...obj, ...sport}
                })

                return arr
            }
        },

        props: {
            sports: {
                type: Array,
                default: () => ([])
            },

            showCount: {
                type: Boolean,
                default: true
            }
        },

        created() {
            this.betItem = {title: '未结注单', path: '/index/unBet'}
            this.forms = {title: '已结注单', path: '/index/forms'}
        },

        methods: {
            _select(item, i) {
                this.sport_id = item.sport

                this.$emit('select', item)
            },

            jumpPage(item) {
                this.showPopover = false
                console.log('item=====>', item)
                this.$router.push(item.path)
            }
        }
    }
</script>
<style type="text/css" lang="less" scoped>

    .menu-list {
        background: #19162D;
        max-width: 192px;
        height: 100%;
        flex: 0 0 auto;
        transition: width .6s ease-in-out;

        .menu-item {
            padding: 0 10px 0 15px;
            margin-bottom: 10px;
            height: 50px;
            transition: width .2s ease-in-out;

            &.active {
                background: #2B2745;
                border-radius: 8px;
            }
        }

        .menu-btn-content {
            position: fixed;
            bottom: 13px;
            width: 170px;
            height: 35px;
            min-width: 130px;
        }

        .menu-btn {
            width: 80px;
            height: 36px;
            background: #2B2745;
            border: 1px solid #000000;
            border-radius: 8px;
        }
        .menu-one-btn {
            height: 36px;
            width: 36px;
            margin-left: 7px;
            background: #2B2745;
            border: 1px solid #000000;
            border-radius: 8px;
        }

        .icon-bottom-menu {
            width: 14px;
            height: 12px;
            background-image: url("../../assets/images/tmp1/menu.png");
        }
    }

    .collapse_content {
        height: 63px;
        width: 150px;
        margin-top: 26px;

        .collapse_icon {
            margin: 0 13px 0 19px;
            transform: scale(0.8);
            background-image: url("./icon/collapse.png");
        }
    }

    .corner_mark {
        background: #403A64;
        border-radius: 14px;
        width: 34px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        display: inline-block;
    }
</style>
