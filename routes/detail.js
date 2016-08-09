/**
 * Created by ZXR on 2016/7/28.详情页面
 */
var express=require('express');
var router=express.Router();
var movieModel=require('../model/movieModel');
var commentModel=require('../model/commentModel');
router.get('/:id',function(req,res,next){
   var id=req.params.id;
    movieModel.findById(id,function(err,movie){
        commentModel.find({movie:id}).populate('from','name').populate('reply.from reply.to','name')
            .exec(function(err,comments){
                if(err){console.error(err);}
                var option={
                    movie:movie,
                    comments:comments
                };

                res.render('detail',option);
            });
    });

})

module.exports=router;