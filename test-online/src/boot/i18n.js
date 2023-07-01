import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh',   // 默认语言
  fallbackLocale: 'zh', // 默认语言环境(回落语言)。如果locale中无匹配项则采用该项值
  messages
})

// console.log("===messages===",i18n)

// function loadLanguageAsync (lang) {

//   console.log("====lang===",lang)

//   console.log("===i18n===",i18n)
//   if (i18n.locale !== lang) {
//     if (!loadedLanguages.includes(lang)) {
//       return import(`@/language/cust/${lang}`) // 这里由于新老项目共用一套翻译文件，在流水线出包时提供，不是使用webpack进行出包
//         .then(msgs => { //去引入这个值对应的翻译文件
//           i18n.setLocaleMessage(lang, msgs); // 扩展i18n.messages
//           //设置i18n的语言message切换成这个
//           loadedLanguages.push(lang); //本地已经加载的语言 加入 loadedLanguages
//           //设置语言
//           return setI18nLanguage(lang)
//         })
//         .catch( () => {
//           console.log(`async import language failed`)
//         })
//     }
//     return Promise.resolve(setI18nLanguage(lang))
//   }
//   return Promise.resolve(lang)
// }

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
}

export { i18n }
