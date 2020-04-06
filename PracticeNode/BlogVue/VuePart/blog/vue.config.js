module.exports = {
  configureWebpack : {
    resolve : {
      alias : {
        'assets': '@/assets',
        'components': '@/components',
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
