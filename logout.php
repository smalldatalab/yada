<?php
session_start();

if(isset($_SESSION['user'])){
	unset($_SESSION['user']);
	echo "success";
} else {
	echo "fail";
}

?>