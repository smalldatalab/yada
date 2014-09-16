<?php
	session_start();
	require('dbManage/user_validate.php');
	
	try {
		user_validate($_POST['email'], $_POST['pwd']);
		$_SESSION['user'] = $_POST['email'];
		
		echo 'success';
        } catch(Exception $except) {
		echo $except -> getMessage();
	}
?>