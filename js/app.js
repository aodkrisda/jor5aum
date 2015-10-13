'use strict';



angular.module('App', ['lazyLoadJs', 'ui.router', 'angular-loading-bar', 'ngAnimate', 'mgcrea.ngStrap', 'ngTable', 'ngSanitize', 'custom.table', 'flow', 'angular-storage'])
.constant('API_URL','rest/api.php/v1/')
.factory('myHttpInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
    return {
        /*
         'response': function(response) {
             // do something on success
             return response;
         },
         */
        'responseError': function (rejection) {
            $rootScope.detectResponseError(rejection);
            return $q.reject(rejection);
        }
    };
}])


.run(['$rootScope', '$state', '$stateParams', 'Auth', '$filter', '$alert', 'store', 'Lookups', 'API_URL', function ($rootScope, $state, $stateParams, Auth, $filter, $alert, store, Lookups, API_URL) {
    $rootScope.API_URL = API_URL;
    var _StoreData = store.get('_StoreData') || {};
   
    var _today = new Date();
    $rootScope.today = function () {
        return $filter('date')(_today, 'yyyy-MM-dd');
    }
    $rootScope.storeData = function ($a, $b) {
        if ($b === null) {
            delete _StoreData[$a];
        } else {
            if (!_StoreData) _StoreData = {};
            _StoreData[$a] = $b;
        }
        store.set('_StoreData', _StoreData);
    }
    $rootScope.fetchData = function ($a) {
        if (_StoreData) {
            return _StoreData[$a];
        }
        return null;
    }

    $rootScope.detectResponseError = function (rejection) {
        if (rejection) {
            
            if (rejection.data && rejection.data.error && rejection.data.message) {
                if($state.current.name=='login') return;
                var b=(rejection.data.error2===true);
                if (b || (Auth.isLoggedIn() !== false)) {
                    var str = rejection.data.message;
                     $.notify('แจ้งเตือนความผิดพลาด : ' + str);
                }
            }
        }
    }
    $rootScope.countFile = function (it) {
        var n = 0;
        if (it) {
            if (it.file1) n++;
            if (it.file2) n++;
        }
        return n;
    }
    $rootScope.lookup_group = $filter('lookup_group');
    $rootScope.courtName = '';
    $rootScope.dropdown_reports=[

{
    "text": "สรุปรายงานคดีของศาล",
    "href": "#admin/report1"
  },
  {
    "divider": true
  },

                                 {
                                	    "text": "รายงานคดีของศาลที่จัดส่ง",
                                	    "href": "#admin/report2"
                                	  }                              	  
    ];

    $rootScope.isAdmin = function () {
        return Auth.isAdmin();
    }
    $rootScope.getUserId = function () {
        return Auth.getUserId();
    }
    $rootScope.getUser = function () {
        return Auth.getUser();
    }
    $rootScope.logOut = function () {
        Auth.post('logout', {}).success(function () {
            Auth.logOut();
            $state.go('login');
        })
    }
    $rootScope.urlEq = function (url) {
        return ($state.$current.url.source == url);
    }
    $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {

        var isLogin = (toState.name === "login");
        if (isLogin) {
            return; // no need to redirect 
        }

        // now, redirect only not authenticated
        var userInfo = Auth.isLoggedIn();

        if (userInfo === false) {
            e.preventDefault(); // stop current execution
            $state.go('login'); // go to login
        } else if (!Auth.canAccess(toState)) {
            e.preventDefault(); // stop current execution
        }
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        switch (fromState.name) {
            case 'admin.results':

                break;
        }
    });

    Auth.fetch();
    if (Auth.isLoggedIn) {
        Lookups.load();
    }
}])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$controllerProvider', 'storeProvider','flowFactoryProvider',
function ($stateProvider, $urlRouterProvider, $httpProvider, $controllerProvider, storeProvider, flowFactoryProvider) {
    flowFactoryProvider.defaults = {
        singleFile: true
    };
    storeProvider.setStore("sessionStorage");
        //$filterProvider
       // angular.configDynamic($controllerProvider);
	
        $httpProvider.interceptors.push('myHttpInterceptor');
        /////////////////////////////
        // Redirects and Otherwise //
        /////////////////////////////

        // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
        $urlRouterProvider

          // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
          .otherwise('/login');


        //////////////////////////
        // State Configurations //
        //////////////////////////

        // Use $stateProvider to configure your states.
        $stateProvider
          .state("admin", {
              // Use a url of "/" to set a state as the "index".
              url: "/admin",
              abstract:true,
              templateUrl:'views/admin.html'
          })
          .state("admin.cases", {
              url: "/cases",
              roles:['admin'],          
              views:{
                  '': {
                      templateUrl: 'views/admin_cases.html'
                  }
              }
          })
          .state("admin.cases.form1", {
              url: "/form1",
              roles: ['admin'],
              views: {
                  '': {
                      templateUrl: 'views/admin_cases_form1.html'
                  }
              }
          })
          .state("admin.cases.form2", {
              url: "/form2",
              roles: ['admin'],
              views: {
                  '': {
                      templateUrl: 'views/admin_cases_form2.html'
                  }
              }
          })
          .state("admin.cases.form3", {
              url: "/form3",
              roles: ['admin'],
              views: {
                  '': {
                      templateUrl: 'views/admin_cases_form3.html'
                  }
              }
          })

          .state("admin.report1", {
              url: "/report1",
              roles: ['admin'],
              onEnter:['Lookups',function(Lookups){
            	  Lookups.load();
              }],
              resolve:{dyn: function(){ return angular.loadJs('js/report.js')}},       
              views: {
                  '': {
                      templateUrl: 'views/admin_print_report1.html',
                      _controller: 'PrintReportCtrl'
                  }
              }
          })
          .state("admin.report2", {
              url: "/report2",
              roles: ['admin'],
              onEnter:['Lookups',function(Lookups){
            	  Lookups.load();
              }],                
              views: {
                  '': {
                      templateUrl: 'views/admin_print_report2.html'
                  }
              }
          })
          .state("admin.users", {
              url: "/users",
              roles: ['admin'],
              views:{
                  '': {
                      templateUrl: 'views/admin_users.html'
                  }}
          })
          .state("admin.types", {
              url: "/types",
              views:{
                  '': {
                      templateUrl: 'views/admin_types.html'
                  }}
          })
          .state("admin.topics", {
              url: "/topics",
              roles: ['admin'],
              views: {
                  '': {
                      templateUrl: 'views/admin_topics.html'
                  }
              }
          })
          .state("admin.results", {
              url: "/results",
              roles: ['admin'],
              views: {
                  '': {
                      templateUrl: 'views/admin_results.html'
                  }
              }
          })
          .state("admin.ats", {
              url: "/ats",
              roles: ['admin'],
              views: {
                  '': {
                      templateUrl: 'views/admin_ats.html'
                  }
              }
          })
          .state("court", {
              // Use a url of "/" to set a state as the "index".
              url: "/court",
              abstract: true,
              templateUrl: 'views/court.html'
          })
          .state("court.cases", {
              url: "/cases",
              roles: ['court'],
              onEnter: ['Lookups', function (Lookups) {
                  Lookups.load();
              }],
              views: {
                  '': {
                      templateUrl: 'views/court_cases.html'
                  }
              }

          })
          .state("court.cases.form1", {
              url: "/form1",
              roles: ['court'],
              views: {
                  '': {
                      templateUrl: 'views/court_cases_form1.html'
                  }
              }
          })
          .state("court.cases.form2", {
              url: "/form2",
              roles: ['court'],
              views: {
                  '': {
                      templateUrl: 'views/court_cases_form2.html'
                  }
              }
          })
          .state("court.cases.form3", {
              url: "/form3",
              roles: ['court'],
              views: {
                  '': {
                      templateUrl: 'views/court_cases_form3.html'
                  }
              }
          })
          .state("court.cases.form4", {
              url: "/form4",
              roles: ['court'],
              views: {
                  '': {
                      templateUrl: 'views/court_cases_form4.html'
                  }
              }
          })
          .state("court.users", {
              url: "/users",
              roles: ['court'],
              views: {
                  '': {
                      templateUrl: 'views/court_users.html'
                  }
              }
          })

          .state("login", {

              // Use a url of "/" to set a state as the "index".
              url: "/login",
              templateUrl: 'views/login.html'
          })


    }
])


