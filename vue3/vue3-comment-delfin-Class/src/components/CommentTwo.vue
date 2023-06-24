<template>
    <div>
      <div>
        <p>
          <textarea v-model="state.commentText" cols="30" rows="3"></textarea>
        </p>
        <p>
          <button @click="addComment(userInfoStore.userInfo)">提价评论</button>
        </p>
      </div>
      <div>
        <ul>
          <CommentComp
            :data="state.commentTree"
            :user-info="userInfoStore.userInfo"
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
  
  import Comment from "./Comment.js"; 
  
  const userInfoStore = useUserInfoStore();
  
  const { state, addReply, addComment } = new Comment("two");

  </script>
  
  <style scoped lang="scss">
  </style>
  