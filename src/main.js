// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//以下4行引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.withCredentials = true//这个默认即为false，如果改为true，可以传递session信息，后端要做相应修改来放行，
Vue.prototype.$axios = axios;   //在vue中使用axios

import qs from 'qs';
Vue.prototype.$qs = qs;

Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

