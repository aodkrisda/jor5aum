<?php

	if(!isset($_POST['date1'])){
		echo "<p style=\"text-align:center;padding-top:45vh;color:#ee0000;font-size:2em\">ไม่สามารถแสดงรายงานออกมาได้</p>";
		exit();
	}
	require_once   'filters.php';


	global $_USERS;
	global $_GROUPS;
	global $_DICT;
    
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
	foreach($us as $it){
	$_USERS[$it['id']]=$it['name'];
	}

	$groups=$orm->usergroups()->toArray();    
	$_GROUPS=array();
	foreach($groups as &$r){
	    $_GROUPS[$r['id']]=$r['name'];
	}

	$courts=array();
	$cases=array();
	$rs2=$orm->users()->select('id,name,usergroup_id')->where('admin','0')->toArray();
	foreach($rs2 as &$r){
		$courts[$r['usergroup_id']][]=$r;
		$cases[$r['id']]=array('total'=>0,'total_pang'=>0,'total_aya'=>0,'checked'=>0,'checked_pang'=>0,'checked_aya'=>0,'uchecked'=>0,'uchecked_pang'=>0,'uchecked_aya'=>0);
	}


	$checked=$orm->at()->select('id')->where('checked',1);
	$uchecked=$orm->at()->select('id')->where('checked!=1',1);

	$r=$orm->cases()->where('no_case_sent!=?',1);
	$atype=array();
	if($type_id>0){
		$r->where('type_id',$type_id);
		$t=$orm->types()->where('id',$type_id)->fetch();
		if($t){
			$atype=$t->toArray();
		}
	}
	$r->where('date_received>=?',$dt1['begin']);
	if($dt2){
		$r->where('date_received<?',$dt2['end']);
	}else{
		$r->where('date_received<?',$dt1['end']);
	}

	$tm=$orm->groups()->select('id')->where('name','ความแพ่ง');
	$type_pangs=$orm->types()->select('id')->where('group_id',$tm);

	$tm=$orm->groups()->select('id')->where('name','ความอาญา');
	$type_ayas=$orm->types()->select('id')->where('group_id',$tm);

	$tm=$r->push();
	$tm->select('user_id, count(id) as n')->group('user_id')->where('command_id',$checked);
	$tm=$tm->toArray();
	foreach($tm as &$it){
		if(isset($cases[$it['user_id']])){
			$cases[$it['user_id']]['checked']=intval($it['n']);
		}
	}

	$tm=$r->push();
	$tm->select('user_id, count(id) as n')->group('user_id')->where('command_id',$checked)->where('type_id',$type_pangs);;
	$tm=$tm->toArray();
	foreach($tm as &$it){
		if(isset($cases[$it['user_id']])){
			$cases[$it['user_id']]['checked_pang']=intval($it['n']);
		}
	}

	$tm=$r->push();
	$tm->select('user_id, count(id) as n')->group('user_id')->where('command_id',$checked)->where('type_id',$type_ayas);;
	$tm=$tm->toArray();
	foreach($tm as &$it){
		if(isset($cases[$it['user_id']])){
			$cases[$it['user_id']]['checked_aya']=intval($it['n']);
		}
	}

	$tm=$r->push();
	$tm->order('')->select('')->select('user_id, count(id) as n')->group('user_id')->where('command_id',$uchecked);
	$tm=$tm->toArray();
	foreach($tm as &$it){
		if(isset($cases[$it['user_id']])){
			$cases[$it['user_id']]['uchecked']=intval($it['n']);
		}
	}

	$tm=$r->push();
	$tm->order('')->select('')->select('user_id, count(id) as n')->group('user_id')->where('command_id',$uchecked)->where('type_id',$type_pangs);
	$tm=$tm->toArray();

	foreach($tm as &$it){
		if(isset($cases[$it['user_id']])){
			$cases[$it['user_id']]['uchecked_pang']=intval($it['n']);
		}
	}

	$tm=$r->push();
	$tm->order('')->select('')->select('user_id, count(id) as n')->group('user_id')->where('command_id',$uchecked)->where('type_id',$type_ayas);
	$tm=$tm->toArray();
	foreach($tm as &$it){
		if(isset($cases[$it['user_id']])){
			$cases[$it['user_id']]['uchecked_aya']=intval($it['n']);
		}
	}


	$tm=$r->push();
	$tm->select('user_id, count(id) as n')->group('user_id')->where('type_id',$type_pangs);
	$tm=$tm->toArray();
	foreach($tm as &$it){
		if(isset($cases[$it['user_id']])){
			$cases[$it['user_id']]['total_pang']=intval($it['n']);
		}
	}

	$tm=$r->push();
	$tm->select('user_id, count(id) as n')->group('user_id')->where('type_id',$type_ayas);
	$tm=$tm->toArray();
	foreach($tm as &$it){
		if(isset($cases[$it['user_id']])){
			$cases[$it['user_id']]['total_aya']=intval($it['n']);
		}
	}

	$tm=$r->select('user_id, count(id) as n')->group('user_id')->toArray();
	foreach($tm as &$it){
		if(isset($cases[$it['user_id']])){
			$cases[$it['user_id']]['total']=intval($it['n']);
		}
	}


	$_DICT=$cases;

    $html= $twig->render('report1.html', array('report_name'=>'รายงาน','date1'=>$date1,  'date2'=>$date2, 'type_id'=>$type_id, 'type_item'=>$atype, 'groups'=>$groups, 'courts'=>$courts));
	printPdf($html);

	