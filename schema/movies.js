/**
 * Created by ZXR on 2016/8/2.movies的schema文件
 */


var mongoose=require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;
var movieSchema= mongoose.Schema({
    title:String,
    director:String,
    language:String,
    country:String,
    summary:String,
    category:{
        type:ObjectId,
        ref:'category'
    },
    flash:String,
    poster:String,
    year:String,
    meta:{
        creatAt:{
            type:Date,
            Default:Date.now()
        },
        updatAt:{
            type:Date,
            Default:Date.now()
        }
    }
});

/*movieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.creatAt=Date.now();
        this.meta.updatAt==Date.now();
    }else{
        this.meta.updatAt=Date.now();
    }
});*/

module.exports=movieSchema;