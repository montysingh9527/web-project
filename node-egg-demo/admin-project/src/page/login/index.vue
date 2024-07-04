<!--
 * @Description: 登录页面
 * @Date: 2024-01-30 00:03:33
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\login\index.vue
-->
<template>
  <div class="login-card">
    <div class="login-card-theme"><theme /></div>
    <div class="login-card-box shadow-14">
      <div class="text-center text-h4">登录</div>
      <q-input v-model.trim="login_form.username" label="账号" class="q-my-md" outlined />
      <q-input @keyup.enter="chang_login" v-model.trim="login_form.password" label="密码" :type="isPwd ? 'password' : 'text'" outlined>
        <template v-slot:append>
          <q-icon @click="isPwd = !isPwd" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" />
        </template>
      </q-input>
      <q-btn @click="chang_login" label="登录" class="q-my-md full-width"></q-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { api_login } from "src/api";
import md5 from "js-md5";
import { useRouter } from "vue-router";
import useUserInfo from "src/store/user.js"
import theme from "src/components/theme.vue";

const { ctx, proxy } = getCurrentInstance();  // 获取组件实例

const login_form = ref({});

const isPwd = ref(true);

const Router = useRouter();
const useUser = useUserInfo();

/**
 * 登录
 */
const chang_login = async () => {
  const { username, password } = login_form.value;
  // const isdel = await proxy.$showDialog({})
  // console.log('---logs-isdel--',isdel);
  if (!username || !password) {
    proxy.$showNotify({ message: "账号或密码不能为空。", color: "negative" })
    return;
  }
  const result = await api_login.user_login({ username, password: md5(password) })
  const { code, message, data } = result;
  if (code == 200) {
    useUser.set_userInfo(data)
    Router.push({ name: "admin_account" });
    proxy.$showNotify({ message });
  } else {
    proxy.$showNotify({ message, color: "negative" });
  }
};
</script>

<style scoped lang="scss">
.login-card {
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-image: var(--q-gb-bg-lg-34);

  &-box {
    width: 300px;
    padding: 30px;
    text-align: center;
  }
  &-theme {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
