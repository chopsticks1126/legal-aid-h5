import Vue from 'vue';
import PopupManager from '../../utils/popup/popup-manager';

import InfoMain from './main.vue'
let InfoConstructor = Vue.extend(InfoMain);

let instance;
let instances = [];
let seed = 1;

let clearAll = () => {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].clear();
        instances.splice(i, 1);
    }
}

let Info = function (options) {
    if (Vue.prototype.$isServer) return;
    clearAll();

    if (typeof options !== 'object') {
        options = {
            message: options
        }
    }

    let _optionCallBack = options.callBack;
    let id = 'info_' + seed++;

    options.callBack = () => {
        Info.close(id, _optionCallBack);
    }

    instance = new InfoConstructor({
        data: options
    }).$mount(document.createElement('div'));

    instance.id = id

    document.body.appendChild(instance.$el)
    instance.$el.style.zIndex = PopupManager.nextZIndex()
    instances.push(instance)

    Vue.nextTick(() => {
        instance.visible = true
    })

    return instance.vm
};

//设置后可以如此调用  this.$message.error('错了哦，这是一条错误消息');
['success', 'warning', 'info', 'error'].forEach(type => {
    Info[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options
            }
        }
        options.type = type;
        return Info(options);
    };
});

Info.close = function (id, callBack) {
    for (let i = 0, len = instances.length; i < len; i++) {
        if (id === instances[i].id) {
            if (typeof callBack === 'function') {
                callBack(instances[i]);
            }
            instances.splice(i, 1);
            break;
        }
    }
};

// 关闭所有提示框，执行回调
Info.closeAll = function () {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close();
    }
};


Info.clearAll = clearAll

export default Info;
