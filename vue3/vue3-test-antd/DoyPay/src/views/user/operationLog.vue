<template>
  <div class="table-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.uid" placeholder="uid" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.nickName" placeholder="会员名" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.realName" placeholder="真实姓名" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.ip" placeholder="IP" />
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="queryForm.type"
              placeholder="操作类型"
              style="width: 200px"
              clearable
            >
              <el-option
                v-for="(item, key) in statusMap"
                :key="key"
                :label="item"
                :value="key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="操作起始时间"
              v-model="queryForm.actionTimeStart"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="操作结束时间"
              v-model="queryForm.actionTimeEnd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      :height="height"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="ID"
        width="95"
        prop="id"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="uid"
        label="uid"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="nickName"
        label="会员名"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="realName"
        label="真实姓名"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="IP"
        prop="ip"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="操作地址"
        prop="ip_location"
      ></el-table-column>
      <!-- <el-table-column
        sortable
        prop="type"
        show-overflow-tooltip
        label="操作类型"
      >
        <template #default="{ row }">
          <el-tag>
            {{ row.type | statusFilter }}
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        label="操作详情"
        prop="detail"
        width="400"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="操作时间"
        prop="createTime"
        width="200"
      ></el-table-column>
      <!--  <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.page"
      :layout="layout"
      :page-size="queryForm.rows"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <table-edit ref="edit"></table-edit>
  </div>
</template>

<script>
import { operationLogList, doDelete } from '@/api/table'
import TableEdit from './components/TableEdit'
let statusMap = []
export default {
  name: 'ComprehensiveTable',
  components: {
    TableEdit,
  },
  filters: {
    statusFilter(status) {
      return statusMap[status]
    },
  },
  data() {
    return {
      imgShow: true,
      list: [],
      imageList: [],
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      background: true,
      selectRows: '',
      elementLoadingText: '正在加载...',
      queryForm: {
        page: 1,
        rows: 20,
        usr: '',
        type: '',
        ip: '',
        actionTimeStart: '',
        actionTimeEnd: '',
        uid: '',
        nickName: '',
        realName: '',
      },
      statusMap: '',
    }
  },
  computed: {
    height() {
      return this.$baseTableHeight()
    },
  },
  created() {
    this.fetchData()
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    tableSortChange() {
      const imageList = []
      this.$refs.tableSort.tableData.forEach((item, index) => {
        imageList.push(item.img)
      })
      this.imageList = imageList
    },
    setSelectRows(val) {
      this.selectRows = val
    },
    handleAdd() {
      this.$refs['edit'].showEdit()
    },
    handleEdit(row) {
      this.$refs['edit'].showEdit(row)
    },
    handleDelete(row) {
      if (row.id) {
        this.$baseConfirm('你确定要删除当前项吗', null, async () => {
          const { msg } = await doDelete({ ids: row.id })
          this.$baseMessage(msg, 'success')
          this.fetchData()
        })
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item.id).join()
          this.$baseConfirm('你确定要删除选中项吗', null, async () => {
            const { msg } = await doDelete({ ids: ids })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          this.$baseMessage('未选中任何行', 'error')
          return false
        }
      }
    },
    handleSizeChange(val) {
      this.queryForm.rows = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.queryForm.page = val
      this.fetchData()
    },
    handleQuery() {
      this.queryForm.page = 1
      this.fetchData(this.queryForm)
    },
    async fetchData() {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 500)
      const { data } = await operationLogList(this.queryForm)
      this.list = data.list
      statusMap = data.dataMap.typeMap
      this.statusMap = data.dataMap.typeMap
      // const imageList = []
      // data.forEach((item, index) => {
      //   imageList.push(item.img)
      // })
      // this.imageList = imageList
      this.total = data.total
    },
  },
}
</script>