.factory('Auth', ['$http', '$rootScope', '$alert', '$state', 'API_URL', 'store', function ($http, $rootScope, $alert, $state, API_URL, store) {
    var user;
    var token;
    var apiUrl =API_URL;

    var alert_sussess = null;
    function showMessage(str, title) {
        if (str || title) {
            if (!alert_sussess) {
                alert_sussess = $alert({ container: 'body', title: '', content: '', type: 'success', placement: 'top-right', duration: 5, show: false });
            }
            alert_sussess.$scope.content = str;
            alert_sussess.$scope.title = title;
            alert_sussess.$promise.then(alert_sussess.show);
        }
    }

    function logOut() {
        user = null;
        token = null;
    }

    return {
        showMessage: showMessage,
        logOut:logOut,

        setUser: function (aUser, aToken) {
            user = aUser;
            if (arguments.length > 1) {
                token = aToken;
            }
            if (user) {
                store.set('utoken', { user: user, token: token });
            } else {
                store.remove('utoken');
            }
            if (arguments.length > 1) {
                $state.go('login');
            }
        },
        fetch: function () {
            var tm = store.get('utoken');
            if (tm && tm.user && tm.user.id) {
                user = tm.user;
                token = tm.token;
            }
        },
        canAccess:function(toState){
            var role = ((user && user.id) ? user.admin : '');
            if (role == '1') { role = 'admin' } else if (role == '0') { role = 'court' } else if (role == '2' || role == '3') {role='judge'}
            if (toState && angular.isArray(toState.roles) && toState.roles.length) {
                return (toState.roles.indexOf(role) >= 0);
            }
            return true;
        },
        getUser: function () {
            return (user && user.id) ? user : null;
        },
        getUserId:function(){
            return (user && user.id) ? user.id : '';
        },
        isLoggedIn: function () {
            return (user && user.id) ? user : false;
        },

        isJudge2: function(){
            return (user && user.id && user.admin == 3);
        },

        isJudge: function(){
            return (user && user.id && user.admin == 2);
        },

        isAdmin: function(){
            return (user && user.id && user.admin==1);
        },

        isCourt: function () {
            return (user && user.id && user.admin == 0);
        },

        post: function (url, data, type) {
            return $http.post(apiUrl + url, data);
        }
    }
}])



