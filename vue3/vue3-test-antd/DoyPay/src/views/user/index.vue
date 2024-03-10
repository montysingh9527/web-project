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
            <el-input v-model="queryForm.uid" placeholder="UID" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.nickName" placeholder="会员名" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.realName" placeholder="姓名" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.phone" placeholder="手机号" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.email" placeholder="邮箱" />
          </el-form-item>
          <el-form-item>
            <el-select
              clearable
              v-model="queryForm.isOnline"
              placeholder="状态"
              style="width: 100px"
            >
              <el-option
                v-for="(item, key) in onlineState"
                :key="key"
                :label="item"
                :value="key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              clearable
              v-model="queryForm.type"
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
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="注册开始时间"
              v-model="queryForm.regTimeStart"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="注册结束时间"
              v-model="queryForm.regTimeEnd"
            ></el-date-picker>
          </el-form-item>
          <!-- <el-form-item style="width: 100px">
            <el-input v-model="queryForm.minBalance" placeholder="最小余额" />
          </el-form-item> -->
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
      <ul class="headerCount">
        <li>
          <span>今日注册:</span>
          <p>{{ regData.today }}</p>
        </li>
        <li class="countBorder">
          <span>本周注册:</span>
          <p style="color: #16d255">{{ regData.thisWeek }}</p>
        </li>
        <li>
          <span>本月注册:</span>
          <p style="color: #e12449">{{ regData.thisMonth }}</p>
        </li>
      </ul>
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
        prop="uid"
        label="UID"
        width="60"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="nickName"
        label="昵称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="真实姓名"
        prop="realName"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="类型 | 状态">
        <template #default="{ row }">
          <el-tag>
            {{ row.type | typeMapFilter }}
          </el-tag>
          <el-tag>
            {{ row.status | statusMapFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="手机号" width="150">
        <template slot-scope="scope">
          {{ scope.row.areaCode }}-{{ scope.row.phone }}
        </template>
      </el-table-column>
       <el-table-column
        show-overflow-tooltip
        label="邮箱"
        prop="email"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="可动 | 担保DOY币">
        <template #default="{ row }">
          <el-tag>{{ row.balance }}</el-tag>
          <br />
          <el-tag type="danger" style="margin-top: 2px">
            {{ row.unbalance }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="isOnline"
        show-overflow-tooltip
        label="是否在线"
      >
        <template #default="{ row }">
          <el-tag :type="row.isOnline | onlineFilterColort">
            {{ row.isOnline | onlineFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="最近活跃"
        prop="lastActive"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="注册时间"
        prop="createTime"
        width="200"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="最近登录时间"
        prop="lastLogin"
        width="200"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="120px">
        <template #default="{ row }">
          <el-dropdown
            @command="handleCommand"
            size="small"
            split-button
            type="primary"
          >
            <span class="el-dropdown-link">更多</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="commandValue(1, row)"
                v-if="permissions.indexOf('10011') > -1"
              >
                编辑
              </el-dropdown-item>
              <el-dropdown-item
                v-if="permissions.indexOf('10014') > -1"
                :command="commandValue(6, row)"
              >
                <router-link
                  :to="{
                    path: '/order/orderList',
                    query: { name: row.usr },
                  }"
                  style="color: #606266"
                >
                  订单
                </router-link>
              </el-dropdown-item>

              <el-dropdown-item
                v-if="permissions.indexOf('10015') > -1"
                :command="commandValue(7, row)"
              >
                <router-link
                  :to="{
                    path: '/user/bankList',
                    query: { name: row.usr },
                  }"
                  style="color: #606266"
                >
                  银行
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item
                v-if="row.type == 1 && permissions.indexOf('100102') > -1"
                :command="commandValue(8, row)"
              >
                设为币商
              </el-dropdown-item>
              <el-dropdown-item
                v-if="row.type == 2 && permissions.indexOf('100105') > -1"
                :command="commandValue(9, row)"
              >
                取消币商
              </el-dropdown-item>

              <el-dropdown-item
                v-if="row.type == 0 && permissions.indexOf('10016') > -1"
                :command="commandValue(4, row)"
              >
                开通商户
              </el-dropdown-item>
              <el-dropdown-item
                v-if="
                  (row.type == 2 || row.type == 1) &&
                  permissions.indexOf('10017') > -1
                "
                :command="commandValue(5, row)"
              >
                商户信息
              </el-dropdown-item>
              <el-dropdown-item
                v-if="permissions.indexOf('10012') > -1"
                :command="commandValue(2, row)"
              >
                登出
              </el-dropdown-item>
              <el-dropdown-item
                v-if="permissions.indexOf('10013') > -1"
                :command="commandValue(3, row)"
              >
                删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
    <user-edit ref="edit" @fetch-data="fetchData"></user-edit>
    <merchant-Inf ref="inf" @fetch-data="fetchData"></merchant-Inf>
  </div>
</template>

<script>
import {
  getList,
  doDelete,
  kickOff,
  applyMerchant,
  changeCurMer,
  cancleCurMer,
} from '@/api/table'
import UserEdit from './components/UserEdit'
import MerchantInf from './components/merchantInf'
import { mapGetters } from 'vuex'

let statusMap, typeMap
export default {
  name: 'ComprehensiveTable',
  components: {
    UserEdit,
    MerchantInf,
  },
  filters: {
    onlineFilter(status) {
      const onlineMap = {
        0: '不在线',
        1: '在线',
      }
      return onlineMap[status]
    },
    onlineFilterColort(status) {
      const statusColorMap = {
        0: 'info',
        1: 'success',
      }
      return statusColorMap[status]
    },
    statusMapFilter(status) {
      return statusMap[status]
    },
    typeMapFilter(status) {
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
        rows: 10,
        nickName: '',
        realName: '',
        phone: '',
        status: '',
        regTimeEnd: '',
        regTimeStart: '',
        isOnline: '',
        usr: '',
        uid: '',
        type: '',
        email:''
      },
      regData: '',
      statusMap: '',
      onlineState: {
        0: '不在线',
        1: '在线',
      },
      typeMap: '',
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
  mounted() {
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
        this.$refs['edit'].showEdit(command.row)
      }
      if (command.type == 2) {
        this.handleKickOff(command.row)
      }
      if (command.type == 3) {
        this.handleDelete(command.row)
      }
      if (command.type == 4) {
        this.applyMerchant(command.row)
      }
      if (command.type == 5) {
        this.$refs['inf'].showEdit(command.row)
        // this.applyMerchant(command.row)
      }
      if (command.type == 6) {
        this.$router.push({
          path: '/order/orderList',
          query: { name: command.row.usr },
        })
      }
      if (command.type == 7) {
        this.$router.push({
          path: '/user/bankList',
          query: { name: command.row.usr },
        })
      }
      if (command.type == 8) {
        this.setBiShang(command.row)
      }
      if (command.type == 9) {
        this.cancleBiShang(command.row)
      }
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
    handleEdit(row) {
      this.$refs['edit'].showEdit(row)
    },
    setBiShang(row) {
      this.$baseConfirm('你确定要设置当前账号为币商吗', null, async () => {
        const { msg } = await changeCurMer({ usr: row.usr })
        this.$baseMessage(msg, 'success')
        this.fetchData()
      })
    },
    cancleBiShang(row) {
      this.$baseConfirm('你确定要取消当前账号币商权限吗', null, async () => {
        const { msg } = await cancleCurMer({ usr: row.usr })
        this.$baseMessage(msg, 'success')
        this.fetchData()
      })
    },
    handleDelete(row) {
      this.$baseConfirm('你确定要删除当前会员账号吗', null, async () => {
        const { msg } = await doDelete({ usr: row.usr })
        this.$baseMessage(msg, 'success')
        this.fetchData()
      })
    },
    handleKickOff(row) {
      this.$baseConfirm('你确定要登出当前会员账号吗', null, async () => {
        const { msg } = await kickOff({ usr: row.usr })
        this.$baseMessage(msg, 'success')
        this.fetchData()
      })
    },
    applyMerchant(row) {
      this.$baseConfirm('你确定要设为商户吗', null, async () => {
        const { msg } = await applyMerchant({ usr: row.usr })
        this.$baseMessage(msg, 'success')
        this.fetchData()
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
    handleQuery() {
      this.queryForm.page = 1
      this.fetchData(this.queryForm)
    },
    async fetchData() {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 500)
      const { data } = await getList(this.queryForm)
      this.list = data.list
      this.regData = data.regUser
      statusMap = data.dataMap.statusMap
      this.statusMap = statusMap
      typeMap = data.dataMap.typeMap
      this.typeMap = typeMap
      console.log('typeMap', typeMap)
      this.total = data.total
    },
  },
}
</script>
<style scoped>
.headerCount {
  float: right;
}
.headerCount li span {
  font-size: 14px;
}
.headerCount li {
  display: inline-block;
  text-align: center;
  padding: 0 20px;
}
.headerCount p {
  margin: 0;
  padding: 10px 0;
  font-size: 24px;
}
.countBorder {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
</style>
