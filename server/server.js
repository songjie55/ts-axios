const Koa = require('koa')
const router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config')
const complier = webpack(webpackConfig)
const PassThrough = require('stream').PassThrough
const app = new Koa()
app.use(json())
app.use(async (ctx, next) => {
  const middleware = webpackDevMiddleware(complier, {
    publicPath: '/__build__/'
  })
  await middleware(ctx.req, {
    end: (content) => {
      ctx.body = content
    },
    setHeader: (name, value) => {
      ctx.set(name, value)
    }
  }, next)
})
app.use(async (ctx, next) => {
  const middleware = webpackHotMiddleware(complier)
  let stream = new PassThrough()
  ctx.body = stream
  await middleware(ctx.req, {
    write: stream.write.bind(stream),
    writeHead: (status, headers) => {
      ctx.status = status
      ctx.set(headers)
    }
  }, next)
})
app.use(require('koa-static')(__dirname + '/public'))
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}))

app.listen(3000, function() {
  console.log('http://localhost:3000')
})