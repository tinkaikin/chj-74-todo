import axios from 'axios'

const axios1 = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
})

axios1.interceptors.request.use(config => {
  // 给头部加上认证信息
  const user = window.sessionStorage.getItem('token')
  if (user) {
    // 在头部加上 Authorization ，字段值的格式：（Bearer + 空格 + token字符）
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => { // 不做处理
  return Promise.reject(error)
})

axios1.interceptors.response.use(response => response, error => {
  // 做一些事情
  if (error.response.status === 401) {
    // hash 哈希,是url后,#开始的字符串
    location.hash = '#/login' // 只能用原生的js 跳转了
  }
  return Promise.reject(error)
})
export default axios1
