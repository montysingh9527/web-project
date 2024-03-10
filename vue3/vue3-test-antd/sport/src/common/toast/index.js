import vue from 'vue'

import toastComponent from './Toast.vue'

const ToastConstructor = vue.extend(toastComponent)

function showToast(text, position, duration = 3000,show = true) {
    duration = duration < 3000 ? 3000 : duration;

    // 实例化一个 toast.vue
    const toastDom = new ToastConstructor({
        el: document.createElement('div'),
        data() {
            return {
                text: text,
                // show: true,
                show: show,
                position: position,
                showContent:true  // 在隐藏组件之前,显示隐藏动画
            }
        }
    })

    document.body.appendChild(toastDom.$el)
    if(!show){
        toastDom.showContent = false
        toastDom.show = false
    }else{
        setTimeout(() => {toastDom.showContent = false} ,duration - 1250)
        setTimeout(() => {
            toastDom.show = false
        }, duration)
    }
}

// 注册为全局组件的函数
function registryToast() {
    vue.prototype.$toast = showToast
}

export default registryToast
