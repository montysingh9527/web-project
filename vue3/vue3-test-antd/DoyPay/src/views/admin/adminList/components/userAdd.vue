<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="1">启用</el-radio>
          <el-radio label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限">
        <!-- <el-tree
          :data="tree"
          show-checkbox
          node-key="id"
          ref="tree"
          default-expand-all
        ></el-tree> -->
        <el-cascader-panel
          style="height: 300px"
          :options="tree"
          ref="cascader"
          @change="handleChange"
          v-model="treeData"
          :props="{ multiple: true }"
        ></el-cascader-panel>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addRole, editRole, allMenuList } from '@/api/adminList'
import { mapGetters } from 'vuex'
import userTree from '@/utils/tree'
export default {
  name: 'adminAdd',
  data() {
    return {
      form: {
        name: '',
        status: '1',
        privs: '',
        treeData: '',
      },
      selectedOptions: [],
      rules: {
        usr: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        name: [{ required: true, trigger: 'blur', message: '请输入姓名' }],
        roleId: [{ required: true, trigger: 'blur', message: '请选择权限' }],
      },
      title: '',
      dialogFormVisible: false,
      tree: '',
      privs: '',
      treeData: '',
      isEdit: '',
    }
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters({
      permissionsTree: 'user/permissionsTree',
    }),
  },
  methods: {
    showAdd(row) {
      this.getallMenuList()
      if (!row) {
        this.title = '添加角色'
        this.isEdit = false
      } else {
        this.isEdit = true
        this.title = '编辑角色'
        this.form = Object.assign({}, row)
        console.log('row.treeData', row.treeData)
        if (row.treeData) {
          this.treeData = JSON.parse(row.treeData)
        }
      }
      this.dialogFormVisible = true
    },
    close() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.dialogFormVisible = false
    },
    save() {
      this.form.privs = this.selectedOptions.join(',')
      this.form.treeData = JSON.stringify(this.treeData)
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          let data = ''
          if (this.isEdit) {
            data = await editRole(this.form)
          } else {
            data = await addRole(this.form)
          }
          if (data.code == 0) {
            this.$baseMessage(data.msg, 'success')
            this.$emit('fetch-data')
            this.close()
          }
        } else {
          return false
        }
      })
    },
    async getallMenuList() {
      let data = await allMenuList()
      this.tree = data.data
    },
    handleChange(value) {
      if (value.length > 0) {
        // 获取当前选中节点
        this.selectedOptions = []
        let checkNode = this.$refs['cascader'].getCheckedNodes()
        for (var i of checkNode) {
          this.selectedOptions.push(i.value)
        }
      }
    },
  },
}
</script>
<style>
.el-cascader-menu__wrap {
  min-height: 300px;
}
</style>
