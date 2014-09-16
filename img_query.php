<?php
session_start();

require('dbManage/list_image.php');
require('dbManage/item_store.php');

function num_to_file($index){
	if($index < 10){
		return "000".$index;
	} else if ($index < 100){
		return "00".$index;
	} else {
		return "0".$index;
	}
}

	$img_category = 1;
	
if(isset($_SESSION['user'])){
	
	if(isset($_POST['choice'])){
		//file_put_contents('a.txt', $_POST['time']);
		item_store($_SESSION['user'], $_POST['img_1'], $_POST['img_2'], $_POST['choice'], $_POST["time"]);
	}
	
	if(isset($_POST['category'])){
		$img_category = $_POST['category'];
	}
	
	$img_list = list_image($img_category);
	$row_num = $img_list -> num_rows;
	$food_1 = rand(1, $row_num);
	$food_2 = rand(1, $row_num);
	
	while($food_2 == $food_1){
		$food_2 = rand(1, $row_num);
	}
	
	$food_pair = array();
	
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
	
	echo json_encode($food_pair);
}

?>
