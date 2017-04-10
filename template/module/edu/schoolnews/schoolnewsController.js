'use strict';

angular.module('app')
	.controller('schoolnewsController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
		$scope.app_name = "新闻阅览";
		
			// 分类列表
	   	$scope.get_class = function(){

	   		var success = function(result){
	   			$scope.sorts = result.data;
	   			console.log($scope.sorts);
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
	   	// 最新新闻
		  $scope.schoolnews_list = function(){

	   		var success = function(result){
	   			$scope.lists = result.data;
	   			console.log($scope.lists);

	   			for (var i = $scope.lists.list.length - 1; i >= 0; i--) {
	   				$scope.lists.list[i].updateTime = $scope.lists.list[i].updateTime.split(' ')[0];
	   			}

	   			$scope.$apply();
	   		};
	   		
	   		var error = function(){

	   		}	

	   		API.post("/scl/news/read/list",{},success,error);
	   } 

	   $scope.schoolnews_list();

	  

}])