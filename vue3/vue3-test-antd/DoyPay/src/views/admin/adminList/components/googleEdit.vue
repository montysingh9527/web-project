<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <!-- <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1（扫码绑定谷歌验证码）"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps> -->
    <div>
      <div v-if="!isEdit">
        <div>第一步：手机下载Google身份验证器（Google Authenticator）</div>
        （1）iPhone：打开App Store，搜索“Google身份验证器”或“Google
        Authenticator”，安装
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
          第三步：输入Google身份验证器的验证码（6位数字），绑定成功后，请刷新浏览器
        </div>
      </div>

      <el-input v-model="code" placeholder="请输入谷歌验证码" width="100px;" />
    </div>
    <div v-if="active == 1">321</div>
    <!-- <el-button style="margin-top: 12px" @click="next">绑定</el-button> -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
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
    }
  },
  created() {},
  computed: {
    ...mapGetters({
      usr: 'user/usr',
    }),
  },
  mounted() {},
  methods: {
    showGoogle(row) {
      this.form = Object.assign({}, row)
      let s = ''
      if (row.gaSecret) {
        s = row.gaSecret.split(',')[1]
      } else {
        s = row.gaSecret
      }
      if (s == 1) {
        this.title = '解除谷歌验证码(已绑定)'
        this.isEdit = true
      } else {
        this.getCaptcha({ action: 'gen', usr: row.usr })
        this.isEdit = false
        this.title = '添加谷歌验证码'
      }
      this.dialogFormVisible = true
    },
    close() {
      // this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.dialogFormVisible = false
    },
    save() {
      if (!this.isEdit) {
        this.setCaptcha({ action: 'bind', code: this.code, usr: this.form.usr })
      } else {
        this.setCaptcha({
          action: 'unbind',
          code: this.code,
          usr: this.form.usr,
        })
      }
      this.dialogFormVisible = false
      // if (this.active++ > 2) this.active = 0
    },
    async getCaptcha(params) {
      console.log(this.form.usr, this.usr)
      let data = ''
      if (this.form.usr == this.usr) {
        data = await editMyGaCaptcha(params)
      } else {
        data = await editOtherGaCaptcha(params)
      }
      this.qrcode = data.data.qrcode
      this.secret = data.data.secret
    },
    async setCaptcha(params) {
      console.log(this.form.usr, this.usr)
      let data = ''
      if (this.form.usr == this.usr) {
        data = await editMyGaCaptcha(params)
      } else {
        data = await editOtherGaCaptcha(params)
      }
      this.$baseMessage(data.msg, 'success')
      this.$emit('fetch-data')
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
