<template>
    <div class="page">
        <van-nav-bar
            title="注册账号"
            @click-left="$router.back()"
            style="height: 46px"
            :border="false"
            fixed
            placeholder
        >
            <template #left>
                <van-icon name="arrow-left" style="color: rgb(125, 125, 128); font-size: 16px" />
            </template>
        </van-nav-bar>
        <div class="container">
            <van-form @submit="onSubmit">
                <div class="field_box field_code">
                    <div data-v-38be4cd8="" class="icon_item user_icon"></div>
                    <van-field
                        v-model="state.account"
                        placeholder="请输入账号"
                        :border="false"
                        size="large"
                        clearable
                        :rules="[{ required: true, message: '请输入账号' }]"
                    />
                </div>
                <div class="field_box field_code mt12">
                    <div data-v-38be4cd8="" class="icon_item lock_icon"></div>
                    <van-field
                        v-model="state.pwd"
                        placeholder="请输入密码"
                        :border="false"
                        size="large"
                        clearable
                        :rules="[{ required: true, message: '请输入密码' }]"
                    />
                </div>
                <div class="field_box field_code mt12">
                    <div data-v-38be4cd8="" class="icon_item lock_icon"></div>
                    <van-field
                        v-model="state.cpwd"
                        placeholder="请确认密码"
                        :border="false"
                        size="large"
                        clearable
                        :rules="[{ required: true, message: '请确认密码' }]"
                    />
                </div>
                <div class="mt27">
                    <van-button type="primary" block round native-type="submit"
                        >立即注册</van-button
                    >
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getBanner, getIndexCol } from '@/api/common.js'
import { Encrypt, Decrypt } from '@/utils/crypto'
import { Toast } from 'vant'
import { regUser } from '@/api/user'
export default {
    name: 'App',
    components: {},
    setup(props, context) {
        const state = reactive({
            account: '',
            pwd: '',
            cpwd: ''
        })

        const onSubmit = () => {
            // console.log(222)
            if (!/^[a-zA-Z0-9]{6,20}$/.test(state.account)) {
                Toast.fail('请设置6-20位以数字或字母的账号')
                return
            }
            if (!/^[a-zA-Z0-9]{6,20}$/.test(state.pwd)) {
                Toast.fail('请设置6-20位以数字或字母的登录密码')
                return
            }
            if (state.pwd !== state.cpwd) {
                Toast.fail('两次密码不一致')
                return
            }
            regUser({ account: state.account, pwd: state.pwd }).then((res) => {
                Toast(res.message)
            })
        }
        return { state, onSubmit }
    }
}
</script>
<style lang="scss" scoped>
.page .container {
    padding: 0.53333rem 0.26667rem;
}

.page .container .field_box {
    position: relative;
    border-bottom: 0.02667rem solid #f0f1f2;
}

.page .container .user_icon {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAAEqElEQVRYCe1Yz2tTWRjtS9patZEixhG1HQQFGeiANEnpD10odihYZ5W/wB8I6ixGF6OoVF25UGR+wDCibgQXblwoBaHS0aSlbcrALARbi1QNRTvMwk60NqbxnNf7XW7je81Lk4ZZ+ODmfve7537nvO++d+99qaj4chWXAau44fOjm5ubN2cymfZsNruJHsuykn6/PzY4OPiq2PhFCQyHw3sg6gJKq5MQCO1HOTc8PNzr1O/FtySBTU1NVSD+FcIOeyKxrD+APTYyMpL2gjcxPrPhxe7u7vZB3J0ccR/g68H4yyzK/iDxiFVjCk5IwQOQvbMgviDkIO6trq4+0N/fPyE+1q2trV/Pzs5eh7g9hv8csnjRaOc1CxLY0tKyKZ1Oj4F0JSND3G94vo6jzjoxAWfhOf0F9VGFf19VVbVtYGAg6YR38hU0xcjIYUPc09ra2pNu4pSgrMI8ZZtjGcNJiJuvIIEQs18C+Xy+U319fTPSdquJIVb6zRjiW6wuSCACbZdgdXV1D8TOV+dgdYx849jv+Rlsa2sLzMzMvLUHWdZ0IpFY44VAMKFQ6C2mOMB2TU3Nmng8Pi19i9WeMxiLxf5DIHsdA1FtNBqtXiyw2UcsxyhfWsUyIa62Z4F8GVCeq0jWxMREu2vUnA6FtWeLMRgrB+La9CxQRbgvkbD3nueiLW23mhhijX4dw/C5mn7XHoeO+vr6l5iqI+iisIbR0dHpycnJAQeodqVSqRMYc5AOZC6DQ8ShZDI5pQF5jIIEMvBGXIgZUnH3orm+sbHxz/Hx8QX7bEdHx2q8vVch7jSwMr3XsLDfzKNpQbfnt1hGYTdZid3kEYhFJDPDYxX35yfEof0Nqijam9nmBV8Cu8gu7CLv5z3efgsWyLAQuRY7wh2Yu73RVDzEfh2FuH894jUs70OukYZBokAg8B2ycgzuN0ZXrvmGGGKXIo7BlpRBUwXPhtjKdmE6d6LoEzWEPZ6bm3u0lDOgGf9/b+fNYCQS2YLMNKCsLuXdIMMplBdDQ0Oy+DuGdxTIaQOa690PKFsdR5bO+Qyhfkb53elx+EwgDpgb8OzcxYDm0mnwFGmwsrLye3wJvjbRCwQic6uQ9himc4cB4vfG32h7Xv2NsYuZQfB8C8AKAYHnL/jakcl34qsUQ9VnRBzAH+G7FAwGL/b09OgPoBx8Uc3Ozs4VU1NT/Mb5Cbx+xX0Gbe4+9qUzyOzBwyyx5nUCd3Jl3lzeX3D/CAZ+EfJi9oKSRb1QYxPnriDixrq6uq4SXY5LcY0prlVKi93UAvFimG9rHMekuXKII4fiigufqUULRCeXFvvC85cSu4y1fjHAqbVogRD1whATMeyymOAPC5GpRQtEWnvRkSEIb1MYHzn7ZcBy1+QiJ3mogVqEUwvEW/MPnLelA/WNcohUHDcM3ttKi+3Sywxb6q+NEdzNVzIAdzQMewiFN1DKax2CRSRzDAyu1zjUNuFolhSiBQLpxOEghBTfM0UKeDlrisOxbR8ODwmTR0+xOAngXWDALRT7mZS+5ajJQS5y5ooj32cZNEVghV+Hu+K/qA3wl/S4hXj2cYsvhPnMmfxf7FJk4BOdbMeMBTb8OwAAAABJRU5ErkJggg==)
        no-repeat 50%;
    background-size: cover;
}

