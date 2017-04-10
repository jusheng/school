'use strict';

angular.module('app')
	.controller('onlinehomeworkstatelistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {

	$scope.set_curr(3);                              	
	 
	$scope.param={
	 		"homeworkId":$state.params.id,
	 		"classId":$state.params.classId
	 	 };
	$scope.loading=false;


	$scope.s_all = 0;  //全选标记
    $scope.select_all = function(){
    	$scope.s_all = !$scope.s_all;

    	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
    		$scope.pageInfo.list[i].selected = $scope.s_all;
    	}

    };	
    //单选标记
    $scope.select_per = function(index){
    	$scope.pageInfo.list[index].selected = !$scope.pageInfo.list[index].selected;
    }

    //请求数据
	$scope.search=function(){
		$scope.s_all = 0;
		var success = function(result){
		
			$scope.pageInfo = result.data;

			for (var i = 0; i < $scope.pageInfo.list.length; i++) {
				if(!$scope.pageInfo.list[i].status){ //完成 计算是否逾期
					
					var releaseTime = Date.parse(new Date($scope.pageInfo.list[i].releaseTime));
					var endDate = Date.parse(new Date($scope.pageInfo.list[i].endDate));
					if((endDate - releaseTime) >=0){
						$scope.pageInfo.list[i].overTime = 0;  //没超时
					}else{
						$scope.pageInfo.list[i].overTime = 1;  //超时
					}

				}
			}

			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
	
		API.post('/homework/gethomeworkstatus',$scope.param,success,error);

	}

	$scope.search();


	$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search();
	}

	// 翻页
    $scope.pagination = function (obj) {
    	
        $scope.param.pageNum=obj.page;
        $scope.search();
    };

    $scope.do_del = function(id){
    	var success = function(result){
				toaster.clear('*');
            	toaster.pop('success', "", "删除成功");
            	$timeout(function(){
            		$scope.search();
            	},1000);
			}
		var error = function(result){
			toaster.clear('*');
        	toaster.pop('error', '', result.msg);
		}

		//if(id){ //单个删除

			API.post("/news/delete",{"id":id},success,error);

		// }else{ //批量删除

		// 	var temp = [];
		// 	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
		// 		$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
		// 	}


		// 	temp.length>0 && API.post("/news/delete",{"id":temp.join(",")},success,error);
		// }
    }

    //删除操作
	$scope.del = function(id){

		// var success = function(result){
		// 		toaster.clear('*');
  //           	toaster.pop('success', "", "删除成功");
  //           	$timeout(function(){
  //           		$scope.search();
  //           	},1000);
		// 	}
		// var error = function(result){
		// 	toaster.clear('*');
  //       	toaster.pop('error', '', result.msg);
		// }

		// if(id){ //单个删除

		// 	API.post("/news/delete",{"id":id},success,error);

		// }else{ //批量删除

		// 	var temp = [];
		// 	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
		// 		$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
		// 	}


		// 	temp.length>0 && API.post("/news/delete",{"id":temp.join(",")},success,error);
		// }


		if(id){
		    var id = id;
		}else{
		    var temp = [];
		    for (var i = 0; i < $scope.pageInfo.list.length; i++) {
		        $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
		    }
		    var id = temp.join(",");
		}

		if(id.length==0){
		    return false;
		}


		ngDialog.open({
		    template:'template/module/tpl/confirm.html',
		    controller: 'confirmController',
		    className: 'ngdialog-theme-primary',
		    data:{
		        "id":id,
		        "callback":$scope.do_del
		    },
		    resolve: {
		             deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
		                return uiLoad.load('template/module/tpl/confirmController.js').then(function(){
		                    return $ocLazyLoad.load('toaster');
		                });
		         }]}
		})

    }




    $scope.get_studentObj = function(index,id){
    	var success = function(result){
		
			$scope.pageInfo.list[index].student = result.data;
			$scope.$apply();
		}

		var error = function(result){
		}
	
		API.post('/student/read/detail',{"id":id},success,error);
    }

	$scope.get_classObj = function(index,id){
    	var success = function(result){
		
			$scope.pageInfo.list[index].class = result.data;
			$scope.$apply();
		}

		var error = function(result){
		}
	
		API.post('/class/read/detail',{"id":id},success,error);
    }


    $scope.$watch("pageInfo",function(){
    	if(!$scope.pageInfo){
    		return false;
    	}

    	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
    		//$scope.get_studentObj(i,$scope.pageInfo.list[i].studentId);
    		$scope.get_classObj(i,$scope.pageInfo.list[i].classId);
    	}

    })



}])	                                	