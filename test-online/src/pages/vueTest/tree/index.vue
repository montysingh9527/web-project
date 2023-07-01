<template>
  <div class="q-pa-md row q-col-gutter-sm">
    <q-input
      filled
      v-model="modelfilter"
      label="树形结构查询"
      placeholder="请输入..."
      @input="changeput($event)"
    />
    <q-tree
      dense
      class="col-12 col-sm-6"
      :nodes="treenode"
      node-key="label"
      tick-strategy="leaf"
      :selected.sync="selected"
      :ticked.sync="ticked"
      :expanded.sync="expandedKeys"
      @update="updataTree"
    />
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      modelfilter: "",
      ticked: [], // 勾选的节点的键
      selected: [], // 当前所选节点的键
      expandedKeys: [
        "1",
        "11",
        "2",
        "3",
        "4",
        "5",
        "51",
        "52",
        "6",
        "61",
        "611",
        "6111",
      ], // 展开的节点
      treenode: [],
      treedata: [
        {
          id: 1,
          label: "1",
          children: [
            {
              id: 11,
              label: "11",
              children: [
                { id: 12, label: "111" },
                { id: 13, label: "112" },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "2",
          children: [
            { id: 21, label: "21" },
            { id: 22, label: "22" },
            { id: 23, label: "23" },
          ],
        },
        {
          id: 3,
          label: "3",
        },
        {
          id: 4,
          label: "4",
        },
        {
          id: 5,
          label: "5",
          children: [
            {
              id: 51,
              label: "51",
              children: [
                {
                  id: 511,
                  label: "511",
                },
                {
                  id: 512,
                  label: "512",
                },
              ],
            },
            {
              id: 52,
              label: "52",
              children: [
                {
                  id: 521,
                  label: "521",
                },
                {
                  id: 522,
                  label: "522",
                },
              ],
            },
          ],
        },
        {
          id: 6,
          label: "6",
          children: [
            {
              id: 61,
              label: "61",
              children: [
                {
                  id: 611,
                  label: "611",
                  children: [
                    {
                      id: 6111,
                      label: "6111",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },
  created() {
    this.initdata();
  },
  methods: {
    changeput(val) {
      // 没有查询文字,重置tree
      if (!val) {
        this.initdata();
        console.log("重置.");
        return false;
      }
      // 深拷贝一份数据
      let domainData = JSON.parse(JSON.stringify(this.treedata));
      // 数据源 和 查询文字
      const listTree = this.deeptree(domainData, val);
      this.treenode = listTree;
    },
    /**
     * 递归查询
     * @param {*} datalist 数据源
     * @param {*} text 搜索文字
     */
    deeptree(datalist, text) {
      let newArr = [];
      datalist.forEach((ele) => {
        // 判断label与输入文字是否匹配
        if (ele.label.includes(text)) {
          newArr.push(ele);
        } else {
          if (ele.children && ele.children.length > 0) {
            let redata = this.deeptree(ele.children, text);
            if (redata && redata.length > 0) {
              let obj = {
                ...ele,
                children: redata,
              };
              newArr.push(obj);
            }
          }
        }
      });
      return newArr;
    },
    // 重置
    initdata() {
      this.treenode = JSON.parse(JSON.stringify(this.treedata));
    },
  },
};
</script>