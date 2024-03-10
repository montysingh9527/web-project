<template>
  <div class="userManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.nickName"
              placeholder="请输入用户名"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
    </vab-query-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column
        show-overflow-tooltip
        prop="uid"
        label="用户ID"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="usr"
        label="用户名"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="nickname"
        label="昵称"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="用户类型">
        <template #default="{ row }">
          <el-tag>
            {{ row.user_type | typeMapFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="update_time"
        label="最后登录时间"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="create_time"
        label="创建时间"
      ></el-table-column>
      <!-- <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button
            v-if="permissions.indexOf('60031') > -1 && row.user_type == 1"
            type="text"
            @click="handleEdit(row)"
          >
            设置为客服
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.page"
      :page-size="queryForm.rows"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { userList, addCustomerService } from '@/api/chat'
import { mapGetters } from 'vuex'

let typeMap = null
export default {
  name: 'RoleManagement',
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
        usr: '',
      },
      dataMap: null,
    }
  },
  filters: {
    typeMapFilter(type) {
      return typeMap[type]
    },
  },
  created() {
    this.fetchData()
  },
  computed: {
    height() {
      return this.$baseTableHeight()
    },
    ...mapGetters({
      permissions: 'user/permissions',
    }),
  },
  methods: {
    setSelectRows(val) {
      this.selectRows = val
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
      const data = await userList(this.queryForm)
      this.list = data.data.list
      this.total = data.data.total
      typeMap = data.data.dataMap.userType
      console.log('typeMap', typeMap)
    },
    handleEdit(row) {
      this.$baseConfirm('你确定将当前账号设为客服吗', null, async () => {
        const { msg } = await addCustomerService({ usr: row.usr, user_type: 2 })
        this.$baseMessage(msg, 'success')
        this.fetchData()
      })
    },
  },
}
</script>
