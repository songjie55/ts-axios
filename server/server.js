const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('../demo/webpack.config')
const app = express()
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/'
}))
app.use(webpackHotMiddleware(compiler))
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extend: true }))
const router = express.Router()
app.use(router)
const port = process.env.PORT || 8000
module.exports = app.listen(port, () => {
  console.log('http://localhost:' + port)
})
