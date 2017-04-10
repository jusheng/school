'use strict';

angular.module('app')
	.controller('schoolnoticelistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
		
	    // 新闻列表
	   $scope.param={ };
	     $scope.schoolnews_list = function(){

	   		var success = function(result){
	   			$scope.pageInfo = result.data;
	   			for (var i = $scope.pageInfo.list.length - 1; i >= 0; i--) {
	   				$scope.pageInfo.list[i].createTime = $scope.pageInfo.list[i].createTime.split(' ')[0];
	   			}
	   			// console.log($scope.pageInfo)

	   			$scope.$apply();
	   		};

	   		var error = function(){

	   		}	

	   		API.post("scl/affiche/getList", $scope.param,success,error);
	   } 

	   $scope.schoolnews_list();

	   // 翻页
	    $scope.pagination = function (obj) {
	    	
	        $scope.param.pageNum=obj.page;
	        $scope.schoolnews_list();
	    };

}])