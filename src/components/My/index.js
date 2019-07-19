// 全局安装组件

import MyBread from './my-bread.vue'

export default {
  install (Vue) {
    // 使用Vue对象去做你的业务即可
    // 进行组件的注册
    Vue.component(MyBread.name, MyBread)
    // ... 进行组成即可
  }
}
