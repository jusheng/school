'use strict';
angular.module('app')
	.controller('borrowController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','$compile',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,$compile) {
		
		$scope.app_name = "图书借阅管理";
		
 		$scope.selected = 1;
 		$scope.curr=-1;

	   	$scope.set_curr = function(t){
		 	$scope.selected = t
	   }

	   	$scope.$on("classupdate",function(){
	   		$scope.get_class();
	   	})


} ]);