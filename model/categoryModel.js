/**
 * Created by ZXR on 2016/8/5.分类的Model
 */

var mongoose=require('mongoose');

var categorySchema=require('../schema/categorySchema');

var cateModel=mongoose.model('category',categorySchema);


module.exports=cateModel;