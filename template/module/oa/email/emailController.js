'use strict';

angular.module('app')
	.controller('emailController', [ '$rootScope', '$scope', '$http', '$state','API',
	                                function($rootScope, $scope, $http, $state,API) {
		
	        $scope.app_name = "邮件管理";
	        $scope.menu = {
	        	"curr":1
	        }


	        //未读邮件数量
	        $scope.get_num = function(){

	        	var success = function(result){
	        		console.log(result);
	        		$scope.num = result.data;
	        		$scope.$apply();
	        	};
	        	var error = function(){

	        	};

	        	API.post('/oa/mail/getOaMailNoRead',{},success,error);


	        }
	        $scope.get_num();





} ]);