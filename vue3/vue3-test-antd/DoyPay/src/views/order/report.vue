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
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd"
              placeholder="开始时间"
              v-model="queryForm.addTimeF"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd"
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
        label="日期"
        width="200"
        prop="day"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="有效卖单">
        <template #default="{ row }">
          <el-tag>
            {{ row.sellOrderAmount }}
            <span style="color: #ff0000">({{ row.sellOrderNum }}笔)</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="卖单成功">
        <template #default="{ row }">
          <el-tag>
            {{ row.sellSucAmount }}
            <span style="color: #ff0000">({{ row.sellSucNum }}笔)</span>
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip label="卖单中">
        <template #default="{ row }">
          <el-tag>
            {{ row.tradingAmount }}
            <span style="color: #ff0000">({{ row.tradingNum }}笔)</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="卖单失败">
        <template #default="{ row }">
          <el-tag>
            {{ row.tradeFailAmount }}
            <span style="color: #ff0000">({{ row.tradeFailNum }}笔)</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="打币">
        <template #default="{ row }">
          <el-tag>
            {{ row.transAmount }}
            <span style="color: #ff0000">({{ row.transNum }}笔)</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="有效交易">
        <template #default="{ row }">
          <el-tag>
            {{ row.tradeSucAmount }}
            <span style="color: #ff0000">({{ row.tradeSucNum }}笔)</span>
          </el-tag>
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
    <!-- <table-edit ref="edit"></table-edit> -->
  </div>
</template>

<script>
import { reportList, doDelete } from '@/api/goodsList'
let typeMap = {
  1: '买单',
  2: '卖单',
}
let stateMap = {
  1: '未成交',
  2: '待付款',
  3: '已付款',
  4: '已完成',
  5: '已取消',
}
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
      }
      return statusColorMap[status]
    },
    stateFilter(status) {
      return stateMap[status]
    },
    stateColorFilter(status) {
      const stateColorMap = {
        0: 'info',
        1: '',
        2: 'warning',
        3: 'success',
        4: 'danger',
      }
      return stateColorMap[status]
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
        addTimeT: '',
        addTimeF: '',
      },
      options: [
        {
          value: '1',
          label: '买单',
        },
        {
          value: '2',
          label: '卖单',
        },
      ],
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
        this.$baseConfirm('你确定要取消当前订单吗', null, async () => {
          let { msg } = await doDelete({ id: row.id })
          this.$baseMessage(msg, 'success')
          this.fetchData()
        })
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item.id).join()
          this.$baseConfirm('你确定要删除选中项吗', null, async () => {
            let { msg } = await doDelete({ ids: ids })
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
      const { data } = await reportList(this.queryForm)
      this.list = data.list
      // typeMap = data.dataMap.typeMap
      this.total = data.total
    },
  },
}
</script>
