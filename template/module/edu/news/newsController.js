'use strict';

angular.module('app')
	.controller('newsController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster) {
		
		$scope.app_name = "新闻资讯";
	   	

		$scope.curr=0;


	   	$scope.set_curr = function(t){
		 	$scope.curr = t
	   }
		// 分类列表
	   	$scope.get_class = function(){

	   		var success = function(result){
	   			$scope.sorts = result.data;

	   			$scope.$apply();
	   		};

	   		var error = function(){

	   		}	

	   		API.post("/scl/newssorts/read/list",{},success,error);

	   	}

	   	$scope.get_class();

	  // 列表选中样式改变所需函数
	   	$scope.selectedWhich = function (row) {
          	$scope.selectedRow = row;
        }


	   	// 排名
	   $scope.list_byviews = function(){

	   		var success = function(result){
	   			$scope.views = result.data;

	   			$scope.$apply();
	   		};

	   		var error = function(){

	   		}	

	   		API.post("/scl/news/read/list",{},success,error);
	   } 

	   $scope.list_byviews();

	   $scope.$on("sendParent",function(){
	   		$scope.list_byviews();
	   })

} ]);