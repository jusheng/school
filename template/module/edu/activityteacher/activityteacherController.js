'use strict';

angular.module('app')
	.controller('activityteacherController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster) {
		
		$scope.app_name = "活动列表";
		$scope.sorts = {};
		// 分类列表
	   	$scope.get_class = function(){

	   		var success = function(result){
	   			$scope.sorts = result.data;

	   			$scope.$apply();
	   		};

	   		var error = function(){

	   		}	

	   		API.post("/scl/catalog/getListOfCatalog",{},success,error);

	   	}

	   	$scope.get_class();

	   	$scope.set_curr = function(t){
	   		console.log(t);
	   		if(t){
	   			$scope.curr = t
	   		}else{
	   			$scope.curr = 0;
	   		}
		 	
	   }

} ]);