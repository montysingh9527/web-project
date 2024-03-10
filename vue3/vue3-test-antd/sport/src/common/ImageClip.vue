<template>
    <div class="image-clip">
        <div class="upload-icon re" v-show="step !== 2">
            <i class="iconfont iconGroup ab" v-if="!previewSrc" style="font-size: 40px;"></i>
            <input v-if="isIos"
                   @change="_change($event)"
                   class="input ab" type="file"
                   accept="image/jpg,image/jpeg,image/png"/>

            <!-- 安卓设备保留capture属性 -->
            <input v-else
                   @change="_change($event)"
                   class="input ab" type="file"
                   accept="image/jpg,image/jpeg,image/png" multiple="multiple" capture="camera"/>

            <img id="preview" v-if="step === 3" :src="previewSrc" style="width: 100%" ref="img">
        </div>

        <div class="clip-box" v-show="step === 2">
            <img :src="cropperImg" ref="img">
        </div>

        <footer class="ab footer">
            <div class="flex-middle m-b20" v-if="step === 2">
                <mu-button small color="primary" @click="_rotate">
                    <i class="iconfont icon-xuanzhuan"></i>
                    <span class="m-l5">旋转</span>
                </mu-button>
                <mu-button small class="m-r20 m-l20" color="primary" @click="_scale">
                    <i class="iconfont iconhuanxiang"></i>
                    <span class="m-l5">转向</span>
                </mu-button>
                <mu-button small color="primary" @click="_reset">
                    <i class="iconfont iconfuwei"></i>
                    <span class="m-l5">复位</span>
                </mu-button>
            </div>

            <div class="flex-middle">
                <mu-button class="flex-1" @click="$emit('close')">取消</mu-button>
                <mu-button class="m-r10 m-l10 flex-1" color="primary" @click="saveCropImg" v-if="step === 2">预览</mu-button>
                <mu-button class="m-l10 flex-1" color="primary" @click="upload(1)" v-if="step === 3">上传</mu-button>
                <mu-button class="flex-1" color="primary" @click="upload(2)" v-if="step === 2 && (originalSize < 20 && originalSize> 0)">上传原图</mu-button>
            </div>
        </footer>
    </div>
</template>

<script>
    import Cropper from 'cropperjs'
    import {checkDevType} from '../assets/js/util'

    export default {
        created() {
            this.isIos = checkDevType() === 'ios'
            this.flag = true
            this.replaceSrc = ''
        },

        mounted() {
            this.$nextTick(() => {
                this.initCropper()
            })
        },
        data() {
            return {
                show: false,
                showUpload: true,
                cropperImg: '',
                imgName: '',
                cropper: null,
                previewSrc: '',
                step: 1,
                originalSize: 0,
                log: 0
            };
        },

        methods: {
            initCropper() {
                this.cropper = new Cropper(this.$refs.img, {
                    viewMode: 2,
                    aspectRatio: 1,
                    preview: document.getElementById('preview'),
                    dragMode: 'crop',
                    cropBoxMovable: true,
                    guides: true, // 裁剪框的虚线(九宫格)
                    autoCropArea: 0.5, // 0-1之间的数值，定义自动剪裁区域的大小，默认0.8
                    dragCrop: true, // 是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
                    movable: true, // 是否允许移动剪裁框
                    resizable: true, // 是否允许改变裁剪框的大小
                    zoomable: false, // 是否允许缩放图片大小
                    mouseWheelZoom: false, // 是否允许通过鼠标滚轮来缩放图片
                    touchDragZoom: true, // 是否允许通过触摸移动来缩放图片
                    rotatable: true, // 是否允许旋转图片
                    cropBoxResizable: true
                })
            },

            _touchmove() {
                console.log('手指触摸事件')
                this.log++
            },

            _change(event) {
                const img = event.target.files[0]

                if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(img.name)){
                    this.$toast("请选择图片再上传")
                    return false
                }
                this.step = 2

                const reader = new FileReader();
                reader.readAsDataURL(img);
                reader.onload = (evt) => {
                    this.replaceSrc = evt.target.result;
                    // 更换cropper的图片

                    console.log('原图', (this.replaceSrc.length / 1024).toFixed(2) + 'kb')
                    this.originalSize = this.replaceSrc.length / 1024
                    this.cropper.replace(this.replaceSrc, false);// 默认false，适应高度，不失真
                }
            },

            // 图片上传
            upload(type) {
                this.$emit('upload', type === 1 ? this.previewSrc : this.replaceSrc)

                this.$emit('close')
            },

            getRoundedCanvas(sourceCanvas) {
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d')
                let width = sourceCanvas.width
                let height = sourceCanvas.height

                canvas.width = width
                canvas.height = height

                context.imageSmoothingEnabled = true
                context.drawImage(sourceCanvas, 0, 0, width, height)

                context.globalCompositeOperation = 'destination-in'
                context.beginPath()
                context.rect(0, 0, width, height)
                context.fill()
                return canvas
            },

            saveCropImg() {
                const cvs = this.cropper.getCroppedCanvas()

                let roundedCanvas = this.getRoundedCanvas(cvs)

                this.previewSrc = roundedCanvas.toDataURL('image/jpeg', 0.2)

                console.log('裁剪后', (this.previewSrc.length / 1024).toFixed(2) + 'kb')
                this.cropper.destroy()
                this.step = 3
            },

            _rotate() {
                this.cropper.rotate(45);
            },

            _reset() {
                this.cropper.reset()
            },

            _scale() {
                this.flag = !this.flag
                this.cropper.scaleX(this.flag ? 1 : -1);
            },

            show() {
                this.show = true
            },

            hide() {
                this.show = false
            }
        }
    };
</script>

<style type="text/css" lang="less" scoped>
    .image-clip {
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.9);
        overflow: scroll;

        .upload-icon {
            width: 30vw;
            height: 30vw;
            margin: 30vh auto;
            background-color: rgba(255, 255, 255, 1);
            overflow: hidden;

            .input {
                width: 100%;
                height: 100%;
                opacity: 0;
                z-index: 9;
            }

            i.iconfont {
                left: 50%;
                top: 50%;
                transform: translate3d(-50%, -50%, 0);
                z-index: 1;
            }
        }

        .clip-box {
            width: 100vw;
            min-height: 20rem;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;

            img {
                max-width: 100%;
                display: block;
                margin: 0 auto;
            }
        }

        .footer {
            bottom: 1rem;
            width: 100%;
            background: none;
        }

        .log {
            position: fixed;
            top: 55px;
            left: 55px;
            height: 30px;
            width: 30px;
            background-color: #37b164;
        }
    }
</style>
