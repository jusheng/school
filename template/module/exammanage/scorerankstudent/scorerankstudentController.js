'use strict';

angular.module('app')
	.controller('scorerankstudentController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API) {
		
	   $scope.app_name = "年级考试成绩排名";
	   $scope.param={ };
	   $scope.loading=false;

} ]);