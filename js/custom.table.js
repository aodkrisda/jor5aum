
angular.module('custom.table', [])
.directive('ngTableInit', ['$timeout','$compile', function ($timeout, $compile) {
    return {
        priority: 3000,
        compile: function compile(tElement, tAttrs, transclude) {
            var els = angular.element('tbody>tr>td', tElement);
            var cols = [];
            angular.forEach(els, function (v, i) {
                var el = angular.element(v);
                el.attr('ng-if', 'params.isVisible(' + i + ')');
                cols[i] = (el.attr('hide') === undefined);
            });
            
            return function (scope, element, attrs) {
                element.addClass('hidden');
                element.data('cols', cols);
                $timeout(function () {
                    element.removeClass('hidden');
                }, 2);
            }
        }
    }
}])
.directive('ngTableResizable', ['$timeout', '$compile', '$window', function ($timeout, $compile, $window) {
        return function (scope, element, attrs) {
            $timeout(function(){
                element.resizableColumns();
            },100)
        }
}])
.directive('ngTableInitColumns', ['$timeout', '$compile','$window', function ($timeout, $compile,$window) {
    return function (scope, element, attrs) {
        if (scope.params) {
            $timeout(function () {
                var tm= element.data('cols');
                if (tm) {
                    scope.params.setColumns(scope.$columns, tm);
                    element.data('cols', null);
                }
            }, 1);
         }
       
     }
}])
.directive('ngTableMenu', ['$timeout', '$compile', function ($timeout, $compile) {
    return {
        template: '<div title="แสดง / ซ่อนคอลัมน์" ng-click="table.showMenu($event)" ng-class="{\'hidden\':!(table && table.$columns)}" class="btn btn-info btn-circle hidden" style="position:relative;top:16px;opacity:0.8"><span class="glyphicon glyphicon-list"></span></div>',
        replace:true,
        scope: { table: '=ngTableMenu' }
    }
}])
.controller('CustomTableCtrl', function ($scope, $timeout, ngTableParams, Auth, ngTableDefaults, $modal, $popover, $alert, Lookups, cfpLoadingBar, _,API_URL,$state, $rootScope) {
    $scope.Lookups = Lookups;
    $scope._first_ = true;
    $scope.pkField = 'id';
    $scope.apiName = 'table';
    $scope.formID = 'custom.form.html';
    $scope.searchText = '';
    $scope.customFilters = {search:'searchText'};
    $scope.editingItem = null;
    $scope.requiredFilters = null;
    $scope._id_=false;

    this.getScope=function(){
    	return $scope;
    }
    $scope.currentScope=function(){
    	return $scope;
    }
   
    $scope.setAPI = function (str, formid, cfilter, crequired) {
        if(str) $scope.apiName = str;
        if (formid) $scope.formID = formid;
        if (cfilter) $scope.customFilters = cfilter;
        $scope.requiredFilters = crequired;

    }

    $scope.lastSearchText = '';
    $scope.clearFilter = function () {
        $scope.searchText = '';
        $scope.setFilter();
    }

    $scope._lastFilters = {};

    $scope.setFilter = function (refresh) {

        if ($scope.customFilters) {
            if ($scope.searchOption) $scope.searchOption = null;
            var s = {};
            _.each($scope.customFilters, function (v, k) {
            	var kv=$scope.$eval(v);

                if ((kv!=null) && (kv !== '')) {
                    s[k] = kv;
                }
            });
            var b=!_.isEqual($scope._lastFilters, s);

            if (b) {
    
            	
                if ($scope.searchText != undefined) {
                    if ($scope.lastSearchText != $scope.searchText) {
                        $scope.lastSearchText = $scope.searchText;
                    }
                }
                
             

                $scope._lastFilters = s;
                $scope.tableParams.filter(s);
                $scope.refresh();
              
            } else {
                if ($scope.tableParams.filter() !== $scope._lastFilters) {
                    $scope.tableParams.filter($scope._lastFilters);
                    if (Object.keys($scope._lastFilters).length == 0) {
                        $scope.refresh();
                    }
                } else {
                    if (refresh) $scope.refresh();
                }
            }
        }
    }

    $scope.isSearchMode = function () {
        return ($scope.searchOption && ($scope.tableParams.filter() === $scope.searchOption));
    }
    $scope._searchPanel = null;
    var _advancedParam = null;
    $scope.advancedSearch = function (tpl,param) {
        if (tpl) {
            if (!$scope._searchPanel) {
                $scope._searchPanel = $modal({ scope: $scope, title: '', backdrop: 'static', template: tpl, placement: "top", html: true, show: false });
            }
            _advancedParam = param || {};
            $scope._searchPanel.$promise.then($scope._searchPanel.show);
        }
    }
    $scope.$on('modal.show', function(scope,elm) {
       var a=angular.element(elm.$element[0]).find('input[autofocus]:first');
       if(a.length) try{a[0].focus();}catch(err){}

     });

    $scope.searchOption = null;
    $scope.startSearch = function (option) {
        var param={}
        if (_advancedParam) {
            angular.extend(param, option,_advancedParam);
        }
        $scope.searchOption = {search: param };
        $scope.tableParams.filter($scope.searchOption);
    }
    var oldData = null;
    $scope.newItem = function (o,formid) {
        $scope.$saving=false;
        $scope.editingItem = {};
        oldData = null;
        if(o){
        	_.extend($scope.editingItem,o);
        }
        createForm(formid);
        formModal.$scope.title = 'เพิ่มข้อมูลใหม่';
        formModal.$promise.then(formModal.show);
    }
    $scope.setColumns = function (cols) {
        if (cols) {
            cols[1].show = false;
        }
        console.dir(cols[1].title())
    }

    $scope.startIdx = 0;
    var formModal = null;
    var __forms = {};
    function createForm(formid) {
        if (!formid) formid = $scope.formID;
        if (__forms[formid]) {
            formModal = __forms[formid];
        } else {
            formModal = $modal({ scope: $scope, title: '', backdrop: 'static', template: formid, placement: "top", html: true, show: false });
            __forms[formid]= formModal;
        }
        return formModal;
    }
    $scope.editItem = function (formid) {
        if ($scope.$it) {
            var d = {};
            d[$scope.pkField] = $scope.$it[$scope.pkField];
            oldData = null;
            Auth.post($scope.apiName + '/get', d).success(function (data) {
                $scope.editingItem = data.data;
                oldData = {};
                angular.copy(data.data, oldData);
                createForm(formid);
                formModal.$scope.title = 'แก้ไขข้อมูล';
                formModal.$promise.then(formModal.show);
            });
        }
    }
    $scope.cancelForm = function () {
        formModal.$promise.then(formModal.hide);
    	$timeout(function(){
            $scope.editingItem = null;
        	},800);        
    }
    $scope.saveForm = function (_close) {
        if (_close == undefined) _close = true;
        var changes = angular.getChanges($scope.editingItem, oldData, $scope.pkField);
        if (changes) {
            
            var act = (changes[$scope.pkField]) ? 'update' : 'add';
            if($scope._id_){
                if (changes['_id_']) {
            		act='update';
            	}else{
            		act='add';
            	}
            }
            var tm={};
            angular.forEach(changes, function (a, b) {
            	if(angular.isString(a)){
            		tm[b]=a.trim();
            	}else{
            		tm[b]=a;
            	}
            });
            changes = null;
            $scope.$saving = true;
            return Auth.post($scope.apiName + '/' + act, tm).success(function (data) {
                
                if (data.data && data.data[$scope.pkField]) {
                    if (act == 'add') {
                        $scope.tableParams.data.unshift(data.data); 
                        var n= parseInt($scope.tableParams.total());
                        $scope.tableParams.total(n+1);                        
                        if(!_close){
                        	$scope.editingItem = data.data;
                        };                        
                    } else {
                        var i = -1;
                        var n = $scope.tableParams.data.length;
                        var pk=data.data[$scope.pkField];
                        if(data.data['_id_']){
                        	pk=data.data['_id_'];
                        	delete data.data['_id_'];
                        }
                        for (var j = 0; j < n; j++) {
                            if ($scope.tableParams.data[j][$scope.pkField] == pk) {
                                angular.forEach(data.data, function (v, k) {
                                    if ($scope.tableParams.data[j][k] !== undefined) {
                                        $scope.tableParams.data[j][k] = v;
                                    }
                                });
                                break;
                            }

                        }
                    }
                }
      
                $scope.$saving = false;
                
                if(_close){
                	$timeout(function(){
                		$scope.editingItem = null;
                	},800);
                	formModal.$promise.then(formModal.hide);
                }
        
            }).error(function () {

                $scope.$saving = false;

            });
        } else {//nochanges
            $scope.$saving = false;
            if (_close) {
                $timeout(function () {
                    $scope.editingItem = null;
                }, 800);
                formModal.$promise.then(formModal.hide);
            }
        }
    }

    this.callEditItem=function(it){
    	if(it){
	    	$scope.$it=it;
	    	$scope.editItem();
    	}
    }    
    this.callRemoveItem=function(it){
    	if(it){
    		$scope.$it=it;
	    	$scope.doRemove();
    	}
    }
    this.callUpdateItem=function(it){
    	if(it){
	    	$scope.editingItem=it;
	    	$scope.saveForm(false);
    	}
    }
    
    $scope.doRemove = function (conf) {
        if ($scope.$it && $scope.$it[$scope.pkField]) {
            var d = {};
            var row = $scope.it;
            d[$scope.pkField] = $scope.$it[$scope.pkField];
            Auth.post($scope.apiName + '/delete/' + ((conf===true)?'1':''), d).success(function (data) {
            		if (data.data && data.confirm!==undefined){
            				if(data.confirm===true){
            					$scope.pleaseConfirmDelete($scope.doRemove);
            				}else{
            					$scope.pleaseConfirmDelete2($scope.doRemove);
            				}
            		}else if (data.data && data.data[$scope.pkField] == d[$scope.pkField]) {
                        var i = -1;
                        var n = $scope.tableParams.data.length;
                        for (var j = 0; j < n; j++) {
                            if ($scope.tableParams.data[j][$scope.pkField] == d[$scope.pkField]) {
                                i = j;
                                var n= parseInt($scope.tableParams.total());
                                $scope.tableParams.total(n-1);                                
                                break;
                            }
                        }
                        if (i >= 0) {
                            $scope.tableParams.data.splice(i, 1);
                        }
                        $scope.editingItem = null;
                    }
                    

            });
        }
    }
    $scope.confirm_delete=function(){
    	if(angular.isFunction($scope.pleaseConfirmDeleteHlr)){
    		$scope.pleaseConfirmDeleteHlr(true);
    		$scope.pleaseConfirmDeleteHlr=null;
    	}
    }
    $scope.pleaseConfirmDeleteHlr=null;
    $scope.pleaseConfirmDelete=function(hlr){
       
        if (!$scope._confirmPanel) {
            $scope._confirmPanel = $modal({ scope: $scope, title: '', backdrop: 'static', template: 'custom.confirm.delete.html', placement: "left", html: true, show: false });
        }
        $scope.pleaseConfirmDeleteHlr=hlr;
        $scope._confirmPanel.$promise.then($scope._confirmPanel.show);
    }
    $scope.pleaseConfirmDelete2=function(hlr){
        if (!$scope._confirmPanel) {
            $scope._confirmPanel = $modal({ scope: $scope, title: '', backdrop: 'static', template: 'custom.confirm.delete2.html', placement: "left", html: true, show: false });
        }
        $scope._confirmPanel.$promise.then($scope._confirmPanel.show);
    }    
    $scope.removeChecked = function () {
        if (!$scope.confirmPopover) {
            $scope.confirmPopover = $popover(angular.element('#checked-actions'), { scope: $scope, autoClose:true,trigger:'manual', template: "custom.confirm2.popover.html", show: false });
        }
        $scope.confirmPopover.$promise.then($scope.confirmPopover.show)

    }
    $scope.doRemoveChecked = function (conf) {
        var ids = [];
        angular.forEach($scope.checkboxes.items, function (v, k) {
            if (v) ids.push(k);
        });
       
        if (ids.length) {
            var d = {};
            d[$scope.pkField] = ids;
            Auth.post($scope.apiName + '/delete/' + ((conf)?'1':''), d).success(function (data) {
            		if(data && data.confirm!==undefined){
            			if(data.confirm===true){
            				$scope.pleaseConfirmDelete($scope.doRemoveChecked);
            			}else{
            				$scope.pleaseConfirmDelete2($scope.doRemoveChecked);
            			}
            			return;
            		}
                    if (angular.isArray(data.data[$scope.pkField])) {
                        var i = 0;
                        var n = data.data[$scope.pkField].length;
                        d = {};
                        for (i = 0; i < n; i++) {
                            d[data.data[$scope.pkField][i]] = true;
                        }
   
                        var idxs = [];
                        n=$scope.tableParams.data.length;
                        for (var j = 0; j < n; j++) {
                            if (d[$scope.tableParams.data[j][$scope.pkField]]) {
                                idxs.push(j);
                            }
                        }
                        if (idxs.length) {
                            for (i = idxs.length - 1; i >= 0; i--) {
                                $scope.tableParams.data.splice(idxs[i], 1);
                            }
                            var n= parseInt($scope.tableParams.total());
                            $scope.tableParams.total(n-idxs.length);
                        }
                        idxs = null;
                      
                    }
                    $scope.editingItem = null;

            });
        }
    }
    $scope.refresh = function () {
        $scope.tableParams.reload();
    }
    $scope.hasChecked = function () {
        return $scope.checkboxes.checked;
    }
    $scope.hasSelected = function () {
        if ($scope.$it) {
            var checked = 0, total = $scope.tableParams.data.length;
            for (var i = 0; i < total; i++) {
                var item = $scope.tableParams.data[i];
                if (item[$scope.pkField] == $scope.$it[$scope.pkField]) {
                    checked = 1;
                    return true;
                }
            }
        }
        return false;
    }
    $scope.isSelected = function (it) {
        return ($scope.$it == it);
    }
    $scope.selectAll = function () {
        if (angular.isDefined($scope.pkField)) {
            angular.forEach($scope.tableParams.data, function (item) {

                $scope.checkboxes.items[item[$scope.pkField]] = true;
            });
        }
    }
    $scope.selectNone = function () {
        if (angular.isDefined($scope.pkField)) {
            angular.forEach($scope.tableParams.data, function (item) {

                $scope.checkboxes.items[item[$scope.pkField]] = false;
            });
        }
    }
    $scope.selectInverse = function () {
        if (angular.isDefined($scope.pkField)) {
            angular.forEach($scope.tableParams.data, function (item) {

                $scope.checkboxes.items[item[$scope.pkField]] = !$scope.checkboxes.items[item[$scope.pkField]];
            });
        }
    }
    $scope.selectRow = function (it) {
        if ($scope.$it) $scope.$it.$selected = false;
        it.$selected = true;
        $scope.$it = it;
    }

    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 25,          // count per page
        sorting: {
            //name: 'asc'     // initial sorting
        }
    }, {
        total: 0,           // length of data
        getData: function ($defer, params) {
            
            if ($scope._first_) {
                delete $scope._first_;
                //return;
            }


            var p={
                filter: params.filter(),
                sorting:params.sorting(),
                count:params.count(),
                page:params.page()
            }


            // ajax request to api
            cfpLoadingBar.start();
            Auth.post($scope.apiName, p).success(function (data) {

                // update table params
                if(data.meta!==undefined){
                    $scope.TableMeta=data.meta;
                }else{
                    $scope.TableMeta=null;
                }
                params.total(data.total);
                params.page(data.page);
                // set new data
                $scope.startIdx = (data.page - 1) * params.count();
                   
                var keys = {};
                var sel = null;

                var n = data.data.length;
                var b=false;
                for (var i = 0; i < n; i++) {
                    var it = data.data[i];
                    keys[it[$scope.pkField]]=$scope.checkboxes.items[it[$scope.pkField]] || false;
                    b = b || keys[it[$scope.pkField]];
                    if ($scope.$it) {
                        if ($scope.$it[$scope.pkField] == it[$scope.pkField]) {
                            sel = it;
                        }
                    }
                }

                if ($scope.$it !== sel) {
                    $scope.$it=sel;
                }
                $scope.checkboxes.checked=b;
                $scope.checkboxes.items=keys;
                $defer.resolve(data.data);

                cfpLoadingBar.complete();
                $scope.tableParams.ready = true;
            

            });
        }
 
    });

    $scope.statusChecked=function(status){
        var ids = [];
        angular.forEach($scope.checkboxes.items, function (v, k) {
            if (v) ids.push(k);
        });
        if (ids.length) {
            var d = {};
            d[$scope.pkField] = ids;
            d['active']=status;
            Auth.post($scope.apiName + '/status', d).success(function (data) {
            	if(data && data.data) $scope.refresh();
            });
        }
    }
    $scope.checkboxes = { checked: false, items: {} };

    // watch for data checkboxes
    $scope.$watch('checkboxes.items', function (values) {

        if (!$scope.tableParams.data) {
            return;
        }

        var checked = 0, total = $scope.tableParams.data.length;
        for (var i = 0; i < total; i++) {
            var item = $scope.tableParams.data[i];
            if ($scope.checkboxes.items[item[$scope.pkField]]) {

                checked = 1;

                break;
            }

        }
        $scope.checkboxes.checked = (checked > 0);
    }, true);
    var popup = null;
    var cols = null;
    $scope.tableParams.setColumns = function (xcols, xdef) {
        $scope.tableParams.$columns = xcols;
        if (!cols) {
            var _l = $rootScope.fetchData($scope.tableParams.name());
            if (_l) xdef = _l;
            cols = _.map($scope.tableParams.$columns, function ($it,idx) {
                var old = $it.show;
                $it.show = function (it) {
                    if (it && cols[it.$index]) {
                        return cols[it.$index].show;
                    }
                    return old($it);
                }
                var b = true;
                if (xdef && xdef[idx] != undefined) {
                    b = xdef[idx];
                }
                return { title: $it.title(), show: b};
            });
        }
    }
    $scope.tableParams.isVisible = function (idx) {
        if (cols && cols[idx]) {
            return cols[idx].show;
        }
        return true;
    }
    var _md5str = '';
    $scope.tableParams.name = function () {
        if (!_md5str) {
            $str = ($state.current.name || '');
            $str += '_' + ($scope.apiName || '');
            _md5str = 'tb'+ md5($str);
        }
        return _md5str;
    }
    var _cols = null;
    $scope.tableParams.showMenu = function (event) {
        $scope.$columns=cols;
        popup = $popover(angular.element(event.target), { scope: $scope, container: 'body', autoClose: true, trigger: 'manual', placement: 'right', template: "custom.columns.menu.html", show: false });
        popup.$promise.then(popup.show);
        var hlr = $scope.$on('tooltip.hide', function () {
            hlr(); hlr = null;
            //save cols
            _cols = _.map(cols, function (it) {
                return it.show;
            });
            $rootScope.storeData($scope.tableParams.name(), _cols);
        }); 
    }

    $timeout(function () {
        $scope.setFilter(true);
    },100)
});
