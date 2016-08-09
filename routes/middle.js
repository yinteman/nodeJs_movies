/**
 * Created by ZXR on 2016/8/4.中间件
 */
var fs=require('fs');
var path=require('path');
var formidable=require('formidable');


exports.loginRequire=function(req,res,next) {
    var user = req.session.user;
    console.log(user);
    if (!user) {
        return res.redirect('/user');
    } else {
        next();
    }
}

/*上传图片，file是异步执行...*/
