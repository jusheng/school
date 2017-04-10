'use strict';

angular.module('app')
	.controller('myteachingsController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster) {
		
		$scope.app_name = "我的评课";
	   	$scope.param={ }
		$scope.curr=0;

		

	   	$scope.set_curr = function(t){
		 	$scope.curr = t
	   }

	  
} ]);