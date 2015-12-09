<?php

	if(!isset($_POST['date1'])){
		echo "<p style=\"text-align:center;padding-top:45vh;color:#ee0000;font-size:2em\">ไม่สามารถแสดงรายงานออกมาได้</p>";
		exit();
	}
	
	global $_USERS;
	global $_GROUPS;
	global $_DICT;
   
    require_once   'filters.php';
    
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
	$user_id=0;  
    if(isset($_POST['user_id'])){
    	$user_id=intval($_POST['user_id']);
    }   
    $orm=NotORM::getInstance();
	$dt2=null;
    if($date2){
    	$dt2=$orm->date_info($date2);
    }
    $dt1=$orm->date_info($date1);
	$usr=null;
	if($user_id>0){
		$usr=$orm->users()->where('id', $user_id)->fetch();
	}

	$r=$orm->users()->select('id','name');
	if($usr) $r->where('id', $usr['id']);
	$us=$r->toArray();
	$_USERS=array();
	foreach($us as $it){
	$_USERS[$it['id']]=$it['name'];
	}



	$r=$orm->usergroups();
	if($usr) $r->where('id', $usr['usergroup_id']);
	$groups=$r->toArray();    
	$_GROUPS=array();
	foreach($groups as $r){
	    $_GROUPS[$r['id']]=$r['name'];
	}

	$courts=array();
	$cases=array();
	$r=$orm->users()->select('id,name,usergroup_id')->where('admin','0');
	if($usr) $r->where('id', $usr['id']);
	$rs2=$r->toArray();
	foreach($rs2 as $r){
		$courts[$r['usergroup_id']][]=$r;
	}

	$atype=array();
	$checked=$orm->at()->select('id')->where('checked',1);
	$r=$orm->cases()->order('id asc')->where('command_id',$checked)->where('auto_received_num!=?','');
	if($type_id>0){
		$r->where('type_id',$type_id);
		$t=$orm->types()->where('id',$type_id)->fetch();
		if($t){
			$atype=$t->toArray();
		}
	}
	$r->where('date_received3>=?',$dt1['begin']);
	if($dt2){
		$r->where('date_received3<?',$dt2['end']);
	}else{
		$r->where('date_received3<?',$dt1['end']);
	}



	$rs2=$r->toArray();
	foreach($rs2 as $r){
		$cases[$r['user_id']][]=$r;
	}
	$_DICT=$cases;

    $html= $twig->render('report5.html', array('report_name'=>'รายงาน','date1'=>$date1,'user_id'=>$user_id, 'date2'=>$date2, 'type_id'=>$type_id, 'type_item'=>$atype, 'groups'=>$groups, 'courts'=>$courts));
	printPdf($html);