<template>
  <div class="userManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.id"
              placeholder="请输入订单号"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.orderNo"
              placeholder="请输入商户订单号"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-select
              clearable
              v-model="queryForm.state"
              placeholder="状态"
              style="width: 100px"
            >
              <el-option
                v-for="(item, key) in stateMap"
                :key="key"
                :label="item"
                :value="key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.inUid"
              placeholder="请输入买家UID"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.outUid"
              placeholder="请输入卖家UID"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="订单起始时间"
              v-model="queryForm.addTimeF"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="订单结束时间"
              v-model="queryForm.addTimeT"
            ></el-date-picker>
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
        prop="id"
        label="订单号"
        width="100"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="orderNo"
        label="商户订单号"
        width="180"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="inUid"
        label="买方UID"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="outUid"
        label="卖方UID"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="amount"
        label="金额"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="rate"
        label="汇率"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="rechargeAmount"
        label="实际到账"
      ></el-table-column>

      <el-table-column sortable show-overflow-tooltip label="在线状态">
        <template #default="{ row }">
          <el-tag :type="row.state">
            {{ row.state | typeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="actionTime"
        label="创建时间"
      ></el-table-column>
      <!-- <el-table-column
        show-overflow-tooltip
        prop="lastLogin"
        label="最后登录时间"
      ></el-table-column> -->
      <el-table-column show-overflow-tooltip label="操作" width="100">
        <template #default="{ row }">
          <el-button
            v-if="
              permissions.indexOf('10071') > -1 &&
              row.state == '1' &&
              row.notifyCount >= 5
            "
            type="primary"
            @click="handleNotice(row)"
          >
            补发通知
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
    <!-- <add ref="add" @fetch-data="fetchData" :role="role"></add>
    <edit ref="edit" @fetch-data="fetchData"></edit> -->
  </div>
</template>

<script>
import { getPayList, patchNotice } from '@/api/merchant'
import { mapGetters } from 'vuex'

let role, stateMap
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
        inUid: '',
        outUid: '',
        addTimeT: '',
        state: '',
        addTimeF: '',
        orderNo: '',
        id: '',
      },
      role: '',
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
  filters: {
    typeFilter(status) {
      return stateMap[status]
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
  },
  created() {
    this.fetchData()
  },
  methods: {
    setSelectRows(val) {
      this.selectRows = val
    },
    handleAdd(row) {
      this.$refs['add'].showAdd(row)
    },
    handleEdit(row) {
      this.$refs['edit'].showEdit(row)
    },
    handleNotice(row) {
      this.$baseConfirm('确定发送通知吗？', null, async () => {
        let data = await patchNotice({ id: row.id })
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
      const { data } = await getPayList(this.queryForm)
      this.list = data.list
      this.total = data.total
      stateMap = data.dataMap.stateMap
      this.stateMap = stateMap
    },
    handleEditInf(row) {
      this.$refs['add'].showAdd(row)
    },
  },
}
</script>
