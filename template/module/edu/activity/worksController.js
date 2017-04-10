'use strict';

angular.module('app')
	.controller('worksController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
		
	    // 作品列表
	   $scope.param={
	   		"activityId":$state.params.id
	   };
	   $scope.works_list = function(){

	   		var success = function(result){
	   			$scope.pageInfo = result.data;
	   			$scope.$apply();
	   			console.log($scope.pageInfo);
	   		};

	   		var error = function(){

	   		}	

	   		API.post("/scl/classics/getListByParam", $scope.param,success,error);
	   } 

	   $scope.works_list();

	   // 翻页
	    $scope.pagination = function (obj) {
	    	
	        $scope.param.pageNum=obj.page;
	        $scope.works_list();
	    };


		// 删除作品
		$scope.del = function(value){
			// alert('');
			console.log(value);
			// alert(w);
			var data={
				"id":value.id
			};

			// console.log(data)
			var success = function(result){

					toaster.clear('*');
	            	toaster.pop('success', "", "删除成功");
	            	$timeout(function(){
	            		$scope.works_list();
	            	},1000);
	            	// alert(1);
				}
			var error = function(result){
				toaster.clear('*');
	        	toaster.pop('error', '', result.msg);
			}

			 //单个删除

			API.post("/scl/classics/delete",data,success,error);

		}

		//弹出框
		$scope.add_work = function(){
			ngDialog.open({
				template:'template/module/edu/activity/add.html',
				controller: 'addController',
				className: 'ngdialog-theme-green',
				data:{
					"id":$state.params.id,
					// "activityId":$scope.param.classId,
					"callback":$scope.works_list
				},
				resolve: {
   	                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
   	                     	return uiLoad.load('template/module/edu/activity/addController.js').then(function(){
   	                     		return $ocLazyLoad.load('toaster');
   	                     	});
   	                 }]}
			})
		}

}])