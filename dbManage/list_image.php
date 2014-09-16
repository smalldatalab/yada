<?php

require_once('dbManage/db_Connect.php');

function list_image($category){
	
	$db = db_Connect();
	$result = $db -> query("select picNum, description from picInfo where Category = '".$category."'");

	if(!$result){
		throw new Exception("Database Error!");
	}
	
	return $result;
}


?>
