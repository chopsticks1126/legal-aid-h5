import preview from './index.vue';
import Vue from'vue';

const previewConstructor = Vue.extend(preview);
let instance = null;

let createPreview = () => {
    if (!instance) {
        instance = new previewConstructor({})
    }
}

let f = function ({imgList = [], index = 0,}) {
    if (({}).toString.call(imgList) != "[object Array]") {
        return;
    }
    createPreview()
    instance.$mount()

    instance.imgList = imgList;
    instance.currentIndex = imgList.length >= index ? index : 0;
    instance.visible = true;
    document.body.appendChild(instance.$el)
}

export default f
