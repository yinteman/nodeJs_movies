/**
 * Created by ZXR on 2016/7/28.Admin，后台管理文件
 */
var express = require('express');
var router = express.Router();
var movieModel=require('../model/movieModel');
var cateModle=require('../model/categoryModel')
var fs=require('fs');
var path=require('path');
var formidable = require('formidable');

router.get('/:id', function(req,res,next) {
    var id=req.params.id !=undefined?req.params.id : 0;
    console.log(id);
    if(id){
        movieModel.findById(id,function(err,movie){
            var options={
                movie:movie
            };
            res.render('admin',options);
        })
    }else{
        res.render('admin');
    }


});
router.get('/',function(req,res,next){
    var imageUpload= req.cookies.uplodadImg;


    cateModle.find({},function(err,category){
        var options={
            movie:{},
            category:category,
            uplodeImgae:imageUpload
        }
        res.render('admin',options);
    })


});
router.post('/',function(req,res,next){
    var movieNew=req.body;

    var imagePath=movieNew.poster?movieNew.poster :'bawangbieji.jpg';
        if (req.poster ){imagePath = '/images/'+req.poster;}
    var id=req.params.id !=undefined?req.params.id : 0;
       console.log(movieNew);
        if (id){
       movieModel.findOne({_id:id},function(err,movie){
           if(err){console.log(err)}
           _movie=Object.extend(movie,movieNew);
           _movie.save(function(err,movie){
               if(err){console.log('err'+err)};
               res.redirect('/detail/:'+id);
           });
       });
    }else {
            if (movieNew.title && movieNew.title.length > 0) {
                //var cate= movieNew.cateName != undefined? movieNew.cateName:movieNew.category;
                _movie = new movieModel({
                    title: movieNew.title,
                    director: movieNew.director,
                    language: movieNew.country,
                    country: movieNew.country,
                    category: movieNew.category,
                    summary: movieNew.summary,
                    flash: '#',
                    poster: imagePath,
                    year: movieNew.year,
                    meta: {
                        creatAt: Date.now(),

                        updatAt: Date.now()

                    }
                });
                _movie.save();
                var movieId = _movie.get('id');

                cateModle.find({_id: movieNew.category}, function (err, result) {
                    console.log(movieNew.category);
                    console.log(result);
                    result[0].movies.push(movieId);
                    result[0].save(function (err, data) {

                        res.redirect('/list');
                    })
                })
            };

        }

    });

router.post('/upload',function(req,res,next){
    var form = new formidable.IncomingForm();
    form.uploadDir=path.join(path.normalize(__dirname + '/..'),'public','images');
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files){
        if (err){
            req.flash('error', '文件上传失败');
            return res.redirect('/admin');
        }
        for(var key in files){
            var file=files[key];
            var extName = '';  //后缀名
             switch (file.type) {
             case 'image/pjpeg':
             extName = 'jpg';
             break;
             case 'image/jpeg':
             extName = 'jpg';
             break;
             case 'image/png':
             extName = 'png';
             break;
             case 'image/x-png':
             extName = 'png';
             break;
             }

            var avatarName = file.name.split('/')[0] ;
            var newPath = form.uploadDir + '\\'+avatarName;
            console.log(newPath);
            fs.renameSync(file.path, newPath);  //重命名

            var uploadfile=newPath;
            res.cookie('uplodadImg',uploadfile,{maxAge:3000});
            res.redirect('/admin');
        }


    });



})




module.exports=router;