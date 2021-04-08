var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// TODO: move DashboardPlugin into dev build because it hangs prod build
// var DashboardPlugin = require('webpack-dashboard/plugin');
var CopyPlugin = require('copy-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file',
        query: {
          name: 'assets/[name].[hash].[ext]'
        }
      },
      {
        test: /\.css$/,
        loader: 'raw'
      }
    ],
    exprContextCritical: false
  },

  plugins: [
    // TODO: move DashboardPlugin into dev build because it hangs prod build
    // new DashboardPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new CopyPlugin([
      'vendor/**/*',
      'styles/**/*',
      'tr/**/*',
    ])
  ]
};
