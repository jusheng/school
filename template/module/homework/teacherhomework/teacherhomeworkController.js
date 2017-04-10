'use strict';

angular.module('app')
	.controller('teacherhomeworkController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {
	 $scope.app_name = "课后作业";  
	 $scope.menu = {
	        	"curr":2
	        }

	 $scope.set_curr = function(t){
	 	$scope.menu.curr = t;
	 }           

}])	                                	