.factory('Lookups', ['Auth', '_', '$rootScope', 'moment', '$filter', 'store', function (Auth, _, $rootScope, moment, $filter, store) {
    /*group, level, type, subject*/
    var lookups = {ownjudges:[],imprisons:[],  accepts:[], server_date: new Date(), courts: [], roles: [], topics:[], ats:[], results:[], groups: [] ,ugroups:[],years:[],judges:[], judges2:[]};
    lookups.months=_.map(moment.months(), function (v, idx) {
        return {id: String(idx+1), name: v};
    });
    lookups.shortMonths = _.map(moment.monthsShort(), function (v, idx) {
        return { id: String(idx+1), name: v };
    });
    function loadJudges(court_id) {
        return Auth.post('getjudges', {user_id:court_id || 0}).success(function (result) {
            if (result) {
                _.each(result.data, function (v, k) {
                    if (_.isArray(lookups[k])) {
                        v.unshift(0);
                        v.unshift(0);
                        lookups[k].length = 0;
                        lookups[k].splice.apply(lookups[k], v);
                    } else {
                        lookups[k] = v;
                    }
                })
             

            }
        });
    }
    function query() {
      
        return Auth.post('getlookups', {}).success(function (result) {
            if (result) {
                var user_id = Auth.getUserId();
              
                _.each(result.data, function (v, k) {
                    if (_.isArray(lookups[k])) {
                        v.unshift(0);
                        v.unshift(0);
                        lookups[k].length = 0;
                        lookups[k].splice.apply(lookups[k], v);
                    } else {
                        lookups[k] = v;
                    }
                })
                lookups.judges2.length = 0;
                lookups.ownjudges.length = 0;
                _.each(lookups.judges, function (it) {
                    if (it['admin'] > '1') {
                        if (it['parent_id'] == '1') {
                            lookups.judges2.push(it);
                        } else if(it['parent_id']==user_id){
                            lookups.ownjudges.push(it);
                        }
                    }
                });

                lookups.client_date = new moment();
                lookups.server_date = new moment(lookups.server_date || lookups.client_date);
                var y=lookups.server_date.year();
                var tm=_.map(_.range(10), function (v,idx){
                    return {id:String(y-idx), name: String(y - idx + 543)};
                });
                tm.unshift(0);
                tm.unshift(0);
                lookups.years.length = 0;
                lookups.years.splice.apply(lookups.years, tm);
                $rootScope.searchMonth = String(lookups.server_date.month() + 1);
                $rootScope.searchYear = String(lookups.server_date.year());
                if(lookups.courts.length) $rootScope.searchCourt = lookups.courts[0]['id'];
                $rootScope.courtName = (Auth.getUserId() == '1') ? '' : $filter('lookup_court')(Auth.getUserId());

                store.set('lookups', lookups);



            }
        });
    }

    return {
        load: query,
        getLookups:function(){
            return lookups
        },
        fetch: function () {
            var tm = store.get('lookups');
            if (tm) {
                angular.forEach(tm, function (v, k) { if (k in lookups) lookups[k] = v });
            }
        },
        loadJudges: loadJudges,
        getRole: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.roles, function (it) { return (it.id == id) });
            }
            return lookups.roles;
        },
        getCourt: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.courts, function (it) { return (it.id == id) });
            }
            return lookups.courts;
        },
        getJudge: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.judges, function (it) { return (it.id == id) });
            }
            return lookups.judges;
        },
        getJudge2: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.judges, function (it) { return (it.id == id) });
            }
            return lookups.judges2;
        },
        getOwnJudge: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.judges, function (it) { return (it.id == id) });
            }
            return lookups.ownjudges;
        },
        getGroup: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.groups, function (it) { return (it.id == id) });
            }
            return lookups.groups;
        },
        getUGroup: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.ugroups, function (it) { return (it.id == id) });
            }
            return lookups.ugroups;
        },
        getType: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.types, function (it) { return (it.id == id) });
            }
            return lookups.types;
        },
        getAt: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.ats, function (it) { return (it.id == id) });
            }
            return lookups.ats;
        },
        getImprison: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.imprisons, function (it) { return (it.id == id) });
            }
            return lookups.imprisons;
        },
        getAccpt: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.accepts, function (it) { return (it.id == id) });
            }
            return lookups.accepts;
        },
        getResult: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.results, function (it) { return (it.id == id) });
            }
            return lookups.results;
        },
        getTopic: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.topics, function (it) { return (it.id == id) });
            }
            return lookups.topics;
        },
        getTopicByType: function (id) {
            if (id !== undefined) {
                return _.filter(lookups.topics, function (it) { return (it.type_id == id) });
            }
            return lookups.topics;
        },
        getYear: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.years, function (it) { return (it.id == id) });
            }
            return lookups.years;
        },
        getMonth: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.months, function (it) { return (it.id == id) });
            }
            return lookups.months;
        },
        getShortMonth: function (id, fd) {
            if (id !== undefined) {
                if (!fd) fd = 'name';
                return _.find(lookups.shortMonths, function (it) { return (it.id == id) });
            }
            return lookups.shortMonths;
        }
    }
}])



