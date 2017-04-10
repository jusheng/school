'use strict';

angular.module('app')
	.controller('teacherresindexController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {

	 $scope.app_name = "资源";  


	 $scope.param = {};



	 $scope.search = function() {
	 

	     var success = function(result) {
	       
	         $scope.pageInfo = result.data;
	         $scope.$apply();
	     }

	     var error = function(result) {
	         console.log(result);
	     }

	     API.post('/res/textbook/schoolTextbooklist', $scope.param, success, error);
	     // console.log($scope.param)

	 }
	 $scope.search();

	 // 翻页
	 $scope.pagination = function (obj) {
	     $scope.param.pageNum=obj.page;
	     $scope.search();
	 };




}])	                                	