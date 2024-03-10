/*
* 窗口自适应
*/
export const refreshRem = () => {
    window.addEventListener('resize', reHtmlSize)
    reHtmlSize()
}

export function reHtmlSize(fontSize) {
    const dpr = Math.round(window.devicePixelRatio)
    const INNER_WIDTH = Math.min(520, window.innerWidth)
    const doc = document.documentElement

    if (fontSize) {
        doc.setAttribute('dpr', dpr)
        doc.style.fontSize = fontSize + 'px'
        return;
    }

    let htmlSize = (Math.max(320, INNER_WIDTH)) / 375 * 20
    // meta.setAttribute('content', `width=device-width,user-scalable=no,initial-scale = ${1/dpr},maximum-scale = ${1/dpr},minimum-scale = ${1/dpr}`)
    doc.setAttribute('dpr', dpr)
    doc.style.fontSize = htmlSize + 'px'

    // 给js调用的，某一dpr下rem和px之间的转换函数
    window.rem2px = (v) => parseFloat(v) * htmlSize
    window.px2rem = (v) => parseFloat(v) / htmlSize

    window.dpr = dpr
    window.rem = htmlSize
}

(() => {
    let lastTime = 0;
    let vendors = ['ms', 'moz', 'webkit', 'o'];
    for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = (callback, element) => {
            let currTime = new Date().getTime();
            let timeToCall = Math.max(0, 16 - (currTime - lastTime));
            let id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = (id) => {
            clearTimeout(id)
        }
})()
