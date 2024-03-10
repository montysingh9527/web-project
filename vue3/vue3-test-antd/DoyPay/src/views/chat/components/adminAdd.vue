<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="usr">
        <el-input v-model.trim="form.usr" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
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
          <el-radio label="1">超级管理员</el-radio>
          <el-radio label="2">前端</el-radio>
          <el-radio label="3">后端</el-radio>
        </el-radio-group>
        <!-- <el-tree
          :data="tree"
          show-checkbox
          node-key="id"
          ref="tree"
          >
        </el-tree> -->
      </el-form-item>
    </el-form>
    
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doAdd } from '@/api/adminList'

  export default {
    name: 'adminAdd',
    data() {
      return {
        form: {
          usr: '',
          pwd: '',
          name: '',
          remark:'',
          roleId: [],
        },
        rules: {
          usr: [
            { required: true, trigger: 'blur', message: '请输入用户名' },
          ],
          pwd: [
            { required: true, trigger: 'blur', message: '请输入密码' },
          ],
          name: [{ required: true, trigger: 'blur', message: '请输入姓名' }],
          roleId: [
            { required: true, trigger: 'blur', message: '请选择权限' },
          ],
        },
        title: '',
        dialogFormVisible: false,
        tree:  [{
          id: 1,
          label: '会员管理',
          children: [{
            id: 1001,
            label: '会员列表',
            children: [{
              id: 10011,
              label: '编辑'
            }, {
              id: 10012,
              label: '银行'
            }, {
              id: 10013,
              label: '登出'
            }, {
              id: 10014,
              label: '删除'
            }]
          }]
        }, {
          id: 2,
          label: '角色设置',
          children: [{
            id: 2001,
            label: '管理员',
            children: [{
              id: 20011,
              label: '新建'
            }, {
              id: 20012,
              label: '编辑'
            }, {
              id: 20013,
              label: '禁用'
            }, {
              id: 20014,
              label: '删除'
            }]
          }]
        }]
      }
    },
    created() {},
    methods: {
      showAdd(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
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
            const data = await doAdd(this.form)
            if(data.code == 0) {
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
