$(function () {
//    初始化检验插件
    $('#login').bootstrapValidator({
        //配置校验的不同状态下显示的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //需要校验的表单元素 通过名称name
        fields: {
            username: {
                //校验规则 按需写
                validators: {
                    notEmpty: {
                        message: '用户名不能为空呦'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空呦'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: '用户名只能在4-8个字符之间哦~'
                    },
                    callback:{
                        message:'不对耶，不对耶'
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
        $.ajax({
            type: 'post',
            url:'/employee/employeeLogin',
            data:$form3,
            dataType:'json',
            success:function (data) {
                if(data.success){
                    console.log('yes');
                    location.href='/MMMadmin/index.html';
                }else{
                    if(data.error==1000){
                        //设置用户名的表单状态为失败
                        //获取检验组件,并更改
                        //NOT_VALIDATED还没校验,VALIDATING校验中,INVALID失败,VALID成功
                        $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');

                    }else if(data.error==1001){
                        $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                    }
                }
            }
        })

    });








});
