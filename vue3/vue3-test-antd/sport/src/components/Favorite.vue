<template>
    <i class="icon_base collect cursor" :id="`favorite_${matchId}`"
       @click.stop="_favorite(`favorite_${matchId}`, matchId)"
       :class="isFavorite === 1 ? 'active' : ''"></i>
</template>
<script>
    import {mapGetters} from "vuex"
    import {addClass, hasClass, removeClass} from "../assets/js/dom";
    import {favorite} from "../axios/sport";

    export default {
        computed: {
            ...mapGetters(['userInfo'])
        },
        props: {
            isFavorite: {
                type: [String, Number],
                default: ''
            },

            matchId: {
                type: [String, Number],
                default: ''
            }
        },

        methods: {
            _favorite() {
                // 如果没有登录
                if (!this.userInfo.userId) {
                    this.$toast(this.$t('login_f'))
                    return;
                }

                const ele = document.getElementById(`favorite_${this.matchId}`)

                let flag = hasClass(ele, 'active') ? 0 : 1

                flag === 0 ? removeClass(ele, 'active') : addClass(ele, 'active')

                // 1收藏0取消
                favorite({id: this.matchId, favorite: flag})
                    .then(res => {
                        if (res.code === 200) {
                            console.log('OK')
                        } else {
                            this.$toast(res.msg)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
    }
</script>
