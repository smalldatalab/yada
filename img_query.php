<?php
session_start();

require_once('dbManage/picInfoAPI.php');
require_once('dbManage/item_store_permanent.php');
require_once('dbManage/gameStatisticAPI.php');
require_once('engine.php');

function num_to_file($index){
	if($index < 10){
		return "000".$index;
	} else if ($index < 100){
		return "00".$index;
	} else {
		return "0".$index;
	}
}

function generate_temp_user(){
	
	$temp_number = rand(1, 100);
	
	while(user_exist_gameStatistic("temp_user_".$temp_number."@tempemail")){
		$temp_number = rand(1, 100);
	}
	
	return "temp_user_".$temp_number."@tempemail";
}

	$img_category = 1;
	$img_feedback = 1;
	$temp_entering = False;
	
	if(!isset($_SESSION['user'])){
		$user_name = generate_temp_user();
		$_SESSION['user'] = $user_name;
		$temp_entering = True;
	} else if(strpos($_SESSION['user'], 'temp_user_') === 0 && !isset($_POST['choice'])){
		unset($_SESSION['user']);
		$user_name = generate_temp_user();
		$_SESSION['user'] = $user_name;
		$temp_entering = True;
	}
	
	$food_pair = array();
	
	if(isset($_POST['choice'])){
			
		if(!$temp_entering){
			item_store_permanent($_SESSION['user'], $_POST['img_1'], $_POST['img_2'], $_POST['choice'], $_POST["time"]);
		}
		
		$gameInfo = item_store_game($_SESSION['user'], $_POST['img_1'], $_POST['img_2'], $_POST['choice'], $_POST['time']);
		$game_image_index = $gameInfo -> num_rows;
		
		if($game_image_index <= 10){
			$food_pair['previous_image_index'] = $game_image_index;
			
			if($_POST['choice'] == 1){
				$food_pair['previous_image_number'] = $_POST['img_1'];
			} else if ($_POST['choice'] == 2) {
				$food_pair['previous_image_number'] = $_POST['img_2'];
			} else {
				$food_pair['previous_image_number'] = 9999;
			}
		}
		
		if($game_image_index == 10){
			$img_feedback = 0;
			$statistic_result = calories_statistic($gameInfo);
			$food_pair = array_merge($food_pair, $statistic_result);
			clear_game($_SESSION['user']);
			
			if($temp_entering){
				unset($_SESSION['user']);
			}
			
		}
		
	} else {
		clear_game($_SESSION['user']);
		$food_pair['userid'] = $_SESSION['user'];
		
		if($temp_entering){
			$food_pair['temp'] = 1;
		} else {
			$food_pair['temp'] = 0;
		}
	}
	
	if(isset($_POST['category'])){
		$img_category = $_POST['category'];
	}
	
	if($img_feedback == 1){
		$img_list = list_image($img_category);
		$row_num = $img_list -> num_rows;
		$food_1 = rand(1, $row_num);
		$food_2 = rand(1, $row_num);
	
		while($food_2 == $food_1){
			$food_2 = rand(1, $row_num);
		}
	
		for($i = 1; $i <= $row_num; $i ++){
		
			$row = $img_list -> fetch_assoc();
			if($i == $food_1){
				$food_pair["first"] = num_to_file($row["picNum"]);
				$food_pair["description_1"] = $row["description"];
			} else if ($i == $food_2){
				$food_pair["second"] = num_to_file($row["picNum"]);
				$food_pair["description_2"] = $row["description"];
			}
		}
	}
	
	file_put_contents('a.txt', json_encode($food_pair));
	echo json_encode($food_pair);


?>