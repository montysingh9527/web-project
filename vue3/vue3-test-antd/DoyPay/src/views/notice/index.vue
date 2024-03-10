<template>
  <div class="table-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button
          icon="el-icon-plus"
          type="primary"
          @click="handleAdd"
          v-if="permissions.indexOf('50011') > -1"
        >
          添加
        </el-button>
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
        prop="id"
        label="ID"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="title"
        label="标题"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="内容"
        prop="content"
        width="500px"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="类型">
        <template #default="{ row }">
          <el-tag :type="row.type | onlineFilterColort">
            {{ row.type | typeMapFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="是否显示">
        <template #default="{ row }">
          <el-tag :type="row.isShow | onlineFilterColort">
            {{ row.isShow | showMapFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="排序"
        prop="sort"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="添加时间"
        prop="createTime"
        width="200"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="过期时间"
        prop="expireTime"
        width="200"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button
            type="text"
            @click="handleAdd(row)"
            v-if="permissions.indexOf('50012') > -1"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            @click="handleDelete(row)"
            v-if="permissions.indexOf('50013') > -1"
          >
            删除
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
    <notice-add ref="add" @fetch-data="fetchData"></notice-add>
  </div>
</template>

<script>
import { getNoticeList, noticeDel } from '@/api/notice'
import NoticeAdd from './components/noticeAdd'
import { mapGetters } from 'vuex'

let statusMap, typeMap
export default {
  name: 'ComprehensiveTable',
  components: {
    NoticeAdd,
  },
  filters: {
    onlineFilterColort(status) {
      const statusColorMap = {
        0: 'info',
        1: 'success',
      }
      return statusColorMap[status]
    },
    typeMapFilter(status) {
      return typeMap[status]
    },
    showMapFilter(status) {
      let showMap = {
        0: '不显示',
        1: '显示',
      }
      return showMap[status]
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
        usrMulti: '',
        regTimeEnd: '',
        regTimeStart: '',
        minBalance: '',
      },
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
    handleEdit(row) {
      this.$refs['edit'].showEdit(row)
    },
    handleDelete(row) {
      console.log(row)
      if (row.id) {
        this.$baseConfirm('你确定要删除当前项吗', null, async () => {
          const { msg } = await noticeDel({ id: row.id })
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
      const { data } = await getNoticeList(this.queryForm)
      this.list = data.list
      statusMap = data.dataMap.statusMap
      typeMap = data.dataMap.typeMap
      this.total = data.total
    },
    handleAdd(row) {
      this.$refs['add'].showAdd(row)
    },
  },
}
</script>
