'use strict';

angular.module('app')
	.controller('onlinehomeworkController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {

	

	 $scope.app_name = "在线作业";  
	 $scope.menu = {
	        	"curr":2
	        }

	 $scope.set_curr = function(t){
	 	$scope.menu.curr = t;
	 }                                          	

}])