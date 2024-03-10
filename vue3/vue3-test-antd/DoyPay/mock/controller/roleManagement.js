const totalCount = 2
const List = [
  {
    id: '@id',
    permission: 'admin',
  },
  {
    id: '@id',
    permission: 'editor',
  },
]
module.exports = [
  {
    url: '/roleManagement/getList',
    type: 'post',
    response(config) {
      const { title = '', page = 1, rows = 20 } = config.body
      let mockList = List.filter((item) => {
        return !(title && item.title.indexOf(title) < 0)
      })
      const pageList = mockList.filter(
        (item, index) =>
          index < rows * page && index >= rows * (page - 1)
      )
      return {
        code: 200,
        msg: 'success',
        totalCount,
        data: pageList,
      }
    },
  },
  {
    url: '/roleManagement/doEdit',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/roleManagement/doDelete',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
]
