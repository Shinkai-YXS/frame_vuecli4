const path = require('path');
// glob 是 webpack 安装时依赖的一个第三方模块，该模块允许你使用 * 等符号,
// 例如 lib/*.js 就是获取 lib 文件夹下的所有 js 后缀名的文件
const glob = require('glob');
// 取得相应的页面路径，因为之前的配置，所以是 src 文件夹下的 pages 文件夹
// const PAGE_PATH = path.resolve(__dirname, './src/pages');
const PAGE_PATH = 'src/pages';

setPages = configs => {
  // handleEntry()
  let entryFiles = glob.sync(PAGE_PATH + '/**?/*.js')
  let map = {}

  console.log(PAGE_PATH + '/**?/*.js')
  entryFiles.forEach(filePath => {
      let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
      let tmp = filePath.substring(0, filePath.lastIndexOf('.'))
      let conf = {
          // page 的入口
          entry: filePath,
          // 模板来源
          template: tmp + '.html',
          // 在 dist/index.html 的输出
          filename: filename + '.html',
          // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
          chunks: ['chunk-vendors', 'chunk-common', filename],
          inject: true,
      };
      map[filename] = conf
  })
  console.log(map)
  return map
}

const pages = setPages()
module.exports = {
  pages,
  configureWebpack: {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    resolve: {
      alias: {
          '@': path.resolve(__dirname, './src'),
      }
    },
  },
  // devServer: {
  //   index: '/', // 运行时，默认打开application1页面
  //   // 告诉dev-server在服务器启动后打开浏览器，将其设置true为打开默认浏览器
  //   open: true,
  //   host: 'localhost',
  //   port: 8080,
  //   https: false,
  //   hotOnly: false,
  //   // 配置首页 入口链接
  //   before: app => {
  //       app.get('/', (req, res, next) => {
  //           for (let i in pages) {
  //               res.write(`<a target="_self" href="/${i}">/${i}</a></br>`);
  //           }
  //           res.end()
  //       });
  //   }
  // }
}