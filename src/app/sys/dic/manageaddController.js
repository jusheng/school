'use strict';

angular.module('app')
	.controller('manageaddController', [ '$rootScope', '$scope', '$http', '$state','$stateParams',
	                                function($rootScope, $scope, $http, $state,$stateParams) {
	                              
	    $scope.id = $stateParams.id;
	    $scope.key = $stateParams.key; 
        $scope.name = $stateParams.name;
	    $scope.record = {
	    	"indexId":$stateParams.id,
	    	"key":$stateParams.key,
	    	"enable":1
	    }
		$scope.title = '添加字典项';
        $scope.param = { };
        $scope.loading = false;
        
		$scope.manage = function () {
	        //$scope.loading = true;
			$.ajax({
				url : '/dic/add',
				data: $scope.record
			}).then(function(result) {
				console.log(result);
		        $scope.loading = false;
				if (result.httpCode == 200) {
					//$scope.pageInfo = result.data;
					history.back(-1);
				} else {
					//$scope.msg = result.msg;
				}
				$scope.$apply();
			});
		}
		
} ]);