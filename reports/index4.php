<?php

	if(!isset($_POST['date1'])){
		echo "<p style=\"text-align:center;padding-top:45vh;color:#ee0000;font-size:2em\">ไม่สามารถแสดงรายงานออกมาได้</p>";
		exit();
	}
	
	global $_USERS;
	
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
    $type_id=null;    
    if(isset($_POST['date1'])){
    	$date1=$_POST['date1'];
    }
    
    $orm=NotORM::getInstance();
    $dt1=$orm->date_info($date1);
	$us=$orm->users()->select('id','name')->toArray();
	$_USERS=array();
	foreach($us as $it){
	$_USERS[$it['id']]=$it['name'];
	}

	$cases=$orm->cases()->order('id asc')->where('date_received3',$date1)->where('auto_received_num!=?','')->toArray();
    echo $twig->render('report4.html', array('date1'=>$date1,   'cases'=>$cases));
