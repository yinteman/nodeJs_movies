var express = require('express');
var router = express.Router();
var movieModel=require('../model/movieModel');
var cateModel=require('../model/categoryModel');

/* GET home page. */

router.get('/', function(req, res, next) {

    var sreach=req.query.search ? req.query.search :'';
    if(sreach){
        movieModel.find({title:new RegExp(sreach)})
            .populate('category','name')
            .exec(function(err,result){

                var  list={
                    movies:result,

                }
                res.render('list',list);
        })

    }else{
        cateModel.find({}).populate('movies._id','title poster')
        .exec(function(err,result){

            res.render('index',{list:result});

        });
    }



});

router.get('/Bycate/:id',function(req,res,next){
    var id=req.params.id;
    var page=req.query.p ? parseInt(req.query.p ):1;
    console.log(req.query.p);
    var pagesize=2;
    cateModel.findById(id).populate('movies._id','title poster')
        .exec(function(err,data){

            var movies=data.movies || [];
             var result=movies.slice(page -1,page+pagesize -1)
            console.log(result);
            res.render('Bycate',{list:result,
                curPage:(page),
                totalPage:(movies.length)/pagesize,
                catId:id,
            });
        })
})

router.get('/')

module.exports = router;
