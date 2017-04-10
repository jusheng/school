'use strict';

angular.module('app')
	.controller('committeeconfirmController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
	
	 $scope.title1 = "删除确认";                               	
	 $scope.title2 = "添加确认";                               	
	 // $scope.title3 = "删除确认";                               	
	 $scope.i = $scope.ngDialogData.i;
	 console.log($scope.ngDialogData.i);
	 $scope.value = $scope.ngDialogData.value;
	 $scope.callback = $scope.ngDialogData.callback;
	 console.log($scope.value);
	 $scope.do = function(){

	 	$scope.callback($scope.value);
	 	$scope.closeThisDialog();
	 }

	 $scope.cancel = function(){

	 	$scope.closeThisDialog();
	 }




}])		