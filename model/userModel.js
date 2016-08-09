/**
 * Created by ZXR on 2016/8/4.user的 model层
 */
var mongoose=require('mongoose');
var userSchema=require('../schema/userSchema');

var userModel=mongoose.model('user',userSchema);




module.exports=userModel;