<?php

	global $_DICT;

	if(!isset($_POST['date1'])){
		echo "<p style=\"text-align:center;padding-top:45vh;color:#ee0000;font-size:2em\">ไม่สามารถแสดงรายงานออกมาได้</p>";
		exit();
	}
   
    require_once 'filters.php';
    
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
    if(isset($_POST['user_id'])){
    	$user_id=intval($_POST['user_id']);
    }   
	   
    $orm=NotORM::getInstance();
	$dt2=null;
    if($date2){
    	$dt2=$orm->date_info($date2);
    }
    $dt1=$orm->date_info($date1);

	$r=$orm->cases()->where('topic_ids!=?','');
	$r->where('date_case>=?',$dt1['begin']);
	$r->where('date_case<?',$dt1['end']);

	$court=array();
	if($user_id>0){
		$r->where('user_id',$user_id);
		$t=$orm->users()->where('id',$user_id)->fetch();
		if($t){
			$court=$t->toArray();
		}
	}

	$count=array();
	foreach($r as $row){
		$str=$row['topic_ids'];
		if($str){
			try{
				$a=json_decode($str);
				if(is_array($a)){
					foreach($a as $b){
						if(!isset($count[$b])){
							$count[$b]=0;
						}
						$count[$b]++;
					}
				}
			} catch (Exception $e) {}
		}
	}
	$n=count($r);
	$countids=array();
	foreach($count as $a=>$b){
		$countids[]=array('topic_id'=>$a, 'total'=>$b);
	}
	function my_sort($a,$b) {
	if ($a['total']==$b['total']) return 0;
		return ($a['total']>$b['total'])?-1:1;
	}

	usort($countids,"my_sort");

	$topics=$orm->topics()->toArray();
	$_DICT=array();
	foreach ($topics as &$i){
		$_DICT[$i['id']]=$i;
	}

	$cases=$r->toArray();
    $html= $twig->render('report9.html', array('report_name'=>'รายงาน','date1'=>$date1, 'count'=>$n, 'topicids'=>$countids,'court'=>$court));
		printPdf($html);