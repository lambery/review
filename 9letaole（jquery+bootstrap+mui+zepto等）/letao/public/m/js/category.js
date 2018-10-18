$(function () {
//渲染一级分类
    getCategoryData(function (data) {
        $('.cate_left ul').html(template('firstTemplate',data));

        var categoryId=$('.cate_left ul li:first-child').find('a').attr('data-id');


//渲染2级分类
        getCategoryDataSecond({id:categoryId},function (data) {
            $('.cate_right ul').html(template('secondTemplate',data));
            //console.log(data);
        })

    });

    //点击一级分类加载对应2级分类
    $('.cate_left').on('click','.cate_left ul li a',function () {
        if($(this).parent().hasClass('now'))return;

        $('.cate_left li').removeClass('now');

        $(this).parent().addClass('now');

       var categoryId=$(this).attr('data-id');

        getCategoryDataSecond({id:categoryId},function (data) {
            $('.cate_right ul').html(template('secondTemplate',data));
        })
    });


});



//获取一级分类数据
var getCategoryData=function (callback) {
    $.ajax({
        url:'/category/queryTopCategory',
        type:'get',
        data:'',
        dataType: 'json',
        success: function (data) {
            callback&&callback(data);

        }
    });
};

//获取2级分类数据
//params={id:1};
var getCategoryDataSecond=function (params,callback) {
    $.ajax({
        url:'/category/querySecondCategory',
        type:'get',
        data: params,
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            callback&&callback(data);
        }
    });
};
