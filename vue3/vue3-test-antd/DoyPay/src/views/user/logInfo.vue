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
              clearable
              v-model="queryForm.isMobileDevices"
              placeholder="设备"
              style="width: 100px"
            >
              <el-option
                v-for="(item, key) in deviceMap"
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
              placeholder="登录起始时间"
              v-model="queryForm.loginTimeStart"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="登录结束时间"
              v-model="queryForm.loginTimeEnd"
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
        label="登录IP"
        prop="loginIP"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="登录地址"
        prop="loginIP_location"
      ></el-table-column>
      <el-table-column
        sortable
        prop="isMobileDevices"
        show-overflow-tooltip
        label="设备"
      >
        <template #default="{ row }">
          {{ row.isMobileDevices | deviceMapFilter }}
        </template>
      </el-table-column>
      <!-- <el-table-column
        sortable
        prop="isOnLine"
        show-overflow-tooltip
        label="状态"
      >
        <template #default="{ row }">
          <el-tag :type="row.isOnLine | statusFilterColort">
            {{ row.isOnLine | statusFilter }}
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        label="最近登录时间"
        prop="loginTime"
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
import { loginList, doDelete } from '@/api/table'
import TableEdit from './components/TableEdit'
let deviceMap = ''
export default {
  name: 'ComprehensiveTable',
  components: {
    TableEdit,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '不在线',
        1: '在线',
      }
      return statusMap[status]
    },
    statusFilterColort(status) {
      const statusColorMap = {
        0: 'info',
        1: 'success',
      }
      return statusColorMap[status]
    },
    deviceMapFilter(status) {
      return deviceMap[status]
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
        rows: 10,
        nickName: '',
        uid: '',
        realName: '',
        loginTimeEnd: '',
        loginTimeStart: '',
        isMobileDevices: '',
      },
      deviceMap: '',
      realName: '',
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
      const { data } = await loginList(this.queryForm)
      this.list = data.list
      deviceMap = data.dataMap.deviceMap
      this.deviceMap = data.dataMap.deviceMap
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
