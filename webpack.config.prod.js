var path = require('path');
var webpack = require('webpack');
var base = require('./webpack.config.shared');
var assign = require('lodash/assign');

module.exports = assign({}, base, {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};
