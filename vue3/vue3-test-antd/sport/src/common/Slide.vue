<template>
    <div class="slide" ref="slide" :style="{height: contentHeight + 'px'}">
        <div class="slide-group" ref="slideGroup">
            <slot>
                <div v-for="(banner, index) in data" :key="index" @click="test">
                    <!--<img class="banner-img" :data-src="banner.pic" :data-error="errorImg" :data-loading="loadingImg">-->
                    <img class="banner-img" v-lazy="banner.pic">
                </div>
            </slot>
        </div>
        <div v-if="showDot" class="dots">
            <span class="dot" :class="{active: currentPageIndex === i }" v-for="i in dots" :key="i"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {addClass} from '../assets/js/dom';
    import BScroll from 'better-scroll'

    const COMPONENT_NAME = 'slide'

    export default {
        name: COMPONENT_NAME,
        created() {
            this.children = []
            this.contentHeights = []
        },
        props: {
            // 是否循环滚动
            loop: {
                type: Boolean,
                default: true
            },

            // 是否自动播放
            autoPlay: {
                type: Boolean,
                default: true
            },

            // 播放间隔
            interval: {
                type: Number,
                default: 4000
            },

            data: {
                type: Array,
                default: () => ([])
            },

            // 底部圆点
            showDot: {
                type: Boolean,
                default: true
            },

            // 是否可以点击 (一搬不做修改)
            click: {
                type: Boolean,
                default: true
            },

            // 回弹
            threshold: {
                type: Number,
                default: 0.1
            },

            // 播放速度
            speed: {
                type: Number,
                default: 400
            },

            eventPass: ''
        },
        data() {
            return {
                dots: [],
                currentPageIndex: 0,
                contentHeight: 1,
                slide: null
            }
        },

        mounted() {
            // this.update()
            window.addEventListener('resize', () => {
                if (!this.slide || !this.slide.enabled) {
                    return
                }

                clearTimeout(this.resizeTimer)

                this.resizeTimer = setTimeout(() => {
                    if (this.slide.isInTransition) {
                        this._onScrollEnd()
                    } else {
                        if (this.autoPlay) {
                            this._play()
                        }
                    }
                    this.refresh()
                }, 60)
            })
        },

        activated() {
            if (!this.slide) {
                return
            }
            this.slide.enable()
            this.slide.refresh()
            this.slide.goToPage(0, 0, 0)
            this.currentPageIndex = 0
            if (this.autoPlay) {
                this._play()
            }
        },

        deactivated() {
            this.slide && this.slide.disable()
            clearTimeout(this.timer)
        },

        beforeDestroy() {
            this.slide && this.slide.disable()
            clearTimeout(this.timer)
        },

        methods: {
            update() {
                if (this.slide) {
                    try {
                        this.slide.destroy()
                    } catch (e) {
                        delete this.slide
                        this.slide = null
                    }
                }
                this.$nextTick(() => {
                    this.init()
                })
            },

            refresh() {
                this._setSlideWidth(true)
                this.slide.refresh()
            },

            prev() {
                this.slide.prev()
            },

            next() {
                this.slide.next()
            },

            init() {
                clearTimeout(this.timer)
                this.currentPageIndex = 0
                this._setSlideWidth()

                if (this.showDot) {
                    this._initDots()
                }

                this._initSlide()

                if (this.autoPlay) {
                    this._play()
                }
            },

            // 计算每个item 的高度
            computedItemHeight() {
                this.contentHeights = []
                if (this.children === 0) return false;

                this.children.forEach(child => {
                    if (child) {
                        // console.log('child.clientHeight', child.clientHeight)
                        this.contentHeights.push(child.clientHeight)
                    }
                })

                this.contentHeight = this.contentHeights[this.currentPageIndex]
            },

            // 根据屏幕宽度和轮播图片计算容器宽度
            _setSlideWidth(isResize) {
                this.children = Array.from(this.$refs.slideGroup.children)

                let width = 0
                let slideWidth = this.$refs.slide.clientWidth
                let ln = this.children.length
				
                for (let i = 0; i < ln; i++) {
                    let child = this.children[i]
                    addClass(child, 'slide-item')

                    child.style.width = slideWidth + 'px'

                    width += slideWidth
                }

                if (this.loop && !isResize) {
                    width += 2 * slideWidth
                }

                this.$refs.slideGroup.style.width = width + 'px'
                this.computedItemHeight()
            },

            _initSlide() {
                this.slide = new BScroll(this.$refs.slide, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: {
                        loop: this.loop,
                        threshold: this.threshold,
                        speed: this.speed
                    },
                    bounce: true,
                    stopPropagation: true, // 阻止事件冒泡
                    click: this.click,
                    // 这个属性 不设置会导致阻止 原生的 overflow: scroll
                    eventPassthrough: this.eventPass,
                })

                this.slide.on('scrollEnd', this._onScrollEnd)

                this.slide.on('touchEnd', () => {
                    if (this.autoPlay) {
                        this._play()
                    }
                })

                this.slide.on('beforeScrollStart', () => {
                    if (this.autoPlay) {
                        clearTimeout(this.timer)
                    }
                })
            },

            _onScrollEnd() {
                let pageIndex = this.slide.getCurrentPage().pageX


                this.currentPageIndex = pageIndex
                this.computedItemHeight()
                if (!this.autoPlay) {

                    this.$emit('scroll-end', pageIndex)

                    // this.contentHeight = 433// this.contentHeights[this.currentPageIndex]
                } else {
                    this._play()
                }
            },

            _initDots() {
                this.dots = Array.from({length: this.children.length}).map((v, i) => i)
            },

            _play() {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.slide.next()
                }, this.interval)
            },

            _goToPage(pageIndex) {
                this.slide.goToPage(pageIndex, 0, 200)
            }
        },
        watch: {
            loop() {
                this.update()
            },
            autoPlay() {
                this.update()
            },
            speed() {
                this.update()
            },
            threshold() {
                this.update()
            },
            data() {
                this.update()
            }
        }
    }
</script>

<style type="text/css" lang="less">

    .slide {
        position: relative;
        min-height: 5rem;
        overflow: hidden;
        .slide-group {
            position: relative;
            overflow: hidden;
            white-space: nowrap;
        }

        .slide-item {
            float: left;
            box-sizing: border-box;
            overflow: hidden;
            text-align: center;

            a {
                display: block;
                width: 100%;
                overflow: hidden;
                text-decoration: none;
            }

            img {
                display: block;
                width: 100%
            }
        }

        .dots {
            position: absolute;
            right: 0;
            left: 0;
            bottom: 0.6rem;
            transform: translateZ(1px);
            text-align: center;
            font-size: 0;

            .dot {
                display: inline-block;
                margin: 0 0.2rem;
                width: 0.4rem;
                height: 0.4rem;
                border-radius: 50%;
                background: #d7d7d7;

                &.active {
                    width: 1rem;
                    border-radius: 0.25rem;
                    background: #fff;
                }
            }
        }
    }
</style>
