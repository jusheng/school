'use strict';

angular.module('app')
	.controller('basegradeController',[ '$rootScope', '$scope', '$http', '$state', function($rootScope, $scope, $http, $state) {
       $scope.title="基础年级管理";
        $scope.param = { };
        $scope.loading = false;
        
		$scope.search = function () {
	        $scope.loading = true;
			$.ajax({
				url : '/basegrade/read/list',
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

		//获取类型
        function get_type(){
            $.ajax({
                url:'dic/read/key',
                data:{key:"GRADE_TYPE"}
            }).then(function (result) {
                    $scope.loading = false;
                    if (result.httpCode == 200) {
                        $scope.bType = result.data;
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