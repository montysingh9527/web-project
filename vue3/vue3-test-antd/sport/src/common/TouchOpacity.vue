<template>
    <div class="touch-opacity"
         ref="touch-opacity"
         @touchstart="_touchstart($event)"
         @touchend="_touchend($event)"
         @click.stop.prevent>
        <slot></slot>
    </div>
</template>

<script>
    import { distance } from '../assets/js/util'
    export default {
        name: "touch-opacity",
        created() {
            this.startPosition = {}
            this.endPosition = {}
            this.startTouchTime = 0
            this.endTouchTime = 0
            this.timer = null
        },
        props: {
            // 手指按下和抬起触发点击的间隔时间
            validTime: {
                type: Number,
                default: 200
            },

            // 渐变的透明度取值 0~1
            opacity: {
                type: Number,
                default: 0.3
            },

            // 渐变时间 单位ms
            duration: {
                type: Number,
                default: 200
            },

            // 手指滑动的最小距离
            maxDistance: 5,

            // 跳转路由
            to: [String, Object],
        },

        methods: {
            _touchstart(event) {
                this.startTouchTime = new Date().getTime()

                let ev = ev || event;
                ev.preventDefault()

                //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                if(ev.touches && ev.touches.length == 1) {
                    this.startPosition.x0 = ev.touches[0].clientX // 记录开始位置x坐标
                    this.startPosition.y0 = ev.touches[0].clientY // 记录开始位置y坐标
                }

                this.changeStyle()
            },

            _touchend(event) {
                let ev = ev || event;
                ev.preventDefault()

                this.endTouchTime = new Date().getTime()
                this.removeStyle()

                // 按下时间过长 取消触发事件
                if (this.endTouchTime - this.startTouchTime > this.validTime) {
                    return;
                }
                // 计算手指滑动距离
                if(ev.changedTouches.length === 1) {
                    this.endPosition.x1 = ev.changedTouches[0].clientX
                    this.endPosition.y1 = ev.changedTouches[0].clientY
                }

                const L = distance(this.startPosition, this.endPosition)

                if (L > this.maxDistance) return;

                // 如果 to存在 跳转
                if (this.to && typeof this.to === 'string') {
                    this.$router.push(this.to)
                    return;
                } else if (this.to && typeof this.to === 'object'){
                    this.$router.push({path: this.to.path = '/', params: this.to.params})
                    return;
                }

                this.$emit('press')
            },

            changeStyle() {
                // 添加CSS
                const ele = this.$refs['touch-opacity']
                ele.style['transitionDuration']= this.duration / 1000 + 's'

                ele.style.opacity = this.opacity
            },

            removeStyle() {
                const ele = this.$refs['touch-opacity']
                ele.style['transitionDuration']= null

                ele.style.opacity = 1
            }
        }
    };
</script>
<style type="text/css" lang="less" scoped>
    .touch-opacity {
        position: relative;
        overflow: hidden;
        opacity: 1;
        transition-property: opacity;
        transition-timing-function: linear;
    }
</style>
