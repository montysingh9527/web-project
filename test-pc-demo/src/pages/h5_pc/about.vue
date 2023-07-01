<template>
  <div class="about-container">
    <div class="about-title">
      <span>关于我们</span>
      <lineOrange />
    </div>
    <div class="about-content">
      <div class="about-left">
        <span class="about-left-title">魅族简介</span>
        <p>
          魅族科技是中国大陆一家智能手机、耳机、配件研制与软件开发企业，2003年由黄章等人成立于广东省珠海市。
          2015年，魅族获得阿里巴巴集团领投的6.5亿美元融资，销量增长350%，成为全球增长率最高的智能手机品牌。2016年，手机出货量突破2,200万台，其中海外销量200万台，达到品牌销量巅峰。
        </p>
        <div>
            <div  v-for="(item,index) in about_list" :key="index">
                <p>{{ item.title }}</p>
                <div class="" :style="{background:item.color}">
                    <p>{{ item.text }}</p>
                </div>
            </div>
        </div>
      </div>
      <div class="about-right">
        <img src="/img/about.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import lineOrange from "src/pages/h5_pc/components/line_orange.vue"; // 三个斜杠
export default {
  name: "About",
  components: {
    lineOrange,
  },
  data() {
    return {
        about_list:[{
            title:"效率提升",
            text: "90%",
            num: 90,
            color: "#ffc10f"
        },{
            title:"满意度",
            text: "100%",
            num: 100,
            color: "#ffc10f"
        },{
            title:"经验",
            text: "10年",
            num: 100,
            color: "#fe6933"
        },{
            title:"客户选择",
            text: "100%",
            num: 100,
            color: "#63605f"
        }]
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.about-container {
  height: 400px;
  padding: 10px 20px;
  background: rgb(207, 209, 195);
  .about-title {
    span {
      font-size: 28px;
    }
  }
  .about-content {
    margin: 20px 0;
    display: flex;
    .about-left {
      .about-left-title {
        font-size: 20px;
      }
      p {
        letter-spacing: 1.56px;
        line-height: 30px;
      }
    }
    .about-right {
      img {
        margin-left: 20px;
        width: 600px;
        height: 300px;
      }
    }
  }
}
</style>
