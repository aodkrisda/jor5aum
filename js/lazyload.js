//requir (unjerscore.js, moment.js)
//lazy load
/*
	jsfile.js  (module, angular)
	====
	module.controller('NewCtrl', ['$scope', function($scope){
		//your code...
	}]
	

	usage:  angular.loadJs(jsfile, moduleName)
	====
	angular.loadScript('jsfile.js').then(function(){
		//completed
		
	})
	
	stateProvider.....
		{
			resolve:{require:function(){angular.loadJs(''test.js)}}
		}
*/

		
(function(){

	if(!angular) return;
	/*
	usage: 
		var f=parseJs(''lert(msg)');
		f({msg:'Hellow World'});
	*/
	var parseJs=function(script){
		var fn=null;
		var err;
		if(script){
			try{
				var preset='with(locals || {}){\n' + script + '\n}';
				fn=new Function('locals', preset);
				preset=null;
			}catch(err){
				console.error('parseJs Error:')
				console.error(err);
				console.info('----\n',script,'\n----');
			}
		}
		return fn;
	}
	
	var evalJs=function(script, locals){
		return (function (_script_, _locals_){
			if(_script_){
				var err;
				if(_locals_){
					this._locals={};
					for(var _k in _locals_) {
						try{
							this._locals[_k]=_locals_[_k];
							eval('var '+ _k +'=this._locals.'+_k);
						}catch(err){}
					}
					this._locals=null;
				}
				try{
					eval(_script_);
					return true;
				}catch(err){
					console.error('evalJs() Error  >>')
					console.error(err);
					console.error('-----');
					console.error(_script_);
					console.error('-----');
				}
			}
			return false;
		})(script, locals);
	};

	
    angular.module('lazyLoadJs', ['ng'])
        // Declare app level module which depends on views, and components
        .factory('_', ['$window', function ($window) {
            return $window._;
        }])

        .factory('moment', ['$window', function ($window) {
            return $window.moment;
        }])
        .directive('customDateField', ['$filter', '$timeout', '_', 'moment', function ($filter, $timeout, _, moment) {
            return {
                restrict: 'CEA',
                replace: false,
                require: '?ngModel',
                scope: { xmodel: '@dataModel', startDate: '=', endDate: '=', mode: "@", placeholder: "@", weekDaysOnly: "@" },

                template: '<div class="input-group date"><input  type="text" placeholder="{{placeholder}}" class="form-control date"><span class="input-group-addon" ><i class="glyphicon glyphicon-calendar"></i></span></div>',
                link: function (scope, element, attr, ngModel) {
                    var _mode = parseInt(scope.mode || 0);
                    var _startMode = 0;
                    var _minMode = 0;
                    var fstr = '';
                    if (scope.mode == 2) {
                        fstr = "yyyy";
                        _startMode = 2;
                        _minMode = 2;
                    } else if (scope.mode == 1) {
                        fstr = "MM yyyy";
                        _startMode = 1;
                        _minMode = 1;
                    } else {
                        fstr = "d MM yyyy";
                        _startMode = 0;
                        _minMode = 0;
                        scope.mode = 0;
                    }
                    var opt = {
                        format: fstr,
                        todayBtn: "linked",
                        startView: _startMode,
                        minViewMode: _minMode,
                        orientation: "top left",
                        clearBtn: true,
                        language: "th",
                        disableTouchKeyboard:false,
                        keyboardNavigation: true,
                        autoclose: true,
                        daysOfWeekDisabled: [0, 6],
                        todayHighlight: false,
                        toggleActive: true,
                        forceParse: false
                    };
                    if (scope.weekDaysOnly) {
                        opt.daysOfWeekDisabled = "0,6";
                    }

                    var thfun = $filter('thai_date');
           
                    var textInput = element.find('input:first');
                    var element2 = element.find('.input-group.date:first');
                    var trotle = _.debounce(function () {
                        if (ngModel) {

                            var dt = element2.datepicker('getDate');
                            var v = '';
                            if (dt) {
                                if (scope.mode == 1 || scope.mode == 2) {
                                    if (dt.getDate() != 1) {
                                        dt.setDate(1);

                                        element2.datepicker('setDate', dt);

                                    }
                                }
                                v = $filter('date')(dt, 'yyyy-MM-dd');
                            }

                            if (ngModel.$viewValue != v) {
                                ngModel.$setViewValue(v, false);
                                ngModel.$render();
                            };
                        }
                    }, 1)


                    element2.datepicker(opt)
                    .on('show', function (e) {
                        if (ngModel.$modelValue) {
                            if (moment(ngModel.$modelValue).isValid()) {
                                var dt = new Date(ngModel.$modelValue);
                                element2.datepicker('setDate', dt);
                                element2.datepicker('update');
                                if (dt) {
                                    textInput.val(thfun(dt, scope.mode));
                                } else {
                                    textInput.val('');
                                }
                            }
                        }
                    })
                    .on('changeDate', trotle);

                    if (ngModel) {
                        $timeout(function () {
                            ngModel.$render = function () {
                                var dt = null;
                                if (moment(ngModel.$modelValue).isValid()) {
                                    dt = new Date(ngModel.$modelValue);
                                }
                                element2.datepicker('setDate', dt);
                                if (dt) {
                                    textInput.val(thfun(dt, scope.mode));
                                } else {
                                    textInput.val('');
                                }
                            }
                            if (ngModel.$modelValue) {
                                ngModel.$render();
                            }
                        }, 10);
                    }
                    
                    textInput.keydown(function (e) {
                       e.preventDefault();
                       e.stopImmediatePropagation();
                       /*

                        if (moment(ngModel.$modelValue).isValid()) {
                            var dt = new Date(ngModel.$modelValue);
                            if (dt) {
                                textInput.val(thfun(dt, scope.mode));
                            } else {
                                textInput.val('');
                            }
                            dt = null;
                        }
                        */
                    })

                    var v = null;
                    if (scope.startDate) {
                        v = new Date(scope.startDate);
                    }
                    element2.datepicker('setStartDate', v);
                    v = null;
                    if (scope.endDate) {
                        v = new Date(scope.endDate);
                    }
                    element2.datepicker('setEndDate', v);

                }
            }
        }])
        .filter('iif', [function () {
            return function(v, eq, tstr, fstr){
                if(v==eq){
                    if(tstr===undefined)tstr='true';
                    return tstr;
                }
                if(fstr==undefined)fstr='false';
                return fstr;
            }
        }])
        .filter('thai_date', ['moment', function (moment) {
            var INC_YEAR = 543;
            return function (dt, format) {

                var str = '';
                if (dt) {

                    var d = new moment(dt);
                    if (d && d.isValid()) {
                        if (format == undefined) format = '';//'D MMMM ';
                        var skip = 0;
                        switch (String(format).toLowerCase()) {
                            case '':
                            case '0':
                            case 'day':
                            case 'days':
                                format = 'D MMMM ';
                                break;
                            case '1':
                            case 'month':
                            case 'months':
                                format = 'MMMM ';
                                break;
                            case '2':
                            case 'year':
                            case 'years':
                                format = '';
                                break;
                            case 'short':
                                format = 'D MMM ';
                                break;
                            case 'fromnow':
                                str = d.fromNow();
                                skip = 1;
                                break;
                            case 'tonow':
                                str = d.toNow();
                                skip = 1;
                                break;
                            case 'calendar':
                                str = d.calendar();
                                skip = 1;
                                break;
                            default:
                                skip = 2;
                                break;
                        }
                        if (skip) {
                            if (skip == 2) {
                                if (format) str = d.format(format);
                            }
                        } else {
                            if (format) str = d.format(format);
                            str = str + (d.year() + 543).toString();
                        }
                        if (str) {
                            str = str.replace('เวลา 0 นาฬิกา 0 นาที', '');
                            str = str.replace('0 นาฬิกา', '');
                            str = str.replace('0 นาที', '');
                            if ((/^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}$/).test(str)) {
                                format = 'D MMMM ';
                                if (format) str = d.format(format);
                                str = str + (d.year() + INC_YEAR).toString();
                            }
                        }
                        d = null;
                    }

                }
                return str;
            }
        }])
        .config(['$controllerProvider', '$injector', function ($controllerProvider, $injector) {
		'use strict';
		var $http=null;
		var $q=null;
		var $cache={};
		var module={};
		var _utils={};
		if(!angular.get){
			var container=function(){
				this.get=function(key){
					if(key && (key in _utils)){
						return _utils[key];
					}
					if(angular.isString(key) && _utils['$injector']){
						var inj=_utils['$injector'];
						if(angular.isFunction(inj.get)){
							var e;
							try{
								if(inj.has(key)){
									return inj.get(key);
								}
							}catch(e){}
						}
					}
					return void(0);
				}
				this.set=function(key, val){
					if(key){
						_utils[key]=val;
					}
				}
				this.has=function(key){
					return (key && (key in _utils));
				}
				this.remove=function(key){
					if(key && (key in _utils)){
						delete _utils[key];
					}
				}
				this.keys=function(){
					return Object.keys(_utils);
				}			
			}

			angular.utils=new container();
			angular.utils.set('evalJs', evalJs);
			angular.utils.set('parseJs', parseJs);
		}
		
		var config=function(){
		    //config lazy load
		   
			try{
			    module.controller = function () {
			        var args = Array.prototype.slice.call(arguments);
			        $injector.get('$controllerProvider').register.apply(null,args);
			        return module;
			    };
			    module.directive = function () {
			        var args = Array.prototype.slice.call(arguments);
			        $injector.get('$compileProvider').directive.apply(null, args);
			        return module;
			    };
			    module.filter = function () {
			        var args = Array.prototype.slice.call(arguments);
			        $injector.get('$filterProvider').register.apply(null, args);
			        return module;
			    };
			    module.factory = function () {
			        var args = Array.prototype.slice.call(arguments);
			        $injector.get('$provide').factory.apply(null, args);
			        return module;
			    };
			    module.service = function () {
			        var args = Array.prototype.slice.call(arguments);
			        $injector.get('$provide').service.apply(null, args);
			        return module;
			    };
	
			    module.state = function () {
			        var e;
			        try{
			            var args = Array.prototype.slice.call(arguments)
			            $injector.get('$stateProvider').state.apply(null, args);
			        } catch (e) {
			            console.error(e.toString());
			        }
			        return module;
			    };

				var $injector2=angular.injector(['ng']);
				$http=$injector2.get('$http');
				$q=$injector2.get('$q');
				config=null;
			}catch(e){}
		}
		
		var lazyLoad=function(src){
			if(config){
				config();
			}    
			if(src && $http){
				var err;
				if(src){
					try{
						if(angular.isArray(src)){
							var qs=[];
							angular.forEach(src, function(v){
								if(v && angular.isString(v)){
									qs.push(angular.loadScript(v,moduleName)); 
								}
							})
							if(qs.length>0) return $q.all(qs);
							return false;
						}
						
						if(!angular.isString(src)){
							return false;
						}
						
						if($cache[src]) {
							return src;
						}
						
						return $http.get(src).success(function(s){
							try{
								$cache[src]=true;
								var fn=new Function('module', 'angular', s);
								fn(module, angular);
							}catch(err){
								console.error('dynamic script parser error : ' + src);
							}
						}).error(function(){
							console.error('dynamic script load error : ' + src);
						}).then(function(){return src});
						
					}catch(err){
						console.error('you can not load dynamic script:', src);
					}
				}
			}
			return false;
		}
		
		if(!angular.loadJs){
			angular.loadJs=lazyLoad;
			angular.utils.set('loadJs', lazyLoad);
			angular.element('document').ready(function(){
				if(config){
					config();
				}
			})
		}
	}])

	.run(['$rootElement','$injector', function($rootElement, $injector){
		'use strict';
		if(angular.utils){
			angular.utils.set('main', $rootElement.attr('ng-app') || '');
			angular.utils.set('$injector', $injector);
			angular.utils.set('$rootElement', $rootElement);
			
		}
	}])

})(angular);

