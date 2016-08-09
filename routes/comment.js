/**
 * Created by ZXR on 2016/8/5.评论区的路由
 */


var express=require('express');
var router=express.Router();
var commentModel=require('../model/commentModel');


//保存
router.post('/',function(req,res,next){
    var movie_id=req.body.movie;
    var content=req.body.content;
    var user_id=req.session.user._id;
    var tid=req.body.toId?req.body.toId:'';
    var commentId=req.body.commentId?req.body.commentId:'';

    if(commentId && tid){

        var reply={
            from:user_id,
            to:tid,
            content:content
        }

        commentModel.findById(commentId,function(err,comment){
            comment.reply.push(reply);
            console.log(comment);
            comment.save(function(err,data){
                err && console.error(err);
                res.redirect('/detail/'+movie_id);
            });
        });
    }else{
        var comment=new commentModel({
            movie:movie_id,
            from:user_id,
            content:content
        });
        comment.save(function(err,result){
            if(err){
                console.log(err);
            }
            res.redirect('/detail/'+movie_id);
        });
    }



});

module.exports=router;