/**
 * Created by ZXR on 2016/8/4.删除list
 */
$(function(){
    $('.del').click(function(e){
        var target = $(e.target);
        var id=target.data('id');
        var tr=$('.item-id-'+id);
        $.ajax({
            type:'delete',
            url:'/list/'+id,

        }).done(function(data){

            if(data.success == 1){
                if(tr.length >0){
                    tr.remove();

                }
            }else{
                alert('伤处失败');
            }
        });
    })
})