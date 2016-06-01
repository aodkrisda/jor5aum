<?php
/*
$whitelist_ips=array('::1'); //localhost
//$whitelist_ips[]='192.168.0.xxx';

//auto add ips
for ($i=2; $i<=253; $i++) {
	$whitelist_ips[]=sprintf('10.35.0.%d', $i);
}

// Filter Client IP Address
if(! in_array(clientIP(), $whitelist_ips)){
	header("HTTP/1.0 404 Not Found");
	exit();
}
*/

function clientIP(){
	$ip='';
	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
	    $ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
	    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
	    $ip = $_SERVER['REMOTE_ADDR'];
	}
	return $ip;	
}
function url($f){ 
	$v=filemtime(__DIR__.'/'. $f);
	if($v){
		$v='?v='.$v;
	}else{
		$v='';
	}
	return $f . $v;
}

?><!DOCTYPE html>
<html ng-app="App">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>สำนักศาลยุติธรรมประจำภาค ๕</title>
		<link rel="stylesheet" type="text/css" href="awesome/css/font-awesome.min.css">
	</head>

	<body id="body">
		<div ng-if="!API_URL" style="position:absolute;text-align:center;top:40%;width:100%;font-size:1.2em;"><i class="fa fa-spinner fa-spin fa-4x"></i><br/>กำลังโหลดข้อมูล<br/>โปรดรอสักครู่..</div>
		
		<div class="container-fluid main-navbar" >
		     <div class="main-navbar-mouse" ng-if="urlEq('/admin/menu') || urlEq('/court/menu')  || urlEq('/login')"></div>
		    <div class="main-navbar-body">
		    <div ng-include="'views/main.menu.html'"></div>
		    </div>

		</div>
		<div id="main-content" class="container-fluid" >
			<div id="alert-messages" class="hidden-print" style="z-index:10000"></div>
			<div ui-view></div>
		</div>
		<form style="width:0px;height:0px" method="post" id="_postform_" action="reports/report3.php" target="_blank"></form>
	</body>

	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap-theme.css">
	<link rel="stylesheet" type="text/css" href="yamm/yamm.css">

	<link rel="stylesheet" type="text/css" href="js/ng-table/ng-table.min.css">
	<link rel="stylesheet" href="js/res-table/angular-responsive-tables.css">
	<link rel="stylesheet" href="js/res-table/jquery.resizableColumns.css">
	<link rel="stylesheet" type="text/css" href="js/angular-strap/angular-motion.css">
	<link rel="stylesheet" type="text/css" href="js/loading-bar/loading-bar.min.css">
	<link rel="stylesheet" type="text/css" href="js/date/css/bootstrap-datepicker3.css">
	<link rel="stylesheet" type="text/css" href="js/slider/css/slider.css">
	<link rel="stylesheet" type="text/css" href="js/app.css">
	<script src="js/lib/underscore.min.js"></script>
	<script src="js/lib/jquery.min.js"></script>
	<script src="js/notify/notify.min.js"></script>
	<script src="js/moment/moment.min.js"></script>
	<script src="js/moment/th.js"></script>
	<script src="js/date/js/bootstrap-datepicker.min.js"></script>
	<script src="js/date/locales/bootstrap-datepicker.th.min.js"></script>
	<script src="js/lib/angular.min.js"></script>
	<script src="js/lib/angular-animate.min.js"></script>
	<script src="js/lib/angular-sanitize.min.js"></script>
	<script src="js/lib/angular-storage.min.js"></script>
	<script src="js/lib/angular-touch.min.js"></script>
	<script src="js/lib/angular-ui-router.min.js"></script>
	<script src="js/loading-bar/loading-bar.min.js"></script>
	<script src="js/ng-table/ng-table.js"></script>
	<script src="js/res-table/angular-responsive-tables.js"></script> 
	<script src="js/res-table/jquery.resizableColumns.js"></script>  
	<script src="js/angular-strap/angular-strap.min.js"></script>

	<script src="js/angular-strap/angular-strap.tpl.min.js"></script>
	<script src="js/slider/js/bootstrap-slider.js"></script>
	<script src="<?php echo url('js/custom.table.js')?>"></script>
	<script src="js/lib/ng-flow-standalone.min.js"></script>
	<script src="<?php echo url('js/lazyload.js')?>"></script>
	<script src="js/md5.min.js"></script>
	<script src="<?php echo url('js/app.js')?>"></script>
	<script src="<?php echo url('js/templates.js')?>"></script>
	
</html>