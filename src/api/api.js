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
