<?php
// at_correct=0

	if(!isset($_POST['date1'])){
		echo "<p style=\"text-align:center;padding-top:45vh;color:#ee0000;font-size:2em\">ไม่สามารถแสดงรายงานออกมาได้</p>";
		exit();
	}
	
	global $_USERS;
	global $_GROUPS;
	global $_DICT;
	global $_TOPICS;
   
    require_once  'filters.php';
    
    $date1='';
    $type_id=0;    
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
    if(isset($_POST['type_id'])){
    	$type_id=intval($_POST['type_id']);
    }   
    $orm=NotORM::getInstance();
	$dt2=null;
    if($date2){
    	$dt2=$orm->date_info($date2);
    }
    $dt1=$orm->date_info($date1);

	$us=$orm->users()->select('id','name')->toArray();
	$_USERS=array();
	$_TOPICS=array();
	$_AT_RESULTS=array();
	foreach($us as $it){
	$_USERS[$it['id']]=$it['name'];
	}
	$topics=$orm->topics()->toArray();
	$_DICT=array();
	foreach ($topics as &$i){
		$_TOPICS[$i['id']]=$i;
	}
	$topics=$orm->at_results()->toArray();
	foreach ($topics as &$i){
		$_AT_RESULTS[$i['id']]=$i;
	}

	$checked=$orm->at()->select('id')->where('checked',1);

	$cases=array();
	$r=$orm->cases()->where('auto_received_num!=?','')->where('at_correct',0)->where('command_id',$checked)->order('id asc');
	$r->where('date_received3>=?',$dt1['begin']);
	if($dt2){
		$r->where('date_received3<?',$dt2['end']);
	}else{
		$r->where('date_received3<?',$dt1['end']);
	}
	$cases=$r->toArray();
	/*
	foreach($cases as &$it){
			$it['date_ap']='2016-01-19';
			$it['date_at_received1']='016-01-05';
			$it['date_at_received2']='016-01-07';
			$it['date_at_received5']='016-01-08';
	}
	*/
    	$html= $twig->render('report12.html', array('report_name'=>'รายงาน','date1'=>$date1,  'date2'=>$date2,  'cases'=>$cases));
	printPdf($html,'L');