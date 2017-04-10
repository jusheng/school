'use strict';

angular.module('app')
	.controller('manageController', [ '$rootScope', '$scope', '$http', '$state','$stateParams',
	                                function($rootScope, $scope, $http, $state,$stateParams) {
	    // console.log($stateParams);
	    // console.log('key:'+$stateParams.key); 
	    //console.log('id:'+$stateParams.id);
		//console.log('name:'+$stateParams.name);
	    $scope.key = $stateParams.key;
	    $scope.id = $stateParams.id;
	    $scope.name = $stateParams.name;

		$scope.title = '字典项管理';
        $scope.param = { };
        $scope.loading = false;
        
		$scope.search = function () {
	        $scope.loading = true;
			$.ajax({
				url : '/dic/read/list',
				data: {"key":$scope.key}
			}).then(function(result) {
				console.log(result);
		        $scope.loading = false;
				if (result.httpCode == 200) {
					$scope.pageInfo = result.data;
				} else {
					$scope.msg = result.msg;
				}
				$scope.$apply();
			});
		}		

		$scope.search();

		$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search();
		}
	
		$scope.disableItem = function(id, enable) {
			
		}
		
		// 翻页
        $scope.pagination = function (obj) {
            $scope.param.pageNum=obj.page;
            $scope.search();
        };
} ]);