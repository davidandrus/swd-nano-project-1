var path = require('path');
var webpack = require('webpack');
var assign = require('lodash/assign');

var DEV =  process.env.NODE_ENV !== 'production';
var entry = ['./src/index'];
var plugins;

if (DEV) {
  entry = [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
  ].concat(entry);

  plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];
} else {
  plugins = [
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
  ];
}

module.exports = {
  devtool: DEV ? '#source-map' : 'source-map',
  entry: entry,
  plugins: plugins,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    loaders: [{
      test: /\.(jsx|js)?/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src'),
    }],
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.es6', '.jsx'],
  },
};
