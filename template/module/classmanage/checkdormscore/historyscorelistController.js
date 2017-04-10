'use strict';

angular.module('app')
	.controller('historyscorelistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','toaster','$timeout','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,toaster,$timeout,API) {
	    // 列表
	$scope.param={};
	$scope.dormId = $state.params.dormId;
	var dom = {'dormId':$scope.dormId};
	$scope.rule_list = function(){
	     	
	   		var success = function(result){
	   			// console.log(result);
	   			$scope.pageInfo = result.data;
	   			$scope.$apply();
	   			console.log($scope.pageInfo);
	   		};
	   		
	   		var error = function(){

	   		}	
	   		console.log(dom);
	   		API.post("/edu/dorm/check/getHistory",dom,success,error);
	   } 
	$scope.rule_list();
	// 设置对勾
	if ($scope.param != 0) {
                //$scope.selected = 4;
                // alert(1);
                $scope.set_curr(4);

    }


   	if($state.params.classId != 0 ){
        $scope.param.classId = $state.params.classId;
        $scope.params1 = $state.params.classId;
        console.log($scope.params1);
        $scope.set_curr($scope.param.classId);


        // $scope.search();
    }else{
        $scope.$watch("lists",function(){
            if(!$scope.lists){
                // console.log($scope.lists);
                return false;
            }

            // console.log('有值了');
            $scope.param.classId = ($scope.lists.length>0 &&　$scope.lists[0].classId);
            $scope.params1 = $state.params.classId;
            $scope.set_curr($scope.param.classId);
            // $scope.search();
        })
    }

	   // 删除

	$scope.del = function(value){

		var data={
			"id":value,
			
		};

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

		API.post("/edu/dorm/check/delete",data,success,error);

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

	               //弹出框
    $scope.add_module1 = function(value){
        ngDialog.open({
            template:'template/module/edu/dormitory/checked.html',
            controller: 'checkedController',
            className: 'ngdialog-theme-green-big',
            data:{
            	"value":value,
                "callback":$scope.search
            },
            resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        return uiLoad.load('template/module/edu/dormitory/checkedController.js').then(function(){
                            return $ocLazyLoad.load(['toaster','angular-echarts']);
                        });
                 }]}
        })
    }   
}])                                	