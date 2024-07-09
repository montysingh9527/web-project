<!--
 * @Description: 登录页面
 * @Date: 2024-01-30 00:03:33
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\login\index.vue
-->
<template>
  <div class="login-card">
    <div class="login-card-theme">
      <div class="q-mr-md">
        <language />
      </div>
      <div>
        <theme />
      </div>
    </div>
    <div class="login-card-box shadow-14">
      <div class="text-center text-h4">{{ $i18n_t('login') }}</div>
      <q-input v-model.trim="login_form.username" :label="$i18n_t('username')" class="q-my-md" outlined />
      <q-input @keyup.enter="chang_login" v-model.trim="login_form.password" :label="$i18n_t('pwd')"
        :type="isPwd ? 'password' : 'text'" outlined>
        <template v-slot:append>
          <q-icon @click="isPwd = !isPwd" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" />
        </template>
      </q-input>
      <q-btn @click="chang_login" class="q-my-md full-width">{{ $i18n_t('login') }}</q-btn>
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
import language from "src/components/language.vue";

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
    proxy.$showNotify({ message: $i18n_t("tips.userempty"), color: "negative" })
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
    display: flex;
    top: 0;
    right: 0;
  }
}
</style>
