'use strict';

angular.module('app')
	.controller('commentDetailController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
	
	$scope.init=function(){

		var success = function(result){
		 	$scope.details = result.data;
		 	$scope.$apply();
		 }  
		 var error = function(result){
		 	toaster.clear('*');
    	    toaster.pop('error', '', result.msg);
		 }
	
		 API.post("/scl/bbs/update/followMessage",{"id":$state.params.id},success,error);
	}	
	$scope.news_detail();
}])