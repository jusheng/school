'use strict';

angular.module('app')
	.controller('onlineController', [ '$rootScope', '$scope', '$http', '$state','$stateParams',
	                                function($rootScope, $scope, $http, $state,$stateParams) {
			
	        $scope.app_name = "在线交流"; 
	        $scope.p = $stateParams.p;  
	        console.log($stateParams.p);                    	

} ]);