'use strict';

angular.module('app')
	.controller('indexController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API) {

        $scope.app_name = "任课老师"; 
        $scope.curr = 0;
        //请求任教班级信息  
	        
	    $scope.schoolteachers_list = function(){

	   		var success = function(result){
	   			$scope.lists = result.data;
	   			console.log($scope.lists);

	   			$scope.$apply();
	   		};
	   		
	   		var error = function(){

	   		}	

	   		API.post("/oa/addressbook/read/list/class",{ },success,error);
	   } 

	   $scope.schoolteachers_list();

	   $scope.set_curr = function(t){
		 	$scope.curr = t;
	   }
                     	
	}])                                	