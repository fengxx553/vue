
const path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  devServer: {       //开启代理服务器 (方式1)   配置多个代理
    
}
}