/**
 * Created by ZXR on 2016/8/5.电影详情页面上对于评论的控制
 */
$(function(){
    $('.media').each(function(i,e){
          if(i % 2 ==1){
              $(this).children().removeClass('pull-left').addClass('pull-right')
          }
    });
    $('.comment').click(function(e){
        var target= $(this);

        var tid=target.data('tid');
        var cid=target.data('cid');
        if($('#tid').length >0){$('#tid').val(tid);}
        else {
            $('<input>').attr({
                type: 'hidden',
                id: 'tid',
                name: 'toId',
                vaule: tid
            }).appendTo('#commentForm');
        }


        if($('#cid').length >0){$('#cid').val(cid)}
        else{
            $('<input>').attr({
                type: 'hidden',
                id: 'cid',
                name: 'commentId',
                vaule: cid
            }).appendTo('#commentForm');
        }

    });
})