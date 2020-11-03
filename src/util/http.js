import axios from 'axios'
import store from '../store'
import router from '../router'
import MyInfo from '@/mc/info/index.js'

let options={
    baseURL: 'http://localhost:8081', // api的base_url
    // baseURL: 'http://192.168.1.236:9091', // api的base_url
    timeout: 30000, // 请求超时时间 30s,
}

// if (process.env.NODE_ENV === 'production') {
//     console.log('process=',process)
//     options = {
//         baseURL: 'http://172.28.20.67:7020/business', // api的base_url
//         timeout: 30000, // 请求超时时间,
//     }
// } else {
//     options = {
//         baseURL: 'http://172.28.20.67:7020/business', // api的base_url
//         timeout: 30000, // 请求超时时间,
//     }
// }

const request = axios.create(options)

//set request
request.interceptors.request.use(
    config => {
        console.log('request.interceptors')
        config.headers['APPTOKEN'] ="22222"
        //添加token
        if (store.getters.token) {
            config.headers['APPTOKEN'] = store.getters.token
        }

        //配置是否自动错误提示，默认提示,通过 showerror 配置，若不想要显示，传参数 showerror=false
        if (config.showerror === undefined) {
            config.showerror = true
        }

        return config
    },
    error => {
        // Do something with request error
        console.log('&&request error:', error)
        Promise.reject(error)
    }
)

// set respone
request.interceptors.response.use(
    response => {
        // console.log('GET---->', response)
        // console.log('config', response.config)

        // if (response.status !== 200) {
        //     //是否显示错误
        //     if (response.config.showerror) {
        //         MyInfo({
        //             message: response.data.message || 'api error',
        //         })
        //         return Promise.reject(response.data)
        //     }
        // }

        return response.data
    },
    error => {

        console.log('** response err--', error)
        console.log('((( config error', error.config)

        if (error.response) {
            // 发送请求后，服务端返回的响应码不是 2xx
            console.log('-xx- error response', error.response)
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
            console.log(error.response.message)

            //登录失效
            if (error.response.status === 401) {
                MyInfo({
                    message: '您当前登录状态已失效，请重新登录',
                    callBack: () => {
                        store.dispatch('logout').then(() => {
                            router.push('/login')
                        })
                    }
                })
                return Promise.reject(error)
            }

        } else if (error.request) {
            // 发送请求但是没有响应返回
            console.log(error.request);
        } else {
            // 其他错误
            console.log('Error', error.message);
        }

        //是否自动显示错误信息
        if (error.config.showerror) {

            let errinfo='Service Error'
            if(error.response && error.response.data){
                errinfo=error.response.data
            }

            MyInfo({
                message: errinfo
            })
        }

        return Promise.reject(error)
    }
)

export default request
