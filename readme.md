## 目录结构

* `db` : 数据库存储目录
* `models` : 数据库模型文件目录
* `public` : 公共文件目录（js,css,image）
* `router` : 路由文件目录
* `schemas` ： 数据库结构文件目录
* `views` : 模版视图文件目录
* `app.js` ： 文件入口

## 运行mongodb

* 安装mongodb ： `brew install mongodb`
* 开启mongodb，并指定数据库文件路径 `mongod --dbpath <path to data directory>`
* 连接（GUI工具可以用Robo 3T）