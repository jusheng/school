'use strict';

angular.module('app')
	.controller('practiserankController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API) {
		
	   $scope.app_name = "班级测验成绩排名";
	   $scope.param={ };
	   $scope.loading=false;
} ]);