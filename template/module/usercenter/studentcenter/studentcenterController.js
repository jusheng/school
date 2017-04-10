'use strict';

angular.module('app')
	.controller('studentcenterController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API) {

	     $scope.menu = {
	        	"curr":1
	        }                           	

}])