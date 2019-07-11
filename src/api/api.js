import axios from 'axios'

export const getTodoList = params => {
  return axios.get(`/todo/list`, {
    params: params
  })
}
// 定义添加目录的post请求
export const addTodo = params => {
  // 放回结果的data
  return axios.post('/todo/addTodo', params).then(res => res.data)
}

// 新增一个请求查询代办单项列表的数据的接口函数
export const getTodo = params => {
  return axios.get('/todo/listId', {
    params: params
  })
}
