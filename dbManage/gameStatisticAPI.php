<?php

require_once('dbManage/db_Connect.php');

function item_store_game($email, $firstPic, $secondPic, $choice, $time) {
	
	$db = db_Connect();

	$flag = $db -> query("insert into gameStatistic values ('".$email."', '".$firstPic."', '".$secondPic."', '".$choice."', '".$time."')");
	
	$gameImgInfo = $db -> query("select choice, firstPic, secondPic from gameStatistic where email = '".$email."'");

	if(!$flag){
		throw new Exception("Database Insert Error!");
	}

	return $gameImgInfo;
	//mysql_close($db);
}

function user_exist_gameStatistic($email){
	
	$db = db_Connect();
	
	$user_info = $db -> query("select choice from gameStatistic where email = '".$email."'");
	
	if(!$user_info){
		throw new Exception("Database Insert Error!");
	}
	
	if($user_info -> num_rows > 0){
		return True;
	} else{
		return False;
	}
}

function clear_game($email){
	
	$db = db_Connect();
	
	$flag = $db -> query("delete from gameStatistic where email = '".$email."'");
	
	if (!$flag){
		throw new Exception("Database Error!");
	}
	
}

?>
