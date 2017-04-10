'use strict';

angular.module('app')
	.controller('rulesController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API) {

    $scope.app_name = "学校宿舍管理"; 
	        $scope.curr = 0;
	       

	$scope.set_curr = function(t){
		 	$scope.selected = t
	}
       
                    
}])                                	