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
	}


	$checked=$orm->at()->select('id')->where('checked',1);
	$uchecked=$orm->at()->select('id')->where('checked!=1',1);

	$r=$orm->cases()->where('no_case_sent!=?',1);
	
	$atype=array();
	$court=array();
	if($user_id>0){
		$r->where('user_id',$user_id);
		$t=$orm->users()->where('id',$user_id)->fetch();
		if($t){
			$court=$t->toArray();
		}
	}

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

	$tm=$r->push();
	$tm->select('count(id) as n')->where('command_id',$checked);
	$tm=$tm->fetch();
	$t_checked=0;
	if($tm){
		$t_checked=intval($tm['n']);
	}

	$tm=$r->push();
	$tm->select('count(id) as n')->where('command_id',$uchecked);
	$tm=$tm->fetch();
	$t_uchecked=0;
	if($tm){
		$t_uchecked=intval($tm['n']);
	}

	$cases=$r->toArray();
    $lookups=$orm->at()->fetchPairs('id','name');
    $filter = new Twig_SimpleFilter('lookup_at', function ($id) use ($lookups) {
      if(isset($lookups[$id])){
        return $lookups[$id];
      }
      return '';
    });
    $twig->addFilter($filter);

    $html=$twig->render('report2.html', array('report_name'=>'รายงาน','date1'=>$date1,  'date2'=>$date2, 'type_id'=>$type_id,'court'=>$court, 't_checked'=>$t_checked, 't_uchecked'=>$t_uchecked, 'type_item'=>$atype, 'user_id'=>$user_id, 'cases'=>$cases, 'groups'=>$groups, 'courts'=>$courts));
	printPdf($html);
