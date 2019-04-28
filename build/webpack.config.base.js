const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const config = {
  target: 'web',
  entry: path.join(__dirname, '../src/main.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(vue|js|jsx)$/,
      //   loader: 'eslint-loader',
      //   exclude: '/node_modules/',
      //   enforce: 'pre'
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(gif|jpg|jpeg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/images/[hash:8].[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/fonts/[hash:8].[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'dist/favicon.ico'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
