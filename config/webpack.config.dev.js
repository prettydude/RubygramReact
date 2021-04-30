const path = require('path')
const { DefinePlugin } = require('webpack')
const config = require('./webpack.config.js')

config.devServer = {
  historyApiFallback: true,
  contentBase: path.join(__dirname, '../build'),
  port: 8060,
  host: "0.0.0.0",
  disableHostCheck: true //ngrok
}

config.devtool = 'inline-source-map'

config.plugins.push(new DefinePlugin({
  __IS_PRODUCTION__: JSON.stringify(false)
}))

module.exports = config
