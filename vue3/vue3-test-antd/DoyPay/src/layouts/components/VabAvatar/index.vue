<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown">
      <img class="user-avatar" :src="avatar" alt="" />
      <div class="user-name">
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="showPwd" divided>修改密码</el-dropdown-item>
      <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
    </el-dropdown-menu>

    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      width="30%"
    >
      <el-form ref="pwdform" :model="form">
        <el-form-item
          prop="old_pwd"
          label="旧密码"
          :label-width="formLabelWidth"
        >
          <el-input
            type="password"
            v-model="form.old_pwd"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="new_pwd"
          label="新密码"
          :label-width="formLabelWidth"
        >
          <el-input
            type="password"
            v-model="form.new_pwd"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="confirm_pwd"
          label="确认新密码"
          :label-width="formLabelWidth"
        >
          <el-input
            type="password"
            v-model="form.confirm_pwd"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd()">确 定</el-button>
      </div>
    </el-dialog>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
import { recordRoute } from '@/config'
import { chagnePwd } from '@/api/user'
export default {
  name: 'VabAvatar',
  computed: {
    ...mapGetters({
      avatar: 'user/avatar',
      username: 'user/username',
    }),
  },
  data() {
    return {
      formLabelWidth: '100px',
      form: {
        old_pwd: '',
        new_pwd: '',
        confirm_pwd: '',
      },
      dialogFormVisible: false,
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.logout()
          break
        case 'showPwd':
          this.showPwd()
          break
      }
    },
    showPwd() {
      this.dialogFormVisible = true
    },
    async changePwd() {
      if (this.form.new_pwd != this.form.confirm_pwd) {
        this.$message.error('新两次输入密码不一致')
        return false
      }
      let { data, msg, code } = await chagnePwd(this.form)
      this.$message({
        message: msg,
        type: 'success',
      })
      if (code == 0) {
        this.$refs['pwdform'].resetFields()
        this.dialogFormVisible = false
      }
    },
    logout() {
      this.$baseConfirm(
        '您确定要退出' + this.$baseTitle + '吗?',
        null,
        async () => {
          await this.$store.dispatch('user/logout')
          if (recordRoute) {
            const fullPath = this.$route.fullPath
            this.$router.push(`/login?redirect=${fullPath}`)
          } else {
            this.$router.push('/login')
          }
        }
      )
    },
  },
}
</script>
<style lang="scss" scoped>
.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 50px;
  padding: 0;

  .user-avatar {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
  }

  .user-name {
    position: relative;
    margin-left: 5px;
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>
