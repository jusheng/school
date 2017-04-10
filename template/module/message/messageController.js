'use strict';

angular.module('app')
	.controller('messageController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','recordFormat','toaster',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,recordFormat,toaster) {

	 $scope.app_name = "在线留言";  
	 $scope.menu = {
	        	"curr":1
	        }                             	

}])
