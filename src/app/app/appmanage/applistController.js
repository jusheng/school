'use strict';

angular.module('app')
	.controller('applistController', [ '$rootScope', '$scope', '$timeout','$http', '$state','toaster',
	                                function($rootScope, $scope, $timeout,$http, $state,toaster) {
		$scope.loading = false;
		$scope.module_name = $state.params.name;
		$scope.pid = $state.params.id;
		$scope.title = $scope.module_name + " > 应用管理";

		$scope.appType = $state.params.appType;


		$scope.param = {
			"pid":$state.params.id
		}

		$scope.search = function () {
	        $scope.loading = true;
			$.ajax({
				url : '/app/read/list',
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

			$.ajax({
				url : '/app/delete',
				data: {"id":id,'enable':enable}
			}).then(function(result) {
				console.log(result);
		        $scope.loading = false;
				if (result.httpCode == 200) {
					toaster.clear('*');
	                toaster.pop('success', '', "操作成功");
	                $scope.search();
				} else {
					toaster.clear('*');
	                toaster.pop('error', '', result.msg);
				}
				$scope.$apply();
			});

		}
		
		// 翻页
        $scope.pagination = function (obj) {
            $scope.param.pageNum=obj.page;
            $scope.search();
        };


	}])