<template>
  <div class="userManagement-container">
    <el-form ref="form" :model="copyForm">
      <el-form-item
        :label="item.title"
        v-for="(item, index) in list"
        :key="index"
      >
        <template v-if="item.formTag == 'input'">
          <el-input
            v-if="item.name != 'chat_quick_talk_tpl'"
            v-model="copyForm[item.name]"
            type="text"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
          <el-input
            v-else
            value="暂不支持"
            type="text"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
          <span v-if="item.name == 'chat_quick_talk_tpl'">
            例子：{{ item.value }}
          </span>
        </template>
        <template v-if="item.formTag == 'radio'">
          <el-radio
            v-model="copyForm[item.name]"
            v-for="(value, name, index1) in JSON.parse(item.formValue)"
            :label="name"
            :key="index1"
          >
            {{ value }}
          </el-radio>
        </template>
      </el-form-item>
      <el-button type="primary" @click="save">确 定</el-button>
    </el-form>
  </div>
</template>

<script>
import { getSetting, updateSetting } from '@/api/chat'
import Edit from './components/adminEdit'
import Add from './components/adminAdd'

export default {
  name: 'UserManagement',
  components: { Edit, Add },
  data() {
    return {
      list: null,
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      selectRows: '',
      elementLoadingText: '正在加载...',
      queryForm: {
        page: 1,
        rows: 10,
        username: '',
      },
      tabList: null,
      settings: {},
      copyForm: {},
    }
  },
  filters: {
    typeFilter(status) {
      let typeMap = {
        0: '不在线',
        1: '在线',
      }
      return typeMap[status]
    },
    typeColorFilter(status) {
      let statusColorMap = {
        0: 'info',
        1: 'success',
      }
      return statusColorMap[status]
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    setSelectRows(val) {
      this.selectRows = val
    },
    handleAdd(row) {
      this.$refs['add'].showAdd(row)
    },
    handleEdit(row) {
      this.$refs['edit'].showEdit(row)
    },
    handleOff(row) {
      this.$baseConfirm('你确定要踢此管理员下线吗', null, async () => {
        const data = await doOffline({ usr: row.usr })
        if (data.code == 0) {
          this.$baseMessage(data.msg, 'success')
          this.fetchData()
        }
      })
    },
    handleSizeChange(val) {
      this.queryForm.rows = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.queryForm.page = val
      this.fetchData()
    },
    queryData() {
      this.queryForm.page = 1
      this.fetchData()
    },
    async fetchData() {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 300)
      const { data } = await getSetting()
      this.tabList = data.dataMap
      this.list = data.list
      for (let i in this.list) {
        this.settings[this.list[i].name] = this.list[i].value
      }
      this.copyForm = Object.assign({}, this.settings)
    },
    async save() {
      this.copyForm.chat_quick_talk_tpl = ''
      const { msg } = await updateSetting(this.copyForm)
      this.$baseMessage(msg, 'success')
    },
  },
}
</script>
<style>
.el-form-item__label {
  width: 200px;
  text-align: right;
}
</style>