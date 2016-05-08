<?php
/*
	if(!isset($_POST['date1'])){
		echo "<p style=\"text-align:center;padding-top:45vh;color:#ee0000;font-size:2em\">ไม่สามารถแสดงรายงานออกมาได้</p>";
		exit();
	}
*/
	global $_USERS;
	global $_DICT;
	   
    require_once  'filters.php';
    
    $date1='';
    $type_id=null;    
    if(isset($_POST['date1'])){
    	$date1=$_POST['date1'];
    }
    $date2='';
    if(isset($_POST['date2'])){
    	$date2=$_POST['date2'];
		if($date2==$date1){
			$date2='';
		}
    }
    $orm=NotORM::getInstance();
    $dt1=null;
    if($date1){
    	$dt1=$orm->date_info($date1);
    }
    $dt2=null;
    if($date2){
    	$dt2=$orm->date_info($date2);
    }
	$us=$orm->users()->select('id','name')->toArray();
	$_USERS=array();
	foreach($us as $it){
	$_USERS[$it['id']]=$it['name'];
	}

	$us=$orm->at()->select('id','name')->toArray();
	$_DICT=array();
	foreach($us as $it){
	$_DICT['at'][$it['id']]=$it['name'];
	}	

	$us=$orm->result()->select('id','name')->toArray();
	foreach($us as $it){
	$_DICT['result'][$it['id']]=$it['name'];
	}

	$usr=$_SESSION['user'];
	$atid=$orm->at()->select('id')->where('copyied',1);
          $r=$orm->cases()->where('user_id', $usr['id'])->where('(date_received4  is null) or (number_received4  is null) or (date_received4 =?) or (number_received4=?)','','')->where('command_id',$atid);
          $r->order('date_sent desc, id desc');
	
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
    $html= $twig->render('court_report4.html', array('report_name'=>'รายงาน','date1'=>$date1,   'date2'=>$date2, 'type_id'=>$type_id, 'type_item'=>$atype,  'cases'=>$cases, 'user'=> $_SESSION['user']));
	printPdf($html);
	//echo $html;