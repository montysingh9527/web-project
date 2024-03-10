<template>
    <div ref="wrapper" class="list-wrapper">
        <div class="scroll-content" :style="{background: bgColor, borderTopLeftRadius: radius + 'px', borderTopRightRadius: radius + 'px'}">
            <div ref="listWrapper" :style="{overflow: hidden && 'hidden'}">
                <slot>
                    <ul class="list-content">
                        <li @click="clickItem($event,item)" class="list-item" v-for="(item,key) in data" :key="key">
                            {{item}}
                        </li>
                    </ul>
                </slot>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import {getRect} from '../assets/js/dom'

    const COMPONENT_NAME = 'scroll'
    const DIRECTION_H = 'horizontal'
    const DIRECTION_V = 'vertical'

    export default {
        name: COMPONENT_NAME,
        props: {
            data: {
                type: Array,
                default: () => ([])
            },

            scrollHeight: {
                type: [Number, String],
                default: 100
            },

            radius: {
                type: Number,
                default: 0
            },

            // scroll-content背景图
            bgColor: {
                type: String,
                default: '#fff'
            },

            // list超出隐藏
            hidden: {
                type: Boolean,
                default: true
            },

            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            listenBeforeScroll: {
                type: Boolean,
                default: false
            },
            listenScrollEnd: {
                type: Boolean,
                default: false
            },
            direction: {
                type: String,
                default: DIRECTION_V
            },
            scrollbar: {
                type: null,
                default: false
            },
            pullDownRefresh: {
                type: null,
                default: false
            },
            pullUpLoad: {
                type: null,
                default: false
            },
            startY: {
                type: Number,
                default: 0
            },
            refreshDelay: {
                type: Number,
                default: 20
            },
            freeScroll: {
                type: Boolean,
                default: false
            },
            mouseWheel: {
                type: Boolean,
                default: false
            },
            bounce: {
                default: true
            },
            zoom: {
                default: false
            },
            stopPropagation: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                beforePullDown: true,
                isRebounding: false,
                isPullingDown: false,
                isPullUpLoad: false,
                pullUpDirty: true,
                pullDownStyle: '',
                bubbleY: 0
            }
        },
        computed: {
            pullUpTxt() {
                const moreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more)

                const noMoreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore)

                return this.pullUpDirty ? moreTxt : noMoreTxt
            },
            refreshTxt() {
                return (this.pullDownRefresh && this.pullDownRefresh.txt)
            }
        },
        created() {
            this.pullDownInitTop = -50
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs['wrapper'].style.overflow = this.hidden ? 'hidden' : ''
                this.initScroll();
            });
        },
        destroyed() {
            this.$refs.scroll && this.$refs.scroll.destroy()
        },
        methods: {
            initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }
                if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
                    this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
                }

                let options = {
                    probeType: this.probeType,
                    click: this.click,
                    scrollY: this.freeScroll || this.direction === DIRECTION_V,
                    scrollX: this.freeScroll || this.direction === DIRECTION_H,
                    scrollbar: this.scrollbar,
                    pullDownRefresh: this.pullDownRefresh,
                    pullUpLoad: this.pullUpLoad,
                    startY: this.startY,
                    freeScroll: this.freeScroll,
                    mouseWheel: this.mouseWheel,
                    bounce: this.bounce,
                    zoom: this.zoom,
                    stopPropagation: this.stopPropagation,
                    bounceTime:300,
                    deceleration:0.001,
                    swipeBounceTime:500
                }

                // console.log('options',options.startY);
                this.initScrollHeight()

                this.scroll = new BScroll(this.$refs.wrapper, options)

                if (this.listenScroll) {
                    this.scroll.on('scroll', (pos) => {
                        this.$emit('scroll', pos)
                    })
                }

                if (this.listenScrollEnd) {
                    this.scroll.on('scrollEnd', (pos) => {
                        this.$emit('scroll-end', pos)
                    })
                }

                if (this.listenBeforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScrollStart')
                    })

                    this.scroll.on('scrollStart', () => {
                        this.$emit('scroll-start')
                    })
                }

                if (this.pullDownRefresh) {
                    this._initPullDownRefresh()
                }

                if (this.pullUpLoad) {
                    this._initPullUpLoad()
                }
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            enable() {
                this.scroll && this.scroll.enable()
            },

            refresh() {
                this.scroll && this.scroll.refresh()
            },

            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },

            autoPullDownRefresh() {
                this.scroll && this.scroll.autoPullDownRefresh()
            },

            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            },

            clickItem(e, item) {
                this.$emit('click', item)
            },

            destroy() {
                this.scroll.destroy()
            },

            forceUpdate(dirty) {
                if (this.pullDownRefresh && this.isPullingDown) {
                    this.isPullingDown = false
                    this._reboundPullDown()
                        .then(() => {
                            this._afterPullDown()
                        })
                } else if (this.pullUpLoad && this.isPullUpLoad) {
                    this.isPullUpLoad = false
                    this.scroll.finishPullUp()
                    this.pullUpDirty = dirty
                    this.refresh()
                } else {
                    this.refresh()
                }
            },

            _initPullDownRefresh() {
                this.scroll.on('pullingDown', () => {
                    this.beforePullDown = false
                    this.isPullingDown = true
                    this.$emit('pullingDown')
                })

                this.scroll.on('scroll', (pos) => {
                    if (!this.pullDownRefresh) {
                        return
                    }

                    // 没有触发刷新之前
                    if (this.beforePullDown) {
                        this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
                        this.pullDownStyle = {
                            // top:`${Math.min(pos.y + this.pullDownInitTop, 10)}px`
                            top: `${Math.min(pos.y + this.pullDownInitTop, 0)}px`
                        }
                    } else {
                        this.bubbleY = 0
                    }

                    // 超出回弹
                    if (this.isRebounding) {
                        this.pullDownStyle = {
                            top: `${10 - (this.pullDownRefresh.stop - pos.y)}px`
                        }
                    }
                })
            },

            _initPullUpLoad() {
                this.scroll.on('pullingUp', () => {
                    this.isPullUpLoad = true
                    this.$emit('pullingUp')
                })
            },

            _reboundPullDown() {
                const {stopTime = 600} = this.pullDownRefresh
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.isRebounding = true
                        this.scroll.finishPullDown()
                        resolve()
                    }, stopTime)
                })
            },

            _afterPullDown() {
                this.pullDownStyle = `top:${this.pullDownInitTop}px`
                setTimeout(() => {
                    this.beforePullDown = true
                    this.isRebounding = false
                    this.refresh()
                }, this.scroll.options.bounceTime)
            },

            initScrollHeight() {
                const container = this.$refs['wrapper']

                if (typeof this.scrollHeight === 'string') {
                    container.style.height = this.scrollHeight
                } else {
                    if (this.scrollHeight > 100) {

                        container.style.height = this.scrollHeight + 'px'
                        return;
                    }

                    let height = 0
                    if (this.$route.meta.ShowFoot) {
                        height = window.innerHeight - window.rem2px(2.2 + 2.5)
                    } else {
                        height = innerHeight - rem2px(2.2 + 0.2)
                    }
                    container.style.height = height + 'px'
                }
            }
        },
        watch: {
            data() {
                if (this.timer) clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.forceUpdate(true)
                }, this.refreshDelay)
            },

            scrollHeight(h) {
                if (h > 100) {
                    this.initScrollHeight()
                    this.forceUpdate(true)
                }
            },

            hidden(h) {
                // 样式绑定数据 偶尔不生效 改为直接操作dom
                this.$refs['wrapper'].style.overflow = h ? 'hidden' : ''
            }
        }
    }
</script>

<style type="text/css" lang="less" scoped>
    .list-wrapper {
        position: relative;
        height: 100%;
        /*background: #fff;*/

        .scroll-content {
            /*position: relative;*/
            z-index: 1;

            .list-content {
                position: relative;
                z-index: 10;
                background: #fff;
                display: inline-flex;

                .list-item {
                    display: inline-block;
                    height: 3rem;
                    line-height: 3rem;
                    font-size: 0.9rem;
                    padding-left: 1rem;
                    border-bottom: 1px solid #e5e5e5;
                }
            }
        }

        .pulldown-wrapper {
            position: absolute;
            width: 100%;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all;

            .after-trigger {
                margin-top: 0.5rem;
            }
        }


        .pullup-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.4rem 0;
        }
    }
</style>
