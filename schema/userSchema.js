/**
 * Created by ZXR on 2016/8/4.创建userSchema
 */

var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    pwd:String,
    role:{
        type:Number,
        default:1
    }
});


module.exports=userSchema;