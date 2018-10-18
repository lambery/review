$(function () {
    window.page=1;
    
    //模板引擎请求的内部无法访问外部变量的解决方案
    //在html模板内部定义一个函数
    template.helper('getJquery',function () {
       return jQuery;
    });

    //默认第一页显示
    var render=function () {
        getCateSecondData(function (data) {
          //模板熏染
          //console.log(data);
          $('tbody').html(template('list',data));

          //初始化分页组件
          $('.pagination').bootstrapPaginator({
              //对应版本
              bootstrapMajorVersion:3,
              size: 'small',
              //当前页码
              currentPage: data.page,
              //一共多少页
              totalPages: Math.ceil(data.total/data.size),
              //页码数量 默认5
              numberOfPages: 3,
              //点击页码渲染功能
              //监听按钮的点击事件
              onPageClicked:function (event, originalEvent, type,page) {
                  //event jquery的事件对象
                  //originalEvent 原生dom的事件对象
                  //type 按钮的类型
                  //按钮对应的页码
                  window.page=page;
                  render();
              }
          })
      })  
    };
    render();

    //点击添加分类弹窗
    getCateFirstData(function (data) {
        $('.dropdown-menu').html(template('dropDown',data));

        $('.dropdown-menu').on('click','li',function () {
           var categoryName=$(this).find('a').html();
           $('.categoryName').html(categoryName);
            //给隐藏的id表单赋值
            $('[name=categoryId]').val($(this).find('a').attr('data-id'));
        });

    });

    //图片上传
    initFileUpLoad();

    //点击确认按钮 提交

    /*$('#save').on('click','.btn-primary',function (e) {
        e.preventDefault();
        $('#save').modal('hide');
    });*/
    //    初始化检验插件
    $('#save form').bootstrapValidator({
        //配置校验的不同状态下显示的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //需要校验的表单元素 通过名称name
        fields: {
            categoryId: {
                //校验规则 按需写
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传图片'
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {//检验成功后点击提交之后
        // Prevent form submission阻止表单默认提交
        e.preventDefault();

        var $form=$(e.target);
        var $form2=$form.serialize().split('&');
        var $form3={};

        $form2.forEach(function (item,i) {

            var itemArr=item.split('=');
            $form3[itemArr[0]]=itemArr[1];
            //console.log($form3);
        });
        //后台检验数据


    });



});

var getCateSecondData=function (callback) {
    $.ajax({
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data:{
            page:window.page || 1,
            pageSize: 2
        },
        dataType:'json',
        success:function (data) {
            callback&&callback(data);
        }
    })
};
var getCateFirstData=function (callback) {
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page:1,
            pageSize: 1000
        },
        dataType:'json',
        success:function (data) {
            callback&&callback(data);
        }
    })
};
var initFileUpLoad=function () {

        $('[name="pic1"]').fileupload({
            url:'/category/addSecondCategoryPic',
            dataType: 'json',
            done: function (e, data) {
                  //console.log(data.result.picAddr);

                $('#changePic').attr('src',data.result.picAddr);

                $('[name="brandLogo"]').val(data.result.picAddr);
            }
        });
};

