'use strict';

angular.module('app')
	.controller('committeeconfirmController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
	
	 $scope.title = "删除确认";                               	
	 // $scope.id = $scope.ngDialogData.id;
	 $scope.value = $scope.ngDialogData.value;
	 $scope.callback = $scope.ngDialogData.callback;

	 $scope.do = function(){
	 	$scope.callback($scope.value);
	 	$scope.closeThisDialog();
	 }

	 $scope.cancel = function(){
	 	$scope.closeThisDialog();
	 }




}])		