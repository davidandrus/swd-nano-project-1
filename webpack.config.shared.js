const path = require('path');

module.exports = {
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
