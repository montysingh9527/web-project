<template>
  <van-tabbar route active-color="#ee3429" inactive-color="#d5d5d5">
    <van-tabbar-item v-for="({ name, icon, to }, index) in tabs" :key="index" :to="to">
      <span>{{ name }}</span>
      <template #icon="props">
        <img :src="props.active ? icon.active : icon.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { onMounted, ref, defineComponent, reactive } from "vue";
import homeInacIcon from "@/assets/img/home_inac_icon.png";
import homeAcIcon from "@/assets/img/home_ac_icon.png";
import historyInacIcon from "@/assets/img/history_inac_icon.png";
import historyAcIcon from "@/assets/img/history_ac_icon.png";
import profileInacIcon from "@/assets/img/profile_inac_icon.png";
import profileAcIcon from "@/assets/img/profile_ac_icon.png";
import teactAcIcon from "@/assets/img/team_ac.png";
import teactIcon from "@/assets/img/team.png";
import { useStore, mapGetters } from "vuex";
export default defineComponent({
  name: "CTabbar",
  components: {},
  setup(props, context) {
    let tabs = [];
    const store = useStore();
    // onMounted(() => {
    let type = store.getters.agent_type;

    tabs = [
      {
        name: "Lotteries",
        icon: {
          active: homeAcIcon,
          inactive: homeInacIcon,
        },
        to: "/home",
      },
      {
        name: "Promotion",
        icon: {
          active: historyAcIcon,
          inactive: historyInacIcon,
        },
        to: "/promotion",
      },
      {
        name: "Customer",
        icon: {
          active: teactAcIcon,
          inactive: teactIcon,
        },
        to: "/customer",
      },
      {
        name: "My account",
        icon: {
          active: profileAcIcon,
          inactive: profileInacIcon,
        },
        to: "/profile",
      },
    ];

    // });
    // computed(() => store.state.games.currentIssue);
    return {
      tabs,
    };
  },
});
</script>
<style lang="scss" scoped>
.van-tabbar {
  height: 50px;

  .iconfont {
    font-size: 20px;
  }

  ::v-deep(.van-tabbar-item__text) {
    white-space: nowrap;
    overflow: hidden;
    width: 20vw;
    text-overflow: ellipsis;
    text-align: center;
    color: #969799;
    font-size: 12px;
  }

  // ::v-deep(.van-tabbar-item__icon) {
  //   margin-top: 5px;
  // }

  .center {
    position: relative;
    top: -15px;

    .iconfont {
      color: #ff2d2c;
      background: #ffe686;
      border: 2px solid #ff2d2c;
      padding: 1px;
      border-radius: 100%;
    }
  }
}
</style>
