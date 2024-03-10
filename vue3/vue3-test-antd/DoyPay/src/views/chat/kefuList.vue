<template>
  <div class="userManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item style="width: 150px">
            <el-input
              v-model.trim="queryForm.nickname"
              placeholder="请输入管理员名称"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column
        show-overflow-tooltip
        prop="uid"
        label="uid"
        width="200"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="姓名">
        <template #default="{ row }">
          {{ row.name }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="昵称">
        <template #default="{ row }">
          {{ row.nickname }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="update_time"
        label="最后登录时间"
      ></el-table-column>
      <el-table-column
        sortable
        prop="isOnline"
        show-overflow-tooltip
        label="在线状态"
      >
        <template #default="{ row }">
          <el-tag :type="row.isOnline | stateColorFilter">
            {{ row.isOnline | onlineFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="dute_status"
        show-overflow-tooltip
        label="工作状态"
      >
        <template #default="{ row }">
          <el-tag :type="row.dute_status | stateColorFilter">
            {{ row.dute_status | duteFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="200px">
        <template #default="{ row }">
          <el-button
            type="text"
            @click="editKf(row)"
            
          >
            编辑
          </el-button>
          <el-button
            type="text"
            @click="handleOff(row)"
            
          >
            踢下线
          </el-button>
          <!-- v-if="permissions.indexOf('7006') > -1" -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="userform" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="userform.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeName()">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      background
      :current-page="queryForm.page"
      :page-size="queryForm.rows"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import {
  getList,
  doOffline,
  roleList,
  delAdmin,
  editAdminStatus,
} from '@/api/adminList'
import { getkefuList, editKefu } from '@/api/chat'
import { addCustomerService } from '@/api/chat'

import { mapGetters } from 'vuex'

let role
export default {
  name: 'UserManagement',
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
        nickname: '',
      },
      userform: {
        name: '',
        usr: '',
      },
      role: '',
      statusMap: '',
      dialogFormVisible: false,
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
    typeColorFilter(status) {
      let statusColorMap = {
        0: 'info',
        1: 'success',
      }
      return statusColorMap[status]
    },
    roleFilter(status) {
      for (var item of role) {
        if (status == item.id) {
          return item.name
        }
      }
    },
    stateFilter(status) {
      let stateMap = {
        1: '正常',
        0: '禁用',
      }
      return stateMap[status]
    },
    stateColorFilter(status) {
      let statusColorMap = {
        0: 'info',
        1: 'success',
      }
      return statusColorMap[status]
    },
    kefuFilter(status) {
      status = status - 0
      let kefu = {
        0: '/',
        1: '客服',
      }
      return kefu[status]
    },
    onlineFilter(status) {
      let o = {
        0: '离线',
        1: '在线',
      }
      return o[status]
    },
    duteFilter(status) {
      let o = {
        0: '离开',
        1: '工作中',
      }
      return o[status]
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
    async changeName() {
      let { msg } = await editKefu({
        nickname: this.userform.name,
        usr: this.userform.usr,
      })
      this.dialogFormVisible = false;
      this.$baseMessage(msg, 'success')
      this.fetchData()
    },
    editKf(row) {
      this.userform.name = row.name
      this.userform.usr = row.usr
      this.dialogFormVisible = true
    },
    commandValue(type, row) {
      return {
        type,
        row,
      }
    },
    handleCommand(command) {
      if (command.type == 1) {
        this.handleEditInf(command.row)
      }
      if (command.type == 2) {
        this.handleEdit(command.row)
      }
      if (command.type == 3) {
        this.handleOff(command.row)
      }
      if (command.type == 4) {
        this.handleStatus(command.row)
      }
      if (command.type == 5) {
        this.handleDel(command.row)
      }
      if (command.type == 6) {
        this.$refs['google'].showGoogle(command.row)
      }
      if (command.type == 7) {
        this.handleChat(command.row)
      }
    },
    filterDel(val, row) {
      console.log(val, row)
      return row.isDelete != 1
    },
    setSelectRows(val) {
      this.selectRows = val
    },
    handleAdd(row) {
      this.$refs['add'].showAdd()
    },
    handleEdit(row) {
      this.$refs['edit'].showEdit(row)
    },
    handleChat(row) {
      this.$baseConfirm('你确定将当前账号设为客服吗', null, async () => {
        const { msg } = await addCustomerService({ usr: row.usr, user_type: 2 })
        this.$baseMessage(msg, 'success')
        this.fetchData()
      })
    },
    handleOff(row) {
      this.$baseConfirm('你确定要踢此客服下线吗', null, async () => {
        const data = await doOffline({ usr: row.usr })
        if (data.code == 0) {
          this.$baseMessage(data.msg, 'success')
          this.fetchData()
        }
      })
    },
    handleStatus(row) {
      this.$baseConfirm('你确定要操作此管理员吗', null, async () => {
        let d = { usr: row.usr, status: row.status == '1' ? '0' : '1' }
        console.log('d', d)
        const data = await editAdminStatus(d)
        if (data.code == 0) {
          this.$baseMessage(data.msg, 'success')
          this.fetchData()
        }
      })
    },
    handleDel(row) {
      this.$baseConfirm('你确定要删除此管理员吗', null, async () => {
        const data = await delAdmin({ usr: row.usr })
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
      const { data } = await getkefuList(this.queryForm)
      this.list = data.list
      this.total = data.total
    },
    handleEditInf(row) {
      this.$refs['add'].showAdd(row)
    },
  },
}
</script>
