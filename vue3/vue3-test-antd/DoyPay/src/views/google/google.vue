<template>
  <div style="width: 700px; margin: 30px auto">
    <h2 style="text-align: center">绑定谷歌验证码</h2>
    <div>
      <div>第一步：手机下载Google身份验证器（Google Authenticator）</div>
      （1）iPhone：打开App Store，搜索“Google身份验证器”或“Google
      Authenticator”，安装。
      <br />
      （2）安卓：扫描以下二维码下载
      <br />
      <img
        src="https://center001.fhptbet.net/lib/phpqrcode/image.php?url=http://center001.fhptbet.net/lib/google_authenticator/ga_android.php"
        style="width: 93px; height: 93px"
      />
      <div style="margin-top: 20px">
        第二步：打开手机上的Google身份验证器，并输入验证码
        {{ secret }} ，或扫描以下二维码
      </div>

      <img :src="qrcode" style="width: 93px; height: 93px" />
      <div style="margin-top: 20px; margin-bottom: 10px">
        第三步：输入Google身份验证器的验证码（6位数字），绑定成功后，会自动跳转至主页面
      </div>
    </div>
    <el-input
      v-model="code"
      placeholder="请输入谷歌验证码"
      width="100px;"
      style="margin: 10px 0"
    />
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save" :loading="loading">
        确 定
      </el-button>
    </div>
  </div>
</template>

<script>
import { editMyGaCaptcha, editOtherGaCaptcha } from '@/api/adminList'
import { mapGetters } from 'vuex'

export default {
  name: 'adminAdd',
  data() {
    return {
      form: {},
      isEdit: false,
      title: '',
      dialogFormVisible: false,
      active: 0,
      qrcode: '',
      secret: '',
      code: '',
      loading: false,
    }
  },
  created() {},
  computed: {
    ...mapGetters({
      usr: 'user/usr',
    }),
  },
  mounted() {
    this.showGoogle()
  },
  methods: {
    showGoogle(row) {
      this.getCaptcha({ action: 'gen', usr: this.usr })
      this.isEdit = false
    },
    close() {
      this.form = this.$options.data().form
      this.dialogFormVisible = false
    },
    save() {
      if (!this.isEdit) {
        this.setCaptcha({ action: 'bind', code: this.code, usr: this.usr })
      } else {
        this.setCaptcha({
          action: 'unbind',
          code: this.code,
          usr: this.usr,
        })
      }
      this.dialogFormVisible = false
    },
    async getCaptcha(params) {
      let data = ''
      data = await editMyGaCaptcha(params)
      this.qrcode = data.data.qrcode
      this.secret = data.data.secret
    },
    async setCaptcha(params) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 3000)
      let data = ''
      if (this.usr == this.usr) {
        data = await editMyGaCaptcha(params)
      } else {
        data = await editOtherGaCaptcha(params)
      }
      if (data.code == 0) {
        this.$router.push('/index').catch(() => {})
      }
      this.$baseMessage(data.msg, 'success')
      this.code = ''
    },
  },
}
</script>
<style>
.el-cascader-menu__wrap {
  min-height: 300px;
}
</style>
