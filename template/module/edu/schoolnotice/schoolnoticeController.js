'use strict';

angular.module('app')
	.controller('schoolnoticeController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
		$scope.app_name = "学校公告";
		

		  $scope.schoolnews_list = function(){

	   		var success = function(result){
	   			$scope.pageInfo = result.data;

	   			for (var i = $scope.pageInfo.list.length - 1; i >= 0; i--) {
	   				$scope.pageInfo.list[i].updateTime = $scope.pageInfo.list[i].updateTime.split(' ')[0];
	   			}

	   			$scope.$apply();
	   		};
	   		
	   		var error = function(){

	   		}	

	   		API.post("scl/affiche/getList",{"status":1},success,error);
	   } 

	   $scope.schoolnews_list();

	  

}])