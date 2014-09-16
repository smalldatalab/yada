<?php
	require('dbManage/db_Connect.php');
	
	function user_validate($email, $password) {
			
		$usrTable = db_Connect();
		$flag = $usrTable -> query("select * from userTable where email = '".$email."' and password = sha1('".$password."')");
			
		if (!$flag) {
			throw new Exception('Database Error, Please try it later!');
		}

		if ($flag -> num_rows <= 0) {
			throw new Exception('Log in Failed, Please try it later!');
		}
		
	}	
?>
