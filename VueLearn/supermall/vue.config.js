module.exports = {
  configureWebpack : {
    resolve : {
      alias : {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  // chainWebpack: config => {
  //   config.module
  //     .test(/\.less$/)
  //     .loader("style-loader!css-loader!less-loader")
  // }
}
