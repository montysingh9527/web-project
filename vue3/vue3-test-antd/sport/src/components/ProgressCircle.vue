<template>
    <div :style="{width: width + 'px', height: width + 'px'}"
         style="overflow: hidden;"
    >
        <div :id="domId" :style="`transform: scale(${1/scale})`"></div>
    </div>
</template>

<script>
    // const arr = [
    //     {color: '#F13F40', ratio: 0.3},
    //     {color: '#3388FF', ratio: 0.7},
    // ];

    export default {
        data() {
            return {
                domId: `progress-circle-${Math.floor(Math.random()*100000)}`
            }
        },

        computed: {
            // 渲染数据
            list() {
                return [
                    {color: '#3388FF', ratio: this.ratio},
                    {color: '#F13F40', ratio: 1 - this.ratio},
                ]
            },

            width() {
                let html = document.getElementsByTagName('html')[0]
                let htmlSize = window.getComputedStyle(html).fontSize

                if (htmlSize) htmlSize = htmlSize.replace('px', '')

                return this.contentWidth * (htmlSize / 20)
            }
        },

        props: {
            ratio: {
                type: Number,
                default: 0.3
            },

            // canvas的宽高
            contentWidth: {
                type: Number,
                default: 20
            },

            bgColor: {
                type: String,
                default: '#fff'
            },

            strokeWidth: {
                type: Number,
                default: 8
            }
        },

        methods: {
            drawCircle() {
                let canvas = this.initCanvas()
                let ctx = canvas.getContext('2d')

                let r1 = this.list[0].ratio * Math.PI * 2

                let start = - Math.PI / 2 - (r1 - Math.PI) / 2 // (-m - r1 + m)
                let end = r1 + start

                // let start = 0// (r1 * Math.PI * 2 - Math.PI) / 2 - Math.PI / 2
                // let end = r1 * Math.PI * 2 + start

                for (let i = 0; i < this.list.length; i++) {
                    if (!this.list[i]) return;

                    //顺时针一号内容
                    ctx.beginPath();
                    ctx.moveTo(this.width * this.scale / 2, this.width * this.scale / 2);
                    ctx.arc(this.width * this.scale / 2, this.width * this.scale / 2, this.width * this.scale / 2, start, end, false);
                    ctx.closePath();
                    ctx.fillStyle = this.list[i].color;
                    ctx.fill();

                    start = end
                    if (!this.list[i + 1]) continue;
                    end += this.list[i + 1].ratio * Math.PI * 2
                }

                //变成圈图
                ctx.beginPath();
                ctx.arc(this.width * this.scale / 2, this.width * this.scale / 2, (this.width * this.scale / 2 - this.s), 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.fillStyle = this.bgColor;
                ctx.fill();

                this.appendCanvas(canvas)
            },

            initCanvas() {
                let canvas = document.createElement('canvas')

                canvas.width = this.width * this.scale
                canvas.height = this.width * this.scale
                canvas.style.backgroundColor = this.bgColor
                return canvas
            },

            appendCanvas(canvas) {
                let content = document.getElementById(this.domId)
                let contentStyle = {
                    borderRadius: '50%',
                    width: this.width * this.scale + 'px',
                    height: this.width * this.scale + 'px',
                    position: 'relative',
                    overflow: 'hidden',
                    marginTop: -this.width / 2 + 'px',
                    marginLeft: -this.width / 2 + 'px'
                }

                for (let key in contentStyle) {
                    content.style[key] = contentStyle[key]
                }

                let mask = document.createElement('div')
                mask.className = 'ab-middle '
                let maskStyle = {
                    borderRadius: '50%',
                    width: this.width * this.scale - this.strokeWidth * this.scale + 'px',
                    height: this.width * this.scale - this.strokeWidth * this.scale + 'px',
                    backgroundColor: this.bgColor
                }

                for (let key in maskStyle) {
                    mask.style[key] = maskStyle[key]
                }


                content.appendChild(mask)
                content.appendChild(canvas)
            }
        },

        mounted() {
            this.drawCircle()
        },

        created() {
            this.scale = 2
        }
    }
</script>

