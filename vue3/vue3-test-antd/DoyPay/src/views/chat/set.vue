<template>
  <div class="table-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button
          icon="el-icon-plus"
          type="primary"
          @click="handleAdd()"
          v-if="permissions.indexOf('60011') > -1"
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
        prop="question"
        label="发言标题"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="回答"
        prop="answer"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status | onlineFilterColort">
            {{ row.status | typeMapFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button
            type="text"
            @click="handleAdd(row)"
            v-if="permissions.indexOf('60012') > -1"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            @click="handleDelete(row)"
            v-if="permissions.indexOf('60013') > -1"
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
    <chat-add ref="add" @fetch-data="fetchData"></chat-add>
  </div>
</template>

<script>
import { getNoticeList, noticeDel } from '@/api/notice'
import { chatTemplateList, delChatTemplate } from '@/api/chat'
import chatAdd from './components/chatAdd'
import { mapGetters } from 'vuex'

let typeMap = {
  0: '禁用',
  1: '启用',
}
export default {
  name: 'ComprehensiveTable',
  components: {
    chatAdd,
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
      if (row.id) {
        this.$baseConfirm('你确定要删除当前项吗', null, async () => {
          const { msg } = await delChatTemplate({ id: row.id })
          this.$baseMessage(msg, 'success')
          this.fetchData()
        })
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item.id).join()
          this.$baseConfirm('你确定要删除选中项吗', null, async () => {
            const { msg } = await delChatTemplate({ id: ids })
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
      const { data } = await chatTemplateList(this.queryForm)
      this.list = data.list
      /* statusMap = data.dataMap.statusMap
      typeMap = data.dataMap.typeMap */
      this.total = data.total
    },
    handleAdd(row) {
      this.$refs['add'].showAdd(row)
    },
  },
}
</script>
