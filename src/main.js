import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './plugins/element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//导入全局样式
import 'assets/css/global.css'
//导入第三方图标
import 'assets/fonts/iconfont.css'
//封装的请求
import {api} from './api/request'

import './api/axios-interceptor'

Vue.config.productionTip = false

Vue.prototype.$http=api

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
