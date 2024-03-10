<template>
    <div class="flex-between full-height">
        <div class="flex-middle full-height" >
            <div class="timer m-r8" style="margin: 0">3</div>
            <span class="fs12" style="color: #4E5772">{{$t('tz_xq')}}</span>
        </div>
        <div class="fs12 flex-middle" style="color: #666666">
            <div>{{$t('blance')}}：</div>
            <div class="m-r8 bold" style="color: #404040">10000</div>
            <img @click="$emit('close')" :style="{transform: $attrs.isdown === true ? 'rotate(180deg)' : 'rotate(0deg)'}" style="width: 0.8rem" src="../../assets/images/tmp3/detup.png" />
        </div>
    </div>
</template>

<style scoped lang="less">
@import url('../../assets/css/index');
.timer {
    height: 1rem;
    background-image: linear-gradient(180deg, #F0AA08 0%, #B88306 100%);
    border-radius: .5rem;
    line-height: 1rem;
    display: inline-block;
    padding: 0 .5rem;
    margin: .4rem 50px;
    .white();
}
</style>