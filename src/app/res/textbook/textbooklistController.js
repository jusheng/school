'use strict';

angular.module('app')
	.controller('textbooklistController', [ '$rootScope', '$scope', '$http','$timeout', '$state','toaster',
	                                function($rootScope, $scope, $http,$timeout, $state,toaster) {
	$scope.title = "教材管理";

	$scope.loading = false;
    $scope.param = {};    
		$scope.search = function () {
	        $scope.loading = true;
			$.ajax({
				url : '/res/textbook/read/list',
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
				url : '/res/textbook/delete',
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