const express = require('express');
const router = express.Router();
const User = require('../models/User.js')

//统一返回格式
var responseData
router.use(function(req,res,next){
    responseData = {
        code : 0,
        message : ''
    }
    next()
})

//用户注册
/**
 * 1. 用户名不能为空
 * 2. 密码不能为空
 * 3. 两次输入密码必须一致
 * 
 * 1. 用户是否已经被注册了
 */
router.post('/user/register',function(req,res,next){
    let username = req.body.username;
    let password = req.body.password;
    let repassword = req.body.repassword;
    
    if(username == ''){
        responseData.code == 1;
        responseData.message = '用户名不能为空';

        res.json(responseData);
        return;
    }
    if(password == ''){
        responseData.code == 2;
        responseData.message = '密码不能为空'

        res.json(responseData)
        return;
    }

    if(password!==repassword){
        responseData.code == 3;
        responseData.message = '密码不一致'
    }

    User.findOne({
        username : username
    }).then(userInfo=>{
        if(userInfo){
            responseData.code = 4;
            responseData.message = "用户名已经被注册了";
            res.json(responseData)
        }else{
            var user = new User({
                username:username,
                password : password
            })
            return user.save()

            // responseData.message = "注册成功";
            // res.json(responseData)
        }
    }).then(function(newUserInfo){
        responseData.message = "注册成功";
        res.json(responseData)
    })

})

router.post('/user/login',function(req,res,next){
    let username = req.body.username;
    let password = req.body.password;
    
    if(username == ''){
        responseData.code == 1;
        responseData.message = '用户名不能为空';

        res.json(responseData);
        return;
    }
    if(password == ''){
        responseData.code == 2;
        responseData.message = '密码不能为空'

        res.json(responseData)
        return;
    }

    User.findOne({
        username : username,
        password : password
    }).then(userInfo=>{
        if(!userInfo){
            responseData.code = 2;
            responseData.message = "用户名或密码错误";
            res.json(responseData)
        }else{
            responseData.code = 0;
            responseData.message = "登录成功";
            responseData.userInfo = {
                username : userInfo.username,
                _id : userInfo._id
            }
            req.cookies.set('userInfo',JSON.stringify(responseData.userInfo));
            res.json(responseData)
        }
    })

})

router.get('/user/logout',function(req,res,next){
    req.cookies.set('userInfo',null);
    responseData.message = '';
    res.json(responseData);
})

module.exports = router;