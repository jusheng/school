'use strict';

angular.module('app')
	.controller('textbookController', [ '$rootScope', '$scope', '$http','$timeout', '$state','toaster','API','ngDialog',
	                                function($rootScope, $scope, $http,$timeout, $state,toaster,API,ngDialog) {

	  
	  $scope.$parent.myScrollOptions = {
		        snap: false,
		        hScrollbar:true,
		        scrollbars:true,
		        fadeScrollbars:true,
		       /* onScrollEnd: function ()
		        {
		            alert('finshed scrolling');
		        }*/
	};                              	
	
	//所有教材 不分页
        $scope.get_alltextbook = function(){

        	var success = function(result){
        		$scope.alltextbook = result.data;
        		$scope.$apply();
        	}

        	var error = function(){

        	}

        	API.post("/res/textbook/read/alllist",{"unschoolId":$state.params.id},success,error);
        }

        $scope.get_alltextbook();                                	

}])	                                	