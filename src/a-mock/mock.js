
/* 这里的 mock.js 从我的命名就可以看出它是核心,它的作用就是模拟ajax请求的接口, 生成并返回模拟数据.复制下面代码到src/mock/mock.js。
 */

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
// import Mock from 'mockjs'
import {Todos} from './data/todoList.js'

export default {
  // 调用 start() 初始化
  start () {
    let mock = new MockAdapter(axios) // 创建实例并关联axios
    mock.onGet('/todo/list').reqly(params => {
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
        })
      })
    })
  }
}
