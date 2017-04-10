'use strict';

angular.module('app')
	.controller('schoolnoticedetailController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
		
	//alert($state.params.id);


	$scope.get_frist = function(){
		//$state.params.id = $scope.pageInfo.list[0].id;

			var success = function(result){
	   			//$state.params.id = $scope.pageInfo.list[0].id;
	   			$scope.news_detail($scope.pageInfo.list[0].id);	
	   		};
	   		
	   		var error = function(){

	   		}	

	   		API.post("scl/affiche/getList",{},success,error);

	};


	if($state.params.id==0){
		
		 $scope.get_frist();
     }

	$scope.news_detail=function(id){

		var success = function(result){
		 	$scope.details = result.data;
		 	$scope.$apply();
		 }  
		 var error = function(result){
		 	toaster.clear('*');
    	    toaster.pop('error', '', result.msg);
		 }


	
		 API.post("/scl/affiche/read/detail",{"id":id},success,error);
	}

	$scope.news_detail($state.params.id);
}])