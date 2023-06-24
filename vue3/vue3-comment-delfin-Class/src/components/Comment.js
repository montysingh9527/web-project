import { reactive } from "vue";

export default class Comment {
  constructor(field) {
    this.field = field;
    this.state = reactive({
      commentText: "",
      commentTree: this.commentTree,
    });
  }

  // 获取评论
  get commentTree() {
    return Comment.formatTree(JSON.parse(localStorage.getItem(this.field) || "[]"));
  }
  // 添加评论
  addComment = ({ id, username }) => {
    const commentInfo = {
      id: new Date().getTime(),
      pid: 0,
      uid: id,
      username,
      comment: this.state.commentText,
    };

    this.setCommentList(commentInfo);
    this.setComment(commentInfo);
  };

  // 提交回复
  addReply = (item, replyText, { id, username }) => {
    // 回复的消息内容
    const replyInfo = {
      id: new Date().getTime(),
      pid: item.id, // 父id(在哪条消息下回复)
      uid: id,
      username,
      comment: replyText, // 消息内容
    };

    this.setCommentList(replyInfo);
    this.setReply(item, replyInfo);
  };
  // 设置回复
  setReply(item, reply) {
    (item.children || (item.children = [])).unshift(reply);
  }

  // 添加评论
  setComment(comment) {
    this.state.commentTree.unshift(comment);
    this.state.commentText = "";
  }

  setCommentList(comment) {
    const commentList = JSON.parse(localStorage.getItem(this.field) || "[]");
    commentList.unshift(comment);
    localStorage.setItem(this.field, JSON.stringify(commentList));
  }

  /**
   * 树形化回复数据
   * @param {*} data
   */
  static formatTree(data) {
    const result = [];
    const map = {
      /**
       * 1: item,
       * 2: item
       */
    };
    data.forEach((item) => {
      map[item.id] = item;
    });
    data.forEach((item) => {
      const parent = map[item.pid];
      if (parent) {
        // 父节点是否有子回复
        (parent.children || (parent.children = [])).unshift(item);
      } else {
        result.unshift(item);
      }
    });
    return result;
  }
}
