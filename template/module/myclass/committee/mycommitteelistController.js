'use strict';

angular.module('app')
	.controller('mycommitteelistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','toaster','$timeout','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,toaster,$timeout,API) {
	 	
	   $scope.app_name = "班委信息"; 	
	   $scope.param={
	   			//"classId":$state.params.classId==0?"":$state.params.classId
	   };

	   $scope.committee_list = function(){
	     	
	   		var success = function(result){
	   			console.log(result);
	   			$scope.pageInfo = result.data;
	   			$scope.$apply();
	   			console.log($scope.pageInfo);
	   			// alert(1);

	   		};
	   		
	   		var error = function(){

	   		}	

	   		API.post("/classes/cadre/read/cadreInfo", $scope.param,success,error);
	   } 

	   $scope.committee_list();


	   // 翻页
	    $scope.pagination = function (obj) {
	    	
	        $scope.param.pageNum=obj.page;
	        $scope.schoolteachers_list();
	    };

	}])                                	