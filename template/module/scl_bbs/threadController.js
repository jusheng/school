'use strict';

angular.module('app')
	.controller('threadController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster) {
		
		$scope.app_name = "论坛管理";
	   	$scope.param={ }
		$scope.curr=0;

		// 分类列表
	   	$scope.get_class = function(){

	   		var success = function(result){
	   			$scope.sorts = result.data;

	   			$scope.$apply();
	   		};

	   		var error = function(){

	   		}	

	   		API.post("/scl/bbs/plate/read/list",{},success,error);

	   	}

	   	$scope.get_class();

	   	$scope.$on("sectionchage",function(ev,msg){
	   		$scope.get_class();

	   	})
	   	$scope.set_curr = function(t){
		 	$scope.curr = t
	   }

	   	// 排名
	   

	   $scope.list_byviews = function(){

	   		var success = function(result){
	   			$scope.views = result.data;

	   			$scope.$apply();
	   		};

	   		var error = function(){

	   		}	

	   		API.post("/scl/news/read/list",{},success,error);
	   } 

	   $scope.list_byviews();
} ]);