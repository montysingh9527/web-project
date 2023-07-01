// import defaultImg from '../assets/images/noimg.gif'
import defaultImg from '../assets/images/notfound.png'
import {getCryptImg} from "@/utils/request.ts";

const defineDirective=(app)=>{
    app.directive('lazyload',{
        mounted(el,binding){
            // el.src = defaultImg
            el.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAABmBAMAAACU4HYYAAAAFVBMVEXz8/Tl5ebp6ent7e7r6+zu7u/w8PHI3oBuAAAA30lEQVRo3u3SMY7CMBSE4dmNod7JEmrMCYLgALigJw01ILj/FQjCQI/eNGh+yXL3FaMH55xzzjnn3Ccl9lBV2EEV2aJm2/aX2tf1AYDCnmSOX6+wGz7aC+xc7TbefjcX2jzG2+2m2n/x9gJJsjjHeuBcR1HYWPHeQmKjcGyusaeZ5L/GRiI5E9k4ka3Kbkiq7Em0nd92Etol2i4ve2C0PTztX4bbP9VuGG+nhz3NAhskt0Chwl6RHQZK7MSawEYW2klov8bucrxdj2SGYXzhXZZc7oCGWzjnnHPOOec+6Abj2yBC5kJaKAAAAABJRU5ErkJggg=='
            const observer = new IntersectionObserver(([{ isIntersecting }]) => {
                //如果被监听的DOM元素进入了可视区
                if (isIntersecting) {
                    //取消监听
                    observer.unobserve(el)
                    //给DOM绑定一个事件,如果传过来的图片是个错误的地址,就把默认的图片给src赋值
                    el.onerror = () => {
                        el.src =''
                    }
                    //给图片赋值
                    getCryptImg(binding.value).then((res)=>{
                            el.src=res
                    })
                }
            }, {
                threshold: 0.01
            })
            //监听DOM元素
            observer.observe(el)
        }
    })
    app.directive('loadbg',{
        mounted(el,binding){
            const observer = new IntersectionObserver(([{ isIntersecting }]) => {
                //如果被监听的DOM元素进入了可视区
                if (isIntersecting) {
                    //取消监听
                    observer.unobserve(el)
                    //给DOM绑定一个事件,如果传过来的图片是个错误的地址,就把默认的图片给src赋值
                    //给图片赋值
                    getCryptImg(binding.value).then((res)=>{
                        el.style.backgroundImage='url('+res+')'
                    })
                }
            }, {
                threshold: 0.01
            })
            //监听DOM元素
            observer.observe(el)
        }
    })
}
export default {
    install(app){
        defineDirective(app)
    }
}
