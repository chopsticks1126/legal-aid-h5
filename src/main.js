// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
Vue.prototype.$axios = axios

// MintUi
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css';
Vue.use(MintUi)

import './util/rem.js'
import './style/index.less'

// 引入插件库 McDesign
import './mc/style/index.less'
import McDesign from './mc/index'
Vue.use(McDesign)
import {Col,Tag,Icon,Image as VanImage,Switch ,Uploader,CellGroup ,Button,Popup,Progress, Step, Steps,Swipe, SwipeItem ,Circle , Collapse, CollapseItem ,DatetimePicker,Area,Slider,Rate,Field,Dialog,List, RadioGroup, Radio,Picker ,ActionSheet,Cell } from 'vant';

Vue
    .use(Button)
    .use(Popup)
    .use( Progress)
    .use(Step).use(Steps)
    .use(Swipe).use(SwipeItem)
    .use(Circle)
    .use(Collapse).use(CollapseItem)
    .use(DatetimePicker)
    .use(Area)
    .use(Slider)
    .use(Rate)
    .use(Field)
    .use(Dialog)
    .use(List)
    .use(RadioGroup)
    .use(Radio)
    .use(Picker)
    .use(ActionSheet)
    .use(Cell)
    .use(CellGroup)
    .use(Uploader)
    .use(Switch)
    .use(VanImage)
    .use(Icon)
    .use(Tag)
    .use(Col)




;
// const app = createApp();
// app.use(Picker)
//
import util from './util/util'
Vue.use(util)

// click-outside
import ClickOutside from '@/mc/utils/directives/click-outside';
Vue.directive('click-outside', ClickOutside);

let path = window.location.href.split("token=") //分割url
if(null !=path && undefined!=path && path.length>0){
    localStorage.setItem('token',path[1])
}
console.log('store',localStorage.getItem('applicationId'));
new Vue({
    el: '#app',
    router,
    store: store,
    components: { App },
    template: '<App/>'
})
