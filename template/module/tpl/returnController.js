'use strict';

angular.module('app')
	.controller('returnController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
	
	 $scope.title = $scope.ngDialogData.title? $scope.ngDialogData.title : "归还确认" ;                               	
	 $scope.id = $scope.ngDialogData.id;
	 $scope.callback = $scope.ngDialogData.callback;
	 $scope.confirm_msg = $scope.ngDialogData.confirm_msg ? $scope.ngDialogData.confirm_msg : "确认要归还吗？";



	 $scope.do = function(){
	 	$scope.callback($scope.id);
	 	$scope.closeThisDialog();
	 }

	 $scope.cancel = function(){
	 	$scope.closeThisDialog();
	 }




}])		