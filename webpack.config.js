'use strict';

module.exports = {
  cache: process.env.NODE_ENV !== 'development',
  entry: ['./public/js/app.js'],
  output: {
    path: './dist/js',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?optional=runtime',
        exclude: /node_modules/
      }
    ]
  }
};
