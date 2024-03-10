<template>
  <div class="userManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button
          v-if="permissions.indexOf('20011') > -1"
          icon="el-icon-plus"
          type="primary"
          @click="handleAdd"
        >
          添加
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item style="width: 150px">
            <el-input
              v-model.trim="queryForm.usr"
              placeholder="请输入管理员名称"
              clearable
            />
          </el-form-item>
          <el-form-item style="width: 200px">
            <el-select
              clearable
              v-model="queryForm.roleId"
              placeholder="请选择角色"
              style="width: 200px"
            >
              <el-option
                v-for="(item, key) in role"
                :key="key"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 200px">
            <el-select
              clearable
              v-model="queryForm.status"
              placeholder="请选择状态"
              style="width: 200px"
            >
              <el-option
                v-for="(item, key) in statusMap"
                :key="key"
                :label="item"
                :value="key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
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
        label="id"
        width="100"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="usr"
        label="用户名"
      ></el-table-column>
      <!-- <el-table-column
        show-overflow-tooltip
        prop="name"
        label="姓名"
      ></el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        prop="lastIP"
        label="登录IP"
      ></el-table-column>
      <!-- <el-table-column
        show-overflow-tooltip
        prop="lastIP"
        label="登录IP"
      ></el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        prop="lastIP_location"
        label="登录地址"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="remark"
        label="备注"
      ></el-table-column>

      <!--  <el-table-column show-overflow-tooltip label="权限">
        <template #default="{ row }">
          <el-tag v-for="(item, index) in row.permissions" :key="index">
            {{ item }}
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column show-overflow-tooltip label="权限">
        <template #default="{ row }">
          <el-tag>
            {{ row.roleId | roleFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="客服">
        <template #default="{ row }">
          <el-tag>
            {{ row.isKefu | kefuFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        sortable
        prop="isOnline"
        show-overflow-tooltip
        label="在线状态"
      >
        <template #default="{ row }">
          <el-tag :type="row.isOnline | typeColorFilter">
            {{ row.isOnline | typeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="status"
        show-overflow-tooltip
        label="账号状态"
      >
        <template #default="{ row }">
          <el-tag :type="row.status | stateColorFilter">
            {{ row.status | stateFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="lastLogin"
        label="最后登录时间"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-dropdown
            @command="handleCommand"
            size="small"
            split-button
            type="primary"
            v-if="row.isSystem != 1"
          >
            <span class="el-dropdown-link">更多</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-if="permissions.indexOf('20014') > -1"
                :command="commandValue(1, row)"
              >
                修改信息
              </el-dropdown-item>
              <el-dropdown-item
                v-if="permissions.indexOf('20012') > -1"
                :command="commandValue(2, row)"
              >
                修改密码
              </el-dropdown-item>
              <el-dropdown-item
                v-if="row.isOnline == 1 && permissions.indexOf('20013') > -1"
                :command="commandValue(3, row)"
              >
                踢下线
              </el-dropdown-item>
              <el-dropdown-item :command="commandValue(4, row)">
                <template v-if="row.status == 1">禁用</template>
                <template v-if="row.status == 0">启用</template>
              </el-dropdown-item>
              <el-dropdown-item
                v-if="permissions.indexOf('20015') > -1"
                :command="commandValue(5, row)"
              >
                删除管理员
              </el-dropdown-item>
              <el-dropdown-item :command="commandValue(6, row)">
                修改谷歌验证码
              </el-dropdown-item>
              <el-dropdown-item
                v-if="row.isKefu == 0 && permissions.indexOf('20016') > -1"
                :command="commandValue(7, row)"
              >
                设为客服
              </el-dropdown-item>
              <el-dropdown-item
                v-if="row.isKefu == 1 && permissions.indexOf('20016') > -1"
                :command="commandValue(7, row)"
              >
                取消客服
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    ``
    <el-pagination
      background
      :current-page="queryForm.page"
      :page-size="queryForm.rows"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <add ref="add" @fetch-data="fetchData" :role="role"></add>
    <edit ref="edit" @fetch-data="fetchData"></edit>
    <google-edit ref="google" @fetch-data="fetchData"></google-edit>
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
import Edit from './components/adminEdit'
import Add from './components/adminAdd'
import googleEdit from './components/googleEdit'
import { addCustomerService, delKefu } from '@/api/chat'

import { mapGetters } from 'vuex'

let role
export default {
  name: 'UserManagement',
  components: { Edit, Add, googleEdit },
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
        usr: '',
        status: '',
        roleId: '',
      },
      role: '',
      statusMap: '',
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
  },
  created() {
    this.getRoleList()
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
      if (row.isKefu) {
        this.$baseConfirm('你确定将当前账号删除客服吗', null, async () => {
          const { msg } = await delKefu({
            usr: row.usr,
            user_type: 2,
          })
          this.$baseMessage(msg, 'success')
          this.fetchData()
        })
      } else {
        this.$baseConfirm('你确定将当前账号设为客服吗', null, async () => {
          const { msg } = await addCustomerService({
            usr: row.usr,
            user_type: '2',
          })
          this.$baseMessage(msg, 'success')
          this.fetchData()
        })
      }
    },
    handleOff(row) {
      this.$baseConfirm('你确定要踢此管理员下线吗', null, async () => {
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
      const { data } = await getList(this.queryForm)
      data.list = data.list.filter((t) => {
        return t.isDelete != 1
      })
      this.list = data.list
      this.total = data.total
    },
    async getRoleList() {
      let { data } = await roleList()
      role = data.list
      this.role = data.list
      this.statusMap = data.dataMap.statusMap
    },
    handleEditInf(row) {
      this.$refs['add'].showAdd(row)
    },
  },
}
</script>
