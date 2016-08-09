/**
 * Created by ZXR on 2016/8/5.电影的分类管理
 */
var mongoose=require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;

var categorySchema=new mongoose.Schema({
    name:String,
    movies:
    [{_id:{type:ObjectId,ref:'movie'}}]

});

module.exports=categorySchema;