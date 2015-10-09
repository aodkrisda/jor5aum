//this will load with function angular.lazyLoad('report.js')

module.controller('PrintReportCtrl', ['$scope', '$timeout', 'Auth', '$state', 'Lookups', '$rootScope', 'cfpLoadingBar', function ($scope, $timeout, Auth, $state, Lookups, $rootScope, cfpLoadingBar) {
    $scope.Lookups=Lookups;
    $scope.toGroupName=function(id){
    	var it=Lookups.getGroup(id);
    	if(it){
    		return it.name;
    	}
    	return id + '???';
    }

}])

