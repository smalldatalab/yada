<?php

require_once('dbManage/db_Connect.php');

function item_store_permanent($email, $firstPic, $secondPic, $choice, $time) {
	
	$db = db_Connect();

	$flag = $db -> query("insert into userStatistic values ('".$email."', '".$firstPic."', '".$secondPic."', '".$choice."', '".$time."')");

	if(!$flag){
		throw new Exception("Database Insert Error!");
	}

	//mysql_close($db);
}

?>
