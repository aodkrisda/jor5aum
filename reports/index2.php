<?php
/*
//$_POST['date1']='2015-01-01';
//$_POST['date2']='2015-02-01';
//$_POST['type_id']='4';
//$_POST['user_id']='14';
*/

	if(!(isset($_POST['date1']) && isset($_POST['user_id']))){
		echo "<p style=\"text-align:center;padding-top:45vh;color:#ee0000;font-size:2em\">ไม่สามารถแสดงรายงานออกมาได้</p>";
		exit();
	}
	
    $dir=__DIR__.'/';
    require_once ($dir. '../rest/NotORM/lib.php');
    require_once ($dir. '../rest/Twig/Autoloader.php');
    Twig_Autoloader::register();
    $orm=NotORM::getInstance();
    $loader = new Twig_Loader_Filesystem($dir.'/templates/');
    $twig = new Twig_Environment($loader, array(
        '__cache' => $dir.'/cache/',
    ));
    
    require_once $dir . 'filters.php';
    
    
    $lookups=$orm->at()->fetchPairs('id','name');
    $filter = new Twig_SimpleFilter('lookup_at', function ($id) use ($lookups) {
      if(isset($lookups[$id])){
        return $lookups[$id];
      }
      return '';
    });
    $twig->addFilter($filter);

    $date1='';
    $date2='';
    $user_id='';
    $type_id=null;    
    if(isset($_POST['date1'])){
    	$date1=$_POST['date1'];
    }
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
    
    $dt1=$orm->date_info($date1);
    $param=array($dt1['begin'], $dt1['end']);
    if($date2){
    	$dt2=$orm->date_info($date2);
    	$param[1]=$dt2['end'];
    }  
	$param2=$param;
	$param2[]=$user_id;

	$type_ids=array();
	if($type_id!==null){
		$type_ids[]=intval($type_id);
	}else{
		$sql="select distinct info_cases.type_id, info_types.name FROM info_cases inner join info_types on info_cases.type_id = info_types.id WHERE (info_cases.date_sent>=? AND info_cases.date_sent<? AND info_cases.user_id=?) ORDER BY info_types.group_id, info_types.name";
		$rs=$orm->execute($sql,$param2);

		if($rs){
			foreach($rs as $it){
				$type_ids[]=$it['type_id'];
			}
		}
	}
 
	$court=array();
	$sql="SELECT * FROM info_users where id=?";
	$rs=$orm->execute($sql,array($user_id));
	if(count($rs)){	
		$court=$rs[0];
	}

	$cases=array();
	foreach($type_ids as $type_id){
		$where='';
    
		if($type_id){
			$where=sprintf(' AND (type_id=%d) ', $type_id);
		}	
		$sql="select * FROM info_cases WHERE (date_sent>=? AND date_sent<? AND user_id=? {$where}) "; //GROUP BY user_id";

    	$dic=$orm->execute($sql,$param2);
	    $case_name='???';
	    if($type_id>0){
		    $rs2=$orm->execute("select info_types.id, info_types.name,info_groups.name as group_name FROM info_types left join info_groups on info_types.group_id=info_groups.id WHERE info_types.id=?",array($type_id));    
		    foreach($rs2 as &$r){
		   	  $case_name=$r['name'] . ' ('. $r['group_name'] . ')';
		      break;
		    }    
	    }
	    $cases[]=array('case_name'=>$case_name, 'case_items'=>$dic);

	}
  	    	    
    echo $twig->render(($date2)?'report2_2.html':'report2_1.html', array('date1'=>$date1, 'date2'=>$date2, 'user_id'=>$user_id, 'court'=>$court, 'cases'=>$cases, 'type_id'=> $type_id));

?>