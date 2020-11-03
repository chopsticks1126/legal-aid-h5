import Vue from 'vue';
import PopupManager from '../../utils/popup/popup-manager';
import {isVNode} from '../../utils/vdom';

import AlertMain from './main.vue'
let AlertConstructor = Vue.extend(AlertMain);

let instance;
let seed = 1;

let MyAlert = function (options) {
    if (Vue.prototype.$isServer) return;

    if (typeof options !== 'object') {
        options = {
            message: options
        }
    }

    let id = 'alert_' + seed++;
    instance = new AlertConstructor({
        data: options
    }).$mount(document.createElement('div'));

    let isnode=isVNode(options.message);
    if (isnode) {
        instance.$slots.default = [options.message];
        options.message = '';
    }

    instance.id = id;
    instance.$el.style.zIndex = PopupManager.nextZIndex();
    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
        instance.visible = true;
    })

    return instance
}

export default MyAlert
