const config = require('./webpack.config.js')
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { webpack } = require('webpack');

config.mode = 'production'

config.optimization = {
  splitChunks: {
    chunks: 'all'
  },
  minimize: true,
  minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
}

config.plugins.push(new webpack.DefinePlugin({
  __IS_PRODUCTION__: JSON.stringify(true)
}))

module.exports = config
