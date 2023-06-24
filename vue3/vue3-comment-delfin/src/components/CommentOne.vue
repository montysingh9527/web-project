<template>
  <div>
    <div>
      <p>
        <textarea v-model="state.commentText" cols="30" rows="3"></textarea>
      </p>
      <p>
        <button @click="addComment">提价评论</button>
      </p>
    </div>
    <div>
      <ul>
        <CommentComp
          :data="state.commentTree"
          @add-reply="addReply"
        ></CommentComp>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import useUserInfoStore from "../store/user";
import CommentComp from "./CommentComp.vue"; // 消息展示

const userInfoStore = useUserInfoStore();

const state = reactive({
  commentText: "", // 输入文字
  commentTree: formatTree(getComment("one")), // 评论数据
});

/**
 * 添加评论
 */
const addComment = () => {
  const { id, username } = userInfoStore.userInfo;
  const commentInfo = {
    id: new Date().getTime(),
    pid: 0,
    uid: id,
    username,
    comment: state.commentText,
  };
  setComment("one", commentInfo);
  state.commentTree.unshift(commentInfo);
  // 清空输入框
  state.commentText = "";
};

/**
 * 提交回复
 * @param {*} item  当前回复项(父id)
 * @param {*} replyText  回复消息
 */
const addReply = (item, replyText) => {
  const { id, username } = userInfoStore.userInfo;
  // 回复的消息内容
  const replyInfo = {
    id: new Date().getTime(),
    pid: item.id, // 父id(在哪条消息下回复)
    uid: id,
    username,
    comment: replyText, // 消息内容
  };
  (item.children || (item.children = [])).unshift(replyInfo);
  // 存入消息
  setComment("one", replyInfo);
};

/**
 * 取数据
 * @param {*} field
 */
function getComment(field) {
  return JSON.parse(localStorage.getItem(field) || "[]");
}

/**
 * 存放数据
 * @param {*} field
 * @param {*} comment
 */
function setComment(field, comment) {
  const commentList = JSON.parse(localStorage.getItem(field) || "[]");
  commentList.unshift(comment);
  localStorage.setItem(field, JSON.stringify(commentList));
}

/**
 * 树形化回复数据
 * @param {*} data
 */
function formatTree(data) {
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
</script>

<style scoped lang="scss">
</style>
