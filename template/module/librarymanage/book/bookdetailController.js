'use strict';

angular.module('app')
	.controller('bookdetailController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,toaster,API) {
	
	$scope.param = {};
	$scope.param.typeCode = $state.params.code;
    $scope.param.typeId = $state.params.sorts_id;
    $scope.param.name = $state.params.name;                               	

	 var success = function(result){
	 	$scope.record = result.data;
	 	$scope.$apply();
	 }  
	 var error = function(result){
	 	toaster.clear('*');
        toaster.pop('error', '', result.msg);
	 }

	 API.post("/res/books/detail",{"id":$state.params.id},success,error);
  

} ]);