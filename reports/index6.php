<?php

	if(!isset($_POST['date1'])){
		echo "<p style=\"text-align:center;padding-top:45vh;color:#ee0000;font-size:2em\">ไม่สามารถแสดงรายงานออกมาได้</p>";
		exit();
	}
	
	global $_USERS;
	global $_GROUPS;
	global $_DICT;

    $dir=__DIR__.'/';
    require_once ($dir. '../rest/NotORM/lib.php');
    require_once ($dir. '../rest/Twig/Autoloader.php');
    Twig_Autoloader::register();
    $loader = new Twig_Loader_Filesystem($dir.'/templates/');
    $twig = new Twig_Environment($loader, array(
        '__cache' => $dir.'/cache/',
    ));
    
    require_once $dir . 'filters.php';
    
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
		$cases[$r['id']]=array('total'=>0,'pang'=>0,'aya'=>0,'reg'=>0,'ireg'=>0);
	}


	$checked=$orm->at()->select('id')->where('checked',1);
	$r=$orm->cases()->order('id asc')->where('command_id',$checked)->where('auto_received_num!=?','');
	$r->where('date_received3>=?',$dt1['begin']);
	if($dt2){
		$r->where('date_received3<?',$dt2['end']);
	}else{
		$r->where('date_received3<?',$dt1['end']);
	}
	$tm=$r->push();
	$tm->order('')->select('')->select('user_id, count(id) as n')->group('user_id');
	$tm=$tm->toArray();
	foreach($tm as &$it){
		if(isset($cases[$it['user_id']])){
			$cases[$it['user_id']]['total']=intval($it['n']);
		}
	}
	
	$pangids=$orm->types()->select('id')->where('group_id',$orm->groups()->where('name','ความแพ่ง'));
	$ayaids=$orm->types()->select('id')->where('group_id',$orm->groups()->where('name','ความอาญา'));

	$tm=$r->push();
	$tm->where('type_id',$pangids)->order('')->select('')->select('user_id, count(id) as n')->group('user_id');
	$tm=$tm->toArray();
	foreach($tm as &$it){
		if(isset($cases[$it['user_id']])){
			$cases[$it['user_id']]['pang']=intval($it['n']);
		}
	}

	$tm=$r->push();
	$tm->where('type_id',$ayaids)->order('')->select('')->select('user_id, count(id) as n')->group('user_id');
	$tm=$tm->toArray();
	foreach($tm as &$it){
		if(isset($cases[$it['user_id']])){
			$cases[$it['user_id']]['aya']=intval($it['n']);
		}
	}

	$tm=$r->push();
	$tm->where('date_received3 is not null')->where('date_ap is not null')->where('DATEDIFF(date_ap,date_received3)>=15')->order('')->select('')->select('user_id, count(id) as n')->group('user_id');
	$tm=$tm->toArray();
	foreach($tm as &$it){
		if(isset($cases[$it['user_id']])){
			$cases[$it['user_id']]['reg']=intval($it['n']);
		}
	}

	$tm=$r->push();
	$tm->where('date_received3 is not null')->where('date_ap is not null')->where('DATEDIFF(date_ap,date_received3)<15')->order('')->select('')->select('user_id, count(id) as n')->group('user_id');
	$tm=$tm->toArray();
	foreach($tm as &$it){
		if(isset($cases[$it['user_id']])){
			$cases[$it['user_id']]['ireg']=intval($it['n']);
		}
	}
	$_DICT=$cases;
    echo $twig->render('report6.html', array('date1'=>$date1,  'date2'=>$date2,  'groups'=>$groups, 'courts'=>$courts));
