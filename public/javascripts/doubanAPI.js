/**
 * Created by ZXR on 2016/8/5.DOUBANaPI
 */

$(function () {
    $('#douban').blur(function(e){
         var douban=$(this);
        var id=douban.val();
        if(id){
            $.ajax({
                url:'http://api.douban.com//v2/movie/subject/'+id,
                cache:true,
                dataType:'jsonp',
                crossDomain:true,
                jsonp:'callback',
                success:function(data){

                    $('#title').val(data.title);
                    $('#directror').val(data.directors[0].name);
                    $('#contry').val(data.countries[0]);
                    $('#poster').val(data.images.medium);
                    $('#year').val(data.year);
                    $('#summary').val(data.summary);


                }
            });


        };

    });

    $('#poster').change(function(){
        var data =$('#poster').val();
        $('<img>').attr({
            src:data
        }).appendTo('#imagesShow');

    });
})