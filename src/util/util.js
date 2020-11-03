let crypto = require('crypto')
let qs = require('qs')

export default{

    install (Vue, options) {

        // 获取当前时间戳
        Vue.prototype.getTimestamp = function () {
            let timestamp = Date.parse(new Date())
            return timestamp / 1000
        }

        Vue.prototype.getPageWidth = function () {
            return window.innerWidth || document.body.clientWidth;
            // return  document.documentElement.clientWidth;
        }

        Vue.prototype.getPageHeight = function () {
            return document.documentElement.clientHeight
            return window.innerHeight
            return document.body.clientHeight
        }

        Vue.prototype.buildGetUrl = function (url, params) {
            for (let k in params) {
                if (url.indexOf('?') >= 0) {
                    url += '&' + k + '=' + params[k]
                } else {
                    url += '?' + k + '=' + params[k]
                }
            }
            return url
        }

    },

    getHrefQuery(url){
        let query = this.parseURL(url).query,
            result = {};
        query &&
        query.split('&').forEach((item)=>{
            let arr = item.split('=')
            result[arr[0]] = decodeURIComponent(arr.slice(1).join('='))
        })
        return result;
      },
       parseURL(url){
        let parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9._\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
        let result = parse_url.exec(url)
        return ['url', 'scheme', 'slash','host',
                'port', 'path', 'query', 'hash']
               .reduce((obj, field, index)=>{
                  let ret = result[index]
                  if ('path' == field) {
                    ret = ret ? ('/' + ret):''
                  }
                  obj[field] = ret
                  return obj
               },{})
      }
}
// export function getHrefQuery(url){
//     let query = parseURL(url).query,
//         result = {};
//     query &&
//     query.split('&').forEach((item)=>{
//         let arr = item.split('=')
//         result[arr[0]] = decodeURIComponent(arr.slice(1).join('='))
//     })
//     return result;
//   }
