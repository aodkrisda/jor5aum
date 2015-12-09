<?php
	global $_DICT;
	if(!isset($_POST['date1'])){
		echo "<p style=\"text-align:center;padding-top:45vh;color:#ee0000;font-size:2em\">ไม่สามารถแสดงรายงานออกมาได้</p>";
		exit();
	}
	
   
    require_once  'filters.php';
    
    $date1='';
    $type_id=0;    
	$user_id=0;
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
    if(isset($_POST['user_id'])){
    	$user_id=intval($_POST['user_id']);
    }   
	   
    $orm=NotORM::getInstance();
	$dt2=null;
    if($date2){
    	$dt2=$orm->date_info($date2);
    }
    $dt1=$orm->date_info($date1);

	$copyids=$orm->at()->select('id')->where('copyied',1);
	$r=$orm->cases()->order('id asc')->where('command_id',$copyids)->where('number_received4=?','')->where('((date_received4 is null) or (date_received4=?))','0000-00-00');
	$r->where('CURDATE()>DATE_ADD(date_ap,INTERVAL 15 DAY)');

	$r->where('date_case>=?',$dt1['begin']);
	$dt2=array('end'=>sprintf('%04s-%02s-%02s',$dt1['year']+1, $dt1['month'],$dt1['day']));
	if($dt2){
		$r->where('date_case<?',$dt2['end']);
	}else{
		$r->where('date_case<?',$dt1['end']);
	}
	if($type_id>0){
		$r->where('type_id',$type_id);
	}
	$dt2=null;
	$court=array();
	if($user_id>0){
		$r->where('user_id',$user_id);
		$t=$orm->users()->where('id',$user_id)->fetch();
		if($t){
			$court=$t->toArray();
		}
	}
	$types=$orm->types()->toArray();
	$groups=$orm->groups()->toArray();
	$gdic=array();
	foreach($groups as $i){
		$gdic[$i['id']]=$i['name'];
	}
	$_DICT=array();
	foreach ($types as &$i){
		if(isset($gdic[$i['group_id']])){
			$i['kwam']=$gdic[$i['group_id']];
		}
		$_DICT[$i['id']]=$i;
	}

	$cases=$r->toArray();

    $html= $twig->render('report7.html', array('report_name'=>'รายงาน','date1'=>$date1,  'date2'=>$date2, 'cases'=>$cases,'court'=>$court));
	printPdf($html);