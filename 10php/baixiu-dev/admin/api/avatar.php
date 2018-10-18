<?php
  require_once '../../config.php';

if (empty($_GET['youxiang'])) {
	exit('缺少必要参数');
};
$email=$_GET['youxiang'];

$conn=mysqli_connect(BAIXIU_DB_HOST, BAIXIU_DB_USER, BAIXIU_DB_PASS, BAIXIU_DB_NAME);

if (!$conn) {
	exit('连接数据库失败');
}

$query=mysqli_query($conn, "select avatar from users where email = '{$email}' limit 1;");

if (!$query) {
	exit('查询失败');
}

$user=mysqli_fetch_assoc($query);
echo($user['avatar']);
// header('Access-control-Allow-Origin:*');

