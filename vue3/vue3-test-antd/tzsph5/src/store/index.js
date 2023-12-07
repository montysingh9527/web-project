import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import common from './modules/common'
// import { localPersistPlugin } from './persist'


export default createStore({
    modules: { user, common },
    // state: { isViewMode: false },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage
        })
    ]
})
