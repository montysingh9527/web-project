<template>
    <CommonLayout>
        <div class="white flex-between" style="height:2.2rem;padding: 0 0.6rem;">
            <span class="fs20">{{$t('fav')}}</span>

<!--            <div ref="picker-anchor" class="flex-middle-only" @click="showPicker = true">-->
<!--                <span class="fs14">{{handicap.name}}</span>-->
<!--                <i class="van-icon van-icon-arrow-down" style="color:#cecece;"></i>-->

<!--                <van-overlay :show="showPicker"-->
<!--                             @click.stop="showPicker = false"-->
<!--                             :custom-style="{backgroundColor: `rgba(0,0,0,.2)`}"-->
<!--                >-->
<!--                    <div class="ab hide-scroll-bar"-->
<!--                         :style="{width: '9rem',right: '0.6rem', top: '8rem'}"-->
<!--                         @click.stop>-->
<!--                        <ul class="tmp2-overlay-content">-->
<!--                            <li v-for="item of handicaps" :key="item.code"-->
<!--                                :class="handicap.code === item.code ? 'active' : ''"-->
<!--                                @click="onConfirmHandicap(item)">-->
<!--                                {{item.name}}-->
<!--                            </li>-->
<!--                        </ul>-->
<!--                    </div>-->
<!--                </van-overlay>-->
<!--            </div>-->

        </div>

        <CommonBetList :title="$t('fav')"
                       category="favorite"
                       :titleStyle="{height: '1.4rem'}"
                       :handicap="handicap"/>
    </CommonLayout>
</template>
<script>
    import CommonBetList from '../../../components/CommonBetList';
    import CommonLayout from "../../../components/CommonLayout";

    export default {
        data() {
            return {
                showPicker:false,
                handicap: {code: 'asian_handicap_goal', name: this.$t('a_h_goal')},
            }
        },
        methods: {
            onConfirmHandicap(handicap) {
                this.handicap = handicap
                this.showPicker = false
            },
        },
        components: {
            CommonBetList,
            CommonLayout
        },
        created() {
            this.handicaps = [
                {code: 'asian_handicap_goal', name: this.$t('a_h_goal')},
                {code: 'full_time_result', name: this.$t('full_time_result')},
                {code: 'asian_handicap', name: this.$t('asian_handicap')},
                {code: 'match_goals', name: this.$t('match_goals')},
            ]
        }
    };
</script>
