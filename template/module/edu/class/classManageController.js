'use strict';

angular.module('app')
	.controller('classManageController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {
		
		$scope.app_name = "班级管理";
} ]);