'use strict';

angular.module('app')
	.controller('activityController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster) {
		
		$scope.app_name = "活动管理";
	   	
		$scope.curr=0;

		// 分类列表
	   	$scope.get_class = function(){

	   		var success = function(result){
	   			$scope.sorts = result.data;

	   			$scope.$apply();
	   		};

	   		var error = function(){

	   		}	

	   		API.post("/scl/catalog/getListOfCatalog",{},success,error);

	   	}

	   	$scope.get_class();


	   	$scope.set_curr = function(t){
		 	$scope.curr = t
	   }
	     // 列表选中样式改变所需函数
	   	$scope.selectedWhich = function (row) {
          	$scope.selectedRow = row;
        }

} ]);