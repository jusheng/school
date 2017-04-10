'use strict';

angular.module('app')
	.controller('resourcelistController', [ '$rootScope', '$scope', '$http', '$state','toaster',
	                                function($rootScope, $scope, $http, $state,toaster) {
	$scope.title = "教材版本管理";

	$scope.loading = false;
        
		$scope.search = function () {
	        $scope.loading = true;
			$.ajax({
				url : '/res/textbookVersion/read/list',
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
				url : '/res/textbookVersion/delete',
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