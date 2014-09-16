<?php

require('dbManage/db_Connect.php');

function checkValue($sub_form){
	
	foreach ($sub_form as $key => $value) {
		if(!isset($key) || $value == ''){
			return false;
		}
	}

	return true;
}

function user_register($form) {
	
	$email = $form['email'];
	$password = $form['pwd'];
	$passwordConfirm = $form['pwdconfirm'];
	
	if(!checkValue($form)){
		throw new Exception('Registration Form is not filled properly!');
	}
		
	if(strcmp($password, $passwordConfirm) != 0){
		throw new Exception('Password not Match!');
	}

	if(strlen($password) < 6 || strlen($password) > 16){
		throw new Exception('Illeagle Password!');
	}
	
	if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
		throw new Exception('Illeagle Email Address!');
	}

	$db = db_Connect();
	$flag = $db -> query("select * from userTable where email = '".$email."'");
	
	if(!$flag){
		throw new Exception("Database Error!");
	}

	if($flag -> num_rows > 0){
		throw new Exception("Exist Email, Please Choose another one!");
	}

	$flag = $db -> query("insert into userTable values ('".$email."', sha1('".$password."'))");

	if(!$flag){
		throw new Exception("Database Insert Error!");
	}

}

?>
