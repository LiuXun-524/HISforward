// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })


//以下4行引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.withCredentials = true//这个默认即为false，如果改为true，可以传递session信息，后端要做相应修改来放行，
Vue.prototype.$axios = axios;   //在vue中使用axios

import qs from 'qs';
Vue.prototype.$qs = qs;

Vue.config.productionTip = false





/* // loading框设置局部刷新，且所有请求完成后关闭loading框
let loading
let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
function startLoading () {
  loading = Vue.prototype.$loading({
    lock: true,
    text: '正在加载中...',
    background: 'rgba(0,0,0,0.5)',
    target: document.querySelector('.loading-area') // 设置加载动画区域
  })
}
function endLoading () {
  setTimeout(loading.close(), 3000);

}
function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
function hideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

// axios
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : '/api' // 接口基础路径
axios.defaults.timeout = 20000 // 超时时间 20s
// axios.defaults.withCredentials = true // 允许设置cookie(开启的话需后端配置)
// http请求拦截器
axios.interceptors.request.use(config => {
  if (config.isLoading !== false) { // 如果配置了isLoading: false，则不显示loading
    showFullScreenLoading()
  }
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  return config
}, error => {
  hideFullScreenLoading()
  return Promise.reject(error.response)
})
// http响应拦截器
axios.interceptors.response.use(data => {
  hideFullScreenLoading() // 响应成功关闭loading
  return data
}, error => {
  hideFullScreenLoading()
  let _status = error.response && error.response.status
  if (_status === 504 || _status === 404) {
    // 跳转404页面（目前没有，只能先跳转首页）
    //router.push({ path: '/' })
  }
  return Promise.reject(error)
}) */




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
