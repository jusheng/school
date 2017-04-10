'use strict';

angular.module('app')
	.controller('scorerankController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API) {
		
	   $scope.app_name = "成绩排名";
	   $scope.param={ };
	   $scope.loading=false;

    

} ]);