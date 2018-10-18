$(function () {
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: true, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });

//    初始化后,关键字在框内
    /*var key= (location.search.substr(5));
    console.log(key);
    $('input').val(key);*/
    var urlParams=ltl.getParamByUrl();
    var $input=$('input').val(urlParams.key||'');


//    根据关键字查询第一页数据4条
    getSearchData({proName:$input.val(), page:1, pageSize:4},function (data) {
        $('.ltl_product').html(template('firstTemplate',data));
        //console.log(data);

    });


//    用户点击搜 根据关键字再次加载
    $('.ltl_search a').on('tap',function () {
       var key=$.trim($input.val());

        if(!key){
            mui.toast('请输入关键字');return false;
        }
        getSearchData({proName:key, page:1, pageSize:4},function (data) {
            $('.ltl_product').html(template('firstTemplate',data));
            //console.log(data);
        });
    });

//    点击排序升降
    $('.ltl_order a').on('tap',function () {

        if($(this).hasClass('now')){
            if($(this).find('span').hasClass('fa-angle-down')){

                $(this).find('span').removeClass('fa-angle-down').addClass('fa-angle-up');

            }else if($(this).find('span').hasClass('fa-angle-up')){

                $(this).find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
            }
        }else{
            $(this).addClass('now').siblings().removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }

        var order=$(this).attr('data-order');
        var orderVal=$(this).find('span').hasClass('fa-angle-up')?1:2;

        var key=$.trim($input.val());
        if(!key){
            mui.toast('请输入关键字');return false;
        }
        var params={proName:key, page:1, pageSize:4};
        params[order]=orderVal;

        getSearchData(params,function (data) {
            $('.ltl_product').html(template('firstTemplate',data));

        });

    });
//    用户下拉刷新
    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                callback :function(){
                    var that=this;
                    var key=$.trim($input.val());
                    if(!key){
                        mui.toast('请输入关键字');return false;
                    }
                    getSearchData({proName:key, page:1, pageSize:4},function (data) {
                        $('.ltl_product').html(template('firstTemplate',data));
                        $('.ltl_order a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
                        //console.log(data);
                       that.endPulldownToRefresh();
                        that.refresh(true);
                    });
                }
            },
            //     上拉加载下一页或无数据
           up:{
               callback:function () {
                   window.page++;
                   var that=this;
                   var key=$.trim($input.val());
                   if(!key){
                       mui.toast('请输入关键字');return false;
                   }
                   var order=$('.ltl_order a.now').attr('data-order');
                   var orderVal=$('.ltl_order a.now').find('span').hasClass('fa-angle-up')?1:2;
                   var params={proName:key, page:window.page, pageSize:4};
                   params[order]=orderVal;

                   getSearchData(params,function (data) {
                       $('.ltl_product').append(template('firstTemplate',data));
                       //console.log(data);
                       if(data.data.length){
                           that.endPullupToRefresh();
                       }else{
                           that.endPullupToRefresh(true);
                       }

                   });

               }

           }
        }
    });









});








var getSearchData=function (params,callback) {
    $.ajax({
        url:'/product/queryProduct',
        type:'get',
        data: params,
        dataType: 'json',
        success:function (data) {
            window.page=data.page;
            callback && callback(data);
        }
    })
};

