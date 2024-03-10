<template>
  <div class="userManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button
          v-if="permissions.indexOf('20021') > -1"
          icon="el-icon-plus"
          type="primary"
          @click="handleAdd"
        >
          添加角色
        </el-button>
      </vab-query-form-left-panel>
      <!-- <vab-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.username"
              placeholder="请输入角色名"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel> -->
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
        prop="name"
        label="名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="subAdmins"
        label="角色数量"
      ></el-table-column>
      <el-table-column prop="type" show-overflow-tooltip label="状态">
        <template #default="{ row }">
          <el-tag>
            {{ row.status | filterStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="type" show-overflow-tooltip label="权限数量">
        <template #default="{ row }">
          <el-tag>
            {{ row.privs | privsFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="400">
        <template #default="{ row }">
          <el-button
            type="primary"
            v-if="permissions.indexOf('20022') > -1"
            :disabled="row.isSystem == 1"
            @click="handleEdit(row)"
          >
            编辑权限
          </el-button>
          <el-button
            type="primary"
            @click="handleDisable(row)"
            :disabled="row.isSystem == 1"
          >
            <template v-if="row.status == 1">禁用</template>
            <template v-if="row.status == 0">启用</template>
          </el-button>
          <el-button
            v-if="permissions.indexOf('20023') > -1"
            :disabled="row.isSystem == 1"
            type="primary"
            @click="handleDel(row)"
          >
            删除角色
          </el-button>
        </template>
      </el-table-column>
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
    <add ref="add" @fetch-data="fetchData"></add>
  </div>
</template>

<script>
import { getRoleList, delRole, editRoleStatus } from '@/api/adminList'
import Edit from './components/adminEdit'
import Add from './components/userAdd'
import { mapGetters } from 'vuex'
let statusMap = ''
export default {
  name: 'UserManagement',
  components: { Edit, Add },
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
        username: '',
      },
    }
  },
  filters: {
    typeFilter(status) {
      let typeMap = {
        0: '不在线',
        1: '在线',
      }
      return typeMap[status]
    },
    privsFilter(d) {
      let num = d.split(',')
      return num.length
    },
    filterStatus(status) {
      console.log(statusMap, status)
      return statusMap[status]
    },
  },
  created() {
    this.fetchData()
  },
  computed: {
    height() {
      return this.$baseTableHeight()
    },
    ...mapGetters({
      permissions: 'user/permissions',
    }),
  },
  methods: {
    setSelectRows(val) {
      this.selectRows = val
    },
    handleAdd() {
      this.$refs['add'].showAdd()
    },
    handleEdit(row) {
      this.$refs['add'].showAdd(row)
    },
    handleDisable(row) {
      this.$baseConfirm('你确定要禁用此角色吗', null, async () => {
        let d = { id: row.id, status: row.status == '1' ? '0' : '1' }
        const data = await editRoleStatus(d)
        if (data.code == 0) {
          this.$baseMessage(data.msg, 'success')
          this.fetchData()
        }
      })
    },
    handleDel(row) {
      this.$baseConfirm('你确定要删除此角色吗', null, async () => {
        const data = await delRole({ id: row.id })
        if (data.code == 0) {
          this.$baseMessage(data.msg, 'success')
          this.fetchData()
        }
      })
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
      const { data } = await getRoleList(this.queryForm)
      this.list = data.list
      this.total = data.total
      statusMap = data.dataMap.statusMap
    },
  },
}
</script>
