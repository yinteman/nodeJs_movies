/**
 * Created by ZXR on 2016/8/2.movie的MODEL层
 */

var mongoose=require('mongoose');
var movieSchema=require('../schema/movies');

var movieModel= mongoose.model('movie',movieSchema);

var movieEnity=new movieModel({
    title:'麒麟之翼',
    director:'东野圭吾',
    language:'japenes',
    country:'japenes',
    year:'1998-10-12',
    summary:'too ad',
    flash:'/flash/#',
    poster:'bawangbieji.jpg',
    meta:{
        creatAt:Date.now(),
        updatAt:Date.now()

    }
});











module.exports=movieModel;