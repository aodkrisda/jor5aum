<?php


$_POST['date1']='2015-01-01';
$_POST['date2']='2015-02-01';
$_POST['type_id']='4';

	if(!isset($_POST['date1'])){
		echo "<p style=\"text-align:center;padding-top:45vh;color:#ee0000;font-size:2em\">ไม่สามารถแสดงรายงานออกมาได้</p>";
		exit();
	}
	
	global $_GROUPS;
	
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
    $date2='';
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
    

    
    $orm=NotORM::getInstance();
    $dt1=$orm->date_info($date1);

    $param=array($dt1['begin'], $dt1['end']);
    if($date2){
    	$dt2=$orm->date_info($date2);
    	$param[1]=$dt2['end'];
    }    

	$type_ids=array();
	if($type_id!==null){
		$type_ids[]=intval($type_id);
	}else{
		$sql="select distinct info_cases.type_id, info_types.name FROM info_cases inner join info_types on info_cases.type_id = info_types.id WHERE (info_cases.no_case_sent!=1) AND (info_cases.date_received>=? AND info_cases.date_received<?) ORDER BY info_types.group_id, info_types.name";
		//echo $sql ."\r\n";
		$rs=$orm->execute($sql,$param);
		if($rs){
			foreach($rs as $it){
				$type_ids[]=$it['type_id'];
			}
		}
	}
  $t=$orm->at()->select('id')->where('checked',1)->toArray();
  $checked_ids=array();
  foreach($t as $i){
    $checked_ids[]=$i['id'];
  }
  if(empty($checked_ids))$checked_ids[]=-1;
  $param2=$param;
  $checked_ids=implode(', ',$checked_ids);
  
	$cases=array();
	foreach($type_ids as $type_id){
		$where='';
		if($type_id){
			$where=sprintf(' AND (type_id=%d) ', $type_id);
		}
		
		$sql="select user_id, count(id) as 'total' FROM info_cases WHERE (no_case_sent!=1) AND (date_received>=? AND date_received<?) {$where} GROUP BY user_id";
		  //echo $sql ."\r\n";

	    $xrs=$orm->execute($sql,$param);
      $drs=array();
      foreach($xrs as &$r){
        $drs[$r['user_id']]=$r;
      }
   
      $rs=array();
	    $sql="select id, name, usergroup_id FROM info_users WHERE admin=0 and parent_id=0 ORDER BY usergroup_id, id";
	    //echo $sql ."\r\n";
	
	    $rs2=$orm->execute($sql);    
	    $dic2=array();
	    foreach($rs2 as &$r){
	      $dic2[$r['id']]=$r;
        $total=0;
        if(isset($drs[$r['id']])){
          $total=$drs[$r['id']]['total'];
        }
        $tm=array('user_id'=>$r['id'], 'total'=>$total);
        $rs[]=$tm;
	    }
      

	    $sql="select user_id, count(id) as 'check'  FROM info_cases WHERE (no_case_sent!=1) AND (date_received>=? AND date_received<? AND command_id in ({$checked_ids})) {$where} GROUP BY user_id";
	    //echo $sql ."\r\n";

	    $rs2=$orm->execute($sql,$param);    
	    $dic=array();
	    foreach($rs2 as &$r){
	      $dic[$r['user_id']]=$r['check'];
	    }

	    
	    $rs2=$orm->execute("select id,name  FROM info_usergroups");    
	    $_GROUPS=array();
	    foreach($rs2 as &$r){
	      $_GROUPS[$r['id']]=$r['name'];
	    }
	    

	    
	    foreach($rs as &$r){
	      if(isset($dic[$r['user_id']])){
	        $r['check']=$dic[$r['user_id']];
	      }else{
	       $r['check']='0';
	      }
	      if(isset($dic2[$r['user_id']])){
	        $r['name']=$dic2[$r['user_id']]['name'];
	        $r['group']=$dic2[$r['user_id']]['usergroup_id'];
	      }
	    }
      
	    $dic=array();
	    foreach($rs as &$r){
	      if(isset($r['group'])){
	        $dic[$r['group']]['group']=$r['group'];
	        $dic[$r['group']]['courts'][]=$r;
	      }
	    }
	    
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
    
    $html=$twig->render(($date2)?'report1_2.html':'report1_1.html', array('date1'=>$date1, 'date2'=>$date2,'type_id'=>$type_id,  'cases'=>$cases));


		require_once('mpdf/mpdf.php');

		$pdf = new mPDF('th', 'A4-P', '0');

		$pdf->SetDisplayMode('fullpage');

		$pdf->WriteHTML($html, 2);

		$pdf->Output();


