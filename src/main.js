// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mock from './a-mock' // 全局加载mock,执行初始化函数函数，这样的本地我们设定的接口，就可以在全局调用了。
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios1 from './api/axios'
// 安装全局
import myComponents from './components/My'

// 引入全局样式
import './style/index.css'

Vue.use(myComponents)
Vue.prototype.$http = axios1
Mock.start()
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
