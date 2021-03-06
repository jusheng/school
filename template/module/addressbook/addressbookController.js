'use strict';

angular.module('app')
	.controller('addressbookController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API) {
		
		$scope.app_name = "通讯录";
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
	
		API.post('/oa/addressbook/read/list/class',$scope.param,success,error);

	}
	$scope.search();

} ]);