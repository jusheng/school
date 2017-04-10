'use strict';

angular.module('app')
	.controller('coursebookstudentController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API) {
		
		$scope.app_name = "课程表";
	   $scope.param={ };
	   $scope.loading=false;

} ]);