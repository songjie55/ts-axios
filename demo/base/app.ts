import axios, { AxiosError } from '../../src'
// 测试
axios({
  method: 'get',
  url: '/base/testRequest',
  params: {
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
  method: 'post',
  headers: {
    accept: 'animate',
    'content-type': 'application/json;charset=utf-8'
  },
  responseType: 'text',
  // responseType: 'json',
  url: '/base/testHeader',
  data: {
    spacial: '@ %'
  }
}).then(res => {
  console.log(res)
})
// 测试异常处理
axios({
  method: 'get',
  url: 'errorUrl?name=test'
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.config)
  console.log(e.code)
  console.log(e.request)
  console.log(e.isAxiosError)
})
axios({
  method: 'post',
  timeout: 3000,
  url: '/base/testTimeout'
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})
setTimeout(() => {
  axios({
    method: 'get',
    url: '/base/testRequest'
  }).then(res => {
    console.log(res)
  }).catch(e => {
    console.log(e)
  })
}, 6000)
