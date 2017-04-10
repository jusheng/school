'use strict';

angular.module('app')
	.controller('userController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
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
	              		
		    $scope.title1 = "选择版主"
	         // 学校通讯录
		     $scope.school_mail_list = function(){

		     	var success = function(result){
		     		$scope.schoolMailList = result.data;
		     		$scope.$apply();

		     		$scope.$emit("schoolmailList",result.data);

		     	};

		     	var error = function(){

		     	};

		     	API.post("/edu/teacher/read/all",{},success,error);

		     }
		     $scope.school_mail_list();



		     $scope.s_zbr = function(_this,obj){
		     	$scope.record.presideUser = obj;
		     }

		     $scope.select_user = function(){
		     	if($scope.moderatorList.length > 0){
		     		
		     		$scope.$parent.moderatorIds = "1";
		     	}else{
		     		
		     		$scope.$parent.moderatorIds = "";
		     	}
		     }



         }])