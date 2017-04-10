'use strict';

angular.module('app')
	.controller('examStudentController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API) {
		
		$scope.app_name = "年级考试图表";
	    $scope.param = {};

} ]);