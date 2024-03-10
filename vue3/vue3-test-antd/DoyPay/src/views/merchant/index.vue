<template>
  <div class="userManagement-container">
    <!-- <el-avatar size="large" :src="info.avatarUrl"></el-avatar>
    <p>账户余额{{ info.balance }}</p>
    <p>最近登录时间{{ info.lastLogin }}</p>
    <p>注册时间{{ info.regTime }}</p> -->
  </div>
</template>

<script>
import { merchantInfo } from '@/api/merchant'
import { mapGetters } from 'vuex'

let role
export default {
  name: 'UserManagement',
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
        name: '',
      },
      info: '',
    }
  },
  computed: {
    ...mapGetters({
      usr: 'user/usr',
    }),
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
    roleFilter(status) {
      for (var item of role) {
        if (status == item.id) {
          return item.name
        }
      }
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
      const { data } = await merchantInfo({ usr: this.usr })
      this.info = data
    },
  },
}
</script>
