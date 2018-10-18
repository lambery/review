<?php

require_once '../../functions.php';


$page=empty($_GET['page'])?1:intval($_GET['page']);

$length=2; //取几条
$offset=($page-1)*$length; //根据页码跳过几条

$sql=sprintf('select
 comments.*,
 posts.title as post_title
 from comments
 inner join posts on comments.post_id=posts.id
 order by comments.created desc
 limit %d, %d;', $offset, $length);

$comments=xiu_fetch($sql);

$total_count=xiu_fetch_one('select count(1) as count from comments 
	inner join posts on comments.post_id=posts.id;')['count'];
$total_pages=ceil($total_count/$length);
//只能传字符串，将数据转为字符串，用json传
// $json =json_encode($comments);
$json =json_encode(array(
    'total_pages'=>$total_pages,
    'comments'=>$comments,
));

header('Content-Type: application/json');

echo $json;