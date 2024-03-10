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
            <el-input v-model="queryForm.uid" placeholder="uid" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.nickName" placeholder="会员名" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.bankName" placeholder="姓名" />
          </el-form-item>
          <!--  <el-form-item>
            <el-input v-model="queryForm.bankAccount" placeholder="账号" />
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
      <vab-query-form-right-panel>
        <el-button type="primary" @click="showBankList">银行列表</el-button>
      </vab-query-form-right-panel>
    </vab-query-form>
    <el-dialog title="银行列表" :visible.sync="dialogTableVisible">
      <el-button
        type="primary"
        @click="
          innerVisible = true
          isChange = false
        "
      >
        添加
      </el-button>
      <el-table :data="bankList" style="height: 400px; overflow: auto">
        <el-table-column
          property="name"
          label="银行"
          width="150"
        ></el-table-column>
        <el-table-column
          property="code"
          label="编码"
          width="150"
        ></el-table-column>
        <el-table-column
          sortable
          show-overflow-tooltip
          label="类型"
          prop="type"
        >
          <template #default="{ row }">
            {{ row.type | typeFilter }}
          </template>
        </el-table-column>
        <el-table-column
          sortable
          show-overflow-tooltip
          label="状态"
          prop="type"
        >
          <template #default="{ row }">
            {{ row.isDelete | stateFilter }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="操作" width="180px">
          <template #default="{ row }">
            <el-button
              v-if="row.isDelete == 0"
              type="text"
              @click="editBankHandle(row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="row.isDelete == 0"
              type="text"
              @click="delBankHandle(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        width="30%"
        title="添加/修改银行"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form ref="formInner" :model="formInner" label-width="80px">
          <el-form-item label="银行名称">
            <el-input v-model="formInner.name"></el-input>
          </el-form-item>
          <el-form-item label="银行编码">
            <el-input v-model="formInner.code"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="addBank">确定</el-button>
      </el-dialog>
    </el-dialog>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      :height="height"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <!--    <el-table-column
        show-overflow-tooltip
        label="ID"
        width="95"
        prop="id"
      ></el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        label="uid"
        width="95"
        prop="uid"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="nickName"
        label="会员名"
        width="120"
      ></el-table-column>
      <!-- <el-table-column
        show-overflow-tooltip
        prop="realName"
        label="姓名"
        width="120"
      ></el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        label="类型"
        style="overflow: auto"
      >
        <template #default="{ row }">
          <div
            class="bankInfBox"
            v-for="(item, index) in row.bankArr"
            :key="index"
          >
            <div class="bankLeftTitle" :class="'title' + item.type">
              {{ item.type | typeFilter }}
            </div>
            <div class="bankNumberBox">
              <span
                v-if="item.type == 1"
                style="display: block; margin-top: 5px"
              >
                {{ item.bankRealName }}
                <br />
                {{ item.bankIdName }}
                <br />
                {{ item.bankAccount }}
              </span>
              <div v-if="item.type != 1">
                {{ item.bankAccount }}
                <br />
              </div>

              <el-image
                style="width: 45px; height: 45px; display: inline-block"
                :src="item.bankQRCode"
                v-if="item.type != 1"
                :preview-src-list="[item.bankQRCode]"
              ></el-image>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button
            type="text"
            v-if="permissions.indexOf('10042') > -1"
            @click="handleEdit(row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            @click="handleDelete(row)"
            v-if="permissions.indexOf('10041') > -1"
          >
            删除全部收款方式
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
    <bank-edit ref="edit" @fetch-data="fetchData"></bank-edit>
  </div>
</template>

<script>
import {
  bankList,
  delBankAll,
  getBank,
  delSystemBank,
  addBank,
  changeBank,
} from '@/api/table'
import bankEdit from './components/bankEdit'
import { mapGetters } from 'vuex'

let typeMap = []
export default {
  name: 'ComprehensiveTable',
  components: {
    bankEdit,
  },
  filters: {
    typeFilter(status) {
      return typeMap[status]
    },
    stateFilter(status) {
      let t = {
        0: '正常',
        1: '已删除',
      }
      return t[status]
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
        nickName: '',
        bankName: '',
        bankAccount: '',
        uid: '',
      },
      bankList: '',
      dialogTableVisible: false,
      innerVisible: false,
      formInner: {
        name: '',
        code: '',
      },
      isChange: false,
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
    this.$nextTick(() => {
      if (this.$route.query.name) {
        this.queryForm.usr = this.$route.query.name
        this.fetchData()
      } else {
        this.fetchData()
      }
    })
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
      this.$baseConfirm('你确定要删除当前所有收款方式吗', null, async () => {
        const { msg } = await delBankAll({ usr: row.usr })
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
      const { data } = await bankList(this.queryForm)
      this.list = data.list
      typeMap = data.dataMap.typeMap
      this.total = data.total

      this.getBankList()
    },
    showBankList() {
      this.dialogTableVisible = true
    },
    async getBankList() {
      let { data } = await getBank({ type: 1 })
      this.bankList = data.list
    },
    async delBankHandle(row) {
      let { msg } = await delSystemBank({ id: row.id })
      this.$baseMessage(msg, 'success')
      this.getBankList()
    },
    editBankHandle(row) {
      this.isChange = true
      this.innerVisible = true
      this.formInner.name = row.name
      this.formInner.code = row.code
    },
    async addBank() {
      if (this.isChange) {
        let { code, msg } = await addBank(this.formInner)
        if (code == 0) {
          this.innerVisible = false
          this.getBankList()
        }
        this.$baseMessage(msg, 'success')
        this.formInner.name = ''
        this.formInner.code = ''
      } else {
        let { code, msg } = await changeBank(this.formInner)
        if (code == 0) {
          this.innerVisible = false
          this.getBankList()
        }
        this.$baseMessage(msg, 'success')
        this.formInner.name = ''
        this.formInner.code = ''
      }
    },
  },
}
</script>
<style scoped>
.bankInfBox {
  display: inline-block;
  border: 1px solid #eee;
  min-width: 180px;
  margin-right: 20px;
  border-radius: 4px;
}
.bankLeftTitle {
  float: left;
  width: 34px;
  height: 75px;
  word-wrap: break-word;
  border-right: 1px solid #ddd;
  padding: 5px 10px;
}
.bankNumberBox {
  float: left;
  margin-left: 15px;
}
.title1 {
  background: #ffe4e4;
  color: #cc6b6b;
}
.title2 {
  background: #abecff;
  color: #4072ce;
}
.title3 {
  background: #f1ffe1;
  color: #6ccc6b;
}
</style>
