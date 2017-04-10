'use strict';

angular.module('app')
	.controller('userController', [ '$rootScope', '$scope', '$http', '$state',
	                                function($rootScope, $scope, $http, $state) {
		$scope.title = '用户管理';
        $scope.param = { };
        $scope.loading = false;
        
		$scope.search = function () {
	        $scope.loading = true;
			$.ajax({
				url : '/user/read/list',
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
		

		function get_type(){
            $.ajax({
                url:'dic/read/key',
                data:{key:"USERTYPE"}
            }).then(function (result) {
                    $scope.loading = false;
                    if (result.httpCode == 200) {
                        $scope.yType = result.data;
                    } else {
                        $scope.msg = result.msg;
                    }
                    $scope.$apply();
            });
        }
        get_type();

        
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