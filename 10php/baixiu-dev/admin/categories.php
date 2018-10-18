<?php 
   
   require_once '../functions.php';

   baixiu_get_current_user();////安全性用


//修改更新
if (!empty($_GET['id'])) {

 $current_edit_category = xiu_fetch_one('select * from categories where id = ' . $_GET['id']);

 $edit_name=$current_edit_category['name'];
 $edit_slug=$current_edit_category['slug'];
 $edit_id=$current_edit_category['id'];

};


//添加
  function add_category(){
      if (empty($_POST['name'])||empty($_POST['slug'])) {
        $GLOBALS['message'] = '请填写数据';
        return;
      }
      
      $slug=$_POST['slug'];
      $name=$_POST['name'];

      $rows=xiu_execute("insert into categories values (null, '{$slug}', '{$name}');");
      
      $GLOBALS['message']=$rows<=0?'添加失败':'添加成功';

  };

  //只有进入编辑并保存时
   function edit_category(){
      
      
      global $edit_name;
      global $edit_slug;
      global $edit_id;


      // if (empty($_POST['name'])||empty($_POST['slug'])) {
      //   $GLOBALS['message'] = '请填写数据';
      //   return;
      // }
      
      $slug=empty($_POST['slug']) ? $edit_slug : $_POST['slug'];
      $edit_slug=$slug;

      $name=empty($_POST['name']) ? $edit_name : $_POST['name'];
      $edit_name=$name;

      $row2=xiu_execute("update categories set slug= '{$slug}', name= '{$name}' where id= {$edit_id}");
      
      $GLOBALS['message']=$row2<=0?'修改失败':'修改成功';

  };  


  //表单提交-添加和编辑讨论
  if ($_SERVER['REQUEST_METHOD']==='POST') {
    if (empty($_GET['id'])) {
      add_category();
    }else{
      edit_category();
    }
  };


//查询
   $categories=xiu_fetch('select * from categories;');
   

 ?>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Categories &laquo; Admin</title>
  <link rel="stylesheet" href="/static/assets/vendors/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="/static/assets/vendors/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="/static/assets/vendors/nprogress/nprogress.css">
  <link rel="stylesheet" href="/static/assets/css/admin.css">
  <script src="/static/assets/vendors/nprogress/nprogress.js"></script>
</head>
<body>
  <script>NProgress.start()</script>

  <div class="main">
    <?php include 'inc/navbar.php'; ?>

    <div class="container-fluid">
      <div class="page-title">
        <h1>分类目录</h1>
      </div>
      <!-- 有错误信息时展示 -->
      <?php if (isset($message)): ?>
      <div class="alert alert-danger">
        <strong><?php echo $message ?></strong>
      </div>
      <?php endif ?>

      <div class="row">
        <div class="col-md-4">
          <?php if (isset($current_edit_category)): ?>

          <form action="<?php echo $_SERVER['PHP_SELF']; ?>?id=<?php echo $edit_id ?>" method="post" >
            <h2>编辑《<?php echo $edit_name ?>》</h2>
            <div class="form-group">
              <label for="name">名称</label>
              <input id="name" class="form-control" name="name" type="text" placeholder="分类名称" value="<?php echo($edit_name) ?>">
            </div>
            <div class="form-group">
              <label for="slug">别名</label>
              <input id="slug" class="form-control" name="slug" type="text" placeholder="slug" value="<?php echo($edit_slug) ?>">
              <p class="help-block">https://xxxxx/category/<strong>slug</strong></p>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" type="submit">保存</button>
            </div>
          </form>

            <?php else: ?>
          
          <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" >
            <h2>添加新分类目录</h2>
            <div class="form-group">
              <label for="name">名称</label>
              <input id="name" class="form-control" name="name" type="text" placeholder="分类名称">
            </div>
            <div class="form-group">
              <label for="slug">别名</label>
              <input id="slug" class="form-control" name="slug" type="text" placeholder="slug">
              <p class="help-block">https://xxxxx/category/<strong>slug</strong></p>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" type="submit">添加</button>
            </div>
          </form>

          <?php endif ?>

        </div>
        <div class="col-md-8">
          <div class="page-action">
            <!-- show when multiple checked -->
            <a id="btn_delete" class="btn btn-danger btn-sm" href="/admin/categories-delete.php" style="display: none">批量删除</a>
          </div>
          <table class="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th class="text-center" width="40"><input type="checkbox" ></th>
                <th>名称</th>
                <th>Slug</th>
                <th class="text-center" width="100">操作</th>
              </tr>
            </thead>

            <tbody >

              <?php foreach ($categories as $data): ?>
                    <tr>
                    <td class="text-center"><input type="checkbox" data-id="<?php echo $data['id']; ?>"></td>
                    <td><?php echo $data['name'] ?></td> 
                    <td><?php echo $data['slug'] ?></td>
                    <td class="text-center">
                      <a href="/admin/categories.php?id=<?php echo $data['id']; ?>" class="btn btn-info btn-xs">编辑</a>
                      <a href="/admin/categories-delete.php?id=<?php echo $data['id']; ?>" class="btn btn-danger btn-xs">删除</a>
                    </td>
                   </tr>
              <?php endforeach ?>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <?php $current_page = 'categories'; ?>
  <?php include 'inc/sidebar.php'; ?>

  <script src="/static/assets/vendors/jquery/jquery.js"></script>
  <script src="/static/assets/vendors/bootstrap/js/bootstrap.js"></script>
  <script>NProgress.done()</script>

  <script>
    $(function ($) {

      // $('#thead').on('click', function(){
      //    $('#tbody input').prop('checked', $(this).prop('checked'));
      // });
      // 
      // 
 // var num11=$('#tbody input:checked').length;
 // $.get('categories-script.php',{},function(res){
 //       console.log(res);
 // });
 // console.log(num11);
      // if ($('#tbody input:checked').length == $('#tbody input').length) {
      //   $('#thead').prop('checked', true);
      // }else{
      //   $('#thead').prop('checked', false);
      // }

          var $tbodyCheckboxs=$('tbody input'); 
          var $btnDelete=$('#btn_delete');

          var allCheckeds=[];
          $tbodyCheckboxs.on('change', function(){

              var id=$(this).data('id');
   
              if ($(this).prop('checked')) {
                // allCheckeds.push($(this).attr('data-id'));
                allCheckeds.includes(id) || allCheckeds.push(id);
              }else{
                allCheckeds.splice(allCheckeds.indexOf(id), 1);
              }
               
               allCheckeds.length ? $btnDelete.fadeIn() : $btnDelete.fadeOut();
   
               // $btnDelete.attr('href', '/admin/categories-delete?id=' + allCheckeds);
               $btnDelete.prop('search', '?id=' + allCheckeds);   //添加批量删除id
          });


          //全选
          $('thead input').on('change', function(){
               var checked=$(this).prop('checked');
               $tbodyCheckboxs.prop('checked', checked).trigger('change');
              
          });

       // $tbodyCheckboxs.on('change', function(){
       //  var flag=false;
       //    $tbodyCheckboxs.each(function(i, item) {
       //      if ($(item).prop('checked')) {
       //        flag=true;
       //      }
       //    });

       //    flag ? $btnDelete.fadeIn() : $btnDelete.fadeOut();
       // })

    })
    

  </script>
</body>
</html>
