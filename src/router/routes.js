// routes
import Home from '../pages/Home.vue'
import Upload from '../pages/Upload.vue'
import ListInfo from "../pages/ListInfo.vue";
import Applys from "../pages/Applys.vue";
import Detailed from "../pages/Detailed.vue";



export default [
    {
        path: '/',
        name: 'Applys',
        meta: { keepAlive: true },
        component:Applys //首頁
    },
    {
        path: "/applys",
        name: "Applys",
        component: Applys
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/upload',
        name: 'Upload',
        component: Upload
    },
    {
        path: "/listInfo",
        name: "ListInfo",
        component: ListInfo
    },
    {
        path: '/detailed',
        name: 'Detailed',
        component: Detailed
    },

]
