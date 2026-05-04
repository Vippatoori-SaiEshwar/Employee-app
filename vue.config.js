const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/Employee-app/' : '/',
  parallel: false,
  configureWebpack: {
    performance: {
      hints: false
    }
  },
  transpileDependencies: true
})
