'use strict';

angular.module('app')
	.controller('scorelistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','toaster','$timeout','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,toaster,$timeout,API) {
	    // 列表
	$scope.param={};
	var data = {};
	$scope.search = function(data){
	     	
	   		var success = function(result){
	   			// console.log(result);
	   			$scope.pageInfo = result.data;
	   			$scope.$apply();
	   			console.log($scope.pageInfo);
	   		};
	   		
	   		var error = function(){

	   		}	
	   		console.log($scope.param);
	   		API.post("/edu/dorm/check/read/list", data,success,error);
	   } 

	//获取公寓列表
    $scope.house=function(){
        console.log(data);
        var success = function(result){
            $scope.houseList = result.data;
            $scope.search(data);
            $scope.$apply();
        }
        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
        API.post('/edu/house/read/list',{},success,error);
    }
    $scope.house();
    //获取楼层列表
    $scope.getexam=function(){
        if ($scope.param.houseId!=null) {

            data = {
                    "houseId":$scope.param.houseId
            }
            $scope.search(data);
            var success = function(result){
                $scope.examList = result.data;
                console.log($scope.param.floor);
                console.log(data);
            
            $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }
                API.post('/edu/house/floor/list',data,success,error);
        }else{

            data ={};
            return $scope.search(data);
        }
         
        
    }

    // 选择楼层的即时搜索
    $scope.sub = function(){
        if ($scope.param.floor&&$scope.param.houseId) {
            data = {
                    "houseId":$scope.param.houseId,
                    "floor":$scope.param.floor
            }
        }else{
            data = {
                    "floor":$scope.param.floor
            }
        }
            
        $scope.search(data);
    
    }
    $scope.search0 = function(){

        if ($scope.param.floor&&$scope.param.houseId) {
            data = {
                    "houseId":$scope.param.houseId,
                    "floor":$scope.param.floor
            }
        }else if($scope.param.floor&&$scope.param.houseId==""){
            data = {
                    "floor":$scope.param.floor
            }
        }else if($scope.param.floor==""&&$scope.param.houseId){
            data = {
                    "houseId":$scope.param.houseId
            }
        }else{
            data ={}
        }
        $scope.search(data);
    }
	// 设置对勾
	if ($scope.param != 0) {
                //$scope.selected = 4;
                // alert(1);
                $scope.set_curr(4);

    }
	   // 删除

	// $scope.del = function(value){

	// 	var data={
	// 		"id":value,
			
	// 	};

	// 	var success = function(result){

	// 			toaster.clear('*');
 //            	toaster.pop('success', "", "删除成功");
 //            	$timeout(function(){
 //            		$scope.rule_list();
 //            	},1000);
	// 		}
	// 	var error = function(result){
	// 		toaster.clear('*');
 //        	toaster.pop('error', '', result.msg);
	// 	}

	// 	 //单个删除

	// 	API.post("/edu/dorm/delete",data,success,error);

	// 	}

	// 	//删除确认
	// 	$scope.open_confrim = function(value){

	//    		ngDialog.open({
	// 			template:'template/module/classmanage/committee/confirm.html',
	// 			controller: 'committeeconfirmController',
	// 			className: 'ngdialog-theme-green',
	// 			data:{
	// 				"value":value,
	// 				"callback":$scope.del
	// 			},
	// 			resolve: {
 //   	                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
 //   	                     	return uiLoad.load('template/module/classmanage/committee/committeeconfirmController.js').then(function(){
 //   	                     		return $ocLazyLoad.load('toaster');
 //   	                     	});
 //   	                 }]}
	// 		})
	//    }
		

	   // 翻页
	    $scope.pagination = function (obj) {
	    	
	        $scope.param.pageNum=obj.page;
	        $scope.rule_list();
	    };

	               //弹出框
    $scope.add_module1 = function(value){
        ngDialog.open({
            template:'template/module/edu/adddormscore/checked.html',
            controller: 'checkedController',
            className: 'ngdialog-theme-green-big',
            data:{
            	"value":value,
                "callback":$scope.search
            },
            resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        return uiLoad.load('template/module/edu/adddormscore/checkedController.js').then(function(){
                            return $ocLazyLoad.load(['toaster','angular-echarts']);
                        });
                 }]}
        })
    }   
}])                                	