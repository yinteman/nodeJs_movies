/**
 * Created by ZXR on 2016/8/4.用户管理界面
 */
var express = require('express');
var router = express.Router();
var userModel=require('../model/userModel');

router.get('/',function(req,res,next){
    var user=req.session.user?req.session.user :'';
    var option={
        say:'welcom',
        user:user
    };
    res.render('welcome',option);
});
router.post('/signUp',function(req,res,next){
    var userNam=req.body.name;
    var userPwd=req.body.pwd;

    userModel.findOne({name:userNam},function(err,result){
        if(err){console.log(err);}
        if(result){
            console.log('此用户已经注册过了');
            res.redirect('/user');
        }else{
            var  user=new userModel({
                name:userNam,
                pwd:userPwd,
                role:1
            });
            user.save(function(err){
                err && console.log(err);
                res.redirect('/user');
            });
        }


    })



});
router.post('/login',function(req,res,next){
    var userNam=req.body.name;
    var userPwd=req.body.pwd;

    userModel.findOne({name:userNam}, function (err,result) {
        err && console.log(err);
        if(result && userPwd == result.pwd){
            console.log('登录成功');
            req.session.user=result;
            res.redirect('/index');
        }else{
            console.log('登录失败');
            res.redirect('/user');
        }

    });
});

router.get('/loginOut',function(req,res,next){
    delete  req.session.user;
    res.redirect('/user');
})
module.exports=router;