'use strict';

angular.module('app')
	.controller('schooldeskController', ['$rootScope', '$scope', '$http', '$state','$compile','$timeout','ngDialog',
		function($rootScope, $scope, $http, $state,$compile,$timeout,ngDialog) {

			$scope.app_name = "校务管理";
		}])