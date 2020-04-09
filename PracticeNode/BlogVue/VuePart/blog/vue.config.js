
module.exports = {
  configureWebpack : {
    resolve : {
      alias : {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'network' : '@/network'
      }
    }
  },
  // chainWebpack: config => {
  //   config.module
  //     .test(/\.less$/)
  //     .loader("style-loader!css-loader!less-loader")
  // }
  // devServer: {
  //   // proxy: { // 配置跨域
  //   //     '/': {
  //   //         target: 'http://127.0.0.1:3000',
  //   //         changOrigin: true,// 是否跨域
  //   //     }
  //   // },
  //   proxy : "http://127.0.0.1:3000"
  // }
}
