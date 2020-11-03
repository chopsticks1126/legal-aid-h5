import NavTab from './src/nav-tab.vue'
import NavTabItem from './src/nav-tab-item.vue'

NavTab.install = function(Vue) {
  Vue.component(NavTab.name, NavTab);
};

NavTabItem.install = function(Vue) {
    Vue.component(NavTabItem.name, NavTabItem);
};

export{
    NavTab,
    NavTabItem
}
