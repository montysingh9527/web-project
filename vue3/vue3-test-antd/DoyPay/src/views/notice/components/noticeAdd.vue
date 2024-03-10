<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model.trim="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          type="textarea"
          v-model.trim="form.content"
          autocomplete="off"
          style="height: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item label="过期时间">
        <el-date-picker
          type="datetime"
          placeholder="过期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="form.expireTime"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="显示状态" prop="isShow">
        <el-radio-group v-model="form.isShow">
          <el-radio label="1">显示</el-radio>
          <el-radio label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="1">普通</el-radio>
          <el-radio label="2">弹窗</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.trim="form.sort" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { noticeAdd, noticeEdit } from '@/api/notice'

export default {
  name: 'NoticeAdd',
  data() {
    return {
      form: {
        title: '',
        content: '',
        isShow: '1',
        type: '1',
        sort: '',
        edit: '',
        expireTime: '',
      },
      rules: {
        title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
        content: [{ required: true, trigger: 'blur', message: '请输入内容' }],
      },
      title: '',
      dialogFormVisible: false,
    }
  },
  created() {},
  methods: {
    showAdd(row) {
      if (row.id) {
        this.title = '修改公告'
        this.edit = true
        this.form = Object.assign({}, row)
      } else {
        this.edit = false
        this.title = '添加公告'
      }
      this.dialogFormVisible = true
    },
    close() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.dialogFormVisible = false
      this.$emit('fetch-data')
    },
    save() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          let data = null
          if (!this.edit) {
            data = await noticeAdd(this.form)
          } else {
            data = await noticeEdit(this.form)
          }
          this.$baseMessage(data.msg, 'success')
          this.$refs['form'].resetFields()
          this.dialogFormVisible = false
          this.$emit('fetch-data')
          this.form = this.$options.data().form
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style>
.el-textarea > .el-textarea__inner {
  height: 200px;
}
</style>
