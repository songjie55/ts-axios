const path = require('path')
const fs = require('fs')
module.exports = {
  mode: 'development',
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client',entry]
    }
    return entries
  }, {}),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: '/\.ts$/',
        enforce: 'pre',
        use: 'tslint-loader'
      },
      {
        test: '/\.tsx$/',
        use: 'ts-loader?transpileOnly'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx','.js']
  }
}