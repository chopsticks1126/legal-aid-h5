// basic
import Cell from './cell'
import Btn from './btn'
import Panel from './panel'
import Tag from './tag/tag.vue'
import Dropdown from './dropdown/dropdown.vue'
import {Loading} from './loading'
import {NavTab, NavTabItem} from './nav-tab'
import LoadingMain from './loading-main'

// form
import Input from './input/input.vue'
import Textarea from './textarea/textarea.vue'
import Checkbox from './checkbox/checkbox.vue'
import CheckboxCircle from './checkbox-circle/checkbox-circle.vue'
import RadioCircle from './radio-circle/radio-circle.vue'
import Radio from './radio/radio.vue'
import Switch from './switch/switch.vue'
import Select from './select'

//msg
import Info from './info/index.js'
import Alert from './alert/index'
import Confirm from './confirm/index'
import Dialog from './dialog/index'

//other
import TopBar from './top-bar/top-bar.vue'
import SearchBar from './search-bar/search-bar.vue'
import BottomModal from './bottom-modal/bottom-modal.vue'
import FullModal from './full-modal/full-modal.vue'

import {ImgSwipe, ImgSwipeItem} from './img-swipe'

import ImgTopShow from './img-top-show'
import ImgPreview from './img-preview/index.js'

import Upload from './upload/index'
import DateSelect from './date-select'


const components = [
    Cell,
    Btn,
    Panel,
    Loading,
    Dropdown,

    Confirm,
    Alert,
    Info,
    Dialog,

    Input,
    Textarea,
    Checkbox,
    Radio,
    Switch,
    Select,

    CheckboxCircle,
    RadioCircle,

    Tag,
    TopBar,
    NavTab, NavTabItem,
    SearchBar,
    BottomModal,
    FullModal,
    Upload,

    ImgSwipe, ImgSwipeItem,
    ImgTopShow,

    DateSelect,
];

const install = function (Vue, opts = {}) {
    if (install.installed) return;

    components.map(component => {
        Vue.component(component.name, component);
    })

    Vue.prototype.$info = Info
    Vue.prototype.$alert = Alert
    Vue.prototype.$confirm = Confirm

    Vue.prototype.$mcLoadingMain = LoadingMain
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    version: '1.0.0',
    install,

    Info,
    Alert,
    Confirm,
    Dialog,

    Cell,
    Panel,
    Btn,
    Tag,
    Dropdown,
    Loading,
    LoadingMain,

    Checkbox,
    Radio,
    Input,
    Textarea,
    Switch,
    CheckboxCircle,
    RadioCircle,
    Select,

    TopBar,
    NavTab, NavTabItem,
    SearchBar,
    BottomModal,
    FullModal,

    ImgPreview,

    ImgSwipe, ImgSwipeItem,
    ImgTopShow,

    Upload,

    DateSelect,
}
