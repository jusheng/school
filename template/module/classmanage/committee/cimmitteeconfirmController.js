'use strict';

angular.module('app')
	.controller('activityconfirmController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
	
	 $scope.title = "删除确认";                               	
	 $scope.id = $scope.ngDialogData.id;
	 if($scope.ngDialogData.value){
	 	$scope.value = $scope.ngDialogData.value;
	 }
	 $scope.callback = $scope.ngDialogData.callback;

	 $scope.do = function(){
	 	$scope.callback($scope.id);
	 	$scope.closeThisDialog();
	 }

	 $scope.cancel = function(){
	 	$scope.closeThisDialog();
	 }




}])		