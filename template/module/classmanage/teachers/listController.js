'use strict';

angular.module('app')
	.controller('teacherslistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API) {
	   
	     $scope.param = {};                           	

	     $scope.teachers_list = function(){
	     	
	   		var success = function(result){
	   			// console.log(result);
	   			$scope.pageInfo = result.data;
	   			$scope.$apply();
	   			console.log($scope.pageInfo);

	   		};
	   		
	   		var error = function(){

	   		}	

	   		API.post("/classes/teacher/getTeachersInfo", $scope.param,success,error);
	   } 

	   
	   // 翻页
	    $scope.pagination = function (obj) {
	    	
	        $scope.param.pageNum=obj.page;

	        $scope.teachers_list();
	    };


	   if(!$state.params.classId || $state.params.classId==0){


	   		$scope.$watch("lists",function(){
				if(!$scope.lists){
					return false;
				}

				console.log('有值了');
		        if($scope.lists.length>0){
		                $scope.param.classId = $scope.lists[0].id;
		                $scope.set_curr($scope.param.classId);
		                $scope.teachers_list();
		        }
				
			})


	   }else{


	   		$scope.param.classId = $state.params.classId;
	   		
	   		$scope.set_curr($state.params.classId);
	   		$scope.teachers_list();
	   }


	}])                                	