$(function () {
  var render = function () {
    queryUser(function (data) {
     // console.log(data);
      $('tbody').html(template('list',data));
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

  $('html').on('click','.btn-sm', function () {
    $('#optionModal').modal('show');
    var that = $(this);
    $('.modal-footer .btn-primary').on('click',function (e) {
      e.preventDefault();
      var params = {};
      var params1 = parseInt(that.attr('data-id'));
      params['data-id'] = params1;
      var params2 = parseInt(that.attr('data-isDelete'));
      params['data-isDelete'] = params2;
     // console.log(params);
      updateUser(params,function (data) {
        if (data.success) {
          $('#optionModal').modal('hide');
          location.reload();
        } else {
          $('#optionModal').modal('hide');
          alert('修改失败，服务器繁忙');
        }
      });
    })
  })
});

var queryUser = function (callback) {
  $.ajax({
    type: 'get',
    url: '/user/queryUser',
    data: {
      page: window.page || 1,
      pageSize: 2
    },
    dataType: 'json',
    success: function (data) {
      callback && callback(data);
    }
  })
};

var updateUser = function (params,callback) {
  $.ajax({
    type: 'post',
    url: '/user/updateUser',
    data: params,
    dataType:'json',
    success: function (data) {
      callback && callback(data);
    }
  })
};