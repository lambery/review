$(function () {


  getAddress(function (data) {
console.log(data);
      $('[name=recipients]').val(data[0].recipients);
      $('[name=postCode]').val(data[0].postCode);
      $('[name=address]').val(data[0].address);
      $('[name=addressDetail]').val(data[0].addressDetail);
      window.dataId=data[0].id;
  });

    $('.btn_submit').on('tap',function () {

        var $recipients=$('[name=recipients]').val();
        var $postCode=$('[name=postCode]').val();
        var $address=$('[name=address]').val();
        var $addressDetail=$('[name=addressDetail]').val();
        var item={
            id: window.dataId,
            recipients: $recipients,
            postCode: $postCode,
            address: $address,
            addressDetail: $addressDetail
        };
        console.log(item);
        editAddress(item,function (data) {
            if(data.success){
                mui.toast('修改成功');
                setTimeout('location.href=ltl.usertUrl',1500);
            }else{
                mui.toast('修改失败');
            }
        });

    });

});





var getAddress=function (callback) {
    ltl.loginAjax({
        url:'/address/queryAddress',
        type:'get',
        data:{
        },
        dataType:'json',
        success:function (data) {
            callback&&callback(data)
        }
    })
};

var editAddress=function (item,callback) {
    ltl.loginAjax({
        url:'/address/updateAddress',
        type:'post',
        data:item,
        dataType:'json',
        success:function (data) {
            callback&&callback(data)
        }
    })
};