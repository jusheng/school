'use strict';

angular.module('app')
	.controller('practisescoreController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API) {
		
		$scope.app_name = "考试成绩";
	    $scope.param = {};
    //请求数据
	$scope.search=function(){
	
		var success = function(result){
			$scope.classNameList = result.data;
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
	
		API.post('/oa/addressbook/read/list/class',$scope.param,success,error);

	}
	$scope.search();
	$scope.set_curr = function(t){
	 	$scope.curr = t
	 }

} ]);