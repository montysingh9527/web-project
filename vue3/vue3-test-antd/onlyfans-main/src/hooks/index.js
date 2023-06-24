import { reactive, toRefs, ref, onMounted, onActivated, onDeactivated, getCurrentInstance } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useStore } from 'vuex'
export const useKeepAliveHook = () => {
    const instance = getCurrentInstance()
    const store = useStore()
    const scroll = ref(0)

    onBeforeRouteLeave((to, from, next) => {
        scroll.value = document.documentElement && document.documentElement.scrollTop
        if (to.name == '/play') {
            store.commit('common/SET_KEEP_ALIVE', instance.type.name)
        } else {
            store.commit('common/NO_KEEP_ALIVE')
        }
        next()
    })

    onActivated(() => {
        if (scroll.value > 0) {
            window.scrollTo(0, scroll.value)
            scroll.value = 0
        }
    })

    return {
        scroll
    }
}
