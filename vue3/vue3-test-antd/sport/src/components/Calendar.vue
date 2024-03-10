<template>
    <div class="calendar">
        <van-calendar v-model="showCalendar"
                      :style="{
                height: '66vh',width: '300px',top: '50%',left: '50%',
                transform: `translate3d(-50%, -50%, 0px)`,
                borderRadius: 0
              }"
        type="range"
        :confirm-text="$t('q_r')"
        :show-title="false"
        :row-height="50"
        position="top"
        :min-date="new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1)"
        :maxDate="new Date(new Date().getTime() + 24 * 3600000)"
        @close="showCalendar = false"
        @closed="$emit('close')"
        @confirm="onConfirmDate" :color="color"/>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                showCalendar: false
            };
        },

        props: {
            show: {
                type: Boolean,
                default: false
            },
            color: {
              type: String,
              default: '#126E51'
            }
        },

        watch: {
            show(flag) {
                if (flag) this.showCalendar = flag
            }
        },

        methods: {
            onConfirmDate(date) {
                this.showCalendar = false
                this.$emit('change', date)
            }
        },
    };
</script>

<style type="text/css" lang="less">
    .calendar {
        .van-calendar__footer {
            .van-button {
                border-radius: 0 !important;
            }
        }
    }

</style>
