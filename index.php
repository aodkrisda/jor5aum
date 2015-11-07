<!DOCTYPE html>
<html ng-app="App">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>สำนักศาลยุติธรรมประจำภาค ๕</title>
		<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap-theme.css">
		<link rel="stylesheet" type="text/css" href="yamm/yamm.css">
		<link rel="stylesheet" type="text/css" href="awesome/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="js/ng-table/ng-table.min.css">
		<link rel="stylesheet" href="js/res-table/angular-responsive-tables.css">
		<link rel="stylesheet" href="js/res-table/jquery.resizableColumns.css">
		<link rel="stylesheet" type="text/css" href="js/angular-strap/angular-motion.css">
		<link rel="stylesheet" type="text/css" href="js/loading-bar/loading-bar.min.css">
		<link rel="stylesheet" type="text/css" href="js/date/css/bootstrap-datepicker3.css">
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
		<script src="js/custom.table.js"></script>
		<script src="js/lib/ng-flow-standalone.min.js"></script>
		<script src="js/lazyload.js"></script>
		<script src="js/app.js"></script>
		<script src="js/md5.min.js"></script>
	</head>
	<body id="body">
		<div ng-include="'views/main.template.html'"></div>
		<div ng-include="'views/main.menu.html'"></div>
		<div id="main-content" class="container-fluid">
			<div id="alert-messages" class="hidden-print" style="z-index:10000"></div>
			<div ui-view></div>
		</div>
	</body>
</html>