.filter('lookup_role', ['Lookups', function (Lookups) {
    return function (id, fd) {
        var str = '';
        if (id !== undefined) {
            if (!fd) fd = 'name';
            var it = Lookups.getRole(id);
            if (it && (it[fd] !== undefined)) str = it[fd];
        }
        return str;
    }
}])

.filter('lookup_court', ['Lookups', function (Lookups) {
    return function (id, fd) {
        var str = '';
        if (id !== undefined) {
            if (!fd) fd = 'name';
            var it = Lookups.getCourt(id);
            if (it && (it[fd] !== undefined)) str = it[fd];
        }
        return str;
    }
}])
.filter('lookup_at', ['Lookups', function (Lookups) {
    return function (id, fd) {
        var str = '';
        if (id !== undefined) {
            if (!fd) fd = 'name';
            var it = Lookups.getAt(id);
            if (it && (it[fd] !== undefined)) str = it[fd];
        }
        return str;
    }
}])
.filter('lookup_judge', ['Lookups', function (Lookups) {
    return function (id, fd) {
        var str = '';
        if (id !== undefined) {
            if (!fd) fd = 'name';
            var it = Lookups.getJudge(id);
            if (it && (it[fd] !== undefined)) str = it[fd];
        }
        return str;
    }
}])

.filter('lookup_group', ['Lookups', function (Lookups) {
    return function (id, fd) {
        var str = '';
        if (id !== undefined) {
            if (!fd) fd = 'name';
            var it = Lookups.getGroup(id);
            if (it && (it[fd] !== undefined)) str = it[fd];
        }
        return str;
    }
}])

