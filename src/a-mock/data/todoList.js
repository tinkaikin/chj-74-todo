import Mock from 'mockjs'
let Todos = []
const COUNT = [1, 2, 3, 4, 5]
for (let i = 0; i <= COUNT.length; i++) {
  Todos.push(Mock.mock({
    id: Mock.Random.guid(), // 随机id
    title: Mock.Random.first(), // 随机标题
    isDelete: false,
    locked: Mock.Random.boolean(), // 随机锁定
    record: COUNT.map(() => {
      return {
        text: Mock.Random.cparagraph(2), // 随机内容
        isDelete: false,
        checked: Mock.Random.boolean() // 随机是否完成
      }
    })
  }))
}

export { // 导出对象
  Todos
}
