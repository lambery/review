<?php

   require_once '../../functions.php';

   if (empty($_GET['id'])) {
   	 exit('缺少必要参数');
   }

    $id =(int)$_GET['id']; 

    $rows=xiu_execute('delete from comments where id in ('.$id.');');

header('Content-Type: application/json');

   echo json_encode($rows>0); //'true'||'false'

   //header('location: /admin/comments.php');