const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('../webpack.config')
const app = express()
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))
app.use(webpackHotMiddleware(compiler))
// console.log(__dirname)///Users/jason/Documents/git/ts-axios/server指向运行的目录
let arr = __dirname.split('/')
arr.pop()
arr.push('demo')
app.use(express.static(arr.join('/')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extend: true }))
const router = express.Router()
router.get('/simple/getUser', (req, res) => {
  res.json({
    msg: 'hello world'
  })
})
router.get('/base/testRequest', (req, res) => {
  res.json(req.query)
})
router.post('/base/testHeader', (req, res) => {
  res.json(req.body)
})
router.post('/base/testError', (req, res) => {
  res.status(500)
  res.end()
})
router.post('/base/testTimeout', (req, res) => {
  setTimeout(() => {
    res.json(req.body)
  }, 5000)
})
app.use(router)
const port = process.env.PORT || 8000
module.exports = app.listen(port, () => {
  console.log('http://localhost:' + port)
})
