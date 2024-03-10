<template>
  <div class="userManagement-container chatBox">
    <el-row :gutter="20" v-if="list.length > 0">
      <el-col :span="5">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>
              对话列表
              <span
                @click="editKefuStatus"
                class="duteStatus"
                :class="{ duteOnline: kefuData.dute_status == 1 }"
              >
                <i class="el-icon-s-opportunity"></i>
                {{ kefuData.dute_status | filterDuteStatus }}
              </span>
              <span class="creatNewChat" @click="searchChatUser">
                <i class="el-icon-plus"></i>
                创建新会话
              </span>
            </span>
          </div>
          <div style="max-height: 500px; overflow: auto">
            <div
              v-for="(item, index) in list"
              :key="index"
              class="text item"
              :class="{ acitve: activeId == item.chatUid }"
              @click="changeRoom(item, index)"
              style="cursor: pointer"
            >
              <el-avatar
                size="large"
                :src="item.avatar"
                style="
                  float: left;
                  margin-right: 10px;
                  width: 50px;
                  height: 50px;
                "
              ></el-avatar>
              <div style="margin-bottom: 20px" class="activeNav">
                <div>
                  <span
                    style="font-weight: 600; font-size: 16px; margin-right: 5px"
                  >
                    {{ item.nickName || item.realName }}
                  </span>
                  {{ item.createTime }}
                  <el-tag
                    type="danger"
                    style="float: right"
                    v-if="item.unReadNum && item.unReadNum.length > 0"
                  >
                    {{ item.unReadNum.length }}
                  </el-tag>
                </div>
                <div style="padding: 5px 0">
                  <el-image
                    v-if="item.dataType == 'image'"
                    style="width: 50px; height: 50px"
                    :src="item.msg"
                    :preview-src-list="[item.msg]"
                  ></el-image>
                  <span
                    class="leftListText"
                    v-if="
                      item.dataType == 'text' && item.msg.indexOf('em_') < 0
                    "
                  >
                    {{ item.msg }}
                  </span>
                  <el-image
                    v-if="
                      item.dataType == 'text' && item.msg.indexOf('em_') > -1
                    "
                    style="max-width: 500px"
                    :src="getEmo(item.msg)"
                  ></el-image>
                </div>
              </div>
              <div style="clear: both"></div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>与 {{ chatUser.nickName || chatUser.realName }} 交谈中</span>
          </div>
          <div id="chatDetailBox" style="height: 400px; overflow: auto">
            <div v-for="(item, key) in chatDetail" :key="key">
              <!-- 自己的消息 -->
              <div v-if="item.fromUsr == usr">
                <div
                  style="
                    float: right;
                    width: 100%;
                    text-align: right;
                    margin-bottom: 10px;
                  "
                >
                  <el-avatar
                    :src="avatar"
                    style="float: right; margin: 5px; width: 50px; height: 50px"
                  ></el-avatar>
                  <div style="padding: 5px 5px 9px">
                    <span style="padding-right: 10px; font-weight: 600">
                      {{ fromUser.nickName || fromUser.realName }}
                    </span>
                    {{ item.requestTime }}
                  </div>
                  <i
                    class="el-icon-success"
                    style="color: #bcb4b4; margin-right: 6px"
                    v-if="item.isRead == 0"
                  ></i>
                  <i
                    class="el-icon-success"
                    style="color: #3e3bff; margin-right: 6px"
                    v-if="item.isRead == 1"
                  ></i>
                  <div
                    style="
                      background: #63fe66;
                      color: #000;
                      padding: 8px;
                      border-radius: 5px;
                      max-width: 800px;
                      float: right;
                      display: inline-block;
                    "
                  >
                    <el-image
                      v-if="item.dataType == 'image'"
                      style="max-width: 500px"
                      :src="item.msg"
                      :preview-src-list="[item.msg]"
                    ></el-image>
                    <span
                      v-if="
                        item.dataType == 'text' && item.msg.indexOf('em_') < 0
                      "
                      style="word-break: break-all"
                    >
                      {{ item.msg }}
                    </span>
                    <el-image
                      v-if="
                        item.dataType == 'text' && item.msg.indexOf('em_') > -1
                      "
                      style="max-width: 500px"
                      :src="getEmo(item.msg)"
                    ></el-image>
                  </div>
                </div>
                <div style="clear: both"></div>
              </div>
              <!-- 收到的消息 -->
              <div v-else>
                <div
                  style="
                    float: left;
                    width: 100%;
                    text-align: left;
                    margin-bottom: 10px;
                  "
                >
                  <el-avatar
                    :src="chatUser.avatar"
                    style="float: left; margin: 5px; width: 50px; height: 50px"
                  ></el-avatar>
                  <div style="padding: 5px 5px 9px">
                    <span style="padding-right: 10px; font-weight: 600">
                      {{ chatUser.nickName || chatUser.realName }}
                    </span>
                    {{ item.requestTime }}
                  </div>
                  <span
                    style="
                      background: #eee;
                      padding: 8px;
                      border-radius: 5px;
                      display: inline-block;
                    "
                  >
                    <el-image
                      v-if="item.dataType == 'image'"
                      style="max-width: 500px"
                      :src="item.msg"
                      :preview-src-list="[item.msg]"
                    ></el-image>
                    <span
                      v-if="
                        item.dataType == 'text' && item.msg.indexOf('em_') < 0
                      "
                      style="word-break: break-all"
                    >
                      {{ item.msg }}
                    </span>
                    <el-image
                      v-if="
                        item.dataType == 'text' && item.msg.indexOf('em_') > -1
                      "
                      style="max-width: 500px"
                      :src="getEmo(item.msg)"
                    ></el-image>
                  </span>
                </div>
                <div style="clear: both"></div>
              </div>
            </div>
          </div>
        </el-card>
        <div class="oprationEmoji comment-wrap" style="">
          <img
            src="@/assets/img/face_logo.png"
            @click="showEmojiPanel"
            style="width: 28px; height: 28px"
          />
          <emoji-panel
            @emojiClick="appendEmoji"
            v-if="isShowEmojiPanel"
          ></emoji-panel>
        </div>
        <div
          ref="chatTextarea"
          class="chatMsginp"
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="请输入内容"
          @keyup.enter="sendMessage"
          contentEditable="true"
        ></div>
        <el-button
          type="primary"
          @click="sendMessage"
          style="
            position: absolute;
            right: 10px;
            bottom: 3px;
            padding: 14px;
            font-size: 14px;
          "
        >
          发送消息
        </el-button>
      </el-col>
    </el-row>
    <div v-else>暂无对话</div>

    <el-dialog title="创建新对话" :visible.sync="dialogVisible" width="25%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="编号">
          <el-input placeholder="输入用户编号" v-model="form.chatUid">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchUser"
            ></el-button>
          </el-input>
        </el-form-item>
        <div v-if="actionUser">
          <img
            :src="actionUser.avatar"
            alt=""
            style="width: 40px; float: left"
          />
          <span>{{ actionUser.nickName }}（#{{ actionUser.id }}）</span>
          <i class="el-icon-chat-line-round creatChat" @click="creatChat"></i>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getSetting,
  updateSetting,
  talkList,
  logDetail,
  getUserInfo,
  editKefuDuteStatus,
  getKefuInfo,
} from '@/api/chat'
import { getAccessToken } from '@/utils/accessToken'
import { mapGetters } from 'vuex'
import EmojiPanel from './children/EmojiPanel.vue'
export default {
  name: 'UserManagement',
  data() {
    return {
      dialogVisible: false,
      list: [],
      chatDetail: '',
      activeId: '',
      activeType: '',
      chatUser: '',
      fromUser: '',
      socketMsg: '',
      Socket: '',
      active: 0,
      kefuUid: '',
      chatUid: '',
      chatGroup: '',
      isInit: false,
      isShowEmojiPanel: false,
      form: {
        chatUid: '',
      },
      actionUser: '',
      intervalObj: '',
      kefuData: '',
      timer: null,
      interval: 30000,
    }
  },
  components: {
    EmojiPanel,
  },
  filters: {
    filterDuteStatus(state) {
      if (state == 1) {
        return '工作中'
      } else {
        return '离开'
      }
    },
  },
  created() {
    clearInterval(this.intervalObj)
    this.getTalkList()
    this.intervalObj = setInterval(() => {
      this.isInit = true
      this.getTalkList()
    }, 20000)
    this.kefuInfo()
  },
  computed: {
    ...mapGetters({
      usr: 'user/usr',
      wsUrl: 'user/wsUrl',
      avatar: 'user/avatar',
    }),
  },
  methods: {
    stop() {
      clearInterval(this.timer)
    },
    start() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.Socket.readyState == 1) {
          let h = JSON.stringify({
            "code":"REQ0001"
          })
          this.Socket.send(h)
        } else {
          this.initSocket()
        }
      }, this.interval)
    },
    async kefuInfo() {
      let { data } = await getKefuInfo()
      this.kefuData = data
    },
    async editKefuStatus() {
      this.kefuData.dute_status = this.kefuData.dute_status == '1' ? '0' : '1'
      let params = { dute_status: this.kefuData.dute_status }
      let { msg } = await editKefuDuteStatus(params)
      this.$baseMessage(msg, 'success')
    },
    getEmo(msg) {
      let url = msg.split('_')[1]
      let url2 = url.split(']')[0]

      return require('@/assets/arclist/' + url2 + '.gif')
    },
    creatChat() {
      this.list.unshift({
        avatar: this.actionUser.avatar,
        chatUid: this.actionUser.uid,
        createTime: '',
        fromUid: this.fromUser.uid,
        id: this.actionUser.uid,
        realName: this.actionUser.realName,
        nickName: this.actionUser.nickName,
        unReadNum: [],
        chatGroup: 'kefu_' + this.fromUser.uid + '_' + this.actionUser.uid,
        chatType: 'kefu',
        kefuUid: this.actionUser.uid,
      })
      this.dialogVisible = false
      this.activeId = this.fromUser.uid
      this.chatGroup = 'kefu_' + this.fromUser.uid + '_' + this.actionUser.uid
      this.getlogDetail()
    },
    async searchUser() {
      let { data, msg } = await getUserInfo({ chatUid: this.form.chatUid })
      this.actionUser = data
      if (!data) {
        this.$message.error(msg)
      }
    },
    searchChatUser() {
      this.dialogVisible = true
    },
    showEmojiPanel() {
      // this.$message.error('功能暂未开通');
      this.isShowEmojiPanel = !this.isShowEmojiPanel
    },
    appendEmoji(text) {
      let oldText = this.$refs.chatTextarea.textContent
      this.$refs.chatTextarea.textContent = oldText + '[em_' + text + ']'
      this.isShowEmojiPanel = false
    },
    async fetchData() {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 300)
      const { data } = await getSetting()
      this.tabList = data.dataMap
      this.list = data.list
      for (let i in this.list) {
        this.settings[this.list[i].name] = this.list[i].value
      }
      this.copyForm = Object.assign({}, this.settings)
    },
    async save() {
      this.copyForm.chat_quick_talk_tpl = ''
      const { msg } = await updateSetting(this.copyForm)
      this.$baseMessage(msg, 'success')
    },
    async getTalkList() {
      const { data, msg } = await talkList()
      this.list = data.list
      if (this.list.length > 0) {
        if (this.isInit) {
          return false
        }
        if (!this.activeId) {
          this.activeId = this.list[0].chatUid
        }
        this.chatGroup = this.list[0].chatGroup
        this.getlogDetail()
      }
    },
    async getlogDetail() {
      let data = await logDetail({ chatGroup: this.chatGroup })
      this.chatDetail = data.data.list.reverse()
      this.chatUser = data.data.chatUser
      this.fromUser = data.data.fromUser
      this.activeType = 'kefu'
      this.chatUid = this.chatUser.uid
      this.kefuUid = this.fromUser.uid
      if (!this.Socket) {
        this.socketObj()
      }
      this.$nextTick(() => {
        this.toBottom()
      })
    },
    initSocket() {
      this.Socket = new WebSocket(
        this.wsUrl + '?token=' + getAccessToken() + '&type=' + this.activeType
      )
    },
    socketObj() {
      this.initSocket()
      this.Socket.onopen = () => {
        console.log('链接成功')
        let str = JSON.stringify({
          code: 'REQ0002',
          fromUid: this.kefuUid,
          chatUid: this.chatUid,
          kefuUid: this.kefuUid,
        })

        this.Socket.send(str)
        this.start()
      }
      this.Socket.onmessage = (e) => {
        let rsp = JSON.parse(e.data)
        let isNew = false
        for (let item of this.list) {
          if (rsp.data.chatUid == item.chatUid) {
            isNew = true
          }
        }

        if (
          rsp.data.fromUid == this.activeId ||
          rsp.data.fromUid == rsp.data.kefuUid
        ) {
          this.chatDetail.push(rsp.data)
        }
        if (rsp.code == 'ERR0000') {
          this.$message.error(rsp.msg)
        }
      }

      this.Socket.onclose = (e) => {
        this.stop()
      }
    },
    sendMessage(event) {
      let allNodes = this.$refs.chatTextarea.childNodes
      let str
      let msgText = ''
      for (let item of allNodes) {
        if (item.nodeName == 'DIV') {
          continue
        }
        // 判断当前元素是否为img元素
        if (item.nodeName === 'IMG') {
          // 是图片
          let base64Img = item.src
          str = JSON.stringify({
            code: 'REQ1000',
            chatType: 'kefu',
            dataType: 'image',
            msg: base64Img,
            fromUid: this.kefuUid,
            chatUid: this.chatUid,
            kefuUid: this.kefuUid,
            ts: Date.parse(new Date()) / 1000,
          })
          this.Socket.send(str)
        } else {
          // 获取text节点的值
          if (item.nodeValue !== null) {
            msgText += item.nodeValue
          }
          str = JSON.stringify({
            code: 'REQ1000',
            chatType: 'kefu',
            dataType: 'text',
            msg: msgText,
            fromUid: this.kefuUid,
            chatUid: this.chatUid,
            kefuUid: this.kefuUid,
            ts: Date.parse(new Date()) / 1000,
          })
          this.Socket.send(str)
        }
      }

      // 清空输入框中的内容
      this.$refs.chatTextarea.innerHTML = ''

      this.socketMsg = ''
      setTimeout(() => {
        this.toBottom()
      }, 100)
    },
    convertBase64UrlToImgFile: function (urlData, fileName, fileType) {
      // 转换为byte
      let bytes = window.atob(urlData)
      // 处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Int8Array(ab)
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      // 转换成文件，添加文件的type，name，lastModifiedDate属性
      let blob = new Blob([ab], { type: fileType })
      blob.lastModifiedDate = new Date()
      blob.name = fileName
      return blob
    },
    changeRoom(data, index) {
      console.log('data', data)
      this.activeId = data.chatUid
      this.chatGroup = data.chatGroup
      this.kefuUid = data.kefuUid
      this.active = index
      this.getlogDetail()
    },
    toBottom() {
      var ele = document.getElementById('chatDetailBox')
      ele.scrollTop = ele.scrollHeight
    },
    compressPic(base64, scale, callback) {
      const that = this
      let _img = new Image()
      _img.src = base64
      _img.onload = function () {
        let _canvas = document.createElement('canvas')
        let w = this.width / scale
        let h = this.height / scale
        _canvas.setAttribute('width', w)
        _canvas.setAttribute('height', h)
        _canvas.getContext('2d').drawImage(this, 0, 0, w, h)
        let base64 = _canvas.toDataURL('image/jpeg')
        // 当canvas对象的原型中没有toBlob方法的时候，手动添加该方法
        if (!HTMLCanvasElement.prototype.toBlob) {
          Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function (callback, type, quality) {
              let binStr = atob(this.toDataURL(type, quality).split(',')[1]),
                len = binStr.length,
                arr = new Uint8Array(len)
              for (let i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i)
              }
              callback(new Blob([arr], { type: type || 'image/png' }))
            },
          })
        } else {
          _canvas.toBlob(function (blob) {
            if (blob.size > 1024 * 1024) {
              that.compressPic(base64, scale, callback)
            } else {
              callback(blob, base64)
            }
          }, 'image/jpeg')
        }
      }
    },
  },
  mounted() {
    const that = this
    document.body.addEventListener('paste', function (event) {
      // 获取当前输入框内的文字
      const oldText = that.$refs.chatTextarea.textContent
      // 读取图片
      let items = event.clipboardData && event.clipboardData.items
      let file = null
      if (items && items.length) {
        // 检索剪切板items
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            file = items[i].getAsFile()
            break
          }
        }
      }
      // 预览图片
      const reader = new FileReader()
      reader.onload = function (event) {
        // 图片内容
        const imgContent = event.target.result
        // 创建img标签
        let img = document.createElement('img') //创建一个img
        // 获取当前base64图片信息，计算当前图片宽高以及压缩比例
        let imgObj = new Image()
        let imgWidth = ''
        let imgHeight = ''
        let scale = 1
        imgObj.src = imgContent
        imgObj.onload = function () {
          // 计算img宽高
          if (this.width < 400) {
            imgWidth = this.width
            imgHeight = this.height
          } else {
            // 输入框图片显示缩小10倍
            imgWidth = this.width / 2
            imgHeight = this.height / 2
            // 图片宽度大于1920，图片压缩5倍
            if (this.width > 1920) {
              // 真实比例缩小5倍
              scale = 5
            }
          }
          // 设置可编辑div中图片宽高
          img.width = imgWidth
          img.height = imgHeight
          // 压缩图片，渲染页面
          that.compressPic(imgContent, scale, function (newBlob, newBase) {
            // 删除可编辑div中的图片名称
            that.$refs.chatTextarea.textContent = oldText
            img.src = newBase //设置链接
            // 图片渲染
            that.$refs.chatTextarea.append(img)
          })
        }
      }
      reader.readAsDataURL(file)
    })
  },
}
</script>
<style lang="scss">
@import '../../assets/css/emoji.css';
.creatNewChat {
  float: right;
  cursor: pointer;
  color: #5470c6;
}
.el-form-item__label {
  width: 200px;
  text-align: right;
}
.chatMsginp {
  width: calc(100% - 22px);
  border: 1px solid #ebeef5;
  margin: 0;
  padding: 35px 10px 0px;
  margin-top: -16px;
  outline: none;
  font-size: 16px;
  height: 200px;
}
.leftListText {
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  word-break: keep-all;
  padding: 9px 0 5px;
  height: 20px;
}
.oprationEmoji {
  position: absolute;
  margin-top: -10px;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  img {
    height: 35px;
    width: 35px;
  }
}
.emoji-item-common {
  background: url('../../assets/img/emoji_sprite.png');
  display: inline-block;
  &:hover {
    cursor: pointer;
  }
}
.emoji-size-small {
  // 表情大小
  zoom: 0.8;
}
.emoji-size-large {
  zoom: 0.5; // emojipanel表情大小
  margin: 4px;
}
.creatChat {
  cursor: pointer;
  font-size: 26px;
}
.duteStatus {
  cursor: pointer;
  margin-left: 35px;
}
.duteOnline i {
  color: #5470c6;
}
</style>