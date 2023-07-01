<template>
  <div>
    <h1>{{ userInfoStore.userInfo.username }}</h1>
    <button
      :class="{ active: userInfoStore.userInfo.id === 1 }"
      @click="userInfoStore.setUserInfo({ id: 1, username: 'zhangsan' })"
    >
      张三
    </button>
    <button
      :class="{ active: userInfoStore.userInfo.id === 2 }"
      @click="userInfoStore.setUserInfo({ id: 2, username: 'lisi' })"
    >
      李四
    </button>
    <button
      :class="{ active: userInfoStore.userInfo.id === 3 }"
      @click="userInfoStore.setUserInfo({ id: 3, username: 'wangwu' })"
    >
      王五
    </button>
    <hr />
    <CommentOne></CommentOne>

    <CommentTwo></CommentTwo>
  </div>
</template>
  
<script setup>
import useUserInfo from "./store/user";
import CommentOne from "./components/CommentOne.vue";
import CommentTwo from "./components/CommentTwo.vue";

const userInfoStore = useUserInfo();
</script>
  
<style scoped lang="scss">
.active {
  background-color: #000;
  color: #fff;
}
</style>