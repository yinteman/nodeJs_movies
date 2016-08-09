/**
 * Created by ZXR on 2016/7/28.lsit列表文件
 *
 */

var express = require('express');
var router = express.Router();
var movieModel=require('../model/movieModel');
router.get('/', function(req, res, next) {
   movieModel.find({},function(err,movies){
       if(err){
           console.log(err);
       }
       var options={
           movies:movies
       };
       res.render('list', options);
   });

});
router.delete('/:id',function(req,res){
    var id=req.params.id;
    console.log(req.params.id);
    if(id){
        movieModel.remove({_id:id},function(err,result){
            if(err){console.log(err);}
            else{
                var result={"success":1};
                res.jsonp(result);
            }
        })
    }
});
module.exports = router;