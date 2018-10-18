$(function () {

    $('#submit').on('tap', function () {
        // 获取表单序列号  //html要有name   另一种serializeArray
        var data=$('form').serialize();//字符串

        var dataObject=ltl.serialize2object(data);
        //校验
        if(!dataObject.username){
            mui.toast('请输入用户名');
            return false;
        }
        if(!dataObject.password){
            mui.toast('请输入密码');
             return false;
        }
console.log(dataObject);
        $.ajax({
            type: 'post',
            url: '/user/login',
            data :dataObject,
            dataType: 'json',
            success: function (data) {
console.log(data);
                if(data.success==true){
                    var returnUrl=location.search.replace('?returnUrl=','');
                    if(returnUrl){
                        location.href=returnUrl;
                    }else{
                        location.href=ltl.usertUrl;
                    }
                }else {
                    mui.toast(data.message);
                }
            }
        });

    });



});
