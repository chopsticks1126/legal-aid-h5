/**
 * directive  click-outside  区域外点击
 * v-click-outside="hide"
 */
export default {
    bind: function (el, binding, vnode) {
        el.event = function (event) {
            // here I check that click was outside the el and his childrens
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', el.event)
    },
    unbind: function (el) {
        document.body.removeEventListener('click', el.event)
    },
}
