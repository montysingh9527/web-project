<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    height="auto"
    @close="close"
  >
    <el-row>
      <el-col :span="4">
        <el-avatar size="large" :src="info.avatarUrl"></el-avatar>
      </el-col>
      <el-col :span="20">
        <el-tabs v-model="activeName">
          <el-tab-pane label="商户信息" name="first">
            <p>账户余额：{{ info.balance }}</p>
            <p>最近登录时间：{{ info.lastLogin }}</p>
            <p>注册时间：{{ info.regTime }}</p>
          </el-tab-pane>
          <el-tab-pane
            label="修改白名单/汇率"
            name="second"
            v-if="permissions.indexOf('100103') > -1"
          >
            <el-form ref="form" :model="form">
              <el-form-item label="商户后台IP白名单：">
                <el-input
                  type="textarea"
                  v-model="form.ipControlList"
                ></el-input>
              </el-form-item>
              <el-checkbox true-label="1" false-label="0" v-model="form.rateSw">
                <el-form-item label="自定义费率：">
                  <el-input
                    v-model="form.rate"
                    autocomplete="off"
                    style="width: 100px"
                  >
                    <i
                      slot="suffix"
                      style="
                        font-style: normal;
                        margin-right: 10px;
                        color: #000;
                      "
                    >
                      %
                    </i>
                  </el-input>
                </el-form-item>
              </el-checkbox>
            </el-form>
            <el-button type="primary" @click="userEditMer">
                保存修改
              </el-button>
          </el-tab-pane>
          <el-tab-pane
            label="解除IP限制"
            name="third"
            v-if="permissions.indexOf('100104') > -1"
          >
            <el-table :data="ipList" style="width: 100%">
              <el-table-column prop="ip" label="IP"></el-table-column>
              <el-table-column show-overflow-tooltip label="操作">
                <template #default="{ row }">
                  <el-button
                    type="primary"
                    v-if="row.num > 10"
                    @click="userCancelMerLoginLimit(row)"
                  >
                    解除限制
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {
  editUser,
  editMer,
  cancelMerLoginLimit,
  getMerLoginLimitList,
} from '@/api/table'
import { merchantInfo } from '@/api/merchant'
import { mapGetters } from 'vuex'

export default {
  name: 'TableEdit',
  data() {
    return {
      form: {
        ipControlList: '',
        rate: '',
        rateSw:''
      },
      rules: {
        title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
        author: [{ required: true, trigger: 'blur', message: '请输入作者' }],
      },
      title: '',
      dialogFormVisible: false,
      userLoginPwd: '',
      userBankPwd: '',
      info: '',
      cancleIp: '',
      activeName: 'first',
      ipList: [],
    }
  },
  created() {},
  methods: {
    showEdit(row) {
      this.title = '商户信息'
      this.form = Object.assign({}, row)
      this.dialogFormVisible = true
      this.getInf(row)
      this.getIpList(row)
    },
    close() {
      this.dialogFormVisible = false
    },
    save() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const { msg } = await editUser(this.form)
          this.$baseMessage(msg, 'success')
          this.$refs['form'].resetFields()
          this.dialogFormVisible = false
          this.$emit('fetch-data')
        } else {
          return false
        }
      })
    },
    async getInf(row) {
      let data = await merchantInfo({ usr: row.usr })
      this.info = data.data
      this.form.rateSw = this.info.rateSw
      this.form.ipControlList = this.info.ipControlList
      this.form.rate = this.info.rate
    },
    async userEditMer() {
      let { msg } = await editMer(this.form)
      this.$baseMessage(msg, 'success')
    },
    async userCancelMerLoginLimit(row) {
      let { msg } = await cancelMerLoginLimit({
        ip: row.ip,
        usr: this.form.usr,
      })
      this.getIpList(row)
      this.$baseMessage(msg, 'success')
      this.cancleIp = ''
    },
    async getIpList() {
      let { data } = await getMerLoginLimitList({ usr: this.form.usr })
      this.ipList = data || []
    },
  },
  mounted() {},
  computed: {
    ...mapGetters({
      permissions: 'user/permissions',
    }),
  },
}
</script>
<style scoped>
.el-avatar {
  width: 90px;
  height: 90px;
  margin-top: 12px;
}
</style>