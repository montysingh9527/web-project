<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名" prop="usr" v-if="!isEdit">
        <el-input v-model.trim="form.usr" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" v-if="!isEdit">
        <el-input
          v-model.trim="form.pwd"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model.trim="form.remark" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="roleId">
        <el-radio-group v-model="form.roleId">
          <el-radio
            v-for="(item, index) in role"
            :label="item.id"
            :key="index"
            v-if="item.isSystem != 1"
          >
            {{ item.name }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { doAdd, editAdmin } from '@/api/adminList'

export default {
  name: 'adminAdd',
  data() {
    return {
      form: {
        usr: '',
        pwd: '',
        name: '',
        remark: '',
        roleId: [],
      },
      rules: {
        usr: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        pwd: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        name: [{ required: true, trigger: 'blur', message: '请输入姓名' }],
        roleId: [{ required: true, trigger: 'blur', message: '请选择权限' }],
      },
      title: '',
      dialogFormVisible: false,
      isEdit: '',
    }
  },
  props: ['role'],
  created() {},
  methods: {
    showAdd(row) {
      if (!row) {
        this.title = '添加'
        this.isEdit = false
      } else {
        this.title = '编辑'
        this.form = Object.assign({}, row)
        this.isEdit = true
      }
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
          let data = ''
          if (this.isEdit) {
            data = await editAdmin(this.form)
          } else {
            data = await doAdd(this.form)
          }
          if (data.code == 0) {
            this.$baseMessage(data.msg, 'success')
            this.$emit('fetch-data')
            this.close()
          }
        } else {
          return false
        }
      })
    },
  },
}
</script>
