/**
 * Created by ZXR on 2016/8/5.commentSchema有关联查询
 */

var mongoose=require('mongoose');

var ObjectId=mongoose.Schema.Types.ObjectId;

var commentSchema=new mongoose.Schema({
    movie:{
        type:ObjectId,ref:'movie'
    },
    from:{
        type:ObjectId,ref:'user'
    },
    to:{
        type:ObjectId,ref:'user'
    },
    content:String,
    reply:[{
        from:{type:ObjectId,ref:'user'},
        to:{type:ObjectId,ref:'user'},
        content:String
    }],
    time:{
        type:Date,
        default:Date.now()
    }
});


module.exports=commentSchema;