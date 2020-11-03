import Vue from 'vue';
import PopupManager from '../../utils/popup/popup-manager';
import {isVNode} from '../../utils/vdom';

import LoadingMain from './main.vue'
let LoadingConstructor = Vue.extend(LoadingMain);

let instance;
let seed = 1;

let McLoading = function (options) {

    if (Vue.prototype.$isServer) return;

    if (typeof options !== 'object') {
        options = {
            message: options
        }
    }

    let id = 'mc_loading_top' + seed++;

    instance = new LoadingConstructor({
        data: options
    }).$mount(document.createElement('div'));


    if (isVNode(options.message)) {
        instance.$slots.default = [options.message];
        options.message = '';
    }

    instance.id = id;
    instance.$el.style.zIndex = PopupManager.nextZIndex();
    document.body.appendChild(instance.$el);
    // document.body.querySelector('#app').appendChild(instance.$el);

    Vue.nextTick(() => {
        instance.visible = true;
    })

    return instance
}

export default McLoading
