$(function () {
  var render = function () {
    getAddTopCategoryPaging(function (data) {
      $('tbody').html(template('template',data));
      //console.log(data);

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
    });
  };
  render();
  
 $('[id="addBtn"]').on('click',function () {
   $('#addModal').modal('show');
   $('[type="submit"]').on('click', function (e) {
     e.preventDefault();
     var name = $('[name="categoryName"]').val();
     //console.log(name);
     $.post('/category/addTopCategory',{categoryName: name},function (data) {
       if (data.success) {
         //console.log('yes');
         $('#addModal').modal('hide');
         location.reload();
       }
     });
   })
 });

// addTopCategory(function (data) {
//
// })
//
});

var getAddTopCategoryPaging = function (callback) {
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategoryPaging',
    data:{
      page: window.page || 1,
      pageSize: 2
    },
    dataType: 'json',
    success: function (data) {
      callback && callback(data);
    }
  })
};

// var addTopCategory = function (callback) {
//   $.ajax({
//     type: 'post',
//     url: '/category/addTopCategory',
//    data: {categoryName: name},
//    success: function (data) {
//       callback && callback(data);
//     }
//   })
// };