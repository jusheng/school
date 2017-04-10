'use strict';

angular.module('app')
	.controller('listController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','toaster','$timeout','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,toaster,$timeout,API) {
	    // 列表
	   $scope.param={
	   			// "classId":$state.params.classId==$scope?"":$state.params.classId
	   };
	     $scope.committee_list = function(){
	     	
	   		var success = function(result){
	   			// console.log(result);
	   			$scope.pageInfo = result.data;
	   			$scope.$apply();
	   			console.log($scope.pageInfo);
	   			// alert(1);

	   		};
	   		
	   		var error = function(){

	   		}	

	   		API.post("/classes/cadre/read/cadreInfoByClassId", $scope.param,success,error);
	   } 

	   // $scope.committee_list();
	   if(!$state.params.classId || $state.params.classId==0){

	   		//$scope.schoolteachers_list();

	   		$scope.$watch("lists",function(){
				if(!$scope.lists){
					return false;
				}

				console.log('有值了');
		        if($scope.lists.length>0){
		                $scope.param.classId = $scope.lists[0].id;
		                $scope.set_curr($scope.param.classId);
		                $scope.committee_list();
		        }
				
			})


	   }else{


	   		$scope.param.classId = $state.params.classId;
	   		
	   		$scope.set_curr($state.params.classId);
	   		$scope.committee_list();
	   }
	//    $scope.$watch("lists",function(){
	// 	if(!$scope.lists){
	// 		return false;
	// 	}

	// 	console.log('有值了');
 //        if($scope.lists.length>0){
 //                $scope.param.classId = $scope.lists[0].id;
 //                $scope.set_curr($scope.param.classId);
 //                $scope.committee_list();
 //        }
		
	// })

	   // 删除

	$scope.del = function(value){
		// alert(w);
		var data={
			"eduClass.id":value.eduClassId,
			"student.id":value.cadreStudentId,
			"classPosition":value.cadreStudentPosition,
		};

		// console.log(data)

		var success = function(result){

				toaster.clear('*');
            	toaster.pop('success', "", "删除成功");
            	$timeout(function(){
            		$scope.committee_list();
            	},1000);
            	// console.log(value.classId);
            	console.log(value.eduClassId);
            	// console.log(data);
			}
		var error = function(result){
			toaster.clear('*');
        	toaster.pop('error', '', result.msg);
		}

		 //单个删除

		API.post("/classes/cadre/del",data,success,error);

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
		//弹出框
		$scope.add_module = function(id){
			ngDialog.open({
				template:'template/module/classmanage/committee/add.html',
				controller: 'addController',
				className: 'ngdialog-theme-green',
				data:{
					"id":id,
					"classId":$scope.param.classId,
					"callback":$scope.committee_list
				},
				resolve: {
   	                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
   	                     	return uiLoad.load('template/module/classmanage/committee/addController.js').then(function(){
   	                     		return $ocLazyLoad.load('toaster');
   	                     	});
   	                 }]}
			})
		}

	   // 翻页
	    $scope.pagination = function (obj) {
	    	
	        $scope.param.pageNum=obj.page;
	        $scope.committee_list();
	    };
	}])                                	