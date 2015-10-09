<?php

//require ('rest/NotORM/lib.php');  
?><!DOCTYPE html>
<html ng-app="App">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>สำนักศาลยุติธรรมประจำภาค ๕</title>

		<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap-theme.css">
		<link rel="stylesheet" type="text/css" href="awesome/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="js/ng-table/ng-table.min.css">
		<link rel="stylesheet" type="text/css" href="js/angular-strap/angular-motion.css">
		<link rel="stylesheet" type="text/css" href="js/loading-bar/loading-bar.min.css">
		<link rel="stylesheet" type="text/css" href="js/date/css/bootstrap-datepicker3.css">
		<link rel="stylesheet" type="text/css" href="js/app.css">
		<!--
		<link href="js/app.less" type="text/css" rel="stylesheet/less"/>
		<script src="js/less.min.js" type="text/javascript"></script>	
		-->	


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
		<script src="js/angular-strap/angular-strap.min.js"></script>
		<script src="js/angular-strap/angular-strap.tpl.min.js"></script>
		<script src="js/custom.table.js"></script>
		<script src="js/lib/ng-flow-standalone.min.js"></script>
		<script src="js/lazyload.js"></script>
		<script src="js/app.js"></script>


<script type="text/ng-template" id="custom.result.popover.html">
    <div class="popover" style="min-width:350px;max-width:80%">
        <div class="arrow"></div>

        <div class="popover-title">
            <button type="button" title="Close" class="close" aria-label="Close" ng-click="$hide()"><span aria-hidden="true">&times;</span></button>
            <h4><i class="fa fa-bars"></i> เพิ่มข้อมูล</h4>
        </div>
        <div class="popover-content">
            <form class="form" style="padding:10px;">
                <div class="form-group">
                    <label class="control-label">ผลการปฏิบัติ</label>
                    <input type="text" placeholder="ยังไม่มีข้อมูล" class="form-control" ng-model="itemResult.name">

                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-success" ng-disabled="!itemResult.name" ng-click="addResult(itemResult)"><span class="glyphicon glyphicon-ok-sign"></span> เพิ่มข้อมูล</button>
            <button type="button" class="btn btn-warning" ng-click="$hide()"><span class="glyphicon glyphicon-remove-sign"></span> ยกเลิก</button>
        </div>
    </div>
</script>
<script type="text/ng-template" id="custom.imprison.popover.html">
    <div class="popover" style="min-width:350px;max-width:80%">
        <div class="arrow"></div>

        <div class="popover-title">
            <button type="button" title="Close" class="close" aria-label="Close" ng-click="$hide()"><span aria-hidden="true">&times;</span></button>
            <h4><i class="fa fa-bars"></i> เพิ่มข้อมูล</h4>
        </div>
        <div class="popover-content">
            <form class="form" style="padding:10px;">
                <div class="form-group">
                    <label class="control-label">จำเลยต้องขัง</label>
                    <input type="text" placeholder="ยังไม่มีข้อมูล" class="form-control" ng-model="itemResult.name">

                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-success" ng-disabled="!itemResult.name" ng-click="addImprison(itemResult)"><span class="glyphicon glyphicon-ok-sign"></span> เพิ่มข้อมูล</button>
            <button type="button" class="btn btn-warning" ng-click="$hide()"><span class="glyphicon glyphicon-remove-sign"></span> ยกเลิก</button>
        </div>
    </div>
</script>
<script type="text/ng-template" id="custom.accept.popover.html">
    <div class="popover" style="min-width:350px;max-width:80%">
        <div class="arrow"></div>

        <div class="popover-title">
            <button type="button" title="Close" class="close" aria-label="Close" ng-click="$hide()"><span aria-hidden="true">&times;</span></button>
            <h4><i class="fa fa-bars"></i> เพิ่มข้อมูล</h4>
        </div>
        <div class="popover-content">
            <form class="form" style="padding:10px;">
                <div class="form-group">
                    <label class="control-label">จำเลยสารภาพ</label>
                    <input type="text" placeholder="ยังไม่มีข้อมูล" class="form-control" ng-model="itemResult.name">

                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-success" ng-disabled="!itemResult.name" ng-click="addAccept(itemResult)"><span class="glyphicon glyphicon-ok-sign"></span> เพิ่มข้อมูล</button>
            <button type="button" class="btn btn-warning" ng-click="$hide()"><span class="glyphicon glyphicon-remove-sign"></span> ยกเลิก</button>
        </div>
    </div>
