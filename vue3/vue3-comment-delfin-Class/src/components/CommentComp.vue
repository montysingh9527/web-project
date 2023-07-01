<!-- 消息展示组件 -->
<template>
  <li v-for="item of props.data" :key="item.id">
    <p>{{ item.username }}</p>
    <p>{{ item.comment }}</p>
    <a href="javascript:;" @click="setReplyFlag(item)">回复</a>
    <div v-if="item.isReply">
      <p>
        <textarea v-model="item.replyText" ols="40" rows="2"></textarea>
      </p>
      <p>
        <button @click="addReply(item)">提交回复</button>
      </p>
    </div>
    <div v-if="item.children">
      <ul>
        <!-- 递归当前组件 -->
        <CommentComp :data="item.children" :user-info="userInfo" @add-reply="addReply"></CommentComp>
      </ul>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  data: Array,
  userInfo: Object,
});

const emit = defineEmits(["addReply"]);

/**
 * 回复框显示
 * @param {*} item
 */
const setReplyFlag = (item) => {
  item.isReply = !item.isReply;
};

const addReply = (item) => {
  const replyText = item.replyText;
  // item当前评论下回复. replyText回复文字
  emit("addReply", item, replyText, props.userInfo);
  // 隐藏输入框
  item.isReply = false;
  // 清空输入框
  item.replyText = "";
};
</script>

<style scoped lang="scss">
</style>
