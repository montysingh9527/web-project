<!-- 头部 -->
<template>
  <div class="menu_position">
    <!-- logo -->
    <img src="/img/logo.png" alt="logo" />
    <div class="box-content"></div>
    <!-- 选项 -->
    <div class="header-menu">
      <div
        @click.stop="onItem(item)"
        :class="[![3].includes(item.id) ? 'menu-lists' : 'menu-list']"
        v-for="(item, index) in menu_list"
        :key="index"
      >
        <span class="menu-list-name">{{ item[active_lan] }}</span>
        <span :class="[active_idx ? 'dot-list1' : 'dot-list']"></span>
        <div class="menu-list-about" v-if="active_idx">
          <div
            @click.stop="onItem(item, 1)"
            class="about-item"
            v-for="(val, idx) in item.list"
            :key="idx"
          >
            {{ val[active_lan] }}
          </div>
        </div>
      </div>
      <!-- 语言选择 -->
      <div class="menu-lan" @click="lan_idx = !lan_idx">
        <img :src="language_obj[active_lan].img" alt="" />
        <span> {{ language_obj[active_lan].name }}</span>
        <span :class="[ lan_idx ? 'lan-dot1' : 'lan-dot']"></span>
        <div class="menu-lan-list" v-if="lan_idx">
          <div @click.stop="onLanItem(lan)" v-for="(lan, index) in language_obj" :key="index" class="lan-name">
            <img :src="lan.img" alt="" />
            <span >{{ lan.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      menu_list: [
        {
          id: 1,
          zh: "首页",
          en: "Home",
          tag: "home",
        },
        {
          id: 2,
          zh: "关于我们",
          en: "About",
          tag: "about",
        },
        {
          id: 3,
          zh: "游戏产品",
          en: "Products",
          tag: "products",
          list: [
            {
              id: 31,
              zh: "游戏产品",
              en: "Products",
              tag: "products",
            },
            {
              id: 32,
              zh: "精选项目",
              en: "Featured",
              tag: "featured",
            },
          ],
        },
        {
          id: 4,
          zh: "产业讯息",
          en: "Industry info",
          tag: "industry",
        },
        {
          id: 5,
          zh: "外部游戏产品",
          en: "External Gaming Products",
          tag: "external",
        },
        {
          id: 6,
          zh: "合作",
          en: "Cooperation",
          tag: "cooperation",
        },
        {
          id: 7,
          zh: "联系我们",
          en: "Contact Us",
          tag: "contact",
        },
      ],
      // 选中语言
      active_lan: "zh",
      // 可选语言
      language_obj: {
        zh: {
          name: "简体中文",
          img: "/img/china.png",
          tag: "zh",
        },
        en: {
          name: "English",
          img: "/img/AU.png",
          tag: "en",
        },
      },
      active_idx: false,
      lan_idx: false,
    };
  },
  computed: {
  },
  created() {},
  mounted() {},
  methods: {
    onItem(data, id) {
      if (data.id == 3) {
        this.active_idx = !this.active_idx;
      }
    },
    onLanItem(data){
      this.active_lan = data.tag;
      this.lan_idx = !this.lan_idx;
    }
  },
};
</script>

<style scoped lang="scss">
.menu_position {
  position: fixed;
  top: 0;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0 20px;
  background-color: #efe29e;
  img {
    height: 100%;
  }
  .box-content {
    background-color: rgb(72, 232, 221);
    flex-grow: 1;
  }
  .header-menu {
    min-width: 400px;
    display: flex;
    background-color: #c384ea;
    height: 100%;
    align-items: center;
    .menu-lists {
      margin: 0 20px;
      padding: 0 10px;
      color: #000;
      cursor: pointer;
      &:hover {
        color: #ff5c26;
        transform: scale(1.2);
        transition: all 0.2s ease-in;
      }
    }
    .menu-list {
      margin: 0 20px;
      padding: 0 10px;
      color: #000;
      cursor: pointer;
      position: relative;
      .dot-list {
        position: absolute;
        top: 8px;
        right: -8px;
        transform: rotate(180deg);
        border: 6px solid transparent;
        border-bottom: 6px solid #191717;
      }
      .dot-list1 {
        position: absolute;
        right: -8px;
        border: 6px solid transparent;
        border-bottom: 6px solid #191717;
      }
      .menu-list-about {
        position: absolute;
        top: 40px;
        min-width: 100px;
        text-align: center;
        .about-item {
          background-color: #efe29e;
          padding: 5px 0;
          &:hover {
            background-color: #ff5c26;
          }
        }
      }
    }
    .menu-lan {
      display: flex;
      align-items: center;
      margin-right: 10px;
      position: relative;
      cursor: pointer;
      img {
        margin-right: 4px;
      }
      .lan-dot {
        width: 10px;
        height: 10px;
        margin-left: 5px;
        margin-top: 5px;
        transform: rotate(180deg);
        border: 6px solid transparent;
        border-bottom: 6px solid #fff;
      }
      .lan-dot1 {
        width: 10px;
        height: 10px;
        margin-left: 5px;
        margin-top: -8px;
        border: 6px solid transparent;
        border-bottom: 6px solid #fff;
      }

      .menu-lan-list {
        position: absolute;
        top: 40px;
        left: -10px;
        min-width: 125px;
        background-color: #efe29e;
        padding: 10px 5px;
        img {
          vertical-align: middle;
        }
        .lan-name {
          padding: 5px 0;
          &:hover {
            background-color: #ff5c26;
          }
        }
      }
    }
  }
}
</style>
