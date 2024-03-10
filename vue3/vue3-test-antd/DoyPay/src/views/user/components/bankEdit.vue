<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item2, idx) in tabArray"
        :label="item2.name"
        :key="idx"
        v-if="bankData[idx].data.length > 0"
      >
        <div v-for="(item, index) in bankData[idx].data" :key="index">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="80px"
            v-if="item.type == 1"
          >
            <el-form-item
              label="姓名"
              prop="bank_card"
              style="width: 160px; display: inline-block"
            >
              <el-input
                v-model="item.bankRealName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="银行名称"
              prop="bank_id"
              clearable
              style="width: 220px; display: inline-block"
            >
              <el-select
                v-model="item.bankId"
                placeholder="请选择银行"
                filterable
                clearable
              >
                <el-option
                  v-for="item in banklist"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="账号"
              prop="bank_card"
              style="width: 300px; display: inline-block"
            >
              <el-input
                v-model="item.bankAccount"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-button
              type="danger"
              @click="delBank(item)"
              style="margin-left: 10px"
            >
              删除账号
            </el-button>
            <el-divider></el-divider>
          </el-form>

          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="80px"
            v-if="item.type == 2 || item.type == 3"
          >
            <el-form-item
              label="姓名"
              prop="bank_card"
              style="width: 160px; display: inline-block; float: left"
            >
              <el-input
                v-model="item.bankRealName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="二维码"
              prop="bank_card"
              style="width: 160px; display: inline-block"
            >
              <el-image
                style="width: 100px; height: 100px"
                :src="item.bankQRCode"
              ></el-image>
              <el-upload
                action=""
                :show-file-list="false"
                :http-request="
                  (res, file, filelist) => {
                    return resolveQR(res, file, filelist, item)
                  }
                "
              >
                <el-button type="success">修改</el-button>
              </el-upload>
            </el-form-item>
            <el-divider></el-divider>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editBank, getBank, delBank } from '@/api/table'
import { getQrUrl } from '@/utils/qrCode'
export default {
  name: 'TableEdit',
  data() {
    return {
      form: {},
      rules: {
        title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
        author: [{ required: true, trigger: 'blur', message: '请输入作者' }],
      },
      title: '',
      dialogFormVisible: false,
      idx: 0,
      bank_card: '',
      bank_id: '',
      banklist: '',
      imageUrl: '',
      isChangeImg: false,
      newQrCode: '',
      fileUrl: '',
      bankId: '',
      tabArray: [
        { name: '银行卡', idx: 1 },
        { name: '支付宝', idx: 2 },
        { name: '微信', idx: 3 },
        { name: '虚拟币', idx: 4 },
      ],
      bankData: [
        {
          name: '银行卡',
          data: [],
        },
        {
          name: '支付宝',
          data: [],
        },
        {
          name: '微信',
          data: [],
        },
        {
          name: '虚拟币',
          data: [],
        },
      ],
      tempObj: '',
    }
  },
  filters: {
    typeFilter(i) {
      var data = {
        1: '银行卡',
        2: '支付宝',
        3: '微信',
        4: '虚拟币',
      }
      return data[i]
    },
  },
  created() {
    this.getBank()
  },
  methods: {
    resolveQR(event, file, filelist, item) {
      console.log('event, file, filelist', event, file, filelist)
      const result = getQrUrl(event.file)
      result
        .then((res) => {
          if (res.data) {
            item.bankQRCode = res.data
            item.bank_qrcode = res.data
            this.$message.success('识别二维码成功!')
          } else {
            this.$message.error('识别二维码失败, 请重新上传')
          }
        })
        .catch((err) => {
          this.$message.error(JSON.stringify(err))
        })
    },
    showEdit(row) {
      this.bankData = [
        {
          name: '银行卡',
          data: [],
        },
        {
          name: '支付宝',
          data: [],
        },
        {
          name: '微信',
          data: [],
        },
        {
          name: '虚拟币',
          data: [],
        },
      ]
      this.isChangeImg = false

      if (!row) {
        this.title = '添加'
      } else {
        this.title = '编辑'
        this.form = Object.assign({}, row)
        for (let item of this.form.bankArr) {
          this.bankData[item.type - 1].data.push(item)
        }
      }
      this.bankId = this.form.bankArr[0].bankId
      this.dialogFormVisible = true
    },
    async getBank() {
      let { data } = await getBank({ type: 1, isDelete: 0 })
      this.banklist = data.list
    },
    close() {
      this.dialogFormVisible = false
      this.$emit('fetch-data')
    },
    async save() {
      let bankArray = []
      for (let item of this.bankData) {
        if (item.data.length > 0) {
          for (let item2 of item.data) {
            bankArray.push({
              bank_id: item2.bankId,
              bank_card: item2.bankAccount,
              owner_name: item2.bankRealName,
              id: item2.id,
              bank_qrcode: item2.bank_qrcode,
            })
          }
        }
      }
      const { msg } = await editBank({ bankArray: bankArray })
      this.$baseMessage(msg, 'success')
      this.dialogFormVisible = false
      this.$emit('fetch-data')
    },
    handleClick(tab, event) {
      this.idx = tab.index
      this.bankId = this.form.bankArr[this.idx].bankId
    },
    async delBank(row) {
      let { msg } = await delBank({ id: row.id })
      this.$baseMessage(msg, 'success')
      this.dialogFormVisible = false
      this.$emit('fetch-data')
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
  },
}
</script>
