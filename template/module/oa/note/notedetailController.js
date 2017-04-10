'use strict';

angular.module('app')
	.controller('notedetailController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,toaster,API) {
		
	 var success = function(result){
	 	$scope.record = result.data;
	 	$scope.$apply();
	 }  
	 var error = function(result){
	 	toaster.clear('*');
        toaster.pop('error', '', result.msg);
	 }

	 API.post("reminder/read/detail",{"id":$state.params.id},success,error);

	 

} ]);