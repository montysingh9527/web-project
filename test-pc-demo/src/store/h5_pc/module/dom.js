export default {
  state:{
    height: window.innerHeight,
    zh_en: "zh",
  },
  getters:{
    getheight(state){
      console.log("====state====>>>>",state)
      return state.height;
    },
    getZhEn(state){
      return state.zh_en;
    }
  },
  actions:{
    getZh_en(ctx, lang){
      console.log("======lang====",lang)
      ctx.commit("setZh_en",lang)
    }
  },
  mutations:{
    setZh_en(state, paylad) {
      console.log("======lang====",state,paylad)
      state.zh_en = paylad
    }
  }
}