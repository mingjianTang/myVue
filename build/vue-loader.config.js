module.exports = (isDev) => {
  return {
    preserveWhitepace: true,   //对空格的处理
    extractCSS: !isDev,         //将.vue的css另外打包
    cssModules: {
        localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
        camelCase: true
    },
    //  hotReload: false,       //根据环境变量生成
  }
}