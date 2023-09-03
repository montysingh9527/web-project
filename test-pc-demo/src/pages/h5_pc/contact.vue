<template>
  <div class="contact-content">
    <div class="contact-header">
      <div class="contact-img">
        <img src="/img/about.png" alt="" />
        <img class="contact-img1" src="/img/AU.png" alt="" />
      </div>
    </div>
    <div class="q-mt-md q-gutter-md row">
      <div class="item-col col-3" v-for="(item, index) in imglist" :key="index">
        <img class="item-img" :src="item.img" alt="" />
        <img class="item-imgau" src="~app/public/img/AU.png" alt="">
        <p class="text-center">{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "contact",
  data() {
    return {
      imglist: [
        {
          img: "/img/about.png",
          text: "图一",
        },
        {
          img: "/img/about.png",
          text: "图二",
        },
        {
          img: "/img/about.png",
          text: "图三",
        },
      ],
    };
  },
  created() {},
  methods: {
   
    init(row){

    }
  },
};
</script>

<style scoped lang="scss">
.contact-content {
  height: 100vh;
  width: 100vw;
  background: #000;
  padding: 0 40px;
  .contact-header {
    text-align: center;
    .contact-img {
      width: 400px;
      position: relative;
      margin: 0 auto;
      img {
        width: 400px;
      }
      .contact-img1 {
        width: 40px;
        position: absolute;
        top: 50px;
        right: 60px;
      }
    }
  }
  .item-col {
    position: relative;
    background: #b88d8d;
    .item-img {
      width: 100%;
    }
    .item-imgau {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
    // img {
    //   cursor: pointer;
    //   &:hover {
    //     opacity: 0.7;
    //     background: url("~app/public/img/AU.png") no-repeat;
    //   }
    //   &::after {
    //     content: "";
    //     width: 100px;
    //     height: 100px;
    //     background: url("~app/public/img/AU.png") no-repeat;
    //   }
    //   // position: absolute;
    // }
  }
}
</style>
