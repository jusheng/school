'use strict';

angular.module('app')
	.controller('subjectController',[ '$rootScope', '$scope', '$http', '$state', function($rootScope, $scope, $http, $state) {
       $scope.title="科目管理";
        $scope.param = { };
        $scope.loading = false;
        
		$scope.search = function () {
	        $scope.loading = true;
			$.ajax({
				url : '/subject/read/list',
				data: $scope.param
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