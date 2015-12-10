<?php

	if(!isset($_POST['date1'])){
		echo "<p style=\"text-align:center;padding-top:45vh;color:#ee0000;font-size:2em\">ไม่สามารถแสดงรายงานออกมาได้</p>";
		exit();
	}
	
	global $_USERS;
	   
    require_once  'filters.php';
    
    $date1='';
    $type_id=null;    
    if(isset($_POST['date1'])){
    	$date1=$_POST['date1'];
    }
    
    $orm=NotORM::getInstance();
    $dt1=$orm->date_info($date1);
	$us=$orm->users()->select('id','name')->toArray();
	$_USERS=array();
	foreach($us as $it){
	$_USERS[$it['id']]=$it['name'];
	}

	$r=$orm->cases()->order('auto_received_num asc')->where('date_received3',$date1)->where('auto_received_num!=?','');
	$type_id=0;
	$atype=array();
	if(isset($_POST['type_id'])){
		$type_id=intval($_POST['type_id']);
	}
	if($type_id>0){
		$code='zz';
		$t=$orm->types()->where('id',$type_id)->fetch();
		if($t){
			$atype=$t->toArray();
			$code=$atype['code'];
		}
		//$r->where('type_id', $type_id);
		$r->where("auto_received_num like '{$code}%'");
	}
	$cases=$r->toArray();
    $html= $twig->render('report4.html', array('report_name'=>'รายงาน','date1'=>$date1,  'type_id'=>$type_id, 'type_item'=>$atype,  'cases'=>$cases));
	printPdf($html);
	//echo $html;