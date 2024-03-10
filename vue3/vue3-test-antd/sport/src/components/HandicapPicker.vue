<template>
    <div ref="picker-anchor" class="flex-middle-only" @click="showPicker = true">
        <span class="fs14" v-if="!hideName">{{handicap.name}}</span>
        <i class="van-icon van-icon-arrow-down" style="color:#cecece;"></i>

        <van-overlay :show="showPicker"
                     @click.stop="showPicker = false"
                     :custom-style="{backgroundColor: `rgba(0,0,0,.2)`}"
        >
            <div class="ab hide-scroll-bar"
                 :style="{width: '9rem',right: '0.6rem', top: top, ...customStyle}"
                 @click.stop>
                <ul class="tmp2-overlay-content">
                    <li v-for="item of handicaps" :key="item.code"
                        :class="handicap.code === item.code ? 'active' : ''"
                        @click="onConfirmHandicap(item)">
                        {{item.name}}
                    </li>
                </ul>
            </div>
        </van-overlay>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                handicap: {},
                top: 0,
                showPicker: false
            }
        },

        props: {
            hideName: false,
            handicaps: {
                type: Array,
                default: ()  => ([])
            },
            customStyle: {
                type: Object,
                default: () => ({})
            }
        },

        mounted() {
            this.$nextTick(() => {
                this.top = this.$refs['picker-anchor'] && this.$refs['picker-anchor'].getBoundingClientRect().bottom + 10 + 'px'
            })
        },

        methods: {
            onConfirmHandicap(handicap) {
                console.log('handicap', handicap)
                setTimeout(() => this.showPicker = false, 100)

                if (this.handicap.code !== handicap.code) {
                    this.handicap = {...handicap}

                    this.$emit('change', {...handicap})
                }
            },
        }
    }
</script>
