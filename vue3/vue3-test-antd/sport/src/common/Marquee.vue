<template>
    <div ref="marquee-box" class="over-hidden">
        <div class="text-content flex-middle-only fs12"
             :style="{color: textColor}"
             ref="text-content"
        >
            <span ref="text" v-html="scrollText"></span>
<!--            <span v-if="needScroll" :style="{marginLeft: this.space + 'px'}" v-html="text"></span>-->
        </div>
    </div>
</template>

<script>
    import {prefixStyle} from "../assets/js/dom";

    export default {
        name: "Marquee",
        created() {
            this.timer = null;
            this.textContent = null
            this.protoStyle = prefixStyle("transform");
            this.x = 0;
        },

        data() {
            return {
                scrollText: ''
            };
        },

        props: {
            text: {
                type: String,
                default: ""
            },

            textColor: {
                type: String,
                default: "#333"
            },

            speed: {
                type: Number,
                default: 1
            },

            space: {
                type: Number,
                default: 200
            }
        },

        watch: {
            text() {
                this.$nextTick(() => {
                    this.init();
                });
            }
        },

        methods: {
            init() {
                this.scrollText = this.text

                console.log('滚动初始化....')
                setTimeout(() => {
                    this.textContent = this.$refs["text-content"]

                    let textContentWidth = this.$refs["text"].offsetWidth;

                    let marqueeBoxWidth = this.$refs["marquee-box"].offsetWidth

                    // 如果 文字超长 就滚动
                    if (textContentWidth >= marqueeBoxWidth) {
                        textContentWidth *= 2

                        this.scrollText = this.text + this.addNbsp(20) + this.text

                        this.clearTimer();

                        this._scrollText(textContentWidth);
                    }
                }, 1000)
            },

            _scrollText(textContentWidth) {

                this.x += this.speed;

                if (Math.abs(this.x) >= (textContentWidth / 2 + 58)) {
                    this.x = 0;
                    this.textContent.style[this.protoStyle] = `translate3d(-${this.x}px, 0, 0)`;

                    this.clearTimer()

                    setTimeout(() => {
                        this._scrollText(textContentWidth)
                    }, 200)
                    return;
                }

                this.textContent.style[this.protoStyle] = `translate3d(-${this.x}px, 0, 0)`;

                this.timer = window.requestAnimationFrame(()  => {
                    this._scrollText(textContentWidth)
                })

            },

            addNbsp(n) {
                return Array.from({length: n}).fill('&nbsp;').join('')
            },

            clearTimer() {
                if (this.timer) {
                    window.cancelAnimationFrame(this.timer);
                    this.timer = null;
                }
            }
        },

        beforeDestroy() {
            this.clearTimer();
        },

        activated() {
            if (!this.timer && this.text) {
                this.init()
            }
        },

        deactivated() {
            this.clearTimer();
        }
    };
</script>

<style type="text/less" lang="less" scoped>
    .text-content {
        flex-direction: row;
        white-space: nowrap;

        img {
            max-height: 1rem;
        }
    }
</style>

