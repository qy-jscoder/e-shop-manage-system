const path = require('path')

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                // 'network':'@/network',
                'views': '@/views'
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
          preProcessor: 'sass',
          patterns: [
            path.resolve(__dirname, './src/assets/styles/*.scss')      //你的.scss文件所在目录
          ]
        }
      }
}