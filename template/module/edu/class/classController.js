'use strict';

angular.module('app')
	.controller('classController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {
		
		$scope.app_name = "班级管理";
		$scope.param = {orderBy:"g.sort_no"}
		//请求数据
	$scope.search=function(){

		var success = function(result){
			$scope.List = result.data;
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
		API.post('/grade/read/all',$scope.param,success,error);

	}
	$scope.search();

	 $scope.set_curr = function(t){
	 	$scope.curr = t
	 }
} ]);