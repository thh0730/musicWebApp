module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    }
  },

  devServer: {
    proxy: {
      '/api': { // 使用"/api"来代替"http://f.apiplus.c"
        target: 'http://127.0.0.1:3000', // 源地址
        changeOrigin: true, // 改变源
        pathRewrite: {
          '^/api': 'http://127.0.0.1:3000' // 路径重写
        }
      }
    }
  }
}
