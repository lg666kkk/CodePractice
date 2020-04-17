module.exports = {
  devServer: {
    proxy: { // 配置跨域
      '/api': {
          target: 'http://localhost:3000/api',    // 你自己的api接口地址
          changeOrigin: true,
          ws: true,
          pathRewrite: {
              '^/api': '',  
        }
    //proxy: 'http://localhost:3000'
  }
}
}
}
