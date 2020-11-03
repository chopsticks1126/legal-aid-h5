import Vue from 'vue';
import PopupManager from '../../utils/popup/popup-manager';

import ConfirmMain from './main.vue'
let ConfirmConstructor = Vue.extend(ConfirmMain);

let Confirm = function (options) {
    if (Vue.prototype.$isServer) return;
    if (typeof options !== 'object') {
        options = {
            message: options
        }
    }
    let instance = new ConfirmConstructor({
        data: options
    }).$mount(document.createElement('div'));

    instance.$el.style.zIndex = PopupManager.nextZIndex();
    document.body.appendChild(instance.$el);


    Vue.nextTick(() => {
        instance.visible = true;
    })

    return instance.vm
}

export default Confirm
