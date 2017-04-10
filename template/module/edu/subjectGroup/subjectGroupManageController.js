'use strict';

angular.module('app')
	.controller('subjectGroupManageController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {
		
		$scope.app_name = "科目组管理";
} ]);