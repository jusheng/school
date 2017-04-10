'use strict';

angular.module('app')
	.controller('editController', [ '$rootScope', '$scope', '$http', '$state','$stateParams',
	                                function($rootScope, $scope, $http, $state,$stateParams) {
	                              
	    $scope.id = $stateParams.id;
	    $scope.key = $stateParams.key; 
	    $scope.cid = $stateParams.cid;

        $scope.name = $stateParams.name;
        $scope.record = {
	    	"indexId":$stateParams.id,
	    	"key":$stateParams.key,
	    	"enable":1,
	    	"id":$scope.cid

	    }
		$scope.search = function () {
	        $scope.loading = true;
			$.ajax({
				url : '/dic/read/detail',
				data: {id:$scope.cid}
			}).then(function(result) {
				console.log(result);
		        $scope.loading = false;
				if (result.httpCode == 200) {
					$scope.pageInfo = result.data;
					$scope.record.codeText = result.data.codeText;
					$scope.record.code = result.data.code;
					$scope.record.sortNo = result.data.sortNo;	
				} else {
					$scope.msg = result.msg;
				}
				$scope.$apply();
			});
		}

		$scope.search();
		
		$scope.title = '编辑字典项';
        $scope.param = { };
        $scope.loading = false;
		$scope.manage = function () {
	        //$scope.loading = true;
			$.ajax({
				url : '/dic/update',
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