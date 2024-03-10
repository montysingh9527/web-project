<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    height="auto"
    @close="close"
  >
    <el-tabs tab-position="left">
      <el-tab-pane label="基本设置">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="usr">
            <el-input v-model.trim="form.usr" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机区号" prop="areaCode">
            <el-input
              v-model.trim="form.areaCode"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.trim="form.phone" autocomplete="off" :disabled="permissions.indexOf('100107') < 0"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="form.email" autocomplete="off" :disabled="permissions.indexOf('100107') < 0"></el-input>
          </el-form-item>
          <el-form-item label="会员昵称" prop="nickName">
            <el-input
              v-model.trim="form.nickName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realName">
            <el-input
              v-model.trim="form.realName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="可用余额" prop="balance">
            <el-input
              v-model.trim="form.balance"
              autocomplete="off"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="个性签名" prop="intro">
            <el-input v-model.trim="form.intro" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="save">确 定</el-button>
      </el-tab-pane>
      <el-tab-pane label="余额修改">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="当前余额" prop="balance">
            <el-input
              v-model.trim="form.balance"
              autocomplete="off"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="余额增减">
            <el-input v-model="amount" autocomplete="off"></el-input>
            *注：输入正数即打款，输入负数即扣款
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="remark" autocomplete="off"></el-input>
          </el-form-item>
          <el-button type="primary" @click="changeBalance">确 定</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="登录密码设置">
        <el-form :model="form" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="usr">
            <el-input v-model.trim="form.usr" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="usr">
            <el-input
              type="password"
              v-model.trim="userLoginPwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="changeUserPwd">确 定</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="提款密码设置">
        <el-form :model="form" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="usr">
            <el-input v-model.trim="form.usr" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="usr">
            <el-input
              type="password"
              v-model.trim="userBankPwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="changeUserBankPwd">确 定</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import {
  editUser,
  changeLoginPwd,
  changeFundPwd,
  changeBalanceFun,
} from '@/api/table'
import { mapGetters } from 'vuex'

export default {
  name: 'TableEdit',
  data() {
    return {
      form: {
        title: '',
        author: '',
      },
      rules: {
        title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
        author: [{ required: true, trigger: 'blur', message: '请输入作者' }],
      },
      title: '',
      dialogFormVisible: false,
      userLoginPwd: '',
      userBankPwd: '',
      remark: '',
      amount: '',
      ipList: '',
    }
  },
  created() {},
  computed: {
    ...mapGetters({
      permissions: 'user/permissions',
    }),
  },
  methods: {
    async changeBalance() {
      let d = {
        amount: this.amount,
        remark: this.remark,
        uid: this.form.uid,
      }
      let { msg } = await changeBalanceFun(d)
      this.$baseMessage(msg, 'success')
      this.dialogFormVisible = false
      this.$emit('fetch-data')
      this.amount = ''
      this.remark = ''
    },
    showEdit(row) {
      this.userLoginPwd = ''
      this.title = '会员管理'
      this.form = Object.assign({}, row)
      this.dialogFormVisible = true
    },
    close() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.dialogFormVisible = false
      // this.$emit('fetch-data')
    },
    save() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const { msg } = await editUser(this.form)
          this.$baseMessage(msg, 'success')
          this.$refs['form'].resetFields()
          this.dialogFormVisible = false
          this.$emit('fetch-data')
          this.form = this.$options.data().form
        } else {
          return false
        }
      })
    },
    async changeUserPwd() {
      if (this.userLoginPwd) {
        const { msg } = await changeLoginPwd({
          usr: this.form.usr,
          new_pwd: this.userLoginPwd,
        })
        this.$baseMessage(msg, 'success')
        this.$refs['form'].resetFields()
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      }
    },
    async changeUserBankPwd() {
      if (this.userBankPwd) {
        const { msg } = await changeFundPwd({
          usr: this.form.usr,
          new_pwd: this.userBankPwd,
        })
        this.$baseMessage(msg, 'success')
        this.$refs['form'].resetFields()
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      }
    },
  },
}
</script>
