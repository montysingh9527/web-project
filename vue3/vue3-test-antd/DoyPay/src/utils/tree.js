let userTree = [
  {
    value: 1,
    label: '会员管理',
    type:'menu',
    children: [
      {
        value: 1001,
        label: '会员列表',
        children: [
          {
            value: 10010,
            label: '列表',
            type:'priv',
            api:'user/userList'
          },
          {
            value: 10011,
            label: '编辑',
            type:'priv',
            api:'user/editUser'
          },
          {
            value: 10014,
            label: '订单',
            type:'menu'
          },
          {
            value: 10015,
            label: '银行',
            type:'menu'
          },
          {
            value: 10012,
            label: '登出',
            type:'priv',
            api:'admin/logout'
          },
          {
            value: 10013,
            label: '删除',
            type:'priv',
            api:'user/delUser'
          },

          {
            value: 10016,
            label: '开通商户',
            type:'priv',
            api:'user/applyMerchant'
          },
          {
            value: 10017,
            label: '商户信息',
            type:'menu'
          },
        ],
      },
      {
        value: 1002,
        label: '登录日志',
        type:'menu',
        children:[
          {
            value: 10020,
            label: '列表',
            type:'priv',
            api:'user/loginList',
          }
        ]
      },
      {
        value: 1003,
        label: '操作日志',
        type:'menu',
        children:[
          {
            value: 10030,
            label: '列表',
            type:'priv',
            api:'user/actionList',
          }
        ]
      },
      {
        value: 1004,
        label: '银行信息',
        type:'menu',
        children: [
          {
            value: 10040,
            label: '列表',
            type:'priv',
            api:'user/bankList'
          },
          {
            value: 10041,
            label: '删除全部银行',
            type:'priv',
            api:'user/delBankAll'
          },
          {
            value: 10042,
            label: '编辑',
            type:'priv',
            api:'user/editBank'
          },
        ],
      },
      {
        value: 1005,
        label: '评价列表',
        type:'menu',
        children:[
          {
            value: 10050,
            label: '列表',
            type:'priv',
            api:'user/commentList',
          }
        ]
      },
      {
        value: 1007,
        type:'menu',
        label: '支付订单列表',
        children: [
          {
            value: 10070,
            label: '列表',
            type:'priv',
            api:'order/getPayList'
          },
          {
            value: 10071,
            label: '补发通知',
            type:'priv',
            api:'order/patchPayNotice'
          },
        ],
      },
    ],
  },
  {
    value: 3,
    label: '订单管理',
    type:'menu',
    children: [
      {
        value: 3001,
        label: '买卖记录',
        type:'menu',
        children: [
          {
            value: 30010,
            label: '列表',
            type:'priv',
            api:'order/getList'
          },
          {
            value: 30012,
            label: '编辑备注',
            type:'priv',
            api:'order/editOrderRemark'
          },
          {
            value: 30011,
            label: '取消订单',
            type:'priv',
            api:'order/cancelOrder'
          }
        ],
      },
      {
        value: 3002,
        label: '账变记录',
        type:'menu',
        children: [
          {
            value: 30020,
            label: '列表',
            type:'priv',
            api:'order/coinLogList'
          },
          {
            value: 30021,
            label: '编辑备注',
            type:'priv',
            api:'order/editCoinLogRemark'
          },
        ],
      },
      {
        value: 3004,
        label: '交易记录',
        type:'menu',
        children: [
          {
            value: 30040,
            label: '列表',
            type:'priv',
            api:'order/getList'
          },
          {
            value: 30042,
            label: '编辑备注',
            type:'priv',
            api:'order/editOrderRemark'
          },
          {
            value: 30041,
            label: '取消订单',
            type:'priv',
            api:'order/cancelOrder'
          },
        ],
      },
      {
        value: 3005,
        label: '交易报表',
        type:'menu',
        children:[
          {
            value: 30050,
            label: '列表',
            type:'priv',
            api:'stat/index'
          }
        ]
      },
      {
        value: 3006,
        label: '打币记录',
        type:'menu',
        children:[
          {
            value: 30060,
            label: '列表',
            type:'priv',
            api:'order/getList'
          }
        ]
      },
    ],
  },
  {
    value: 2,
    label: '管理人员',
    type:'menu',
    children: [
      {
        value: 2001,
        label: '管理员',
        children: [
          {
            value: 20010,
            label: '列表',
            type:'priv',
            api:'admin/adminList'
          },
          {
            value: 20011,
            label: '添加',
            type:'priv',
            api:'admin/addAdmin'
          },
          {
            value: 20012,
            label: '修改密码',
            type:'priv',
            api:'admin/editOtherLoginPwd'
          },
          {
            value: 20013,
            label: '踢下线',
            type:'priv',
            api:'admin/kickOffAdmin'
          },
          {
            value: 20014,
            label: '修改信息',
            type:'priv',
            api: 'admin/editAdmin'
          },
          {
            value: 20015,
            label: '删除管理员',
            type:'priv',
            api:'admin/delAdmin'
          },
          {
            value: 20016,
            label: '设为客服',
            type:'priv',
            api:'chat/addKefu'
          },
        ],
      },
      {
        value: 2002,
        label: '角色列表',
        type:'menu',
        children: [
          {
            value: 20020,
            label: '列表',
            type:'priv',
            api:'admin/roleList'
          },
          {
            value: 20021,
            label: '添加',
            type:'priv',
            api:'admin/addRole'
          },
          {
            value: 20022,
            label: '编辑',
            type:'priv',
            api:'admin/editRole'
          },
          {
            value: 20023,
            label: '删除',
            type:'priv',
            api:'admin/delRole'
          },
        ],
      },
      {
        value: 2003,
        label: '操作日志',
        type:'menu',
        children:[
          {
            value: 20030,
            label: '列表',
            type:'priv',
            api:'admin/adminLog'
          }
        ]
      },
    ],
  },
  {
    value: 4,
    label: '系统设置',
    type:'menu',
    children: [
      {
        value: 4001,
        label: '配置列表',
        type:'priv',
        api:'system/settings'
      },
    ],
  },
  {
    value: 6,
    label: '聊天设置',
    type:'menu',
    children: [
      {
        value: 6001,
        label: '快捷聊天设置',
        type:'menu',
        children: [
          {
            value: 60010,
            label: '列表',
            type:'priv',
            api:'chat/chatTemplateList'
          },
          {
            value: 60011,
            label: '添加',
            type:'priv',
            api:'chat/addChatTemplate'
          },
          {
            value: 60012,
            label: '编辑',
            type:'priv',
            api:'chat/editChatTemplate'
          },
          {
            value: 60013,
            label: '删除',
            type:'priv',
            api:'chat/delChatTemplate'
          },
        ],
      },
    ],
  },
  {
    value: 7,
    label: '在线客服',
    type:'menu',
    children: [
      {
        value: 7001,
        label: '聊天记录',
        type:'priv',
        api:'chat/logList'
      },
      {
        value: 7002,
        label: '咨询记录',
        type:'priv',
        api:'chat/kefuLogList'

      },
      {
        value: 7003,
        label: '客服列表',
        type:'priv',
        api:'chat/kefuList'
      },
    ],
  },
  {
    value: 5,
    label: '公告',
    type:'menu',
    children: [
      {
        value: 5001,
        label: '平台公告',
        type:'menu',
        children: [
          {
            value: 50010,
            label: '列表',
            type:'priv',
            api:'notice/index'
          },
          {
            value: 50011,
            label: '添加',
            type:'priv',
            api:'notice/addNotice'
          },
          {
            value: 50012,
            label: '编辑',
            type:'priv',
            api:'notice/editNotice'
          },
          {
            value: 50013,
            label: '删除',
            type:'priv',
            api:'notice/delNotice'
          },
        ],
      },
    ],
  },
  {
    value: 0,
    label: '首页',
    type:'menu',
    children:[
      {
        value: '00010',
        label: '列表',
        type:'priv',
        api:'home/index'
      }
    ]
  },
]

export default userTree
