$(function () {
    var id=ltl.getParamByUrl().productId;

    getProductData(id,function (data) {
        $('.mui-icon-spinner').remove();

        $('.mui-scroll').html(template('detail',data));
        //console.log(data);
        mui(".mui-slider").slider({
            interval: 2000
        });
        mui('.mui-scroll-wrapper').scroll({
            indicators:false
        });


    //    尺码选择
        $('.btn_size').on('tap',function () {
           $(this).addClass('now').siblings().removeClass('now');
        });

    //    数量选择
        $('.p_number span').on('tap',function () {
           var currNum=$(this).siblings('input').val();
            var maxNum=$(this).siblings('input').attr('data-max');

            if($(this).hasClass('jian')){
                if(currNum==0)return false;
                currNum--;
                $(this).siblings('input').val(currNum);
            }
            if($(this).hasClass('jia')){
                if(currNum==maxNum)return false;
                currNum++;
                $(this).siblings('input').val(currNum);
            }
        });

    //    加入购物车
        $('.btn_addCart').on('tap',function () {
            var $changeBtn=$('.btn_size.now');
            if(!$changeBtn.length){
                mui.toast('请选择尺码');
                return;
            }
            var num=$('.p_number span').siblings('input').val();
            if(num==0){
                mui.toast('请选择数量');
                return;
            }

            ltl.loginAjax({
                url:'/cart/addCart',
                type:'post',
                data:{
                    productId:id,
                    num:num,
                    size:$changeBtn.html() 
                },
                dataType:'json',
                success:function (data) {
                    if(data.success==true){



                        var btnArray = ['是', '否'];
                        mui.confirm('添加成功，去购物车看看？', '温馨提示', btnArray, function(e) {
                            if (e.index == 0) {
                                location.href=ltl.cartUrl;
                            } else {
                                //TODO
                            }
                        })



                    }

                }
            })

        });





    });







});



var getProductData=function (productId,callback) {
    $.ajax({
        url:'/product/queryProductDetail',
        type:'get',
        data:{
            id:productId
        },
        dataType:'json',
        success:function (data) {
            setTimeout(function () {
                callback&&callback(data);
            },500);
        }
    })
};