.page .container .icon_item {
    position: absolute;
    top: 0.34667rem;
    left: 0.21333rem;
    z-index: 99;
    width: 0.58667rem;
    height: 0.58667rem;
}

.page .van-cell {
    padding: 0;
}

.page .van-cell,
.page .van-field__body {
    width: 100%;
    height: 1.28rem;
    background-color: #fff;
}

.page .van-cell,
.page .van-field__body {
    width: 100%;
    height: 1.28rem;
    background-color: #fff;
}

.page .field_code .van-cell input {
    padding-left: 1.22667rem;
    padding-right: 3.2rem;
}

.page .van-cell input {
    height: 1.28rem;
    line-height: 1.28rem;
    padding: 0 0.42667rem;
}

.page .container .mt12 {
    margin-top: 0.32rem;
}

.page .container .lock_icon {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFgAAAAAcITNaAAACPElEQVQ4EbWUy2sTURTGO3HU1qCiSC2IdKV0UankBZPVbJSmJOImbty4cm0XoliErArtv6AUxJ0rF4quROrGPKEVX4sJaBEXRrAkwdY8xt8tPWE6zSR30wuH79zz+O655z5GRg5oGDq88Xj8MnHnXdfdQjbK5fKXYXkDibPZ7BHHcZ4bhjEN0RlkG/mFrGQymeVcLtdF7zsCianMiMViK2TdRBzIV7vd7kn06+ht5FGpVJrvy4oxkJjtz0L0hJjxUCg0XSwWPyoS7Dc6nc4SxIZpmnP5fP6TsvtHyG+QORVPoavt3xFS5UN/BrxBTrHApLL1G4OIL1LUP6r96k+kUlX9CXzn/D6Z72mFbdtmo9GYwxmm4rugIr8P/pYEhfhuAzbED2jXN2L+pNPp197D7BFDOlqv1z+QoKoYQ3SHS+Am5O84zGuSZIrSbDavoE8gh6loUezDkKpdqr5FnJVIJGYKhcKayukRo6sqjyGLlUrlIag9otHoDMEWhzkqSfsOj2p77ZEghapVPJhDXpvo5Li0oiVzhfuIvU7Rk8nkJIf6o1qtfk6lUkfFPgi1iNvt9iWKOg3RhVqtFnjFvAtpEXMgL0h6z3af8kCqXoIgXYt4N9kBh/5qspD3VogtCN/Sju9BTr9dm5g/+LE/Wea06Ljogl7ivxi3CboXiUTEr4PqetrsZoM/RHHsjB5xOBx+xZP+ifUs5Au7fl3YIpAfNL8uCXseg2VZY61W6ypO7b+CStUF2KRVL4X0QPE/4cvKJIjV5skAAAAASUVORK5CYII=)
        no-repeat 50%;
    background-size: cover;
}

.page .container .mt27 {
    margin-top: 0.72rem;
}
</style>
