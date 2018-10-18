//后台管理公共js

//进度显示
NProgress.configure({ showSpinner: false });
$(window).ajaxStart(function () {
   NProgress.start();
});
$(window).ajaxComplete(function () {
    NProgress.done();
});

//侧边栏的显示隐藏和2级菜单的显示隐藏
$('[data-menu]').on('click',function () {
    $('.ad_aside').toggle();
    $('.ad_section').toggleClass('menu');
});
$('.menu [href="javascript:;"]').on('click',function () {
   $(this).siblings('.child').slideToggle();
});



//退出登陆
//插入模态框
var modalHtml='<!--退出的模态框-->'+
    '<div class="modal fade" id="logout">'+
    '    <div class="modal-dialog modal-sm">'+
    '    <div class="modal-content">'+
    '    <div class="modal-header">'+
    '    <button type="button" class="close" data-dismiss="modal" ><span >&times;</span></button>'+
    '<h4 class="modal-title">温馨提示</h4>'+
    '    </div>'+
    '    <div class="modal-body">'+
    '    <p>确认退出吗</p>'+
    '    </div>'+
    '    <div class="modal-footer">'+
    '    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
    '    <button type="button" class="btn btn-primary">确认</button>'+
    '    </div>'+
    '    </div><!-- /.modal-content -->'+
    '</div><!-- /.modal-dialog -->'+
    '</div><!-- /.modal -->';
$('body').append(modalHtml);

$('[data-logout]').on('click',function (e) {
    //模态框调用
    $('#logout').modal('show').find('.btn-primary').on('click',function () {

        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            data:'',
            dataType: 'json',
            success:function (data) {
                if(data.success==true){
                    $('#logout').modal('hide');
                    location.href='/MMMadmin/login.html';
                }else{

                }
            }
        });


    })
});




