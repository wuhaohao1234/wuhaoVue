# webpack配置vue

## 初始化环境

`yarn init -y`

## 安装webpack依赖

`yarn add webpack webpack-cli`

## 安装vue依赖

> 由于vue-loader是基于css-loader的，所以需要css-loader

> vue-template-complier主要是识别template模板字符串

`yarn add vue vue-loader style-loader css-loader vue-template-complier`

## 编写全局下的webpack.config.js

```
const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
```
## 编写src下的文件App.vue与入口文件index.js

```
# index.js
import Vue from 'vue'
import App from './app.vue'
const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) => h(App)
}).$mount(root)
# App.vue
<template>
  <div id="app">
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      text: 'this is test'
    }
  }
}
</script>

<style scoped>
  #app {
    color: red;
  }
</style>
```
## package.json增加scripts字段
```
"scripts": {
    "build": "webpack"
}
```
## 编译
`yarn build`
## 图片资源的打包，css预处理器
* 安装stylus-loader url-loader file-loader
`yarn add stylus-loader url-loader file-loader --save`
* 在webpack.config.js中增加字段,这样可以使用styl文件与img图片
```
const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|svg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        filename: '[name].[ext]'
                    }
                }
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
```
## devServer开启服务
* 在package.json中的scripts增加dev字段,执行yarn run dev可以开启一个本地服务
```
"scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --mode=development --config webpack.config.js"
}
```
## 去判断开发环境与生产环境
* 安装cross-env
`yarn add cross-env --save`

## 参考(未完，待续)
    https://blog.csdn.net/weixin_40814356/article/details/80625747
