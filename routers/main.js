const express = require('express');
const router = express.Router();

//在admin里面，所以路由是/admin/user
router.get('/',function(req,res,next){
    res.render('main/index',{
        userInfo : req.userInfo
    })
})
module.exports = router;