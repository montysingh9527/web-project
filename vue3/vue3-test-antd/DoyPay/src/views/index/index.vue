<template>
  <div class="index-container">
    <el-row :gutter="20" v-loading="listLoading">
      <el-header>
        <h1 class="headerTitle">欢迎来到Doy钱包后台</h1>
        <ul class="headerCount">
          <li>
            <span style="font-size: 16px; font-weight: 600">当前在线人数:</span>
            <p>{{ indexData.onlineNum }}</p>
          </li>
          <li class="countBorder">
            <span style="font-size: 16px; font-weight: 600">今日交易成功:</span>
            <p style="color: #16d255">{{ indexData.todayTradeSucNum }}</p>
          </li>
          <li>
            <span style="font-size: 16px; font-weight: 600">正在交易数:</span>
            <p style="color: #e12449">{{ indexData.tradingOrderNum }}</p>
          </li>
        </ul>
      </el-header>
      <div style="clear: both"></div>
      <div>
        <el-col :xs="17" :sm="17" :md="17" :lg="17" :xl="17">
          <el-card shadow="never">
            <div slot="header">
              <h3 style="margin: 0; padding: 5px 0">
                进行中的交易：
                <router-link to="/order/orderList" style="float: right">
                  更多交易
                </router-link>
              </h3>
            </div>
            <div class="bottom">
              <div
                v-for="(item, index) in indexData.tradingOrder"
                :key="index"
                class="tradingOrder"
              >
                <div style="padding-left: 20px">
                  <div>
                    <el-avatar
                      style="margin: 10px 10px 0 0; float: left"
                      size="large"
                      :src="item.sellerAvatar"
                    ></el-avatar>
                    <span
                      style="
                        line-height: 60px;
                        font-size: 16px;
                        font-weight: 600;
                      "
                    >
                      {{ item.sellerNickname }}
                    </span>
                  </div>
                  <p class="np">出售数量：{{ item.num }} DOY</p>
                  <p class="np">
                    收款方式：{{ item.bankType | typeMapFilter }}
                  </p>
                  <p class="np">备注：{{ item.remark }}</p>
                  <p class="np">创建时间：{{ item.createTime }}</p>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
          <el-card shadow="never">
            <div slot="header">
              <h3 style="margin: 0; padding: 5px 0">
                最新交易成功：
                <router-link to="/order/orderList" style="float: right">
                  更多交易
                </router-link>
              </h3>
            </div>
            <div class="bottom">
              <div v-for="(item, index) in indexData.finishOrder" :key="index">
                <p style="height: 50px; line-height: 50px">
                  <el-avatar
                    style="margin: 5px 8px; float: left"
                    size="large"
                    :src="item.buyerAvatar"
                  ></el-avatar>
                  <span
                    style="display: block; line-height: 0; padding-top: 13px"
                  >
                    <span style="color: green">{{ item.sellerNickname }}</span>
                    和
                    <span style="color: green">{{ item.buyerNickname }}</span>
                    成功交易
                    <span style="color: red">{{ item.num }}</span>
                    DOY
                  </span>
                  <span style="display: block">{{ item.actionTime }}</span>
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
      <div>
        <el-col :xs="17" :sm="17" :md="17" :lg="17" :xl="17">
          <el-card shadow="never">
            <div slot="header">
              <h3 style="margin: 0; padding: 5px 0">
                最新评价：
                <router-link to="/user/commentList" style="float: right">
                  更多评价
                </router-link>
              </h3>
            </div>
            <div class="bottom commentBox">
              <div v-for="(item, index) in indexData.newComment" :key="index">
                <div class="avatarBox">
                  <el-avatar
                    style="
                      margin: 5px 8px;
                      float: left;
                      width: 60px;
                      height: 60px;
                    "
                    size="large"
                    :src="item.fromAvatar"
                  ></el-avatar>
                </div>
                <p style="font-size: 16px; font-weight: 600">
                  <span style="color: green">{{ item.fromNickname }}</span>
                  对
                  <span style="color: blue">{{ item.toNickname }}</span>
                  发布了最新评论
                  <el-rate
                    v-model="item.score"
                    disabled
                    style="display: inline-block"
                  ></el-rate>
                </p>

                <p style="font-size: 16px; font-weight: 600; color: #e711f8">
                  {{ item.content }}
                </p>
                <p>{{ item.createTime }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
          <el-card shadow="never">
            <div slot="header">
              <h3 style="margin: 0; padding: 5px 0">
                最近登录用户：
                <router-link to="/user/logInfo" style="float: right">
                  更多信息
                </router-link>
              </h3>
            </div>
            <div class="bottom">
              <el-table :data="indexData.newLogin" style="width: 100%">
                <el-table-column
                  prop="nickName"
                  label="昵称"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="phone"
                  label="手机号"
                  width="120"
                ></el-table-column>
                <el-table-column
                  prop="loginTime"
                  width="180"
                  label="时间"
                ></el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
import { getIndex } from '@/api/index.js'
let typeMap = {
  1: '银行卡',
  2: '支付宝',
  3: '微信',
}
export default {
  name: 'Index',
  components: {},
  data() {
    return {
      indexData: '',
      listLoading: false,
      intervalObj: null,
    }
  },
  filters: {
    typeMapFilter(status) {
      status = status - 0
      return typeMap[status]
    },
  },
  created() {
    this.fetchData()
    clearInterval(this.intervalObj)
    this.intervalObj = setInterval(() => {
      this.fetchData()
    }, 10000)
  },
  beforeDestroy() {
    clearInterval(this.intervalObj)
  },
  mounted() {},
  methods: {
    async fetchData() {
      let data = await getIndex()
      if (data.code == 0) {
        this.indexData = data.data
        this.listLoading = true
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      }
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
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}
.headerTitle {
  float: left;
}
.commentBox p {
  padding: 6px;
  margin: 0;
}
.commentBox > div {
  margin-bottom: 10px;
}
.tradingOrder {
  display: inline-block;
  width: 33%;
  z-index: 1;
  border: 1px solid #ebeef5;
  margin-left: -1px;
  padding-bottom: 10px;
}
.tradingOrder:nth-child(3n + 1) {
  margin-left: 0px;
}
.tradingOrder:nth-child(n + 4) {
  margin-top: -1px;
}
</style>
