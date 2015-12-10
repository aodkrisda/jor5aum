<?php
/*
$orm->users[1]
$orm->users(1)->fetch();
$orm->users('id',1)->fetch();
$orm->users()->where('id',1)->fetch();



*/



   
    require_once 'filters.php';
 
	   
    $orm=NotORM::getInstance();
	$orm->addPrimary('id','types');
	$orm->addRefence('type_id','types');


	
	$r=$orm->cases()->limit(1,0)->fetch();
	var_dump($r->toArray());
	var_dump($r->types['name']);
