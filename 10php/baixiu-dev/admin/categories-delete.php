<?php

   require_once '../functions.php';

   if (empty($_GET['id'])) {
   	 exit('缺少必要参数');
   }

    $id =(int)$_GET['id']; 

    xiu_execute('delete from categories where id in ('.$id.');');



   header('location: /admin/categories.php');
