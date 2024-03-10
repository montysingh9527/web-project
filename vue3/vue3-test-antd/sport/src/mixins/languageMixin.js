import {changeLanguage, getLanguages} from "../axios/sport";
import Cookie from "js-cookie";
import {getDefaultLang} from "../language";

export default {
    data() {
        return {
            languages: [],
            currentLang: {},
            allowChangeLang: false
        }
    },
    methods: {
        onSelectLang(lang = {}) {
            if (!Cookie.get('logintoken')) {
                this.$toast(this.$t('login_f'))
                return;
            }
            changeLanguage(lang.code)
                .then(res => {
                    if (res.status) {
                        localStorage.setItem('lang', lang.code);
                        window.location.reload();
                    }
                })
        },

        getLangList() {
            getLanguages()
                .then(res => {
                    console.log('getLanguages result', res)
                    if (res.code == 0) {
                        const langs = res.data.supportLanguagesMap;
                        const apiCurrentLang = res.data.config.defaultLanguage + '-' + res.data.config.defaultLanguageAppend
                        this.languages = langs;

                        /// 如果有登录
                        if (Cookie.get('logintoken')) {
                            const code = localStorage.getItem('lang');

                            this.currentLang = langs.find(l => {
                                if (code && code !== 'undefined') return code === l.code;

                                if (res.data.currentLanguageCodeAppend) return l.code === (res.data.currentLanguageCode + '-' + res.data.currentLanguageCodeAppend);

                                return l.code === res.data.currentLanguageCode;
                            }) || {};
                        } else {
                            this.currentLang = langs.find(l => {
                                console.log('l.code', l.code)
                                console.log('defaultLanguage', apiCurrentLang)

                                if (res.data.config.defaultLanguageAppend) {
                                    return l.code === apiCurrentLang
                                }

                                return l.code === res.data.config.defaultLanguage;
                            }) || {code: 'zh-cn'};
                        }
                        this.allowChangeLang = res.data.config.allowMemberModifyLanguage;

                        localStorage.setItem('lang', this.currentLang.code)
                        const {key} = getDefaultLang();
                        this.$i18n.locale = key;
                    }
                })
                .catch(err => console.log(err))
        }
    }
}