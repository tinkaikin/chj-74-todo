
/* 这里的 mock.js 从我的命名就可以看出它是核心,它的作用就是模拟ajax请求的接口, 生成并返回模拟数据.复制下面代码到src/mock/mock.js。
 */

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Mock from 'mockjs'
import { Todos } from './data/todoList.js'

console.log(Todos)
export default {
  // 调用 start() 初始化
  start () {
    let mock = new MockAdapter(axios) // 创建实例并关联axios
    mock.onGet('/todo/list').reply(params => {
      let mockTodo = Todos.map(tode => { // 重组 数据
        return {
          id: tode.id,
          title: tode.title,
          count: tode.record.filter((data) => {
            if (data.checked === false) return true
            return false
          }).length, // 过滤到record里面 ‘checked’ 为true的数据，因为它们已经被完成了
          locked: tode.locked,
          isDelete: tode.isDelete
        }
      }).filter(tode => {
        if (tode.isDelete === true) return false // 过滤掉 ‘isDelete’为true，因为已经被删除了。
        return true
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            todos: mockTodo // 返回一个数组, 状态码为200, 和重组后的数据
          }])
        }, 200)
      })
    })
    // 创建一个添加目录的请求
    mock.onPost('/todo/addTodo').reply(params => { // 要求params 是个对象并且有规定好的字段
      // 直接给Todos数组添加数据
      Todos.push({
        id: Mock.Random.guid(),
        title: '新添加目录',
        locked: false,
        isDelete: false,
        record: []
      })
      // 下面是规定的方法
      return new Promise((resolve, reject) => { // 返回 Promise对象
        setTimeout(() => { // 设置定时器每200毫秒拦截一次
          resolve([200]) // 拦截成功 放回数据 状态码 200
        }, 200)
      })
    })

    // 通过id 请求数据
    mock.onGet('/todo/listId').reply(config => {
      let { id } = config.params // params是固定属性? 是api把params都传过来的
      let todo = Todos.find(todo => {
        return id && todo.id === id
      })
      todo.count = todo.record.filter(data => {
        return data.cheched === false
      }).length

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            todo: todo
          }])
        }, 200)
      })
    })

    // 新增一条代办事项
    mock.onPost('/todo/addRecord').reply(config => {
      let { id, text } = JSON.parse(config.data)
      Todos.some((t, index) => { // 查下数组some方法 some方法 只要其中一个为true 就会返回true的
        if (t.id === id) {
          t.record.push({
            text: text,
            isDelete: false,
            checked: false
          })
          return true // 为什么返回 布尔值?
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200])
        }, 200)
      })
    })
  }
}
