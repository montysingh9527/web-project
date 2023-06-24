
###### 无限评论
```
1、任务 
    - 数据表
        localStorage -> 
            {
                id: new Date().getTime(),
                pid: 评论0  回复 -> 父亲的id
                uid: 用户id
                username: 用户名
                comment: 评论的内容
            }

    - 用户
        - 1、zhangshan
        - 2、 lisi
        - 3、 wangwu
    
    - 树形结构化
        {id:123, pid: 0, uid: 1, username: "zhangsan", comment: "你好" }
        {id:234, pid: 123, uid: 2, username: "lisi", comment: "你好呀" }

        [
            {
                {
                    id: 123,
                    pid: 0,
                    uid: 1,
                    username: "zhangsan",
                    comment: "你好",
                    children: [
                        {id:234, pid: 123, uid: 2, username:"lisi", comment: "你好呀！"}
                    ]
                }
            }
        ]
    - 功能
        1、评论
        2、评论回复 无限级 -> 递归组件/树形结构化
```
