<template>
  <div class="userManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.fromUid"
              placeholder="请输入发送人UID"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.chatUid"
              placeholder="请输入接收人UID"
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
        prop="id"
        label="ID"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="fromUid"
        label="发送人UID"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="chatUid"
        label="接收人UID"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="类型">
        <template #default="{ row }">
          <el-tag>
            {{ row.chatType | typeMapFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="内容">
        <template #default="{ row }">
          <span v-if="row.dataType == 'text'">{{ row.msg }}</span>
          <el-image
            v-if="row.dataType == 'image'"
            style="width: 100px; height: 100px"
            :src="row.msg"
            :preview-src-list="[row.msg]"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="remoteIp_location"
        label="操作地址"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="createTime"
        label="创建时间"
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
import { kefuList } from '@/api/chat'
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
        fromUid: '',
        chatUid: '',
        chatType: 'kefu',
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
      const data = await kefuList(this.queryForm)
      this.list = data.data.list
      this.total = data.data.total
      typeMap = data.data.dataMap.chatType
      this.dataMap = data.data.dataMap.datatype
    },
  },
}
</script>
