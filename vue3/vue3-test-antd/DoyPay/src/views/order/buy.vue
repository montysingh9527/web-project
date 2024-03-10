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
            <el-input v-model="queryForm.buyerUid" placeholder="买方UID" />
          </el-form-item>
          <el-form-item style="width: 100px">
            <el-input v-model="queryForm.sellerNickname" placeholder="卖方" />
          </el-form-item>
          <el-form-item style="width: 100px">
            <el-input v-model="queryForm.sellerUid" placeholder="卖方UID" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.orderNo" placeholder="订单号" />
          </el-form-item>
          <el-form-item>
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
          </el-form-item>
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
      <el-table-column
        show-overflow-tooltip
        label="ID"
        width="60"
        prop="id"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="orderNo"
        label="订单号"
        width="180"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="买家" width="70">
        <template #default="{ row }">
          {{ row.buyerNickname || row.buyerPhone }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="买家UID"
        prop="buyerUid"
        width="80"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="卖家" width="70">
        <template #default="{ row }">
          {{ row.sellerNickname || row.sellerPhone }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="卖家UID"
        prop="sellerUid"
        width="80"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="金额"
        prop="amount"
        width="80"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="用户备注"
        prop="remark"
        width="150"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="管理员备注"
        prop="adminRemark"
        width="150"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="创建时间"
        prop="createTime"
        width="160"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="剩余时间(秒)"
        prop="leftTime"
        width="100"
      ></el-table-column>
      <!-- <el-table-column
        show-overflow-tooltip
        label="类型"
        prop="bankTypeStr"
        width="100"
      ></el-table-column> -->
      <el-table-column
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
      </el-table-column>
      <el-table-column sortable show-overflow-tooltip label="订单状态" prop="state">
        <template #default="{ row }">
          <el-tag :type="row.state | stateColorFilter">
            {{ row.state | stateFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip label="操作" width="200px">
        <template #default="{ row }">
          <!-- <el-button type="text" @click="handleEdit(row)">编辑</el-button> -->
          <el-button
            type="text"
            v-if="permissions.indexOf('30012') > -1"
            @click="handleEdit(row)"
          >
            编辑备注
          </el-button>
          <!-- <el-button
            type="text"
            v-if="
              permissions.indexOf('30011') > -1 &&
              row.state != 4 &&
              row.state != 5
            "
            @click="handleDelete(row)"
          >
            取消订单
          </el-button> -->

          <el-button
            type="text"
            v-if="row.state != 4 && row.state != 5"
            @click="showAction(row)"
          >
            订单处理
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

    <el-dialog title="订单处理" :visible.sync="outerVisible" width="40%">
      <el-dialog
        width="30%"
        title="温馨提示"
        :visible.sync="innerVisible"
        append-to-body>
      你确认要 {{innerTitle}}?
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmOrder()">确认</el-button>
      </div>
      </el-dialog>
      {{actionOrderInfo.buyerNickname}}(#{{actionOrderInfo.buyerUid}}) 从 {{actionOrderInfo.sellerNickname}}(#{{actionOrderInfo.sellerUid}})处购买了 {{actionOrderInfo.amount}} DOY币，由于 已付款未确认 导致交易未完成

      <div slot="footer" class="dialog-footer">
        <el-button  @click="outerVisible = false">取消</el-button>
        <el-button  type="success" @click="changeOrder(1)">退币给卖方</el-button>
        <el-button type="primary" @click="changeOrder(2)">打币给买方</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getbuyList, doDelete, editOrderRemark,handleOrder } from '@/api/goodsList'
import { mapGetters } from 'vuex'
import orderOperation from './components/orderOperation'

let typeMap = {
  1: '买单',
  2: '卖单',
}
let stateMap = ''
let payTypeMap = ''
export default {
  name: 'tableGoodsList',
  filters: {
    typeFilter(status) {
      return typeMap[status]
    },
    payTypeMapFilter(status) {
      return payTypeMap[status]
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
  components: {
    orderOperation,
  },
  data() {
    return {
      innerTitle:'',
      payTypeMap: '',
      stateMap: '',
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
        type: '',
        state: '',
        addTimeT: '',
        addTimeF: '',
        amountF: '',
        amountT: '',
        orderNo: '',
        buyerUid: '',
        sellerUid: '',
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
      outerVisible: false,
      innerVisible: false,
      actionOrderInfo:'',
      innerState:''
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
    changeOrder(state) {
      if(state == 1) {
        this.innerTitle = '退币给 卖方'
      }else{
        this.innerTitle = '打币给 买方'
      }
      this.innerState = state;
      this.innerVisible = true;
    },
    async confirmOrder() {
      let { msg} = await handleOrder({id:this.actionOrderInfo.id,action:this.innerState})
      this.outerVisible = false
      this.innerVisible = false;
      this.$baseMessage(msg, 'success')
      this.fetchData()
    },
    showAction(row) {
      this.actionOrderInfo = row;
      this.outerVisible = true
    },
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
      const { data } = await getbuyList(this.queryForm)
      this.list = data.list
      stateMap = data.dataMap.stateMap
      payTypeMap = data.dataMap.payTypeMap
      this.stateMap = stateMap
      this.payTypeMap = stateMap
      this.total = data.total
    },
  },
}
</script>
