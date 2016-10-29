var path = require('path');
var webpack = require('webpack');
var base = require('./webpack.config.shared');
var assign = require('lodash/assign');

module.exports = assign({}, base, {
  devtool: 'source-map',
  entry: [
    './src/index.jsx',
  ],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'DEPLOY_TARGET': JSON.stringify(process.env.DEPLOY_TARGET),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
});
