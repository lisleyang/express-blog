/**
 * 应用程序的入口文件
 */
const createError = require('http-errors');
const express = require('express');
const app = express();
const fs = require('fs');
const swig = require('swig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookies = require('cookies');

//配置应用模版
//第一个参数是模版名称，也是模版文件的后缀；第二个参数是解析模版内容用到的方法
app.engine('html',swig.renderFile);
//设置模版文件存放目录
app.set('views','./views');
app.set('view engine','html');

//在开发过程中，需要取消模版缓存；否则仅修改模版，node会使用之前缓存的，导致浏览器访问不到
swig.setDefaults({
    cache : false
})

//中间件

//bodyParser中间件，在req上添加body属性
//和ContentType有关
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));    //extended表示根据哪个库来解析

app.use(function(req,res,next){
    req.cookies = new cookies(req,res);

    //解析登录用户的cookie信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        req.userInfo = {};
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            next()
        }catch(e){
            next();
        }

    } else {
        next();
    }
})

//设置静态文件托管
//以public开始的路径，使用第二个参数对应的方法
app.use('/public',express.static(__dirname + '/public'))

//根据不同的功能划分模块
app.use('/admin',require('./routers/admin'))
app.use('/api',require('./routers/api'))
app.use('/',require('./routers/main'))

app.use(function(req, res, next) {
    next(createError(404));
});
  
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

mongoose.connect("mongodb://localhost:27017/blog",function(err){
    if(err){
        console.log(err)
    }else{
        console.log('数据库连接成功');
        app.listen(8082,function(){
            console.log('server is running ar 8082')
        })
    }
})