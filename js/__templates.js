angular.module('App').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/admin.html',
    "<div ui-view></div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_acases.html',
    "<style>\r" +
    "\n" +
    "\ttable tr td{\r" +
    "\n" +
    "\t\tvertical-align:middle;\r" +
    "\n" +
    "\t}\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-controller=\"AdminReportCtrl\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ui-view></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-hide=\"!(urlEq('/admin/acases') || urlEq('/admin/acases/notify'))\">\r" +
    "\n" +
    "        <div class=\"panel panel-default\" ng-controller=\"CustomTableCtrl as cmt\" ng-init=\"$parent.cmt=cmt;setAPI('admin_cases','custom.admin.form1.html',{search:'searchText', court:'searchCourt', month:'searchMonth', year:'searchYear',_view:'_view()'},{court:true, month:true,year:true,_view:false})\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <div class=\"text-right pull-right\" style=\"position:relative;top:-0.25em\">\r" +
    "\n" +
    "                    <span ng-hide=\"urlEq('/admin/cases/notify')\">\r" +
    "\n" +
    "                        <button class=\"btn btn-success\" ng-show=\"isSearchMode()\" ng-click=\"setFilter()\">\r" +
    "\n" +
    "                            <span class=\"glyphicon glyphicon-arrow-left\"></span> ออกจากโหมดการค้นหา\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "                        <button class=\"btn btn-info\" ng-click=\"advancedSearch('custom.cases.search.html',{_view:'acases'})\">\r" +
    "\n" +
    "                            <span class=\"glyphicon glyphicon-search\"></span> ค้นหา\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <h2 style=\"padding:0px;margin:0px;\"><span class=\"fa fa-windows\"></span> รายงาน/ร่างคำสั่ง ({{tableParams.total()}})</h2>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div loading-container=\"tableParams.settings().$loading\">\r" +
    "\n" +
    "                    <div ng-show=\"!(isSearchMode() || urlEq('/admin/cases/notify'))\">\r" +
    "\n" +
    "                        <div class=\"input-group col-md-10 col-md-offset-1\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon  adon-label\"><strong>ศาล</strong></div>\r" +
    "\n" +
    "                            <select class=\"form-control\" ng-model=\"searchCourt\" ng-change=\"setCourtId(searchCourt);setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getCourt()\"></select>\r" +
    "\n" +
    "                            <div class=\"input-group-addon  adon-label\"><strong>เดือน</strong></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <select class=\"form-control\" ng-model=\"searchMonth\" ng-change=\"setMonthId(searchMonth);setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getMonth()\"></select>\r" +
    "\n" +
    "                            <div class=\"input-group-addon  adon-label\"><strong>พ.ศ</strong></div>\r" +
    "\n" +
    "                            <select class=\"form-control\" ng-model=\"searchYear\" ng-change=\"setYearId(searchYear);setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getYear()\"></select>\r" +
    "\n" +
    "                            <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter(true)\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-refresh\"></span></div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <hr />\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div ng-table-menu=\"tableParams\"></div>\r" +
    "\n" +
    "                    <table ng-table-resizable ng-table=\"tableParams\" ng-table-init ng-table-init-columns wt-responsive-table show-filter=\"false\" class=\"table table-hover table-bordered\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <tbody>\r" +
    "\n" +
    "                            <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                                ng-class=\"{'active': isSelected(it),'text-red':it.no_case_sent=='1'}\">\r" +
    "\n" +
    "                                <td width=\"30\" class=\"text-right text-muted\"><span title=\"#{{it.id}}\">{{::startIdx + $index + 1}}.</span></td>\r" +
    "\n" +
    "                                <td data-title=\"'เลขรับร่างคำสั่ง(ภาค)'\" sortable=\"'auto_received_num2'\" hide>\r" +
    "\n" +
    "                                    {{::it.auto_received_num2}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'เลขคดีดำ'\" sortable=\"'number_black'\">{{::it.number_black}}</td>\r" +
    "\n" +
    "                                <td data-title=\"'โจทก์'\" sortable=\"'plaintiff'\">{{::it.plaintiff}}</td>\r" +
    "\n" +
    "                                <td data-title=\"'จำเลย'\" sortable=\"'defendant'\">{{::it.defendant}}</td>\r" +
    "\n" +
    "                                <td data-title=\"'ข้อหาพิมพ์ปก'\" sortable=\"'title'\"> {{::it.title}}</td>\r" +
    "\n" +
    "                                <td data-title=\"'วันที่รับรายงานคดี'\" sortable=\"'received'\">\r" +
    "\n" +
    "                                    {{::it.date_received | thai_date:'short'}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'วันที่ภาคส่งงานคดี'\" sortable=\"'date_sent4'\">\r" +
    "\n" +
    "                                    {{::it.date_sent4 | thai_date:'short'}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <td data-title=\"'วันที่ภาครับ'\" class=\"text-center\" >\r" +
    "\n" +
    "                                   {{::it.date_received3 | thai_date:'short'}}\r" +
    "\n" +
    "                                  <span ng-if=\"isSelected(it)\" class=\"row-action\">\r" +
    "\n" +
    "                                        <button class=\"btn btn-success btn-circle btn-xs\" data-placement=\"left\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.admin.actions3.html\"\r" +
    "\n" +
    "                                                data-auto-close=\"true\">\r" +
    "\n" +
    "                                            <span class=\"glyphicon glyphicon-edit\"></span>\r" +
    "\n" +
    "                                        </button>\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </table>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_acases_form1.html',
    "<style>\r" +
    "\n" +
    "    .xreadonly{background-color:#F9DADA}\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "        <h2 class=\"text-center\" style=\"margin-top:0px\">รับร่างคำสั่ง {{editingItem.user_id | lookup_court}}</h2>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <form class=\"form form-horizontal readonly\" name=\"form\" style=\"padding-top:25px;padding-bottom:50px;\">\r" +
    "\n" +
    "            <fieldset>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขดำ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_black}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขแดง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_red}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">โจทก์</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.plaintiff}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">จำเลย</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.defendant}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ประเภทคดี</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.type_id | lookup_type:'name':true}} - {{editingItem.type_id | lookup_type}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาพิมพ์ปก</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\" ng-init=\"_xedit=false\">\r" +
    "\n" +
    "                        <div class=\"input-group\">\r" +
    "\n" +
    "                            <input type=\"text\" ng-readonly=\"!_xedit\" class=\"form-control input-md\" ng-model=\"editingItem.title\">\r" +
    "\n" +
    "                            <span class=\"input-group-addon\"  title=\"แก้ไข\" ng-click=\"_xedit=true\"><span class=\"glyphicon glyphicon-pencil\"></span></span>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่รับฟ้อง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_case | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาสถิติ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "   \r" +
    "\n" +
    "                            <div class=\"input-group\" ng-controller=\"TopicsCtrl\" ng-init=\"_xedit2=false\">\r" +
    "\n" +
    "                                <div class=\"form-control\" ng-class=\"{readonly:!_xedit2}\" style=\"height:auto;min-height:36px;\">\r" +
    "\n" +
    "                                    <custom-choices ng-model=\"editingItem.topic_ids\"></custom-choices>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"input-group-addon\" style=\"vertical-align:top;\" title=\"แก้ไข\" id=\"edit-topics\" ng-click=\"ifcall(editingItem.type_id>0,popupTopics, editingItem);_xedit2=true\">\r" +
    "\n" +
    "                                    <span style=\"background:none\"><span class=\"glyphicon glyphicon-pencil\"></span></span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "              \r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ศาลส่งร่างคำสั่ง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_sent_a | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            \r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่ส่งร่างคำสั่งของศาล</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_sent_a}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ชื่อผู้พิพากษาเจ้าของสำนวน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.judge_id_a  | lookup_judge}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "       \r" +
    "\n" +
    "                <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                <hr />\r" +
    "\n" +
    "                <div>\r" +
    "\n" +
    "                    <div class=\"col-md-4 col-md-offset-4\" ng-if=\"!editingItem.auto_received_num2\">\r" +
    "\n" +
    "                        <button  class=\"btn btn-success btn-lg btn-block\" ng-click=\"setRunNumber2(editingItem,$event)\"><span class=\"glyphicon glyphicon-sort-by-attributes\"></span> รันเลขรับสำนวน</button>\r" +
    "\n" +
    "                    </div>                \r" +
    "\n" +
    "                    <div class=\"col-md-4 col-md-offset-4\" ng-if=\"editingItem.auto_received_num2\">\r" +
    "\n" +
    "                        <h3 title=\"คลิกเพื่อลบเลขรับสำนวน\"><span class=\"btn text-primary\" data-placement=\"top\" data-auto-close=\"true\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.autonumber2.html\" style=\"font-size:1em\">เลขรับสำนวน  <span class=\"glyphicon glyphicon-paperclip\"></span> {{editingItem.auto_received_num2}}</span> </h3>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนพ่วง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                         <div class=\"input-group\">\r" +
    "\n" +
    "                             <div class=\"input-group-addon\"  style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.link_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"  disabled/></div>\r" +
    "\n" +
    "                             <input type=\"text\" readonly  class=\"form-control\" ng-model=\"editingItem.link_ids\" placeholder=\"ไม่มีสำนวนพ่วง\" />\r" +
    "\n" +
    "                         </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนรวม</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div class=\"input-group\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon\" style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.add_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\" disabled/></div>\r" +
    "\n" +
    "                            <p type=\"text\" class=\"form-control\" style=\"background-color:#F9DADA\">\r" +
    "\n" +
    "                                <span  class=\"label label-mr label-black\" ng-repeat=\"key in editingItem.add_ids |split\">{{key}}</span>\r" +
    "\n" +
    "                                <span ng-if=\"!editingItem.add_ids\" class=\"text-muted\">ไม่มีสำนวนรวม</span>\r" +
    "\n" +
    "                            </p>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>      \r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ภาครับร่างคำสั่ง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <span mode=\"0\" ng-model=\"editingItem.date_received3_a\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขรับร่างคำสั่ง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" class=\"form-control input-md\" ng-model=\"editingItem.number_received3_a\">\r" +
    "\n" +
    "                    \r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6 has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">รองอธิบดีฯผู้ตรวจ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge2_id_a\" data-options=\"judge_jor5_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ อธ. จ่ายสำนวน/หน.ภาค รับร่างคำสั่ง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <span mode=\"0\" ng-model=\"editingItem.date_at_received1_a\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            \r" +
    "\n" +
    "                <div class=\"form-group col-md-6 has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">หน.ศาลประจำภาคฯ ผู้ตรวจ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge4_id_a\" data-options=\"judge_jor5_options\" ></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ รอง อธ. รับสำนวน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <span mode=\"0\" ng-model=\"editingItem.date_at_received2_a\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6  has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ผลการปฏิบัติ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.result\" data-options=\"result_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                \r" +
    "\n" +
    "                <div class=\"col-md-12\" style=\"margin-top:2em\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-2\" style=\"padding-right:3em\">หมายเหตุ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-9\">\r" +
    "\n" +
    "                        <textarea class=\"form-control\" rows=\"3\" ng-model=\"editingItem.form3_note\"></textarea>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </fieldset>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"panel-footer\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-success btn-block\" ng-click=\"saveForm(editingItem,2)\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-block\" ng-click=\"goBack()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('views/admin_acases_form2.html',
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "        <h2 class=\"text-center\" style=\"margin-top:0px\">ส่งสำนวนและร่างคำสั่งคืน {{editingItem.user_id | lookup_court}}</h2>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <form class=\"form form-horizontal readonly\" name=\"form\" style=\"padding-top:25px;padding-bottom:50px;\">\r" +
    "\n" +
    "            <fieldset>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขดำ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_black}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขแดง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_red}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">โจทก์</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.plaintiff}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">จำเลย</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.defendant}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ประเภทคดี</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.type_id | lookup_type:'name':true}} - {{editingItem.type_id | lookup_type}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาพิมพ์ปก</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.title}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่รับฟ้อง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_case | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาสถิติ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <custom-readonly-topics ng-model=\"editingItem.topic_ids\"></custom-readonly-topics>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ศาลส่งร่างคำสั่ง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_sent_a | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่ส่งร่างคำสั่งของศาล</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_sent_a}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ชื่อผู้พิพากษาเจ้าของสำนวน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.judge_id_a  | lookup_judge}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                <hr />\r" +
    "\n" +
    "                <div ng-if=\"editingItem.auto_received_num2\">\r" +
    "\n" +
    "                    <div class=\"col-md-4 col-md-offset-4\">\r" +
    "\n" +
    "                        <h3>เลขรับสำนวน <span class=\"glyphicon glyphicon-paperclip\"></span> {{editingItem.auto_received_num2}}</h3>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนพ่วง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                         <div class=\"input-group\">\r" +
    "\n" +
    "                             <div class=\"input-group-addon\"  style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.link_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"  disabled/></div>\r" +
    "\n" +
    "                             <input type=\"text\" readonly  class=\"form-control\" ng-model=\"editingItem.link_ids\" placeholder=\"ไม่มีสำนวนพ่วง\" />\r" +
    "\n" +
    "                         </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนรวม</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div class=\"input-group\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon\" style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.add_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\" disabled/></div>\r" +
    "\n" +
    "                            <p type=\"text\" class=\"form-control\" style=\"background-color:#F9DADA\">\r" +
    "\n" +
    "                                <span  class=\"label label-mr label-black\" ng-repeat=\"key in editingItem.add_ids |split\">{{key}}</span>\r" +
    "\n" +
    "                                <span ng-if=\"!editingItem.add_ids\" class=\"text-muted\">ไม่มีสำนวนรวม</span>\r" +
    "\n" +
    "                            </p>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>      \r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ภาครับร่างคำสั่ง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_received3_a | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6  has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ผู้ตรวจ 1 สั่งออก</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge_checkout1_id_a\" data-options=\"judge_jor5_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6  has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">อธ./รอง อธ./พ.อาวุโส</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge2_id_a\" data-options=\"judge_jor5_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6  has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สั่งออกแทน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge_checkout2_id_a\" data-options=\"judge_jor5_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"clearfix\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6 has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">หน.ศาลฯประจำภาค</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge4_id_a\" data-options=\"judge_jor5_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ภาคส่งสำนวนกลับ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <span mode=\"0\" ng-model=\"editingItem.date_sent5_a\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6  has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ผลการปฏิบัติ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.result\" data-options=\"result_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่ส่งสำนวนกลับของภาค</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" class=\"form-control input-md\" ng-model=\"editingItem.number_sent5_a\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-12\" style=\"margin-top:2em\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-2\" style=\"padding-right:3em\">หมายเหตุ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-9\">\r" +
    "\n" +
    "                        <textarea class=\"form-control\" rows=\"3\" ng-model=\"editingItem.form4_note_a\"></textarea>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"col-md-8 col-md-offset-2\" ng-controller=\"AdminForm4Ctrl as f4ctrl\" ng-init=\"xctrl.f4=f4ctrl;load(editingItem.id)\">\r" +
    "\n" +
    "                    <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "                    <div>\r" +
    "\n" +
    "                        <span ios-toggle ng-model=\"editingItem.return_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"></span>\r" +
    "\n" +
    "                        <h4 style=\"display:inline;padding-left:1em\"><strong>ส่งสำนวนคืนเพื่อทบทวนร่างคำพิพากษา</strong></h4>\r" +
    "\n" +
    "                        <!--\r" +
    "\n" +
    "                        <button ng-if=\"editingItem.return_checked=='1'\" ng-click=\"addItem()\" class=\"btn btn-primary pull-right\">\r" +
    "\n" +
    "                            <span class=\"glyphicon glyphicon-plus\"></span> ส่งสำนวนคืน\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "                            -->\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div ng-if=\"editingItem.return_checked=='1'\" style=\"margin-top:1em;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <table class=\"table table-hover table-bordered\">\r" +
    "\n" +
    "                            <thead>\r" +
    "\n" +
    "                                <tr>\r" +
    "\n" +
    "                                    <th>ครั้งที่</th>\r" +
    "\n" +
    "                                    <th>เลขที่ส่ง</th>\r" +
    "\n" +
    "                                    <th>วันที่ส่ง</th>\r" +
    "\n" +
    "                                    <th colspan=\"2\">หมายเหตุ</th>\r" +
    "\n" +
    "                                </tr>\r" +
    "\n" +
    "                            </thead>\r" +
    "\n" +
    "                            <tbody>\r" +
    "\n" +
    "                                <tr ng-repeat=\"it in items\">\r" +
    "\n" +
    "                                    <td width=\"80\" class=\"text-center\"><strong>{{$index+1}}</strong></td>\r" +
    "\n" +
    "                                    <td width=\"25%\"><input type=\"text\" ng-model=\"it['number_return']\" class=\"form-control\" placeholder=\"ยังไม่มีข้อมูล\" /></td>\r" +
    "\n" +
    "                                    <td width=\"25%\"><span mode=\"0\" ng-model=\"it['date_return']\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span></td>\r" +
    "\n" +
    "                                    <td><input class=\"form-control\" ng-model=\"it['note_return']\" /></td>\r" +
    "\n" +
    "                                    <td style=\"width:1em\" class=\"text-danger\"><span class=\"btn\" ng-click=\"setRemoveItem(it)\" title=\"ลบรายการส่งสำนวนคืนนี้ออก\" data-placement=\"left\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.popover.html\" data-auto-close=\"true\"><span class=\"glyphicon glyphicon-remove\"></span></span></td>\r" +
    "\n" +
    "                                </tr>\r" +
    "\n" +
    "                                <tr ng-if=\"!items.length\">\r" +
    "\n" +
    "                                    <td colspan=\"5\">\r" +
    "\n" +
    "                                        <h3 class=\"text-muted text-center\">ยังไม่มีรายการส่งสำนวนคืน</h3>\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                </tr>\r" +
    "\n" +
    "                            </tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </fieldset>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"panel-footer\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-success btn-block\" ng-click=\"saveForm(editingItem,2,xctrl.f4)\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-block\" ng-click=\"goBack()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_at_results.html',
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"custom.form.at_results.html\">\r" +
    "\n" +
    "    <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r" +
    "\n" +
    "        <div class=\"modal-dialog\">\r" +
    "\n" +
    "            <div class=\"modal-content\">\r" +
    "\n" +
    "                <div class=\"modal-header\" ng-show=\"title\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "                    <h4 class=\"modal-title\"><span class=\"fa fa-windows\"></span> <span ng-bind=\"title\"></span></h4>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-body\">\r" +
    "\n" +
    "                    <form class=\"form-horizontal\" name=\"form\">\r" +
    "\n" +
    "                        <fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">เหตุผล.</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" name=\"name\" placeholder=\"ยังไม่ได้กำหนดชื่อ\" required ng-model=\"editingItem.name\" class=\"form-control input-md\">\r" +
    "\n" +
    "                                    <p class=\"help-block has-error\" ng-show=\"form.name.$error.required\">ต้องกำหนดชื่อ</p>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "   \r" +
    "\n" +
    "                        </fieldset>\r" +
    "\n" +
    "                    </form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-footer\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-primary btn-min\" ng-disabled=\"!editingItem.name\" ng-click=\"saveForm()\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"cancelForm()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"container-fluid\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <p>\r" +
    "\n" +
    "        <div class=\"panel panel-default\" ng-controller=\"CustomTableCtrl\" ng-init=\"setAPI('at_results','custom.form.at_results.html')\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <div class=\"text-left pull-left\">\r" +
    "\n" +
    "                    <h2 style=\"padding:0px;margin:0px;\"><span class=\"fa fa-windows\"></span> เหตุผลที่ไม่ถูกต้องตามระเบียบ ({{tableParams.total()}})</h2>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <p class=\"text-right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <button ng-click=\"newItem()\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-plus\"></span> เพิ่มข้อมูล</button>\r" +
    "\n" +
    "                    <button ng-click=\"editItem()\" ng-show=\"hasSelected()\" class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-pencil\"></span> แก้ไขข้อมูล</button>\r" +
    "\n" +
    "                    <button data-placement=\"bottom\"  data-trigger=\"click\" bs-popover data-template=\"custom.confirm.popover.html\"\r" +
    "\n" +
    "                            ng-click=\"removeItem()\" ng-show=\"hasSelected()\" class=\"btn btn-danger\" data-auto-close=\"true\">\r" +
    "\n" +
    "                        <span class=\"glyphicon glyphicon-remove\"></span> ลบข้อมูล\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <button ng-click=\"refresh()\" class=\"btn btn-success\"><span class=\"glyphicon glyphicon-refresh\"></span> โหลดข้อมูล</button>\r" +
    "\n" +
    "                </p>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "                <div loading-container=\"tableParams.settings().$loading\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"input-group col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon\">ค้นหาชื่อ</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <input type=\"text\" class=\"form-control\" ng-model=\"searchText\" ng-model-options=\"{updateOn: 'blur', debounce: {'default': 500, 'blur': 0}}\" placeholder=\"{{(lastSearchText)?lastSearchText:'ชื่อที่ต้องการค้นหา'}}\" />\r" +
    "\n" +
    "                            <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter()\" ng-disabled=\"!searchText\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-search\"></span></div>\r" +
    "\n" +
    "                            <div ng-if=\"lastSearchText\" class=\"input-group-addon btn btn-default\" ng-click=\"clearFilter()\" title=\"เลิกค้นหา\"><span class=\"glyphicon glyphicon-remove\"></span></div>\r" +
    "\n" +
    "                            \r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <hr/>\r" +
    "\n" +
    "                    <table ng-table=\"tableParams\" show-filter=\"false\" class=\"table table-hover\" >\r" +
    "\n" +
    "                        <tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                                ng-dblclick=\"editItem()\"\r" +
    "\n" +
    "                                ng-class=\"{'active': isSelected(it)}\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <td width=\"30\" class=\"text-right text-muted\">{{startIdx + $index + 1}}.</td>\r" +
    "\n" +
    "      \r" +
    "\n" +
    "                                <td data-title=\"'เหตุผล'\" sortable=\"'name'\" >\r" +
    "\n" +
    "                                    {{it.name}}\r" +
    "\n" +
    "                                    <span ng-if=\"isSelected(it)\" class=\"row-action2\"><span class=\"glyphicon glyphicon-star-empty\"></span></span>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "                        </tbody>\r" +
    "\n" +
    "                    </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</p>\r" +
    "\n" +
    "<div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_ats.html',
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"custom.form.ats.html\">\r" +
    "\n" +
    "    <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r" +
    "\n" +
    "        <div class=\"modal-dialog\">\r" +
    "\n" +
    "            <div class=\"modal-content\">\r" +
    "\n" +
    "                <div class=\"modal-header\" ng-show=\"title\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "                    <h4 class=\"modal-title\"><span class=\"fa fa-windows\"></span> <span ng-bind=\"title\"></span></h4>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-body\">\r" +
    "\n" +
    "                    <form class=\"form-horizontal\" name=\"form\">\r" +
    "\n" +
    "                        <fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">คำสั่ง อธ.</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" name=\"name\" placeholder=\"ยังไม่ได้กำหนดชื่อ\" required ng-model=\"editingItem.name\" class=\"form-control input-md\">\r" +
    "\n" +
    "                                    <p class=\"help-block has-error\" ng-show=\"form.name.$error.required\">ต้องกำหนดชื่อ</p>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"col-md-4 text-right\">\r" +
    "\n" +
    "                                <label>ตรวจ</label>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"col-md-7\">\r" +
    "\n" +
    "                                <span ios-toggle ng-model=\"editingItem.checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"></span>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"col-md-4 text-right\"  style=\"padding-top:1em\">\r" +
    "\n" +
    "                                <label>ส่งสำเนา</label>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"col-md-7\" style=\"padding-top:0.5em\">\r" +
    "\n" +
    "                                <span ios-toggle ng-model=\"editingItem.copyied\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"></span>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "  \r" +
    "\n" +
    "                        </fieldset>\r" +
    "\n" +
    "                    </form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-footer\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-primary btn-min\" ng-disabled=\"!editingItem.name\" ng-click=\"saveForm()\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"cancelForm()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"container-fluid\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <p>\r" +
    "\n" +
    "        <div class=\"panel panel-default\" ng-controller=\"CustomTableCtrl\" ng-init=\"setAPI('ats','custom.form.ats.html')\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <div class=\"text-left pull-left\">\r" +
    "\n" +
    "                    <h2 style=\"padding:0px;margin:0px;\"><span class=\"fa fa-windows\"></span> คำสั่ง อธ. ({{tableParams.total()}})</h2>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <p class=\"text-right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <button ng-click=\"newItem()\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-plus\"></span> เพิ่มข้อมูล</button>\r" +
    "\n" +
    "                    <button ng-click=\"editItem()\" ng-show=\"hasSelected()\" class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-pencil\"></span> แก้ไขข้อมูล</button>\r" +
    "\n" +
    "                    <button data-placement=\"bottom\"  data-trigger=\"click\" bs-popover data-template=\"custom.confirm.popover.html\"\r" +
    "\n" +
    "                            ng-click=\"removeItem()\" ng-show=\"hasSelected()\" class=\"btn btn-danger\" data-auto-close=\"true\">\r" +
    "\n" +
    "                        <span class=\"glyphicon glyphicon-remove\"></span> ลบข้อมูล\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <button ng-click=\"refresh()\" class=\"btn btn-success\"><span class=\"glyphicon glyphicon-refresh\"></span> โหลดข้อมูล</button>\r" +
    "\n" +
    "                </p>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "                <div loading-container=\"tableParams.settings().$loading\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"input-group col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon\">ค้นหาชื่อ</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <input type=\"text\" class=\"form-control\" ng-model=\"searchText\" ng-model-options=\"{updateOn: 'blur', debounce: {'default': 500, 'blur': 0}}\" placeholder=\"{{(lastSearchText)?lastSearchText:'ชื่อที่ต้องการค้นหา'}}\" />\r" +
    "\n" +
    "                            <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter()\" ng-disabled=\"!searchText\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-search\"></span></div>\r" +
    "\n" +
    "                            <div ng-if=\"lastSearchText\" class=\"input-group-addon btn btn-default\" ng-click=\"clearFilter()\" title=\"เลิกค้นหา\"><span class=\"glyphicon glyphicon-remove\"></span></div>\r" +
    "\n" +
    "                            \r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <hr/>\r" +
    "\n" +
    "                    <table  ng-table=\"tableParams\" show-filter=\"false\" class=\"table table-hover\" >\r" +
    "\n" +
    "                        <tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                                ng-dblclick=\"editItem()\"\r" +
    "\n" +
    "                                ng-class=\"{'active': isSelected(it)}\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <td width=\"30\" class=\"text-right text-muted\">{{startIdx + $index + 1}}.</td>\r" +
    "\n" +
    "                                <!--\r" +
    "\n" +
    "                                <td width=\"30\" header=\"'custom.checked.html'\">\r" +
    "\n" +
    "                                    <input type=\"checkbox\" ng-model=\"checkboxes.items[it[pkField]]\" />\r" +
    "\n" +
    "                                </td>-->\r" +
    "\n" +
    "                                <td data-title=\"'คำสั่ง อธ.'\" sortable=\"'name'\" >\r" +
    "\n" +
    "                                    <span ng-if=\"it.checked!='1'\" class=\"glyphicon glyphicon-remove\"></span>\r" +
    "\n" +
    "                                    <span ng-if=\"it.checked=='1'\"class=\"glyphicon glyphicon-ok\"></span>\r" +
    "\n" +
    "                                    {{it.name}}\r" +
    "\n" +
    "                                    <span ng-if=\"isSelected(it)\" class=\"row-action2\"><span class=\"glyphicon glyphicon-star-empty\"></span></span>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "                        </tbody>\r" +
    "\n" +
    "                    </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</p>\r" +
    "\n" +
    "<div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_cases.html',
    "<style>\r" +
    "\n" +
    "\ttable tr td{\r" +
    "\n" +
    "\t\tvertical-align:middle;\r" +
    "\n" +
    "\t}\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-controller=\"AdminReportCtrl\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ui-view></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-hide=\"!(urlEq('/admin/cases') || urlEq('/admin/cases/notify'))\">\r" +
    "\n" +
    "        <div class=\"panel panel-default\" ng-controller=\"CustomTableCtrl as cmt\" ng-init=\"$parent.cmt=cmt;setAPI('admin_cases','custom.admin.form1.html',{search:'searchText', court:'searchCourt', month:'searchMonth', year:'searchYear',_view:'_view()'},{court:true, month:true,year:true,_view:false})\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <div class=\"text-right pull-right\" style=\"position:relative;top:-0.25em\">\r" +
    "\n" +
    "                    <span class=\"btn btn-notify btn-info\" style=\"margin-right:4em\" ng-click=\"notify()\">ยังไม่ได้จัดส่งผลรายงานคดี<span class=\"notify\">{{TableMeta.notsent || 0}}</span></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <span ng-hide=\"urlEq('/admin/cases/notify')\">\r" +
    "\n" +
    "                        <button class=\"btn btn-success\" ng-show=\"isSearchMode()\" ng-click=\"setFilter()\">\r" +
    "\n" +
    "                            <span class=\"glyphicon glyphicon-arrow-left\"></span> ออกจากโหมดการค้นหา\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "                        <button class=\"btn btn-info\" ng-click=\"advancedSearch('custom.cases.search.html')\">\r" +
    "\n" +
    "                            <span class=\"glyphicon glyphicon-search\"></span> ค้นหา\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "                        <button class=\"btn btn-success\" data-placement=\"left\" data-trigger=\"click\" bs-popover data-template=\"admin.cases.reports.html\" data-auto-close=\"true\">\r" +
    "\n" +
    "                            <span class=\"glyphicon glyphicon-print\"></span> สรุปรายงานคดี\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "                    </span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <h2 style=\"padding:0px;margin:0px;\"><span class=\"fa fa-windows\"></span> รายงานคดี ({{tableParams.total()}})</h2>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div loading-container=\"tableParams.settings().$loading\">\r" +
    "\n" +
    "                    <div ng-show=\"!(isSearchMode() || urlEq('/admin/cases/notify'))\">\r" +
    "\n" +
    "                        <div class=\"input-group col-md-10 col-md-offset-1\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon  adon-label\"><strong>ศาล</strong></div>\r" +
    "\n" +
    "                            <select class=\"form-control\" ng-model=\"searchCourt\" ng-change=\"setCourtId(searchCourt);setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getCourt()\"></select>\r" +
    "\n" +
    "                            <div class=\"input-group-addon  adon-label\"><strong>เดือน</strong></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <select class=\"form-control\" ng-model=\"searchMonth\" ng-change=\"setMonthId(searchMonth);setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getMonth()\"></select>\r" +
    "\n" +
    "                            <div class=\"input-group-addon  adon-label\"><strong>พ.ศ</strong></div>\r" +
    "\n" +
    "                            <select class=\"form-control\" ng-model=\"searchYear\" ng-change=\"setYearId(searchYear);setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getYear()\"></select>\r" +
    "\n" +
    "                            <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter(true)\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-refresh\"></span></div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <hr />\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div ng-table-menu=\"tableParams\"></div>\r" +
    "\n" +
    "                    <table ng-table-resizable ng-table=\"tableParams\" ng-table-init ng-table-init-columns wt-responsive-table show-filter=\"false\" class=\"table table-hover table-bordered\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <tbody>\r" +
    "\n" +
    "                            <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                                ng-class=\"{'active': isSelected(it),'text-red':it.no_case_sent=='1'}\">\r" +
    "\n" +
    "                                <td width=\"30\" class=\"text-right text-muted\"><span title=\"#{{it.id}}\">{{startIdx + $index + 1}}.</span></td>\r" +
    "\n" +
    "                                <td data-title=\"'เลขรับสำนวนของภาค'\" sortable=\"'auto_received_num'\" hide>\r" +
    "\n" +
    "                                    {{it.auto_received_num}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'เลขคดีดำ'\" sortable=\"'number_black'\">{{it.number_black}}</td>\r" +
    "\n" +
    "                                <td data-title=\"'โจทก์'\" sortable=\"'plaintiff'\">{{it.plaintiff}}</td>\r" +
    "\n" +
    "                                <td data-title=\"'จำเลย'\" sortable=\"'defendant'\">{{it.defendant}}</td>\r" +
    "\n" +
    "                                <td data-title=\"'ข้อหาพิมพ์ปก'\" sortable=\"'title'\"> {{it.title}}</td>\r" +
    "\n" +
    "                                <td data-title=\"'วันที่รับรายงานคดี'\" sortable=\"'received'\">\r" +
    "\n" +
    "                                    {{it.date_received | thai_date:'short'}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'วันที่ภาคส่งงานคดี'\" sortable=\"'date_sent4'\">\r" +
    "\n" +
    "                                    {{it.date_sent4 | thai_date:'short'}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <td data-title=\"'ส่งสำนวน'\" class=\"text-center\" ng-switch=\"caseReceived(it)\">\r" +
    "\n" +
    "                                    <span ng-switch-when=\"1\" class=\"label label-success\">ส่งแล้ว</span>\r" +
    "\n" +
    "                                    <span ng-switch-when=\"2\" class=\"label label-danger\">ไม่ต้องส่ง</span>\r" +
    "\n" +
    "                                    <span ng-switch-default class=\"label label-warning\">ยังไม่ได้ส่ง</span>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ส่งไฟล์คำพิพากษา'\" class=\"text-center\" ng-switch=\"caseCopyReceived(it)\">\r" +
    "\n" +
    "                                    <span ng-switch-when=\"1\" class=\"label label-success\">ส่งแล้ว</span>\r" +
    "\n" +
    "                                    <span ng-switch-when=\"2\" class=\"label label-danger\">ไม่ต้องส่ง</span>\r" +
    "\n" +
    "                                    <span ng-switch-default class=\"label label-warning\">ยังไม่ได้ส่ง</span>\r" +
    "\n" +
    "                                    <a ng-if=\"it.file2\" href=\"{{open_pdf(it.file2)}}\" target=\"_bank\"><span title=\"เปิดไฟล์คำพิพากษา {{it.file2}}\" class=\"label label-success\">ส่งแล้ว</span></a>\r" +
    "\n" +
    "                                    <span ng-if=\"isSelected(it)\" class=\"row-action\">\r" +
    "\n" +
    "                                        <button class=\"btn btn-success btn-circle btn-xs\" data-placement=\"left\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.admin.actions.html\"\r" +
    "\n" +
    "                                                data-auto-close=\"true\">\r" +
    "\n" +
    "                                            <span class=\"glyphicon glyphicon-edit\"></span>\r" +
    "\n" +
    "                                        </button>\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </table>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_cases_form1.html',
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "        <h2 class=\"text-center\" style=\"margin-top:0px\">รายงานคดี {{editingItem.user_id | lookup_court}}</h2>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <form class=\"form form-horizontal readonly\" name=\"form\" style=\"padding-top:25px;padding-bottom:50px;\">\r" +
    "\n" +
    "            <fieldset>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขดำ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_black}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขแดง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_red}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">โจทก์</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.plaintiff}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">จำเลย</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.defendant}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ประเภทคดี</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.type_id | lookup_type:'name':true}} - {{editingItem.type_id | lookup_type}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาสถิติ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <custom-readonly-topics ng-model=\"editingItem.topic_ids\"></custom-readonly-topics>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่รับฟ้อง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_case | thai_date}}\" >\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาพิมพ์ปก</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.title}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ส่งศาล</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_sent | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่ส่ง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_sent}}\"></div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                   \r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <hr />  \r" +
    "\n" +
    "                <div ng-if=\"editingItem.auto_received_num\">\r" +
    "\n" +
    "                    <div class=\"col-md-4 col-md-offset-4\">\r" +
    "\n" +
    "                        <h3>เลขรับสำนวน <span class=\"glyphicon glyphicon-paperclip\"></span> {{editingItem.auto_received_num}}</h3>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนพ่วง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                         <div class=\"input-group\">\r" +
    "\n" +
    "                             <div class=\"input-group-addon\"  style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.link_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"  disabled/></div>\r" +
    "\n" +
    "                             <input type=\"text\" readonly  class=\"form-control\" ng-model=\"editingItem.link_ids\" placeholder=\"ไม่มีสำนวนพ่วง\" />\r" +
    "\n" +
    "                         </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนรวม</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div class=\"input-group\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon\" style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.add_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\" disabled/></div>\r" +
    "\n" +
    "                            <p type=\"text\" class=\"form-control\" style=\"background-color:#F9DADA\">\r" +
    "\n" +
    "                                <span  class=\"label label-mr label-black\" ng-repeat=\"key in editingItem.add_ids |split\">{{key}}</span>\r" +
    "\n" +
    "                                <span ng-if=\"!editingItem.add_ids\" class=\"text-muted\">ไม่มีสำนวนรวม</span>\r" +
    "\n" +
    "                            </p>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>                  \r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ผลการปฏิบัติ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <select class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.result\" select-default ng-options=\"it.id as it.name for it  in Lookups.getResult()\">\r" +
    "\n" +
    "                                <option value=\"\"></option>\r" +
    "\n" +
    "                            </select>\r" +
    "\n" +
    "       \r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">คำสั่ง อธ.</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        \r" +
    "\n" +
    "                            <select class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.command_id\" select-default ng-options=\"it.id as it.id | lookup_at group by it.checked |iif:'1':'ตรวจ':'ไม่ตรวจ' for it  in Lookups.getAt()\">\r" +
    "\n" +
    "                                <option value=\"\"></option>\r" +
    "\n" +
    "                            </select>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  \r" +
    "\n" +
    "                        <div ng-if=\"(editingItem.command_id | lookup_at:'checked')=='1'\">\r" +
    "\n" +
    "                            <label class=\"checkbox text-muted\" style=\"padding-left:20px\">\r" +
    "\n" +
    "                                <input type=\"checkbox\" ng-model=\"editingItem.at_correct\" disabled ng-true-value=\"'0'\" ng-false-value=\"'1'\">  ไม่ถูกต้องตามระเบียบ\r" +
    "\n" +
    "                            </label>\r" +
    "\n" +
    "                            <div ng-if=\"editingItem.at_correct=='0'\">\r" +
    "\n" +
    "                                <label style=\"padding-top:0.5em\">เหตุผล</label>\r" +
    "\n" +
    "                                <div class=\"input-group\">\r" +
    "\n" +
    "                                    <select class=\"form-control input-md\" disabled name=\"role\" ng-model=\"editingItem.at_result_id\" select-default ng-options=\"it.id as it.id | lookup_at_result  for it  in Lookups.getAtResult()\">\r" +
    "\n" +
    "                                        <option value=\"\"></option>\r" +
    "\n" +
    "                                    </select>\r" +
    "\n" +
    "                                    <span class=\"input-group-addon btn\" id=\"add-at-result\" xxng-click=\"popupAtResult()\"><span class=\"glyphicon glyphicon-plus\"></span></span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "   \r" +
    "\n" +
    "  \r" +
    "\n" +
    "       \r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่ภาครับหนังสือ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.number_received\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ภาครับหนังสือ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <span mode=\"0\" ng-model=\"editingItem.date_received\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span> \r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่หนังสือแจ้งรายงานคดี</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.number_sent4\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                \r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ภาคส่งหนังสือ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <span mode=\"0\" ng-model=\"editingItem.date_sent4\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "    \r" +
    "\n" +
    "                <div class=\"col-md-12\" style=\"margin-top:2em\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-2\" style=\"padding-right:3em\">หมายเหตุ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-9\">\r" +
    "\n" +
    "                        <textarea class=\"form-control\" rows=\"3\" ng-model=\"editingItem.form1_note\"></textarea>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                 </div>\r" +
    "\n" +
    "            </fieldset>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"panel-footer\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-success btn-block\" ng-click=\"saveForm(editingItem,1)\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-block\" ng-click=\"goBack()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_cases_form2.html',
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "        <h2 class=\"text-center\" style=\"margin-top:0px\">รับสำนวนและร่างคำพิพากษา {{editingItem.user_id | lookup_court}}</h2>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <form class=\"form form-horizontal readonly\" name=\"form\" style=\"padding-top:25px;padding-bottom:50px;\">\r" +
    "\n" +
    "           \r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขดำ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_black}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขแดง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_red}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">โจทก์</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.plaintiff}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">จำเลย</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.defendant}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ประเภทคดี</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.type_id | lookup_type:'name':true}} - {{editingItem.type_id | lookup_type}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                <label class=\"control-label col-md-4\">ข้อหาพิมพ์ปก</label>\r" +
    "\n" +
    "                <div class=\"col-md-8\" ng-init=\"_xedit=false\">\r" +
    "\n" +
    "                    <div class=\"input-group\">\r" +
    "\n" +
    "                        <input type=\"text\" ng-readonly=\"!_xedit\" class=\"form-control input-md\" ng-model=\"editingItem.title\">\r" +
    "\n" +
    "                        <span class=\"input-group-addon\" title=\"แก้ไข\" ng-click=\"_xedit=true\"><span class=\"glyphicon glyphicon-pencil\"></span></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่รับฟ้อง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_case | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                <label class=\"control-label col-md-4\">ข้อหาสถิติ</label>\r" +
    "\n" +
    "                <div class=\"col-md-8\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"input-group\" ng-controller=\"TopicsCtrl\" ng-init=\"_xedit2=false\">\r" +
    "\n" +
    "                        <div class=\"form-control\" ng-class=\"{readonly:!_xedit2}\" style=\"height:auto;min-height:36px;\">\r" +
    "\n" +
    "                            <custom-choices ng-model=\"editingItem.topic_ids\"></custom-choices> \r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"input-group-addon\" style=\"vertical-align:top;\" title=\"แก้ไข\" id=\"edit-topics\" ng-click=\"ifcall(editingItem.type_id>0,popupTopics, editingItem);_xedit2=true\">\r" +
    "\n" +
    "                            <span style=\"background:none\"><span class=\"glyphicon glyphicon-pencil\"></span></span>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ศาลส่งสำนวน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_sent2 | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่ส่งสำนวนของศาล</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_sent2}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ชื่อผู้พิพากษาเจ้าของสำนวน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.judge_id  | lookup_judge}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                <label class=\"control-label col-md-4\">วันที่นัดฟังคำพิพากษา</label>\r" +
    "\n" +
    "                <div class=\"col-md-8\">\r" +
    "\n" +
    "                    <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_ap  | thai_date}}\">\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "                <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                <hr />\r" +
    "\n" +
    "                <div >\r" +
    "\n" +
    "                    <div class=\"col-md-4 col-md-offset-4\" ng-if=\"!editingItem.auto_received_num\">\r" +
    "\n" +
    "                        <button  class=\"btn btn-success btn-lg btn-block\" ng-click=\"setRunNumber(editingItem,$event)\"><span class=\"glyphicon glyphicon-sort-by-attributes\"></span> รันเลขรับสำนวน</button>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"col-md-4 col-md-offset-4\" ng-if=\"editingItem.auto_received_num\">\r" +
    "\n" +
    "                        <h3 title=\"คลิกเพื่อลบเลขรับสำนวน\"><span class=\"btn text-primary\" data-placement=\"top\" data-auto-close=\"true\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.autonumber.html\" style=\"font-size:1em\">เลขรับสำนวน  <span class=\"glyphicon glyphicon-paperclip\"></span> {{editingItem.auto_received_num}}</span> </h3>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <fieldset ng-disabled=\"!editingItem.auto_received_num\">\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนพ่วง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                         <div class=\"input-group\">\r" +
    "\n" +
    "                             <div class=\"input-group-addon\" style=\"background-color:#fefefe\"><input type=\"checkbox\" ng-model=\"editingItem.link_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"/></div>\r" +
    "\n" +
    "                             <input type=\"text\" ng-disabled=\"editingItem.link_checked!='1'\" class=\"form-control\" ng-model=\"editingItem.link_ids\" placeholder=\"ไม่มีสำนวนพ่วง\" />\r" +
    "\n" +
    "                         </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนรวม</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div class=\"input-group\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon\" style=\"background-color:#fefefe\"><input type=\"checkbox\" ng-model=\"editingItem.add_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"/></div>\r" +
    "\n" +
    "                            <p type=\"text\" ng-disabled=\"editingItem.add_checked!='1'\" class=\"form-control\" >\r" +
    "\n" +
    "                                <span  class=\"label label-mr label-black\" ng-repeat=\"key in editingItem.add_ids |split\">{{key}}</span>\r" +
    "\n" +
    "                                <span ng-if=\"!editingItem.add_ids\" class=\"text-muted\">ไม่มีสำนวนรวม</span>\r" +
    "\n" +
    "                            </p>\r" +
    "\n" +
    "                            <div class=\"input-group-addon\" title=\"เลือกคดี\" ng-controller=\"MergeCaseCtrl\" ng-click=\"ifcall(editingItem.add_checked=='1',open,'views/custom.select_cases_panel.html',editingItem)\"><span class=\"glyphicon glyphicon-th-list\"></span></div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>  \r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ภาครับสำนวนคำพิพากษา</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <span mode=\"0\" ng-model=\"editingItem.date_received3\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6  has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ผลการปฏิบัติ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.result\" data-options=\"result_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่รับหนังสือสำนวนของภาค</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" class=\"form-control input-md\" ng-model=\"editingItem.number_received3\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">คำสั่ง อธ. / ตามระเบียบ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <select class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.command_id\" select-default ng-options=\"it.id as it.id | lookup_at group by it.checked |iif:'1':'ตรวจ':'ไม่ตรวจ' for it  in Lookups.getAt()\">\r" +
    "\n" +
    "                            <option value=\"\"></option>\r" +
    "\n" +
    "                        </select>\r" +
    "\n" +
    "                        <div ng-if=\"(editingItem.command_id | lookup_at:'checked')=='1'\">\r" +
    "\n" +
    "                            <label class=\"checkbox text-danger\" style=\"padding-left:20px\">\r" +
    "\n" +
    "                                <input type=\"checkbox\" ng-model=\"editingItem.at_correct\" ng-true-value=\"'0'\" ng-false-value=\"'1'\">  ไม่ถูกต้องตามระเบียบ\r" +
    "\n" +
    "                            </label>\r" +
    "\n" +
    "                            <div ng-if=\"editingItem.at_correct=='0'\">\r" +
    "\n" +
    "                                <label style=\"padding-top:0.5em\">เหตุผล</label>\r" +
    "\n" +
    "                                <div class=\"input-group\">\r" +
    "\n" +
    "                                    <select class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.at_result_id\" select-default ng-options=\"it.id as it.id | lookup_at_result  for it  in Lookups.getAtResult()\">\r" +
    "\n" +
    "                                        <option value=\"\"></option>\r" +
    "\n" +
    "                                    </select>\r" +
    "\n" +
    "                                    <span class=\"input-group-addon btn\" id=\"add-at-result\" ng-click=\"popupAtResult()\"><span class=\"glyphicon glyphicon-plus\"></span></span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if=\"editingItem.return_checked=='1'\">\r" +
    "\n" +
    "                    <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "                    <div class=\"col-md-8 col-md-offset-2\" ng-controller=\"AdminForm2Ctrl as f2ctrl\" ng-init=\"xctrl.f2=f2ctrl;load(editingItem.id)\">\r" +
    "\n" +
    "                       \r" +
    "\n" +
    "                        <div ng-if=\"editingItem.return2_checked=='1' && items.length\" >\r" +
    "\n" +
    "                            <h4 style=\"display:inline;\"><strong><span class=\"glyphicon glyphicon-tags\"></span> ภาครับสำนวน (กรณีส่งสำนวนซ้ำเพื่อทบทวนร่างคำพิพากษา)</strong></h4>\r" +
    "\n" +
    "                            <div style=\"margin-top:1em;\"></div>\r" +
    "\n" +
    "                            <table class=\"table table-hover table-bordered\">\r" +
    "\n" +
    "                                <thead>\r" +
    "\n" +
    "                                    <tr>\r" +
    "\n" +
    "                                        <th>ครั้งที่</th>\r" +
    "\n" +
    "                                        <th>เลขที่ส่ง</th>\r" +
    "\n" +
    "                                        <th>วันที่ส่ง</th>\r" +
    "\n" +
    "                                        <th>หมายเหตุ</th>\r" +
    "\n" +
    "                                    </tr>\r" +
    "\n" +
    "                                </thead>\r" +
    "\n" +
    "                                <tbody>\r" +
    "\n" +
    "                                    <tr ng-repeat=\"it in items\">\r" +
    "\n" +
    "                                        <td width=\"80\" class=\"text-center\"><strong>{{$index+1}}</strong></td>\r" +
    "\n" +
    "                                        <td width=\"25%\"><input type=\"text\" ng-model=\"it['number_received']\" class=\"form-control\" placeholder=\"ยังไม่มีข้อมูล\" /></td>\r" +
    "\n" +
    "                                        <td width=\"25%\"><span mode=\"0\" ng-model=\"it['date_received']\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span></td>\r" +
    "\n" +
    "                                        <td><input class=\"form-control\" ng-model=\"it['note_received']\" /></td>\r" +
    "\n" +
    "                                    </tr>\r" +
    "\n" +
    "                                    <tr ng-if=\"!items.length\">\r" +
    "\n" +
    "                                        <td colspan=\"4\">\r" +
    "\n" +
    "                                            <h3 class=\"text-muted text-center\">ยังไม่มีรายการส่งสำนวนเพื่อตรวจซ้ำ</h3>\r" +
    "\n" +
    "                                        </td>\r" +
    "\n" +
    "                                    </tr>\r" +
    "\n" +
    "                                </tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-12\" style=\"margin-top:2em\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-2\" style=\"padding-right:3em\">หมายเหตุ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-9\">\r" +
    "\n" +
    "                        <textarea class=\"form-control\" rows=\"3\" ng-model=\"editingItem.form2_note\"></textarea>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </fieldset>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"panel-footer\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-success btn-block\" ng-disabled=\"!editingItem.auto_received_num\" ng-click=\"saveForm(editingItem,2,xctrl.f2)\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-block\" ng-click=\"goBack()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_cases_form3.html',
    "<style>\r" +
    "\n" +
    "    .xreadonly{background-color:#F9DADA}\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "        <h2 class=\"text-center\" style=\"margin-top:0px\">จ่ายสำนวนเพื่อตรวจร่างคำพิพากษา {{editingItem.user_id | lookup_court}}</h2>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <form class=\"form form-horizontal readonly\" name=\"form\" style=\"padding-top:25px;padding-bottom:50px;\">\r" +
    "\n" +
    "            <fieldset>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขดำ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_black}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขแดง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_red}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">โจทก์</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.plaintiff}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">จำเลย</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.defendant}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ประเภทคดี</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.type_id | lookup_type:'name':true}} - {{editingItem.type_id | lookup_type}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาพิมพ์ปก</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\" ng-init=\"_xedit=false\">\r" +
    "\n" +
    "                        <div class=\"input-group\">\r" +
    "\n" +
    "                            <input type=\"text\" ng-readonly=\"!_xedit\" class=\"form-control input-md\" ng-model=\"editingItem.title\">\r" +
    "\n" +
    "                            <span class=\"input-group-addon\"  title=\"แก้ไข\" ng-click=\"_xedit=true\"><span class=\"glyphicon glyphicon-pencil\"></span></span>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่รับฟ้อง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_case | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาสถิติ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "   \r" +
    "\n" +
    "                            <div class=\"input-group\" ng-controller=\"TopicsCtrl\" ng-init=\"_xedit2=false\">\r" +
    "\n" +
    "                                <div class=\"form-control\" ng-class=\"{readonly:!_xedit2}\" style=\"height:auto;min-height:36px;\">\r" +
    "\n" +
    "                                    <custom-choices ng-model=\"editingItem.topic_ids\"></custom-choices>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"input-group-addon\" style=\"vertical-align:top;\" title=\"แก้ไข\" id=\"edit-topics\" ng-click=\"ifcall(editingItem.type_id>0,popupTopics, editingItem);_xedit2=true\">\r" +
    "\n" +
    "                                    <span style=\"background:none\"><span class=\"glyphicon glyphicon-pencil\"></span></span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "              \r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ศาลส่งสำนวน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_sent2 | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่ส่งสำนวนของศาล</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_sent2}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ชื่อผู้พิพากษาเจ้าของสำนวน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.judge_id  | lookup_judge}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่นัดฟังคำพิพากษา</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_ap  | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>            \r" +
    "\n" +
    "                <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                <hr />\r" +
    "\n" +
    "                <div ng-if=\"editingItem.auto_received_num\">\r" +
    "\n" +
    "                    <div class=\"col-md-4 col-md-offset-4\">\r" +
    "\n" +
    "                        <h3>เลขรับสำนวน <span class=\"glyphicon glyphicon-paperclip\"></span> {{editingItem.auto_received_num}}</h3>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนพ่วง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                         <div class=\"input-group\">\r" +
    "\n" +
    "                             <div class=\"input-group-addon\"  style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.link_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"  disabled/></div>\r" +
    "\n" +
    "                             <input type=\"text\" readonly  class=\"form-control\" ng-model=\"editingItem.link_ids\" placeholder=\"ไม่มีสำนวนพ่วง\" />\r" +
    "\n" +
    "                         </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนรวม</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div class=\"input-group\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon\" style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.add_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\" disabled/></div>\r" +
    "\n" +
    "                            <p type=\"text\" class=\"form-control\" style=\"background-color:#F9DADA\">\r" +
    "\n" +
    "                                <span  class=\"label label-mr label-black\" ng-repeat=\"key in editingItem.add_ids |split\">{{key}}</span>\r" +
    "\n" +
    "                                <span ng-if=\"!editingItem.add_ids\" class=\"text-muted\">ไม่มีสำนวนรวม</span>\r" +
    "\n" +
    "                            </p>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>      \r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ภาครับสำนวนและร่างคำพิพากษา</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_received3 | thai_date}}\">\r" +
    "\n" +
    "                    \r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            \r" +
    "\n" +
    "                <div class=\"form-group col-md-6 has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">รองอธิบดีฯผู้ตรวจ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge2_id\" data-options=\"judge_jor5_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ อธ. จ่ายสำนวน/หน.ภาค รับสำนวน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <span mode=\"0\" ng-model=\"editingItem.date_at_received1\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            \r" +
    "\n" +
    "                <div class=\"form-group col-md-6 has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">หน.ศาลประจำภาคฯ ผู้ตรวจ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge4_id\" data-options=\"judge_jor5_options\" ></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ รอง อธ. รับสำนวน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <span mode=\"0\" ng-model=\"editingItem.date_at_received2\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6  has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ผลการปฏิบัติ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.result\" data-options=\"result_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">คำสั่ง อธ.</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <select class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.command_id\" select-default ng-options=\"it.id as it.id | lookup_at group by it.checked |iif:'1':'ตรวจ':'ไม่ตรวจ' for it  in Lookups.getAt()\">\r" +
    "\n" +
    "                            <option value=\"\"></option>\r" +
    "\n" +
    "                        </select>\r" +
    "\n" +
    "                        <div ng-if=\"(editingItem.command_id | lookup_at:'checked')=='1'\">\r" +
    "\n" +
    "                            <label class=\"checkbox text-danger\" style=\"padding-left:20px\">\r" +
    "\n" +
    "                                <input type=\"checkbox\" ng-model=\"editingItem.at_correct\" ng-true-value=\"'0'\" ng-false-value=\"'1'\">  ไม่ถูกต้องตามระเบียบ\r" +
    "\n" +
    "                            </label>\r" +
    "\n" +
    "                            <div ng-if=\"editingItem.at_correct=='0'\">\r" +
    "\n" +
    "                                <label style=\"padding-top:0.5em\">เหตุผล</label>\r" +
    "\n" +
    "                                <div class=\"input-group\">\r" +
    "\n" +
    "                                    <select class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.at_result_id\" select-default ng-options=\"it.id as it.id | lookup_at_result  for it  in Lookups.getAtResult()\">\r" +
    "\n" +
    "                                        <option value=\"\"></option>\r" +
    "\n" +
    "                                    </select>\r" +
    "\n" +
    "                                    <span class=\"input-group-addon btn\" id=\"add-at-result\" ng-click=\"popupAtResult()\"><span class=\"glyphicon glyphicon-plus\"></span></span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-12\" style=\"margin-top:2em\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-2\" style=\"padding-right:3em\">หมายเหตุ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-9\">\r" +
    "\n" +
    "                        <textarea class=\"form-control\" rows=\"3\" ng-model=\"editingItem.form3_note\"></textarea>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </fieldset>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"panel-footer\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-success btn-block\" ng-click=\"saveForm(editingItem,2)\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-block\" ng-click=\"goBack()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('views/admin_cases_form4.html',
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "        <h2 class=\"text-center\" style=\"margin-top:0px\">ส่งสำนวนและร่างคำพิพากษาคืนศาล {{editingItem.user_id | lookup_court}}</h2>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <form class=\"form form-horizontal readonly\" name=\"form\" style=\"padding-top:25px;padding-bottom:50px;\">\r" +
    "\n" +
    "            <fieldset>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขดำ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_black}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขแดง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_red}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">โจทก์</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.plaintiff}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">จำเลย</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.defendant}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ประเภทคดี</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.type_id | lookup_type:'name':true}} - {{editingItem.type_id | lookup_type}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาพิมพ์ปก</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.title}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่รับฟ้อง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_case | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาสถิติ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <custom-readonly-topics ng-model=\"editingItem.topic_ids\"></custom-readonly-topics>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ศาลส่งสำนวน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_sent2 | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่ส่งสำนวนของศาล</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_sent2}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ชื่อผู้พิพากษาเจ้าของสำนวน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.judge_id  | lookup_judge}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่นัดฟังคำพิพากษา</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_ap  | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                <hr />\r" +
    "\n" +
    "                <div ng-if=\"editingItem.auto_received_num\">\r" +
    "\n" +
    "                    <div class=\"col-md-4 col-md-offset-4\">\r" +
    "\n" +
    "                        <h3>เลขรับสำนวน <span class=\"glyphicon glyphicon-paperclip\"></span> {{editingItem.auto_received_num}}</h3>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนพ่วง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                         <div class=\"input-group\">\r" +
    "\n" +
    "                             <div class=\"input-group-addon\"  style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.link_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"  disabled/></div>\r" +
    "\n" +
    "                             <input type=\"text\" readonly  class=\"form-control\" ng-model=\"editingItem.link_ids\" placeholder=\"ไม่มีสำนวนพ่วง\" />\r" +
    "\n" +
    "                         </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนรวม</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div class=\"input-group\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon\" style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.add_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\" disabled/></div>\r" +
    "\n" +
    "                            <p type=\"text\" class=\"form-control\" style=\"background-color:#F9DADA\">\r" +
    "\n" +
    "                                <span  class=\"label label-mr label-black\" ng-repeat=\"key in editingItem.add_ids |split\">{{key}}</span>\r" +
    "\n" +
    "                                <span ng-if=\"!editingItem.add_ids\" class=\"text-muted\">ไม่มีสำนวนรวม</span>\r" +
    "\n" +
    "                            </p>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>      \r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ภาครับสำนวนคำพิพากษา</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_received3 | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6  has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ผู้ตรวจ 1 สั่งออก</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge_checkout1_id\" data-options=\"judge_jor5_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6  has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">อธ./รอง อธ./พ.อาวุโส</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge_checkout2_id\" data-options=\"judge_jor5_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6  has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สั่งออกแทน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge2_id\" data-options=\"judge_jor5_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"clearfix\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6 has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">หน.ศาลฯประจำภาค</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge4_id\" data-options=\"judge_jor5_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ภาคส่งสำนวนกลับ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <span mode=\"0\" ng-model=\"editingItem.date_sent5\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                     <div class=\"clearfix\"></div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6  has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ผลการปฏิบัติ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.result\" data-options=\"result_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่ส่งสำนวนกลับของภาค</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" class=\"form-control input-md\" ng-model=\"editingItem.number_sent5\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-12\" style=\"margin-top:2em\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-2\" style=\"padding-right:3em\">หมายเหตุ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-9\">\r" +
    "\n" +
    "                        <textarea class=\"form-control\" rows=\"3\" ng-model=\"editingItem.form4_note\"></textarea>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"col-md-8 col-md-offset-2\" ng-controller=\"AdminForm4Ctrl as f4ctrl\" ng-init=\"xctrl.f4=f4ctrl;load(editingItem.id)\">\r" +
    "\n" +
    "                    <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "                    <div>\r" +
    "\n" +
    "                        <span ios-toggle ng-model=\"editingItem.return_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"></span>\r" +
    "\n" +
    "                        <h4 style=\"display:inline;padding-left:1em\"><strong>ส่งสำนวนคืนเพื่อทบทวนร่างคำพิพากษา</strong></h4>\r" +
    "\n" +
    "                        <!--\r" +
    "\n" +
    "                        <button ng-if=\"editingItem.return_checked=='1'\" ng-click=\"addItem()\" class=\"btn btn-primary pull-right\">\r" +
    "\n" +
    "                            <span class=\"glyphicon glyphicon-plus\"></span> ส่งสำนวนคืน\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "                            -->\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div ng-if=\"editingItem.return_checked=='1'\" style=\"margin-top:1em;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <table class=\"table table-hover table-bordered\">\r" +
    "\n" +
    "                            <thead>\r" +
    "\n" +
    "                                <tr>\r" +
    "\n" +
    "                                    <th>ครั้งที่</th>\r" +
    "\n" +
    "                                    <th>เลขที่ส่ง</th>\r" +
    "\n" +
    "                                    <th>วันที่ส่ง</th>\r" +
    "\n" +
    "                                    <th colspan=\"2\">หมายเหตุ</th>\r" +
    "\n" +
    "                                </tr>\r" +
    "\n" +
    "                            </thead>\r" +
    "\n" +
    "                            <tbody>\r" +
    "\n" +
    "                                <tr ng-repeat=\"it in items\">\r" +
    "\n" +
    "                                    <td width=\"80\" class=\"text-center\"><strong>{{$index+1}}</strong></td>\r" +
    "\n" +
    "                                    <td width=\"25%\"><input type=\"text\" ng-model=\"it['number_return']\" class=\"form-control\" placeholder=\"ยังไม่มีข้อมูล\" /></td>\r" +
    "\n" +
    "                                    <td width=\"25%\"><span mode=\"0\" ng-model=\"it['date_return']\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span></td>\r" +
    "\n" +
    "                                    <td><input class=\"form-control\" ng-model=\"it['note_return']\" /></td>\r" +
    "\n" +
    "                                    <td style=\"width:1em\" class=\"text-danger\"><span class=\"btn\" ng-click=\"setRemoveItem(it)\" title=\"ลบรายการส่งสำนวนคืนนี้ออก\" data-placement=\"left\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.popover.html\" data-auto-close=\"true\"><span class=\"glyphicon glyphicon-remove\"></span></span></td>\r" +
    "\n" +
    "                                </tr>\r" +
    "\n" +
    "                                <tr ng-if=\"!items.length\">\r" +
    "\n" +
    "                                    <td colspan=\"5\">\r" +
    "\n" +
    "                                        <h3 class=\"text-muted text-center\">ยังไม่มีรายการส่งสำนวนคืน</h3>\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                </tr>\r" +
    "\n" +
    "                            </tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </fieldset>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"panel-footer\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-success btn-block\" ng-click=\"saveForm(editingItem,2,xctrl.f4)\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-block\" ng-click=\"goBack()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_cases_form5.html',
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "        <h2 class=\"text-center\" style=\"margin-top:0px\">รับสำเนาคำพิพากษา {{editingItem.user_id | lookup_court}}</h2>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <form class=\"form form-horizontal readonly\" name=\"form\" style=\"padding-top:25px;padding-bottom:50px;\">\r" +
    "\n" +
    "            <fieldset>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขดำ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_black}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขแดง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_red}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">โจทก์</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.plaintiff}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">จำเลย</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.defendant}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ประเภทคดี</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.type_id | lookup_type:'name':true}} - {{editingItem.type_id | lookup_type}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาพิมพ์ปก</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.title}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่รับฟ้อง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_case | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาสถิติ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <custom-readonly-topics ng-model=\"editingItem.topic_ids\"></custom-readonly-topics>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ส่งศาลส่งสำเนาคำพิพากษา</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_sent3 | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่ส่งสำนำคำพิพากษา</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_sent3}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ชื่อผู้พิพากษาเจ้าของสำนวน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.judge_id  | lookup_judge}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่นัดฟังคำพิพากษา</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_ap  | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                <hr />\r" +
    "\n" +
    "                <div ng-if=\"editingItem.auto_received_num\">\r" +
    "\n" +
    "                    <div class=\"col-md-4 col-md-offset-4\">\r" +
    "\n" +
    "                        <h3>เลขรับสำนวน <span class=\"glyphicon glyphicon-paperclip\"></span> {{editingItem.auto_received_num}}</h3>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนพ่วง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                         <div class=\"input-group\">\r" +
    "\n" +
    "                             <div class=\"input-group-addon\"  style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.link_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"  disabled/></div>\r" +
    "\n" +
    "                             <input type=\"text\" readonly  class=\"form-control\" ng-model=\"editingItem.link_ids\" placeholder=\"ไม่มีสำนวนพ่วง\" />\r" +
    "\n" +
    "                         </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนรวม</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div class=\"input-group\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon\" style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.add_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\" disabled/></div>\r" +
    "\n" +
    "                            <p type=\"text\" class=\"form-control\" style=\"background-color:#F9DADA\">\r" +
    "\n" +
    "                                <span  class=\"label label-mr label-black\" ng-repeat=\"key in editingItem.add_ids |split\">{{key}}</span>\r" +
    "\n" +
    "                                <span ng-if=\"!editingItem.add_ids\" class=\"text-muted\">ไม่มีสำนวนรวม</span>\r" +
    "\n" +
    "                            </p>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>                \r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ภาครับร่างคำพิพากษาที่ตรวจแล้วเสร็จ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <span mode=\"0\" ng-model=\"editingItem.date_received4\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            \r" +
    "\n" +
    "                <div class=\"form-group col-md-6 has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ชื่อผู้พิพากษาผู้ตรวจ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "               \r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge2_id\" data-options=\"judge_jor5_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "          \r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่รับของภาค</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" class=\"form-control input-md\" ng-model=\"editingItem.number_received4\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            \r" +
    "\n" +
    "                <div class=\"form-group col-md-6  has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ชื่อผู้พิพากษาผู้ตรวจ2</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "        \r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge4_id\" data-options=\"judge_jor5_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6  has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ผลการปฏิบัติ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.result\" data-options=\"result_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"col-md-12\" style=\"margin-top:2em\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-2\" style=\"padding-right:3em\">หมายเหตุ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-9\">\r" +
    "\n" +
    "                        <textarea class=\"form-control\" rows=\"3\" ng-model=\"editingItem.form5_note\"></textarea>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </fieldset>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"panel-footer\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-success btn-block\" ng-click=\"saveForm(editingItem,2)\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-block\" ng-click=\"goBack()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_manages.html',
    "<div ui-view></div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_manages_menu.html',
    "<h1 class=\"page-header text-center\">\r" +
    "\n" +
    "เตรียมข้อมูล\r" +
    "\n" +
    "</h1>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row\">\r" +
    "\n" +
    "      <div class=\"col-md-4 col-lg-3\">\r" +
    "\n" +
    "            <a href=\"#admin/manages/users\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-user\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">ผู้ใช้</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"col-md-4 col-lg-3\">\r" +
    "\n" +
    "            <a href=\"#admin/manages/types\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-briefcase\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">ประเภทคดี</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "       </div>\r" +
    "\n" +
    "       <div class=\"col-md-4 col-lg-3\">\r" +
    "\n" +
    "            <a href=\"#admin/manages/topics\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-tasks\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">ข้อหา</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4 col-lg-3\">\r" +
    "\n" +
    "            <a href=\"#admin/manages/results\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-check\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">ผลการปฏิบัติ</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4 col-lg-3\">\r" +
    "\n" +
    "            <a href=\"#admin/manages/ats\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-share\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">คำสั่ง อ.ธ</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4 col-lg-3\">\r" +
    "\n" +
    "            <a href=\"#admin/manages/at_results\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-share\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">เหตุผลไม่ตามระเบียบ</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4 col-lg-3\">\r" +
    "\n" +
    "            <a href=\"#admin/manages/settings\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\t\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-cog\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">ตั้งค่าระบบ</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4 col-lg-3\">\r" +
    "\n" +
    "            <a href=\"#admin/menu\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\t\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-th-large\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">เมนูหลัก</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_menu.html',
    "<style>\r" +
    "\n" +
    ".bg1{\r" +
    "\n" +
    "\tmargin-top:-60px;\r" +
    "\n" +
    "\tdisplay: block;\r" +
    "\n" +
    "\tposition:relative;\r" +
    "\n" +
    "\tbackground-image: url('images/bg.png');\r" +
    "\n" +
    "\tbackground-repeat:no-repeat;\r" +
    "\n" +
    "\tbackground-position:  center;\r" +
    "\n" +
    "\twidth: 600px;\r" +
    "\n" +
    "\theight:322px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".bg1-btn{\r" +
    "\n" +
    "\tdisplay: block;\r" +
    "\n" +
    "\tposition: absolute;\r" +
    "\n" +
    "\tcursor:pointer;\r" +
    "\n" +
    "\topacity:1;\r" +
    "\n" +
    "\tbackground-repeat:no-repeat;\r" +
    "\n" +
    "\tbackground-position:  center;\r" +
    "\n" +
    "\tbackground-size: cover;\r" +
    "\n" +
    "\twidth: 120px !important;\r" +
    "\n" +
    "\theight: 120px !important;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".bg1-btn1{\r" +
    "\n" +
    "\tbackground-image: url('images/menu1.png');\r" +
    "\n" +
    "\tleft:-90px;  top:180px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".bg1-btn2{\r" +
    "\n" +
    "\tbackground-image: url('images/menu2.png');\r" +
    "\n" +
    "\tleft:80px;  bottom:-50px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".bg1-btn3{\r" +
    "\n" +
    "\tbackground-image: url('images/menu3.png');\r" +
    "\n" +
    "\tleft:250px;  bottom:-100px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".bg1-btn4{\r" +
    "\n" +
    "\tbackground-image: url('images/exit.png');\r" +
    "\n" +
    "\tright:-110px;  top:180px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".bg1-btn5{\r" +
    "\n" +
    "\tbackground-image: url('images/menu5.png');\r" +
    "\n" +
    "\tright:60px;  bottom:-50px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".bg1-btn1:hover, .bg1-btn2:hover, .bg1-btn3:hover, .bg1-btn4:hover, .bg1-btn5:hover{\r" +
    "\n" +
    "\topacity:1 !important;\r" +
    "\n" +
    "\tfilter: saturate(200%);\r" +
    "\n" +
    "\t-webkit-filter: saturate(200%);\r" +
    "\n" +
    "\t-mos-filter: saturate(200%);\r" +
    "\n" +
    "\t-ms-filter: saturate(200%);\r" +
    "\n" +
    "\t-o: saturate(200%);\r" +
    "\n" +
    "\ttransform: scale(1.5,1.5);\r" +
    "\n" +
    "\t-webkit-transform: scale(1.5,1.5);\r" +
    "\n" +
    "\t-mos-transform: scale(1.5,1.5);\r" +
    "\n" +
    "\t-ms-transform: scale(1.5,1.5);\r" +
    "\n" +
    "\t-o-transform: scale(1.5,1.5);\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "<!--\r" +
    "\n" +
    "<h2 class=\"page-header text-center\" style=\"border-bottom:none\">\r" +
    "\n" +
    "    ระบบสารสนเทศการรายงานคดีและติดตามสำนวนที่ส่งตรวจร่างคำพิพากษา<br />\r" +
    "\n" +
    "    <small>สำนักงานอธิบดีผู้พิพากษาภาค 5</small>\r" +
    "\n" +
    "</h2>\r" +
    "\n" +
    "-->\r" +
    "\n" +
    "<div  class=\"bg1 center-block\">\r" +
    "\n" +
    "\t<div class=\"bg1-btn bg1-btn1\" ng-click=\"goTo('admin.acases')\"></div>\r" +
    "\n" +
    "\t<div class=\"bg1-btn bg1-btn2\" ng-click=\"goTo('admin.cases')\"></div>\r" +
    "\n" +
    "\t<div class=\"bg1-btn bg1-btn3\" ng-click=\"goTo('admin.vcases')\"></div>\r" +
    "\n" +
    "\t<div class=\"bg1-btn bg1-btn4\" data-placement=\"left\" data-trigger=\"click\" bs-popover data-template=\"custom.logout.popover.html\" data-auto-close=\"true\"></div>\r" +
    "\n" +
    "\t<div class=\"bg1-btn bg1-btn5\" ng-click=\"goTo('admin.manages.menu')\"></div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_print_report1.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\">\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "\t\t<div class=\"panel panel-default\">\n" +
    "\t\t  <div class=\"panel-heading\">\n" +
    "\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\n" +
    "\t\t    \t<h4 class=\"text-info\">สรุปรายงานคดีของศาลในเขตอำนาจอธิบดีผู้พิพากษาภาค 5</h4>\n" +
    "\t\t  </div>\n" +
    "\t\t  <div class=\"panel-body\">\n" +
    "\t\t  \t<div class=\"row\">\n" +
    "\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\n" +
    "\t\t  \t<form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/report1.php\" target=\"_blank\">\n" +
    "\t\t  \t<input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\n" +
    "\t\t  \t<input type=\"hidden\" name=\"date2\" value=\"{{options.date_to}}\">\n" +
    "\t\t  \t<input type=\"hidden\" name=\"type_id\" value=\"{{options.type_id}}\">\n" +
    "\t   \t\t\t<div class=\"form-group\">\n" +
    "\t            \t<label class=\"control-label\">ประเภทคดี</label>\n" +
    "\t            \t<select class=\"form-control\" ng-model=\"options.type_id\" select-value-type=\"string\" ng-options=\"it.id as it.name group by toGroupName(it.group_id) for it in Lookups.getType() \">\n" +
    "\t            \t<option value=\"\">-- ทุกประเภทคดี --</option>\n" +
    "\t            \t</select>\n" +
    "\t\t\t\t</div>\n" +
    "      \t                  \t\t  \n" +
    "        \t\t<label>ภาครับหนังสือ</label>\n" +
    "        \t\t<div class=\"row\">\n" +
    "        \t\t\t<div class=\"col-md-12\">\n" +
    "                    \t<span mode=\"1\"  ng-model=\"options.date_from\"  placeholder=\"เริ่มตั้งแต่เดือน\" custom-date-field></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <br>\n" +
    "\t\t\t\t<div class=\"row\">\n" +
    "                    <div class=\"col-md-12\">\n" +
    "                    \t<span mode=\"1\"  ng-model=\"options.date_to\"  placeholder=\"ถึงเดือน\" custom-date-field></span>\n" +
    "                    </div>\n" +
    "                    \n" +
    "            \t</div>\n" +
    "            \t<hr>\n" +
    "            \t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "            \t\t<button class=\"btn btn-primary btn-block\" ng-disabled=\"!options.date_from\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\n" +
    " \t\t\t\t</div>\n" +
    " \t\t\t</form>\n" +
    " \t\t\t</div>\n" +
    " \t\t\t</div>\n" +
    "\t\t  </div>\n" +
    "\t\t</div>\n" +
    "\t<div>\n" +
    "<div>"
  );


  $templateCache.put('views/admin_print_report10.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\">\r" +
    "\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "\t\t<div class=\"panel panel-default\">\r" +
    "\n" +
    "\t\t  <div class=\"panel-heading\">\r" +
    "\n" +
    "\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\r" +
    "\n" +
    "\t\t    \t<h4 class=\"text-info\">บัญชีรายละเอียดสำนวนที่ไม่ได้ส่งสำเนาคำพิพากษาให้สำนักงานอธิบดีผู้พิพากษาภาค 5</h4>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t  <div class=\"panel-body\">\r" +
    "\n" +
    "\t\t  \t<div class=\"row\">\r" +
    "\n" +
    "\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\r" +
    "\n" +
    "              <form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/report10.php\" target=\"_blank\">\r" +
    "\n" +
    "                  <input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\r" +
    "\n" +
    "                  <input type=\"hidden\" name=\"type_id\" value=\"{{options.type_id}}\">\r" +
    "\n" +
    "                  <input type=\"hidden\" name=\"user_id\" value=\"{{options.user_id}}\">\r" +
    "\n" +
    "                  <div class=\"form-group\">\r" +
    "\n" +
    "                      <label class=\"control-label\">ประเภทคดี</label>\r" +
    "\n" +
    "                      <select class=\"form-control\" ng-model=\"options.type_id\" select-value-type=\"string\" ng-options=\"it.id as it.name group by toGroupName(it.group_id) for it in Lookups.getType() \">\r" +
    "\n" +
    "                          <option value=\"\">-- ทุกประเภทคดี --</option>\r" +
    "\n" +
    "                      </select>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                  <div class=\"form-group\">\r" +
    "\n" +
    "                      <label class=\"control-label\">ศาล</label>\r" +
    "\n" +
    "                      <select class=\"form-control\" ng-model=\"options.user_id\" select-value-type=\"string\" ng-options=\"it.id as it.name  for it in Lookups.getCourt() \">\r" +
    "\n" +
    "                          <option value=\"\">-- ทุกศาล --</option>\r" +
    "\n" +
    "                      </select>\r" +
    "\n" +
    "                  </div>\t\r" +
    "\n" +
    "                  <label>คดีเกิดในปี</label>\r" +
    "\n" +
    "                  <div class=\"row\">\r" +
    "\n" +
    "                      <div class=\"col-md-12\">\r" +
    "\n" +
    "                          <span mode=\"2\" ng-model=\"options.date_from\" placeholder=\"ปี\" custom-date-field></span>\r" +
    "\n" +
    "                      </div>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                  <hr>\r" +
    "\n" +
    "                  <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                      <button class=\"btn btn-primary btn-block\" ng-disabled=\"!(options.date_from)\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "              </form>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t<div>\r" +
    "\n" +
    "<div>"
  );


  $templateCache.put('views/admin_print_report11.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\">\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "\t\t<div class=\"panel panel-default\">\n" +
    "\t\t  <div class=\"panel-heading\">\n" +
    "\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\n" +
    "\t\t    \t<h4 class=\"text-info\">รายงานระยะเวลาการตรวจสำนวนและร่างคำพิพากษา</h4>\n" +
    "\t\t  </div>\n" +
    "\t\t  <div class=\"panel-body\">\n" +
    "\t\t  \t<div class=\"row\">\n" +
    "\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\n" +
    "\t\t  \t<form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/report11.php\" target=\"_blank\">\n" +
    "\t\t  \t<input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\n" +
    "\t\t  \t<input type=\"hidden\" name=\"date2\" value=\"{{options.date_to}}\">\n" +
    "      \t                  \t\t  \n" +
    "        \t\t<label>ภาครับหนังสือ</label>\n" +
    "        \t\t<div class=\"row\">\n" +
    "        \t\t\t<div class=\"col-md-12\">\n" +
    "                    \t<span mode=\"1\"  ng-model=\"options.date_from\"  placeholder=\"เริ่มตั้งแต่เดือน\" custom-date-field></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <br>\n" +
    "\t\t\t\t<div class=\"row\">\n" +
    "                    <div class=\"col-md-12\">\n" +
    "                    \t<span mode=\"1\"  ng-model=\"options.date_to\"  placeholder=\"ถึงเดือน\" custom-date-field></span>\n" +
    "                    </div>\n" +
    "                    \n" +
    "            \t</div>\n" +
    "            \t<hr>\n" +
    "            \t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "            \t\t<button class=\"btn btn-primary btn-block\" ng-disabled=\"!options.date_from\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\n" +
    " \t\t\t\t</div>\n" +
    " \t\t\t</form>\n" +
    " \t\t\t</div>\n" +
    " \t\t\t</div>\n" +
    "\t\t  </div>\n" +
    "\t\t</div>\n" +
    "\t<div>\n" +
    "<div>"
  );


  $templateCache.put('views/admin_print_report12.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\">\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "\t\t<div class=\"panel panel-default\">\n" +
    "\t\t  <div class=\"panel-heading\">\n" +
    "\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\n" +
    "\t\t    \t<h4 class=\"text-info\">รายงานระยะเวลาการตรวจสำนวนและร่างคำพิพากษา</h4>\n" +
    "\t\t  </div>\n" +
    "\t\t  <div class=\"panel-body\">\n" +
    "\t\t  \t<div class=\"row\">\n" +
    "\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\n" +
    "\t\t  \t<form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/report12.php\" target=\"_blank\">\n" +
    "\t\t  \t<input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\n" +
    "\t\t  \t<input type=\"hidden\" name=\"date2\" value=\"{{options.date_to}}\">\n" +
    "      \t                  \t\t  \n" +
    "        \t\t<label>ภาครับหนังสือ</label>\n" +
    "        \t\t<div class=\"row\">\n" +
    "        \t\t\t<div class=\"col-md-12\">\n" +
    "                    \t<span mode=\"1\"  ng-model=\"options.date_from\"  placeholder=\"เริ่มตั้งแต่เดือน\" custom-date-field></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <br>\n" +
    "\t\t\t\t<div class=\"row\">\n" +
    "                    <div class=\"col-md-12\">\n" +
    "                    \t<span mode=\"1\"  ng-model=\"options.date_to\"  placeholder=\"ถึงเดือน\" custom-date-field></span>\n" +
    "                    </div>\n" +
    "                    \n" +
    "            \t</div>\n" +
    "            \t<hr>\n" +
    "            \t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "            \t\t<button class=\"btn btn-primary btn-block\" ng-disabled=\"!options.date_from\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\n" +
    " \t\t\t\t</div>\n" +
    " \t\t\t</form>\n" +
    " \t\t\t</div>\n" +
    " \t\t\t</div>\n" +
    "\t\t  </div>\n" +
    "\t\t</div>\n" +
    "\t<div>\n" +
    "<div>"
  );


  $templateCache.put('views/admin_print_report13.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\">\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "\t\t<div class=\"panel panel-default\">\n" +
    "\t\t\t  <div class=\"panel-heading\">\n" +
    "\t\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\n" +
    "\t\t\t    \t<h4 class=\"text-info\">รายงานระยะเวลาการตรวจสำนวนและร่างคำพิพากษา (รอง อธ.)</h4>\n" +
    "\t\t\t  </div>\n" +
    "\t\t  \t<div class=\"panel-body\">\n" +
    "\t\t\t  \t<div class=\"row\">\n" +
    "\t\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\n" +
    "\t\t\t  \t\t<form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/report13.php\" target=\"_blank\">\n" +
    "\t\t\t  \t\t\t<input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\n" +
    "\t\t\t  \t\t\t<input type=\"hidden\" name=\"date2\" value=\"{{options.date_to}}\">\n" +
    "\t\t\t  \t\t\t<input type=\"hidden\" name=\"judge_id\" value=\"{{options.judge_id}}\">\n" +
    "\n" +
    "\t\t\t  \t\t\t<label>ผู้พิพากษาเจ้าของสำนวน (ภาค)</label>\n" +
    "\t\t\t                   \t\t<div class=\"row\">\n" +
    "\t\t\t\t\t            \t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t                       \t<div custom-dropdown class=\"form-control input-md\" ng-model=\"options.judge_id\" data-options=\"judge_atjor5_options\"></div>\n" +
    "\t\t\t\t\t                       \t<span class=\"form-control-feedback\"><span class=\"caret\" style=\"margin-right:2em\"></span></span>\n" +
    "\t\t\t\t\t           \t\t</div>\n" +
    "\t\t\t\t           \t\t</div>\n" +
    "\n" +
    "\t\t\t\t        \t\t<label>เดือนที่รับสำนวน</label>\n" +
    "\t\t\t\t        \t\t<div class=\"row\">\n" +
    "\t\t\t\t        \t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t                    \t\t\t<span mode=\"1\"  ng-model=\"options.date_from\"  placeholder=\"เริ่มตั้งแต่เดือน\" custom-date-field></span>\n" +
    "\t\t\t\t                   \t\t </div>\n" +
    "\t\t\t\t                \t</div>\n" +
    "\t\t\t           \t\t\t<br>\n" +
    "\t\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t                    <div class=\"col-md-12\">\n" +
    "\t\t\t\t\t                    \t<span mode=\"1\"  ng-model=\"options.date_to\"  placeholder=\"ถึงเดือน\" custom-date-field></span>\n" +
    "\t\t\t\t\t                    </div>\n" +
    "\t\t\t\t            \t</div>\n" +
    "\t\t\t            \t\t<hr>\n" +
    "\t\t\t            \t\t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "\t\t\t            \t\t\t<button class=\"btn btn-primary btn-block\" ng-disabled=\"!(options.judge_id && options.date_from)\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\n" +
    "\t\t\t \t\t\t</div>\n" +
    " \t\t\t\t\t</form>\n" +
    " \t\t\t\t</div>\n" +
    " \t\t\t\t</div>\n" +
    " \t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t<div>\n" +
    "<div>"
  );


  $templateCache.put('views/admin_print_report14.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\">\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "\t\t<div class=\"panel panel-default\">\n" +
    "\t\t\t  <div class=\"panel-heading\">\n" +
    "\t\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\n" +
    "\t\t\t    \t<h4 class=\"text-info\">รายงานระยะเวลาการตรวจสำนวนและร่างคำพิพากษา (หัวหน้าภาค)</h4>\n" +
    "\t\t\t  </div>\n" +
    "\t\t  \t<div class=\"panel-body\">\n" +
    "\t\t\t  \t<div class=\"row\">\n" +
    "\t\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\n" +
    "\t\t\t  \t\t<form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/report14.php\" target=\"_blank\">\n" +
    "\t\t\t  \t\t\t<input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\n" +
    "\t\t\t  \t\t\t<input type=\"hidden\" name=\"date2\" value=\"{{options.date_to}}\">\n" +
    "\t\t\t  \t\t\t<input type=\"hidden\" name=\"judge_id\" value=\"{{options.judge_id}}\">\n" +
    "\n" +
    "\t\t\t  \t\t\t<label>ผู้พิพากษาเจ้าของสำนวน (ภาค)</label>\n" +
    "\t\t\t                   \t\t<div class=\"row\">\n" +
    "\t\t\t\t\t            \t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t                       \t<div custom-dropdown class=\"form-control input-md\" ng-model=\"options.judge_id\" data-options=\"judge_headjor5_options\"></div>\n" +
    "\t\t\t\t\t                       \t<span class=\"form-control-feedback\"><span class=\"caret\" style=\"margin-right:2em\"></span></span>\n" +
    "\t\t\t\t\t           \t\t</div>\n" +
    "\t\t\t\t           \t\t</div>\n" +
    "\n" +
    "\t\t\t\t        \t\t<label>เดือนที่รับสำนวน</label>\n" +
    "\t\t\t\t        \t\t<div class=\"row\">\n" +
    "\t\t\t\t        \t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t                    \t\t\t<span mode=\"1\"  ng-model=\"options.date_from\"  placeholder=\"เริ่มตั้งแต่เดือน\" custom-date-field></span>\n" +
    "\t\t\t\t                   \t\t </div>\n" +
    "\t\t\t\t                \t</div>\n" +
    "\t\t\t           \t\t\t<br>\n" +
    "\t\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t                    <div class=\"col-md-12\">\n" +
    "\t\t\t\t\t                    \t<span mode=\"1\"  ng-model=\"options.date_to\"  placeholder=\"ถึงเดือน\" custom-date-field></span>\n" +
    "\t\t\t\t\t                    </div>\n" +
    "\t\t\t\t            \t</div>\n" +
    "\t\t\t            \t\t<hr>\n" +
    "\t\t\t            \t\t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "\t\t\t            \t\t\t<button class=\"btn btn-primary btn-block\" ng-disabled=\"!(options.judge_id && options.date_from)\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\n" +
    "\t\t\t \t\t\t</div>\n" +
    " \t\t\t\t\t</form>\n" +
    " \t\t\t\t</div>\n" +
    " \t\t\t\t</div>\n" +
    " \t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t<div>\n" +
    "<div>"
  );


  $templateCache.put('views/admin_print_report15.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\">\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "\t\t<div class=\"panel panel-default\">\n" +
    "\t\t\t  <div class=\"panel-heading\">\n" +
    "\t\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\n" +
    "\t\t\t    \t<h4 class=\"text-info\">บัญชีรายงานการตรวจสำนวนและสั่งออกร่างคำพิพากษา</h4>\n" +
    "\t\t\t  </div>\n" +
    "\t\t  \t<div class=\"panel-body\">\n" +
    "\t\t\t  \t<div class=\"row\">\n" +
    "\t\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\n" +
    "\t\t\t  \t\t<form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/report15.php\" target=\"_blank\">\n" +
    "\t\t\t  \t\t\t<input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\n" +
    "\t\t\t  \t\t\t<input type=\"hidden\" name=\"date2\" value=\"{{options.date_to}}\">\n" +
    "\n" +
    "\n" +
    "\t\t\t\t        \t\t<label>ประจำเดือน</label>\n" +
    "\t\t\t\t        \t\t<div class=\"row\">\n" +
    "\t\t\t\t        \t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t                    \t\t\t<span mode=\"1\"  ng-model=\"options.date_from\"  placeholder=\"เริ่มตั้งแต่เดือน\" custom-date-field></span>\n" +
    "\t\t\t\t                   \t\t </div>\n" +
    "\t\t\t\t                \t</div>\n" +
    "\t\t\t           \t\t\t<br>\n" +
    "\t\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t                    <div class=\"col-md-12\">\n" +
    "\t\t\t\t\t                    \t<span mode=\"1\"  ng-model=\"options.date_to\"  placeholder=\"ถึงเดือน\" custom-date-field></span>\n" +
    "\t\t\t\t\t                    </div>\n" +
    "\t\t\t\t            \t</div>\n" +
    "\t\t\t            \t\t<hr>\n" +
    "\t\t\t            \t\t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "\t\t\t            \t\t\t<button class=\"btn btn-primary btn-block\" ng-disabled=\"!(options.date_from)\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\n" +
    "\t\t\t \t\t\t</div>\n" +
    " \t\t\t\t\t</form>\n" +
    " \t\t\t\t</div>\n" +
    " \t\t\t\t</div>\n" +
    " \t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t<div>\n" +
    "<div>"
  );


  $templateCache.put('views/admin_print_report2.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\">\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "\t\t<div class=\"panel panel-default\">\n" +
    "\t\t  <div class=\"panel-heading\">\n" +
    "\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\n" +
    "\t\t    \t<h4 class=\"text-info\">แบบแสดงจำนวนรายงานคดีที่จัดส่งสำนักงานอธิบดีผู้พิพากษาภาค 5</h4>\n" +
    "\t\t  </div>\n" +
    "\t\t  <div class=\"panel-body\">\n" +
    "\t\t  \t<div class=\"row\">\n" +
    "\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\n" +
    "\t\t  \t<form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/report2.php\" target=\"_blank\">\n" +
    "\t\t  \t<input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\n" +
    "\t\t  \t<input type=\"hidden\" name=\"date2\" value=\"{{options.date_to}}\">\n" +
    "\t\t  \t<input type=\"hidden\" name=\"type_id\" value=\"{{options.type_id}}\">\n" +
    "\t\t  \t<input type=\"hidden\" name=\"user_id\" value=\"{{options.user_id}}\">\n" +
    "\t   \t\t\t<div class=\"form-group\">\n" +
    "\t            \t<label class=\"control-label\">ประเภทคดี</label>\n" +
    "\t            \t<select class=\"form-control\" ng-model=\"options.type_id\" select-value-type=\"string\" ng-options=\"it.id as it.name group by toGroupName(it.group_id) for it in Lookups.getType() \">\n" +
    "\t            \t<option value=\"\">-- ทุกประเภทคดี --</option>\n" +
    "\t            \t</select>\n" +
    "\t\t\t\t</div>\n" +
    "\t   \t\t\t<div class=\"form-group\">\n" +
    "\t            \t<label class=\"control-label\">ศาล</label>\n" +
    "\t            \t<select class=\"form-control\" ng-model=\"options.user_id\" select-value-type=\"string\" ng-options=\"it.id as it.name  for it in Lookups.getCourt() \">\n" +
    "\t            \t</select>\n" +
    "\t\t\t\t</div>\t\t  \n" +
    "        \t\t<label>ภาครับหนังสือ</label>\n" +
    "        \t\t<div class=\"row\">\n" +
    "        \t\t\t<div class=\"col-md-12\">\n" +
    "                    \t<span mode=\"1\"  ng-model=\"options.date_from\"  placeholder=\"เริ่มตั้งแต่เดือน\" custom-date-field></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <br>\n" +
    "\t\t\t\t<div class=\"row\">\n" +
    "                    <div class=\"col-md-12\">\n" +
    "                    \t<span mode=\"1\"  ng-model=\"options.date_to\"  placeholder=\"ถึงเดือน\" custom-date-field></span>\n" +
    "                    </div>\n" +
    "                    \n" +
    "            \t</div>\n" +
    "            \t<hr>\n" +
    "            \t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "            \t\t<button class=\"btn btn-primary btn-block\" ng-disabled=\"!(options.date_from && options.user_id)\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\n" +
    " \t\t\t\t</div>\n" +
    " \t\t\t</form>\n" +
    " \t\t\t</div>\n" +
    " \t\t\t</div>\n" +
    "\t\t  </div>\n" +
    "\t\t</div>\n" +
    "\t<div>\n" +
    "<div>"
  );


  $templateCache.put('views/admin_print_report4.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\" ng-init=\"options.date_from=today()\">\r" +
    "\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "\t\t<div class=\"panel panel-default\">\r" +
    "\n" +
    "\t\t  <div class=\"panel-heading\">\r" +
    "\n" +
    "\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\r" +
    "\n" +
    "\t\t    \t<h4 class=\"text-info\">รายงานข้อมูลการจัดส่งสำนวนเพื่อตรวจร่างคำพิพากษาของศาลในภาค5</h4>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t  <div class=\"panel-body\">\r" +
    "\n" +
    "\t\t  \t<div class=\"row\">\r" +
    "\n" +
    "\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\r" +
    "\n" +
    "\t\t  \t<form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/report4.php\" target=\"_blank\">\r" +
    "\n" +
    "\t\t  \t<input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\r" +
    "\n" +
    "              <input type=\"hidden\" name=\"type_id\" value=\"{{options.type_id}}\">\r" +
    "\n" +
    "              <div class=\"form-group\">\r" +
    "\n" +
    "                  <label class=\"control-label\">ประเภทคดี</label>\r" +
    "\n" +
    "                  <select class=\"form-control\" ng-model=\"options.type_id\" select-value-type=\"string\" ng-options=\"it.id as it.id |lookup_type:'name':'code' group by toGroupName(it.group_id) for it in Lookups.getType() \">\r" +
    "\n" +
    "                      <option value=\"\">-- ทุกประเภทคดี --</option>\r" +
    "\n" +
    "                  </select>\r" +
    "\n" +
    "              </div>\t  \r" +
    "\n" +
    "        \t\t<label>ภาครับสำนวน</label>\r" +
    "\n" +
    "        \t\t<div class=\"row\">\r" +
    "\n" +
    "        \t\t\t<div class=\"col-md-12\">\r" +
    "\n" +
    "                    \t<span mode=\"0\"  ng-model=\"options.date_from\"  placeholder=\"วันที่\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "               \r" +
    "\n" +
    "            \t<hr>\r" +
    "\n" +
    "            \t<div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "            \t\t<button class=\"btn btn-primary btn-block\" ng-disabled=\"!options.date_from\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\r" +
    "\n" +
    " \t\t\t\t</div>\r" +
    "\n" +
    " \t\t\t</form>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t<div>\r" +
    "\n" +
    "<div>"
  );


  $templateCache.put('views/admin_print_report5.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\">\r" +
    "\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "\t\t<div class=\"panel panel-default\">\r" +
    "\n" +
    "\t\t  <div class=\"panel-heading\">\r" +
    "\n" +
    "\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\r" +
    "\n" +
    "\t\t    \t<h4 class=\"text-info\">รายงานข้อมูลการจัดส่งสำนวนเพื่อตรวจร่างคำพิพากษาของศาลในภาค5</h4>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t  <div class=\"panel-body\">\r" +
    "\n" +
    "\t\t  \t<div class=\"row\">\r" +
    "\n" +
    "\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\r" +
    "\n" +
    "\t\t  \t<form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/report5.php\" target=\"_blank\">\r" +
    "\n" +
    "\t\t  \t<input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\r" +
    "\n" +
    "\t\t  \t<input type=\"hidden\" name=\"date2\" value=\"{{options.date_to}}\">\r" +
    "\n" +
    "\t\t  \t<input type=\"hidden\" name=\"type_id\" value=\"{{options.type_id}}\">\r" +
    "\n" +
    "              <input type=\"hidden\" name=\"user_id\" value=\"{{options.user_id}}\">\r" +
    "\n" +
    "\t   \t\t\t<div class=\"form-group\">\r" +
    "\n" +
    "\t            \t<label class=\"control-label\">ประเภทคดี</label>\r" +
    "\n" +
    "\t            \t<select class=\"form-control\" ng-model=\"options.type_id\" select-value-type=\"string\" ng-options=\"it.id as it.name group by toGroupName(it.group_id) for it in Lookups.getType() \">\r" +
    "\n" +
    "\t            \t<option value=\"\">-- ทุกประเภทคดี --</option>\r" +
    "\n" +
    "\t            \t</select>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "              <div class=\"form-group\">\r" +
    "\n" +
    "                  <label class=\"control-label\">ศาล</label>\r" +
    "\n" +
    "                  <select class=\"form-control\" ng-model=\"options.user_id\" select-value-type=\"string\" ng-options=\"it.id as it.name  for it in Lookups.getCourt() \">\r" +
    "\n" +
    "                      <option value=\"\">-- ทุกศาล --</option> \r" +
    "\n" +
    "                  </select>\r" +
    "\n" +
    "              </div>\t\t  \r" +
    "\n" +
    "        \t\t<label>ภาครับสำนวน</label>\r" +
    "\n" +
    "        \t\t<div class=\"row\">\r" +
    "\n" +
    "        \t\t\t<div class=\"col-md-12\">\r" +
    "\n" +
    "                    \t<span mode=\"1\"  ng-model=\"options.date_from\"  placeholder=\"เริ่มตั้งแต่เดือน\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <br>\r" +
    "\n" +
    "\t\t\t\t<div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-md-12\">\r" +
    "\n" +
    "                    \t<span mode=\"1\"  ng-model=\"options.date_to\"  placeholder=\"ถึงเดือน\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    \r" +
    "\n" +
    "            \t</div>\r" +
    "\n" +
    "            \t<hr>\r" +
    "\n" +
    "            \t<div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "            \t\t<button class=\"btn btn-primary btn-block\" ng-disabled=\"!options.date_from\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\r" +
    "\n" +
    " \t\t\t\t</div>\r" +
    "\n" +
    " \t\t\t</form>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t<div>\r" +
    "\n" +
    "<div>"
  );


  $templateCache.put('views/admin_print_report6.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\">\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "\t\t<div class=\"panel panel-default\">\n" +
    "\t\t  <div class=\"panel-heading\">\n" +
    "\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\n" +
    "\t\t    \t<h4 class=\"text-info\">รายงานข้อมูลการจัดส่งสำนวนเพื่อตรวจร่างคำพิพากษาของศาลในภาค5</h4>\n" +
    "\t\t  </div>\n" +
    "\t\t  <div class=\"panel-body\">\n" +
    "\t\t  \t<div class=\"row\">\n" +
    "\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\n" +
    "\t\t  \t<form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/report6.php\" target=\"_blank\">\n" +
    "\t\t  \t<input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\n" +
    "\t\t  \t<input type=\"hidden\" name=\"type_id\" value=\"{{options.type_id}}\">\n" +
    "\t   \t\t\t<div class=\"form-group\">\n" +
    "\t            \t<label class=\"control-label\">ประเภทคดี</label>\n" +
    "\t            \t<select class=\"form-control\" ng-model=\"options.type_id\" select-value-type=\"string\" ng-options=\"it.id as it.name group by toGroupName(it.group_id) for it in Lookups.getType() \">\n" +
    "\t            \t<option value=\"\">-- ทุกประเภทคดี --</option>\n" +
    "\t            \t</select>\n" +
    "\t\t\t\t</div>\n" +
    "      \t                  \t\t  \n" +
    "        \t\t<label>ภาครับสำนวน</label>\n" +
    "        \t\t<div class=\"row\">\n" +
    "        \t\t\t<div class=\"col-md-12\">\n" +
    "                    \t<span mode=\"1\"  ng-model=\"options.date_from\"  placeholder=\"เดือน\" custom-date-field></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            \t<hr>\n" +
    "            \t<div class=\"col-md-6 col-md-offset-3\">\n" +
    "            \t\t<button class=\"btn btn-primary btn-block\" ng-disabled=\"!options.date_from\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\n" +
    " \t\t\t\t</div>\n" +
    " \t\t\t</form>\n" +
    " \t\t\t</div>\n" +
    " \t\t\t</div>\n" +
    "\t\t  </div>\n" +
    "\t\t</div>\n" +
    "\t<div>\n" +
    "<div>"
  );


  $templateCache.put('views/admin_print_report7.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\">\r" +
    "\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "\t\t<div class=\"panel panel-default\">\r" +
    "\n" +
    "\t\t  <div class=\"panel-heading\">\r" +
    "\n" +
    "\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\r" +
    "\n" +
    "\t\t    \t<h4 class=\"text-info\">รายงานข้อมูลการจัดส่งสำนวนเพื่อตรวจร่างคำพิพากษาของศาลในภาค5</h4>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t  <div class=\"panel-body\">\r" +
    "\n" +
    "\t\t  \t<div class=\"row\">\r" +
    "\n" +
    "\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\r" +
    "\n" +
    "              <form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/report7.php\" target=\"_blank\">\r" +
    "\n" +
    "                  <input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\r" +
    "\n" +
    "                  <input type=\"hidden\" name=\"type_id\" value=\"{{options.type_id}}\">\r" +
    "\n" +
    "                  <input type=\"hidden\" name=\"user_id\" value=\"{{options.user_id}}\">\r" +
    "\n" +
    "                  <div class=\"form-group\">\r" +
    "\n" +
    "                      <label class=\"control-label\">ประเภทคดี</label>\r" +
    "\n" +
    "                      <select class=\"form-control\" ng-model=\"options.type_id\" select-value-type=\"string\" ng-options=\"it.id as it.name group by toGroupName(it.group_id) for it in Lookups.getType() \">\r" +
    "\n" +
    "                          <option value=\"\">-- ทุกประเภทคดี --</option>\r" +
    "\n" +
    "                      </select>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                  <div class=\"form-group\">\r" +
    "\n" +
    "                      <label class=\"control-label\">ศาล</label>\r" +
    "\n" +
    "                      <select class=\"form-control\" ng-model=\"options.user_id\" select-value-type=\"string\" ng-options=\"it.id as it.name  for it in Lookups.getCourt() \"></select>\r" +
    "\n" +
    "                  </div>\t\r" +
    "\n" +
    "                  <label>คดีเกิดในปี</label>\r" +
    "\n" +
    "                  <div class=\"row\">\r" +
    "\n" +
    "                      <div class=\"col-md-12\">\r" +
    "\n" +
    "                          <span mode=\"2\" ng-model=\"options.date_from\" placeholder=\"ปี\" custom-date-field></span>\r" +
    "\n" +
    "                      </div>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                  <hr>\r" +
    "\n" +
    "                  <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                      <button class=\"btn btn-primary btn-block\" ng-disabled=\"!(options.date_from && options.user_id)\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "              </form>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t<div>\r" +
    "\n" +
    "<div>"
  );


  $templateCache.put('views/admin_print_report8.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\">\r" +
    "\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "\t\t<div class=\"panel panel-default\">\r" +
    "\n" +
    "\t\t  <div class=\"panel-heading\">\r" +
    "\n" +
    "\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\r" +
    "\n" +
    "\t\t    \t<h4 class=\"text-info\">บัญชีรายละเอียดสำนวนที่ไม่ได้ส่งสำเนาคำพิพากษาให้สำนักงานอธิบดีผู้พิพากษาภาค 5</h4>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t  <div class=\"panel-body\">\r" +
    "\n" +
    "\t\t  \t<div class=\"row\">\r" +
    "\n" +
    "\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\r" +
    "\n" +
    "              <form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/report8.php\" target=\"_blank\">\r" +
    "\n" +
    "                  <input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\r" +
    "\n" +
    "                  <input type=\"hidden\" name=\"type_id\" value=\"{{options.type_id}}\">\r" +
    "\n" +
    "                  <input type=\"hidden\" name=\"user_id\" value=\"{{options.user_id}}\">\r" +
    "\n" +
    "                  <div class=\"form-group\">\r" +
    "\n" +
    "                      <label class=\"control-label\">ประเภทคดี</label>\r" +
    "\n" +
    "                      <select class=\"form-control\" ng-model=\"options.type_id\" select-value-type=\"string\" ng-options=\"it.id as it.name group by toGroupName(it.group_id) for it in Lookups.getType() \">\r" +
    "\n" +
    "                          <option value=\"\">-- ทุกประเภทคดี --</option>\r" +
    "\n" +
    "                      </select>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                  <div class=\"form-group\">\r" +
    "\n" +
    "                      <label class=\"control-label\">ศาล</label>\r" +
    "\n" +
    "                      <select class=\"form-control\" ng-model=\"options.user_id\" select-value-type=\"string\" ng-options=\"it.id as it.name  for it in Lookups.getCourt() \"></select>\r" +
    "\n" +
    "                  </div>\t\r" +
    "\n" +
    "                  <label>คดีเกิดในปี</label>\r" +
    "\n" +
    "                  <div class=\"row\">\r" +
    "\n" +
    "                      <div class=\"col-md-12\">\r" +
    "\n" +
    "                          <span mode=\"2\" ng-model=\"options.date_from\" placeholder=\"ปี\" custom-date-field></span>\r" +
    "\n" +
    "                      </div>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                  <hr>\r" +
    "\n" +
    "                  <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                      <button class=\"btn btn-primary btn-block\" ng-disabled=\"!(options.date_from && options.user_id)\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "              </form>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t<div>\r" +
    "\n" +
    "<div>"
  );


  $templateCache.put('views/admin_print_report9.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\">\r" +
    "\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "\t\t<div class=\"panel panel-default\">\r" +
    "\n" +
    "\t\t  <div class=\"panel-heading\">\r" +
    "\n" +
    "\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\r" +
    "\n" +
    "\t\t    \t<h4 class=\"text-info\">บัญชีรายละเอียดสำนวนที่ไม่ได้ส่งสำเนาคำพิพากษาให้สำนักงานอธิบดีผู้พิพากษาภาค 5</h4>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t  <div class=\"panel-body\">\r" +
    "\n" +
    "\t\t  \t<div class=\"row\">\r" +
    "\n" +
    "\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\r" +
    "\n" +
    "              <form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/report9.php\" target=\"_blank\">\r" +
    "\n" +
    "                  <input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\r" +
    "\n" +
    "                  <input type=\"hidden\" name=\"type_id\" value=\"{{options.type_id}}\">\r" +
    "\n" +
    "                  <input type=\"hidden\" name=\"user_id\" value=\"{{options.user_id}}\">\r" +
    "\n" +
    "                  <div class=\"form-group\">\r" +
    "\n" +
    "                      <label class=\"control-label\">ประเภทคดี</label>\r" +
    "\n" +
    "                      <select class=\"form-control\" ng-model=\"options.type_id\" select-value-type=\"string\" ng-options=\"it.id as it.name group by toGroupName(it.group_id) for it in Lookups.getType() \">\r" +
    "\n" +
    "                          <option value=\"\">-- ทุกประเภทคดี --</option>\r" +
    "\n" +
    "                      </select>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                  <div class=\"form-group\">\r" +
    "\n" +
    "                      <label class=\"control-label\">ศาล</label>\r" +
    "\n" +
    "                      <select class=\"form-control\" ng-model=\"options.user_id\" select-value-type=\"string\" ng-options=\"it.id as it.name  for it in Lookups.getCourt() \">\r" +
    "\n" +
    "                          <option value=\"\">-- ทุกศาล --</option>\r" +
    "\n" +
    "                      </select>\r" +
    "\n" +
    "                  </div>\t\r" +
    "\n" +
    "                  <label>คดีเกิดในเดือน</label>\r" +
    "\n" +
    "                  <div class=\"row\">\r" +
    "\n" +
    "                      <div class=\"col-md-12\">\r" +
    "\n" +
    "                          <span mode=\"1\" ng-model=\"options.date_from\" placeholder=\"ปี\" custom-date-field></span>\r" +
    "\n" +
    "                      </div>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                  <hr>\r" +
    "\n" +
    "                  <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                      <button class=\"btn btn-primary btn-block\" ng-disabled=\"!(options.date_from)\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "              </form>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t<div>\r" +
    "\n" +
    "<div>"
  );


  $templateCache.put('views/admin_reports.html',
    "<div ui-view></div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_reports_menu.html',
    "<h1 class=\"page-header text-center\">\r" +
    "\n" +
    "รายงาน\r" +
    "\n" +
    "</h1>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row\">\r" +
    "\n" +
    "      <div class=\"col-md-6 col-lg-4\">\r" +
    "\n" +
    "            <a href=\"#admin/reports/report4\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-print\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">รายงานการส่งสำนวนเพื่อตรวจร่างคำพิพากษาประจำวัน</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"col-md-6 col-lg-4\">\r" +
    "\n" +
    "            <a href=\"#admin/reports/report5\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-print\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">รายงานข้อมูลการส่งสำนวนและร่างคำพิพากษา<br>ของศาลในภาค 5 (ประจำเดือน)</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"col-md-6 col-lg-4\">\r" +
    "\n" +
    "            <a href=\"#admin/reports/report6\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-print\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">สรุปการส่งสำนวนและร่างคำพิพากษา<br>ศาลในภาค 5(ประจำเดือน)</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"col-md-6 col-lg-4\">\r" +
    "\n" +
    "            <a href=\"#admin/reports/report7\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-print\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">รายงานสำนวนที่ไม่ได้ส่งสำเนาคำพิพากษา</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "      </div>      \r" +
    "\n" +
    "      <div class=\"col-md-6 col-lg-4\">\r" +
    "\n" +
    "            <a href=\"#admin/reports/report8\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-print\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">รายงานคดีที่ไม่ได้ส่งสำนวน</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "      </div>           \r" +
    "\n" +
    "      <div class=\"col-md-6 col-lg-4\">\r" +
    "\n" +
    "            <a href=\"#admin/reports/report11\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-print\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">รายงานระยะเวลาการตรวจสำนวนและร่างคำพิพากษา</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "      </div>           \r" +
    "\n" +
    "      <div class=\"col-md-6 col-lg-4\">\r" +
    "\n" +
    "            <a href=\"#admin/reports/report12\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-print\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">สำนวนคดีส่งตรวจที่ไม่เป็นไปตามระเบียบว่าด้วยการตรวจสำนวนและรายงานคดี\r" +
    "\n" +
    "</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "      </div>           \r" +
    "\n" +
    "        <div class=\"col-md-6 col-lg-4\">\r" +
    "\n" +
    "            <a href=\"#admin/menu\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\t\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-th-large\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">เมนูหลัก</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_results.html',
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"custom.form.results.html\">\r" +
    "\n" +
    "    <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r" +
    "\n" +
    "        <div class=\"modal-dialog\">\r" +
    "\n" +
    "            <div class=\"modal-content\">\r" +
    "\n" +
    "                <div class=\"modal-header\" ng-show=\"title\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "                    <h4 class=\"modal-title\"><span class=\"fa fa-windows\"></span> <span ng-bind=\"title\"></span></h4>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-body\">\r" +
    "\n" +
    "                    <form class=\"form-horizontal\" name=\"form\">\r" +
    "\n" +
    "                        <fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">ผลการปฏิบัติ</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" name=\"name\" placeholder=\"ยังไม่ได้กำหนดชื่อ\" required ng-model=\"editingItem.name\" class=\"form-control input-md\">\r" +
    "\n" +
    "                                    <p class=\"help-block has-error\" ng-show=\"form.name.$error.required\">ต้องกำหนดชื่อ</p>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </fieldset>\r" +
    "\n" +
    "                    </form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-footer\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-primary btn-min\" ng-disabled=\"!editingItem.name\" ng-click=\"saveForm()\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"cancelForm()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"container-fluid\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <p>\r" +
    "\n" +
    "        <div class=\"panel panel-default\" ng-controller=\"CustomTableCtrl\" ng-init=\"setAPI('results','custom.form.results.html')\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <div class=\"text-left pull-left\">\r" +
    "\n" +
    "                    <h2 style=\"padding:0px;margin:0px;\"><span class=\"fa fa-windows\"></span> ผลการปฏิบัติ ({{tableParams.total()}})</h2>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <p class=\"text-right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <button ng-click=\"newItem()\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-plus\"></span> เพิ่มข้อมูล</button>\r" +
    "\n" +
    "                    <button ng-click=\"editItem()\" ng-show=\"hasSelected()\" class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-pencil\"></span> แก้ไขข้อมูล</button>\r" +
    "\n" +
    "                    <button data-placement=\"bottom\"  data-trigger=\"click\" bs-popover data-template=\"custom.confirm.popover.html\"\r" +
    "\n" +
    "                            ng-click=\"removeItem()\" ng-show=\"hasSelected()\" class=\"btn btn-danger\" data-auto-close=\"true\">\r" +
    "\n" +
    "                        <span class=\"glyphicon glyphicon-remove\"></span> ลบข้อมูล\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <button ng-click=\"refresh()\" class=\"btn btn-success\"><span class=\"glyphicon glyphicon-refresh\"></span> โหลดข้อมูล</button>\r" +
    "\n" +
    "                </p>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "                <div loading-container=\"tableParams.settings().$loading\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"input-group col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon\">ค้นหาชื่อ</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <input type=\"text\" class=\"form-control\" ng-model=\"searchText\" ng-model-options=\"{updateOn: 'blur', debounce: {'default': 500, 'blur': 0}}\" placeholder=\"{{(lastSearchText)?lastSearchText:'ชื่อที่ต้องการค้นหา'}}\" />\r" +
    "\n" +
    "                            <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter()\" ng-disabled=\"!searchText\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-search\"></span></div>\r" +
    "\n" +
    "                            <div ng-if=\"lastSearchText\" class=\"input-group-addon btn btn-default\" ng-click=\"clearFilter()\" title=\"เลิกค้นหา\"><span class=\"glyphicon glyphicon-remove\"></span></div>\r" +
    "\n" +
    "                            \r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <hr/>\r" +
    "\n" +
    "                    <table ng-table=\"tableParams\" show-filter=\"false\" class=\"table table-hover\">\r" +
    "\n" +
    "                        <tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                                ng-dblclick=\"editItem()\"\r" +
    "\n" +
    "                                ng-class=\"{'active': isSelected(it)}\">\r" +
    "\n" +
    "                                <td width=\"30\" class=\"text-right text-muted\">{{startIdx + $index + 1}}.</td>\r" +
    "\n" +
    "                                <!--\r" +
    "\n" +
    "                                <td width=\"30\" header=\"'custom.checked.html'\">\r" +
    "\n" +
    "                                    <input type=\"checkbox\" ng-model=\"checkboxes.items[it[pkField]]\" />\r" +
    "\n" +
    "                                </td>-->\r" +
    "\n" +
    "                                <td data-title=\"'ผลการปฏิบัติ'\" sortable=\"'name'\" >\r" +
    "\n" +
    "                                    {{it.name}}\r" +
    "\n" +
    "                                    <span ng-if=\"isSelected(it)\" class=\"row-action2\"><span class=\"glyphicon glyphicon-star-empty\"></span></span>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "                        </tbody>\r" +
    "\n" +
    "                    </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</p>\r" +
    "\n" +
    "<div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_settings.html',
    "<h1 class=\"page-header\">\r" +
    "\n" +
    "    <span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่าระบบ\r" +
    "\n" +
    "    \r" +
    "\n" +
    "</h1>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<ul class=\"list-group\" ng-controller=\"AdminSettingCtrl\">\r" +
    "\n" +
    "    <li class=\"list-group-item\" ng-repeat=\"it in settings\">\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <div class=\"input-group pull-right\" style=\"margin-top:0.2em\" ng-switch=\"getType(it)\">\r" +
    "\n" +
    "            <div ng-switch-when=\"checkbox\" ios-toggle ng-model=\"settings[$index]['value']\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"></div>\r" +
    "\n" +
    "            <div class=\"input-group\" ng-switch-when=\"integer\">\r" +
    "\n" +
    "                <span class=\"btn text-right\" ng-click=\"panelNumber(it,$event)\"><strong>15 วัน</strong> <span class=\"caret\"></span></span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"input-group\" ng-switch-default>\r" +
    "\n" +
    "                <span class=\"btn text-right\"  ng-click=\"panelDefault(it,$event)\">ยั้งไม่มีข้อมูล <span class=\"caret\"></span></span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <h4><span class=\"glyphicon glyphicon-menu-right\"></span>{{it.label}}</h4>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</ul>\r" +
    "\n" +
    "<div class=\"col-md-4 col-md-offset-4\">\r" +
    "\n" +
    "    <button class=\"btn btn-success btn-lg btn-block\"><span class=\"glyphicon glyphicon-ok\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('views/admin_topics.html',
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"custom.form.topics.html\">\r" +
    "\n" +
    "    <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r" +
    "\n" +
    "        <div class=\"modal-dialog\">\r" +
    "\n" +
    "            <div class=\"modal-content\">\r" +
    "\n" +
    "                <div class=\"modal-header\" ng-show=\"title\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "                    <h4 class=\"modal-title\"><span class=\"fa fa-windows\"></span> <span ng-bind=\"title\"></span></h4>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-body\">\r" +
    "\n" +
    "                    <form class=\"form-horizontal\" name=\"form\">\r" +
    "\n" +
    "                        <fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">ข้อหา</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" name=\"name\" placeholder=\"ยังไม่ได้กำหนดชื่อ\" required ng-model=\"editingItem.name\" class=\"form-control input-md\">\r" +
    "\n" +
    "                                    <p class=\"help-block has-error\" ng-show=\"form.name.$error.required\">ต้องกำหนดชื่อ</p>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <!-- Select Basic -->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">ประเภทคดี</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <select class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.type_id\" select-value-type=\"string\"\r" +
    "\n" +
    "                                            ng-options=\"it.id as it.name group by lookup_group(it.group_id) for it in Lookups.getType() \">\r" +
    "\n" +
    "                                        <option value=\"\"></option>\r" +
    "\n" +
    "                                    </select>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">รหัส</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" name=\"code\" placeholder=\"ยังไม่ได้กำหนด\" required ng-model=\"editingItem.code\" class=\"form-control input-md\">\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </fieldset>\r" +
    "\n" +
    "                    </form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-footer\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-primary btn-min\" ng-disabled=\"!editingItem.name\" ng-click=\"saveForm()\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"cancelForm()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"container-fluid\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <p>\r" +
    "\n" +
    "        <div class=\"panel panel-default\" ng-controller=\"CustomTableCtrl\" ng-init=\"setAPI('topics','custom.form.topics.html',{search:'searchText',type_id:'searchType'})\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <div class=\"text-left pull-left\">\r" +
    "\n" +
    "                    <h2 style=\"padding:0px;margin:0px;\"><span class=\"fa fa-windows\"></span> ข้อหา ({{tableParams.total()}})</h2>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "    <p class=\"text-right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button ng-click=\"newItem()\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-plus\"></span> เพิ่มข้อมูล</button>\r" +
    "\n" +
    "        <button ng-click=\"editItem()\" ng-show=\"hasSelected()\" class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-pencil\"></span> แก้ไขข้อมูล</button>\r" +
    "\n" +
    "        <button data-placement=\"bottom\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.popover.html\"\r" +
    "\n" +
    "                ng-click=\"removeItem()\" ng-show=\"hasSelected()\" class=\"btn btn-danger\" data-auto-close=\"true\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-remove\"></span> ลบข้อมูล\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "        <button ng-click=\"refresh()\" class=\"btn btn-success\"><span class=\"glyphicon glyphicon-refresh\"></span> โหลดข้อมูล</button>\r" +
    "\n" +
    "    </p>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<style>\r" +
    "\n" +
    "    .adon-label {\r" +
    "\n" +
    "        width: 150px;\r" +
    "\n" +
    "        text-align: 'right';\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "<div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "    <div loading-container=\"tableParams.settings().$loading\">\r" +
    "\n" +
    "        <div class=\"input-group col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "            <div class=\"input-group-addon  adon-label\">ประเภทคดี</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <select class=\"form-control\" ng-model=\"searchType\" ng-change=\"setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.id | lookup_type:'name':'full'  for it in Lookups.getType()\"><option value=\"\">ทั้งหมด</option></select>\r" +
    "\n" +
    "            <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter()\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-filter\"></span></div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"input-group col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "            <div class=\"input-group-addon adon-label\">ค้นหาชื่อ</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"searchText\" ng-model-options=\"{updateOn: 'blur', debounce: {'default': 500, 'blur': 0}}\" placeholder=\"{{(lastSearchText)?lastSearchText:'ชื่อที่ต้องการค้นหา'}}\" />\r" +
    "\n" +
    "            <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter()\" ng-disabled=\"!searchText\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-search\"></span></div>\r" +
    "\n" +
    "            <div ng-if=\"lastSearchText\" class=\"input-group-addon btn btn-default\" ng-click=\"clearFilter()\" title=\"เลิกค้นหา\"><span class=\"glyphicon glyphicon-remove\"></span></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <hr />\r" +
    "\n" +
    "        <table ng-table-resizable ng-table=\"tableParams\" show-filter=\"false\" class=\"table table-hover\">\r" +
    "\n" +
    "            <tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                    ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                    ng-dblclick=\"editItem()\"\r" +
    "\n" +
    "                    ng-class=\"{'active': isSelected(it)}\">\r" +
    "\n" +
    "                    <td width=\"30\" class=\"text-right text-muted\">{{startIdx + $index + 1}}.</td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <td data-title=\"'รหัส'\" sortable=\"'code'\" width=\"120\">\r" +
    "\n" +
    "                        {{it.code}}\r" +
    "\n" +
    "                    </td>\r" +
    "\n" +
    "                    <td data-title=\"'ข้อหา'\" sortable=\"'name'\">\r" +
    "\n" +
    "                        {{it.name}}\r" +
    "\n" +
    "                    </td>\r" +
    "\n" +
    "                    <td data-title=\"'ประเภทคดี'\" sortable=\"'type_id'\" class=\"text-center\" header-class=\"'text-center'\">\r" +
    "\n" +
    "                        {{it.type_id | lookup_type}}\r" +
    "\n" +
    "                    </td>\r" +
    "\n" +
    "                    <td data-title=\"'ความ'\" class=\"text-center\" header-class=\"'text-center'\">\r" +
    "\n" +
    "                        {{it.type_id | lookup_type : 'name' : true}}\r" +
    "\n" +
    "                        <span ng-if=\"isSelected(it)\" class=\"row-action2\"><span class=\"glyphicon glyphicon-star-empty\"></span></span>\r" +
    "\n" +
    "                    </td>\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "            </tbody>\r" +
    "\n" +
    "        </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</p>\r" +
    "\n" +
    "<div>\r" +
    "\n"
  );


  $templateCache.put('views/admin_types.html',
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"custom.form.types.html\">\r" +
    "\n" +
    "    <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r" +
    "\n" +
    "        <div class=\"modal-dialog\">\r" +
    "\n" +
    "            <div class=\"modal-content\">\r" +
    "\n" +
    "                <div class=\"modal-header\" ng-show=\"title\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "                    <h4 class=\"modal-title\"><span class=\"fa fa-windows\"></span> <span ng-bind=\"title\"></span></h4>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-body\">\r" +
    "\n" +
    "                    <form class=\"form-horizontal\" name=\"form\">\r" +
    "\n" +
    "                        <fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">ประเภทคดี</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" name=\"name\" placeholder=\"ยังไม่ได้กำหนดชื่อ\" required ng-model=\"editingItem.name\" class=\"form-control input-md\">\r" +
    "\n" +
    "                                    <p class=\"help-block has-error\" ng-show=\"form.name.$error.required\">ต้องกำหนดชื่อ</p>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "                                <!-- Select Basic -->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">ความ</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <select class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.group_id\" select-value-type=\"string\" ng-options=\"it.id as it.name for it  in Lookups.getGroup()\">\r" +
    "\n" +
    "                                        <option value=\"\"></option>\r" +
    "\n" +
    "                                    </select>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">อักษรย่อ</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" name=\"code\" maxlength=\"5\" placeholder=\"ตัวอย่างเช่่น อ.\" required ng-model=\"editingItem.code\" class=\"form-control input-md\">\r" +
    "\n" +
    "                                    <p class=\"help-block has-error\" ng-show=\"form.code.$error.required\">ต้องกำหนดอักษรย่อ</p>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </fieldset>\r" +
    "\n" +
    "                    </form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-footer\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-primary btn-min\" ng-disabled=\"!editingItem.name\" ng-click=\"saveForm()\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"cancelForm()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<style>\r" +
    "\n" +
    "    .adon-label {\r" +
    "\n" +
    "        width: 150px;\r" +
    "\n" +
    "        text-align: 'right';\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "<div class=\"container-fluid\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <p>\r" +
    "\n" +
    "        <div class=\"panel panel-default\" ng-controller=\"CustomTableCtrl\" ng-init=\"setAPI('types','custom.form.types.html',{search:'searchText',group_id:'searchGroup'})\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <div class=\"text-left pull-left\">\r" +
    "\n" +
    "                    <h2 style=\"padding:0px;margin:0px;\"><span class=\"fa fa-windows\"></span> ประเภทคดี ({{tableParams.total()}})</h2>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <p class=\"text-right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <button ng-click=\"newItem()\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-plus\"></span> เพิ่มข้อมูล</button>\r" +
    "\n" +
    "                    <button ng-click=\"editItem()\" ng-show=\"hasSelected()\" class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-pencil\"></span> แก้ไขข้อมูล</button>\r" +
    "\n" +
    "                    <button data-placement=\"bottom\"  data-trigger=\"click\" bs-popover data-template=\"custom.confirm.popover.html\"\r" +
    "\n" +
    "                            ng-click=\"removeItem()\" ng-show=\"hasSelected()\" class=\"btn btn-danger\" data-auto-close=\"true\">\r" +
    "\n" +
    "                        <span class=\"glyphicon glyphicon-remove\"></span> ลบข้อมูล\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <button ng-click=\"refresh()\" class=\"btn btn-success\"><span class=\"glyphicon glyphicon-refresh\"></span> โหลดข้อมูล</button>\r" +
    "\n" +
    "                </p>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "                <div loading-container=\"tableParams.settings().$loading\">\r" +
    "\n" +
    "                    <div class=\"input-group col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                        <div class=\"input-group-addon  adon-label\">ความ</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <select class=\"form-control\" ng-model=\"searchGroup\" ng-change=\"setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.id | lookup_group  for it in Lookups.getGroup()\"><option value=\"\">ทั้งหมด</option></select>\r" +
    "\n" +
    "                        <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter()\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-filter\"></span></div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                        <div class=\"input-group col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon adon-label\">ค้นหาชื่อ</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <input type=\"text\" class=\"form-control\" ng-model=\"searchText\" ng-model-options=\"{updateOn: 'blur', debounce: {'default': 500, 'blur': 0}}\" placeholder=\"{{(lastSearchText)?lastSearchText:'ชื่อที่ต้องการค้นหา'}}\" />\r" +
    "\n" +
    "                            <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter()\" ng-disabled=\"!searchText\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-search\"></span></div>\r" +
    "\n" +
    "                            <div ng-if=\"lastSearchText\" class=\"input-group-addon btn btn-default\" ng-click=\"clearFilter()\" title=\"เลิกค้นหา\"><span class=\"glyphicon glyphicon-remove\"></span></div>\r" +
    "\n" +
    "                            \r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <hr/>\r" +
    "\n" +
    "                    <table ng-table-resizable ng-table=\"tableParams\" show-filter=\"false\" class=\"table table-hover\" >\r" +
    "\n" +
    "                        <tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                                ng-dblclick=\"editItem()\"\r" +
    "\n" +
    "                                ng-class=\"{'active': isSelected(it)}\">\r" +
    "\n" +
    "                                <td width=\"30\" class=\"text-right text-muted\">{{startIdx + $index + 1}}.</td>\r" +
    "\n" +
    "                                <td width=\"120\" data-title=\"'อักษรย่อ'\" sortable=\"'code'\">\r" +
    "\n" +
    "                                    {{it.code}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ประเภทคดี'\" sortable=\"'name'\" >\r" +
    "\n" +
    "                                    {{it.name}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <td data-title=\"'ความ'\" sortable=\"'group_id'\" class=\"text-center\" header-class=\"'text-center'\">\r" +
    "\n" +
    "                                    {{it.group_id | lookup_group}}\r" +
    "\n" +
    "                                    <span ng-if=\"isSelected(it)\" class=\"row-action2\"><span class=\"glyphicon glyphicon-star-empty\"></span></span>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "                        </tbody>\r" +
    "\n" +
    "                    </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</p>\r" +
    "\n" +
    "<div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_users.html',
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"custom.form.users.html\">\r" +
    "\n" +
    "    <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r" +
    "\n" +
    "        <div class=\"modal-dialog\">\r" +
    "\n" +
    "            <div class=\"modal-content\">\r" +
    "\n" +
    "                <div class=\"modal-header\" ng-show=\"title\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "                    <h4 class=\"modal-title\"><span class=\"fa fa-windows\"></span> <span ng-bind=\"title\"></span></h4>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-body\">\r" +
    "\n" +
    "                    <form class=\"form-horizontal\" name=\"form\">\r" +
    "\n" +
    "                        <fieldset>\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">ชื่อ</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" name=\"name\" placeholder=\"ยังไม่มีข้อมูล\" required ng-model=\"editingItem.name\" class=\"form-control input-md\">\r" +
    "\n" +
    "                                    <p class=\"help-block has-error\" ng-show=\"form.name.$error.required\">ต้องกำหนดชื่อ</p>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"form-group\" ng-show=\"editingItem.admin=='0' && editingItem.parent_id=='0'\">\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">กลุ่มศาล</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <select class=\"form-control input-md\" name=\"usergroup_id\" validate-not-empty ng-model=\"editingItem.usergroup_id\" select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getUGroup()\">\r" +
    "\n" +
    "                                        <option value=\"\"></option>\r" +
    "\n" +
    "                                    </select>\r" +
    "\n" +
    "                                    <p class=\"help-block text-danger\" ng-show=\"form.usergroup_id.$error.required\">ต้องกำหนดกลุ่ม</p>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "                                <!-- Select Basic -->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">สิทธิการใช้</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <select class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.admin\" validate-not-empty select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getRole()\">\r" +
    "\n" +
    "                                        <option value=\"\"></option> \r" +
    "\n" +
    "                                    </select>\r" +
    "\n" +
    "                                    <p class=\"help-block text-danger\" ng-show=\"form.role.$error.required\">ต้องกำหนดสิทธิการใช้งาน</p>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"form-group\" ng-if=\"editingItem.admin > 1\">\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\" col-md-4 control-label\">\r" +
    "\n" +
    "                                ตำแหน่ง</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.position\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"form-group\" ng-if=\"editingItem.admin > 1 && $root.isAdmin()\">\r" +
    "\n" +
    "                                <!-- Select Basic -->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">ศาล</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <select class=\"form-control input-md\" ng-model=\"editingItem.parent_id\" select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getCourt()\">\r" +
    "\n" +
    "                                        <option value=\"\"></option>\r" +
    "\n" +
    "                                    </select>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">ชื่อผู้ใช้</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.account\">\r" +
    "\n" +
    "           \r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">รหัสผ่าน</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" placeholder=\"ยังไม่ได้ตั้งรหัสผ่าน\" class=\"form-control input-md\" ng-model=\"editingItem.password\">\r" +
    "\n" +
    "                 \r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </fieldset>\r" +
    "\n" +
    "                    </form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-footer\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-primary btn-min\" ng-disabled=\"!editingItem.name\" ng-click=\"saveForm()\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"cancelForm()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"container-fluid\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <p>\r" +
    "\n" +
    "        <div class=\"panel panel-default\" ng-controller=\"CustomTableCtrl\" ng-init=\"searchCourt='';searchRole='';setAPI('users','custom.form.users.html',{search:'searchText', parent_id:'searchCourt',admin:'searchRole'})\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <div class=\"text-left pull-left\">\r" +
    "\n" +
    "                    <h2 style=\"padding:0px;margin:0px;\"><span class=\"fa fa-windows\"></span> ผู้ใช้ ({{tableParams.total()}})</h2>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "<p class=\"text-right\">\r" +
    "\n" +
    "                    <button ng-click=\"newItem()\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-plus\"></span> เพิ่มข้อมูล</button>\r" +
    "\n" +
    "                    <button ng-click=\"editItem()\" ng-show=\"hasSelected()\" class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-pencil\"></span> แก้ไขข้อมูล</button>\r" +
    "\n" +
    "                    <button data-placement=\"bottom\"  data-trigger=\"click\" bspopover data-template=\"custom.confirm.popover.html\"\r" +
    "\n" +
    "                            ng-click=\"removeItem()\" ng-show=\"hasSelected()\" class=\"btn btn-danger\" data-auto-close=\"true\">\r" +
    "\n" +
    "                        <span class=\"glyphicon glyphicon-remove\"></span> ลบข้อมูล\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <button ng-click=\"refresh()\" class=\"btn btn-success\"><span class=\"glyphicon glyphicon-refresh\"></span> โหลดข้อมูล</button>\r" +
    "\n" +
    "                </p>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <style>\r" +
    "\n" +
    "                .adon-label { width:150px; text-align:'right'}\r" +
    "\n" +
    "            </style>\r" +
    "\n" +
    "            <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "                <div loading-container=\"tableParams.settings().$loading\">\r" +
    "\n" +
    "                   \r" +
    "\n" +
    "                    <div class=\"input-group col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                        <div class=\"input-group-addon  adon-label\">ศาล</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <select class=\"form-control\" ng-model=\"searchCourt\" ng-change=\"setFilter()\"  select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getCourt()\"><option value=\"\">ทั้งหมด</option></select>\r" +
    "\n" +
    "                        <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter()\"  title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-filter\"></span></div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"input-group col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                        <div class=\"input-group-addon adon-label\">สิทธิ</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <select class=\"form-control\" ng-model=\"searchRole\" ng-change=\"setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getRole()\"><option value=\"\">ทั้งหมด</option></select>\r" +
    "\n" +
    "                        <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter()\"  title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-filter\"></span></div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                   \r" +
    "\n" +
    "                    <div class=\"input-group col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                        <div class=\"input-group-addon adon-label\">ค้นหาชื่อ</div>\r" +
    "\n" +
    "                        <input type=\"text\" class=\"form-control\" ng-model=\"searchText\" ng-enter=\"setFilter()\" placeholder=\"{{(lastSearchText)?lastSearchText:'ชื่อที่ต้องการค้นหา'}}\" />\r" +
    "\n" +
    "                        <div ng-if=\"!lastSearchText\"  class=\"input-group-addon btn btn-default\" ng-click=\"setFilter()\" ng-disabled=\"!searchText\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-search\"></span></div>\r" +
    "\n" +
    "                        <div ng-if=\"lastSearchText\" class=\"input-group-addon btn btn-default\" ng-click=\"clearFilter()\" title=\"เลิกค้นหา\"><span class=\"glyphicon glyphicon-remove\"></span></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <hr/>\r" +
    "\n" +
    "                    <table ng-table-resizable ng-table=\"tableParams\" show-filter=\"false\" class=\"table table-hover\">\r" +
    "\n" +
    "                        <tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                                ng-dblclick=\"editItem()\"\r" +
    "\n" +
    "                                ng-class=\"{'active': isSelected(it),'text-checkout': it.check_out==1,'text-warning': it.check_out==1}\">\r" +
    "\n" +
    "                                <td width=\"30\" class=\"text-right text-muted\">{{startIdx + $index + 1}}.</td>\r" +
    "\n" +
    "      \r" +
    "\n" +
    "                                <td data-title=\"'ชื่อผู้ใช้'\" sortable=\"'name'\" >\r" +
    "\n" +
    "                                    {{it.name}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ศาล'\" sortable=\"'parent_id'\">\r" +
    "\n" +
    "                                    {{it.parent_id | lookup_court}} \r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'สิทธิ'\" sortable=\"'admin'\" class=\"text-center\" header-class=\"'text-center'\">\r" +
    "\n" +
    "                                    {{it.admin | lookup_role}} <span ng-if=\"isSelected(it)\" class=\"row-action2\"><span class=\"glyphicon glyphicon-star-empty\"></span></span>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "                        </tbody>\r" +
    "\n" +
    "                    </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</p>\r" +
    "\n" +
    "<div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/admin_vcases.html',
    "<style>\r" +
    "\n" +
    "\ttable tr td{\r" +
    "\n" +
    "\t\tvertical-align:middle;\r" +
    "\n" +
    "\t}\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-controller=\"AdminReportCtrl as xctrl\" data-prefix=\"a2\">\r" +
    "\n" +
    "    <div ui-view></div>\r" +
    "\n" +
    "    <div  ng-hide=\"!(urlEq('/admin/vcases') || urlEq('/admin/vcases/notify') || urlEq('/admin/vcases/notify2'))\">\r" +
    "\n" +
    "        <div class=\"panel panel-default\" ng-controller=\"CustomTableCtrl as cmt\" ng-init=\"$parent.cmt=cmt;setAPI('admin_cases','custom.admin.form1.html',{date_received:'searchDate',_view:'_view()',type_id:'searchType'})\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <span class=\"text-right pull-right\" style=\"position:relative;top:-0.25em\">\r" +
    "\n" +
    "                    <span class=\"btn btn-notify btn-danger\" ng-click=\"notify3()\">สำนวนค้างส่ง (ทบทวนร่างฯ)<span class=\"notify\">{{TableMeta.notsent3 || 0}}</span></span>\r" +
    "\n" +
    "                    <span class=\"btn btn-notify btn-success\" ng-click=\"notify2()\" style=\"margin-right:4em\">สำนวนยังไม่ได้ส่งคืนศาล<span class=\"notify\">{{TableMeta.notsent2 || 0}}</span></span>\r" +
    "\n" +
    "                    \r" +
    "\n" +
    "                    <span ng-hide=\"urlEq('/admin/vcases/notify')\">\r" +
    "\n" +
    "                        <button class=\"btn btn-success\" ng-show=\"isSearchMode()\" ng-click=\"setFilter()\">\r" +
    "\n" +
    "                            <span class=\"glyphicon glyphicon-arrow-left\"></span> ออกจากโหมดการค้นหา\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "                        <button class=\"btn btn-info\" ng-click=\"advancedSearch('custom.cases.search.html',{_view:true})\">\r" +
    "\n" +
    "                            <span class=\"glyphicon glyphicon-search\"></span> ค้นหา\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "                    </span>\r" +
    "\n" +
    "                    <button data-animation=\"am-flip-x\" bs-dropdown class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-briefcase\"></span><span class=\"hidden-sm hidden-xs\"> คดี (ไม่ได้ส่งรายงานคดี)</span></button>\r" +
    "\n" +
    "                    <ul class=\"dropdown-menu\" role=\"menu\" style=\"max-width:220px\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <li><a href=\"javascript:void(0)\" ng-click=\"newItem({date_sent:today(),no_case_sent:1,user_id:searchCourt},'custom.court.form2.html')\"><span class=\"glyphicon glyphicon-plus\"></span><span class=\"hidden-sm hidden-xs\"> เพิ่มคดี</span></a></li>\r" +
    "\n" +
    "                            <li ng-class=\"{disabled:!(($it.no_case_sent=='1') && hasSelected())}\"><a href=\"javascript:void(0)\" ng-disabled=\"!(($it.no_case_sent=='1') && hasSelected())\" ng-click=\"ifcall(($it.no_case_sent!='1'),editItem('custom.court.form2.html'))\"><span class=\"glyphicon glyphicon-pencil\"></span><span class=\"hidden-sm hidden-xs\"> แก้ไขคดี</span></a></li>\r" +
    "\n" +
    "                            <li ng-class=\"{disabled:!(($it.no_case_sent=='1') && hasSelected())}\">\r" +
    "\n" +
    "                                <a href=\"javascript:void(0)\" ng-disabled=\"!(($it.no_case_sent=='1') && hasSelected())\" data-placement=\"bottom\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.popover.html\"\r" +
    "\n" +
    "                                   ng-click=\"removeItem()\" data-auto-close=\"true\">\r" +
    "\n" +
    "                                    <span class=\"glyphicon glyphicon-remove\"></span><span class=\"hidden-sm hidden-xs\"> ลบคดี</span>\r" +
    "\n" +
    "                                </a>\r" +
    "\n" +
    "                            </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </ul>\r" +
    "\n" +
    "                    <button class=\"btn btn-success\" data-placement=\"left\" data-trigger=\"click\" bs-popover data-template=\"admin.vcases.reports.html\" data-auto-close=\"true\">\r" +
    "\n" +
    "                        <span class=\"glyphicon glyphicon-print\"></span> พิมพ์รายงานสำนวน\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <h2 style=\"padding:0px;margin:0px;\"><span class=\"fa fa-windows\"></span> ส่งสำนวน ({{tableParams.total()}})</h2>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div loading-container=\"tableParams.settings().$loading\">\r" +
    "\n" +
    "                    <div ng-show=\"!(isSearchMode() || urlEq('/admin/vcases/notify'))\">\r" +
    "\n" +
    "                        <div class=\"input-group col-md-10 col-md-offset-1\">\r" +
    "\n" +
    "                            \r" +
    "\n" +
    "                            <div class=\"input-group-addon\"><strong>ประเภทคดี</strong></div>\r" +
    "\n" +
    "                            <select class=\"form-control\" style=\"min-width:450px\" ng-model=\"searchType\" ng-change=\"setTypeId(searchType);setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.id | lookup_type:'name':'code'  for it in Lookups.getType()\"><option value=\"\">ทั้งหมด</option></select>\r" +
    "\n" +
    "                            <div class=\"input-group-addon\"><strong>วันที่ภาครับสำนวนคำพิพากษา</strong></div>\r" +
    "\n" +
    "                            <div mode=\"0\" ng-model=\"searchDate\" ng-change=\"setDateId(searchDate);setFilter()\" placeholder=\"แสดงคดีที่รับสำนวนวันที่่\" custom-date-field></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <!--\r" +
    "\n" +
    "                            <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter(true)\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-refresh\"></span></div>\r" +
    "\n" +
    "                                -->\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <hr />\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div ng-table-menu=\"tableParams\"></div>\r" +
    "\n" +
    "                    <table ng-table-resizable ng-table=\"tableParams\" ng-table-init ng-table-init-columns wt-responsive-table  ng-init=\"tableParams.not_found='ไม่ได้ส่งรายงานคดี'\" show-filter=\"false\" class=\"table table-hover table-bordered\">\r" +
    "\n" +
    "                        <tbody>\r" +
    "\n" +
    "                            <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                                ng-init=\"it._days=date_diff(it.date_ap, it.date_received3)\"\r" +
    "\n" +
    "                                ng-class=\"{'active': isSelected(it),'text-red':it.no_case_sent=='1'}\">\r" +
    "\n" +
    "                                <td width=\"30\" class=\"text-right text-muted\"><span title=\"#{{it.id}}\">{{startIdx + $index + 1}}.</span></td>\r" +
    "\n" +
    "                                <td data-title=\"'เลขรับสำนวนของภาค'\" sortable=\"'auto_received_num'\">\r" +
    "\n" +
    "                                    {{it.auto_received_num}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'เลขคดีดำ'\" sortable=\"'number_black'\">\r" +
    "\n" +
    "                                    {{it.number_black}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ศาล'\" sortable=\"'user_id'\">\r" +
    "\n" +
    "                                    {{it.user_id | lookup_court}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'เลขคดีแดง'\" sortable=\"'number_red'\">\r" +
    "\n" +
    "                                    {{it.number_red}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'โจทก์'\" sortable=\"'plaintiff'\">\r" +
    "\n" +
    "                                    {{it.plaintiff}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'จำเลย'\" sortable=\"'defendant'\">\r" +
    "\n" +
    "                                    {{it.defendant}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'รองอธิบดี'\" sortable=\"'judge2_id'\"  hide>\r" +
    "\n" +
    "                                    {{it.judge2_id | lookup_judge}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'หน.ภาค'\" sortable=\"'judge4_id'\"  hide>\r" +
    "\n" +
    "                                    {{it.judge4_id | lookup_judge}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ข้อหาสถิติ'\" sortable=\"'topic_ids'\">\r" +
    "\n" +
    "                                    {{it.topic_ids | lookup_topic}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'วันที่ส่งสำนวน'\" sortable=\"'date_sent2'\">\r" +
    "\n" +
    "                                    {{it.date_sent2 | thai_date:'short'}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'วันที่ภาครับสำนวน'\" sortable=\"'date_received3'\">\r" +
    "\n" +
    "                                    {{it.date_received3 | thai_date:'short'}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'วันที่ภาคส่งสำนวนกลับ'\" sortable=\"'date_sent5'\"  hide>\r" +
    "\n" +
    "                                    {{it.date_sent5 | thai_date:'short'}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'นัดฟังคำพิพากษา'\" sortable=\"'date_ap'\">\r" +
    "\n" +
    "                                    {{it.date_ap | thai_date:'short'}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'วันที่ อธ.จ่าย/หน.ภาครับสนำนวน'\" sortable=\"'date_at_received1'\" hide>\r" +
    "\n" +
    "                                    {{it.date_at_received1 | thai_date:'short'}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'วันที่รอง อธ.รับสำนวน'\" sortable=\"'date_at_received2'\" hide>\r" +
    "\n" +
    "                                    {{it.date_at_received2 | thai_date:'short'}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ผลการปฏิบัติ'\" sortable=\"'result'\" hide>\r" +
    "\n" +
    "                                    {{it.result | lookup_result}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ส่งตามกำหนด(ก่อน '+BDAYS+' วัน)'\" class=\"text-center\" >\r" +
    "\n" +
    "                                    <span ng-if=\"it._days<BDAYS && it.date_ap && it.date_received3\">ช้า ({{it._days | math_abs}} วัน)</span>\r" +
    "\n" +
    "                                    <span ng-if=\"it._days>=BDAYS\">ไม่ช้า ({{it._days}}) วัน</span>\r" +
    "\n" +
    "                                    <span ng-if=\"isSelected(it)\" class=\"row-action\">\r" +
    "\n" +
    "                                        <button class=\"btn btn-success btn-circle btn-xs\" data-placement=\"left\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.admin.actions2.html\"\r" +
    "\n" +
    "                                                data-auto-close=\"true\">\r" +
    "\n" +
    "                                            <span class=\"glyphicon glyphicon-edit\"></span>\r" +
    "\n" +
    "                                        </button>\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "                        </tbody>\r" +
    "\n" +
    "                    </table>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/court.html',
    "<div ui-view></div>\r" +
    "\n"
  );


  $templateCache.put('views/court_acases.html',
    "<style>\r" +
    "\n" +
    "\ttable tr td{\r" +
    "\n" +
    "\t\tvertical-align:middle;\r" +
    "\n" +
    "\t}\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"custom.court.aform1.html\">\r" +
    "\n" +
    "        <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r" +
    "\n" +
    "            <div class=\"modal-dialog\" style=\"width:95%;\">\r" +
    "\n" +
    "                <div class=\"modal-content\">\r" +
    "\n" +
    "                    <div class=\"modal-header\" ng-show=\"title\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "                        <h4 class=\"modal-title\"><span class=\"fa fa-windows\"></span> <span ng-bind=\"title\"></span>/ร่างคำสั่ง</h4>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"modal-body\">\r" +
    "\n" +
    "                        <form class=\"form-horizontal\" name=\"form\"> \r" +
    "\n" +
    "                                <div class=\"row\">\r" +
    "\n" +
    "                                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <!-- Text input-->\r" +
    "\n" +
    "                                        <label class=\"col-md-4 control-label text-required\">วันที่ส่ง</label>\r" +
    "\n" +
    "                                        <div class=\"col-md-7\">\r" +
    "\n" +
    "                                            <span mode=\"0\" ng-model=\"editingItem.date_sent_a\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                        <!-- Text input-->\r" +
    "\n" +
    "                                        <label class=\" col-md-4 control-label text-required\">เลขที่หนังสือส่ง</label>\r" +
    "\n" +
    "                                        <div class=\"col-md-7\">\r" +
    "\n" +
    "                                            <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.number_sent_a\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"row\">\r" +
    "\n" +
    "                                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <!-- Text input-->\r" +
    "\n" +
    "                                        <label class=\"col-md-4 control-label text-required\">วันที่รับฟ้อง</label>\r" +
    "\n" +
    "                                        <div class=\"col-md-7\">\r" +
    "\n" +
    "                                            <span mode=\"0\" ng-model=\"editingItem.date_case\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <style>\r" +
    "\n" +
    "                                    .bnl {\r" +
    "\n" +
    "                                        border-left: none;\r" +
    "\n" +
    "                                    }\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    .bnr {\r" +
    "\n" +
    "                                        border-right: none;\r" +
    "\n" +
    "                                    }\r" +
    "\n" +
    "                                </style>\r" +
    "\n" +
    "                                <div class=\"row\">\r" +
    "\n" +
    "                                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                        <!-- Text input-->\r" +
    "\n" +
    "                                        <label class=\"col-md-4 control-label text-required\">ประเภทคดี</label>\r" +
    "\n" +
    "                                        <div class=\"col-md-7\">\r" +
    "\n" +
    "                                            <select ng-change=\"changeTypeId(editingItem)\" title=\"ไม่สามารถแก้ไขได้ถ้าบันทึกเลขคดีแล้ว (ต้องลบคดีนี้แล้วเพิ่มใหม่เท่านั้น)\" ng-disabled=\"editingItem.id && editingItem.number_black\" class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.type_id\" select-default ng-options=\"it.id as it.id | lookup_type:'name':'code' group by it.group_id | lookup_group for it  in Lookups.getType()\">\r" +
    "\n" +
    "                                            </select>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <!-- Text input-->\r" +
    "\n" +
    "                                        <label class=\"col-md-4 control-label text-required\">เลขคดีดำ</label>\r" +
    "\n" +
    "                                        <div class=\"col-md-7\">\r" +
    "\n" +
    "                                            <div class=\"input-group\">\r" +
    "\n" +
    "                                                <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" style=\"background-color:#ffffff\" readonly value=\"{{editingItem.number_black}}\">\r" +
    "\n" +
    "                                                <span  title=\"ป้อนเลขคดี\" id=\"edit-blacknum\" ng-click=\"popupBlackNumber(editingItem)\" ng-disabled=\"!editingItem.type_id\" class=\"btn input-group-addon\"><span class=\"glyphicon glyphicon-pencil\"></span> ป้อนเลขคดี</span>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            <fieldset ng-disabled=\"!((editingItem.type_id>0) && editingItem.number_black)\">\r" +
    "\n" +
    "                                <div class=\"row\">\r" +
    "\n" +
    "                                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <!-- Text input-->\r" +
    "\n" +
    "                                        <label class=\"col-md-4 control-label text-required\">โจทก์หรือผู้ร้อง</label>\r" +
    "\n" +
    "                                        <div class=\"col-md-7\">\r" +
    "\n" +
    "                                            <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.plaintiff\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <!-- Text input-->\r" +
    "\n" +
    "                                        <label class=\"col-md-4 control-label\">จำเลย</label>\r" +
    "\n" +
    "                                        <div class=\"col-md-7\">\r" +
    "\n" +
    "                                            <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.defendant\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <!-- Text input-->\r" +
    "\n" +
    "                                    <label class=\"col-md-2 control-label\">ข้อหาพิมพ์ปก</label>\r" +
    "\n" +
    "                                    <div class=\"col-md-9\">\r" +
    "\n" +
    "                                        <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.title\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <!-- Text input-->\r" +
    "\n" +
    "                                    <label class=\"col-md-2 control-label text-required\">ข้อหาสถิติ</label>\r" +
    "\n" +
    "                                    <div class=\"col-md-9\">\r" +
    "\n" +
    "                                        <div class=\"input-group\">\r" +
    "\n" +
    "                                            <div class=\"form-control\" style=\"height:auto;min-height:50px;border-right:none\">\r" +
    "\n" +
    "                                                <custom-choices ng-required ng-model=\"editingItem.topic_ids\"></custom-choices>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <div class=\"input-group-addon\" style=\"vertical-align:top;border-left:none;background-color:transparent\">\r" +
    "\n" +
    "                                                <button class=\"btn btn-circle\" ng-disabled=\"!editingItem.type_id\" id=\"edit-topics\" ng-click=\"popupTopics(editingItem)\"><span class=\"glyphicon glyphicon-pencil\"></span></button>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"form-group col-md-6\" ng-class=\"{'has-error':form.fcap.$invalid}\">\r" +
    "\n" +
    "                                    <!-- Text input-->\r" +
    "\n" +
    "                                    <label class=\"col-md-4 control-label\">จำนวนทุนทรัพย์</label>\r" +
    "\n" +
    "                                    <div class=\"col-md-7\">\r" +
    "\n" +
    "                                        <div class=\"input-group\">\r" +
    "\n" +
    "                                            <input type=\"text\" name=\"fcap\" placeholder=\"0.00\" ng-pattern=\"/^[0-9]+(\\.[0-9]{1,})?$/\" class=\"form-control input-md\" step=\"0.01\" ng-model=\"editingItem.capital\">\r" +
    "\n" +
    "                                            <span class=\"input-group-addon\">บาท</span>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                    <label class=\"control-label col-md-4\">ผู้พิพากษาเจ้าของสำนวน</label>\r" +
    "\n" +
    "                                    <div class=\"col-md-7\">\r" +
    "\n" +
    "                                        <div custom-dropdown class=\"form-control input-md\"  ng-model=\"editingItem.judge_id_a\" data-options=\"judge_court_options\"></div>\r" +
    "\n" +
    "                                        <span class=\"form-control-feedback\"><span class=\"caret\" style=\"margin-right:2em\"></span></span>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>                                \r" +
    "\n" +
    "                                <div class=\"row clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                    <label class=\"control-label col-md-4\">สำนวนพ่วง</label>\r" +
    "\n" +
    "                                    <div class=\"col-md-7\">\r" +
    "\n" +
    "                                         <div class=\"input-group\">\r" +
    "\n" +
    "                                             <div class=\"input-group-addon\" style=\"xbackground-color:#fefefe\"><input disabled type=\"checkbox\" ng-model=\"editingItem.link_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"/></div>\r" +
    "\n" +
    "                                             <input type=\"text\" ng-disabled=\"editingItem.link_checked!='1'\" class=\"form-control\" ng-model=\"editingItem.link_ids\" placeholder=\"ไม่มีสำนวนพ่วง\" />\r" +
    "\n" +
    "                                         </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                    <label class=\"control-label col-md-4\">สำนวนรวม</label>\r" +
    "\n" +
    "                                    <div class=\"col-md-7\">\r" +
    "\n" +
    "                                        <div class=\"input-group\">\r" +
    "\n" +
    "                                            <div class=\"input-group-addon\" style=\"xbackground-color:#fefefe\"><input disabled type=\"checkbox\" ng-model=\"editingItem.add_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"/></div>\r" +
    "\n" +
    "                                            <p type=\"text\" ng-disabled=\"editingItem.add_checked!='1'\" class=\"form-control\" placeholder=\"ไม่มีสำนวนรวม\">\r" +
    "\n" +
    "                                                <span  class=\"label label-mr label-black\" ng-repeat=\"key in editingItem.add_ids |split\">{{key}}</span>\r" +
    "\n" +
    "                                                <span ng-if=\"!editingItem.add_ids\" class=\"text-muted\">ไม่มีสำนวนรวม</span>\r" +
    "\n" +
    "                                            </p>\r" +
    "\n" +
    "                                            <div class=\"input-group-addon\" title=\"เลือกคดี\" ng-controller=\"MergeCaseCtrl\" ng-click=\"ifcall(editingItem.add_checked=='1',open,'views/custom.select_cases_panel.html',editingItem)\"><span class=\"glyphicon glyphicon-th-list\"></span></div>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>                          \r" +
    "\n" +
    "                                <div class=\"form-group\">\r" +
    "\n" +
    "                                    <!-- Text input-->\r" +
    "\n" +
    "                                    <label class=\"col-md-2 control-label\">หมายเหตุ</label>\r" +
    "\n" +
    "                                    <div class=\"col-md-9\">\r" +
    "\n" +
    "                                        <textarea type=\"text\" rows=\"3\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.note1_a\"></textarea>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"col-md-10 col-md-offset-2\">\r" +
    "\n" +
    "                                    <div class=\"help-block\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <p class=\"text-info\">\r" +
    "\n" +
    "                                            <span class=\"glyphicon glyphicon-question-sign pull-left\"></span>\r" +
    "\n" +
    "                                            <ul>\r" +
    "\n" +
    "                                                <li ng-hide=\"isValid(editingItem)\" class=\"text-warning\">* ข้อมูลที่บังคับให้ต้องป้อนก่อน จึงจะสามารถบันทึกข้อมูลได้</li>\r" +
    "\n" +
    "                                                <li>ต้องเลือกประเภทคดีก่อนจึงจะสามารถ ป้อนเลขคดี และ ข้อหาหลักได้</li>\r" +
    "\n" +
    "                                                <li>ถ้ามีเลขคดีแล้วประเภทคดีไม่สามารถเปลี่ยนได้ (ต้องลบเลขคดีก่อน)</li>\r" +
    "\n" +
    "                                            </ul>\r" +
    "\n" +
    "                                        </p>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </fieldset> \r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"modal-footer\">\r" +
    "\n" +
    "                        <button type=\"button\" ng-disabled=\"(!isValidA(editingItem)) || form.$invalid\" class=\"btn btn-primary btn-min\" ng-click=\"saveForm()\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                        <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"cancelForm()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-controller=\"CourtReportCtrl as xctrl\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div ui-view></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div ng-hide=\"!(urlEq('/court/acases') || urlEq('/court/acases/notify') || urlEq('/court/acases/notify2'))\">\r" +
    "\n" +
    "            <div class=\"panel panel-default\" ng-controller=\"CustomTableCtrl  as cmt\" ng-init=\"$parent.cmt=cmt;setAPI('court_cases','custom.court.aform1.html',{search:'searchText', court:'searchCourt', month:'searchMonth', year:'searchYear',_view:'_view()'},{court:true, month:true,year:true})\">\r" +
    "\n" +
    "                <div class=\"panel-heading\">\r" +
    "\n" +
    "                    <div class=\"text-right pull-right\" style=\"position:relative;top:-0.25em\">\r" +
    "\n" +
    "                        \r" +
    "\n" +
    "                        <span ng-hide=\"urlEq('/court/cases/notify')\" >\r" +
    "\n" +
    "                            <button class=\"btn btn-success\" ng-show=\"isSearchMode()\" ng-click=\"setFilter()\">\r" +
    "\n" +
    "                                <span class=\"glyphicon glyphicon-arrow-left\"></span> ออกจากโหมดการค้นหา\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                            <button class=\"btn btn-info\" ng-click=\"advancedSearch('custom.cases.search.html',{_view:'acases'})\">\r" +
    "\n" +
    "                                <span class=\"glyphicon glyphicon-search\"></span><span class=\"hidden-sm hidden-xs\"> ค้นหา</span>\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                            <button ng-click=\"newItem({date_sent:'',no_case_sent:2})\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-plus\"></span><span class=\"hidden-sm hidden-xs\"> เพิ่มร่างคำสั่ง</span></button>\r" +
    "\n" +
    "                            <button ng-click=\"ifcall(($it.no_case_sent=='2'),editItem)\" ng-show=\"($it.no_case_sent=='2') && hasSelected()\" class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-pencil\"></span><span class=\"hidden-sm hidden-xs\"> แก้ไขร่างคำสั่ง</span></button>\r" +
    "\n" +
    "                            <button data-placement=\"bottom\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.popover.html\"\r" +
    "\n" +
    "                                    ng-click=\"removeItem()\" ng-show=\"($it.no_case_sent=='2') && hasSelected()\" class=\"btn btn-danger\" data-auto-close=\"true\">\r" +
    "\n" +
    "                                <span class=\"glyphicon glyphicon-remove\"></span><span class=\"hidden-sm hidden-xs\"> ลบร่างคำสั่ง</span>\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                            <button ng-click=\"refresh()\" class=\"btn btn-success\"><span class=\"glyphicon glyphicon-refresh\"></span><span class=\"hidden-sm hidden-xs\"> โหลดข้อมูล</span></button>\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <h2 style=\"padding:0px;margin:0px;\"><span class=\"fa fa-windows\"></span> รายงาน/ร่างคำสั่ง ({{tableParams.total()}})</h2>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div loading-container=\"tableParams.settings().$loading\">\r" +
    "\n" +
    "                        <div class=\"row\" ng-show=\"!(isSearchMode() || urlEq('/court/cases/notify'))\">\r" +
    "\n" +
    "                            <div class=\"col-md-4 col-md-offset-1\">\r" +
    "\n" +
    "                                <div class=\"input-group\">\r" +
    "\n" +
    "                                    <div class=\"input-group-addon  adon-label\">ศาล</div>\r" +
    "\n" +
    "                                    <input type=\"text\" ng-init=\"searchCourt=getUser().id\" class=\"form-control\" value=\"{{getUser().name}}\" ng-readonly=\"true\" style=\"background-color:#ffffff\">\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"col-md-3\">\r" +
    "\n" +
    "                                <div class=\"input-group\">\r" +
    "\n" +
    "                                    <div class=\"input-group-addon  adon-label\">เดือน</div>\r" +
    "\n" +
    "                                    <select class=\"form-control\" ng-model=\"searchMonth\" ng-change=\"setMonthId(searchMonth);setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getMonth()\"></select>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"col-md-3\">\r" +
    "\n" +
    "                                <div class=\"input-group\">\r" +
    "\n" +
    "                                    <div class=\"input-group-addon  adon-label\">พ.ศ</div>\r" +
    "\n" +
    "                                    <select class=\"form-control\" ng-model=\"searchYear\" ng-change=\"setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getYear()\"></select>\r" +
    "\n" +
    "                                    <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter(true)\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-refresh\"></span></div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <hr />\r" +
    "\n" +
    "                        <div ng-table-menu=\"tableParams\"></div>\r" +
    "\n" +
    "                        <table ng-table-resizable ng-table=\"tableParams\" show-filter=\"false\" class=\"table table-hover table-bordered\" ng-table-init ng-table-init-columns wt-responsive-table>\r" +
    "\n" +
    "                            <tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                    ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                                    ng-dblclick=\"ifcall(($it.no_case_sent=='2'),editItem)\"\r" +
    "\n" +
    "                                    ng-class=\"{'active': isSelected(it),'text-blue': isValidDate(it.date_sent)}\">\r" +
    "\n" +
    "                                    <td width=\"30\" class=\"text-right text-muted\"><span title=\"#{{it.id}}\">{{startIdx + $index + 1}}.</span></td>\r" +
    "\n" +
    "                                    <td data-title=\"'เลขรับร่างคำสั่ง(ภาค)'\" sortable=\"'auto_received_num2'\" hide\">\r" +
    "\n" +
    "                                        {{::it.auto_received_num2}}\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'เลขคดีดำ'\" sortable=\"'number_black'\">\r" +
    "\n" +
    "                                        {{::it.number_black}}\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <td data-title=\"'โจทก์'\" sortable=\"'plaintiff'\">\r" +
    "\n" +
    "                                        {{::it.plaintiff}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'จำเลย'\" sortable=\"'defendant'\">\r" +
    "\n" +
    "                                        {{::it.defendant}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'ข้อหาพิมพ์ปก'\" sortable=\"'topic_ids'\">\r" +
    "\n" +
    "                                        {{::it.topic_ids | lookup_topic}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'ผลการส่งรายงานดดี'\" sortable=\"'command_id'\">\r" +
    "\n" +
    "                                        {{::it.command_id | lookup_at }}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'ผลการปฏิบัติ(ภาค)'\" sortable=\"'result'\">\r" +
    "\n" +
    "                                        {{::it.result | lookup_result}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <td data-title=\"'วันที่ภาครับ'\" class=\"text-center\" >\r" +
    "\n" +
    "                                       {{::it.date_received3 | thai_date:'short'}}                            \r" +
    "\n" +
    "                                        <span ng-if=\"isSelected(it)\" title=\"เลือกทำรายการ\" class=\"row-action\">\r" +
    "\n" +
    "                                            <button class=\"btn btn-success btn-circle btn-xs\" data-placement=\"left\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.court.actions3.html\"\r" +
    "\n" +
    "                                                    data-auto-close=\"true\">\r" +
    "\n" +
    "                                                <span class=\"glyphicon glyphicon-edit\"></span>\r" +
    "\n" +
    "                                            </button>\r" +
    "\n" +
    "                                        </span>\r" +
    "\n" +
    "                                  \r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </tr>\r" +
    "\n" +
    "                            </tbody>\r" +
    "\n" +
    "                        </table>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/court_cases.html',
    "<style>\r" +
    "\n" +
    "\ttable tr td{\r" +
    "\n" +
    "\t\tvertical-align:middle;\r" +
    "\n" +
    "\t}\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"custom.court.form1.html\">\r" +
    "\n" +
    "        <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r" +
    "\n" +
    "            <div class=\"modal-dialog\" style=\"width:95%;\">\r" +
    "\n" +
    "                <div class=\"modal-content\">\r" +
    "\n" +
    "                    <div class=\"modal-header\" ng-show=\"title\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <h4 class=\"modal-title\"><span class=\"fa fa-windows\"></span>\r" +
    "\n" +
    "                        <span ng-switch=\"editingItem.no_case_sent==2\">\r" +
    "\n" +
    "                            <span ng-switch-when=\"true\">ส่งรายงานคดี (ร่างคำสั่ง)</span>\r" +
    "\n" +
    "                            <span ng-switch-default><span ng-bind=\"title\"></span>/รายงานคดี</span>\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                        </h4>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"modal-body\">\r" +
    "\n" +
    "                        <form class=\"form-horizontal\" name=\"form\">\r" +
    "\n" +
    "                                <div class=\"row\">\r" +
    "\n" +
    "                                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <!-- Text input-->\r" +
    "\n" +
    "                                        <label class=\"col-md-4 control-label text-required\">วันที่ส่ง</label>\r" +
    "\n" +
    "                                        <div class=\"col-md-7\">\r" +
    "\n" +
    "                                            <span mode=\"0\" ng-model=\"editingItem.date_sent\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                        <!-- Text input-->\r" +
    "\n" +
    "                                        <label class=\" col-md-4 control-label text-required\">เลขที่หนังสือส่ง</label>\r" +
    "\n" +
    "                                        <div class=\"col-md-7\">\r" +
    "\n" +
    "                                            <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.number_sent\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"row\">\r" +
    "\n" +
    "                                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <!-- Text input-->\r" +
    "\n" +
    "                                        <label class=\"col-md-4 control-label text-required\">วันที่รับฟ้อง</label>\r" +
    "\n" +
    "                                        <div class=\"col-md-7\">\r" +
    "\n" +
    "                                            <span mode=\"0\" ng-model=\"editingItem.date_case\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <style>\r" +
    "\n" +
    "                                    .bnl {\r" +
    "\n" +
    "                                        border-left: none;\r" +
    "\n" +
    "                                    }\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    .bnr {\r" +
    "\n" +
    "                                        border-right: none;\r" +
    "\n" +
    "                                    }\r" +
    "\n" +
    "                                </style>\r" +
    "\n" +
    "                                <div class=\"row\">\r" +
    "\n" +
    "                                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                        <!-- Text input-->\r" +
    "\n" +
    "                                        <label class=\"col-md-4 control-label text-required\">ประเภทคดี</label>\r" +
    "\n" +
    "                                        <div class=\"col-md-7\">\r" +
    "\n" +
    "                                            <select ng-change=\"changeTypeId(editingItem)\" title=\"ไม่สามารถแก้ไขได้ถ้าบันทึกเลขคดีแล้ว (ต้องลบคดีนี้แล้วเพิ่มใหม่เท่านั้น)\" ng-disabled=\"editingItem.id && editingItem.number_black\" class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.type_id\" select-default ng-options=\"it.id as it.id | lookup_type:'name':'code' group by it.group_id | lookup_group for it  in Lookups.getType()\">\r" +
    "\n" +
    "                                            </select>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <!-- Text input-->\r" +
    "\n" +
    "                                        <label class=\"col-md-4 control-label text-required\">เลขคดีดำ</label>\r" +
    "\n" +
    "                                        <div class=\"col-md-7\">\r" +
    "\n" +
    "                                            <div class=\"input-group\">\r" +
    "\n" +
    "                                                <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" style=\"background-color:#ffffff\" readonly value=\"{{editingItem.number_black}}\">\r" +
    "\n" +
    "                                                <span  title=\"ป้อนเลขคดี\" id=\"edit-blacknum\" ng-click=\"popupBlackNumber(editingItem)\" ng-disabled=\"!editingItem.type_id\" class=\"btn input-group-addon\"><span class=\"glyphicon glyphicon-pencil\"></span> ป้อนเลขคดี</span>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            <fieldset ng-disabled=\"!((editingItem.type_id>0) && editingItem.number_black)\">\r" +
    "\n" +
    "                                <div class=\"row\">\r" +
    "\n" +
    "                                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <!-- Text input-->\r" +
    "\n" +
    "                                        <label class=\"col-md-4 control-label text-required\">โจทก์หรือผู้ร้อง</label>\r" +
    "\n" +
    "                                        <div class=\"col-md-7\">\r" +
    "\n" +
    "                                            <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.plaintiff\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <!-- Text input-->\r" +
    "\n" +
    "                                        <label class=\"col-md-4 control-label\">จำเลย</label>\r" +
    "\n" +
    "                                        <div class=\"col-md-7\">\r" +
    "\n" +
    "                                            <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.defendant\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <!-- Text input-->\r" +
    "\n" +
    "                                    <label class=\"col-md-2 control-label\">ข้อหาพิมพ์ปก</label>\r" +
    "\n" +
    "                                    <div class=\"col-md-9\">\r" +
    "\n" +
    "                                        <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.title\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <!-- Text input-->\r" +
    "\n" +
    "                                    <label class=\"col-md-2 control-label text-required\">ข้อหาสถิติ</label>\r" +
    "\n" +
    "                                    <div class=\"col-md-9\">\r" +
    "\n" +
    "                                        <div class=\"input-group\">\r" +
    "\n" +
    "                                            <div class=\"form-control\" style=\"height:auto;min-height:50px;border-right:none\">\r" +
    "\n" +
    "                                                <custom-choices ng-required ng-model=\"editingItem.topic_ids\"></custom-choices>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <div class=\"input-group-addon\" style=\"vertical-align:top;border-left:none;background-color:transparent\">\r" +
    "\n" +
    "                                                <button class=\"btn btn-circle\" ng-disabled=\"!editingItem.type_id\" id=\"edit-topics\" ng-click=\"popupTopics(editingItem)\"><span class=\"glyphicon glyphicon-pencil\"></span></button>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"form-group col-md-6\" ng-class=\"{'has-error':form.fcap.$invalid}\">\r" +
    "\n" +
    "                                    <!-- Text input-->\r" +
    "\n" +
    "                                    <label class=\"col-md-4 control-label\">จำนวนทุนทรัพย์</label>\r" +
    "\n" +
    "                                    <div class=\"col-md-7\">\r" +
    "\n" +
    "                                        <div class=\"input-group\">\r" +
    "\n" +
    "                                            <input type=\"text\" name=\"fcap\" placeholder=\"0.00\" ng-pattern=\"/^[0-9]+(\\.[0-9]{1,})?$/\" class=\"form-control input-md\" step=\"0.01\" ng-model=\"editingItem.capital\">\r" +
    "\n" +
    "                                            <span class=\"input-group-addon\">บาท</span>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"row clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                    <label class=\"control-label col-md-4\">สำนวนพ่วง</label>\r" +
    "\n" +
    "                                    <div class=\"col-md-7\">\r" +
    "\n" +
    "                                         <div class=\"input-group\">\r" +
    "\n" +
    "                                             <div class=\"input-group-addon\" style=\"xbackground-color:#fefefe\"><input disabled type=\"checkbox\" ng-model=\"editingItem.link_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"/></div>\r" +
    "\n" +
    "                                             <input type=\"text\" ng-disabled=\"editingItem.link_checked!='1'\" class=\"form-control\" ng-model=\"editingItem.link_ids\" placeholder=\"ไม่มีสำนวนพ่วง\" />\r" +
    "\n" +
    "                                         </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                    <label class=\"control-label col-md-4\">สำนวนรวม</label>\r" +
    "\n" +
    "                                    <div class=\"col-md-7\">\r" +
    "\n" +
    "                                        <div class=\"input-group\">\r" +
    "\n" +
    "                                            <div class=\"input-group-addon\" style=\"xbackground-color:#fefefe\"><input disabled type=\"checkbox\" ng-model=\"editingItem.add_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"/></div>\r" +
    "\n" +
    "                                            <p type=\"text\" ng-disabled=\"editingItem.add_checked!='1'\" class=\"form-control\" placeholder=\"ไม่มีสำนวนรวม\">\r" +
    "\n" +
    "                                                <span  class=\"label label-mr label-black\" ng-repeat=\"key in editingItem.add_ids |split\">{{key}}</span>\r" +
    "\n" +
    "                                                <span ng-if=\"!editingItem.add_ids\" class=\"text-muted\">ไม่มีสำนวนรวม</span>\r" +
    "\n" +
    "                                            </p>\r" +
    "\n" +
    "                                            <div class=\"input-group-addon\" title=\"เลือกคดี\" ng-controller=\"MergeCaseCtrl\" ng-click=\"ifcall(editingItem.add_checked=='1',open,'views/custom.select_cases_panel.html',editingItem)\"><span class=\"glyphicon glyphicon-th-list\"></span></div>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>                          \r" +
    "\n" +
    "                                <div class=\"form-group\">\r" +
    "\n" +
    "                                    <!-- Text input-->\r" +
    "\n" +
    "                                    <label class=\"col-md-2 control-label\">หมายเหตุ</label>\r" +
    "\n" +
    "                                    <div class=\"col-md-9\">\r" +
    "\n" +
    "                                        <textarea type=\"text\" rows=\"3\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.note1\"></textarea>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"col-md-10 col-md-offset-2\">\r" +
    "\n" +
    "                                    <div class=\"help-block\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <p class=\"text-info\">\r" +
    "\n" +
    "                                            <span class=\"glyphicon glyphicon-question-sign pull-left\"></span>\r" +
    "\n" +
    "                                            <ul>\r" +
    "\n" +
    "                                                <li ng-hide=\"isValid(editingItem)\" class=\"text-warning\">* ข้อมูลที่บังคับให้ต้องป้อนก่อน จึงจะสามารถบันทึกข้อมูลได้</li>\r" +
    "\n" +
    "                                                <li>ต้องเลือกประเภทคดีก่อนจึงจะสามารถ ป้อนเลขคดี และ ข้อหาหลักได้</li>\r" +
    "\n" +
    "                                                <li>ถ้ามีเลขคดีแล้วประเภทคดีไม่สามารถเปลี่ยนได้ (ต้องลบเลขคดีก่อน)</li>\r" +
    "\n" +
    "                                            </ul>\r" +
    "\n" +
    "                                        </p>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </fieldset> \r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"modal-footer\">\r" +
    "\n" +
    "                        <button type=\"button\" ng-disabled=\"(!isValid(editingItem)) || form.$invalid\" class=\"btn btn-primary btn-min\" ng-click=\"saveForm()\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                        <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"cancelForm()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-controller=\"CourtReportCtrl as xctrl\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div ui-view></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div ng-hide=\"!(urlEq('/court/cases') || urlEq('/court/cases/notify') || urlEq('/court/cases/notify2'))\">\r" +
    "\n" +
    "            <div class=\"panel panel-default\" ng-controller=\"CustomTableCtrl  as cmt\" ng-init=\"$parent.cmt=cmt;setAPI('court_cases','custom.court.form1.html',{search:'searchText', court:'searchCourt', month:'searchMonth', year:'searchYear',_view:'_view()'},{court:true, month:true,year:true})\">\r" +
    "\n" +
    "                <div class=\"panel-heading\">\r" +
    "\n" +
    "                    <div class=\"text-right pull-right\" style=\"position:relative;top:-0.25em\">\r" +
    "\n" +
    "                        <span class=\"btn btn-notify btn-info\" ng-click=\"notify()\" >สำนวนไม่ได้จัดส่ง<span class=\"notify\">{{TableMeta.notsent || 0}}</span></span>\r" +
    "\n" +
    "                        <span class=\"btn btn-notify btn-success\" ng-click=\"notify2()\" style=\"margin-right:4em\">สำเนาคำพิพากษาไม่ได้จัดส่ง<span class=\"notify\">{{TableMeta.notsent2 || 0}}</span></span>\r" +
    "\n" +
    "                        \r" +
    "\n" +
    "                        <span ng-hide=\"urlEq('/court/cases/notify')\" >\r" +
    "\n" +
    "                            <button class=\"btn btn-success\" ng-show=\"isSearchMode()\" ng-click=\"setFilter()\">\r" +
    "\n" +
    "                                <span class=\"glyphicon glyphicon-arrow-left\"></span> ออกจากโหมดการค้นหา\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                            <button class=\"btn btn-info\" ng-click=\"advancedSearch('custom.cases.search.html')\">\r" +
    "\n" +
    "                                <span class=\"glyphicon glyphicon-search\"></span><span class=\"hidden-sm hidden-xs\"> ค้นหา</span>\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <button ng-click=\"newItem({date_sent:today()})\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-plus\"></span><span class=\"hidden-sm hidden-xs\"> เพิ่มคดี</span></button>\r" +
    "\n" +
    "                            <button ng-click=\"ifcall(($it.no_case_sent!='1'),editItem)\" ng-show=\"($it.no_case_sent!='1') && hasSelected()\" class=\"btn btn-warning\" ng-switch on=\"$it.no_case_sent==2\">\r" +
    "\n" +
    "                            <span ng-switch-when=\"true\"><span class=\"glyphicon glyphicon-star-empty\"></span><span class=\"hidden-sm hidden-xs\"> ส่งรายงานคดี</span></span>\r" +
    "\n" +
    "                            <span ng-switch-default><span class=\"glyphicon glyphicon-pencil\"></span><span class=\"hidden-sm hidden-xs\"> แก้ไขคดี</span></span>                            \r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                            <button data-placement=\"bottom\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.popover.html\"\r" +
    "\n" +
    "                                    ng-click=\"removeItem()\" ng-show=\"($it.no_case_sent!='1') && hasSelected()\" class=\"btn btn-danger\" data-auto-close=\"true\">\r" +
    "\n" +
    "                                <span class=\"glyphicon glyphicon-remove\"></span><span class=\"hidden-sm hidden-xs\"> ลบคดี</span>\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <button class=\"btn btn-info\"  class=\"btn btn-success\" data-placement=\"left\" data-trigger=\"click\" bs-popover data-template=\"court.cases.reports.html\" data-auto-close=\"true\">\r" +
    "\n" +
    "                                <span class=\"glyphicon glyphicon-print\"></span><span class=\"hidden-sm hidden-xs\"> พิมพ์รายงาน</span>\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <h2 style=\"padding:0px;margin:0px;\"><span class=\"fa fa-windows\"></span> รายงานคดี ({{tableParams.total()}})</h2>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div loading-container=\"tableParams.settings().$loading\">\r" +
    "\n" +
    "                        <div class=\"row\" ng-show=\"!(isSearchMode() || urlEq('/court/cases/notify'))\">\r" +
    "\n" +
    "                            <div class=\"col-md-4 col-md-offset-1\">\r" +
    "\n" +
    "                                <div class=\"input-group\">\r" +
    "\n" +
    "                                    <div class=\"input-group-addon  adon-label\">ศาล</div>\r" +
    "\n" +
    "                                    <input type=\"text\" ng-init=\"searchCourt=getUser().id\" class=\"form-control\" value=\"{{getUser().name}}\" ng-readonly=\"true\" style=\"background-color:#ffffff\">\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"col-md-3\">\r" +
    "\n" +
    "                                <div class=\"input-group\">\r" +
    "\n" +
    "                                    <div class=\"input-group-addon  adon-label\">เดือน</div>\r" +
    "\n" +
    "                                    <select class=\"form-control\" ng-model=\"searchMonth\" ng-change=\"setMonthId(searchMonth);setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getMonth()\"></select>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"col-md-3\">\r" +
    "\n" +
    "                                <div class=\"input-group\">\r" +
    "\n" +
    "                                    <div class=\"input-group-addon  adon-label\">พ.ศ</div>\r" +
    "\n" +
    "                                    <select class=\"form-control\" ng-model=\"searchYear\" ng-change=\"setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getYear()\"></select>\r" +
    "\n" +
    "                                    <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter(true)\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-refresh\"></span></div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <hr />\r" +
    "\n" +
    "                        <div ng-table-menu=\"tableParams\"></div>\r" +
    "\n" +
    "                        <table ng-table-resizable ng-table=\"tableParams\" show-filter=\"false\" class=\"table table-hover table-bordered\" ng-table-init ng-table-init-columns wt-responsive-table>\r" +
    "\n" +
    "                            <tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                    ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                                    ng-dblclick=\"ifcall(($it.no_case_sent!='1'),editItem)\"\r" +
    "\n" +
    "                                    ng-class=\"{'active': isSelected(it),'text-red':it.no_case_sent=='1', 'text-info':it.no_case_sent==2, 'text-blue': isTextBlue(it)}\">\r" +
    "\n" +
    "                                    <td width=\"30\" class=\"text-right text-muted\"><span title=\"#{{it.id}}\">{{startIdx + $index + 1}}.</span></td>\r" +
    "\n" +
    "                                    <td data-title=\"'เลขรับสำนวนของภาค'\" sortable=\"'auto_received_num'\" hide\">\r" +
    "\n" +
    "                                        {{::it.auto_received_num}}\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'เลขคดีดำ'\" sortable=\"'number_black'\">\r" +
    "\n" +
    "                                        {{::it.number_black}}\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <td data-title=\"'โจทก์'\" sortable=\"'plaintiff'\">\r" +
    "\n" +
    "                                        {{::it.plaintiff}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'จำเลย'\" sortable=\"'defendant'\">\r" +
    "\n" +
    "                                        {{::it.defendant}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'ข้อหาพิมพ์ปก'\" sortable=\"'topic_ids'\">\r" +
    "\n" +
    "                                        {{::it.topic_ids | lookup_topic}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'ผลการส่งรายงานดดี'\" sortable=\"'command_id'\">\r" +
    "\n" +
    "                                        {{::it.command_id | lookup_at }}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'ผลการปฏิบัติ(ภาค)'\" sortable=\"'result'\">\r" +
    "\n" +
    "                                        {{::it.result | lookup_result}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'ส่งสำนวน'\" class=\"text-center\" ng-switch=\"caseReceived(it)\">\r" +
    "\n" +
    "                                        <span ng-switch-when=\"1\" class=\"label label-success\">ส่งแล้ว</span>\r" +
    "\n" +
    "                                        <span ng-switch-when=\"2\" class=\"label label-danger\">ไม่ต้องส่ง</span>\r" +
    "\n" +
    "                                        <span ng-switch-default class=\"label label-warning\">ยังไม่ได้ส่ง</span>\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'ส่งไฟล์คำพิพากษา'\" class=\"text-center\" ng-switch=\"caseCopyReceived(it)\">\r" +
    "\n" +
    "                                        <span ng-switch-when=\"1\" class=\"label label-success\">ส่งแล้ว</span>\r" +
    "\n" +
    "                                        <span ng-switch-when=\"2\" class=\"label label-danger\">ไม่ต้องส่ง</span>\r" +
    "\n" +
    "                                        <span ng-switch-default class=\"label label-warning\">ยังไม่ได้ส่ง</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <a ng-if=\"it.file2\" href=\"{{open_pdf(it.file2)}}\" target=\"_bank\"><span title=\"เปิดไฟล์คำพิพากษา {{it.file2}}\" class=\"label label-success\">ส่งแล้ว</span></a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <span ng-if=\"isSelected(it)\" title=\"เลือกทำรายการ\" class=\"row-action\">\r" +
    "\n" +
    "                                            <button class=\"btn btn-success btn-circle btn-xs\" data-placement=\"left\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.court.actions.html\"\r" +
    "\n" +
    "                                                    data-auto-close=\"true\">\r" +
    "\n" +
    "                                                <span class=\"glyphicon glyphicon-edit\"></span>\r" +
    "\n" +
    "                                            </button>\r" +
    "\n" +
    "                                        </span>\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </tr>\r" +
    "\n" +
    "                            </tbody>\r" +
    "\n" +
    "                        </table>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/court_cases_form1.html',
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\">\r" +
    "\n" +
    "        <h2 class=\"text-center\" style=\"margin-top:6px\">ส่งสำนวนและคำพิพากษาเพื่อตรวจร่าง {{editingItem.user_id | lookup_court}}</h2>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <form class=\"readonly form form-horizontal\" name=\"form\" style=\"padding-top:25px;padding-bottom:50px;\">\r" +
    "\n" +
    "            <fieldset>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขดำ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_black}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่รับฟ้อง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_case | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">โจทก์หรือผู้ร้อง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.plaintiff}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">จำเลย</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.defendant}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ประเภทคดี</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.type_id | lookup_type:'name':true}} - {{editingItem.type_id | lookup_type}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาพิมพ์ปก</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.title}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                    <div class=\"form-group col-md-6 \">\r" +
    "\n" +
    "                        <label class=\"control-label col-md-4\">ข้อหาสถิติ</label>\r" +
    "\n" +
    "                        <div class=\"col-md-8\">\r" +
    "\n" +
    "                            <custom-readonly-topics  ng-model=\"editingItem.topic_ids\"></custom-readonly-topics>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        \r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                        <label class=\"control-label col-md-4\">ผลการส่งรายงานคดี</label>\r" +
    "\n" +
    "                        <div class=\"col-md-8\">\r" +
    "\n" +
    "                            <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.command_id | lookup_at}}\">\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                        <label class=\"control-label col-md-4\">ผลการปฏิบัติ (ภาค)</label>\r" +
    "\n" +
    "                        <div class=\"col-md-8\">\r" +
    "\n" +
    "                            <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.result | lookup_result}}\">\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "               <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนพ่วง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                         <div class=\"input-group\">\r" +
    "\n" +
    "                             <div class=\"input-group-addon\"  style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.link_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"  disabled/></div>\r" +
    "\n" +
    "                             <input type=\"text\" readonly  class=\"form-control\" ng-model=\"editingItem.link_ids\" placeholder=\"ไม่มีสำนวนพ่วง\" />\r" +
    "\n" +
    "                         </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนรวม</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div class=\"input-group\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon\" style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.add_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\" disabled/></div>\r" +
    "\n" +
    "                            <p type=\"text\" class=\"form-control\" style=\"background-color:#F9DADA\">\r" +
    "\n" +
    "                                <span  class=\"label label-mr label-black\" ng-repeat=\"key in editingItem.add_ids |split\">{{key}}</span>\r" +
    "\n" +
    "                                <span ng-if=\"!editingItem.add_ids\" class=\"text-muted\">ไม่มีสำนวนรวม</span>\r" +
    "\n" +
    "                            </p>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>      \r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"row clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "                    <div class=\"form-group col-md-6 has-feedback custom-dropdown\">\r" +
    "\n" +
    "                        <label class=\"control-label col-md-4 text-required\">ผู้พิพากษาเจ้าของสำนวน</label>\r" +
    "\n" +
    "                        <div class=\"col-md-8\">\r" +
    "\n" +
    "                            <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge_id\" data-options=\"judge_court_options\"></div>\r" +
    "\n" +
    "                            <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "                         </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"form-group col-md-6 has-feedback custom-dropdown\">\r" +
    "\n" +
    "                        <label class=\"control-label col-md-4\">องค์คณะ</label>\r" +
    "\n" +
    "                        <div class=\"col-md-8\">\r" +
    "\n" +
    "                                <div custom-dropdown class=\"form-control input-md\"   ng-model=\"editingItem.judge3_id\" data-options=\"judge_court_options\"></div>\r" +
    "\n" +
    "                                <span class=\"form-control-feedback\" ><span class=\"caret\"></span></span>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">จำเลยต้องขัง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"input-group\">\r" +
    "\n" +
    "                            <select class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.imprison_id\" select-default ng-options=\"it.id as it.name for it  in Lookups.getImprison()\">\r" +
    "\n" +
    "                                <option value=\"\"></option>\r" +
    "\n" +
    "                            </select>\r" +
    "\n" +
    "                            <span class=\"input-group-addon btn\" id=\"add-imprison\" ng-click=\"popupImprison()\"><span class=\"glyphicon glyphicon-plus\"></span></span>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">จำเลยสารภาพ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div class=\"input-group\">\r" +
    "\n" +
    "                            <select class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.accept_id\" select-default ng-options=\"it.id as it.name for it  in Lookups.getAccept()\">\r" +
    "\n" +
    "                                <option value=\"\"></option>\r" +
    "\n" +
    "                            </select>\r" +
    "\n" +
    "                            <span class=\"input-group-addon btn\" id=\"add-accept\" ng-click=\"popupAccept()\"><span class=\"glyphicon glyphicon-plus\"></span></span>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4 text-required\">วันที่นัดฟังคำพิพากษา</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <span mode=\"0\" ng-model=\"editingItem.date_ap\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span> \r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4 text-required\">วันที่ส่งสำนวน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <span mode=\"0\" ng-model=\"editingItem.date_sent2\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span> \r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4 text-required\">เลขที่หนังสือออก(ส่งสำนวน)</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\"  class=\"form-control input-md\" ng-model=\"editingItem.number_sent2\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                <hr />\r" +
    "\n" +
    "                <div ng-if=\"editingItem.return_checked=='1'\">\r" +
    "\n" +
    "                    <div class=\"col-md-8 col-md-offset-2\" ng-controller=\"CourtForm1Ctrl as f1ctrl\" ng-init=\"xctrl.f1=f1ctrl;load(editingItem.id)\">\r" +
    "\n" +
    "                        <div style=\"margin-bottom:1em;\">\r" +
    "\n" +
    "                            <span ios-toggle ng-model=\"editingItem.return2_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"></span>\r" +
    "\n" +
    "                            <h4 style=\"display:inline;padding-left:1em\"><strong>ส่งสำนวนเพื่อตรวจซ้ำ</strong></h4>\r" +
    "\n" +
    "                            <button ng-if=\"editingItem.return2_checked=='1'\" ng-click=\"addItem()\" class=\"btn btn-primary pull-right\">\r" +
    "\n" +
    "                                <span class=\"glyphicon glyphicon-plus\"></span> ส่งสำนวนเพื่อตรวจซ้ำ\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ng-if=\"editingItem.return2_checked=='1'\">\r" +
    "\n" +
    "                            <table class=\"table table-hover table-bordered\">\r" +
    "\n" +
    "                                <thead>\r" +
    "\n" +
    "                                    <tr>\r" +
    "\n" +
    "                                        <th>ครั้งที่</th>\r" +
    "\n" +
    "                                        <th>เลขที่ส่ง</th>\r" +
    "\n" +
    "                                        <th>วันที่ส่ง</th>\r" +
    "\n" +
    "                                        <th colspan=\"2\">หมายเหตุ</th>\r" +
    "\n" +
    "                                    </tr>\r" +
    "\n" +
    "                                </thead>\r" +
    "\n" +
    "                                <tbody>\r" +
    "\n" +
    "                                    <tr ng-repeat=\"it in items\">\r" +
    "\n" +
    "                                        <td width=\"80\" class=\"text-center\"><strong>{{$index+1}}</strong></td>\r" +
    "\n" +
    "                                        <td width=\"25%\"><input type=\"text\" ng-model=\"it['number_sent']\" class=\"form-control\" placeholder=\"ยังไม่มีข้อมูล\" /></td>\r" +
    "\n" +
    "                                        <td width=\"25%\"><span mode=\"0\" ng-model=\"it['date_sent']\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span></td>\r" +
    "\n" +
    "                                        <td><input class=\"form-control\" ng-model=\"it['note_sent']\" /></td>\r" +
    "\n" +
    "                                        <td style=\"width:1em\" class=\"text-danger\"><span class=\"btn\" ng-click=\"setRemoveItem(it)\" title=\"ลบรายการส่งสำนวนเพื่อตรวจซ้ำนี้ออก\" data-placement=\"left\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.popover.html\" data-auto-close=\"true\"><span class=\"glyphicon glyphicon-remove\"></span></span></td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </tr>\r" +
    "\n" +
    "                                    <tr ng-if=\"!items.length\">\r" +
    "\n" +
    "                                        <td colspan=\"4\">\r" +
    "\n" +
    "                                            <h3 class=\"text-muted text-center\">ยังไม่มีรายการส่งสำนวนเพื่อตรวจซ้ำ</h3>\r" +
    "\n" +
    "                                        </td>\r" +
    "\n" +
    "                                    </tr>\r" +
    "\n" +
    "                                </tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-2\">หมายเหตุ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-9\">\r" +
    "\n" +
    "                        <textarea  rows=\"3\" class=\"form-control\" ng-model=\"editingItem.note2\"></textarea>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </fieldset>\r" +
    "\n" +
    "            <div class=\"col-md-10 col-md-offset-2\" ng-hide=\"isValid1(editingItem)\">\r" +
    "\n" +
    "                <div class=\"help-block\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <p class=\"text-info\" >\r" +
    "\n" +
    "                        <span class=\"glyphicon glyphicon-question-sign pull-left\"></span>\r" +
    "\n" +
    "                        <ul>\r" +
    "\n" +
    "                            <li  class=\"text-warning\">* ข้อมูลที่บังคับให้ต้องป้อนก่อน จึงจะสามารถบันทึกข้อมูลได้</li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </ul>\r" +
    "\n" +
    "                    </p>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"panel-footer\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" ng-disabled=\"!isValid1(editingItem)\" class=\"btn btn-success btn-block\" ng-click=\"saveForm(editingItem,1,xctrl.f1)\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-block\" ng-click=\"goBack()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/court_cases_form2.html',
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\" >\r" +
    "\n" +
    "        <h3 class=\"text-center\" style=\"margin-top:6px\">รายงานการจัดส่งสำเนาคำพิพากษา (หลังการอ่านคำพิพากษา 15 วัน) {{editingItem.user_id | lookup_court}}</h3>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <form class=\"readonly form form-horizontal\" name=\"form\" style=\"padding-top:25px;padding-bottom:50px;\">\r" +
    "\n" +
    "            <fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขดำ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_black}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่รับฟ้อง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_case | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">โจทก์หรือผู้ร้อง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.plaintiff}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">จำเลย</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.defendant}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ประเภทคดี</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.type_id | lookup_type:'name':true}} - {{editingItem.type_id | lookup_type}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "       \r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาพิมพ์ปก</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.title}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ผลการส่งสำนวน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.command_id | lookup_at}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                    <div class=\"form-group col-md-6 \">\r" +
    "\n" +
    "                        <label class=\"control-label col-md-4\">ข้อหาสถิติ</label>\r" +
    "\n" +
    "                        <div class=\"col-md-8\">\r" +
    "\n" +
    "                            <custom-readonly-topics ng-model=\"editingItem.topic_ids\"></custom-readonly-topics>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                        <label class=\"control-label col-md-4\">ผลการปฏิบัติ (ภาค)</label>\r" +
    "\n" +
    "                        <div class=\"col-md-8\">\r" +
    "\n" +
    "                            <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.result | lookup_result}}\">\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันนัดฟังคำพิพากษา</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_ap | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"row clearfix\"> </div>\r" +
    "\n" +
    "               <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนพ่วง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                         <div class=\"input-group\">\r" +
    "\n" +
    "                             <div class=\"input-group-addon\"  style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.link_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"  disabled/></div>\r" +
    "\n" +
    "                             <input type=\"text\" readonly  class=\"form-control\" ng-model=\"editingItem.link_ids\" placeholder=\"ไม่มีสำนวนพ่วง\" />\r" +
    "\n" +
    "                         </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนรวม</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div class=\"input-group\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon\" style=\"background-color:#fefefe\"><input type=\"checkbox\" ng-model=\"editingItem.add_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"/></div>\r" +
    "\n" +
    "                            <p type=\"text\" ng-disabled=\"editingItem.add_checked!='1'\" class=\"form-control\" >\r" +
    "\n" +
    "                                <span  class=\"label label-mr label-black\" ng-repeat=\"key in editingItem.add_ids |split\">{{key}}</span>\r" +
    "\n" +
    "                                <span ng-if=\"!editingItem.add_ids\" class=\"text-muted\">ไม่มีสำนวนรวม</span>\r" +
    "\n" +
    "                            </p>\r" +
    "\n" +
    "                            <div class=\"input-group-addon\" title=\"เลือกคดี\" ng-controller=\"MergeCaseCtrl\" ng-click=\"ifcall(editingItem.add_checked=='1',open,'views/custom.select_cases_panel.html',editingItem)\"><span class=\"glyphicon glyphicon-th-list\"></span></div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>  \r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "                    <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                        <label class=\"control-label col-md-4 text-required\">เลขที่คดีแดง</label>\r" +
    "\n" +
    "                        <div class=\"col-md-8\">\r" +
    "\n" +
    "                            <input type=\"text\" class=\"form-control input-md\" ng-model=\"editingItem.number_red\">\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6 has-feedback custom-dropdown\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4 text-required\">ผู้พิพากษาเจ้าของสำนวน</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge_id\" data-options=\"judge_court_options\"></div>\r" +
    "\n" +
    "                        <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4 text-required\">วันที่อ่านคำพิพากษา</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <span mode=\"0\" ng-model=\"editingItem.date_read\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span> \r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div><div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4 text-required\">วันที่ส่งสำเนาคำพิพากษา</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <span mode=\"0\" ng-model=\"editingItem.date_sent3\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span> \r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4 text-required\">เลขที่หนังสือส่งสำเนาคำพิพากษา</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\"  class=\"form-control input-md\" ng-model=\"editingItem.number_sent3\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row clearfix\"></div>\r" +
    "\n" +
    "                <div class=\"form-group\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-2\">หมายเหตุ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-9\">\r" +
    "\n" +
    "                        <textarea  rows=\"3\" class=\"form-control\" ng-model=\"editingItem.note3\"></textarea>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </fieldset>\r" +
    "\n" +
    "            <div class=\"col-md-10 col-md-offset-2\" ng-hide=\"isValid2(editingItem)\">\r" +
    "\n" +
    "                <div class=\"help-block\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <p class=\"text-info\">\r" +
    "\n" +
    "                        <span class=\"glyphicon glyphicon-question-sign pull-left\"></span>\r" +
    "\n" +
    "                        <ul>\r" +
    "\n" +
    "                            <li class=\"text-warning\">* ข้อมูลที่บังคับให้ต้องป้อนก่อน จึงจะสามารถบันทึกข้อมูลได้</li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </ul>\r" +
    "\n" +
    "                    </p>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"panel-footer\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" ng-disabled=\"!isValid2(editingItem)\"  class=\"btn btn-success btn-block\" ng-click=\"saveForm(editingItem,1)\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-6\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-block\" ng-click=\"goBack()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/court_cases_form3.html',
    "<style>\r" +
    "\n" +
    ".file-upload {\r" +
    "\n" +
    "    position: relative;\r" +
    "\n" +
    "    overflow: hidden;\r" +
    "\n" +
    "    margin: 10px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".file-upload input.upload {\r" +
    "\n" +
    "    position: absolute;\r" +
    "\n" +
    "    top: 0;\r" +
    "\n" +
    "    right: 0;\r" +
    "\n" +
    "    margin: 0;\r" +
    "\n" +
    "    padding: 0;\r" +
    "\n" +
    "    font-size: 20px;\r" +
    "\n" +
    "    cursor: pointer;\r" +
    "\n" +
    "    opacity: 0;\r" +
    "\n" +
    "    filter: alpha(opacity=0);\r" +
    "\n" +
    "}\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\">\r" +
    "\n" +
    "        <h2 class=\"text-center\" style=\"margin-top:6px\">UPLOAD ไฟล์คำพิพากษา {{editingItem.user_id | lookup_court}}</h2>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <form class=\"readonly form form-horizontal\" name=\"form\" style=\"padding-top:25px;padding-bottom:50px;\">\r" +
    "\n" +
    "            <fieldset >\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <!-- file1 -->\r" +
    "\n" +
    "                <div ng-controller=\"FlowUploadCtrl as upflow\" ng-init=\"upflow.linkScope(currentScope())\" class=\"form-group\" ng-class=\"{ 'has-error' : form.fd1.$invalid && form.$dirty}\">\r" +
    "\n" +
    "                   \r" +
    "\n" +
    "                    <label class=\"col-md-4 control-label\">ไฟล์สำเนาตรวจร่าง (.pdf)</label>\r" +
    "\n" +
    "                    <div class=\"col-md-7\">\r" +
    "\n" +
    "                          <input type=\"text\" placeholder=\"ยังไม่ได้อัพโหลด\" value=\"{{editingItem.file1}}\" readonly class=\"form-control\">\r" +
    "\n" +
    "                            <!--begin upload-->\r" +
    "\n" +
    "                        \r" +
    "\n" +
    "                            <div ng-if=\"editingItem.id\" style=\"padding-top:1em\" flow-init=\"{target: API_URL + 'upload/' + editingItem.id + '/file1'}\" flow-file-added=\"upflow.setFlow($flow,$file);\" flow-files-added=\"upflow.setFlow($flow); upflow.setFlowState(1)\" flow-upload-started=\"upflow.setFlowState(2)\" flow-complete=\"upflow.checkFlow()\" flow-file-success=\"$file.response = $message\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div ng-hide=\"upflow.getFlowState()==2\" style=\"padding-bottom:1em\" ng-if=\"$flow.files.length<1\">\r" +
    "\n" +
    "                                    <span class=\"btn btn-success\" flow-btn flow-single-file=\"true\" flow-attrs=\"{accept:'application/pdf'}\" style=\"min-width:20em\"><span class=\"fa fa-file-pdf-o\"></span> อัพโหลดไฟล์สำเนาตรวจร่าง</span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <h4 ng-show=\"upflow.getFlowState()==2\">กำลังอัพโหลดไฟล์<br><small>กรุณารอจนกว่าจะอัพโหลดเสร็จ...</small></h4>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"well\" ng-if=\"$flow.files.length && upflow.getFlowState()\">\r" +
    "\n" +
    "                                    <div ng-repeat=\"file in $flow.files\" class=\"transfer-box\">\r" +
    "\n" +
    "                                        <div>\r" +
    "\n" +
    "                                            {{file.name}} ({{file.size}}bytes)\r" +
    "\n" +
    "                                            <div class=\"progress progress-striped\" ng-class=\"{active: file.isUploading()}\">\r" +
    "\n" +
    "                                                <div class=\"progress-bar\" role=\"progressbar\" ng-class=\"{'progress-bar-success':file.isComplete(),'progress-bar-danger':file.error}\" aria-valuenow=\"{{file.progress() * 100}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" ng-style=\"{width: (file.progress() * 100) + '%'}\">\r" +
    "\n" +
    "                                                    <span class=\"sr-only\">{{file.progress()}}% Complete</span>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <div style=\"padding-bottom:1em;\">\r" +
    "\n" +
    "                                                <a ng-show=\"upflow.getFlowState()==1\" class=\"btn btn-mini btn-success\" ng-click=\"uploadFlow($flow)\" style=\"min-width:12em\"><span class=\"glyphicon glyphicon-ok\"></span> เริ่มอัพโหลด</a>\r" +
    "\n" +
    "                                                <a ng-show=\"upflow.getFlowState()==-1 || (upflow.getFlowState()==2 && !$flow.isUploading())\" class=\"btn btn-mini btn-success\" ng-click=\"upflow.retry()\" style=\"min-width:12em\"><span class=\"glyphicon glyphicon-repeat\"></span> อัพโหลดใหม่</a>\r" +
    "\n" +
    "                                                <a ng-show=\"$flow.isUploading()\" class=\"btn btn-small btn-warning\" ng-click=\"$flow.pause()\">หยุดอัพโหลดไฟล์</a>\r" +
    "\n" +
    "                                                <a ng-show=\"$flow.files.length && upflow.getFlowState()\" class=\"btn btn-small btn-danger\" ng-click=\"$flow.cancel();upflow.checkFlow()\" style=\"min-width:12em\"><span class=\"glyphicon glyphicon-remove\"></span> ยกเลิกคิวอัพโหลดไฟล์</a>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <p class=\"text-center\" style=\"height:0px\"><span id=\"_btn_upload_\">&nbsp;</span></p>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <p>\r" +
    "\n" +
    "                                วิธีการตั้งชื่อไฟล์ Upload<br />\r" +
    "\n" +
    "                                ให้หน่วยงานตั้งชื่อเป็นภาษาอังกฤษและสื่อถึงหมายเลขคดีนั้นๆ<br />\r" +
    "\n" +
    "                                R = คดีอาญา, P = สำหรับคดีแพ่ง, PB=สำหรับคดีผู้บริโภค<br />\r" +
    "\n" +
    "                                เช่น R2-56A(คือ อ.2/2556)<br />\r" +
    "\n" +
    "                                โดยห้ามตั้งชื่อโดยใช้อักขระพิเศษ \\\\ / : ; * ? \" ' < > | หรือภาษาไทย\r" +
    "\n" +
    "                            </p>\r" +
    "\n" +
    "                            <!-- end upload -->\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "         \r" +
    "\n" +
    "                <!-- file2 -->\r" +
    "\n" +
    "                <div ng-controller=\"FlowUploadCtrl as upflow\" ng-init=\"upflow.linkScope(currentScope())\" class=\"form-group\" ng-class=\"{ 'has-error' : form.fd1.$invalid && form.$dirty}\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <label class=\"col-md-4 control-label\">ไฟล์สำเนาคำพิพากษา (.pdf)</label>\r" +
    "\n" +
    "                    <div class=\"col-md-7\">\r" +
    "\n" +
    "                        <input type=\"text\" placeholder=\"ยังไม่ได้อัพโหลด\" value=\"{{editingItem.file2}}\" readonly class=\"form-control\">\r" +
    "\n" +
    "                        <!--begin upload-->\r" +
    "\n" +
    "                        \r" +
    "\n" +
    "                            <div ng-if=\"editingItem.id\" style=\"padding-top:1em\" flow-init=\"{target: API_URL + 'upload/' + editingItem.id + '/file2'}\" flow-file-added=\"upflow.setFlow($flow,$file);\" flow-files-added=\"upflow.setFlow($flow); upflow.setFlowState(1)\" flow-upload-started=\"upflow.setFlowState(2)\" flow-complete=\"upflow.checkFlow()\" flow-file-success=\"$file.response = $message\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div ng-hide=\"upflow.getFlowState()==2\" style=\"padding-bottom:1em\" ng-if=\"$flow.files.length<1\">\r" +
    "\n" +
    "                                    <span class=\"btn btn-success\" flow-btn flow-single-file=\"true\" flow-attrs=\"{accept:'application/pdf'}\" style=\"min-width:20em\"><span class=\"fa fa-file-pdf-o\"></span> อัพโหลดไฟล์สำเนาคำพิพากษา</span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <h4 ng-show=\"upflow.getFlowState()==2\">กำลังอัพโหลดไฟล์<br><small>กรุณารอจนกว่าจะอัพโหลดเสร็จ...</small></h4>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div class=\"well\" ng-if=\"$flow.files.length && upflow.getFlowState()\">\r" +
    "\n" +
    "                                    <div ng-repeat=\"file in $flow.files\" class=\"transfer-box\">\r" +
    "\n" +
    "                                        <div>\r" +
    "\n" +
    "                                            {{file.name}} ({{file.size}}bytes)\r" +
    "\n" +
    "                                            <div class=\"progress progress-striped\" ng-class=\"{active: file.isUploading()}\">\r" +
    "\n" +
    "                                                <div class=\"progress-bar\" role=\"progressbar\" ng-class=\"{'progress-bar-success':file.isComplete(),'progress-bar-danger':file.error}\" aria-valuenow=\"{{file.progress() * 100}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" ng-style=\"{width: (file.progress() * 100) + '%'}\">\r" +
    "\n" +
    "                                                    <span class=\"sr-only\">{{file.progress()}}% Complete</span>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <div style=\"padding-bottom:1em;\">\r" +
    "\n" +
    "                                                <a ng-show=\"upflow.getFlowState()==1\" class=\"btn btn-mini btn-success\" ng-click=\"uploadFlow($flow)\" style=\"min-width:12em\"><span class=\"glyphicon glyphicon-ok\"></span> เริ่มอัพโหลด</a>\r" +
    "\n" +
    "                                                <a ng-show=\"upflow.getFlowState()==-1 || (upflow.getFlowState()==2 && !$flow.isUploading())\" class=\"btn btn-mini btn-success\" ng-click=\"upflow.retry()\" style=\"min-width:12em\"><span class=\"glyphicon glyphicon-repeat\"></span> อัพโหลดใหม่</a>\r" +
    "\n" +
    "                                                <a ng-show=\"$flow.isUploading()\" class=\"btn btn-small btn-warning\" ng-click=\"$flow.pause()\">หยุดอัพโหลดไฟล์</a>\r" +
    "\n" +
    "                                                <a ng-show=\"$flow.files.length && upflow.getFlowState()\" class=\"btn btn-small btn-danger\" ng-click=\"$flow.cancel();upflow.checkFlow()\" style=\"min-width:12em\"><span class=\"glyphicon glyphicon-remove\"></span> ยกเลิกคิวอัพโหลดไฟล์</a>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <p class=\"text-center\" style=\"height:0px\"><span id=\"_btn_upload_\">&nbsp;</span></p>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <p>\r" +
    "\n" +
    "                                วิธีการตั้งชื่อไฟล์ Upload<br />\r" +
    "\n" +
    "                                ให้หน่วยงานตั้งชื่อเป็นภาษาอังกฤษและสื่อถึงหมายเลขคดีนั้นๆ<br />\r" +
    "\n" +
    "                                R = คดีอาญา, P = สำหรับคดีแพ่ง, PB=สำหรับคดีผู้บริโภค<br />\r" +
    "\n" +
    "                                เช่น R2-56(คือ อ.2/2556)<br />\r" +
    "\n" +
    "                                โดยห้ามตั้งชื่อโดยใช้อักขระพิเศษ \\\\ / : ; * ? \" ' < > | หรือภาษาไทย\r" +
    "\n" +
    "                            </p>\r" +
    "\n" +
    "                        <!-- end upload -->\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </fieldset>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"panel-footer\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-block\" ng-click=\"goBack()\"><span class=\"glyphicon glyphicon-arrow-left\"></span> กลับไปหน้าหลัก</button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/court_cases_form4.html',
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\">\r" +
    "\n" +
    "        <h2 class=\"text-center\" style=\"margin-top:6px\">ระบบติดตามการจัดส่งรายงานคดี</h2>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <form class=\"readonly form form-horizontal\" name=\"form\" style=\"padding-top:25px;padding-bottom:50px;\">\r" +
    "\n" +
    "            <div class=\"row\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขดำ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_black}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขแดง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_red}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">โจทก์หรือผู้ร้อง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.plaintiff}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">จำเลย</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.defendant}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาพิมพ์ปก</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.title}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">คำสั่ง อธ.</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.command_id | lookup_at}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ข้อหาสถิติ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <custom-readonly-topics ng-model=\"editingItem.topic_ids\"></custom-readonly-topics>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ผลการปฏิบัติ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.result | lookup_result}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "               <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนพ่วง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                         <div class=\"input-group\">\r" +
    "\n" +
    "                             <div class=\"input-group-addon\"  style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.link_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"  disabled/></div>\r" +
    "\n" +
    "                             <input type=\"text\" readonly  class=\"form-control\" ng-model=\"editingItem.link_ids\" placeholder=\"ไม่มีสำนวนพ่วง\" />\r" +
    "\n" +
    "                         </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">สำนวนรวม</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <div class=\"input-group\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon\" style=\"background-color:#F9DADA\"><input type=\"checkbox\" ng-model=\"editingItem.add_checked\" ng-true-value=\"'1'\" ng-false-value=\"'0'\" disabled/></div>\r" +
    "\n" +
    "                            <p type=\"text\" class=\"form-control\" style=\"background-color:#F9DADA\">\r" +
    "\n" +
    "                                <span  class=\"label label-mr label-black\" ng-repeat=\"key in editingItem.add_ids |split\">{{key}}</span>\r" +
    "\n" +
    "                                <span ng-if=\"!editingItem.add_ids\" class=\"text-muted\">ไม่มีสำนวนรวม</span>\r" +
    "\n" +
    "                            </p>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>      \r" +
    "\n" +
    "           <div class=\"row\">\r" +
    "\n" +
    "                <legend style=\"padding-top:2em\" class=\"text-center text-info\">ร่างคำสั่ง</legend>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"row\">\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ภาครับ </label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_received3_a | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่รับ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_received3_a}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ภาคส่งคืนร่างคำสั่ง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_sent5_a   | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่คำสั่ง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_sent5_a }}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>                \r" +
    "\n" +
    "            <div class=\"row\">\r" +
    "\n" +
    "                <legend style=\"padding-top:2em\" class=\"text-center text-info\">ส่งรายงานคดี</legend>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"row\">\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">วันที่ภาครับรายงาน </label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_received | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่รับ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_received}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ภาคส่งคืนรายงานคดีวันที่</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_sent4\t | thai_date}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่ส่ง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_sent4\t}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"row\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <legend style=\"padding-top:2em\" class=\"text-center text-info\">ส่งสำนวน</legend>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"row\">\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ภาครับวันที่</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                       \r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_received3 | thai_date}}\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                   \r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่รับ</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                      \r" +
    "\n" +
    "                            <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_received3}}\">\r" +
    "\n" +
    "                       \r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ภาคส่งคืนสำนวนวันที่</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_sent5 | thai_date}}\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">เลขที่ส่ง</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.number_sent5}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ผู้พิพากษาผู้ตรวจ 1</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.judge2_id |lookup_judge}}\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                    <label class=\"control-label col-md-4\">ผู้พิพากษาผู้ตรวจ 2</label>\r" +
    "\n" +
    "                    <div class=\"col-md-8\">\r" +
    "\n" +
    "                        <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.judge3_id |lookup_judge}}\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                     \r" +
    "\n" +
    "                     \r" +
    "\n" +
    "                     <legend style=\"padding-top:2em\" class=\"text-center text-info\">ส่งสำเนาคำพิพากษา</legend>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                     <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                         <label class=\"control-label col-md-4\">ภาครับวันที่</label>\r" +
    "\n" +
    "                         <div class=\"col-md-8\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                             \r" +
    "\n" +
    "                                 <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{editingItem.date_received4 | thai_date}}\">\r" +
    "\n" +
    "                             \r" +
    "\n" +
    "\r" +
    "\n" +
    "                         </div>\r" +
    "\n" +
    "                     </div>\r" +
    "\n" +
    "                     <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                         <label class=\"control-label col-md-4\">จำนวนไฟล์ที่ได้รับ</label>\r" +
    "\n" +
    "                         <div class=\"col-md-8\">\r" +
    "\n" +
    "                           \r" +
    "\n" +
    "                                 <input type=\"text\" readonly class=\"form-control input-md\" value=\"{{countFile(editingItem)}}\">\r" +
    "\n" +
    "                           \r" +
    "\n" +
    "                         </div>\r" +
    "\n" +
    "                     </div>\r" +
    "\n" +
    "                     <br /><br />\r" +
    "\n" +
    " \r" +
    "\n" +
    "</form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"panel-footer\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-primary btn-block\" ng-click=\"goBack()\"><span class=\"glyphicon glyphicon-arrow-left\"></span> กลับไปหน้าหลัก</button>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/court_manages.html',
    "<div ui-view></div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/court_manages_menu.html',
    "<h1 class=\"page-header text-center\">\r" +
    "\n" +
    "เตรียมข้อมูล\r" +
    "\n" +
    "</h1>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row\">\r" +
    "\n" +
    "      <div class=\"col-md-4 col-lg-3\">\r" +
    "\n" +
    "            <a href=\"#court/manages/users\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-user\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">ผู้ใช้</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "        <div class=\"col-md-4 col-lg-3\">\r" +
    "\n" +
    "            <a href=\"#court/menu\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\t\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-th-large\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">เมนูหลัก</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/court_menu.html',
    "<style>\r" +
    "\n" +
    ".bg2{\r" +
    "\n" +
    "\tmargin-top:-60px;\r" +
    "\n" +
    "\tdisplay: block;\r" +
    "\n" +
    "\tposition:relative;\r" +
    "\n" +
    "\tbackground-image: url('images/bg.png');\r" +
    "\n" +
    "\tbackground-repeat:no-repeat;\r" +
    "\n" +
    "\tbackground-position:  center;\r" +
    "\n" +
    "\twidth: 600px;\r" +
    "\n" +
    "\theight:322px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".bg2-btn{\r" +
    "\n" +
    "\tdisplay: block;\r" +
    "\n" +
    "\tposition: absolute;\r" +
    "\n" +
    "\tcursor:pointer;\r" +
    "\n" +
    "\topacity:1;\r" +
    "\n" +
    "\tbackground-repeat:no-repeat;\r" +
    "\n" +
    "\tbackground-position:  center;\r" +
    "\n" +
    "\tbackground-size: cover;\r" +
    "\n" +
    "\twidth: 120px !important;\r" +
    "\n" +
    "\theight: 120px !important;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".bg2-btn1{\r" +
    "\n" +
    "\tbackground-image: url('images/menu1.png');\r" +
    "\n" +
    "\tleft:-90px;  top:180px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".bg2-btn2{\r" +
    "\n" +
    "\tbackground-image: url('images/menu2.png');\r" +
    "\n" +
    "\tleft:80px;  bottom:-50px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".bg2-btn3{\r" +
    "\n" +
    "\tbackground-image: url('images/menu3.png');\r" +
    "\n" +
    "\tleft:250px;  bottom:-100px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".bg2-btn4{\r" +
    "\n" +
    "\tbackground-image: url('images/exit.png');\r" +
    "\n" +
    "\tright:-110px;  top:180px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".bg2-btn5{\r" +
    "\n" +
    "\tbackground-image: url('images/menu5.png');\r" +
    "\n" +
    "\tright:60px;  bottom:-50px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".bg2-btn1:hover, .bg2-btn2:hover, .bg2-btn3:hover, .bg2-btn4:hover, .bg2-btn5:hover{\r" +
    "\n" +
    "\topacity:1 !important;\r" +
    "\n" +
    "\tfilter: saturate(200%);\r" +
    "\n" +
    "\t-webkit-filter: saturate(200%);\r" +
    "\n" +
    "\t-mos-filter: saturate(200%);\r" +
    "\n" +
    "\t-ms-filter: saturate(200%);\r" +
    "\n" +
    "\t-o: saturate(200%);\r" +
    "\n" +
    "\ttransform: scale(1.5,1.5);\r" +
    "\n" +
    "\t-webkit-transform: scale(1.5,1.5);\r" +
    "\n" +
    "\t-mos-transform: scale(1.5,1.5);\r" +
    "\n" +
    "\t-ms-transform: scale(1.5,1.5);\r" +
    "\n" +
    "\t-o-transform: scale(1.5,1.5);\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "<!--\r" +
    "\n" +
    "<h2 class=\"page-header text-center\" style=\"border-bottom:none\">\r" +
    "\n" +
    "    ระบบสารสนเทศการรายงานคดีและติดตามสำนวนที่ส่งตรวจร่างคำพิพากษา<br />\r" +
    "\n" +
    "    <small>{{getUser().name}}</small>\r" +
    "\n" +
    "</h2>\r" +
    "\n" +
    "-->\r" +
    "\n" +
    "<div  class=\"bg2 center-block\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t<div class=\"bg2-btn bg2-btn1\" ng-click=\"goTo('court.acases')\"></div>\r" +
    "\n" +
    "\t<div class=\"bg2-btn bg2-btn2\" ng-click=\"goTo('court.cases')\"></div>\r" +
    "\n" +
    "\t<div class=\"bg2-btn bg2-btn3\" ng-click=\"goTo('court.vcases')\"></div>\r" +
    "\n" +
    "\t<div class=\"bg2-btn bg2-btn4\" data-placement=\"left\" data-trigger=\"click\" bs-popover data-template=\"custom.logout.popover.html\" data-auto-close=\"true\"></div>\r" +
    "\n" +
    "\t<div class=\"bg2-btn bg2-btn5\" ng-click=\"goTo('court.manages.menu')\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/court_print_report1.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\" ng-init=\"options.date_from=today()\">\r" +
    "\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "\t\t<div class=\"panel panel-default\">\r" +
    "\n" +
    "\t\t  <div class=\"panel-heading\">\r" +
    "\n" +
    "\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\r" +
    "\n" +
    "\t\t    \t<h4 class=\"text-info\">รายงานการจัดส่งคดี ไปยังสำนักงานอธิบดีผู้พิพากษาภาค5</h4>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t  <div class=\"panel-body\">\r" +
    "\n" +
    "\t\t  \t<div class=\"row\">\r" +
    "\n" +
    "\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\r" +
    "\n" +
    "\t\t  \t<form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/court_report1.php\" target=\"_blank\">\r" +
    "\n" +
    "\t\t  \t<input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\r" +
    "\n" +
    "                <input type=\"hidden\" name=\"date2\" value=\"{{options.date_to}}\">\r" +
    "\n" +
    "              <input type=\"hidden\" name=\"type_id\" value=\"{{options.type_id}}\">\r" +
    "\n" +
    "              <div class=\"form-group\">\r" +
    "\n" +
    "                  <label class=\"control-label\">ประเภทคดี</label>\r" +
    "\n" +
    "                  <select class=\"form-control\" ng-model=\"options.type_id\" select-value-type=\"string\" ng-options=\"it.id as it.id |lookup_type:'name':'code' group by toGroupName(it.group_id) for it in Lookups.getType() \">\r" +
    "\n" +
    "                      <option value=\"\">-- ทุกประเภทคดี --</option>\r" +
    "\n" +
    "                  </select>\r" +
    "\n" +
    "              </div>\t  \r" +
    "\n" +
    "        \t\t<label>ประจำเดือน</label>\r" +
    "\n" +
    "        \t\t<div class=\"row\">\r" +
    "\n" +
    "        \t\t\t<div class=\"col-md-12\">\r" +
    "\n" +
    "                    \t<span mode=\"1\"  ng-model=\"options.date_from\"  placeholder=\"เดือน\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                     <br/>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-md-12\">\r" +
    "\n" +
    "                      <span mode=\"1\"  ng-model=\"options.date_to\"  placeholder=\"ถึงเดือน\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "            \t<hr>\r" +
    "\n" +
    "            \t<div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "            \t\t<button class=\"btn btn-primary btn-block\" ng-disabled=\"!options.date_from\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\r" +
    "\n" +
    " \t\t\t\t</div>\r" +
    "\n" +
    " \t\t\t</form>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t<div>\r" +
    "\n" +
    "<div>"
  );


  $templateCache.put('views/court_print_report2.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\" ng-init=\"options.date_from=today()\">\r" +
    "\n" +
    "\t<div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "\t\t<div class=\"panel panel-default\">\r" +
    "\n" +
    "\t\t  <div class=\"panel-heading\">\r" +
    "\n" +
    "\t\t    \t<h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\r" +
    "\n" +
    "\t\t    \t<h4 class=\"text-info\">รายงานการจัดส่งสำนวนเพื่อตรวจร่างคำพิพากษา ไปยังสำนักงานอธิบดีผู้พิพากษาภาค5</h4>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t  <div class=\"panel-body\">\r" +
    "\n" +
    "\t\t  \t<div class=\"row\">\r" +
    "\n" +
    "\t\t  \t<div class=\"col-md-8 col-md-offset-2\">\r" +
    "\n" +
    "\t\t  \t<form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/court_report2.php\" target=\"_blank\">\r" +
    "\n" +
    "\t\t  \t<input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\r" +
    "\n" +
    "               <input type=\"hidden\" name=\"date2\" value=\"{{options.date_to}}\">\r" +
    "\n" +
    "              <input type=\"hidden\" name=\"type_id\" value=\"{{options.type_id}}\">\r" +
    "\n" +
    "              <div class=\"form-group\">\r" +
    "\n" +
    "                  <label class=\"control-label\">ประเภทคดี</label>\r" +
    "\n" +
    "                  <select class=\"form-control\" ng-model=\"options.type_id\" select-value-type=\"string\" ng-options=\"it.id as it.id |lookup_type:'name':'code' group by toGroupName(it.group_id) for it in Lookups.getType() \">\r" +
    "\n" +
    "                      <option value=\"\">-- ทุกประเภทคดี --</option>\r" +
    "\n" +
    "                  </select>\r" +
    "\n" +
    "              </div>\t  \r" +
    "\n" +
    "        \t\t<label>ประจำเดือน</label>\r" +
    "\n" +
    "            <div class=\"row\">\r" +
    "\n" +
    "              <div class=\"col-md-12\">\r" +
    "\n" +
    "                      <span mode=\"1\"  ng-model=\"options.date_from\"  placeholder=\"เดือน\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <br/>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-md-12\">\r" +
    "\n" +
    "                      <span mode=\"1\"  ng-model=\"options.date_to\"  placeholder=\"ถึงเดือน\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "               \r" +
    "\n" +
    "            \t<hr>\r" +
    "\n" +
    "            \t<div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "            \t\t<button class=\"btn btn-primary btn-block\" ng-disabled=\"!options.date_from\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\r" +
    "\n" +
    " \t\t\t\t</div>\r" +
    "\n" +
    " \t\t\t</form>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    " \t\t\t</div>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t<div>\r" +
    "\n" +
    "<div>"
  );


  $templateCache.put('views/court_print_report3.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\" ng-init=\"options.date_from=today()\">\r" +
    "\n" +
    "  <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "    <div class=\"panel panel-default\">\r" +
    "\n" +
    "      <div class=\"panel-heading\">\r" +
    "\n" +
    "          <h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\r" +
    "\n" +
    "          <h4 class=\"text-info\">รายงานคดีค้างส่งสำนวน (ยังไม่ได้ส่งสำนวนให้ภาคตรวจ)</h4>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"panel-body\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-8 col-md-offset-2\">\r" +
    "\n" +
    "        <form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/court_report3.php\" target=\"_blank\">\r" +
    "\n" +
    "              <input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\r" +
    "\n" +
    "                <input type=\"hidden\" name=\"date2\" value=\"{{options.date_to}}\">\r" +
    "\n" +
    "              <input type=\"hidden\" name=\"type_id\" value=\"{{options.type_id}}\">\r" +
    "\n" +
    "              <div class=\"form-group\">\r" +
    "\n" +
    "                  <label class=\"control-label\">ประเภทคดี</label>\r" +
    "\n" +
    "                  <select class=\"form-control\" ng-model=\"options.type_id\" select-value-type=\"string\" ng-options=\"it.id as it.id |lookup_type:'name':'code' group by toGroupName(it.group_id) for it in Lookups.getType() \">\r" +
    "\n" +
    "                      <option value=\"\">-- ทุกประเภทคดี --</option>\r" +
    "\n" +
    "                  </select>\r" +
    "\n" +
    "              </div>    \r" +
    "\n" +
    "             \r" +
    "\n" +
    "          \r" +
    "\n" +
    "            <div class=\"row\">\r" +
    "\n" +
    "             <!--\r" +
    "\n" +
    "               <label>ประจำเดือน</label>\r" +
    "\n" +
    "              <div class=\"col-md-12\">\r" +
    "\n" +
    "                      <span mode=\"1\"  ng-model=\"options.date_from\"  placeholder=\"เดือน\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                     <br/>\r" +
    "\n" +
    "              <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-md-12\">\r" +
    "\n" +
    "                      <span mode=\"1\"  ng-model=\"options.date_to\"  placeholder=\"ถึงเดือน\" custom-date-field></span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                      -->\r" +
    "\n" +
    "              <hr>\r" +
    "\n" +
    "              <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                <button class=\"btn btn-primary btn-block\"><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      \r" +
    "\n" +
    "      </form>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  <div>\r" +
    "\n" +
    "<div>"
  );


  $templateCache.put('views/court_print_report4.html',
    "<div class=\"row\" ng-controller=\"PrintReportCtrl\" ng-init=\"options.date_from=today()\">\r" +
    "\n" +
    "  <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "    <div class=\"panel panel-default\">\r" +
    "\n" +
    "      <div class=\"panel-heading\">\r" +
    "\n" +
    "          <h2 class=\"text-primary\"><span class=\"glyphicon glyphicon-cog\"></span> ตั้งค่ารายงาน</h2>\r" +
    "\n" +
    "          <h4 class=\"text-info\">รายงานคดีค้างส่งสำนำคำพิพากษา ให้สำนักงานอธิบดีผู้พิพากษาภาค 5</h4>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"panel-body\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-8 col-md-offset-2\">\r" +
    "\n" +
    "        <form cutom-form name=\"frm_report\" method=\"post\" action=\"reports/court_report4.php\" target=\"_blank\">\r" +
    "\n" +
    "        <input type=\"hidden\" name=\"date1\" value=\"{{options.date_from}}\">\r" +
    "\n" +
    "                <input type=\"hidden\" name=\"date2\" value=\"{{options.date_to}}\">\r" +
    "\n" +
    "              <input type=\"hidden\" name=\"type_id\" value=\"{{options.type_id}}\">\r" +
    "\n" +
    "              <div class=\"form-group\">\r" +
    "\n" +
    "                  <label class=\"control-label\">ประเภทคดี</label>\r" +
    "\n" +
    "                  <select class=\"form-control\" ng-model=\"options.type_id\" select-value-type=\"string\" ng-options=\"it.id as it.id |lookup_type:'name':'code' group by toGroupName(it.group_id) for it in Lookups.getType() \">\r" +
    "\n" +
    "                      <option value=\"\">-- ทุกประเภทคดี --</option>\r" +
    "\n" +
    "                  </select>\r" +
    "\n" +
    "              </div>    \r" +
    "\n" +
    "           \r" +
    "\n" +
    "            <div class=\"row\">\r" +
    "\n" +
    "            <!--\r" +
    "\n" +
    "             <label>ประจำเดือน</label>\r" +
    "\n" +
    "              <div class=\"col-md-12\">\r" +
    "\n" +
    "                      <span mode=\"1\"  ng-model=\"options.date_from\"  placeholder=\"เดือน\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                     <br/>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-md-12\">\r" +
    "\n" +
    "                      <span mode=\"1\"  ng-model=\"options.date_to\"  placeholder=\"ถึงเดือน\" custom-date-field></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    -->\r" +
    "\n" +
    "              <hr>\r" +
    "\n" +
    "              <div class=\"col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                <button class=\"btn btn-primary btn-block\" ><span class=\"glyphicon glyphicon-print\"></span> สร้างรายงาน</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </form>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  <div>\r" +
    "\n" +
    "<div>"
  );


  $templateCache.put('views/court_report.html',
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"custom.confirm.court.report.html\">\r" +
    "\n" +
    "    <div class=\"popover\">\r" +
    "\n" +
    "        <div class=\"arrow\"></div>\r" +
    "\n" +
    "        <h3 class=\"popover-title\">เลือกรายการที่คุณต้องการ</h3>\r" +
    "\n" +
    "        <div class=\"popover-content\">\r" +
    "\n" +
    "            <p class=\"text-center\">\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-block\" ng-click=\"go('admin.report.form1',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">1</span> รับรายงานคดี</div></button>\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-block\" ng-click=\"go('admin.report.form2',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">2</span> รับสำนวน</div></button>\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-block\" ng-click=\"go('admin.report.form3',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">3</span> รับสำเนาคำพิพากษา</div></button>\r" +
    "\n" +
    "            </p>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-controller=\"CourtReportCtrl\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ui-view></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-hide=\"!urlEq('/court/report')\">\r" +
    "\n" +
    "        <div class=\"panel panel-default\" ng-controller=\"CustomTableCtrl\" ng-init=\"searchCourt=$root.getUserId();setAPI('court_cases','custom.admin.form1.html',{search:'searchText', court:'searchCourt', month:'searchMonth', year:'searchYear'},{court:true, month:true,year:true})\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <div class=\"text-right pull-right\">\r" +
    "\n" +
    "                    <button class=\"btn btn-default\">\r" +
    "\n" +
    "                        <span class=\"glyphicon glyphicon-search\"></span> ค้นหา\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <button data-placement=\"bottom-right\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.admin.report.html\"\r" +
    "\n" +
    "                            ng-show=\"hasSelected()\" class=\"btn btn-primary\" data-auto-close=\"true\">\r" +
    "\n" +
    "                        <span class=\"glyphicon glyphicon-pencil\"></span> รับคดี\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <h2 style=\"padding:0px;margin:0px;\"><span class=\"glyphicon glyphicon-th-list\"></span> รายงานคดี ({{tableParams.total()}})</h2>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            \r" +
    "\n" +
    "            <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div loading-container=\"tableParams.settings().$loading\">\r" +
    "\n" +
    "                    <div class=\"input-group col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                        \r" +
    "\n" +
    "                        <div class=\"input-group-addon  adon-label\">เดือน</div>\r" +
    "\n" +
    "                        <select class=\"form-control\" ng-model=\"searchMonth\" ng-change=\"setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getMonth()\"></select>\r" +
    "\n" +
    "                        <div class=\"input-group-addon  adon-label\">พ.ศ</div>\r" +
    "\n" +
    "                        <select class=\"form-control\" ng-model=\"searchYear\" ng-change=\"setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.name for it in Lookups.getYear()\"></select>\r" +
    "\n" +
    "                        <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter(true)\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-refresh\"></span></div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <hr />\r" +
    "\n" +
    "                    <table ng-table=\"tableParams\" show-filter=\"false\" class=\"table table-hover table-bordered\" template-pagination=\"custom.pages.html\">\r" +
    "\n" +
    "                        <tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                                ng-class=\"{'active': isSelected(it)}\">\r" +
    "\n" +
    "                                <td width=\"30\" class=\"text-right text-muted\">{{startIdx + $index + 1}}.</td>\r" +
    "\n" +
    "                                <td width=\"30\" header=\"'custom.checked.html'\">\r" +
    "\n" +
    "                                    <input type=\"checkbox\" ng-model=\"checkboxes.items[it[pkField]]\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'เลขคดีดำ'\" sortable=\"'number_black'\">\r" +
    "\n" +
    "                                    {{it.number_black}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <td data-title=\"'เลขคดีแดง'\" sortable=\"'number_red'\">\r" +
    "\n" +
    "                                    {{it.number_red}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'โจทก์'\" sortable=\"'plaintiff'\">\r" +
    "\n" +
    "                                    {{it.plaintiff}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'จำเลย'\" sortable=\"'defendant'\">\r" +
    "\n" +
    "                                    {{it.defendant}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ข้อหาหลัก'\" sortable=\"'topic_id'\">\r" +
    "\n" +
    "                                    {{it.topic_id | lookup_topic}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ผลการส่งรายงานคดี'\" sortable=\"'command_id'\">\r" +
    "\n" +
    "                                    {{it.command_id | lookup_at}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ผลการปฏิบัติภาค'\" sortable=\"'date_sent'\">\r" +
    "\n" +
    "                                    {{it.result | lookup_result}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ไฟล์ร่าง/คำพิพากษา'\">\r" +
    "\n" +
    "                                    {{it.file1}} {{it.file2}}\r" +
    "\n" +
    "                                    <span ng-if=\"isSelected(it)\" class=\"pull-right glyphicon glyphicon-asterisk\"></span>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "                        </tbody>\r" +
    "\n" +
    "                    </table>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/court_reports.html',
    "<div ui-view></div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/court_reports_menu.html',
    "<h1 class=\"page-header text-center\">\r" +
    "\n" +
    "รายงาน\r" +
    "\n" +
    "</h1>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"col-md-6 col-lg-4\">\r" +
    "\n" +
    "            <a href=\"#court/reports/report1\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-print\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">รายงานการจัดส่งคดี</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"col-md-6 col-lg-4\">\r" +
    "\n" +
    "            <a href=\"#court/reports/report3\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-print\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">รายงานคดีค้างส่งสำนวน</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"col-md-6 col-lg-4\">\r" +
    "\n" +
    "            <a href=\"#court/reports/report4\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-print\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">รายงานคดีค้างส่งสำเราคำพิพากษา</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "      </div>      \r" +
    "\n" +
    "      <div class=\"col-md-6 col-lg-4\">\r" +
    "\n" +
    "            <a href=\"#court/reports/report2\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-print\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">รายงานการจัดส่งสำนวนเพื่อตรวจร่างคำพิพากษา</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "      </div>            \r" +
    "\n" +
    "        <div class=\"col-md-6 col-lg-4\">\r" +
    "\n" +
    "            <a href=\"#court/menu\">\r" +
    "\n" +
    "                <h1 class=\"text-center\">\t\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-th-large\"></span>\r" +
    "\n" +
    "                </h1>\r" +
    "\n" +
    "                <h4 class=\"text-center text-primary\">เมนูหลัก</h4>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/court_users.html',
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"custom.form.court.users.html\">\r" +
    "\n" +
    "    <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r" +
    "\n" +
    "        <div class=\"modal-dialog\">\r" +
    "\n" +
    "            <div class=\"modal-content\">\r" +
    "\n" +
    "                <div class=\"modal-header\" ng-show=\"title\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "                    <h4 class=\"modal-title\"><span class=\"fa fa-windows\"></span> <span ng-bind=\"title\"></span></h4>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-body\">\r" +
    "\n" +
    "        \r" +
    "\n" +
    "                    <form class=\"form-horizontal\" name=\"form\">\r" +
    "\n" +
    "                        <fieldset>\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">ชื่อ</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" name=\"name\" placeholder=\"ยังไม่มีข้อมูล\" required ng-model=\"editingItem.name\" class=\"form-control input-md\">\r" +
    "\n" +
    "                                    <p class=\"help-block has-error\" ng-show=\"form.name.$error.required\">ต้องกำหนดชื่อ</p>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "     \r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\" col-md-4 control-label\">\r" +
    "\n" +
    "                                ตำแหน่ง</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\" ng-init=\"show_account=false\">\r" +
    "\n" +
    "                                    <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.position\">\r" +
    "\n" +
    "                                    <br />\r" +
    "\n" +
    "                                    <label><div ios-toggle ng-model=\"editingItem.check_out\" ng-true-value=\"'1'\" ng-false-value=\"'0'\"></div> <span ng-if=\"editingItem.check_out=='1'\">ย้ายออกแล้ว </span><span ng-if=\"editingItem.check_out!='1'\">กดเลือกเพื่อย้ายออก </span></label>\r" +
    "\n" +
    "                                    <p class=\"text-right text-info\" ng-click=\"show_account=!show_account\"><br /><a href=\"javascript:void(0)\"><span class=\"glyphicon glyphicon-user\"></span> ข้อมูล login</a></p>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            \r" +
    "\n" +
    "                            <div class=\"form-group\" ng-show=\"show_account\">\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">ชื่อผู้ใช้</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.account\">\r" +
    "\n" +
    "           \r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"form-group\"  ng-show=\"show_account\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">รหัสผ่าน</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" placeholder=\"ยังไม่ได้ตั้งรหัสผ่าน\" class=\"form-control input-md\" ng-model=\"editingItem.password\">\r" +
    "\n" +
    "                 \r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </fieldset>\r" +
    "\n" +
    "                    </form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-footer\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-primary btn-min\" ng-disabled=\"!editingItem.name\" ng-click=\"saveForm()\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"cancelForm()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"custom.move.users.html\">\r" +
    "\n" +
    "    <div class=\"modal\" tabindex=\"-1\" role=\"dialog\">\r" +
    "\n" +
    "        <div class=\"modal-dialog\"  aria-hidden=\"true\"   style=\"min-width:80%;\" ng-controller=\"CustomTableCtrl as ctb\" ng-init=\"tableParams.hide_limit=true;_view='moveuser';tableParams.count(10);setAPI('cusers','',{search:'searchText',_view:'_view'})\">\r" +
    "\n" +
    "            <div class=\"modal-content\">\r" +
    "\n" +
    "                <div class=\"modal-header\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "                    <div class=\"input-group pull-right\" style=\"width:300px;margin-right:30px\">\r" +
    "\n" +
    "                        \r" +
    "\n" +
    "                        <input type=\"text\" class=\"form-control\" ng-model=\"searchText\" ng-enter=\"setFilter()\" placeholder=\"{{(lastSearchText)?lastSearchText:'ชื่อที่ต้องการค้นหา'}}\" />\r" +
    "\n" +
    "                        <div ng-if=\"!lastSearchText\" class=\"input-group-addon btn btn-default\" ng-click=\"setFilter()\" ng-disabled=\"!searchText\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-search\"></span></div>\r" +
    "\n" +
    "                        <div ng-if=\"lastSearchText\" class=\"input-group-addon btn btn-default\" ng-click=\"clearFilter()\" title=\"เลิกค้นหา\"><span class=\"glyphicon glyphicon-remove\"></span></div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <h4 class=\"modal-title\"><span class=\"fa fa-windows\"></span> ย้ายผู้พิพากษาเข้า ({{tableParams.total()}})</h4>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-body\" style=\"min-height:300px\">\r" +
    "\n" +
    "  \r" +
    "\n" +
    "                    <table ng-table=\"tableParams\" show-filter=\"false\" class=\"table table-hover\" >\r" +
    "\n" +
    "                        <tbody>\r" +
    "\n" +
    "                            <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                                ng-class=\"{'active': isSelected(it), 'text-checkout': it.check_out==1}\">\r" +
    "\n" +
    "                                <td width=\"30\" class=\"text-right text-muted\">{{startIdx + $index + 1}}.</td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <td data-title=\"'ชื่อผู้พิพากษา'\" sortable=\"'name'\">\r" +
    "\n" +
    "                                     {{it.name}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ตำแหน่ง'\" sortable=\"'position'\">\r" +
    "\n" +
    "                                    {{it.position}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ศาล'\" sortable=\"'parent_id'\">\r" +
    "\n" +
    "                                    {{it.parent_id | lookup_court}}\r" +
    "\n" +
    "                                    <span ng-if=\"isSelected(it)\" class=\"pull-right glyphicon glyphicon-ok text-success\"></span>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "                        </tbody>\r" +
    "\n" +
    "                    </table>\r" +
    "\n" +
    "                    <div class=\"help-block\" style=\"margin-top:1em\">\r" +
    "\n" +
    "                        <p class=\"text-info\"><span class=\"glyphicon glyphicon-question-sign\"></span> ถ้าต้องการย้ายผู้พิพากษาที่ยังไม่ได้ย้ายออกจากศาลเดิม ให้ค้นหาชื่อ แล้วย้ายผู้พิพากษาที่เลือกเข้า\r" +
    "\n" +
    "                        </p>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-footer\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-success btn-min\"  ng-disabled=\"!hasSelected()\" ng-click=\"doMoveUser(ctb.getScope(),$hide);\"><span class=\"glyphicon glyphicon-circle-arrow-down\"></span> ย้ายผู้พิพากษาที่เลือกเข้า</button>\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"$hide()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "<div class=\"container-fluid\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <p>\r" +
    "\n" +
    "        <div class=\"panel panel-default\" ng-controller=\"CustomTableCtrl as uctb\" ng-init=\"searchCourt='';searchRole='';setAPI('cusers','custom.form.court.users.html',{search:'searchText', parent_id:getUser().id})\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <div class=\"text-left pull-left\">\r" +
    "\n" +
    "                    <h2 style=\"padding:0px;margin:0px;\"><span class=\"fa fa-windows\"></span> ผู้พิพากษา ({{tableParams.total()}})</h2>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "<p class=\"text-right\">\r" +
    "\n" +
    "                     <button ng-controller=\"MoveUserCtrl\" ng-click=\"moveUser('custom.move.users.html', uctb.getScope().refresh)\" class=\"btn btn-info\" style=\"margin-right:2em\"><span class=\"glyphicon glyphicon-circle-arrow-down\"></span> ย้ายผู้พิพากษาเข้า</button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <button ng-click=\"newItem({admin:2,parent_id:getUser().id})\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-plus\"></span> เพิ่มข้อมูล</button>\r" +
    "\n" +
    "                    <button ng-click=\"editItem()\" ng-show=\"hasSelected()\" class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-pencil\"></span> แก้เขข้อมูล</button>\r" +
    "\n" +
    "                    <button data-placement=\"bottom\"  data-trigger=\"click\" bs-popover data-template=\"custom.confirm.popover.html\"\r" +
    "\n" +
    "                            ng-click=\"removeItem()\" ng-show=\"hasSelected()\" class=\"btn btn-danger\" data-auto-close=\"true\">\r" +
    "\n" +
    "                        <span class=\"glyphicon glyphicon-remove\"></span> ลบข้อมูล\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <button ng-click=\"refresh()\" class=\"btn btn-success\"><span class=\"glyphicon glyphicon-refresh\"></span> โหลดข้อมูล</button>\r" +
    "\n" +
    "                </p>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <style>\r" +
    "\n" +
    "                .adon-label { width:150px; text-align:'right'}\r" +
    "\n" +
    "            </style>\r" +
    "\n" +
    "            <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "                <div loading-container=\"tableParams.settings().$loading\">\r" +
    "\n" +
    "  \r" +
    "\n" +
    "                   \r" +
    "\n" +
    "                    <div class=\"input-group col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                        <div class=\"input-group-addon adon-label\">ค้นหาชื่อ</div>\r" +
    "\n" +
    "                        <input type=\"text\" class=\"form-control\" ng-model=\"searchText\" ng-enter=\"setFilter()\" placeholder=\"{{(lastSearchText)?lastSearchText:'ชื่อที่ต้องการค้นหา'}}\" />\r" +
    "\n" +
    "                        <div ng-if=\"!lastSearchText\"  class=\"input-group-addon btn btn-default\" ng-click=\"setFilter()\" ng-disabled=\"!searchText\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-search\"></span></div>\r" +
    "\n" +
    "                        <div ng-if=\"lastSearchText\" class=\"input-group-addon btn btn-default\" ng-click=\"clearFilter()\" title=\"เลิกค้นหา\"><span class=\"glyphicon glyphicon-remove\"></span></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <hr/>\r" +
    "\n" +
    "                    <table ng-table=\"tableParams\" show-filter=\"false\" class=\"table table-hover\">\r" +
    "\n" +
    "                        <tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                                ng-dblclick=\"editItem()\"\r" +
    "\n" +
    "                                ng-class=\"{'active': isSelected(it),'text-checkout': it.check_out==1,'text-warning': it.check_out==1}\">\r" +
    "\n" +
    "                                <td width=\"30\" class=\"text-right text-muted\">{{startIdx + $index + 1}}.</td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <td data-title=\"'ชื่อผู้พิพากษา'\" sortable=\"'name'\" >\r" +
    "\n" +
    "                                    {{it.name}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ตำแหน่ง'\" sortable=\"'position'\">\r" +
    "\n" +
    "                                    {{it.position}}\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ศาล'\" sortable=\"'parent_id'\">\r" +
    "\n" +
    "                                    {{it.parent_id | lookup_court}}\r" +
    "\n" +
    "                                    <span ng-if=\"isSelected(it)\" class=\"pull-right glyphicon glyphicon-asterisk\"></span>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "                        </tbody>\r" +
    "\n" +
    "                    </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</p>\r" +
    "\n" +
    "<div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/court_vcases.html',
    "<style>\r" +
    "\n" +
    "\ttable tr td{\r" +
    "\n" +
    "\t\tvertical-align:middle;\r" +
    "\n" +
    "\t}\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-controller=\"CourtReportCtrl\" data-prefix=\"c2\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div ui-view></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div ng-hide=\"!(urlEq('/court/vcases') || urlEq('/court/vcases/notify'))\">\r" +
    "\n" +
    "            <div class=\"panel panel-default\" ng-controller=\"CustomTableCtrl as cmt\" ng-init=\"$parent.cmt=cmt;setAPI('court_cases','custom.court.form1.html',{date_received:'searchDate',_view:'_view()',type_id:'searchType'})\">\r" +
    "\n" +
    "                <div class=\"panel-heading\">\r" +
    "\n" +
    "                    <div class=\"text-right pull-right\" style=\"position:relative;top:-0.25em\">\r" +
    "\n" +
    "                        <span class=\"btn btn-notify btn-danger\" ng-click=\"notify3()\">สำนวนค้างส่ง (ทบทวนร่างฯ)<span class=\"notify\">{{TableMeta.notsent3 || 0}}</span></span>                    \r" +
    "\n" +
    "                        <span class=\"btn btn-notify btn-info\" ng-click=\"notify()\">สำนวนไม่ได้จัดส่ง<span class=\"notify\">{{TableMeta.notsent || 0}}</span></span>\r" +
    "\n" +
    "                        <span class=\"btn btn-notify btn-success\" ng-click=\"notify2()\" style=\"margin-right:4em\">สำเนาคำพิพากษาไม่ได้จัดส่ง<span class=\"notify\">{{TableMeta.notsent2 || 0}}</span></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <span ng-hide=\"urlEq('/court/vcases/notify')\">\r" +
    "\n" +
    "                            <button class=\"btn btn-success\" ng-show=\"isSearchMode()\" ng-click=\"setFilter()\">\r" +
    "\n" +
    "                                <span class=\"glyphicon glyphicon-arrow-left\"></span> ออกจากโหมดการค้นหา\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                            <button class=\"btn btn-info\" ng-click=\"advancedSearch('custom.cases.search.html',{_view:true})\">\r" +
    "\n" +
    "                                <span class=\"glyphicon glyphicon-search\"></span> ค้นหา\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                                                    <a class=\"btn btn-info\" href=\"#/court/reports/report2\">\r" +
    "\n" +
    "                                <span class=\"glyphicon glyphicon-print\"></span><span class=\"hidden-sm hidden-xs\"> พิมพ์รายงาน</span>\r" +
    "\n" +
    "                            </a>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <h2 style=\"padding:0px;margin:0px;\"><span class=\"fa fa-windows\"></span> สำนวนและร่าง ({{tableParams.total()}})</h2>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "                    <div loading-container=\"tableParams.settings().$loading\">\r" +
    "\n" +
    "                        <div ng-show=\"!(isSearchMode() || urlEq('/court/vcases/notify'))\">\r" +
    "\n" +
    "                            <div class=\"input-group col-md-10 col-md-offset-1\">\r" +
    "\n" +
    "                                <div class=\"input-group-addon\"><strong>ประเภทคดี</strong></div>\r" +
    "\n" +
    "                                <select class=\"form-control\" style=\"min-width:450px\" ng-model=\"searchType\" ng-change=\"setTypeId(searchType);setFilter()\" select-value-type=\"string\" ng-options=\"it.id as it.id | lookup_type:'name':'code'  for it in Lookups.getType()\"><option value=\"\">ทั้งหมด</option></select>\r" +
    "\n" +
    "                               \r" +
    "\n" +
    "                                <div class=\"input-group-addon\"><strong>วันที่ภาครับสำนวนคำพิพากษา</strong></div>\r" +
    "\n" +
    "                                \r" +
    "\n" +
    "                                <div mode=\"0\" ng-model=\"searchDate\" ng-change=\"setDateId(searchDate);setFilter()\" placeholder=\"แสดงคดีที่รับสำนวนวันที่่\" custom-date-field></div>\r" +
    "\n" +
    "                             \r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <hr />\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ng-table-menu=\"tableParams\"></div>\r" +
    "\n" +
    "                        <table ng-table-resizable ng-table=\"tableParams\" ng-table-init ng-table-init-columns wt-responsive-table show-filter=\"false\" class=\"table table-hover table-bordered\">\r" +
    "\n" +
    "                            <tbody>\r" +
    "\n" +
    "                                <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                    ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                                    ng-class=\"{'active': isSelected(it),'text-red':it.no_case_sent=='1'}\" ng-init=\"it._days=date_diff(it.date_ap, it.date_received3)\">\r" +
    "\n" +
    "                                    <td width=\"30\" class=\"text-right text-muted\"><span title=\"#{{it.id}}\">{{startIdx + $index + 1}}.</span></td>\r" +
    "\n" +
    "                                    <td data-title=\"'เลขรับสำนวนของภาค'\" sortable=\"'auto_received_num'\">\r" +
    "\n" +
    "                                        {{it.auto_received_num}}\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'เลขคดีดำ'\" sortable=\"'number_black'\">\r" +
    "\n" +
    "                                        {{it.number_black}}\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'เลขคดีแดง'\" sortable=\"'number_red'\">\r" +
    "\n" +
    "                                        {{it.number_red}}\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'โจทก์'\" sortable=\"'plaintiff'\">\r" +
    "\n" +
    "                                        {{it.plaintiff}}\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'จำเลย'\" sortable=\"'defendant'\">\r" +
    "\n" +
    "                                        {{it.defendant}}\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'ข้อหาสถิติ'\" sortable=\"'topic_ids'\">\r" +
    "\n" +
    "                                        {{it.topic_ids | lookup_topic}}\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'ผลการส่งรายงานดดี'\" sortable=\"'command_id'\">\r" +
    "\n" +
    "                                        {{it.command_id | lookup_at }}\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'ผลการปฏิบัติ(ภาค)'\" sortable=\"'result'\">\r" +
    "\n" +
    "                                        {{it.result | lookup_result}}\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'วันที่ส่งสำนวน'\" sortable=\"'date_sent2'\">\r" +
    "\n" +
    "                                        {{it.date_sent2 | thai_date:'short'}}\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'วันที่ภาครับสำนวน'\" sortable=\"'date_received3'\">\r" +
    "\n" +
    "                                        {{it.date_received3 | thai_date:'short'}}\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'นัดฟังคำพิพากษา'\" sortable=\"'date_ap'\">\r" +
    "\n" +
    "                                        {{it.date_ap | thai_date:'short'}}\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "                                    <td data-title=\"'ส่งตามกำหนด(ก่อน '+BDAYS+' วัน)'\" class=\"text-center\">\r" +
    "\n" +
    "                                        <span ng-if=\"it._days<BDAYS && it.date_ap && it.date_received3\">ช้า ({{it._days | math_abs}} วัน)</span>\r" +
    "\n" +
    "                                        <span ng-if=\"it._days>=BDAYS\">ไม่ช้า ({{it._days}} วัน)</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <span ng-if=\"isSelected(it)\" title=\"เลือกทำรายการ\" class=\"row-action pull-right\">\r" +
    "\n" +
    "                                            <button class=\"btn btn-success btn-circle btn-xs\" data-placement=\"left\" data-trigger=\"click\" bs-popover data-template=\"custom.confirm.court.actions2.html\"\r" +
    "\n" +
    "                                                    data-auto-close=\"true\">\r" +
    "\n" +
    "                                                <span class=\"glyphicon glyphicon-edit\"></span>\r" +
    "\n" +
    "                                            </button>\r" +
    "\n" +
    "                                        </span>\r" +
    "\n" +
    "                                    </td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </tr>\r" +
    "\n" +
    "                            </tbody>\r" +
    "\n" +
    "                        </table>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/custom.select_cases_panel.html',
    "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r" +
    "\n" +
    "    <div class=\"modal-dialog\" style=\"min-width:720px\" ng-controller=\"CustomTableCtrl as cmt\" ng-init=\"setAPI('admin_cases','',{_court:courtID(),_view:'\\'merge\\'',search:'searchText'},{_view:true,_court:true,search:false})\">\r" +
    "\n" +
    "        <style>\r" +
    "\n" +
    "            .bg-black {\r" +
    "\n" +
    "                background-color: black !important;\r" +
    "\n" +
    "                min-width: 180px !important;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "            \r" +
    "\n" +
    "            .del{color:#CD413D !important}\r" +
    "\n" +
    "        </style>\r" +
    "\n" +
    "        <div class=\"modal-content\">\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "                <h4 class=\"modal-title\"><span class=\"fa fa-windows\"></span> เลือกเลขคดี (สำนวนรวม)\r" +
    "\n" +
    "                    <span class=\"input-group pull-right\" style=\"width:250px;margin-right:30px;padding-top:0px;top:-8px\">\r" +
    "\n" +
    "                        <input type=\"text\" class=\"form-control\" ng-model=\"searchText\" ng-change=\"setFilter()\" placeholder=\"ค้นหาเลขคดี\" ng-model-options=\"{ debounce: 500 }\" />\r" +
    "\n" +
    "                        <div ng-if=\"!searchText\" class=\"input-group-addon btn btn-default\"   title=\"ค้นหา\"><span class=\"glyphicon glyphicon-search\"></span></div>\r" +
    "\n" +
    "                        <div ng-if=\"searchText\" class=\"input-group-addon btn btn-default\" ng-click=\"clearSearch()\" title=\"เลิกค้นหา\"><span class=\"glyphicon glyphicon-remove\"></span></div>\r" +
    "\n" +
    "                    </span>\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body\">\r" +
    "\n" +
    "                <div class=\"panel panel-default\" >\r" +
    "\n" +
    "                    <table ng-table-resizable ng-table=\"tableParams\" template-pagination=\"pager-only.html\" ng-init=\"tableParams.hide_limit=true\" show-filter=\"false\" class=\"table table-bordered\">\r" +
    "\n" +
    "                        <thead class=\"hidden\">\r" +
    "\n" +
    "                            <tr>\r" +
    "\n" +
    "                                <th></th>\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "                        </thead>\r" +
    "\n" +
    "                        <tbody>\r" +
    "\n" +
    "                            <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                ng-class=\"{'bg-success':hasID(it.number_black)}\"\r" +
    "\n" +
    "                                ng-click=\"selectRow(it);\">\r" +
    "\n" +
    "                                <td valign=\"top\">\r" +
    "\n" +
    "    \r" +
    "\n" +
    "                                    <div style=\"display:inline-block;padding-left:1em;width:100%\">\r" +
    "\n" +
    "                                        <div ng-switch=\"isSelected(it)\">\r" +
    "\n" +
    "                                            <div ng-switch-when=\"true\" class=\"pull-right\">\r" +
    "\n" +
    "                                                <span ng-switch=\"hasID(it.number_black)\">\r" +
    "\n" +
    "                                                    <button ng-switch-when=\"true\" title=\"ไม่รวมสำนวนนี้\" class=\"btn btn-danger\" ng-click=\"removeID(it.number_black)\"><span class=\"glyphicon glyphicon-remove\"></span></button>\r" +
    "\n" +
    "                                                    <button ng-switch-when=\"false\" title=\"รวมสำนวนนี้\" class=\"btn btn-success\" ng-click=\"mergeID(it)\"><span class=\"glyphicon glyphicon-plus\"></span></button>\r" +
    "\n" +
    "                                                </span>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <div ng-switch-when=\"false\" class=\"pull-right\">\r" +
    "\n" +
    "                                                <span ng-if=\"hasID(it.number_black)\" class=\"fa fa-check fa-2x\"></span>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                        <div><span class=\"label label-warning bg-black\">{{::it.number_black}}</span>  <strong>{{::it.title}}</strong></div>\r" +
    "\n" +
    "                                        <div><small>โจทก์: {{::it.plaintiff}}, จำเลย: {{::it.defendant}}</small></div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "                        </tbody>\r" +
    "\n" +
    "                    </table>\r" +
    "\n" +
    "                    <div style=\"padding:5px;\" ng-if=\"$ids.length\">\r" +
    "\n" +
    "                        <hr style=\"padding:0;margin:0\"/>\r" +
    "\n" +
    "                        <strong>สำนวนรวม ({{$ids.length}})</strong><br />\r" +
    "\n" +
    "                        <span class=\"label label-mr label-black\" ng-repeat=\"key in $ids\">{{key}} <span title=\"ไม่รวมสำนวนนี้\" ng-click=\"removeID(key)\" class=\"glyphicon glyphicon-remove del\" ></span></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-footer\">\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-min\" ng-click=\"acceptID();$hide()\"><span class=\"glyphicon glyphicon-ok\"></span> ตกลง</button>\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-remove\"></span> ยกเลิก</button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('views/login.html',
    "<div clss=\"row\"  style=\"z-index:-3\">\r" +
    "\n" +
    "    <div class=\"col-md-offset-3 col-md-6\">\r" +
    "\n" +
    "        <div class=\"list-group panel\" style=\"background-color:rgba(0,0,0,0)\">\r" +
    "\n" +
    "            <div class=\"xlist-group-item xpanel-heading\" style=\"text-align:right;background-color:rgba(0,0,0,0)\">\r" +
    "\n" +
    "                <img src=\"images/login.png\"/>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"list-group-item panel-body\" style=\"padding-left:8em;padding-right:8em\">\r" +
    "\n" +
    "                <form class=\"form\" ng-controller=\"LoginCtrl\">\r" +
    "\n" +
    "                    <div class=\"alert alert-danger\" ng-show=\"alert\">\r" +
    "\n" +
    "                        <h4 class=\"text-center\"  style=\"pading:0x; margin:0px\">                        \r" +
    "\n" +
    "                            <span class=\"glyphicon glyphicon-exclamation-sign\"></span> {{errorMessage}}\r" +
    "\n" +
    "                        </h4>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <fieldset ng-disabled=\"checking\">\r" +
    "\n" +
    "                        <div class=\"form-group\">\r" +
    "\n" +
    "                            <label>ชื่อผู้ใช้</label>\r" +
    "\n" +
    "                            <input type=\"text\" autofocus ng-model=\"userid\" placeholder=\"ป้อนชื่อผู้ใช้\" class=\"form-control input-lg text-center\" />\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"form-group\">\r" +
    "\n" +
    "                            <label>รหัสผ่าน</label>\r" +
    "\n" +
    "                            <input type=\"password\" ng-model=\"password\" placeholder=\"ป้อนรหัสผ่าน\" class=\"form-control input-lg text-center\" />\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <p class=\"text-left\">\r" +
    "\n" +
    "                            <button id=\"login-button\" type=\"submit\" ng-disabled=\"!(userid && password)\" ng-click=\"login()\" class=\"btn btn-success btn-block btn-lg\"><span ng-if=\"checking\"><i class=\"fa fa-spinner fa-pulse fa-lg\"></i> กำลังตรวจสอบ...</span><span ng-if=\"!checking\">เข้าใช้งาน</span></button>\r" +
    "\n" +
    "                        </p>\r" +
    "\n" +
    "                    </fieldset>\r" +
    "\n" +
    "                </form>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"col-sm-12\">\r" +
    "\n" +
    "    <p class=\"text-center text-muted\">\r" +
    "\n" +
    "        &copy;2015 โดยส่วนเทคโนยีสารสนเทศ สำนักศาลยุติธรรมประจำภาค 5\r" +
    "\n" +
    "    </p>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('views/main.menu.html',
    "\r" +
    "\n" +
    "<div ng-if=\"$root.getUserId() && !urlEq('/admin/menu') && !urlEq('/court/menu')  && !urlEq('/login')\" style=\"padding-right:1.5em;padding-top:70px\">\r" +
    "\n" +
    "        <div ng-if=\"isAdmin()\" >\r" +
    "\n" +
    "            <ul class=\"nav navbar-nav navbar-right\" ng-if=\"$root.getUserId()\">\r" +
    "\n" +
    "                <li data-match-route=\"admin/menu\"><a href=\"#admin/menu\"><img   title=\"เมนูหลก\"  class=\"btn-home\" src=\"images/home.png\"/></a></li>                    \r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div ng-if=\"!isAdmin()\" >\r" +
    "\n" +
    "            <ul class=\"nav navbar-nav navbar-right\" ng-if=\"$root.getUserId()\">\r" +
    "\n" +
    "                <li data-match-route=\"court/menu\"><a href=\"#court/menu\"><img  title=\"เมนูหลก\" class=\"btn-home\" src=\"images/home.png\"/></a></li>     \r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/search.html',
    "<script type=\"text/ng-template\" id=\"custom.confirm.popover.html\">\r" +
    "\n" +
    "    <div class=\"popover\">\r" +
    "\n" +
    "        <div class=\"arrow\"></div>\r" +
    "\n" +
    "        <h3 class=\"popover-title\" >คุณต้องการลบข้อมูลใช่หรือไม่</h3>\r" +
    "\n" +
    "        <div class=\"popover-content\">\r" +
    "\n" +
    "            <p class=\"text-center\">\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-danger\" ng-click=\"doRemove();$hide()\">ลบข้อมูล</button>\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-click=\"$hide()\">ยกเลิก</button>\r" +
    "\n" +
    "            </p>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"custom.confirm2.popover.html\">\r" +
    "\n" +
    "    <div class=\"popover\">\r" +
    "\n" +
    "        <div class=\"arrow\"></div>\r" +
    "\n" +
    "        <h3 class=\"popover-title\">คุณต้องการลบข้อมูลรายการที่เช็คทั้งหมด ใช่หรือไม่</h3>\r" +
    "\n" +
    "        <div class=\"popover-content\">\r" +
    "\n" +
    "            <p class=\"text-center\">\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-danger\" ng-click=\"doRemoveChecked();$hide()\">ลบทั้งหมด</button>\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-click=\"$hide()\">ยกเลิก</button>\r" +
    "\n" +
    "            </p>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"custom.form.html\">\r" +
    "\n" +
    "    <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r" +
    "\n" +
    "        <div class=\"modal-dialog\">\r" +
    "\n" +
    "            <div class=\"modal-content\">\r" +
    "\n" +
    "                <div class=\"modal-header\" ng-show=\"title\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "                    <h4 class=\"modal-title\" ng-bind=\"title\"></h4>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-body\">\r" +
    "\n" +
    "                    <form class=\"form-horizontal\" name=\"form\">\r" +
    "\n" +
    "                        <fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">ชื่อ</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" name=\"name\" placeholder=\"ยังไม่ได้กำหนดชื่อ\" required ng-model=\"editingItem.name\" class=\"form-control input-md\">\r" +
    "\n" +
    "                                    <p class=\"help-block has-error\" ng-show=\"form.name.$error.required\">ต้องกำหนดชื่อ</p>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <!-- Select Basic -->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">สิทธิการใช้</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <select class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.admin\" select-default >\r" +
    "\n" +
    "                                        <option></option>\r" +
    "\n" +
    "                                        <option ng-repeat=\"it in Lookups.getRole() track by it.id\" value=\"{{it.id}}\">{{it.name}}</option>\r" +
    "\n" +
    "                                    </select>\r" +
    "\n" +
    "                                    <p class=\"help-block text-danger\" ng-show=\"form.role.$error.required\">ต้องกำหนดสิทธิการใช้งาน</p>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"form-group\" ng-if=\"editingItem.admin > 1 && $root.isAdmin()\">\r" +
    "\n" +
    "                                <!-- Select Basic -->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">ศาล</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <select class=\"form-control input-md\" ng-model=\"editingItem.parent_id\" select-default>\r" +
    "\n" +
    "                                        <option></option>\r" +
    "\n" +
    "                                        <option ng-repeat=\"it in Lookups.getCourt() track by it.id\" value=\"{{it.id}}\">{{it.name}}</option>\r" +
    "\n" +
    "                                    </select>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">ชื่อผู้ใช้</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" placeholder=\"ยังไม่ได้กำหนดชื่อ\" class=\"form-control input-md\" ng-model=\"editingItem.account\">\r" +
    "\n" +
    "           \r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">รหัสผ่าน</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" placeholder=\"ยังไม่ได้ตั้งรหัสผ่าน\" class=\"form-control input-md\" ng-model=\"editingItem.password\">\r" +
    "\n" +
    "                 \r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </fieldset>\r" +
    "\n" +
    "                    </form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-footer\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!editingItem.name\" ng-click=\"saveForm()\">บันทึกข้อมูล</button>\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-warning\" ng-click=\"cancelForm()\">ยกเลิก</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"custom.dropdown.actions.html\">\r" +
    "\n" +
    "    <ul tabindex=\"-1\" class=\"dropdown-menu\" role=\"menu\">\r" +
    "\n" +
    "        <li> <a ng-click=\"selectAll()\" href=\"javascript://void(0)\"><span class=\"glyphicon glyphicon-check\"></span> เลือกทั้งหมด</a></li>\r" +
    "\n" +
    "        <li><a ng-click=\"selectInverse()\" href=\"javascript://void(0)\"><span class=\"glyphicon glyphicon-ok-sign\"></span> เลือกกลับกัน</a></li>\r" +
    "\n" +
    "        <li><a ng-click=\"selectNone()\" href=\"javascript://void(0)\"><span class=\"glyphicon glyphicon-ban-circle\"></span> ยกเลิกการเลือกทั้งหมด</a></li>\r" +
    "\n" +
    "        <li ng-if=\"hasChecked()\" class=\"divider\"></li>\r" +
    "\n" +
    "        <li ng-if=\"hasChecked()\"><a ng-click=\"removeChecked()\" href=\"javascript://void(0)\"><span class=\"glyphicon glyphicon-remove\"></span> ลบข้อมูลที่เลือก</a></li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"custom.pages.html\">\r" +
    "\n" +
    "    <div class=\"ng-cloak ng-table-pager\" ng-if=\"params.data.length\"> <div ng-if=\"params.settings().counts.length\" class=\"ng-table-counts btn-group pull-right\"> <button ng-repeat=\"count in params.settings().counts\" type=\"button\" ng-class=\"{\\'active\\':params.count()==count}\" ng-click=\"params.count(count)\" class=\"btn btn-default\"> <span ng-bind=\"count\"></span> </button> </div> <ul class=\"pagination ng-table-pagination\"> <li ng-class=\"{\\'disabled\\': !page.active && !page.current, \\'active\\': page.current}\" ng-repeat=\"page in pages\" ng-switch=\"page.type\"> <a ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\" href=\"\">&laquo;</a> <a ng-switch-when=\"first\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a> <a ng-switch-when=\"page\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a> <a ng-switch-when=\"more\" ng-click=\"params.page(page.number)\" href=\"\">&#8230;</a> <a ng-switch-when=\"last\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a> <a ng-switch-when=\"next\" ng-click=\"params.page(page.number)\" href=\"\">&raquo;</a> </li> </ul> </div>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"custom.pages.html\">\r" +
    "\n" +
    "    <div class=\"row panel-footer\">\r" +
    "\n" +
    "        <div class=\"col-sm-7\">\r" +
    "\n" +
    "            <div ng-cloak ng-table-pager\" ng-if=\"params.data.length\">\r" +
    "\n" +
    "                <ul class=\"pagination ng-table-pagination\" style=\"margin:0px\">\r" +
    "\n" +
    "                    <li ng-class=\"{disabled: !page.active && !page.current, active: page.current}\" ng-repeat=\"page in pages\" ng-switch=\"page.type\">\r" +
    "\n" +
    "                        <a ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\" href=\"\">&laquo;</a>\r" +
    "\n" +
    "                        <a ng-switch-when=\"first\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a>\r" +
    "\n" +
    "                        <a ng-switch-when=\"page\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a>\r" +
    "\n" +
    "                        <a ng-switch-when=\"more\" ng-click=\"params.page(page.number)\" href=\"\">&#8230;</a>\r" +
    "\n" +
    "                        <a ng-switch-when=\"last\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a>\r" +
    "\n" +
    "                        <a ng-switch-when=\"next\" ng-click=\"params.page(page.number)\" href=\"\">&raquo;</a>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-sm-5\">\r" +
    "\n" +
    "            <div class=\"btn-group pull-right\">\r" +
    "\n" +
    "                <button ng-repeat=\"it in params.settings().counts track by it\" type=\"button\" ng-class=\"{'active':params.count() == it}\" ng-click=\"params.count(it)\" class=\"btn btn-default\"> {{it}}</button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"custom.checked.html\">\r" +
    "\n" +
    "    <span id=\"checked-actions\" class=\"glyphicon glyphicon-th\" data-animation=\"am-flip-x\" bs-dropdown=\"actions\" aria-haspopup=\"true\" aria-expanded=\"false\" data-template=\"custom.dropdown.actions.html\"></span>\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"container-fluid\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <p>\r" +
    "\n" +
    "        <div class=\"panel panel-default\" ng-controller=\"CustomTableCtrl\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <div class=\"text-left pull-left\">\r" +
    "\n" +
    "                    <h2 style=\"padding:0px;margin:0px;\"><span class=\"glyphicon glyphicon-th-list\"></span>ตัวอย่างขอมูล ({{tableParams.total()}})</h2>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <p class=\"text-right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <button ng-click=\"newItem()\" class=\"btn btn-primary\"><spand class=\"glyphicon glyphicon-plus\"></span>เพิ่มข้อมูล</button>\r" +
    "\n" +
    "                    <button ng-click=\"editItem()\" ng-show=\"hasSelected()\" class=\"btn btn-warning\"><spand class=\"glyphicon glyphicon-pencil\"></span>แก้เขข้อมูล</button>\r" +
    "\n" +
    "                    <button data-placement=\"bottom-right\"  data-trigger=\"click\" bs-popover data-template=\"custom.confirm.popover.html\"\r" +
    "\n" +
    "                            ng-click=\"removeItem()\" ng-show=\"hasSelected()\" class=\"btn btn-danger\" data-auto-close=\"true\">\r" +
    "\n" +
    "                        <spand class=\"glyphicon glyphicon-remove\"></span>ลบข้อมูล\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <button ng-click=\"refresh()\" class=\"btn btn-success\"><spand class=\"glyphicon glyphicon-refresh\"></span> โหลดข้อมูล</button>\r" +
    "\n" +
    "                </p>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-body\" style=\"padding-bottom:0px;\">\r" +
    "\n" +
    "                <div loading-container=\"tableParams.settings().$loading\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"input-group col-md-6 col-md-offset-3\">\r" +
    "\n" +
    "                            <div class=\"input-group-addon\">ค้นหาชื่อ</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <input type=\"text\" class=\"form-control\" ng-model=\"searchText\" ng-model-options=\"{updateOn: 'blur', debounce: {'default': 500, 'blur': 0}}\" placeholder=\"{{(lastSearchText)?lastSearchText:'ชื่อที่ต้องการค้นหา'}}\" />\r" +
    "\n" +
    "                            <div class=\"input-group-addon btn btn-default\" ng-click=\"setFilter()\" ng-disabled=\"!searchText\" title=\"เริ่มค้นหา\"><span class=\"glyphicon glyphicon-search\"></span></div>\r" +
    "\n" +
    "                            <div ng-if=\"lastSearchText\" class=\"input-group-addon btn btn-default\" ng-click=\"clearFilter()\" title=\"เลิกค้นหา\"><span class=\"glyphicon glyphicon-remove\"></span></div>\r" +
    "\n" +
    "                            \r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <hr/>\r" +
    "\n" +
    "                    <table ng-table=\"tableParams\" show-filter=\"false\" class=\"table table-hover\" template-pagination=\"custom.pages.html\">\r" +
    "\n" +
    "                        <tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <tr ng-repeat=\"it in $data\"\r" +
    "\n" +
    "                                ng-click=\"selectRow(it);\"\r" +
    "\n" +
    "                                ng-dblclick=\"editItem()\"\r" +
    "\n" +
    "                                ng-class=\"{'active': isSelected(it)}\">\r" +
    "\n" +
    "                                <td width=\"30\" style=\"text-align: left\" header=\"'custom.checked.html'\">\r" +
    "\n" +
    "                                    <input type=\"checkbox\" ng-model=\"checkboxes.items[it[pkField]]\" />\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ชื่อ User'\" sortable=\"'name'\" >\r" +
    "\n" +
    "                                    {{startIdx + $index + 1}}. {{it.name}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'ศาล'\" sortable=\"'parent_id'\" >\r" +
    "\n" +
    "                                    {{it.parent_id | lookup_court}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                                <td data-title=\"'สิทธิ'\" sortable=\"'admin'\" class=\"text-center\">\r" +
    "\n" +
    "                                    {{it.admin | lookup_role}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <span ng-if=\"isSelected(it)\" class=\"pull-right glyphicon glyphicon-asterisk\"></span>\r" +
    "\n" +
    "                                </td>\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "                        </tbody>\r" +
    "\n" +
    "                    </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</p>\r" +
    "\n" +
    "<div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('views/search_result.html',
    "<br/>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row\" ng-controller=\"SearchCtrl\">\r" +
    "\n" +
    "    <div class=\"col-md-12 \">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"btn-group pull-right\">\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"gotoSearch()\"><span class=\"glyphicon glyphicon-search\"></span> ค้นหา</button>\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"gotoAdmin()\"><span class=\"glyphicon glyphicon-th\"></span> จัดการข้อมูล</button>\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-user\" ></span> ผู้ใช้</button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<!-- search options-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" \r" +
    "\n" +
    "     aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r" +
    "\n" +
    "    <div class=\"modal-dialog\" ng-controller=\"SearchCtrl\">\r" +
    "\n" +
    "        <div class=\"modal-content\">\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <button type=\"button\" class=\"close\"\r" +
    "\n" +
    "                        data-dismiss=\"modal\" aria-hidden=\"true\">\r" +
    "\n" +
    "                    &times;\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "                <h4 class=\"modal-title\" id=\"myModalLabel\">\r" +
    "\n" +
    "                    <span class=\"glyphicon glyphicon-cog\"></span> ค้นหาข้อมูลขั้นสูง\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-md-12\">\r" +
    "\n" +
    "                        <form class=\"form\">\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "                                <label>ค้นหาข้อมูล</label>\r" +
    "\n" +
    "                                <input type=\"text\" placeholder=\"ข้อความที่ต้องการค้นหา\" ng-model=\"options.search\" class=\"form-control\" />\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "                                <label>ชนิดของสื่อ {{options.type}}</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <select class=\"form-control\" select-default ng-model=\"options.type\">\r" +
    "\n" +
    "                                    <option value=\"\">ทุกชนิดของสื่อ</option>\r" +
    "\n" +
    "                                    <option value=\"{{it.type_id}}\" ng-repeat=\"it in lookups.type\">{{it.name}}</option>\r" +
    "\n" +
    "                                </select>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "                                <label>กล่มสาระการเรียนรู้ {{options.group}}</label>\r" +
    "\n" +
    "                                <select class=\"form-control\" select-default ng-model=\"options.group\">\r" +
    "\n" +
    "                                    <option value=\"\">ทุกกลุ่มสาระการเรียนรู้</option>\r" +
    "\n" +
    "                                    <option value=\"{{it.group_id}}\" ng-repeat=\"it in lookups.group\">{{it.name}}</option>\r" +
    "\n" +
    "                                </select>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"form-group\">\r" +
    "\n" +
    "                                <label>ระดับชั้น {{options.level}}</label>\r" +
    "\n" +
    "                                <select class=\"form-control\" ng-model=\"options.level\" select-default>\r" +
    "\n" +
    "                                    <option value=\"\" \">ทุกระดับชั้น</option>\r" +
    "\n" +
    "                                    <option value=\"{{it.level_id}}\" ng-repeat=\"it in lookups.level\">{{it.name}}</option>\r" +
    "\n" +
    "                                </select>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </form>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-footer\">\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-md-offset-4 col-md-4\">\r" +
    "\n" +
    "                        <button type=\"submit\" class=\"btn btn-success btn-block\" data-dismiss=\"modal\">\r" +
    "\n" +
    "                            <span class=\"glyphicon glyphicon-search\"></span>&nbsp;เริ่มค้นหา\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    " \r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<!-- search result -->\r" +
    "\n" +
    "<div class=\"row\" style=\"padding-top:4em\" >\r" +
    "\n" +
    "  <div class=\"col-md-12\">\r" +
    "\n" +
    "    <table class=\"table table-hover\">\r" +
    "\n" +
    "      <thead>\r" +
    "\n" +
    "        <tr>\r" +
    "\n" +
    "          <th>รหัส</th>\r" +
    "\n" +
    "          <th>ชื่อเลข</th>\r" +
    "\n" +
    "          <th>ผู้สอน</th>\r" +
    "\n" +
    "          <th>กลุ่มสาระ</th>\r" +
    "\n" +
    "          <th>ระดับชั้น</th>\r" +
    "\n" +
    "          <th>ประเภทสื่อ</th>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "      </thead>\r" +
    "\n" +
    "      <tbody>\r" +
    "\n" +
    "        <tr ng-repeat=\"i in [1,2,3,4,5,6,7,8,9,10]\" ng-click=\"view()\">\r" +
    "\n" +
    "          <td>No</td>\r" +
    "\n" +
    "          <td>Topic</td>\r" +
    "\n" +
    "          <td>Label</td>\r" +
    "\n" +
    "          <td>Type</td>\r" +
    "\n" +
    "          <td>xxx</td>\r" +
    "\n" +
    "          <td>xxx</td>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "\r" +
    "\n" +
    "      </tbody>\r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"text-center\">\r" +
    "\n" +
    "        \r" +
    "\n" +
    "              <ul class=\"pagination\">\r" +
    "\n" +
    "                  <li><a href=\"#\">&laquo;</a></li>\r" +
    "\n" +
    "                  <li><a href=\"#\">1</a></li>\r" +
    "\n" +
    "                  <li><a href=\"#\">2</a></li>\r" +
    "\n" +
    "                  <li><a href=\"#\">3</a></li>\r" +
    "\n" +
    "                  <li><a href=\"#\">4</a></li>\r" +
    "\n" +
    "                  <li><a href=\"#\">5</a></li>\r" +
    "\n" +
    "                  <li><a href=\"#\">&raquo;</a></li>\r" +
    "\n" +
    "              </ul>\r" +
    "\n" +
    "    \r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('admin.cases.reports.html',
    "<div class=\"popover\" style=\"min-width:400px\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <h3 class=\"popover-title\"><span class=\"glyphicon glyphicon-share\"></span> <strong>สรุปรายงานคดี</strong></h3>\r" +
    "\n" +
    "    <div class=\"popover-content\" style=\"padding-top:2em;padding-bottom:2em\">\r" +
    "\n" +
    "        <a href=\"#admin/reports/report1\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> สรุปปริมาณรายงานคดีของศาลในภาค 5\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "        <a href=\"#admin/reports/report2\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> สรุปรายงานคดีแยกเป็นรายศาล\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "        <a href=\"#admin/reports/report9\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> สรุปประเภทคดีที่ศาลรายงานมายังสำนักงาน<br />อธิบดีผู้พิพากษาภาค 5 (เดือน)\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "        <a href=\"#admin/reports/report10\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> สรุปประเภทคดีที่ศาลรายงานมายังสำนักงาน<br />อธิบดีผู้พิพากษาภาค 5 (ปี)\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('admin.vcases.reports.html',
    "<div class=\"popover\" style=\"min-width:400px\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <h3 class=\"popover-title\"><span class=\"glyphicon glyphicon-share\"></span> <strong>สรุปรายงานคดี</strong></h3>\r" +
    "\n" +
    "    <div class=\"popover-content\" style=\"padding-top:2em;padding-bottom:2em\">\r" +
    "\n" +
    "        <a href=\"#admin/reports/report4\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> รายงานการส่งสำนวนเพื่อตรวจร่างคำพิพากษาประจำวัน\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "        <a href=\"#admin/reports/report5\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> รายงานข้อมูลการส่งสำนวนและร่างคำพิพากษา<br />ของศาลในภาค 5 (ประจำเดือน)\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "        <a href=\"#admin/reports/report6\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> สรุปการส่งสำนวนและร่างคำพิพากษา<br />ศาลในภาค 5(ประจำเดือน)\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "        <a href=\"#admin/reports/report7\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> รายงานสำนวนที่ไม่ได้ส่งสำเนาคำพิพากษา\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "        <a href=\"#admin/reports/report8\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> รายงานคดีที่ไม่ได้ส่งสำนวน\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "        <hr/>\r" +
    "\n" +
    "        <a href=\"#admin/reports/report11\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> รายงานระยะเวลาการตรวจสำนวนและร่างคำพิพากษา\r" +
    "\n" +
    "        </a>        \r" +
    "\n" +
    "        <a href=\"#admin/reports/report12\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> สำนวนคดีส่งตรวจที่ไม่เป็นไปตามระเบียบ\r" +
    "\n" +
    "        </a> \r" +
    "\n" +
    "        <a href=\"#admin/reports/report13\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> รายงานระยะเวลาการตรวจสำนวนและร่าง (รอง อธ.)\r" +
    "\n" +
    "        </a> \r" +
    "\n" +
    "        <a href=\"#admin/reports/report14\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> รายงานระยะเวลาการตรวจสำนวนและร่าง (หัวหน้าภาค)\r" +
    "\n" +
    "        </a>                                       \r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('court.cases.reports.html',
    "<div class=\"popover\" style=\"min-width:400px\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <h3 class=\"popover-title\"><span class=\"glyphicon glyphicon-share\"></span> <strong>พิมพ์รายงาน</strong></h3>\r" +
    "\n" +
    "    <div class=\"popover-content\" style=\"padding-top:2em;padding-bottom:2em\">\r" +
    "\n" +
    "        <a href=\"#court/reports/report1\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> รายงานการจัดส่งคดี \r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "        <a href=\"#court/reports/report3\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> รายงานคดีค้างส่งสำนวน\r" +
    "\n" +
    "        </a>                 \r" +
    "\n" +
    "        <a href=\"#court/reports/report4\" class=\"btn btn-info btn-block\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-print\"></span> รายงานคดีค้างส่งสำเนาคำพิพากษา\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom-dropdown-pupup.html',
    "<div class=\"custom-dropdown popover\" style=\"min-width:720px;max-width:80%;height:480px;\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-title bg-header\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"Close\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "        <h4>\r" +
    "\n" +
    "            <i class=\"fa fa-windows\"></i>\r" +
    "\n" +
    "            {{::title}}\r" +
    "\n" +
    "            <span ng-if=\"$count()\">\r" +
    "\n" +
    "                <span class=\"badge\" style=\"background-color:#58B358\">\r" +
    "\n" +
    "                    เลือกแล้ว {{$count()}}\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "            <span class=\"input-group pull-right\" style=\"width:160px;margin-right:30px;padding-top:0px;top:-8px\">\r" +
    "\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"search.text\" placeholder=\"ค้นหา\" ng-model-options=\"{ debounce: 500 }\" />\r" +
    "\n" +
    "                <div ng-if=\"!search.text\" class=\"input-group-addon btn btn-default\" title=\"ค้นหา\"><span class=\"glyphicon glyphicon-search\"></span></div>\r" +
    "\n" +
    "                <div ng-if=\"search.text\" class=\"input-group-addon btn btn-default\" ng-click=\"search.text=''\" title=\"เลิกค้นหา\"><span class=\"glyphicon glyphicon-remove\"></span></div>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "        </h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popover-content bg-content\" style=\"overflow-y:auto;height:360px;max-height:360px;\">\r" +
    "\n" +
    "        <div ng-switch=\"has($groupField)\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <ul class=\"list-group\" ng-repeat=\"($group, $children) in $groupItems\" ng-switch-when=\"true\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <li class=\"list-group-item header\">\r" +
    "\n" +
    "                    <span class=\"badge\" ng-bind=\"$children.length\">0</span>\r" +
    "\n" +
    "                    <div ng-switch=\"has($groupTemplate)\">\r" +
    "\n" +
    "                        <span ng-switch-when=\"true\" custom-template=\"$groupTemplate\"></span>\r" +
    "\n" +
    "                        <h4 class=\"list-group-item-heading text-muted\" ng-switch-default>{{$groupFunction($group)}}</h4>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <li class=\"list-group-item child\" ng-repeat=\"$item in $children\" ng-click=\"select($item)\" ng-class=\"{'active':isSelected($item)}\">\r" +
    "\n" +
    "                    <div ng-switch=\"has($itemTemplate)\">\r" +
    "\n" +
    "                        <span ng-switch-when=\"true\" custom-template=\"$itemTemplate\"></span>\r" +
    "\n" +
    "                        <strong ng-switch-default>{{::$labelFunction($item)}} </strong>\r" +
    "\n" +
    "                        <span ng-if=\"isSelected($item)\" class=\"glyphicon glyphicon-ok pull-right\"></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <ul class=\"list-group\" ng-switch-default>\r" +
    "\n" +
    "                <li class=\"list-group-item child\" ng-repeat=\"$item in $items | filter:search.text\" ng-click=\"select($item)\" ng-class=\"{'active':isSelected($item)}\">\r" +
    "\n" +
    "                    <div ng-switch=\"has($itemTemplate)\">\r" +
    "\n" +
    "                        <span ng-switch-when=\"true\" custom-template=\"$itemTemplate\"></span>\r" +
    "\n" +
    "                        <strong ng-switch-default>{{::$labelFunction($item)}}</strong>\r" +
    "\n" +
    "                        <span ng-if=\"isSelected($item)\" class=\"glyphicon glyphicon-ok pull-right\"></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"ยกเลิกการเลือกทั้งหมด เพื่อเริ่มเลือกใหม่\" ng-disabled=\"!$count()\" class=\"btn btn-danger pull-left\" ng-click=\"select(null)\"><span class=\"glyphicon glyphicon-repeat\"></span> Clear</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-success btn-min\" ng-click=\"accept();$hide()\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-ok-sign\"></span> ตกลง\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-remove-sign\"></span> ยกเลิก</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom-report-pupup.html',
    "<div class=\"custom-dropdown popover\" style=\"min-width:100%;height:100%\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-title bg-header\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"Close\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "        <h4>\r" +
    "\n" +
    "            <i class=\"fa fa-windows\"></i>\r" +
    "\n" +
    "            {{::title}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popover-content bg-content\" style=\"overflow-y:auto;\">\r" +
    "\n" +
    "        <div ng-include=\"template\"></div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.accept.popover.html',
    "<div class=\"popover\" style=\"min-width:350px;max-width:80%\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-title\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"Close\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "        <h4><i class=\"fa fa-bars\"></i> เพิ่มข้อมูล</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <form class=\"form\" style=\"padding:10px;\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <label class=\"control-label\">จำเลยสารภาพ</label>\r" +
    "\n" +
    "                <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control\" ng-model=\"itemResult.name\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-disabled=\"!itemResult.name\" ng-click=\"addAccept(itemResult)\"><span class=\"glyphicon glyphicon-ok-sign\"></span> เพิ่มข้อมูล</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-warning\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-remove-sign\"></span> ยกเลิก</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.atresult.popover.html',
    "<div class=\"popover\" style=\"min-width:350px;max-width:80%\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-title\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"Close\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "        <h4><i class=\"fa fa-bars\"></i> เพิ่มข้อมูล</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <form class=\"form\" style=\"padding:10px;\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <label class=\"control-label\">เหตุผลที่ไม่ถูกต้องตามระเบียบ</label>\r" +
    "\n" +
    "                <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control\" ng-model=\"itemResult.name\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-disabled=\"!itemResult.name\" ng-click=\"addAtResult(itemResult)\"><span class=\"glyphicon glyphicon-ok-sign\"></span> เพิ่มข้อมูล</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-warning\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-remove-sign\"></span> ยกเลิก</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.cases.search.html',
    "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r" +
    "\n" +
    "    <div class=\"modal-dialog\" style=\"min-width:640px\">\r" +
    "\n" +
    "        <div class=\"modal-content\">\r" +
    "\n" +
    "            <div class=\"modal-header\">\r" +
    "\n" +
    "                <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "                <h4 class=\"modal-title\"><span class=\"fa fa-windows\"></span> ค้นหาข้อมูล</h4>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body\">\r" +
    "\n" +
    "                <form class=\"form-horizontal\" name=\"form\">\r" +
    "\n" +
    "                    <fieldset>\r" +
    "\n" +
    "                        <div class=\"form-group\">\r" +
    "\n" +
    "                            <!-- Text input-->\r" +
    "\n" +
    "                            <label class=\"col-md-4 control-label\">วันที่ส่ง</label>\r" +
    "\n" +
    "                            <div class=\"col-md-7\">\r" +
    "\n" +
    "                                <div class=\"row\">\r" +
    "\n" +
    "                                    <div class=\"col-md-12\">\r" +
    "\n" +
    "                                        <span mode=\"0\" ng-model=\"searchItem.date1\" placeholder=\"เริ่มตั้งแต่\" custom-date-field></span>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div class=\"col-md-12\" style=\"padding-top:0.5em\">\r" +
    "\n" +
    "                                        <span mode=\"0\" ng-model=\"searchItem.date2\" placeholder=\"ถึงวันที่\" custom-date-field></span>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"form-group\">\r" +
    "\n" +
    "                            <!-- Text input-->\r" +
    "\n" +
    "                            <label class=\"col-md-4 control-label\">เลขคดีดำ</label>\r" +
    "\n" +
    "                            <div class=\"col-md-7\">\r" +
    "\n" +
    "                                <input type=\"text\" name=\"name\" placeholder=\"\" required ng-model=\"searchItem.number_black\" class=\"form-control input-md\">\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <!-- Text input-->\r" +
    "\n" +
    "                            <label class=\"col-md-4 control-label\">โจทก์</label>\r" +
    "\n" +
    "                            <div class=\"col-md-7\">\r" +
    "\n" +
    "                                <input type=\"text\" name=\"code\" placeholder=\"\" required ng-model=\"searchItem.plaintiff\" class=\"form-control input-md\">\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <!-- Text input-->\r" +
    "\n" +
    "                            <label class=\"col-md-4 control-label\">จำเลย</label>\r" +
    "\n" +
    "                            <div class=\"col-md-7\">\r" +
    "\n" +
    "                                <input type=\"text\" name=\"code\" placeholder=\"\" required ng-model=\"searchItem.defendant\" class=\"form-control input-md\">\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"form-group\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <!-- Text input-->\r" +
    "\n" +
    "                            <label class=\"col-md-4 control-label\">เรื่อง</label>\r" +
    "\n" +
    "                            <div class=\"col-md-7\">\r" +
    "\n" +
    "                                <input type=\"text\" name=\"code\" placeholder=\"\" required ng-model=\"searchItem.title\" class=\"form-control input-md\">\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"form-group\" ng-show=\"isAdmin()\">\r" +
    "\n" +
    "                            <!-- Select Basic -->\r" +
    "\n" +
    "                            <label class=\"col-md-4 control-label\">ศาล</label>\r" +
    "\n" +
    "                            <div class=\"col-md-7\">\r" +
    "\n" +
    "                                <select class=\"form-control input-md\" ng-model=\"searchItem.user_id\" select-value-type=\"string\"\r" +
    "\n" +
    "                                        ng-options=\"it.id as it.name group by lookup_group(it.group_id) for it in Lookups.getCourt()\">\r" +
    "\n" +
    "                                    <option value=\"\">ทุกศาล</option>\r" +
    "\n" +
    "                                </select>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </fieldset>\r" +
    "\n" +
    "                </form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-footer\">\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-min\" ng-click=\"startSearch(searchItem);$hide()\"><span class=\"glyphicon glyphicon-search\"></span> ค้นหา</button>\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-remove\"></span> ยกเลิก</button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.checked.html',
    "<span id=\"checked-actions\" class=\"glyphicon glyphicon-th\" data-animation=\"am-flip-x\" bs-dropdown=\"actions\" aria-haspopup=\"true\" aria-expanded=\"false\" data-template=\"custom.dropdown.actions.html\"></span>\r" +
    "\n"
  );


  $templateCache.put('custom.columns.menu.html',
    "<div class=\"popover\" style=\"min-width:400px;max-width:95%;height:400px\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-title\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"Close\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "        <h4>\r" +
    "\n" +
    "            <i class=\"fa fa-windows\"></i>\r" +
    "\n" +
    "            แสดง / ซ่อน คอลัมน์\r" +
    "\n" +
    "        </h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popover-content\" style=\"overflow-y:auto;max-height:320px;\">\r" +
    "\n" +
    "        <table class=\"table table-striped table-hover\">\r" +
    "\n" +
    "            <tr ng-repeat=\"it in $columns\" ng-if=\"it.title!=''\">\r" +
    "\n" +
    "                <td width=\"30\"><input type=\"checkbox\" ng-model=\"it.show\" ng-disabled=\"$last\" /></td>\r" +
    "\n" +
    "                <td ng-class=\"{'bg-warning':!it.show,'text-muted':$last}\"><strong>{{it.title}}</strong></td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "        </table>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.command.popover.html',
    "<div class=\"popover\" style=\"min-width:350px;max-width:80%\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-title\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"Close\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "        <h4><i class=\"fa fa-bars\"></i> คำสั่ง อธ.</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <form class=\"form\" style=\"padding:10px;\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <label class=\"control-label\">คำสั่ง อธ.</label>\r" +
    "\n" +
    "                <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control\" ng-model=\"itemResult.name\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-disabled=\"!itemResult.name\" ng-click=\"addCommand(itemResult)\"><span class=\"glyphicon glyphicon-ok-sign\"></span> เพิ่มข้อมูล</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-warning\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-remove-sign\"></span> ยกเลิก</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.confirm.admin.actions.html',
    "<div class=\"popover\" style=\"min-width:300px\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <h3 class=\"popover-title\"><span class=\"glyphicon glyphicon-share\"></span> <strong>เลือกทำรายการ</strong></h3>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <p class=\"text-center\">\r" +
    "\n" +
    "            <button type=\"button\" ng-disabled=\"$it.no_case_sent=='1'\" class=\"btn btn-success btn-block\" ng-click=\"go('admin.cases.form1',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">1</span> รับรายงานคดี</div></button>\r" +
    "\n" +
    "            <button type=\"button\" ng-disabled=\"!caseAdminForm5($it)\" class=\"btn btn-success btn-block\" ng-click=\"go('admin.cases.form5',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">5</span> รับสำเนาคำพิพากษา</div></button>\r" +
    "\n" +
    "        </p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.confirm.admin.actions2.html',
    "<div class=\"popover\" style=\"min-width:300px\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <h3 class=\"popover-title\"><span class=\"glyphicon glyphicon-share\"></span> <strong>เลือกทำรายการ</strong></h3>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <p class=\"text-center\">\r" +
    "\n" +
    "            <button type=\"button\" ng-disabled=\"vcaseAdminForm($it)<2\" class=\"btn btn-info btn-block\" ng-click=\"go('admin.vcases.form2',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">2</span> รับสำนวนและร่าง</div></button>\r" +
    "\n" +
    "            <button type=\"button\" ng-disabled=\"vcaseAdminForm($it)<2\" class=\"btn btn-info btn-block\" ng-click=\"go('admin.vcases.form3',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">3</span> จ่ายสำนวนเพื่อตรวจร่างคำพิพากษา</div></button>\r" +
    "\n" +
    "            <button type=\"button\" ng-disabled=\"vcaseAdminForm($it)<2\" class=\"btn btn-info btn-block\" ng-click=\"go('admin.vcases.form4',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">4</span> ส่งสำนวนและร่างคำพิพากษาคืนศาล</div></button>\r" +
    "\n" +
    "            <button type=\"button\" ng-disabled=\"!(vcaseAdminForm($it)>0)\" class=\"btn btn-info btn-block\" ng-click=\"go('admin.vcases.form5',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">5</span> รับสำเนาคำพิพากษา</div></button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <button type=\"button\" ng-if=\"($it.number_black && $it.date_received3)\" class=\"btn btn-success btn-block\" ng-click=\"printCover($it);$hide()\"><div class=\"text-left\"><span class=\"glyphicon glyphicon-print\"></span> พิมพ์ปกสำนวน</div></button>\r" +
    "\n" +
    "        </p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.confirm.admin.actions3.html',
    "<div class=\"popover\" style=\"min-width:300px\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <h3 class=\"popover-title\"><span class=\"glyphicon glyphicon-share\"></span> <strong>เลือกทำรายการ</strong></h3>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <p class=\"text-center\">\r" +
    "\n" +
    "            <button type=\"button\" zzng-disabled=\"!($it.date_sent_a  && $it.number_sent_a)\" class=\"btn btn-success btn-block\" ng-click=\"go('admin.acases.form1',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">1</span> รับร่างคำสั่ง</div></button>\r" +
    "\n" +
    "            <button type=\"button\" zzng-disabled=\"!($it.date_sent_a && $it.number_sent_a)\" class=\"btn btn-success btn-block\" ng-click=\"go('admin.acases.form2',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">2</span> ส่งสำนวนและร่างคำสั่งคืน</div></button>\r" +
    "\n" +
    "                        <button type=\"button\" ng-if=\"(true || $it.number_black && $it.date_received3)\" class=\"btn btn-success btn-block\" ng-click=\"printCover2($it);$hide()\"><div class=\"text-left\"><span class=\"glyphicon glyphicon-print\"></span> พิมพ์ปกสำนวน</div></button>\r" +
    "\n" +
    "        </p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.confirm.autonumber.html',
    "<div class=\"popover\" style=\"min-width:350px\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <h3 class=\"popover-title text-center text-danger\"><strong>ยืนยันการลบเลขรับสำนวน</strong></h3>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <p class=\"text-center\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-danger btn-min\" ng-click=\"clearRunNumber(editingItem);$hide()\"><span class=\"glyphicon glyphicon-remove\"></span> ลบ</button>\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-primary btn-min\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-ok\"></span> ยกเลิก</button>\r" +
    "\n" +
    "        </p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.confirm.autonumber2.html',
    "<div class=\"popover\" style=\"min-width:350px\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <h3 class=\"popover-title text-center text-danger\"><strong>ยืนยันการลบเลขรับสำนวน</strong></h3>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <p class=\"text-center\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-danger btn-min\" ng-click=\"clearRunNumber2(editingItem);$hide()\"><span class=\"glyphicon glyphicon-remove\"></span> ลบ</button>\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-primary btn-min\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-ok\"></span> ยกเลิก</button>\r" +
    "\n" +
    "        </p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.confirm.court.actions.html',
    "<div class=\"popover\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <h3 class=\"popover-title\"><span class=\"glyphicon glyphicon-share\"></span> <strong>เลือกทำรายการ</strong></h3>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <p class=\"text-center\">\r" +
    "\n" +
    "            <button type=\"button\" ng-show=\"($it.no_case_sent=='2' )\" class=\"btn btn-warning btn-block\" ng-click=\"editItem();$hide()\"><div class=\"text-left\"><span class=\"badge\"><span class=\"glyphicon glyphicon-star-empty\"></span></span> ส่งรายงานคดี</div></button>        \r" +
    "\n" +
    "            <button type=\"button\" ng-disabled=\"(caseCourtForm($it)<2)\" class=\"btn btn-success btn-block\" ng-click=\"go('court.cases.form2',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">1</span> ส่งสำเนาคำพิพากษา</div></button>\r" +
    "\n" +
    "            <button type=\"button\" ng-disabled=\"(caseCourtForm($it)<2)\" class=\"btn btn-success btn-block\" ng-click=\"go('court.cases.form3',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">2</span> Upload คำพิพากษา</div></button>\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-success btn-block\" ng-click=\"go('court.cases.form4',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">3</span> ระบบติดตาม</div></button>\r" +
    "\n" +
    "        </p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.confirm.court.actions2.html',
    "<div class=\"popover\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <h3 class=\"popover-title\"><span class=\"glyphicon glyphicon-share\"></span> <strong>เลือกทำรายการ</strong></h3>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <p class=\"text-center\">\r" +
    "\n" +
    "            <button type=\"button\" ng-disabled=\"($it.no_case_sent=='1' && $it.return_checked!='1') || (caseCourtForm($it)<3)\" class=\"btn btn-success btn-block\" ng-click=\"go('court.vcases.form1',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">1</span> ส่งสำนวนเพื่อตรวจร่าง</div></button>        \r" +
    "\n" +
    "            <button type=\"button\" ng-disabled=\"(caseCourtForm($it)==1)\" class=\"btn btn-success btn-block\" ng-click=\"go('court.vcases.form2',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">2</span> ส่งสำเนาคำพิพากษา</div></button>\r" +
    "\n" +
    "            <button type=\"button\" ng-disabled=\"(caseCourtForm($it)==1)\" class=\"btn btn-success btn-block\" ng-click=\"go('court.vcases.form3',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">3</span> Upload คำพิพากษา</div></button>\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-success btn-block\" ng-click=\"go('court.vcases.form4',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\">4</span> ระบบติดตาม</div></button>\r" +
    "\n" +
    "        </p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.confirm.court.actions3.html',
    "<div class=\"popover\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <h3 class=\"popover-title\"><span class=\"glyphicon glyphicon-share\"></span> <strong>เลือกทำรายการ</strong></h3>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <p class=\"text-center\">\r" +
    "\n" +
    "            <button type=\"button\" xxng-disabled=\"(caseCourtForm($it)<2)\" class=\"btn btn-success btn-block\" ng-click=\"go('court.cases.form4',$it);$hide()\"><div class=\"text-left\"><span class=\"badge\"><span class=\"glyphicon glyphicon-star-empty\"></span></span> ติดตามสำนวน</div></button>\r" +
    "\n" +
    "        </p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.confirm.popover.html',
    "<div class=\"popover\" style=\"min-width:300px\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <h3 class=\"popover-title text-center text-danger\"><strong>ยืนยันการลบข้อมูล</strong></h3>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <p class=\"text-center\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-danger\" ng-click=\"doRemove();$hide()\"><span class=\"glyphicon glyphicon-remove\"></span> ลบข้อมูล</button>\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-primary\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-ok\"></span> ยกเลิก</button>\r" +
    "\n" +
    "        </p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.confirm2.popover.html',
    "<div class=\"popover\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <h3 class=\"popover-title\">คุณต้องการลบข้อมูลรายการที่เช็คทั้งหมด ใช่หรือไม่</h3>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <p class=\"text-center\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-danger\" ng-click=\"doRemoveChecked();$hide()\">ลบทั้งหมด</button>\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-primary\" ng-click=\"$hide()\">ยกเลิก</button>\r" +
    "\n" +
    "        </p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.court.form2.html',
    "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"modal-dialog\" style=\"width:95%;\">\r" +
    "\n" +
    "        <div class=\"modal-content\">\r" +
    "\n" +
    "            <div class=\"modal-header\" ng-show=\"title\">\r" +
    "\n" +
    "                <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "                <h4 class=\"modal-title\"><span class=\"fa fa-windows\"></span> <span ng-bind=\"title\"></span> (ไม่ได้จัดส่งรายงานคดี)</h4>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-body\">\r" +
    "\n" +
    "                <form class=\"form-horizontal\" name=\"form\">\r" +
    "\n" +
    "                    <div class=\"row\">\r" +
    "\n" +
    "                        <div class=\"form-group col-md-6  has-feedback custom-dropdown\">\r" +
    "\n" +
    "                            <!-- Text input-->\r" +
    "\n" +
    "                            <label class=\"col-md-4 control-label\">ศาล</label>\r" +
    "\n" +
    "                            <div class=\"col-md-7\">\r" +
    "\n" +
    "                                <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.user_id\" data-options=\"court_options\"></div>\r" +
    "\n" +
    "                                <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <fieldset ng-disabled=\"!editingItem.user_id\">\r" +
    "\n" +
    "                        <div class=\"row\">\r" +
    "\n" +
    "                            <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">วันที่ส่ง</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <span mode=\"0\" ng-model=\"editingItem.date_sent2\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\" col-md-4 control-label\">เลขที่หนังสือส่ง</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.number_sent\">\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"row\">\r" +
    "\n" +
    "                            <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">วันที่รับฟ้อง</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <span mode=\"0\" ng-model=\"editingItem.date_case\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"row\">\r" +
    "\n" +
    "                            <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">ประเภทคดี</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <select ng-change=\"changeTypeId(editingItem)\" title=\"ไม่สามารถแก้ไขได้ถ้าบันทึกเลขคดีแล้ว (ต้องลบคดีนี้แล้วเพิ่มใหม่เท่านั้น)\" ng-disabled=\"editingItem.id && editingItem.number_black\" class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.type_id\" select-default ng-options=\"it.id as it.id | lookup_type:'name':'code' group by it.group_id | lookup_group for it  in Lookups.getType()\">\r" +
    "\n" +
    "                                        <option value=\"\"></option>\r" +
    "\n" +
    "                                    </select>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">เลขคดีดำ</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <div class=\"input-group\">\r" +
    "\n" +
    "                                        <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" style=\"background-color:#ffffff\" readonly value=\"{{editingItem.number_black}}\">\r" +
    "\n" +
    "                                        <span title=\"ป้อนเลขคดี\" id=\"edit-blacknum\" ng-click=\"popupBlackNumber(editingItem)\" ng-disabled=\"!editingItem.type_id\" class=\"btn input-group-addon\"><span class=\"glyphicon glyphicon-pencil\"></span> ป้อนเลขคดี</span>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"row\">\r" +
    "\n" +
    "                            <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">โจทก์</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.plaintiff\">\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                                <!-- Text input-->\r" +
    "\n" +
    "                                <label class=\"col-md-4 control-label\">จำเลย</label>\r" +
    "\n" +
    "                                <div class=\"col-md-7\">\r" +
    "\n" +
    "                                    <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.defendant\">\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"form-group\">\r" +
    "\n" +
    "                            <!-- Text input-->\r" +
    "\n" +
    "                            <label class=\"col-md-2 control-label\">ข้อหาพิมพ์ปก</label>\r" +
    "\n" +
    "                            <div class=\"col-md-9\">\r" +
    "\n" +
    "                                <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.title\">\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"form-group\">\r" +
    "\n" +
    "                            <!-- Text input-->\r" +
    "\n" +
    "                            <label class=\"col-md-2 control-label\">ข้อหาสถิติ</label>\r" +
    "\n" +
    "                            <div class=\"col-md-9\">\r" +
    "\n" +
    "                                <div class=\"input-group\" ng-controller=\"TopicsCtrl\">\r" +
    "\n" +
    "                                    <div class=\"form-control\" style=\"height:auto;min-height:50px;border-right:none\">\r" +
    "\n" +
    "                                        <custom-choices ng-model=\"editingItem.topic_ids\"></custom-choices>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <div class=\"input-group-addon\" style=\"vertical-align:top;border-left:none;background-color:transparent\">\r" +
    "\n" +
    "                                        <button class=\"btn btn-circle\" ng-disabled=\"!editingItem.type_id\" id=\"edit-topics\" ng-click=\"popupTopics(editingItem)\"><span class=\"glyphicon glyphicon-pencil\"></span></button>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"form-group col-md-6\" ng-class=\"{'has-error':form.fcap.$invalid}\">\r" +
    "\n" +
    "                            <!-- Text input-->\r" +
    "\n" +
    "                            <label class=\"col-md-4 control-label\">จำนวนทุนทรัพย์</label>\r" +
    "\n" +
    "                            <div class=\"col-md-8\">\r" +
    "\n" +
    "                                <div class=\"input-group\">\r" +
    "\n" +
    "                                    <input type=\"text\" name=\"fcap\" placeholder=\"0.00\" ng-pattern=\"/^[0-9]+(\\.[0-9]{1,})?$/\" class=\"form-control input-md\" step=\"0.01\" ng-model=\"editingItem.capital\">\r" +
    "\n" +
    "                                    <span class=\"input-group-addon\">บาท</span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"row clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"form-group col-md-6 has-feedback custom-dropdown\">\r" +
    "\n" +
    "                            <label class=\"control-label col-md-4\">ผู้พิพากษาเจ้าของสำนวน</label>\r" +
    "\n" +
    "                            <div class=\"col-md-8\">\r" +
    "\n" +
    "                                <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge_id\" data-options=\"judge_court_options\" data-params=\"[editingItem.user_id]\"></div>\r" +
    "\n" +
    "                                <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"form-group col-md-6 has-feedback custom-dropdown\">\r" +
    "\n" +
    "                            <label class=\"control-label col-md-4\">องค์คณะ</label>\r" +
    "\n" +
    "                            <div class=\"col-md-8\">\r" +
    "\n" +
    "                                <div custom-dropdown class=\"form-control input-md\" ng-model=\"editingItem.judge3_id\" data-options=\"judge_court_options\" data-params=\"[editingItem.user_id]\"></div>\r" +
    "\n" +
    "                                <span class=\"form-control-feedback\"><span class=\"caret\"></span></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                            <label class=\"control-label col-md-4\">จำเลยต้องขัง</label>\r" +
    "\n" +
    "                            <div class=\"col-md-8\">\r" +
    "\n" +
    "                                <div class=\"input-group\">\r" +
    "\n" +
    "                                    <select class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.imprison_id\" select-default ng-options=\"it.id as it.name for it  in Lookups.getImprison()\">\r" +
    "\n" +
    "                                        <option value=\"\"></option>\r" +
    "\n" +
    "                                    </select>\r" +
    "\n" +
    "                                    <span class=\"input-group-addon btn\" id=\"add-imprison\" ng-click=\"popupImprison()\"><span class=\"glyphicon glyphicon-plus\"></span></span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                            <label class=\"control-label col-md-4\">จำเลยสารภาพ</label>\r" +
    "\n" +
    "                            <div class=\"col-md-8\">\r" +
    "\n" +
    "                                <div class=\"input-group\">\r" +
    "\n" +
    "                                    <select class=\"form-control input-md\" name=\"role\" ng-model=\"editingItem.accept_id\" select-default ng-options=\"it.id as it.name for it  in Lookups.getAccept()\">\r" +
    "\n" +
    "                                        <option value=\"\"></option>\r" +
    "\n" +
    "                                    </select>\r" +
    "\n" +
    "                                    <span class=\"input-group-addon btn\" id=\"add-accept\" ng-click=\"popupAccept()\"><span class=\"glyphicon glyphicon-plus\"></span></span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"form-group col-md-6\">\r" +
    "\n" +
    "                            <label class=\"control-label col-md-4\">วันที่นัดฟังคำพิพากษา</label>\r" +
    "\n" +
    "                            <div class=\"col-md-8\">\r" +
    "\n" +
    "                                <span mode=\"0\" ng-model=\"editingItem.date_ap\" placeholder=\"ยังไม่มีข้อมูล\" custom-date-field></span>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"row clearfix\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"form-group\">\r" +
    "\n" +
    "                            <!-- Text input-->\r" +
    "\n" +
    "                            <label class=\"col-md-2 control-label\">หมายเหตุ</label>\r" +
    "\n" +
    "                            <div class=\"col-md-9\">\r" +
    "\n" +
    "                                <textarea type=\"text\" rows=\"3\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control input-md\" ng-model=\"editingItem.note2\"></textarea>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"col-md-10 col-md-offset-2\">\r" +
    "\n" +
    "                            <div class=\"help-block\">\r" +
    "\n" +
    "                                <p class=\"text-info\">\r" +
    "\n" +
    "                                    <span class=\"glyphicon glyphicon-question-sign pull-left\"></span>\r" +
    "\n" +
    "                                    <ul>\r" +
    "\n" +
    "                                        <li>ต้องเลือกประเภทคดีก่อนจึงจะสามารถ ป้อนเลขคดี และ ข้อหาหลักได้</li>\r" +
    "\n" +
    "                                        <li>ถ้ามีเลขคดีแล้วประเภทคดีไม่สามารถเปลี่ยนได้ (ต้องลบเลขคดีก่อน)</li>\r" +
    "\n" +
    "                                    </ul>\r" +
    "\n" +
    "                                </p>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </fieldset>\r" +
    "\n" +
    "                </form>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"modal-footer\">\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-min\" ng-disabled=\"form.$invalid\" ng-click=\"saveForm(afterSaved)\"><span class=\"fa fa-save\"></span> บันทึกข้อมูล</button>\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"cancelForm()\"><span class=\"fa fa-close\"></span> ยกเลิก</button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.dropdown.actions.html',
    "<ul tabindex=\"-1\" class=\"dropdown-menu\" role=\"menu\">\r" +
    "\n" +
    "    <li> <a ng-click=\"selectAll()\" href=\"javascript://void(0)\"><span class=\"glyphicon glyphicon-check\"></span> เลือกทั้งหมด</a></li>\r" +
    "\n" +
    "    <li><a ng-click=\"selectInverse()\" href=\"javascript://void(0)\"><span class=\"glyphicon glyphicon-ok-sign\"></span> เลือกกลับกัน</a></li>\r" +
    "\n" +
    "    <li><a ng-click=\"selectNone()\" href=\"javascript://void(0)\"><span class=\"glyphicon glyphicon-ban-circle\"></span> ยกเลิกการเลือกทั้งหมด</a></li>\r" +
    "\n" +
    "    <li ng-if=\"hasChecked()\" class=\"divider\"></li>\r" +
    "\n" +
    "    <li ng-if=\"hasChecked()\"><a ng-click=\"removeChecked()\" href=\"javascript://void(0)\"><span class=\"glyphicon glyphicon-remove\"></span> ลบข้อมูลที่เลือก</a></li>\r" +
    "\n" +
    "</ul>"
  );


  $templateCache.put('custom.imprison.popover.html',
    "<div class=\"popover\" style=\"min-width:350px;max-width:80%\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-title\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"Close\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "        <h4><i class=\"fa fa-bars\"></i> เพิ่มข้อมูล</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <form class=\"form\" style=\"padding:10px;\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <label class=\"control-label\">จำเลยต้องขัง</label>\r" +
    "\n" +
    "                <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control\" ng-model=\"itemResult.name\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-disabled=\"!itemResult.name\" ng-click=\"addImprison(itemResult)\"><span class=\"glyphicon glyphicon-ok-sign\"></span> เพิ่มข้อมูล</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-warning\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-remove-sign\"></span> ยกเลิก</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.judge.popover.html',
    "<div class=\"popover\" style=\"min-width:350px;max-width:80%\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-title\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"Close\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "        <h4><i class=\"fa fa-bars\"></i> ผู้พิพากษาผู้ตรวจ</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <form class=\"form\" style=\"padding:10px;\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <label class=\"control-label\">ชื่อผู้พิพากษา</label>\r" +
    "\n" +
    "                <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control\" ng-model=\"itemResult.name\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <label class=\"control-label\">ตำแหน่ง</label>\r" +
    "\n" +
    "                <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control\" ng-model=\"itemResult.position\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-disabled=\"!itemResult.name\" ng-click=\"addJudge(itemResult)\"><span class=\"glyphicon glyphicon-ok-sign\"></span> เพิ่มข้อมูล</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-warning\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-remove-sign\"></span> ยกเลิก</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.logout.popover.html',
    "<div class=\"popover\" style=\"min-width:320px;\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <h3 class=\"popover-title text-center\" style=\"font-size:1.3em\"><strong>ยืนยันการออกจากระบบ</strong></h3>\r" +
    "\n" +
    "    <div class=\"popover-content\" style=\"padding-top:2em;padding-bottom:2em\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-sm-6\">\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-block btn-warning\" ng-click=\"logOut(false);$hide()\"><span class=\"glyphicon glyphicon-off\"></span> ออกจากระบบ</button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-sm-6\">\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-block btn-info\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-remove\"></span> ยกเลิก</button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.pages.html',
    "<div class=\"ng-cloak ng-table-pager\" ng-if=\"params.data.length\">\r" +
    "\n" +
    "    <div ng-if=\"params.settings().counts.length\" class=\"ng-table-counts btn-group pull-right\">\r" +
    "\n" +
    "        <button ng-repeat=\"count in params.settings().counts\" type=\"button\" ng-class=\"{\\'active\\':params.count()==count}\" ng-click=\"params.count(count)\" class=\"btn btn-default\"> <span ng-bind=\"count\"></span> </button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <ul class=\"pagination ng-table-pagination\">\r" +
    "\n" +
    "        <li ng-class=\"{\\'disabled\\': !page.active && !page.current, \\'active\\': page.current}\" ng-repeat=\"page in pages\" ng-switch=\"page.type\"> <a ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\" href=\"\">&laquo;</a> <a ng-switch-when=\"first\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a> <a ng-switch-when=\"page\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a> <a ng-switch-when=\"more\" ng-click=\"params.page(page.number)\" href=\"\">&#8230;</a> <a ng-switch-when=\"last\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a> <a ng-switch-when=\"next\" ng-click=\"params.page(page.number)\" href=\"\">&raquo;</a> </li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('custom.result.popover.html',
    "<div class=\"popover\" style=\"min-width:350px;max-width:80%\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-title\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"Close\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "        <h4><i class=\"fa fa-bars\"></i> เพิ่มข้อมูล</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <form class=\"form\" style=\"padding:10px;\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <label class=\"control-label\">ผลการปฏิบัติ</label>\r" +
    "\n" +
    "                <input type=\"text\" placeholder=\"ยังไม่มีข้อมูล\" class=\"form-control\" ng-model=\"itemResult.name\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-disabled=\"!itemResult.name\" ng-click=\"addResult(itemResult)\"><span class=\"glyphicon glyphicon-ok-sign\"></span> เพิ่มข้อมูล</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-warning\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-remove-sign\"></span> ยกเลิก</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('ng-table/pager.html',
    "\r" +
    "\n" +
    "<div class=\"row panel-footer\" ng-hide=\"param.hide_footer===true\">\r" +
    "\n" +
    "    <div ng-class=\"{'col-sm-12':params.hide_limit===true,'col-sm-8':params.hide_limit!==true}\">\r" +
    "\n" +
    "        <div ng-if=\"params.data.length==0  && params.ready\"><h2 style=\"padding:0px;margin:0px;color:#777777\"><i class=\"fa fa-exclamation-triangle fa-lg\"></i> <span ng-if=\"!params.not_found\">ไม่พบข้อมูล</span><span ng-if=\"params.not_found\">{{params.not_found}}</span></h2></div>\r" +
    "\n" +
    "        <div ng-table-pager class=\"ng-cloak\" ng-if=\"params.data.length\">\r" +
    "\n" +
    "            <ul class=\"pagination ng-table-pagination\" style=\"margin:0px\" title=\"ไปหน้าที่\">\r" +
    "\n" +
    "                <li ng-class=\"{disabled: !page.active && !page.current, active: page.current}\" ng-repeat=\"page in pages\" ng-switch=\"page.type\">\r" +
    "\n" +
    "                    <a ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\" href=\"\">&laquo;</a>\r" +
    "\n" +
    "                    <a ng-switch-when=\"first\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a>\r" +
    "\n" +
    "                    <a ng-switch-when=\"page\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a>\r" +
    "\n" +
    "                    <a ng-switch-when=\"more\" ng-click=\"params.page(page.number)\" href=\"\">&#8230;</a>\r" +
    "\n" +
    "                    <a ng-switch-when=\"last\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a>\r" +
    "\n" +
    "                    <a ng-switch-when=\"next\" ng-click=\"params.page(page.number)\" href=\"\">&raquo;</a>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"col-sm-4\" ng-if=\"params.hide_limit!==true\">\r" +
    "\n" +
    "        <div class=\"btn-group pull-right\" title=\"จำนวนข้อมูลที่ต้องการให้แสดงในหนึ่งหน้า\">\r" +
    "\n" +
    "            <button ng-repeat=\"it in params.settings().counts track by it\" type=\"button\" ng-class=\"{'active':params.count() == it}\" ng-click=\"params.count(it)\" class=\"btn btn-default\"> {{it}}</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('pager-only.html',
    "<div class=\"row\" ng-hide=\"param.hide_footer===true\">\r" +
    "\n" +
    "    <hr style=\"padding:0;margin:0;padding-top:5px\"/>\r" +
    "\n" +
    "    <div class=\"col-sm-12\">\r" +
    "\n" +
    "        <div ng-if=\"params.data.length==0  && params.ready\"><h2 style=\"padding:0px;margin:0px;color:#777777\"><i class=\"fa fa-exclamation-triangle fa-lg\"></i> <span ng-if=\"!params.not_found\">ไม่พบข้อมูล</span><span ng-if=\"params.not_found\">{{params.not_found}}</span></h2></div>\r" +
    "\n" +
    "        <div ng-table-pager class=\"ng-cloak text-center\" ng-if=\"params.data.length\">\r" +
    "\n" +
    "            <ul class=\"pagination ng-table-pagination\" style=\"margin:0px\" title=\"ไปหน้าที่\">\r" +
    "\n" +
    "                <li ng-class=\"{disabled: !page.active && !page.current, active: page.current}\" ng-repeat=\"page in pages\" ng-switch=\"page.type\">\r" +
    "\n" +
    "                    <a ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\" href=\"\">&laquo;</a>\r" +
    "\n" +
    "                    <a ng-switch-when=\"first\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a>\r" +
    "\n" +
    "                    <a ng-switch-when=\"page\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a>\r" +
    "\n" +
    "                    <a ng-switch-when=\"more\" ng-click=\"params.page(page.number)\" href=\"\">&#8230;</a>\r" +
    "\n" +
    "                    <a ng-switch-when=\"last\" ng-click=\"params.page(page.number)\" href=\"\"><span ng-bind=\"page.number\"></span></a>\r" +
    "\n" +
    "                    <a ng-switch-when=\"next\" ng-click=\"params.page(page.number)\" href=\"\">&raquo;</a>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('popup.autorun.tpl.html',
    "<div class=\"popover\" style=\"min-width:470px;max-width:80%\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-title\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"Close\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "        <h4><i class=\"glyphicon glyphicon-sort-by-alphabet\"></i> เลือกอักษรย่อสำหรับรันเลขรับสำนวน</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popover-content\" style=\"height:250px;pading:0px\">\r" +
    "\n" +
    "        <style>\r" +
    "\n" +
    "            select.custom {\r" +
    "\n" +
    "                padding: 5px;\r" +
    "\n" +
    "                padding-left: 1em;\r" +
    "\n" +
    "                padding-right: 1em;\r" +
    "\n" +
    "                width: 100%;\r" +
    "\n" +
    "                height: 100%;\r" +
    "\n" +
    "                font-size: 1.3em;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "                select.custom option {\r" +
    "\n" +
    "                    padding: 3px;\r" +
    "\n" +
    "                }\r" +
    "\n" +
    "        </style>\r" +
    "\n" +
    "        <select class=\"custom\" size=\"10\" ng-model=\"xitem.type_id\" select-default ng-options=\"it.id as it.id | lookup_type:'name':'code' group by it.group_id | lookup_group for it  in Lookups.getType()\"></select>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-success btn-min\" ng-disabled=\"!xitem.type_id\" ng-click=\"setRunNumberHlr(xitem.type_id);$hide()\"><span class=\"glyphicon glyphicon-ok-sign\"></span> รันเลขรับสำนวน</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-remove-sign\"></span> ยกเลิก</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('popup.autorun2.tpl.html',
    "<div class=\"popover\" style=\"min-width:470px;max-width:80%\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-title\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"Close\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "        <h4><i class=\"glyphicon glyphicon-sort-by-alphabet\"></i> เลือกอักษรย่อสำหรับรันเลขรับสำนวน</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popover-content\" style=\"height:250px;pading:0px\">\r" +
    "\n" +
    "        <style>\r" +
    "\n" +
    "            select.custom {\r" +
    "\n" +
    "                padding: 5px;\r" +
    "\n" +
    "                padding-left: 1em;\r" +
    "\n" +
    "                padding-right: 1em;\r" +
    "\n" +
    "                width: 100%;\r" +
    "\n" +
    "                height: 100%;\r" +
    "\n" +
    "                font-size: 1.3em;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "                select.custom option {\r" +
    "\n" +
    "                    padding: 3px;\r" +
    "\n" +
    "                }\r" +
    "\n" +
    "        </style>\r" +
    "\n" +
    "        <select class=\"custom\" size=\"10\" ng-model=\"xitem.type_id\" select-default ng-options=\"it.id as it.id | lookup_type:'name':'code' group by it.group_id | lookup_group for it  in Lookups.getType()\"></select>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-success btn-min\" ng-disabled=\"!xitem.type_id\" ng-click=\"setRunNumber2Hlr(xitem.type_id);$hide()\"><span class=\"glyphicon glyphicon-ok-sign\"></span> รันเลขรับสำนวน</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-remove-sign\"></span> ยกเลิก</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('popup.black_number.tpl.html',
    "<div class=\"popover\" style=\"min-width:350px;max-width:80%\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-title\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"Close\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "        <h4><i class=\"fa fa-windows\"></i> ป้อนเลขคดี</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popover-content\">\r" +
    "\n" +
    "        <form class=\"xform\" style=\"padding:10px; max-width:480px\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <label class=\"control-label\">เลขคดีดำ</label>\r" +
    "\n" +
    "                <div class=\"input-group\" ng-init=\"temp.year=getBlkYear(editingItem)\">\r" +
    "\n" +
    "                    <span class=\"input-group-addon\">{{editingItem.type_id | lookup_type:'code'}}</span>\r" +
    "\n" +
    "                    <input type=\"text\" maxlength=\"10\" placeholder=\"เลขคดีเช่น 823\" class=\"form-control\" ng-model=\"temp.number_black\">\r" +
    "\n" +
    "                    <span class=\"input-group-addon\">/</span>\r" +
    "\n" +
    "                    <input type=\"text\" maxlength=\"4\" placeholder=\"ปีเช่น 2558\" class=\"form-control\" ng-readonly=\"temp.year.length==4\" ng-model=\"temp.year\" bs-options=\"year for year in years\" bs-typeahead>\r" +
    "\n" +
    "                    <span class=\"input-group-addon btn btn-danger\" title=\"ลบเลขคดี\" style=\"color:#ffffff\" ng-click=\"clearBlackNumber(temp);\">\r" +
    "\n" +
    "                        <span class=\"glyphicon glyphicon-repeat\"></span> ลบเลขคดี\r" +
    "\n" +
    "                    </span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"text-center text-primary\" style=\"margin-top:2em\" ng-show=\"temp.number_black && temp.year\">\r" +
    "\n" +
    "                    ตัวอย่างเลขที่ได้:\r" +
    "\n" +
    "                    <h3 class=\"text-center text-primary\">\r" +
    "\n" +
    "                        {{editingItem.type_id | lookup_type:'code'}}{{temp.number_black}}<span ng-show=\"temp.year\">/</span>{{temp.year}}\r" +
    "\n" +
    "                    </h3>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-success btn-min\" ng-click=\"setBlackNumber(temp,$hide);\"><span class=\"glyphicon glyphicon-ok-sign\"></span> ตกลง</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-remove-sign\"></span> ยกเลิก</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('popup.judges.tpl.html',
    "<div class=\"popover\" style=\"min-width:600px;max-width:80%;height:370px\" ng-controller=\"JudgesCtrl as jctrl\">\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-title\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"Close\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "        <h4>\r" +
    "\n" +
    "            <i class=\"fa fa-windows\"></i>\r" +
    "\n" +
    "            <div class=\"input-group pull-right\" style=\"width:160px;margin-right:30px\">\r" +
    "\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"search.name\" placeholder=\"ค้นหา\" />\r" +
    "\n" +
    "                <div ng-if=\"!search.name\" class=\"input-group-addon btn btn-default\" title=\"ค้นหา\"><span class=\"glyphicon glyphicon-search\"></span></div>\r" +
    "\n" +
    "                <div ng-if=\"search.name\" class=\"input-group-addon btn btn-default\" ng-click=\"clearSearch()\" title=\"เลิกค้นหา\"><span class=\"glyphicon glyphicon-remove\"></span></div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            ผู้พิพากษา <span ng-if=\"groupTitle\">- {{groupTitle}}</span>\r" +
    "\n" +
    "        </h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popover-content\" style=\"overflow-y:auto;max-height:250px;\">\r" +
    "\n" +
    "        <table class=\"table table-striped table-hover\">\r" +
    "\n" +
    "            <tr ng-repeat=\"it in $items | filter:search\">\r" +
    "\n" +
    "                <td width=\"30\"><input type=\"checkbox\" ng-model=\"it._checked\" /></td>\r" +
    "\n" +
    "                <td ng-class=\"{'text-primary':it._checked}\">{{it.name}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "        </table>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"Clear\" class=\"btn btn-danger pull-left\" ng-click=\"clearChecked()\"><span class=\"glyphicon glyphicon-repeat\"></span> Clear</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-success btn-min\" ng-click=\"setJudge();$hide()\"><span class=\"glyphicon glyphicon-ok-sign\"></span> ตกลง</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-remove-sign\"></span> ยกเลิก</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('popup.topics.tpl.html',
    "<div class=\"popover\" style=\"min-width:720px;max-width:80%;height:480px\" ng-controller=\"TopicsCtrl\" ng-init=\"createList(editingItem, 'topic_ids')\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"arrow\"></div>\r" +
    "\n" +
    "    <div class=\"popover-title\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"Close\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "        <h4>\r" +
    "\n" +
    "            <i class=\"fa fa-windows\"></i>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            ประเภทคดี - {{groupTitle}}\r" +
    "\n" +
    "            <span class=\"input-group pull-right\" style=\"width:160px;margin-right:30px;padding-top:0px;top:-8px\">\r" +
    "\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"search.name\" placeholder=\"ค้นหา\" />\r" +
    "\n" +
    "                <div ng-if=\"!search.name\" class=\"input-group-addon btn btn-default\" title=\"ค้นหา\"><span class=\"glyphicon glyphicon-search\"></span></div>\r" +
    "\n" +
    "                <div ng-if=\"search.name\" class=\"input-group-addon btn btn-default\" ng-click=\"clearSearch()\" title=\"เลิกค้นหา\"><span class=\"glyphicon glyphicon-remove\"></span></div>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "        </h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popover-content\" style=\"overflow-y:auto;height:360px;max-height:360px;\">\r" +
    "\n" +
    "        <table class=\"table table-striped table-hover searchtable\">\r" +
    "\n" +
    "            <tr ng-repeat=\"it in $items | filter:search\">\r" +
    "\n" +
    "                <td width=\"30\" ng-class=\"{'bg-success':it._checked}\"><input type=\"checkbox\" ng-model=\"it._checked\" /></td>\r" +
    "\n" +
    "                <td ng-class=\"{'bg-success':it._checked}\"><strong>{{it.name}}</strong> <span class=\"pull-right label label-info\">{{it.gname}}</span></td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "        </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button type=\"button\" title=\"ยกเลิกการเลือกทั้งหมด\" class=\"btn btn-danger pull-left\" ng-click=\"clearChecked()\"><span class=\"glyphicon glyphicon-repeat\"></span> Clear</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-success btn-min\" ng-click=\"setTopics();$hide()\"><span class=\"glyphicon glyphicon-ok-sign\"></span> ตกลง</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-warning btn-min\" ng-click=\"$hide()\"><span class=\"glyphicon glyphicon-remove-sign\"></span> ยกเลิก</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );

}]);
