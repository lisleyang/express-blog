const express = require('express');
const router = express.Router();

//在admin里面，所以路由是/admin/user
router.get('/user',function(req,res,next){
    res.send('admin-user')
})

module.exports = router;