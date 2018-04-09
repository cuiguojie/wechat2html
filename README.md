# wechat2html
微信公众号文章HTML代码导出工具

## 功能

* 微信公众号文章内容区HTML代码抓取及标签过滤
* 手动替换及删除文章中的图片（微信后台上传的图片有防盗链机制）

## 安装
```
npm install
```

## 运行
```
npm start
```

## 访问
```localhost:3000``` 或者 ```127.0.0.1:3000```

标签过滤使用的[clean-html](https://www.npmjs.com/package/clean-html)组件，配置目前硬编码在 ```/routes/index.js```中，可以参照组件文档修改

## 说明

微信公众号文章中的图片设置了防盗链机制，直接在非微信网站上引用会被替换。

在网页 head 区添加 ```<meta name="referrer" content="never">``` 声明可以浏览，这个程序的预览即是如此实现
