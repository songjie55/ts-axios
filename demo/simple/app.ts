import axios from '../../src'

console.log(123)
axios({ url: '/getUser', data: { page: 1 } })