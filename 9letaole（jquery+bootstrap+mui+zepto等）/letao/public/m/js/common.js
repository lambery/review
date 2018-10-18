window.ltl={};
ltl.getParamByUrl=function () {
    var params=[];
    var search=location.search.replace('?','');

    if(search){
        var arr=search.split('&');
        arr.forEach(function (item,i) {
            var itemArr=item.split('=');
            params[itemArr[0]]=itemArr[1];
        });
    }
    return params;
};

//获取到的表单序列号字符串转对象
ltl.serialize2object=function (serializeStr) {
    var obj={};
    if(serializeStr){
       var arr=serializeStr.split('&');
        arr.forEach(function (item,i) {
           var itemArr=item.split('=');
            obj[itemArr[0]]=itemArr[1];
        });
    }
    return obj;
};
ltl.getItemById=function (arr,$id) {
    var item=null;
    arr.forEach(function (data,i) {
       if(data.id==$id){
           item=data;
       }
    });
    return item;
};



//需要登陆的ajax请求
ltl.loginUrl='/m/user/login.html';
ltl.cartUrl='/m/user/cart.html';
ltl.usertUrl='/m/user/index.html';


ltl.loginAjax=function (params) {
    if(!params.url) return false;
//params==>{}
    $.ajax({
        type: params.type || 'get',
        url: params.url || '#',
        data: params.data || '',
        dataType: params.dataType || 'json',
        beforeSend:function(){
            params.beforeSend && params.beforeSend();
        },
        success:function (data) {
            //未登陆处理error400
            if(data.error == 400){
                location.href = ltl.loginUrl + '?returnUrl=' + location.href;
                return false;
            }else{
                params.success && params.success(data);
            }

        },
        error:function () {
            mui.toast('服务器繁忙');
        }

    })
};