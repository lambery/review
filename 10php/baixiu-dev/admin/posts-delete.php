<?php

   require_once '../functions.php';

   if (empty($_GET['id'])) {
   	 exit('缺少必要参数');
   }

    $id =(int)$_GET['id']; 

    xiu_execute('delete from posts where id in ('.$id.');');



   // header('location: /admin/posts.php');
   // http中的referer用来标识当前请求的来源
   header('location: '.$_SERVER['HTTP_REFERER']);  //删除后页面不跳转