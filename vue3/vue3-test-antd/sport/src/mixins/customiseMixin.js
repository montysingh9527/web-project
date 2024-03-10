import {mapGetters} from "vuex"
import {getCustomiseSports, getCustomiseNavItems} from "../common/config";

export default {
    data() {
        return {
            customiseSports: [],
            customiseNavItems: [],
        }
    },

    mounted() {
        this.setCustomiseSports(this.projectConfig)
        this.setCustomiseNavItems(this.projectConfig)
    },

    created() {
        this.$root.$on('projectConfig', projectConfig => {
            this.setCustomiseSports(projectConfig)
            this.setCustomiseNavItems(projectConfig)
        })
    },

    computed: {
        ...mapGetters(['projectConfig']),
        displaySportNames() {
            return this.customiseSports.reduce((res, item) => {
                res[item.text] = item
                return res
            }, {})
        },
        displaySportIds() {
            return this.customiseSports.reduce((res, item) => {
                res[String(item.id)] = item
                return res
            }, {})
        },
        displayNavItemNames() {
            return this.customiseNavItems.reduce((res, item) => {
                res[item.text] = item
                return res
            }, {})
        },
        displayNavItemIds() {
            return this.customiseNavItems.reduce((res, item) => {
                res[String(item.id)] = item
                return res
            }, {})
        },
    },

    methods: {
        setCustomiseSports(projectConfig) {
            if (!projectConfig || !projectConfig.siteCode) return
            this.customiseSports = getCustomiseSports(projectConfig.siteCode)
        },
        setCustomiseNavItems(projectConfig) {
            if (!projectConfig || !projectConfig.siteCode) return
            this.customiseNavItems = getCustomiseNavItems(projectConfig.siteCode)
        },
    },
}