'use strict';

angular.module('app')
	.controller('myclassController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API) {

	 $scope.app_name = "宿舍管理";                               	
	 $scope.curr = 0;

	 $scope.class_list = function(){

	   		var success = function(result){
	   			$scope.lists = result.data;
	   			// console.log($scope.lists);

	   			$scope.$apply();
	   			console.log($scope.lists);
	   		};
	   		
	   		var error = function(){

	   		}	

	   		API.post("/oa/addressbook/read/list/class",{ },success,error);
	   } 

	 $scope.class_list();
	 $scope.set_curr = function(t){
	 	$scope.curr = t;
	 }



}])
