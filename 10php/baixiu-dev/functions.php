<?php


//封装公用函数
//

session_start();

//安全性用
function baixiu_get_current_user(){
  if (empty($_SESSION['current_login_user'])) {
  	header('location: /admin/login.php');
  	exit();
  }
  return $_SESSION['current_login_user'];
}

//查用
function xiu_fetch($sql){
	$conn=mysqli_connect('localhost', 'root', '123456', 'demo');
	if (!$conn) {
		exit('连接失败');
	};
    
     $result=array();

	$query=mysqli_query($conn, $sql);
	if (!$query) {
		return false;
	}

	while ($row=mysqli_fetch_assoc($query)) {
		$result[]=$row;
	}

    // mysqli_free_result($query);
    // mysqli_close($conn);

	return $result;
}

//查一条用
function xiu_fetch_one($sql){
	$res=xiu_fetch($sql);
	return isset($res[0]) ? $res[0] : null;
}


//增删改用
function xiu_execute($sql){
	$conn=mysqli_connect('localhost', 'root', '123456', 'demo');
	if (!$conn) {
		exit('连接失败');
	};

	$query=mysqli_query($conn, $sql);
	if (!$query) {
		return false;
	}
    
    $affected_rows=mysqli_affected_rows($conn);


    // mysqli_close($conn);

	return $affected_rows;   
}
