var path = require('path');
var webpack = require('webpack');
var base = require('./webpack.config.shared');
var assign = require('lodash/assign');

module.exports = assign({}, base, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
});
