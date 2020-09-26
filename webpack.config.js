const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/dist/',
    filename: 'js/app.js'
  },
  resolve: {
    alias: {
      page: path.resolve(__dirname,'src/page'),
      component: path.resolve(__dirname,'src/component')
    }
  },
  plugins: [
    // 处理HTML文件
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    // 提出css文件
    new ExtractTextPlugin("css/[name].css"),
    // 提出公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name:'common',
      filename:'js/base.js'
    })
  ],
  module: {
    rules: [
      // react语法处理
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']
          }
        }
      },
      // css语法处理
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      // sass文件的处理
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      // 图片配置
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'resource/[name].[ext]'
            },
          },
        ],
      },
      // 字体图标配置
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'resource/[name].[ext]'
            },
          },
        ],
      },
      
    ]
  },
  devServer: {
    port:8086,
    historyApiFallback:{ 
      index: '/dist/index.html'
    }
  }
};