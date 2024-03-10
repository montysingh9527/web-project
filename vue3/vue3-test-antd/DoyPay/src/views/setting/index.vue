<template>
  <div class="userManagement-container settingsBox">
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index, key) in tabList"
        :key="key"
        :label="item"
        :id="index"
      >
        <el-form ref="form" :model="copyForm">
          <el-form-item
            v-for="(item, index) in list"
            :key="index"
            v-if="item.isShow == 1"
          >
            <span slot="label" style="position: relative">
              <span class="span-box">
                <span>{{ item.title }}</span>
                <br />
                <span
                  v-if="item.remark"
                  style="
                    font-size: 12px;
                    color: #9e9a9a;
                    position: absolute;
                    right: 0;
                    top: 12px;
                    line-height: 22px;
                  "
                >
                  ({{ item.remark }})
                </span>
              </span>
            </span>
            <div v-if="item.formTag == 'input'">
              <el-input
                v-if="item.name != 'chat_quick_talk_tpl'"
                v-model="copyForm[item.name]"
                type="text"
                autocomplete="off"
                style="width: 80%"
              ></el-input>
              <el-input
                v-else
                value="暂不支持"
                type="text"
                autocomplete="off"
                style="width: 80%"
              ></el-input>
              <span v-if="item.name == 'chat_quick_talk_tpl'">
                例子：{{ item.value }}
              </span>
            </div>
            <div v-if="item.formTag == 'radio'">
              <el-radio
                v-model="copyForm[item.name]"
                v-for="(value, name, index1) in JSON.parse(item.formValue)"
                :label="name"
                :key="index1"
              >
                {{ value }}
              </el-radio>
            </div>
            <div v-if="item.formTag == 'checkbox'">
              <el-checkbox-group v-model="copyForm[item.name]">
                <el-checkbox
                  v-for="(value,name,index4) in JSON.parse(item.formValue)"
                  :label="name"
                  :key="index4"
                >
                {{value}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-if="item.formTag == 'textarea'">
              <el-input
                type="textarea"
                style="width: 80%; height: 200px"
                v-model="copyForm[item.name]"
              ></el-input>
            </div>
            <div v-if="item.formTag == 'ueditor'">
              <quill-editor
                ref="myQuillEditor"
                :options="editorOption"
                @change="onEditorChange($event)"
                @ready="onEditorReady($event)"
              />
            </div>
          </el-form-item>
          <el-button type="primary" @click="save">确 定</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getSetting, updateSetting } from '@/api/system'
import Edit from './components/adminEdit'
import Add from './components/adminAdd'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'UserManagement',
  components: { Edit, Add, quillEditor },
  data() {
    return {
      list: null,
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      selectRows: '',
      elementLoadingText: '正在加载...',
      queryForm: {
        type: 0,
      },
      tabList: null,
      settings: {},
      copyForm: {},
      editorOption: {
        theme: 'snow',
        bounds: document.body,
        debug: 'warn',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ color: [] }, { background: [] }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            [{ direction: 'rtl' }],
            [{ font: [] }],
            ['clean'],
            ['link', 'image'],
          ],
        },
        placeholder: '内容...',
        readOnly: false,
      },
      editorData: '',
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
  },
  created() {
    this.fetchData()
  },
  methods: {
    onEditorReady(e) {
      e.container.querySelector('.ql-blank').innerHTML =
        this.copyForm.alter_asset
    },
    onEditorChange({ quill, html, text }) {
      this.copyForm.alter_asset = html
    },
    setSelectRows(val) {
      this.selectRows = val
    },
    handleAdd(row) {
      this.$refs['add'].showAdd(row)
    },
    handleEdit(row) {
      this.$refs['edit'].showEdit(row)
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
    async fetchData() {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 300)
      const { data } = await getSetting(this.queryForm)
      this.tabList = data.dataMap.typeMap
      this.list = data.list
      for (let i in this.list) {
        if(this.list[i].formTag == 'checkbox'){
          this.settings[this.list[i].name] = this.list[i].checkboxData
        }else {
          this.settings[this.list[i].name] = this.list[i].value
        }
      }
      this.copyForm = {};
      this.copyForm = Object.assign({}, this.settings)
    },
    async save() {
      for (let i in this.copyForm) {
        if(typeof this.copyForm[i] == 'object'){
          this.copyForm[i] = this.copyForm[i].join(',')
        }
      }
      this.copyForm.chat_quick_talk_tpl = ''
      const { msg } = await updateSetting(this.copyForm)
      this.$baseMessage(msg, 'success')
      this.fetchData();
    },
    handleClick(tab, event) {
      this.queryForm.type = tab.$attrs.id
      this.fetchData()
    },
  },
}
</script>
<style>
.el-form-item__label {
  width: 200px;
  text-align: right;
}
</style>