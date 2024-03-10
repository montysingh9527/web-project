<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="备注" prop="title">
        <el-input v-model.trim="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editCoinLogRemark } from '@/api/goodsList'

export default {
  name: 'orderEdit',
  data() {
    return {
      form: {
        remark: '',
        id: '',
      },
      rules: {
        remark: [{ required: true, trigger: 'blur', message: '请输入备注' }],
      },
      title: '',
      dialogFormVisible: false,
    }
  },
  created() {},
  methods: {
    showEdit(row) {
      this.title = '修改备注'
      this.form.id = row.id
      this.form.remark = row.remark
      console.log('row', row)
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
          data = await editCoinLogRemark(this.form)
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
