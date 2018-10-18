$(function () {
    mui('.mui-scroll-wrapper').scroll({
       indicators:false
    });
    //    用户下拉刷新
    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto:true,
                callback:function () {
     //初始化页面，自动下拉刷新
                    var that=this;

                    window.down=this;

                    setTimeout(function () {
                        getCartData(function (data) {
                            //console.log(data);
                            $('.mui-table-view').html(template('cart',data));

                            that.endPulldownToRefresh();
    //点击刷新按钮 刷新
                            $('.fa-refresh').on('tap',function () {
                                that.pulldownLoading();
                            });
                        });
                    },500);
                }
            }

        }
    });

    //初始化页面，自动下拉刷新
    //侧滑时候 点击编辑 弹出对话框
    $('.mui-table-view').on('tap', '.mui-icon-compose' ,function () {

        var id=$(this).parent().attr('data-id');
        var item=ltl.getItemById(window.cartData.data,id);
        //console.log(item);

        var html=template('edit', item);
        var btnArray = ['确认', '取消'];
        mui.confirm(html.replace(/\n/g,''), '商品编辑', btnArray, function(e) {

            if (e.index == 0) {
                var size=$('.btn_size.now').html();
                var num=$('.p_number input').val();

                ltl.loginAjax({
                    type:'post',
                    url:'/cart/updateCart',
                    data:{
                        id:id,
                        size:size,
                        num:num
                    },
                    dataType:'json',
                    success:function (data) {
                        if(data.success==true){
                            //窗口关闭列表刷新
                            console.log(data);
                            item.num=num;
                            item.size=size;
                            $('.mui-table-view').html(template('cart',window.cartData));
                                            //setAmount();---------------
                        }

                    }
                })
            } else {
                //TODO
            }
        })
    });

    $('body').on('tap', '.btn_size',function () {

        $(this).addClass('now').siblings().removeClass('now');
    });
    $('body').on('tap','.p_number span',function () {

        var currNum=parseInt($(this).siblings('input').val());
        var maxNum=parseInt($(this).siblings('input').attr('data-max'));

        if($(this).hasClass('jian')){
            if(currNum <= 1)return false;
            currNum--;
            $(this).siblings('input').val(currNum);
        }
        if($(this).hasClass('jia')){
            if(currNum >= maxNum)return false;
            currNum++;
            $(this).siblings('input').val(currNum);
        }
    });


    //侧滑时候 点击删除 弹出对话框
    $('.mui-table-view').on('tap', '.mui-icon-trash' ,function () {

        var $this=$(this);
        var id=$(this).parent().attr('data-id');

        var btnArray = ['确认', '取消'];
        mui.confirm('确认删除该商品吗？', '商品编辑', btnArray, function(e) {

            if (e.index == 0) {
               ltl.loginAjax({
                   type:'get',
                   url:'/cart/deleteCart',
                   data:{id:id},
                   dataType:'json',
                   success:function (data){
                       if(data.success==true){
                           $this.parent().parent().remove();
                           setAmount();
                       }
                   }
               })
            } else {
                //TODO
            }
        })

    });
    //点击复选框 计算钱
    $('body').on('change','[type=checkbox]',function () {
        setAmount();


    });



});


var setAmount=function () {
    var $checkedBox=$('[type=checkbox]:checked');
    //$.each(i,item)  $dom.each(i,item)  arr.forEach(item,i)
    var amountSum=0;
    $checkedBox.each(function (i,item) {
        var id=$(this).attr('data-id');
        var item=ltl.getItemById(window.cartData.data,id);
        var num=item.num;
        var price=item.price;
        var amount=price*num;
        amountSum+=amount;
    });
    if(Math.floor(amountSum*100)%10){
        amountSum=Math.floor(amountSum*100)/100
    }else{
        amountSum=Math.floor(amountSum*100)/100;
        amountSum=amountSum.toString()+'0';
    }
    //console.log(amountSum);
    $('#cartAmount').html(amountSum);
};






var getCartData=function (callback) {
  ltl.loginAjax({
      type: 'get',
      url: '/cart/queryCartPaging',
      data:{
          page:1,
          //不产生分页，需要修改接口
          pageSize:100
      },
      dataType:'json',
      success:function (data) {
          //console.log(data.data);
          window.cartData=data;
          callback && callback(data);
      }
  })
};
