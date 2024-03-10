<template>
    <div class="scroll-content" ref="scroll-content">
        <div class="scroll-tabs-wrap" ref="scroll-tabs-wrap" style="touch-action: none;">
            <ul class="tab-content" ref="tab-content"
                :style="{
                width: ulWidth + 'px',
                height: typeof tabHeight === 'string' ? tabHeight : tabHeight + 'px'
            }">
                <li class="scroll-tab re"
                    :ref="`tab-index-${index}`"
                    :style="{
                        color: tabIndex === index ? activeColor : '',
                        padding: `${typeof tabPadding === 'string' ? tabPadding : tabPadding + 'px'}`
                    }"
                    v-for="(tab, index) in tabs"
                    :key="index"
                    @click.stop="selectItem(tab, index)"
                >
                    <slot :item="{...tab, index}">
                        {{tab.name}}
                    </slot>
                </li>

                <li>
                    <slot name="end">

                    </slot>
                </li>
            </ul>
        </div>

        <div class="under-scroll-line" v-if="underline">
            <!--滑块有时间再弄-->
            <!--<div class="fl slide-icon" :style="{backgroundColor: color}"></div>-->
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'

    export default {
        data() {
            return {
                tabIndex: 0,
                scroll: null,
                ulWidth: 0
            };
        },

        props: {
            tabs: {
                type: Array,
                default: () => ([])
            },

            // 每个tab的宽
            tabWidth: {
                type: [Number, String],
                default: 'auto'
            },

            tabHeight: {
                type: [Number, String],
                default: 'auto'
            },

            // 选中色
            activeColor: {
                type: String,
                default: ''
            },

            activeIndex: {
                type: Number,
                default: 0
            },

            // 是否显示底部指示条
            underline: {
                type: Boolean,
                default: false
            },

            // 单位是px
            lineWidth: {
                type: [Number, String],
                default: 'auto'
            },

            lineColor: {
                type: String,
                default: '#d5d71a'
            },

            lineHeight: {
                type: Number,
                default: 2
            },

            // 滚动持续时间单位是毫秒
            duration: {
                type: Number,
                default: 300
            },

            tabPadding: {
                type: [Number, String],
                default: 0
            },

            // 是否自动滚动
            autoScroll: {
                type: Boolean,
                default: true
            },

            listenScroll: {
                type: Boolean,
                default: false
            },
            startX: {
                type: Number,
                default: 0
            },
        },

        mounted() {
            this.$nextTick(() => {
                this._initialData()
                this._initScroll();
            });
        },

        watch: {
            tabs() {
                // console.log('tab变化了 100ms后重新计算数据')
                setTimeout(() => {
                    this._initialData()
                    // this._initScroll();
                }, 100)
            }
        },

        activated() {
            this.tabIndex = 0
        },

        created() {
            this.timer = null
            this.pos = {x: 0}
            this.scrollContentRect = null
        },

        methods: {
            // 获取基本数据
            _initialData() {
                this.ulWidth = 0
                // 获取ul宽
                this.$refs['tab-content'].childNodes.forEach(el => {
                    let rect = el.getBoundingClientRect()

                    this.ulWidth += rect.width
                })


                this.scrollContentRect = this.$refs['scroll-content'].getBoundingClientRect()
            },

            getContentRect(type) {
                if (type === 'content') {
                    return this.$refs['scroll-content'].getBoundingClientRect() || {}
                } else if (type === 'ul') {
                    return {width: this.ulWidth}
                }

            },

            refresh() {
                if (this.scroll) {
                    try {
                        this.scroll.destroy()
                    } catch (e) {
                        delete this.scroll
                        this.scroll = null
                    }
                }
                this.$nextTick(() => {
                    this._initScroll();
                })
            },

            selectItem(item, index) {
                if (this.timer) {
                    clearTimeout(this.timer)
                    this.timer = null
                }
                this.timer = setTimeout(() => {

                    this.$emit('change', {...item, index})

                    if (this.tabIndex !== index) {
                        if (this.autoScroll) {
                            this.scrollToTab(index)
                        }
                    }

                    this.tabIndex = index
                }, 100)
            },

            scrollToTab(index) {
                const {x, width} = this.scrollContentRect
                if (index === this.tabIndex || this.ulWidth <= width) return;

                let targetRect = this.$refs[`tab-index-${index}`][0].getBoundingClientRect()

                // 点击右边 向左滚动
                if (targetRect.x - x > (width / 2 )) {
                    // console.log('向左滚动')
                    // 如果当前tab不足以滚动到中间,则滚动到底部
                    if (this.ulWidth - width - Math.abs(this.pos.x || 0) >= (targetRect.x - (width/2) + (targetRect.width/2))) {
                        let l = targetRect.x - x - (width / 2) + (targetRect.width / 2)
                        // console.log('滚中间', l, this.pos.x - l)
                        this.scroll.scrollTo(this.pos.x - l, 0, this.duration)
                    } else {
                        // console.log('滚底部')
                        this.scroll.scrollTo(width - this.ulWidth, 0, this.duration)
                    }
                } else {
                    // console.log('向右滚动')
                    if ((width / 2) + x - (targetRect.width / 2 + targetRect.x) <= Math.abs(this.pos.x)) {
                        // console.log('滚中间')
                        let l = targetRect.x - x - (width / 2) + (targetRect.width / 2)
                        this.scroll.scrollTo(this.pos.x - l, 0, this.duration)
                    } else {
                        // console.log('滚底部')
                        this.scroll.scrollTo(0, 0, this.duration)
                    }
                }
            },

            _initScroll() {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs['scroll-tabs-wrap'], {
                        startX: this.startX,
                        click: true,
                        scrollX: true,
                        probeType: 3,
                        // 忽略竖直方向的滚动
                        scrollY: false,
                        eventPassthrough: "vertical"
                    });

                    this.scroll.on('scroll', (pos) => {
                        this.pos = pos
                        if (this.listenScroll) {
                            this.$emit('scroll', pos)
                        }
                    })
                } else {
                    this.scroll.refresh();
                }
            }
        }
    }
</script>
<style type="text/css" lang="less" scoped>
    .scroll-content {
        width: 100%;
        overflow: hidden;

        .tab-content {
            position: relative;
            display: flex;
            align-items: center;
            /*justify-content: center;*/

            .scroll-tab {
                flex-shrink:0;
                height: 100%;
                display: flex;
                align-items: center;

                &.active {
                    &:after {
                        content: '';
                        position: absolute;
                        bottom: 0;left: 50%;
                        transform: translateX(-50%);
                        width: 1.5rem;
                        height: 2px;
                        background-color: #e91e63;
                    }
                }
            }
        }

        .under-scroll-line {
            height:2px;
            background-color: white;
            .slide-icon {
                height: 2px;
                width: 2rem;
            }
        }
    }
</style>
