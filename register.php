<?php
	session_start();
	require('dbManage/user_register.php');
	
	try {
		user_register($_POST);
		$_SESSION['user'] = $_POST['email'];
		
		echo 'success';
        } catch(Exception $except) {
		echo $except -> getMessage();
	}
?>
