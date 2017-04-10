'use strict';

angular.module('app')
	.controller('emailbookController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','recordFormat','toaster',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,recordFormat,toaster) {
		
	        $scope.title = "通讯录";
	        $scope.select = function(){

	        	alert('ddd');
	        }

	         //弹出通讯录列表
	        $scope.openWithJSSpecificWidth = function () {
                ngDialog.open({
                    template: '<h2>Notice that style inline set specific width!</h2>',
                    className: 'ngdialog-theme-default',
                    width: 650,
                    plain: true
                });
            };

            $scope.schooletreedata=[
		         {label: "一班", type: "folder", children: [
		             {label: "张老师", type: "pic","email":"[xxx@qq.com]"},
		             {label: "李老师", type: "pic","email":"[xxxddd@qq.com]"}
		         ]},
		         {label: "二班", type: "folder", children: [
		             {label: "张老师", type: "email","email":"[xxx@163.com]"},
		             {label: "李老师", type: "home","email":"[xxx@163.com]"}
		         ]}

		     ];
		     $scope.privatetreedata=[
		         {label: "一班", type: "folder", children: [
		             {label: "张老师", type: "pic","email":"[xxx@qq.com]"},
		             {label: "李老师", type: "pic","email":"[xxxddd@qq.com]"}
		         ]},
		         {label: "二班", type: "folder", children: [
		             {label: "张老师", type: "email","email":"[xxx@163.com]"},
		             {label: "李老师", type: "home","email":"[xxx@163.com]"}
		         ]}

		     ];



		     $scope.showSelected = function(sel) {
		     	 console.log(sel);
		         $scope.selectedNode = sel;
		     };

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


		     $scope.select = function(v){
		     	$scope.set_empName(v); //调用父作用域方法
		     }

} ]);