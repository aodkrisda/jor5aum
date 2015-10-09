<?php
function isAuth(){
	session_start();

	if(isset($_SESSION['user']) && isset($_SESSION['user']['id'])){
		return;
	}
	redirectUrl('login.php');
}

function isPost(){
    return (strtolower($_SERVER['REQUEST_METHOD'])=='post');
}

$__api=null;
function getApi(){
	global $__api;
	if(!$__api) $__api=new Informations();
	return $__api;
}

function getField($field,$escape=false){
	if($_POST && isset($_POST[$field])){
		if($escape){
			return htmlentities($_POST[$field]);
		}
		return $_POST[$field];
	}
	return '';
}

function redirectUrl($url){
	if($url){
		header(sprintf("Location: %s",$url));
		exit();
	}
}

?>