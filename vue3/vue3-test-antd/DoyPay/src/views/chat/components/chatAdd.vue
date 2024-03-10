<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="问题" prop="question">
        <el-input v-model.trim="form.question" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="回答">
        <el-input
          class="answer"
          autocomplete="off"
          style="margin-bottom: 5px"
          placeholder="请输入回答"
          v-for="(item, index, key) in num"
          :key="key"
          v-if="answerNum > index"
          v-model="form.answer[index]"
          @input="change($event)"
        ></el-input>
        <el-button type="primary" style="margin-top: 10px" @click="addAnswer">
          添加
        </el-button>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="1">启用</el-radio>
          <el-radio label="0">禁用</el-radio>
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
import { addChatTemplate, editChatTemplate } from '@/api/chat'

export default {
  name: 'adminAdd',
  data() {
    return {
      form: {
        question: '',
        answer: [],
        status: '1',
      },
      rules: {},
      title: '',
      dialogFormVisible: false,
      answerNum: 1,
      num: 1,
    }
  },
  created() {},
  methods: {
    showAdd(row) {
      console.log('row', row)
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
      /* let answer = document.getElementsByClassName('answer')
      for (let i = 0; i < answer.length; i++) {
        this.answer.push(answer[i].value)
      } */

      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          let data = ''
          if (this.title == '添加') {
            data = await addChatTemplate(this.form)
          } else {
            data = await editChatTemplate(this.form)
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
    addAnswer() {
      this.num++
      this.answerNum++
    },
    change(e) {
      this.$forceUpdate()
    },
  },
}
</script>
