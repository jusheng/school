'use strict';

angular.module('app')
	.controller('resourceController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog) {
		
	$scope.app_name = "资源管理";                                	
} ]);