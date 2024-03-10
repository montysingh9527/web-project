import { checkDevType } from './util'


export function copyText(text) {
    const type = checkDevType()
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', text);
    input.style.position = 'absolute';
    input.style.top = '-10000px';
    input.style.opacity = '0';

    document.body.appendChild(input);
    //这段代码必须放在前面否则无效
    window.getSelection().removeAllRanges();
    if (type === 'ios') {
        const range = document.createRange();
        // 选中需要复制的节点
        range.selectNode(input);
        // 执行选中元素
        window.getSelection().addRange(range);
        if(document.execCommand('copy', false, null)){
            const successful = document.execCommand('copy');// 执行浏览器复制命令
            // 移除选中的元素
            window.getSelection().removeAllRanges();
            input.remove()
            if (successful) {
                return Promise.resolve()
            } else {
                return Promise.reject()
            }
        }else{
            return Promise.reject()
        }
    } else {
        // 选取全部文字
        input.setSelectionRange(0, 999999);

        input.select()
        let result = document.execCommand('copy');
        window.getSelection().removeAllRanges();

        input.remove()
        if (result) {
            return Promise.resolve()
        } else {
            return Promise.reject()
        }
    }


}