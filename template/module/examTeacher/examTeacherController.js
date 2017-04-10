'use strict';

angular.module('app')
	.controller('examTeacherController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster) {
		
	   $scope.app_name = "班级测验日程安排";
	   $scope.param={ };
	   $scope.loading=false;

    //请求数据
	$scope.search=function(){

		var success = function(result){
			$scope.className = result.data;
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