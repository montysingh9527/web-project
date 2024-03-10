import VueI18n from "vue-i18n";
import Vue from "vue";
import { Locale } from 'vant';

Vue.use(VueI18n)

// 引入中文语言包
import zh_CN from 'vant/es/locale/lang/zh-CN';
// 引入繁体字语言包
import zh_TW from 'vant/es/locale/lang/zh-TW';
// 引入英文语言包
import en_US from 'vant/es/locale/lang/en-US';
// 引入日本语言包
import ja_JP from 'vant/es/locale/lang/ja-JP';
// 引入泰语语言包
import th from 'vant/es/locale/lang/th-TH';
// 引入西班牙语
import es_ES from 'vant/es/locale/lang/es-ES';

// 引入印地安语
import hi from './hi';
// 引入越南语
import vi from './vi';
import zh_CN_local from './zh-cn';
import zh_TW_local from './zh-tw';
import en_US_local from './en';
import ja_JP_local from './ja-jp';
import th_local from './th';
import it_local from './it';
import id_local from './id';
import pt_local from './pt';
import ms_local from './ms';
import es from './es';

const messages = {
  'zh-CN': {
    ...zh_CN,
    ...zh_CN_local
  },

  'zh-TW': {
    ...zh_TW,
    ...zh_TW_local
  },

  'en-US': {
    ...en_US,
    ...en_US_local
  },

  'ja': {
    ...ja_JP,
    ...ja_JP_local
  },
  'hi': {
    ...hi
  },
  'vi': {
    ...vi
  },
  'th': {
    ...th_local,
    ...th
  },
  'it': {
    ...it_local
  },
  'id': {
    ...id_local
  },
  'pt': {
    ...pt_local
  },
  'ms': {
    ...ms_local
  },
  'es': {
    ...es,
    ...es_ES
  }
}

export const Languages = [
  {key: 'zh-CN', val: ['zh-cn', 'zh'], text: '中文'},
  {key: 'zh-TW', val: ['zh-tw', 'zh'], text: '繁体'},
  {key: 'en-US', val: ['en-us', 'en'], text: 'English'},
  {key: 'vi', val: ['vi'], text: 'Tiếng Việt'},
  {key: 'it', val: ['it'], text: 'Italiano'},
  {key: 'es', val: ['es', 'es-es'], text: 'Español'},
  {key: 'ja', val: ['ja-jp', 'ja'], text: '日本語'},
  {key: 'ms', val: ['ms'], text: 'Bahasa Melayu'},
  {key: 'th', val: ['th'], text: 'ไทย'},
  {key: 'hi', val: ['hi'], text: 'हिंदी'},
  {key: 'ko', val: ['ko'], text: '한국어'},
  {key: 'id', val: ['id'], text: 'Bahasa Indonesia'},
]


export function getDefaultLang() {
  let s_l = localStorage.getItem('lang') || '';

  return Languages.find(l => l.val.includes(s_l)) || Languages[0];
}

const Lang = getDefaultLang();
const key = Lang.key
// Locale.add(messages)
Locale.use(key, messages[key]);

export const i18n = new VueI18n({
  locale: key, // 语言标识
  messages
})
