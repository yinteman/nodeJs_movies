/**
 * Created by ZXR on 2016/8/5.category的路由
 */

var express=require('express');
var router=new express.Router();
var categoryModel=require('../model/categoryModel');


router.get('/newCate', function (req,res,next) {
    res.render('category');
});
router.post('/',function(req,res,next){
    var name=req.body.name;
    var cate=new categoryModel({
        name:name
    });
    cate.save(function(err,data){
        err && console.error(err);
        res.redirect('/category/newCate');})

});

router.get('/catelist',function(req,res,next){
      categoryModel.find().exec(function(err,result){

          res.render('catelist',{list:result});
      })

});

router.get('/catelist/:id',function(req,res,next){
    var id=req.params.id;
    console.log(id);
    categoryModel.remove({_id:id}).exec(function(err,data){
        err && console.error(err);
        res.redirect('/category/catelist');
    });

})

module.exports=router;