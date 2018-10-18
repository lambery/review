<?php 

   require_once '../functions.php';

   baixiu_get_current_user();////安全性用

   
  //接受筛选参数
  //分类筛选
  $where='1=1';

  $search='';

  if (isset($_GET['category'])&&$_GET['category']!=='all') {
    $where.=' and posts.category_id = '. $_GET['category'];
    $search.='&category='.$_GET['category'];
  }
  //状态筛选
  if (isset($_GET['status'])&&$_GET['status']!=='all') {
    $where.=" and posts.status = '{$_GET['status']}'";
    $search.='&status='.$_GET['status'];
  }
  
  //$where=>"1=1 and posts.category_id=1 and and posts.status = 'published'"
   //$search=>'&category=1&status=published'


  //处理分页参数
  $size = 1;//取多少数据(一个页面放多少)
  $page = empty($_GET['page']) ? 1 : (int)$_GET['page'];

  if ($page<1) {
    header('location:/admin/posts.php?page=1' . $search);//跳到第一页
  }

  $total_count=(int)xiu_fetch_one("select count(1) as num from posts
  inner join categories on posts.category_id = categories.id
  inner join users on posts.user_id = users.id
  where {$where};")['num'];
  $total_pages=(int)ceil($total_count/$size);

  $offset = ($page-1)*$size;//数据库越过多少条取数据

  if ($page>$total_pages) {
    header('location:/admin/posts.php?page='.$total_pages . $search);//跳到最后页
  }


 
   //查询全部
   $posts=xiu_fetch("select
  posts.id,
  posts.title,
  users.nickname as user_name,
  categories.name as category_name,
  posts.created,
  posts.status
from posts
inner join categories on posts.category_id = categories.id
inner join users on posts.user_id = users.id
where {$where}
order by posts.created desc
limit {$offset}, {$size}");
    
//查询分类数据
//
   $categories=xiu_fetch('select * from categories;');
  //处理分页页码
  //
  //最大页数
  //  $total_count=(int)xiu_fetch_one('select count(1) as num from posts;')['num'];//int把字符串转数字
  //  $total_pages=(int)ceil($total_count/$size);//ceil向上取整
  //  //=>9
  //  
  //  //计算页码开始
  //  $visiables=5;
  //  $region=($visiables-1)/2;//左右区间
  //    //=>2
  //  $begin=$page-$region;//开始页码,
  //    //=>3(假设page是5)
  //  $end=$begin+$visiables;//结束页码+1
  //    //=>8 // 

  //  if ($begin<1) {
  //     $begin=1;
  //     $end=$begin+$visiables;
  //  } // 
 // 

  //  if ($end>$total_pages+1) {
  //    $end=$total_pages+1;
  //    $begin=$end-$visiables;
  //    if ($begin<1) {
  //      $begin=1;
  //    }
  //  } // 
  $total_count=(int)xiu_fetch_one('select count(1) as num from posts;')['num'];
  $total_pages=(int)ceil($total_count/$size);
  $begin=$page-2;
  $end=$begin+4;
  $begin=$begin<1?1:$begin;
  $end=$begin+4;
  $end=$end>$total_pages?$total_pages:$end;
  $begin=$end-4;
  $begin=$begin<1?1:$begin;



   //处理数据格式转换
   function convert_status($status){
    $dict=array(
       'published'=>'已发布',
       'drafted'=>'草稿',
       'trashed'=>'回收站',
    );
    return isset($dict[$status])?$dict[$status]:'未知';
   }
   
   function convert_date($created){
    
    $timestap = strtotime($created);
    return date('Y年m月d日 <b\r> H:i:s', $timestap);
   } 


  // function get_category($category_id){
  //   $name=xiu_fetch_one("select name from categories where id = {$category_id}");
  //   return $name['name'];
  // }
//
  // function get_user($user_id){
  //   $nickname=xiu_fetch_one("select nickname from users where id = {$user_id}");
  //   return $nickname['nickname'];
  // }
 ?>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Posts &laquo; Admin</title>
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
        <h1>所有文章</h1>
        <a href="post-add.html" class="btn btn-primary btn-xs">写文章</a>
      </div>
      <!-- 有错误信息时展示 -->
      <!-- <div class="alert alert-danger">
        <strong>错误！</strong>发生XXX错误
      </div> -->
      <div class="page-action">
        <!-- show when multiple checked -->
        <a class="btn btn-danger btn-sm btn_delete" href="/admin/categories-delete.php" style="display: none">批量删除</a>
        <form class="form-inline" action="<?php echo $_SERVER['PHP_SELF'] ?>">

          <select name="category" class="form-control input-sm">
            <option value="all">所有分类</option>
            <?php foreach ($categories as $item): ?>
              <option value="<?php echo $item['id']; ?>" <?php echo isset($_GET['category'])&&$_GET['category']==$item['id']?'selected':'' ?>><?php echo $item['name']; ?></option>
            <?php endforeach ?>
          </select>

          <select name="status" class="form-control input-sm">
            <option value="all" >所有状态</option>
            <option value="drafted" <?php echo isset($_GET['status'])&&$_GET['status']==$item['id']?'selected':'' ?>>草稿</option>
            <option value="published" <?php echo isset($_GET['status'])&&$_GET['status']==$item['id']?'selected':'' ?>>已发布</option>
            <option value="trashed" <?php echo isset($_GET['status'])&&$_GET['status']==$item['id']?'selected':'' ?>>回收站</option>
          </select>
          <button class="btn btn-default btn-sm">筛选</button>
        </form>

        <ul class="pagination pagination-sm pull-right">
          <li class="lastpage"><a href="?page=<?php echo ($page-'1') ?>" class="first1">上一页</a></li>

             <?php for ($i=$begin; $i <= $end; $i++): ?> 
          <li <?php echo $i==$page?'class="active"':'' ?> ><a href="?page=<?php echo $i.$search ?>"><?php echo $i ?></a></li>
              <?php endfor ?>

          <li class="nextpage"><a href="?page=<?php echo ($page+'1') ?>" class="last1">下一页</a></li>
        </ul>

      </div>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th class="text-center" width="40"><input type="checkbox"></th>
            <th>标题</th>
            <th>作者</th>
            <th>分类</th>
            <th class="text-center">发表时间</th>
            <th class="text-center">状态</th>
            <th class="text-center" width="100">操作</th>
          </tr>
        </thead>
        <tbody>

          <?php foreach ($posts as $item): ?>
            <tr>
                <td class="text-center"><input type="checkbox" data-id="<?php echo $item['id']; ?>"></td>
                <td><?php echo $item['title'] ?></td>
<!--                 <td><?php //echo get_user($item['user_id']); ?></td>
                <td><?php //echo get_category($item['category_id']); ?></td> -->

                <td><?php echo $item['user_name']; ?></td>
                <td><?php echo $item['category_name']; ?></td>   
                <td class="text-center"><?php echo convert_date($item['created']); ?></td>
<!--                 <td class="text-center"><?php //echo $item['status']=='published' ? '已发布':'未发布' ?></td> -->
                <td class="text-center"><?php echo convert_status($item['status']); ?></td>
                <td class="text-center">
                  <a href="javascript:;" class="btn btn-default btn-xs">编辑</a>
                  <a href="/admin/posts-delete.php?id=<?php echo $item['id']; ?>" class="btn btn-danger btn-xs">删除</a>
                </td>
            </tr>
          <?php endforeach ?>

        </tbody>
      </table>
    </div>
  </div>
  

  <div style="display: none" class="totalpages"><?php echo $total_pages ?></div>


  <?php $current_page = 'posts'; ?>
  <?php include 'inc/sidebar.php'; ?>

  <script src="/static/assets/vendors/jquery/jquery.js"></script>
  <script src="/static/assets/vendors/bootstrap/js/bootstrap.js"></script>
  <script>NProgress.done()</script>
  <script>

     $(function ($){


         
          var $tbodyCheckboxs=$('tbody input'); 
          var $btnDelete=$('.btn_delete');

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
          
          //隐藏上下页
          var $first1=$('.first1').attr('href');
          if ($first1=='?page=0') {
              $('.lastpage').hide();
          };
          
         var $last1=($('.last1').attr('href')).substr(6);
         var $totalpages=parseInt($('.totalpages').text());
         if ($last1==($totalpages+1)) {
            $('.nextpage').hide();
         }

     });



  </script>
</body>
</html>
