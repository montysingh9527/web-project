<template>
    <img :id="domId" src="" alt="">
</template>

<script>
    import {uuid} from '../assets/js/util'
    export default {
        name: 'load-image',
        data() {
            return {

            };
        },

        props: {
            loading: {
                type: String,
                default: ''
            },

            error: {
                type: String,
                default: ''
            },

            src: {
                type: String,
                default: ''
            }
        },

        watch: {
            src() {
                this._initialDom()
            }
        },

        methods: {
            _initialDom() {
                let imgDom =  document.getElementById(this.domId)

                if(!imgDom) return;

                imgDom.src = this.loading

                let img = document.createElement('img')

                img.src = this.src

                img.onload = () => {
                    if (img.width === 1 && img.height === 1) {
                        imgDom.src = this.error
                    } else {
                        imgDom.src = this.src
                    }
                }

                img.onerror = () => {
                    imgDom.src = this.error
                }
            }
        },

        created() {
            this.domId = uuid()
        },

        mounted() {
            this.$nextTick(() => {
                this._initialDom()
            })
        },

        destroyed() {

        }
    };
</script>

<style type="text/css" lang="less" scoped>

</style>
