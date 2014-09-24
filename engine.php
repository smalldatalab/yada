<?php
	
require_once('dbManage/picInfoAPI.php');

function calories_statistic($gameInfo){
	
	$game_image_number = $gameInfo -> num_rows;
	$total_calories = 0;
	$food_name = array();
	$calories_percentage = array();
	$calories = array();
	$calories_exercise = array();
	
	for($i = 1; $i <= $game_image_number; $i++){
		$row = $gameInfo -> fetch_assoc();
		if ($row["choice"] != 3){
			if ($row["choice"] == 1){
				//file_put_contents('a.txt', intval($row["firstPic"]));
				$re = get_nutrition(intval($row["firstPic"]));
				$nutrition =  $re -> fetch_assoc();
			} else {
				$re = get_nutrition(intval($row["secondPic"]));
				$nutrition = $re -> fetch_assoc();
			}
			
			array_push($food_name, $nutrition["description"]);
			array_push($calories, $nutrition["kcal"]);
			array_push($calories_exercise, round($nutrition["kcal"]/112.5, 2));
			$total_calories = $total_calories + $nutrition["kcal"];
			
		}
	}
	
	if($total_calories != 0){
		for($i = 1; $i <= count($food_name); $i++){
			$percentage = array();
			$percentage[0] = $food_name[$i - 1];
			$percentage[1] = $calories[$i - 1]*100 / $total_calories;
			
			array_push($calories_percentage, $percentage);
		}
	}
	
	$result = array();
	$result["total_calories"] = $total_calories;
	$result["food_name"] = $food_name;
	$result["calories_percentage"] = $calories_percentage;
	$result["calories"] = $calories;
	$result["calories_exercise"] = $calories_exercise;
	
	return $result;
	
}
?>