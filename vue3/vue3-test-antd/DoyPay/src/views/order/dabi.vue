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
          <el-form-item style="width: 100px">
            <el-input v-model="queryForm.buyerNickname" placeholder="买方" />
          </el-form-item>
          <el-form-item style="width: 100px">
            <el-input v-model="queryForm.sellerNickname" placeholder="卖方" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.orderNo" placeholder="订单号" />
          </el-form-item>
          <!-- <el-form-item>
            <el-select
              clearable
              v-model="queryForm.state"
              placeholder="交易类型"
              style="width: 100px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item style="width: 100px">
            <el-input v-model="queryForm.amountF" placeholder="起始金额" />
          </el-form-item>
          <el-form-item style="width: 100px">
            <el-input v-model="queryForm.amountT" placeholder="结束金额" />
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
      <!-- <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        label="ID"
        width="95"
        prop="id"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="orderNo"
        label="订单号"
        width="200"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="买家">
        <template #default="{ row }">
          {{ row.buyerNickname || row.buyerPhone }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="卖家">
        <template #default="{ row }">
          {{ row.sellerNickname || row.sellerPhone }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="金额"
        prop="amount"
        width="80"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="创建时间"
        prop="actionTime"
        width="200"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="完成时间"
        prop="updateTime"
        width="100"
      ></el-table-column>
      <!--  <el-table-column sortable prop="type" show-overflow-tooltip label="类型">
        <template #default="{ row }">
          <el-tag :type="row.type | typeColorFilter">
            {{ row.type | typeFilter }}
          </el-tag>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        sortable
        show-overflow-tooltip
        label="类型"
        prop="payType"
      >
        <template #default="{ row }">
          <el-tag :type="row.payType | typeColorFilter">
            {{ row.payType | payTypeMapFilter }}
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column
        sortable
        prop="state"
        show-overflow-tooltip
        label="订单状态"
      >
        <template #default="{ row }">
          <el-tag :type="row.state | stateColorFilter">
            {{ row.state | stateFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="备注"
        prop="adminRemark"
        width="200"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <!-- <el-button type="text" @click="handleEdit(row)">编辑</el-button> -->
          <el-button
            type="text"
            v-if="permissions.indexOf('30032') > -1"
            @click="handleEdit(row)"
          >
            编辑备注
          </el-button>
          <el-button
            type="text"
            v-if="
              permissions.indexOf('30031') > -1 &&
              row.state != 4 &&
              row.state != 5
            "
            @click="handleDelete(row)"
          >
            取消订单
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
    <order-operation ref="edit" @fetch-data="fetchData"></order-operation>
  </div>
</template>

<script>
import { getTranList, doDelete } from '@/api/goodsList'
import { mapGetters } from 'vuex'
import orderOperation from './components/orderOperation'
let payTypeMap = ''

let typeMap = {
  1: '买单',
  2: '卖单',
}
let stateMap = ''
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
    payTypeMapFilter(status) {
      // return payTypeMap[status]
    },
  },
  components: {
    orderOperation,
  },
  data() {
    return {
      payTypeMap: '',
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
        buyerNickname: '',
        sellerNickname: '',
        type: '1',
        state: '',
        addTimeT: '',
        addTimeF: '',
        amountF: '',
        amountT: '',
        orderNo: '',
      },
      options: [
        {
          value: '1',
          label: '未成交',
        },
        {
          value: '2',
          label: '待付款',
        },
        {
          value: '3',
          label: '已付款',
        },
        {
          value: '4',
          label: '已完成',
        },
        {
          value: '5',
          label: '已取消',
        },
      ],
      stateMap: '',
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
      const { data } = await getTranList(this.queryForm)
      this.list = data.list
      stateMap = data.dataMap.stateMap
      // payTypeMap = data.dataMap.payTypeMap
      this.stateMap = stateMap
      // this.payTypeMap = payTypeMap
      this.total = data.total
    },
  },
}
</script>
