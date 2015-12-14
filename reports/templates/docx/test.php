<?php

   
    require_once 'filters.php';
	/*
	   
    $orm=NotORM::getInstance();
	$orm->addReference('users.usergroup_id','usergroups');
	
	$r=$orm->usergroups[1];
	var_dump($r->users()->toArray());

	$r=$orm->users[3];
	var_dump($r->usergroups->toArray());
	*/




$its=array();
for($i=1;$i<45;$i++){
$its[]=array('id'=>"Name $i",'name'=>"Queen $i",'field3'=>"Type of $i");
}

renderDocx('test.docx', array('report_name'=>'REPORT TITLE', 'report_date'=>'May 2015', 'items'=>$its));