.filter('lookup_result', ['Lookups', function (Lookups) {
    return function (id, fd) {
        var str = '';
        if (id !== undefined) {
            if (!fd) fd = 'name';
            var it = Lookups.getResult(id);
            if (it && (it[fd] !== undefined)) str = it[fd];
        }
        return str;
    }
}])

.filter('lookup_topic', ['Lookups', function (Lookups) {
    return function (id, fd, lookuptype) {
        var str = '';
        if (id !== undefined) {
            if (!fd) fd = 'name';
            var it = Lookups.getTopic(id);
            if (it && (it[fd] !== undefined)) {
                if (lookuptype) {
                    if (it['type_id'] !== undefined) {
                        var it2 = Lookups.getType(it['type_id']);
                        if (it2 && (it2[fd] !== undefined)) {
                            str = it2[fd];
                        }
                    }
                } else {
                    str = it[fd];
                    if (it['code']) {
                        str = it['code'] + ' ' + str;
                    }
                }
            }
        }
        return str;
    }
}])

.filter('lookup_type', ['Lookups', function (Lookups) {
    return function (id, fd, lookgroup) {
        var str = '';
        if (id !== undefined) {
            if (!fd) fd = 'name';
            var it = Lookups.getType(id);
            if (it && (it[fd] !== undefined)) {
                if (lookgroup) {
                    if (it['group_id'] !== undefined) {
                        var it2 = Lookups.getGroup(it['group_id']);
                        if (it2 && (it2[fd] !== undefined)) {
                            str = it2[fd];
                        }
                    }
                } else {
                    str = it[fd];
                }
            }
        }
        return str;
    }
}])



.controller('AdminReportCtrl', ['$scope', '$rootScope','$timeout', 'Auth', '$state', 'Lookups', '$modal', '$popover','Lookups', '_',function ($scope,$rootScope, $timeout, Auth, $state, Lookups, $modal, $popover,$Lookups,_) {
    $scope.Lookups = Lookups;
    $scope.pkField = 'id';
    $scope.apiName = 'admin_cases';
    $scope.editItem = null;
    $scope.dropDownAdmin = [
        {
            text: "Login",
            href: '#/login',
            title: 'Log out'
        },
        {
            text: "Logout",
            href: '/api/auth/logout',
            title: 'Log out'
        }
    ];
    $scope.saveForm = function (item, idx) {
        if (item) {
            var d;
            if (idx == '3') {
                d = { id: '', result: '', judge2_id: '', judge3_id: '', date_received4: '', number_received4: '' };
            }else if (idx == '2') {
                d = { id: '', result: '', judge2_id: '', judge3_id: '', date_sent5: '', number_sent5: '', number_received3: '', date_received3: '' };
            }else{
                d = { id: '', result: '', command_id: '',  date_received4: '', number_received4: '',date_received:'',number_received:'' };
            }
            _.extendOwn(d, item);
            Auth.post($scope.apiName + '/update', d).success(function (data) {
                $scope.editingItem = null;
                $scope.goBack();
            });
        }
    }

    $scope.goBack = function () {
        $rootScope.storeData('admin_cases_id', null);
        $state.go('admin.cases')
    }

    $scope.go = function (a, b) {
        if (a && b) {
            var d = {};
            d[$scope.pkField] = b[$scope.pkField];
            $scope.editingItem = null;
            Auth.post($scope.apiName + '/get', d).success(function (data) {
                $scope.editingItem = data.data;
                $rootScope.storeData('admin_cases_id', b[$scope.pkField]);
                $state.go(a);
  
            });

        }
    }

    $scope.resultPopover = null;
    $scope.popupResult = function () {
        if (!$scope.resultPopover) {
            $scope.resultPopover = $popover(angular.element('#add-result'), { scope: $scope,container:'body', autoClose: true, trigger: 'manual', placement: 'auto bottom-left', template: "custom.result.popover.html", show: false });
        }
        $scope.resultPopover.$promise.then($scope.resultPopover.show);
    }
    $scope.addResult = function (it) {
        if (it && it.name) {
            Auth.post('results/add', it).success(function (data) {
                Lookups.getResult().push(data.data);
                $scope.resultPopover.$promise.then($scope.resultPopover.hide);
            });
        }
    }

    $scope.commandPopover = null;
    $scope.popupCommand = function () {
        if (!$scope.commandPopover) {
            $scope.commandPopover = $popover(angular.element('#add-command'), { scope: $scope,container:'body', autoClose: true, placement: 'auto bottom-left', trigger: 'manual', template: "custom.command.popover.html", show: false });
        }
        $scope.commandPopover.$promise.then($scope.commandPopover.show);
    }

    $scope.addCommand = function (it) {
        if (it && it.name) {
            Auth.post('ats/add', it).success(function (data) {
                Lookups.getAt().push(data.data);
                $scope.commandPopover.$promise.then($scope.commandPopover.hide);
            });
        }
    }

    $scope.judgePopover = null;
    $scope.popupJudge = function () {
        if (!$scope.judgePopover) {
            $scope.judgePopover = $popover(angular.element('#add-judge'), { scope: $scope, container: 'body', autoClose: true, placement: 'auto bottom-left', trigger: 'manual', template: "custom.judge.popover.html", show: false });
        }
        $scope.judgePopover.$promise.then($scope.judgePopover.show);
    }

    $scope.addJudge = function (it) {
        if (it && it.name) {
            Auth.post('judges/add', it).success(function (data) {
                Lookups.getJudge2().push(data.data);
                $scope.judgePopover.$promise.then($scope.judgePopover.hide);
            });
        }
    }
    var str = $state.current.name;
    var n = $rootScope.fetchData('admin_cases_id');
    if (n) {
        if (str.indexOf('admin.cases.form') == 0) {
            var d = {};
            d[$scope.pkField] = n;
            $scope.go(str, d);
        }
    }

}])


