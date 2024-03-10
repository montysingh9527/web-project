<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <!-- <el-form-item label="旧密码" prop="old_pwd">
        <el-input
          v-model.trim="form.old_pwd"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="新密码" prop="new_pwd">
        <el-input
          v-model.trim="form.new_pwd"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from '@/api/adminList'

  export default {
    name: 'adminEdit',
    data() {
      return {
        form: {
          // old_pwd: '',
          new_pwd: '',
          uid:''
        },
        rules: {
          old_pwd: [
            { required: true, trigger: 'blur', message: '请输入旧密码' },
          ],
          new_pwd: [
            { required: true, trigger: 'blur', message: '请输入新密码' },
          ],
        },
        title: '',
        dialogFormVisible: false,
  
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        this.title = '编辑'
        this.form.uid = row.uid;
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const data = await doEdit(this.form)
            if(data.code == 0) {
              this.$emit('fetch-data')
              this.close()
            }
            this.$baseMessage(data.msg, 'success')
          } else {
            return false
          }
        })
      },
    },
  }
</script>
