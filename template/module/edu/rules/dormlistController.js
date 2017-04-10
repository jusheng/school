'use strict';

angular.module('app')
	.controller('dormlistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','toaster','$timeout','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,toaster,$timeout,API) {
	    // 列表
	$scope.param={};
	$scope.param.flag=1;
	$scope.rule_list = function(){
	     	
	   		var success = function(result){
	   			// console.log(result);
	   			$scope.pageInfo = result.data;
	   			$scope.$apply();
	   			console.log($scope.pageInfo);
	   		};
	   		
	   		var error = function(){

	   		}	

	   		API.post("/classes/rewardOrPunish/read/list", $scope.param,success,error);
	   } 
	$scope.rule_list();
	   // 删除

	$scope.del = function(value){
		// alert(w);
		var data={
			"id":value,
			
		};

		// console.log(data)

		var success = function(result){

				toaster.clear('*');
            	toaster.pop('success', "", "删除成功");
            	$timeout(function(){
            		$scope.rule_list();
            	},1000);
			}
		var error = function(result){
			toaster.clear('*');
        	toaster.pop('error', '', result.msg);
		}

		 //单个删除

		API.post("/classes/rewardOrPunish/delete",data,success,error);

		}

		//删除确认
		$scope.open_confrim = function(value){

	   		ngDialog.open({
				template:'template/module/classmanage/committee/confirm.html',
				controller: 'committeeconfirmController',
				className: 'ngdialog-theme-green',
				data:{
					"value":value,
					"callback":$scope.del
				},
				resolve: {
   	                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
   	                     	return uiLoad.load('template/module/classmanage/committee/committeeconfirmController.js').then(function(){
   	                     		return $ocLazyLoad.load('toaster');
   	                     	});
   	                 }]}
			})
	   }
		

	   // 翻页
	    $scope.pagination = function (obj) {
	    	
	        $scope.param.pageNum=obj.page;
	        $scope.rule_list();
	    };
	}])                                	