.controller('CourtReportCtrl', ['$scope', '$rootScope', '$timeout', 'Auth', '$state', 'Lookups', '$modal', '$popover', 'Lookups', '_', function ($scope, $rootScope, $timeout, Auth, $state, Lookups, $modal, $popover, $Lookups, _) {
    $scope.Lookups = Lookups;
    $scope.pkField = 'id';
    $scope.apiName = 'court_cases';
    $scope.editItem = null;
    $scope.getFileTitle = function (f) {
        if (f && f.name && f.size) {
            return f.name + ' (' + $filter('number')(f.size / 1024, 1) + ' KB)'
        }
        return '';
    }
    $scope.saveForm = function (item, idx) {
        if (item) {
            var d;
            if (idx == '3') {
                d = { id: '', result: '', judge2_id: '', judge3_id: '', date_received4: '', number_received4: '' };
            } else if (idx == '2') {
                d = { id: '', result: '', judge2_id: '', judge3_id: '', date_sent5: '', number_sent5: '', number_received3: '', date_received3: '' };
            } else {
                d = { id: '', result: '', command_id: '', date_received4: '', number_received4: '', date_received: '', number_received: '' };
            }
            _.extendOwn(d, item);
            Auth.post($scope.apiName + '/update', d).success(function (data) {
                $scope.editingItem = null;
                $scope.goBack();
            });
        }
    }

    $scope.goBack = function () {
        $rootScope.storeData('court_cases_id', null);
        $state.go('court.cases')
    }
    var _reRead = [];
    $scope.go = function (a, b) {
        if (a && b) {
            var d = {};
            d[$scope.pkField] = b[$scope.pkField];
            $scope.editingItem = null;
            Auth.post($scope.apiName + '/get', d).success(function (data) {
                _reRead = null;
                _reRead = [a,b];
                $scope.editingItem = data.data;
                $rootScope.storeData('court_cases_id', b[$scope.pkField]);
                $state.go(a);

            });

        }
    }
    $scope.$fetch = function () {
        if (_reRead.length==2) {
            $scope.go(_reRead[0], _reRead[1]);
        }
    }
    
    $scope.resultPopover = null;
    $scope.popupResult = function () {
        if (!$scope.resultPopover) {
            $scope.resultPopover = $popover(angular.element('#add-result'), { scope: $scope, container: 'body', autoClose: true, trigger: 'manual', placement: 'auto bottom-left', template: "custom.result.popover.html", show: false });
        }
        $scope.resultPopover.$promise.then($scope.resultPopover.show);
    }
    $scope.addResult = function (it) {
        if (it && it.name) {
            Auth.post('results/add', it).success(function (data) {
                Lookups.getResult().push(data.data);
                $scope.resultPopover.$promise.then($scope.resultPopover.hide);
            });
        }
    }

    $scope.commandPopover = null;
    $scope.popupCommand = function () {
        if (!$scope.commandPopover) {
            $scope.commandPopover = $popover(angular.element('#add-command'), { scope: $scope, container: 'body', autoClose: true, placement: 'auto bottom-left', trigger: 'manual', template: "custom.command.popover.html", show: false });
        }
        $scope.commandPopover.$promise.then($scope.commandPopover.show);
    }

    $scope.addCommand = function (it) {
        if (it && it.name) {
            Auth.post('ats/add', it).success(function (data) {
                Lookups.getAt().push(data.data);
                $scope.commandPopover.$promise.then($scope.commandPopover.hide);
            });
        }
    }

    $scope.imprisonPopover = null;
    $scope.popupImprison = function () {
        if (!$scope.imprisonPopover) {
            $scope.imprisonPopover = $popover(angular.element('#add-imprison'), { scope: $scope, container: 'body', autoClose: true, placement: 'auto bottom-left', trigger: 'manual', template: "custom.imprison.popover.html", show: false });
        }
        $scope.imprisonPopover.$promise.then($scope.imprisonPopover.show);
    }

    $scope.addImprison = function (it) {
        if (it && it.name) {
            Auth.post('imprisons/add', it).success(function (data) {
                Lookups.getImprison().push(data.data);
                $scope.imprisonPopover.$promise.then($scope.imprisonPopover.hide);
            });
        }
    }
    $scope.acceptPopover = null;
    $scope.popupAccept = function () {
        if (!$scope.acceptPopover) {
            $scope.acceptPopover = $popover(angular.element('#add-accept'), { scope: $scope, container: 'body', autoClose: true, placement: 'auto bottom-left', trigger: 'manual', template: "custom.accept.popover.html", show: false });
        }
        $scope.acceptPopover.$promise.then($scope.acceptPopover.show);
    }

    $scope.addAccept = function (it) {
        if (it && it.name) {
            Auth.post('accepts/add', it).success(function (data) {
                Lookups.getAccept().push(data.data);
                $scope.acceptPopover.$promise.then($scope.acceptPopover.hide);
            });
        }
    }
    $scope.judgePopover = null;
    $scope.popupJudge = function () {
        if (!$scope.judgePopover) {
            $scope.judgePopover = $popover(angular.element('#add-judge'), { scope: $scope, container: 'body', autoClose: true, placement: 'auto bottom-left', trigger: 'manual', template: "custom.judge.popover.html", show: false });
        }
        $scope.judgePopover.$promise.then($scope.judgePopover.show);
    }

    $scope.addJudge = function (it) {
        if (it && it.name) {
            it.parent_id = Auth.getUserId();
            Auth.post('judges/add', it).success(function (data) {
                Lookups.getOwnJudge().push(data.data);
                Lookups.getJudge().push(data.data);
                $scope.judgePopover.$promise.then($scope.judgePopover.hide);
            });
        }
    }
    var str = $state.current.name;
    var n = $rootScope.fetchData('court_cases_id');
    if (n) {
        if (str.indexOf('court.cases.form') == 0) {
            var d = {};
            d[$scope.pkField]=n;
            $scope.go(str, d);
        }
    }
}])
.controller('LoginCtrl', ['$scope', '$timeout', 'Auth', '$state', 'Lookups', '$rootScope', 'cfpLoadingBar', function ($scope, $timeout, Auth, $state, Lookups, $rootScope, cfpLoadingBar) {
    $scope.userid = '';
    $scope.password = '';
    $scope.alert = false;
    $scope.errorMesssage = '';
    $scope.checking = false;
  
    $scope.show = function () {
        if (!$scope.alert) {
            $scope.alert = true;
            if ($scope._timeout) $timeout.cancel($scope._timeout);
            $scope._timeout=$timeout($scope.hide, 3000);
        }
        $scope.checking = false;
    }

    $scope.hide = function () {
        if ($scope.alert) {
            $scope.alert = false;
            delete $scope._timeout;
        }
       
    } 


    $scope.login = function () {
        if ($scope.userid && $scope.password) {
            $scope.hide();
            var btn = $('#login-button:first');
     
          
            $scope.checking = true;
            Auth.post('login', { user_number: $scope.userid, password: $scope.password }).success(function (result) {
                    $scope.checking = false;
                    Auth.setUser(result.data.user, result.data.api_key);
                    cfpLoadingBar.start();
                    Lookups.load().success(function () {
                        cfpLoadingBar.complete();
                        if ($rootScope.isAdmin()) {
                            $state.go('admin.cases');
                        }else{
                            $state.go('court.cases');
                        }
                    });
            }).error(function (result) {
                var str = '';
                if (result.error && result.message) {
                    str = result.message;

                } else {
                    str = 'ขออภัยเกิดความขัดข้อง ไม่สามารถเชื่อต่อกับ API ได้';
                }

                $scope.checking = false;
                $scope.errorMessage = str;
                if(str) $scope.show();

            })
        }

    }
}])
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})
.directive('selectValueType', ['$filter', '$timeout', function ($filter, $timeout) {
    /* can't use with track by ...*/
    return {
        restrict: 'A',
        replace: false,
        require: '?ngModel',
        link: function (scope, element, attr, ngModel) {
            if (ngModel) {
                var type = (attr.selectValueType || '').toLowerCase();
                if (type == 'number' || type == 'string') {                 
                    $timeout(function () {
                        if (ngModel.$modelValue != undefined) {
                            if ((type == 'number') && (!angular.isNumber(ngModel.$modelValue))) {
                                ngModel.$setViewValue(Number(ngModel.$modelValue));
                            } else if ((type == 'string') && (!angular.isString(ngModel.$modelValue))) {
                                ngModel.$setViewValue(String(ngModel.$modelValue));
                            }
                        }
                    }, 0);
                }
            }
        }
    }
}])
.directive('validateFile', function () {

    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            if (ctrl) {
                var maxsize = 1012 * 1024;
                var EXT_REGEXP = /\.(xls|xlsx)$/i;
                ctrl.$validators.filesize = function (modelValue) {
                    if (modelValue && modelValue.size) {
                        return (modelValue.size <= maxsize);
                    }
                    return false;
                }
                ctrl.$validators.filetype = function (modelValue) {
                    if (modelValue && modelValue.name) {
                        return modelValue.name && EXT_REGEXP.test(modelValue.name);
                    }
                    return false;
                }
                elm.bind('change', function () {
                    if (elm[0].files && elm[0].files.length) {

                        ctrl.$setViewValue(elm[0].files[0]);
                    } else {
                        ctrl.$setViewValue(null);
                    }
                });
            }
        }
    };
})
.controller('FlowUploadCtrl', ['$scope', '$modal', '$timeout', 'Auth', '$state', 'Lookups', function ($scope, $modal, $timeout, Auth, $state, Lookups) {

    var MAXSIZE = 1024 * 1014 * 10;
    this.linkScope = function (s) {
        $scope._scope = s;
    }

    $scope._flowState = 0;
    this.setFlowState = function (i) {
        $scope._flowState = i;
    }
    this.getFlowState = function () {
        return $scope._flowState;
    }
    this.getFlow = function () {
        return $scope._flow;
    }
    this.setFlow = function (flow, $file) {
        $scope._flow = flow;
        var ret = true;
        if ($file) {
            ret=($file.size > 0) && ($file.size < MAXSIZE);
            if (ret) {
                $scope._flowState = 1;
            } else {
                $scope._flowState = 0;
                alert('ไม่สามารถเลือกไฟล์ ที่ไม่มีข้อมูล หรือ ไฟล์ที่ใหญ่เกิน 10M');
            }
        }
        
        return ret;
    }
    this.checkFlow = function () {
        if ($scope._flow) {
            var er = false;
            if ($scope._flow.files) {
                for (var i = 0; i < $scope._flow.files.length; i++) {
                    if ($scope._flow.files[i].error) {
                        er = true;
                        break;
                    }
                }
            }
            if (er) {
                $scope._flowState = -1;
            } else {
                $scope._flowState = 0;
                $timeout(function () {
                    if ( $scope._flow.files[0].response) {
                        
						    $scope._flow.cancel();
						    $.notify('อัพโหลดเสร็จแล้ว', 'success');
						    $scope.$parent.$fetch();
                    }
                },100);
            }
        }
    }
    this.retry = function () {
        if ($scope._flow) {
            if ($scope._flowState == -1) {
                if ($scope._flow.files) {
                    for (var i = 0; i < $scope._flow.files.length; i++) {
                        if ($scope._flow.files[i].error) {
                            $scope._flow.files[i].retry();
                            $scope._flowState = 2;
                        }
                    }
                }
            } else {
                $scope._flow.resume();
            }
        }
    }
    this.getScope = function () {
        return $scope;
    }
    $scope.uploadFlow = function (fl) {
        $scope.$xflow = fl;
        $scope.$xflow.upload();

    }

}])


