const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    static: './dist',
  },
  output: {
    pathinfo: false,
  },
  optimization: {
    minimize: false,
    runtimeChunk: true,
    removeEmptyChunks: false,
    splitChunks: false,
  }
});
