<template>
  <div class="userManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.usr"
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
        label="uid"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="usr"
        label="用户名"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="loginIP"
        label="登录IP"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="loginIP_location"
        label="登录地址"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="loginTime"
        label="登录时间"
      ></el-table-column>
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
import { getAdminLogin } from '@/api/adminLog'
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
      const data = await getAdminLogin(this.queryForm)
      this.list = data.data.list
      this.total = data.data.total
      // typeMap = data.data.dataMap.typeMap
    },
  },
}
</script>
