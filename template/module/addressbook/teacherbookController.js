'use strict';

angular.module('app')
	.controller('teacherbookController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {

	$scope.param={ };
	$scope.loading=false;

    //请求数据
	$scope.search=function(){
		$scope.s_all = 0;
		var success = function(result){
			$scope.pageInfo = result.data;
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}

		API.post('/oa/addressbook/read/list/teacher',$scope.param,success,error);

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
} ]);