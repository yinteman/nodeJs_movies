/**
 * Created by ZXR on 2016/8/5.commentModel
 */
var mongoose=require('mongoose');
var commentSchema=require('../schema/commentSchema');

var commentModel=mongoose.model('comment',commentSchema);



module.exports=commentModel;