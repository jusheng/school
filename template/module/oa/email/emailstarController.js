'use strict';

angular.module('app')
	.controller('emailstarController', [ '$rootScope', '$scope', '$http', '$state',
	                                function($rootScope, $scope, $http, $state) {
		
	        $scope.title = "星标邮件";                        	
	        $scope.menu.curr = 4;  
} ]);