'use strict';

angular.module('app')
	.controller('confirmEntryController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
	
	 $scope.title = "确认操作";
	 $scope.code = $scope.ngDialogData.code;
	 $scope.callback = $scope.ngDialogData.callback;

	 $scope.do = function(){
	 	$scope.callback($scope.code);
	 	$scope.closeThisDialog();
	 }

	 $scope.cancel = function(){
	 	$scope.closeThisDialog();
	 }




}])		