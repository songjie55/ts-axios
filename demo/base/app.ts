import axios from '../../src'
// 测试
axios({
  method: 'get',
  url: '/base/testRequest', params: {
    name: 'tom'
  }
})
let date = new Date()
axios({
  method: 'get',
  url: '/base/testRequest',
  params: {
    date
  }
})
let arr = ['a', 'b']
axios({
  method: 'get',
  url: '/base/testRequest',
  params: {
    arr,
    obj: null
  }
})
axios({
  method: 'get',
  url: '/base/testRequest?name=lili',
  params: {
    age: 19
  }
})
axios({
  method: 'get',
  url: '/base/testRequest#hash',
  params: {
    sex: 'man'
  }
})

axios({
  method: 'get',
  url: '/base/testRequest',
  params: {
    spacial: '@ %'
  }
})