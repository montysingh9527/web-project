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
            <el-input v-model="queryForm.orderId" placeholder="订单号" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.fromNickName" placeholder="评论人" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.fromUid" placeholder="评论人UID" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.toNickName" placeholder="被评论人" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.toUid" placeholder="被评论人UID" />
          </el-form-item>
          <el-form-item>
            <el-select
              clearable
              v-model="queryForm.score"
              placeholder="评分"
              style="width: 100px"
            >
              <el-option
                v-for="(item, key) in pfarr"
                :key="key"
                :label="item"
                :value="key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              clearable
              v-model="queryForm.orderType"
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
            <el-input v-model="queryForm.content" placeholder="评价" />
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="评分起始时间"
              v-model="queryForm.startDate"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="评分结束时间"
              v-model="queryForm.endDate"
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
        label="订单号"
        width="95"
        prop="orderId"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="fromNickname"
        label="评论人"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="fromUid"
        label="评论人UID"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="toNickname"
        label="被评价会员"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="toUid"
        label="被评价会员UID"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="评分">
        <template #default="{ row }">
          <el-rate disabled v-model="row.score"></el-rate>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="类型">
        <template #default="{ row }">
          <el-tag>
            {{ row.orderType | typeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="content"
        label="评价内容"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="createTime"
        label="时间"
      ></el-table-column>

      <!-- <el-table-column sortable show-overflow-tooltip label="类型">
        <template #default="{ row }">
          <el-tag v-for="(item, index) in row.bankArr" :key="index">
            {{ item.type | typeFilter }}
            {{ item.bankAccount }}
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column show-overflow-tooltip label="操作" width="200px">
        <template #default="{ row }">
          <el-button type="text" @click="delComment(row)">删除评论</el-button>
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
    <table-edit ref="edit"></table-edit>
  </div>
</template>

<script>
import { getCommentList, editComment } from '@/api/table'
import TableEdit from './components/TableEdit'
let typeMap = []
export default {
  name: 'ComprehensiveTable',
  components: {
    TableEdit,
  },
  filters: {
    typeFilter(status) {
      return typeMap[status]
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
        fromNickName: '',
        toNickName: '',
        startDate: '',
        endDate: '',
        content: '',
        score: '',
        orderType: '',
        fromUid: '',
        toUid: '',
      },
      typeMap: '',
      pfarr: [0, 1, 2, 3, 4, 5],
      orderId: '',
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
    async delComment(row) {
      this.$baseConfirm('你确定要删除当前评论吗', null, async () => {
        let { msg } = await editComment({ id: row.id, isCancel: 1 })
        this.$baseMessage(msg, 'success')
        this.fetchData()
      })
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
      const { data } = await getCommentList(this.queryForm)
      this.list = data.list
      typeMap = data.dataMap.orderTypeMap
      this.typeMap = data.dataMap.orderTypeMap
      this.total = data.total
    },
  },
}
</script>