</script>
<script type="text/ng-template" id="custom.command.popover.html">
    <div class="popover" style="min-width:350px;max-width:80%">
        <div class="arrow"></div>

        <div class="popover-title">
            <button type="button" title="Close" class="close" aria-label="Close" ng-click="$hide()"><span aria-hidden="true">&times;</span></button>
            <h4><i class="fa fa-bars"></i> คำสั่ง อธ.</h4>
        </div>
        <div class="popover-content">
            <form class="form" style="padding:10px;">
                <div class="form-group">
                    <label class="control-label">คำสั่ง อธ.</label>
                    <input type="text" placeholder="ยังไม่มีข้อมูล" class="form-control" ng-model="itemResult.name">

                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-success" ng-disabled="!itemResult.name" ng-click="addCommand(itemResult)"><span class="glyphicon glyphicon-ok-sign"></span> เพิ่มข้อมูล</button>
            <button type="button" class="btn btn-warning" ng-click="$hide()"><span class="glyphicon glyphicon-remove-sign"></span> ยกเลิก</button>
        </div>
    </div>
</script>

<script type="text/ng-template" id="custom.judge.popover.html">
    <div class="popover" style="min-width:350px;max-width:80%">
        <div class="arrow"></div>

        <div class="popover-title">
            <button type="button" title="Close" class="close" aria-label="Close" ng-click="$hide()"><span aria-hidden="true">&times;</span></button>
            <h4><i class="fa fa-bars"></i> ผู้พิพากษาผู้ตรวจ</h4>
        </div>
        <div class="popover-content">
            <form class="form" style="padding:10px;">
                <div class="form-group">
                    <label class="control-label">ชื่อผู้พิพากษา</label>
                    <input type="text" placeholder="ยังไม่มีข้อมูล" class="form-control" ng-model="itemResult.name">

                </div>
                <div class="form-group">
                    <label class="control-label">ตำแหน่ง</label>
                    <input type="text" placeholder="ยังไม่มีข้อมูล" class="form-control" ng-model="itemResult.position">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-success" ng-disabled="!itemResult.name" ng-click="addJudge(itemResult)"><span class="glyphicon glyphicon-ok-sign"></span> เพิ่มข้อมูล</button>
            <button type="button" class="btn btn-warning" ng-click="$hide()"><span class="glyphicon glyphicon-remove-sign"></span> ยกเลิก</button>
        </div>
    </div>
