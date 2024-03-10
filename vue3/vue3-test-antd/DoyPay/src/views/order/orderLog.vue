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
            <el-input v-model="queryForm.nickName" placeholder="会员名" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.uid" placeholder="uid" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.amountF" placeholder="起始金额" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.amountT" placeholder="结束金额" />
          </el-form-item>
          <el-form-item>
            <el-select
              clearable
              v-model="queryForm.type"
              placeholder="类型"
              style="width: 100px"
            >
              <el-option
                v-for="(item, key) in typeMap"
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
              placeholder="开始时间"
              v-model="queryForm.addTimeF"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="结束时间"
              v-model="queryForm.addTimeT"
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
        label="订单号"
        width="95"
        prop="extfield0"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="nickname"
        label="会员名"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="uid"
        label="uid"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="资金"
        prop="coin"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="余额"
        prop="afterCoin"
        width="200"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="创建时间"
        prop="createTime"
        width="200"
      ></el-table-column>
      <el-table-column sortable prop="type" show-overflow-tooltip label="类型">
        <template #default="{ row }">
          <el-tag :type="row.type | typeColorFilter">
            {{ row.type | typeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="备注"
        prop="remark"
        width="200"
      ></el-table-column>
      <!-- <el-table-column
        show-overflow-tooltip
        label="管理员备注"
        prop="adminRemark"
        width="200"
      ></el-table-column> -->
      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button
            type="text"
            v-if="permissions.indexOf('30021') > -1"
            @click="handleEdit(row)"
          >
            编辑备注
          </el-button>
        </template>
      </el-table-column>
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
    <change-operation ref="edit" @fetch-data="fetchData"></change-operation>
  </div>
</template>

<script>
import { coinLogList } from '@/api/goodsList'
import changeOperation from './components/changeOperation'
import { mapGetters } from 'vuex'

let typeMap = ''
export default {
  name: 'tableGoodsList',
  filters: {
    typeFilter(status) {
      return typeMap[status]
    },
    typeColorFilter(status) {
      const statusColorMap = {
        0: 'info',
        1: 'success',
        2: '',
      }
      return statusColorMap[status]
    },
  },
  components: {
    changeOperation,
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
        nickName: '',
        addTimeT: '',
        addTimeF: '',
        amountF: '',
        amountT: '',
        type: '',
        uid: '',
      },
      typeMap: '',
    }
  },
  computed: {
    height() {
      return this.$baseTableHeight()
    },
    ...mapGetters({
      permissions: 'user/permissions',
    }),
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
      const { data } = await coinLogList(this.queryForm)
      this.list = data.list
      typeMap = data.dataMap.typeMap
      this.typeMap = data.dataMap.typeMap
      this.total = data.total
    },
  },
}
</script>
