/*
 * @Description: 多语言
 * @Date: 2024-07-05 04:30:10
 * @FilePath: \web-project\node-egg-demo\admin-project\src\i18n\index.js
 */
import { createI18n } from "vue-i18n";
import { LocalStorage } from "quasar";
const i18n = createI18n({
  locale: LocalStorage.getItem("lang") ?? "zh",
  fallbackLocale: "zh",
  legacy: true, // 如果要支持compositionAPI，此项必须设置为false;
  // globalInjection: true, // 全局注册$t方法
  // fallbackWarn: false, // 忽略控制台错误
  // missingWarn: false, // 忽略控制台错误
  // silentFallbackWarn: true, // 忽略控制台错误
  silentTranslationWarn: true, // 忽略控制台错误
});

/**
 * 多语言加载
 * @param {*} lang 
 * @returns 
 */
const loadLanguageAsync = async (lang) => {
  try {
    lang = LocalStorage.getItem("lang") ?? "zh";
    // 动态加载对应的语言包
    const lang_obj = await import(`./${lang}.json`);
    i18n.global.setLocaleMessage(lang, lang_obj);
    i18n.global.locale = lang;
    i18n.locale = lang;
    return lang;
  } catch (error) {
    return lang;
  }
};

/**
 * 多语言tm
 * @param {*} key 
 * @param {*} args 
 * @param {*} options 
 * @returns 
 */
function i18n_t(key, args, options) {
  if (!i18n) return;
  return i18n.global.tm(key, args, options);
}

export { i18n, i18n_t, loadLanguageAsync };
