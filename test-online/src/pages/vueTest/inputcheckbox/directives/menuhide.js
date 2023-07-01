export default {
    bind (el, bindings, vnode){
        el.handler = function(e){
            if(!el.contains(e.target)){
                const _method = bindings.expression;
                vnode.context[_method]();
            }
        }
        document.addEventListener("click", el.handler, false);
    },
    unbind (el, bindings, vnode){
        document.removeEventListener("click", el.handler, false);
    }
}