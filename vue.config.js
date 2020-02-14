const path = require('path');
// glob 是 webpack 安装时依赖的一个第三方模块，该模块允许你使用 * 等符号,
// 例如 lib/*.js 就是获取 lib 文件夹下的所有 js 后缀名的文件
const glob = require('glob');
// 取得相应的页面路径，因为之前的配置，所以是 src 文件夹下的 pages 文件夹
// const PAGE_PATH = path.resolve(__dirname, './src/pages');
const PAGE_PATH = 'src/pages';

const webpack = require('webpack')
// 引入 AddAssetHtmlPlugin 将构建好的 JS 文件插入到 html页面中
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
// 引入压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')

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
    plugins: [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./public/vendor/vendor-manifest.json')
      }),
      // 给定的 JS 或 CSS 文件添加到 webpack 配置的文件中，并将其放入资源列表 html webpack插件注入到生成的 html 中
      new AddAssetHtmlPlugin({
        // dll文件位置
        filepath: path.resolve(__dirname, './public/vendor/*.js'),
        // dll 引用路径
        publicPath: './vendor',
        // dll最终输出的目录
        outputPath: './vendor'
      }),
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8
    })
    ]
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