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

	         console.log($scope.curr);
	         switch($scope.curr){
	         	case 1:
	         		$scope.title = "选择主办人";
	         		break;
	         	case 2:
	         		$scope.title = "选择协办人";
	         		break;	
	         	case 3:
	         		$scope.title = "选择知会人";
	         		break;		
	         }                       		

	         // 学校通讯录
		     $scope.school_mail_list = function(){

		     	var success = function(result){
		     		$scope.schoolMailList = result.data;
		     		$scope.$apply();

		     		$scope.$emit("schoolmailList",result.data);

		     	};

		     	var error = function(){

		     	};

		     	API.post("/edu/read/all",{},success,error);

		     }
		     $scope.school_mail_list();



		     $scope.s_zbr = function(_this,obj){
		     	$scope.record.presideUser = obj;
		     }




         }])