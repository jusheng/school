'use strict';

angular.module('app')
	.controller('myThreadController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
	
	$scope.news_detail=function(){

		var success = function(result){
		 	$scope.details = result.data;
		 	$scope.$apply();
		 }  
		 var error = function(result){
		 	toaster.clear('*');
    	    toaster.pop('error', '', result.msg);
		 }
	
		 API.post("news/read/detail",{"id":$state.params.id},success,error);
	}	
	$scope.news_detail();
}])