'use strict';

angular.module('app')
	.controller('myteacherslistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API) {
	   $scope.app_name = "我的任课老师"; 
        //请求任教班级信息  
        $scope.param = {};
	        
	    $scope.stu_teachers = function(){

	   		var success = function(result){
	   			$scope.pageInfo = result.data;
	   			console.log($scope.pageInfo);

	   			$scope.$apply();
	   		};
	   		
	   		var error = function(){

	   		}	

	   		API.post("/classes/teacher/getTeachersByStudent",{ },success,error);
	   } 

	   $scope.stu_teachers();

	  
	   // 翻页
	    $scope.pagination = function (obj) {
	    	
	        $scope.param.pageNum=obj.page;
	        $scope.schoolteachers_list();
	    };

	    


	}])                                	