</script>

		<script type="text/ng-template" id="custom.confirm.popover.html">
			<div class="popover">
				<div class="arrow"></div>
				<h3 class="popover-title" >คุณต้องการลบข้อมูลใช่หรือไม่</h3>
				<div class="popover-content">
					<p class="text-center">
						<button type="button" class="btn btn-danger" ng-click="doRemove();$hide()">ลบข้อมูล</button>
						<button type="button" class="btn btn-primary" ng-click="$hide()">ยกเลิก</button>
					</p>
				</div>
			</div>
		</script>

		<script type="text/ng-template" id="custom.confirm2.popover.html">
			<div class="popover">
				<div class="arrow"></div>
				<h3 class="popover-title">คุณต้องการลบข้อมูลรายการที่เช็คทั้งหมด ใช่หรือไม่</h3>
				<div class="popover-content">
					<p class="text-center">
						<button type="button" class="btn btn-danger" ng-click="doRemoveChecked();$hide()">ลบทั้งหมด</button>
						<button type="button" class="btn btn-primary" ng-click="$hide()">ยกเลิก</button>
					</p>
				</div>
			</div>
		</script>

		<script type="text/ng-template" id="custom.dropdown.actions.html">
			<ul tabindex="-1" class="dropdown-menu" role="menu">
				<li> <a ng-click="selectAll()" href="javascript://void()"><span class="glyphicon glyphicon-check"></span> เลือกทั้งหมด</a></li>
				<li><a ng-click="selectInverse()" href="javascript://void()"><span class="glyphicon glyphicon-ok-sign"></span> เลือกกลับกัน</a></li>
				<li><a ng-click="selectNone()" href="javascript://void()"><span class="glyphicon glyphicon-ban-circle"></span> ยกเลิกการเลือกทั้งหมด</a></li>
				<li ng-if="hasChecked()" class="divider"></li>
				<li ng-if="hasChecked()"><a ng-click="removeChecked()" href="javascript://void()"><span class="glyphicon glyphicon-remove"></span> ลบข้อมูลที่เลือก</a></li>

			</ul>
		</script>

		<script type="text/ng-template" id="custom.pages.html">
			<div class="ng-cloak ng-table-pager" ng-if="params.data.length"> <div ng-if="params.settings().counts.length" class="ng-table-counts btn-group pull-right"> <button ng-repeat="count in params.settings().counts" type="button" ng-class="{\'active\':params.count()==count}" ng-click="params.count(count)" class="btn btn-default"> <span ng-bind="count"></span> </button> </div> <ul class="pagination ng-table-pagination"> <li ng-class="{\'disabled\': !page.active && !page.current, \'active\': page.current}" ng-repeat="page in pages" ng-switch="page.type"> <a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a> <a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a> <a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a> </li> </ul> </div>
		</script>

		<script type="text/ng-template" id="custom.pages.html">
			<div class="row panel-footer">
				<div class="col-sm-7">
					<div ng-if="params.data.length==0  && params.ready"><h2 style="padding:0px;margin:0px;color:#777777"><i class="fa fa-exclamation-triangle fa-lg"></i> ไม่พบข้อมูล</h2></div>

					<div ng-table-pager class="ng-cloak" ng-if="params.data.length">
						<ul class="pagination ng-table-pagination" style="margin:0px">
							<li ng-class="{disabled: !page.active && !page.current, active: page.current}" ng-repeat="page in pages" ng-switch="page.type">
								<a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a>
								<a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a>
								<a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a>
								<a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a>
								<a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a>
								<a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="col-sm-5">
					<div class="btn-group pull-right">
						<button ng-repeat="it in params.settings().counts track by it" type="button" ng-class="{'active':params.count() == it}" ng-click="params.count(it)" class="btn btn-default"> {{it}}</button>
					</div>
				</div>
			</div>
		</script>

		<script type="text/ng-template" id="custom.checked.html">
			<span id="checked-actions" class="glyphicon glyphicon-th" data-animation="am-flip-x" bs-dropdown="actions" aria-haspopup="true" aria-expanded="false" data-template="custom.dropdown.actions.html"></span>
		</script>
	</head>

	<body id="body">
		<nav id="main-navbar" class="navbar navbar-default"  role="navigation" bs-navbar>
		  <div class="container-fluid" bs-collapse>
				<div class="navbar-header" >
					  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar" bs-collapse-toggle>
						<span class="sr-only">Navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					  </button>	
					  <a class="navbar-brand" href="#">
						<h3 class="text-primary" style="padding:0px;margin:0px"><span class="fa fa-university"></span> สำนักศาลยุติธรรมประจำภาค ๕</h3>
					  </a>
				</div>
				<div ng-if="isAdmin()" class="collapse navbar-collapse" bs-collapse-target>
				  <ul class="nav navbar-nav navbar-right" ng-if="$root.getUserId()">
					<li data-match-route="admin/cases"><a href="#admin/cases"><span class="glyphicon glyphicon-equalizer"></span> ข้อมูลคดี</a></li>
					<li data-match-route="admin/users"><a href="#admin/users"><span class="glyphicon glyphicon-user"></span> ผู้ใช้</a></li>
					<li data-match-route="admin/types"><a href="#admin/types"><span class="glyphicon glyphicon-briefcase"></span> ประเภทคดี</a></li>
					<li data-match-route="admin/topics"><a href="#admin/topics"><span class="glyphicon glyphicon-tasks"></span> ข้อหา</a></li>
					<li data-match-route="admin/results"><a href="#admin/results"><span class="glyphicon glyphicon-check"></span> ผลการปฏิบัติ</a></li> 
					<li data-match-route="admin/ats"><a href="#admin/ats"><span class="glyphicon glyphicon-share"></span> คำสั่ง อ.ธ</a></li> 
					
					<li data-match-route="admin/report.*" class="dropdown">
			          <a href="javascript:void(0)" bs-dropdown="dropdown_reports" data-container="body" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-print"></span> ดูรายงาน <span class="caret"></span></a>
					</li>    
			
					<li><a  href="javascript:void()" ng-click="logOut(false)"><span class="glyphicon glyphicon-off"></span> ออกจากระบบ</a></li>                                                                         
				  </ul>
				</div>
				<div ng-if="!isAdmin()" class="collapse navbar-collapse" bs-collapse-target>
				  <ul class="nav navbar-nav navbar-right" ng-if="$root.getUserId()">
					<li data-match-route="court/cases"><a href="#court/cases"><span class="glyphicon glyphicon-equalizer"></span> ข้อมูลคดี</a></li>
					<li data-match-route="court/users"><a href="#court/users"><span class="glyphicon glyphicon-user"></span> ข้อมูลผู้พิพิกษา</a></li>
	   
					<li><a href="javascript:void()" ng-click="logOut(false)"><span class="glyphicon glyphicon-off"></span> ออกจากระบบ</a></li>                                                                         
				  </ul>
				</div>
		  </div>
		</nav>

		<div id="main-content" class="container-fluid">
			<div id="alert-messages" class="hidden-print"></div>
			<div ui-view></div>
			
			

 
		</div>



	</body>
</html>