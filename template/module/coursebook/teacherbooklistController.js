'use strict';

angular.module('app')
	.controller('teacherbooklistController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {

	$scope.param={ };
	$scope.loading=false;

    //请求数据
	$scope.search=function(){
		$scope.s_all = 0;
		var success = function(result){
			$scope.teachercourse = result.data;
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
	
		API.post('/edu/schedule/read/mySchedule',{},success,error);

	}
	$scope.search();

	$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search();
	}

	// 翻页
    $scope.pagination = function (obj) {
    	
        $scope.param.pageNum=obj.page;
        $scope.search();
    };   

    //默认显示第一个年级的考试列表
            if ($state.params.id != 0) {
                $scope.param.classId = $state.params.id;

                $scope.set_curr($scope.param.classId);

                $scope.search();
            } else {
                $scope.$watch("className", function () {
                    if (!$scope.className) {
                        return false;
                    }

                    console.log('有值了');
                    $scope.param.classId = ($scope.className.length > 0 && $scope.className[0].id);
                    $scope.set_curr($scope.param.classId);
                    $scope.id = $scope.className[0].id;
                    $scope.search();
                })
            }

                                      	
} ]);